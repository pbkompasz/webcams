# Open Webcam

## Team Members
[Peter Kompasz](https://github.com/pbkompasz)

## Tool Description

The goal of this tool is to [collect webcams by crawling the web](https://arxiv.org/pdf/2103.12286.pdf) or by adding them manually, geolocating them through metadata, storing footage from them locally or monitoring the footage live.
There are ~60.000 such webcams available that are streaming video to public websites.  
This tool has potential to help in investigations like the [downing of MH17](https://www.bellingcat.com/app/uploads/2015/10/MH17-The-Open-Source-Evidence-EN.pdf), where having access to stored imagery might help the investigation. In this case a BUK missile launcher passed Zuhres, Shakhtersk, Torez and Snizhne, where webcams were available.
This tool can be extended by storing not only webcams, but also images from geolocated social media posts or satellites.

### Similar projects

[Kamerka](https://github.com/woj-ciech/kamerka)

## Installation

1. Install docker-compose

2. Download the tool's repository using the command:

        git clone https://github.com/pbkompasz/webcams

3. Move to the tool's directory and install the tool
    ``` bash
    cd webcams
    docker-compose up
    ```

4. Create .env file similar to .env.example

  To find the path to a Chrome executable on linux use `whereis google-chrome-stable`
  

## Usage
The final product is a web-app.
The app contains a dashboard through which webcams can be monitored.
A user can manually add a URL which contains a webcam stream or can run the crawler as a background job.

## Additional Information
### Roadmap

 - Improve website classification (Now it looks for <video> elements w/ blob src's, ideally it should take a screenshot and recognize a webcam stream)
 - Create an open-source database similar to [CAM2 Camera Database API](https://purduecam2project.github.io/CameraDatabaseAPI/#api-auth-getToken)
 - Use m3u8-parser to replay the streams
