import random
from datetime import datetime, timedelta

from django.contrib.auth.models import User
from django.core.management import BaseCommand

from new_app.models import Project, TimeEntry


def random_date(start=datetime(year=2020, month=1, day=1), end=datetime(year=2021, month=1, day=1)):
    period = end - start
    return start + period * random.random()


def random_timedelta(max_delta: timedelta = timedelta(days=400)):
    return max_delta * random.random()


class Command(BaseCommand):
    # def add_arguments(self, parser):
    #     parser.add_argument('count', nargs=1, type=int)
    #     parser.add_argument('--drop', action='store_true')

    def handle(self, *args, **options):
        TimeEntry.objects.all().delete()
        User.objects.all().delete()
        Project.objects.all().delete()

        projects = [
            Project.objects.create(name='project1'),
            Project.objects.create(name='project2'),
            Project.objects.create(name='project3'),
            Project.objects.create(name='project4')
        ]

        User.objects.all().delete()
        users = []
        for i in range(5):
            users.append(User.objects.create_user(username=f'user{i + 1}'))

        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[0],
                                 project=projects[0])
        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[0],
                                 project=projects[0])
        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[0],
                                 project=projects[0])
        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[0],
                                 project=projects[1])
        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[0],
                                 project=projects[1])

        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[1],
                                 project=projects[1])
        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[1],
                                 project=projects[1])
        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[1],
                                 project=projects[1])
        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[1],
                                 project=projects[1])
        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[1],
                                 project=projects[2])
        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[1],
                                 project=projects[2])
        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[1],
                                 project=projects[2])

        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[2],
                                 project=projects[2])
        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[2],
                                 project=projects[2])
        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[2],
                                 project=projects[2])
        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[2],
                                 project=projects[1])
        TimeEntry.objects.create(start_time=random_date(), duration=random_timedelta(), user=users[2],
                                 project=projects[1])

        # for _ in range(500):
        #     s = random_date(datetime(year=2020, month=1, day=1), datetime(year=2020, month=1, day=1))
        #     delta = random_timedelta(timedelta(days=400))
        #     TimeEntry.objects.create(start_time=s, duration=delta, user=random.choice(users),
        #                              project=random.choice(projects))
