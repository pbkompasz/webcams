# Generated by Django 3.2.18 on 2023-04-23 16:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20230423_1536'),
    ]

    operations = [
        migrations.AlterField(
            model_name='webcam',
            name='name',
            field=models.CharField(max_length=180),
        ),
    ]
