from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum, Q, When, Case, Value, Count, CharField
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
    @method_decorator(cache_page(60*60, key_prefix='score_statistic'))
    def get(self, request):
        subject_name = request.query_params["subject"]
        models = [
            {"model": Subject, "score_model": Score},
            {"model": ForeignLanguage, "score_model": ForeignScore},
        ]

        for model_pair in models:
            try:
                subject = model_pair["model"].objects.get(name=subject_name)
                queryset = (
                    model_pair["score_model"].objects.filter(
                        subject__id=subject.id)
                    .annotate(
                        value_range=Case(
                            When(value__lt=4, then=Value('level01')),
                            When(value__lt=6, then=Value('level02')),
                            When(value__lt=8, then=Value('level03')),
                            default=Value('level04'),
                            output_field=CharField(),
                        )
                    )
                    .values('value_range')
                    .annotate(count=Count('id'))
                )
                content = {entry['value_range']: entry['count']
                           for entry in queryset}

                return Response(content, status=status.HTTP_200_OK)

            except model_pair["model"].DoesNotExist:
                continue

        return Response({"msg": "Subject not found"}, status=status.HTTP_404_NOT_FOUND)


class GroupAView(APIView):

    @method_decorator(cache_page(60*60, key_prefix='candidates_groupa'))
    def get(self, request):
        top_candidate_ids = (
            Score.objects
            .filter(subject_id__in=[1, 3, 4])
            .values('candidate_id')
            .annotate(total_score=Sum('value'))
            .order_by('-total_score')[:10]
            .values_list('candidate_id', flat=True)
        )

        top_candidates = Candidate.objects.filter(
            registration_num__in=top_candidate_ids)
        content = CandidateSerializer(top_candidates, many=True).data

        return Response(content, status=status.HTTP_200_OK)
