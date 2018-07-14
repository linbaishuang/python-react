# # -*- coding: utf-8 -*-

from django.conf.urls import url
from django.contrib import admin
from loginAdmin.views import login, newUser, forgetPass
from pythonreact.settings import STATIC_ROOT
from django.views.static import serve


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login$', login),
    url(r'^newUser$', newUser),
    url(r'^forgetPass$', forgetPass),
    url(r'^static/(?P<path>.*)$', serve, {'document_root': STATIC_ROOT, }),  # 项目静态文件配置路由
]
