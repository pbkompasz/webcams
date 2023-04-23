const puppeteer = require('puppeteer');
const URL = 'https://www.roxy-world.ro/webcam-sinaia';

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}

const getStream = async (url) => {
  console.log('Opening the browser...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome-stable',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = (await browser.pages())[0];
  await page.setRequestInterception(true);
  const res = {
    m3u8Address: null,
    mediaAddress: null,
    title: null,
  }

  page.on('request', interceptedRequest => {
    if (interceptedRequest.url().includes('.m3u8') && !res.m3u8Address) {
      console.log('m3u8 file');
      console.log(interceptedRequest.url());
      res.m3u8Address = interceptedRequest.url();
    }
    if (interceptedRequest.url().includes('.ts') && !res.mediaAddress) {
      res.mediaAddress = interceptedRequest.url();
      console.log('mediafile');
    }
    interceptedRequest.continue();
  });


  await page.goto(url);
  res.title = await page.title();
  await browser.close();

  await delay(4000);

  return res;
};

const parseWebsite = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome-stable',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = (await browser.pages())[0];

  await page.goto(url);

  try {
    const res = await page.waitForSelector('video[src^="blob"]', {
      timeout: 5000,
    })
    console.log(res)
    browser.close();
    return true;
  } catch (error) {
    console.log('Not found')
    browser.close();
    return false;
  }

}

const getGeolocation = (url) => {
  throw new Error('Not implemented');
}

const parseMetadata = (url) => {
  throw new Error('Not implemented');
}

module.exports = {
  getStream,
  parseWebsite,
};