from django.db import models

# Create your models here.


class Subject(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name


class Candidate(models.Model):
    registration_num = models.CharField(max_length=20, primary_key=True)
    is_student = models.BooleanField(default=True)


class Score(models.Model):
    value = models.FloatField(null=False, blank=False)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="scores")
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name="scores")


class ForeignLanguage(models.Model):
    id = models.CharField(primary_key=True, max_length=5)
    name = models.CharField(max_length=20)


class ForeignScore(models.Model):
    value = models.FloatField(null=False, blank=False)
    subject = models.ForeignKey(ForeignLanguage, on_delete=models.CASCADE, related_name="foreign")
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name="foreign")
