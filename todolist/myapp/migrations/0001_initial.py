# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TodoItem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('owner', models.CharField(max_length=16, null=True)),
                ('title', models.CharField(max_length=255)),
                ('content', models.CharField(max_length=2047)),
                ('status', models.BooleanField()),
                ('starttime', models.DateField(auto_now_add=True)),
                ('deadline', models.DateField()),
                ('endtime', models.DateField()),
                ('priority', models.IntegerField()),
            ],
        ),
    ]
