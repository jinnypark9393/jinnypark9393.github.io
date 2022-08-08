---
emoji: 🐍
title:  Python 패스트캠퍼스 챌린지 71일차
date: '2022-07-22 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 셀프 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 강의 1일 1강 포스팅 챌린지 :)

<br/>

# 1. UserData 추가

- Django는 프로젝트 생성시에 user 데이터베이스를 생성하기때문에 User 데이터베이스를 수정하기는 쉽지 않다.

```python
from django.db import models

from django.contrib.auth.models import User as U # UserDetail 클래스에서 사용
from django.contrib.auth.models import AbstractUser # AbstractUser 클래스에서 사용

# Create your models here.

class Users(AbstractUser):
    pay_plan = models.ForeignKey(PayPlan, on_delete=models.DO_NOTHING)

class UserDetail(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    pay_plan = models.ForeignKey(PayPlan, on_delet=models.DO_NOTHING)
```

- AbstractUser: 현재 사용하고 있는 유저를 추상화해서 PayPlan을 넣겠다라는 것.
- 두 가지 방법이 있음
    - class Users → 한 테이블에 쌓임
    - class UserDetail → 두 테이블에 쌓임

- AbstrctUser로 유저에 추가정보를 넣게 될 경우 settings.py에서 파일 내용을 아래와 같이 수정해야한다.
    
    ```python
    ...(생략)...
    
    # Application definition
    AUTH_USER_MODEL = "shortener.Users"
    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'shortener'
    ]
    
    ...(생략)...
    ```
    
    - `INSTALLED_APPS` 위에 `AUTH_USER_MODEL` 을 추가해 shortener의 Users 클래스를 사용할 것을 명시해주어야 한다(인증을 위해서 어떤 데이터/테이블을 사용할 것인지를 지정해주는 것).
    
<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**

<br/><br/>