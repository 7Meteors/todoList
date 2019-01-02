# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todoitem',
            name='content',
            field=models.CharField(max_length=2047, null=True),
        ),
        migrations.AlterField(
            model_name='todoitem',
            name='deadline',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='todoitem',
            name='endtime',
            field=models.DateField(null=True),
        ),
    ]
