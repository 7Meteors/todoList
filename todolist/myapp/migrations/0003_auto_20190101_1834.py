# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_auto_20190101_1828'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todoitem',
            name='content',
            field=models.CharField(max_length=2047, null=True, blank=True),
        ),
    ]
