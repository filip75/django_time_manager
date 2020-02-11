from django.urls import path
from rest_framework.routers import DefaultRouter

import new_app.views as views

urlpatterns = [
    # path('projects/'),
    # path('projects/<int:project>/'),
    path('projects/<int:project>/users/', views.ProjectUsersListView.as_view(), name='new-app-project-users'),
    path('projects/<int:project>/entries/', views.TimeEntriesListView.as_view(), name='new-app-project-entries'),

    # path('users/'),
    # path('users/<int:user>/'),
    path('users/<int:user>/projects/', views.UserProjects.as_view(), name='new-app-user-projects'),
    path('users/<int:user>/entries/', views.TimeEntriesListView.as_view(), name='new-app-user-entries'),

    path('projects/<int:project>/users/<int:user>/entries/', views.TimeEntriesListView.as_view(),
         name='new-app-project-user-entries'),
]

router = DefaultRouter()
router.register('projects', views.ProjectViewSet, 'project')
router.register('users', views.UserViewSet, 'user')
urlpatterns += router.urls
