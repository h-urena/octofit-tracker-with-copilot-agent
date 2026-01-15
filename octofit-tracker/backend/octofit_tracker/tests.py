from django.test import TestCase
from .models import Team, Activity, Leaderboard, Workout

class TeamModelTest(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(team.name, 'Test Team')

class ActivityModelTest(TestCase):
    def test_activity_creation(self):
        activity = Activity.objects.create(user='testuser', type='run', duration=30, team='Test Team')
        self.assertEqual(activity.user, 'testuser')

class LeaderboardModelTest(TestCase):
    def test_leaderboard_creation(self):
        lb = Leaderboard.objects.create(team='Test Team', points=100)
        self.assertEqual(lb.points, 100)

class WorkoutModelTest(TestCase):
    def test_workout_creation(self):
        workout = Workout.objects.create(name='Test Workout', description='A test workout', suggested_for='Test Team')
        self.assertEqual(workout.name, 'Test Workout')