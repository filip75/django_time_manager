# Generated by Django 3.0.3 on 2020-02-06 08:36

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models

import new_app.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('new_app', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Entry',
            new_name='Project',
        ),
        migrations.CreateModel(
            name='TimeEntry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('project', models.ForeignKey(on_delete=models.SET(new_app.models.get_deleted_project), to='new_app.Project')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
