# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.shortcuts import render
from models import User


@csrf_exempt
def login(req):
    """
    登录
    """
    if req.method == "POST":
        name = req.POST["name"]
        password = req.POST["password"]
        try:
            user = User.objects.filter(name=name)
            if user:
                exitPassword = user[0].password
                if exitPassword == password:
                    return HttpResponse(1)      #登录成功
                else:
                    return HttpResponse(2)      #用户密码错误
            else:
                return HttpResponse(0)          #用户不存在
        except Exception as err:
            print err
    else:
        return HttpResponse(-1)


@csrf_exempt
def newUser(req):
    """
    注册用户
    """
    if req.method == 'POST':
        name = req.POST['name']
        password = req.POST['password']
        existUser = User.objects.filter(name=name)
        try:
            if existUser:
                return HttpResponse(0)           #用户已存在
            elif existUser.count() == 0:
                User.objects.create(name=name, password=password)
                return HttpResponse(1)            #用户添加成功
            else:
                return HttpResponse(-1)           #系统错误
        except Exception as err:
            print err
    else:
        return HttpResponse(-1)


@csrf_exempt
def forgetPass(req):
    if req.method == 'POST':
        name = req.POST['oldname']
        newpass = req.POST['newpass']
        list1 = User.objects.filter(name=name)
        try:
            if list1:
                list1.update(password=newpass)
                return HttpResponse(1)      #密码修改成功
            else:
                return HttpResponse(0)      #用户不存在
        except Exception as err:
            print err
    else:
        return HttpResponse(-1)




