import os from 'node:os';
import { launch } from 'puppeteer';
import { SECOND, MINUTE, HOUR, DAY } from '../common/constants.js';

async function HumbleBundleNews(client, targetChannel, dbConnection)
{
    while (true)
    {
        const humbleBundleGamesURL = 'https://www.humblebundle.com/games';

        const privacyNoticeButtonSelector = '#onetrust-reject-all-handler';
        const privacyNoticeSelector = '#onetrust-banner-sdk';

        const bundleSelector = 'a.full-tile-view';

        const bundleDaysSelector = '.js-countdown-timer > .js-days';
        const bundleHoursSelector = '.js-countdown-timer > .js-hours';
        const bundleMinutesSelector = '.js-countdown-timer > .js-minutes';
        const bundleSecondsSelector = '.js-countdown-timer > .js-seconds';

        const bundlePriceSelector = 'h3.tier-header.heading-medium.js-tier-header';
        
        try
        {
            const databaseBundles = await dbConnection.models.bundle.findAll({
                attributes: ['expiration_timestamp', 'id_message']
            });

            const channel = await client.channels.fetch(targetChannel);
            let currentTimeStamp = Math.floor(Date.now() / 1000);
            for (let databaseBundle of databaseBundles)
            {
                if (databaseBundle.expiration_timestamp < currentTimeStamp)
                {
                    await channel.messages.delete(databaseBundle.id_message);

                    await dbConnection.models.bundle.destroy({
                        where: {
                            id_message: databaseBundle.id_message
                        }
                    })
                }
            }

            let browser;
            switch (os.type().toLowerCase())
            {
                case 'windows_nt':
                {
                    browser = await launch();
                }
                break;

                case 'linux':
                {
                    browser = await launch({
                        executablePath: '/usr/bin/chromium-browser'
                    });
                }
                break;
            }
            const mainPage = await browser.newPage();
            await mainPage.goto(humbleBundleGamesURL);

            await mainPage.setViewport({ width: 1920, height: 960 });

            await mainPage.locator(privacyNoticeButtonSelector).click();
            await mainPage.waitForSelector(privacyNoticeSelector, { hidden: true });

            const bundles = await mainPage.$$(bundleSelector);
            for (let i = 0; i < bundles.length; i++)
            {
                let link = await bundles[i].evaluate(element => element.href.split('?')[0]);
                const postedBundle = await dbConnection.models.bundle.findOne({
                    where:
                    {
                        link: link
                    }
                });
                if (postedBundle !== null)
                {
                    continue;
                }

                const bundleName = await bundles[i].$('.name');
                let name = await bundleName.evaluate(element => element.textContent.trim());

                const bundleDays = await bundles[i].$(bundleDaysSelector);
                let days = await bundleDays.evaluate(element => element.textContent.trim().split(' ')[0]) * DAY;

                const bundleHours = await bundles[i].$(bundleHoursSelector);
                let hours = await bundleHours.evaluate(element => element.textContent.trim()) * HOUR;

                const bundleMinutes = await bundles[i].$(bundleMinutesSelector);
                let minutes = await bundleMinutes.evaluate(element => element.textContent.trim()) * MINUTE;
                
                const bundleSeconds = await bundles[i].$(bundleSecondsSelector);
                let seconds = await bundleSeconds.evaluate(element => element.textContent.trim()) * SECOND;

                let expirationTimestamp = Math.floor((Date.now() + days + hours + minutes + seconds) / 1000);

                const bundlePage = await browser.newPage();
                await bundlePage.goto(link);

                const bundlePrice = await bundlePage.$(bundlePriceSelector);
                let price = await bundlePrice.evaluate(element => element.textContent.trim().split(' ')[3]);

                await bundlePage.close();
                
                const message = await channel.send(
                    '[' + name + ']' + '(' + link + ')' + '\n' +
                    'Priced at ' + price + '\n' +
                    'Expires ' + '<t:' + expirationTimestamp + ':R>' + '\n'
                );

                await dbConnection.models.bundle.create({
                    name: name,
                    link: link,
                    price: price,
                    expiration_timestamp: expirationTimestamp,
                    store_name: "Humble Bundle",
                    id_message: message.id
			    });
            }

            await browser.close();
        }
        catch (error)
        {
            console.error(error);
        }

        await new Promise(resolve => setTimeout(resolve, 6 * HOUR));
    }
}

export { HumbleBundleNews };