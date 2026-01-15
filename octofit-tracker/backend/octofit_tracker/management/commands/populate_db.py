from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from ...models import Team, Activity, Leaderboard, Workout

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Delete all data
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users (super heroes)
        users = [
            {'username': 'ironman', 'email': 'ironman@marvel.com', 'team': 'Marvel'},
            {'username': 'spiderman', 'email': 'spiderman@marvel.com', 'team': 'Marvel'},
            {'username': 'batman', 'email': 'batman@dc.com', 'team': 'DC'},
            {'username': 'superman', 'email': 'superman@dc.com', 'team': 'DC'},
        ]
        for u in users:
            User.objects.create_user(username=u['username'], email=u['email'], password='password')

        # Create activities
        Activity.objects.create(user='ironman', type='run', duration=30, team='Marvel')
        Activity.objects.create(user='spiderman', type='cycle', duration=45, team='Marvel')
        Activity.objects.create(user='batman', type='swim', duration=25, team='DC')
        Activity.objects.create(user='superman', type='run', duration=60, team='DC')

        # Create leaderboard
        Leaderboard.objects.create(team='Marvel', points=75)
        Leaderboard.objects.create(team='DC', points=85)

        # Create workouts
        Workout.objects.create(name='Hero HIIT', description='High intensity for heroes', suggested_for='Marvel')
        Workout.objects.create(name='Power Lift', description='Strength for DC heroes', suggested_for='DC')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
