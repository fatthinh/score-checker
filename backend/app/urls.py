from django.urls import path
from .views import *

urlpatterns = [
    path("search/", SearchView.as_view(), name="search-candidate"),
    path("statistic/", StatisticView.as_view(), name="score-statistic"),
    path("group-a/", GroupAView.as_view(), name="group-a"),
]
