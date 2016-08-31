# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-08-31 18:42
from __future__ import unicode_literals

from django.db import migrations, models
import home.blocks
import wagtail.contrib.table_block.blocks
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields
import wagtail.wagtailembeds.blocks
import wagtail.wagtailimages.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0006_auto_20160627_2120'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='homepage',
            name='recent_carousel',
        ),
        migrations.AddField(
            model_name='post',
            name='data_project_external_script',
            field=models.CharField(blank=True, help_text='Specify the name of the external script file within the na-data-projects/projects AWS directory to include that script in the body of the document.', max_length=140, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='body',
            field=wagtail.wagtailcore.fields.StreamField([('heading', wagtail.wagtailcore.blocks.CharBlock(classname='full title')), ('paragraph', wagtail.wagtailcore.blocks.RichTextBlock()), ('image', wagtail.wagtailimages.blocks.ImageChooserBlock(icon='image')), ('video', wagtail.wagtailembeds.blocks.EmbedBlock(icon='media')), ('table', wagtail.contrib.table_block.blocks.TableBlock()), ('button', wagtail.wagtailcore.blocks.StructBlock([(b'button_text', wagtail.wagtailcore.blocks.CharBlock(max_length=50, required=True)), (b'button_link', wagtail.wagtailcore.blocks.URLBlock(default=b'https://www.', required=True)), (b'alignment', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[(b'left-aligned', b'Left'), (b'center-aligned', b'Center')]))])), ('iframe', wagtail.wagtailcore.blocks.StructBlock([(b'source_url', wagtail.wagtailcore.blocks.URLBlock(required=True)), (b'width', home.blocks.IntegerBlock(help_text=b'The maximum possible iframe width is 1050', max_value=1050)), (b'height', home.blocks.IntegerBlock())])), ('dataviz', wagtail.wagtailcore.blocks.StructBlock([(b'title', wagtail.wagtailcore.blocks.CharBlock()), (b'subheading', wagtail.wagtailcore.blocks.RichTextBlock()), (b'max_width', home.blocks.IntegerBlock()), (b'container_id', wagtail.wagtailcore.blocks.CharBlock(required=True))]))]),
        ),
    ]
