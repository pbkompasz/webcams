from django.conf.urls import url
from django.urls import path, include
from .views import (
    WebcamListApiView,
    CrawlerApiView
)

urlpatterns = [
    path('webcams', WebcamListApiView.as_view()),
    path('crawl', CrawlerApiView.as_view()),
]
