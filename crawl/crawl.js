const puppeteer = require('puppeteer');
const URL = 'https://www.earthcam.com/world/hungary/budapest/?cam=hotelvictoria';

const crawl = async () => {
  console.log('Opening the browser...');
  const browser = await puppeteer.launch({
    // headless: false,
    executablePath: '/usr/bin/google-chrome-stable',
  });
  const page = (await browser.pages())[0];
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url().includes('.m3u8') || interceptedRequest.url().includes('.ts')) {
      console.log(interceptedRequest.url());
      console.log(interceptedRequest.resourceType());
      console.log(interceptedRequest.response());
    }
    // if (
    //   interceptedRequest.url().endsWith('.png') ||
    //   interceptedRequest.url().endsWith('.jpg')
    // )
    //   interceptedRequest.abort();
    // else 
    interceptedRequest.continue();
  });

  console.log(`Go to ${URL}`);
  await page.goto(URL);

};

const parseWebsite = async () => {

}

crawl();

module.exports = {
  crawl,
  parseWebsite,
};