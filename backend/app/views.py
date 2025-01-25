from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum, Q
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .serializers import *
from .models import *
# Create your views here.


class SearchView(APIView):
    def get(self, request):
        registration_num = request.query_params["registration-num"]

        try:
            candidate = Candidate.objects.get(
                registration_num=registration_num)
            content = CandidateSerializer(candidate).data
        except:
            return Response({"msg": "Not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response(content, status=status.HTTP_200_OK)


class StatisticView(APIView):
    @method_decorator(cache_page(10, key_prefix='score_statistic'))
    def get(self, request):
        subject_name = request.query_params["subject"]
        content = {}

        try:
            subject = Subject.objects.get(name=subject_name)
            scores = Score.objects.filter(subject__id=subject.id)
            content = {"level01": len(scores.filter(value__lt=4)),
                       "level02": len(scores.filter(value__gte=4, value__lt=6)),
                       "level03": len(scores.filter(value__gte=6, value__lt=8)),
                       "level04": len(scores.filter(value__gte=8))}
        except:
            try:
                subject = ForeignLanguage.objects.get(name=subject_name)
                scores = ForeignScore.objects.filter(subject__id=subject.id)
                content = {"level01": len(scores.filter(value__lt=4)),
                           "level02": len(scores.filter(value__gte=4, value__lt=6)),
                           "level03": len(scores.filter(value__gte=6, value__lt=8)),
                           "level04": len(scores.filter(value__gte=8))}
            except:
                return Response({"msg": "Not found subject"}, status=status.HTTP_404_NOT_FOUND)

        return Response(content, status=status.HTTP_200_OK)


class GroupAView(APIView):

    @method_decorator(cache_page(10, key_prefix='candidates_groupa'))
    def get(self, request):
        subject_names = ['toan', 'vat_li', 'hoa_hoc']

        top_10_candidates = Candidate.objects.filter(
            scores__subject__name__in=subject_names
        ).annotate(
            total_score=Sum('scores__value', filter=Q(
                scores__subject__name__in=subject_names))
        ).order_by('-total_score')[:10]

        content = CandidateSerializer(top_10_candidates, many=True).data

        return Response(content, status=status.HTTP_200_OK)
