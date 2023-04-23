from django.db import models
from django.utils.timezone import now
from duckduckgo_search import ddg

import scrapy
import datetime


# Create your models here.

class Webcam(models.Model):
  url = models.CharField(max_length=180)
  name = models.CharField(max_length=30)
  description = models.CharField(max_length=180, blank=True)
  # TODO Geojson
  location = models.CharField(max_length=180, blank=True)
  status = models.BooleanField(default=False)
  date_added = models.DateField(blank=True)
  added_type = models.CharField(max_length=10, default='manual')
  # TODO Same as in paper (IP and NON-IP camera)
  # type = models.CharField(default='non-ip')
  stream_url = models.CharField(max_length=180)

  

class Crawler(models.Model):
  task = models.CharField(max_length = 180)
  # Region where to look e.g. Hungary or New York
  region = models.CharField(max_length=20, blank=True)
  date_started = models.DateField(blank=True, default=now)
  status = models.BooleanField(default=False)
  websites_tried = models.IntegerField(default=0)
  webcams_found = models.IntegerField(default=0)

  def parse_website(self, url):
    print(url)

    def parse(self, response):
      print('parse')
      videos = response.css('video')
      print(videos)
      return response

    resp = scrapy.Request(url=url, callback=parse)
    print(resp)

    return {
      "webcam_data": None
    }
  
    page = response.url.split("/")[-2]

    filename = f'quotes-{page}.html'
    Path(filename).write_bytes(response.body)
    self.log(f'Saved file {filename}')

  """
    Fetch searches and parse first 5 results
  """
  def crawl(self, opts):
    keywords = 'inurl:axis-cgi/jpg'
    results = ddg(keywords, safesearch='Off', time='y')
    return results
    print(results)
