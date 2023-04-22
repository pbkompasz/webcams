# webcams

## Rationale

Collection of public webcams  
THe goal of this tool is to [collect webcams by crawling the web](https://arxiv.org/pdf/2103.12286.pdf) or by adding them manually, geolocating them through metadata, storing footage from them locally and then analysing the data.  
There are ~60.000 such webcams avaiable that are streaming video to public websites.  
This tool has potential to help in investigations like the [downing of MH17](https://www.bellingcat.com/app/uploads/2015/10/MH17-The-Open-Source-Evidence-EN.pdf), where having access to stored imagery might help the investigation. In this case a BUK missile launcher passed Zuhres, Shakhtersk, Torez and Snizhne, where webcams where available. This cameras are offline but they might have helped in the investigation.  
This tool can be extended by storing not only images by webcams, but also images from geolocated social media posts, satellites or corrupted webcams(Shodan).  

## Related project

[Kamerka](https://github.com/woj-ciech/kamerka)

## Development

``` bash
docker-compose up
```

## License

MIT

