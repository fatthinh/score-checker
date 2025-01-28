import pandas as pd
from .models import *

# Read CSV file into a DataFrame
csv_file_path = "D:/workspace/golden-owl/score-checker/backend/db/diem_thi_thpt_2024_contain.csv"
df = pd.read_csv(csv_file_path, dtype={'sbd': str})

subjects = ["toan", "ngu_van", "ngoai_ngu", "vat_li", "hoa_hoc",
            "sinh_hoc", "lich_su", "dia_li", "gdcd"]

# Iterate through the DataFrame and create model instances
for index, row in df.iterrows():
    candidate, created_candidate = Candidate.objects.get_or_create(
        registration_num=str(row['sbd']))

    for sub in subjects:
        if (not pd.isna(row[sub])):
            if (sub != 'ngoai_ngu'):
                subject = Subject.objects.get(name=sub)
                score = Score.objects.create(
                    value=row[sub], candidate=candidate, subject=subject)
            else:
                subject = ForeignLanguage.objects.get(id=row["ma_ngoai_ngu"])
                score = ForeignScore.objects.create(
                    value=row[sub], candidate=candidate, subject=subject)
            score.save()
