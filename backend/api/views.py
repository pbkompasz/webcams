from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Webcam, Crawler
from .serializers import WebcamSerializer

class WebcamListApiView(APIView):

  def get(self, request, *args, **kwargs):
    webcams = Webcam.objects
    serializer = WebcamSerializer(webcams, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def post(self, request, *args, **kwargs):
    webcam = request.data.get('webcam')

    serializer = WebcamSerializer(data=webcam)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CrawlerApiView(APIView):
  def post(self, request, *args, **kwargs):
    opts = request.data.get('opts')
    results = Crawler.crawl(self, opts)
    print(results)

    return Response(status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)
