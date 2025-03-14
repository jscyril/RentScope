# Generated by Django 5.1.6 on 2025-02-23 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Prediction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('locality', models.CharField(max_length=255)),
                ('area', models.FloatField()),
                ('bedroom', models.IntegerField()),
                ('bathroom', models.IntegerField()),
                ('furnish_type', models.CharField(max_length=50)),
                ('seller_type', models.CharField(max_length=50)),
                ('layout_type', models.CharField(max_length=50)),
                ('property_type', models.CharField(max_length=50)),
                ('predicted_rent', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
