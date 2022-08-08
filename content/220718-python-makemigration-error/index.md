---
emoji: 🐍
title:  Python Django makemigrations No changes detected & No installed app with label 원인 및 해결
date: '2022-07-19 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

# 1. 배경 상황

패스트캠퍼스의 한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online 강의 중 Django 파트의 데이터베이스 모델 생성 실습을 따라하다가 아래와 같은 에러가 발생했다.

```python
(venv) ➜  shrinkers git:(master) ✗ python manage.py makemigrations
No changes detected
```

<br/><br/>

# 2. **‘No changes detected’** 에러 해결 방법

구글링을 해보니 `makemigrations` 뒤에 앱 이름을 명시해주면 해결 된다고 한다.

```python
python manage.py makemigrations <해당 앱 이름>
```

<br/>

강의에서는 따로 앱 이름이 명시되지 않아 다른 사람들이 위 명령어를 성공했을 때 터미널에 발생하는 메시지와, 강의에서 보이는 명령어 성공 메시지를 대조해서 아래와 같이 앱 이름을 추측하여 명령어를 다시 실행해보았다.

```python
(venv) ➜  shrinkers git:(master) ✗ python manage.py makemigrations short
ener
No installed app with label 'shortener'.
```

<br/>

이제는 `No installed app with label ‘shortener'` 라는 에러가 발생한다.

<br/><br/>

# 3. **‘No installed app with label’** 에러 해결 방법

에러메시지의 뜻을 풀이하면, ‘**설치된 앱 중에 ‘shortener’라는 레이블을 달고 있는 앱이 없다**’ 라는 뜻이다.

<br/>

그렇다면 설치된 앱에 대한 정보는 어디에 저장되어있을까?

<br/>

`settings.py` 디렉터리의 `INSTALLED_APPS = []` 섹션을 참고하면 된다. 내 프로젝트에서 해당 섹션에 적혀져있는 내용을 보니, ‘shortener’는 등록되어있지 않았다.

```python
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

<br/>

그래서 ‘shortener’라는 앱을 새로 등록해주고,

```python
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'shortener'
]
```

<br/>

명령어를 다시 시작하니 데이터베이스 모델이 잘 생성된 것을 확인할 수 있었다.

```python
(venv) ➜  shrinkers git:(master) ✗ python manage.py makemigrations shortener  
Migrations for 'shortener':
  shortener/migrations/0001_initial.py
    - Create model PayPlan
```

<br/><br/>