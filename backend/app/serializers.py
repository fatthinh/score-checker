from .models import *
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"


class ScoreSerializer(ModelSerializer):
    subject = SerializerMethodField()

    class Meta:
        model = Score
        fields = ["id", "value", "subject"]

    def get_subject(self, obj):
        return obj.subject.name


class ForeignSerializer(ModelSerializer):
    subject = SerializerMethodField()

    class Meta:
        model = ForeignScore
        fields = ["id", "value", "subject"]

    def get_subject(self, obj):
        return obj.subject.name.capitalize()


class CandidateSerializer(ModelSerializer):
    scores = ScoreSerializer(many=True, read_only=True)
    foreign = SerializerMethodField()

    class Meta:
        model = Candidate
        fields = "__all__"

    def get_foreign(self, obj):
        foreign_language = ForeignScore.objects.filter(
            candidate=obj).first()
        if foreign_language:
            return ForeignSerializer(foreign_language).data
        return None
