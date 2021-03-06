# -*- coding: utf-8 -*-
# Generated by Django 1.11.27 on 2020-03-03 18:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0008_alleventshomepage_body'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='online_only',
            field=models.BooleanField(default=False, help_text='Checking this will mean the address is not shown'),
        ),
        migrations.AddField(
            model_name='event',
            name='webcast_link_text',
            field=models.TextField(blank=True, help_text="Defaults to 'Webcast link'"),
        ),
        migrations.AddField(
            model_name='event',
            name='webcast_url',
            field=models.URLField(blank=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='city',
            field=models.TextField(blank=True, default='Washington'),
        ),
        migrations.AlterField(
            model_name='event',
            name='host_organization',
            field=models.TextField(blank=True, default='New America'),
        ),
        migrations.AlterField(
            model_name='event',
            name='state',
            field=models.TextField(blank=True, default='D.C.'),
        ),
        migrations.AlterField(
            model_name='event',
            name='street_address',
            field=models.TextField(blank=True, default='740 15th St NW #900'),
        ),
        migrations.AlterField(
            model_name='event',
            name='zipcode',
            field=models.TextField(blank=True, default='20005'),
        ),
    ]
