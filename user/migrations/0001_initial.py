# Generated by Django 2.0.4 on 2020-04-15 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ClassInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('class_name', models.CharField(max_length=255)),
                ('school_id', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'class_info',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=255)),
                ('user_name', models.CharField(max_length=255)),
                ('comment', models.TextField()),
                ('create_date', models.DateTimeField(auto_now_add=True)),
                ('update_date', models.DateTimeField(auto_now_add=True)),
                ('status', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'comment',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=255)),
                ('user_name', models.CharField(max_length=255)),
                ('class_id', models.CharField(max_length=255)),
                ('img', models.CharField(max_length=255)),
                ('create_date', models.DateField(auto_now_add=True)),
                ('status', models.IntegerField(blank=True, default=1, null=True)),
            ],
            options={
                'db_table': 'photo',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('school_name', models.CharField(max_length=255)),
                ('status', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'school_info',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=10)),
                ('password', models.CharField(max_length=20)),
                ('email', models.CharField(max_length=60)),
                ('class_id', models.CharField(max_length=255)),
                ('school_id', models.CharField(max_length=255)),
                ('jf', models.IntegerField(default=0)),
                ('status', models.IntegerField(default=1)),
            ],
            options={
                'db_table': 'user',
            },
        ),
    ]
