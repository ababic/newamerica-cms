# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-28 19:42
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import wagtail.wagtailcore.fields
import wagtail.wagtaildocs.blocks


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('wagtailcore', '0028_merge'),
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AllPressReleasesHomePage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
            ],
            options={
                'verbose_name': 'Homepage for all Press Releases',
            },
            bases=('wagtailcore.page',),
        ),
        migrations.CreateModel(
            name='PressRelease',
            fields=[
                ('post_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='home.Post')),
                ('attachment', wagtail.wagtailcore.fields.StreamField([(b'attachment', wagtail.wagtaildocs.blocks.DocumentChooserBlock(null=True, required=False))])),
            ],
            options={
                'abstract': False,
            },
            bases=('home.post',),
        ),
        migrations.CreateModel(
            name='ProgramPressReleasesPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
            ],
            options={
                'verbose_name': 'Press Release Homepage for Program and Subprograms',
            },
            bases=('wagtailcore.page',),
        ),
    ]
