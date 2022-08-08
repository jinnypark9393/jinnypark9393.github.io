---
emoji: 🐍
title:  Python Django 튜토리얼(1)프로젝트/앱 생성하고 view 작성하기
date: '2022-07-24 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

“[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 강의의 Django 파트를 수강하고 있는데, 생각보다 설명이 생략된 부분이 많아 코드 따라치기만 하게 되는듯해 Django 공식문서의 튜토리얼을 따라해 이해도를 높인 다음 다시 들으려한다.

<br/>

이 글은 Django 문서의 [첫 번째 장고 앱 작성하기](https://docs.djangoproject.com/ko/4.0/intro/tutorial01/) 튜토리얼을 참고해 실습한 내용을 정리한 것이다.

<br/><br/>

# 1. 산출물

- Polls라는 이름의 간단한 설문조사 애플리케이션을 제작
    - Public: 사람들이 설문 내용을 보고 직접 투표할 수 있는 개방된 사이트
    - Private: 관리자가 설문을 추가, 변경, 삭제할 수 있는 관리용 사이트

<br/><br/>

# 2. 사전 작업

- `Django` 를 설치한다(Django 4.0버전 기준. Python 3.8이상 버전 설치 권장).
- Django가 설치가 잘 되었는지 확인하기 위해 아래의 명령어를 실행한다.
    
    ```python
    ➜  ~ git:(master) ✗ python3 -m django --version
    4.0.6
    ```
    
    - 설치가 되지 않았다면 “No module named django”와 같은 에러가 발생한다.

<br/><br/>

# 3. 프로젝트 생성

프로젝트를 저장할 디렉터리로 이동한 후, 다음의 명령어를 수행한다.

```python
➜  github git:(master) ✗ django-admin startproject myfirstsite
```

- myfirstsite라는 디렉터리가 생성되었다.
- 참고: 프로젝트 생성 시, Python 혹은 Django에서 사용 중인 이름은 피해야 한다. 특히 django(Django 자체와 충돌 발생), test(Python 패키지 이름 중 하나)와 같은 이름은 피해야 한다.

<br/>

ll 명령어로 프로젝트 디렉터리가 잘 생성되었는지 확인한다.

```python
➜  github git:(master) ✗ ll
total 0
drwxr-xr-x  35 jinipark  staff   1.1K Jun 28 05:48 jinnypark9393.github.io
drwxr-xr-x   4 jinipark  staff   128B Jul 23 23:10 myfirstsite
```

<br/>

초기 생성된 Django 프로젝트 myfirstsite 하위에는 아래와 같은 디렉터리/파일이 생성된다.
    
    ```python
    ➜  myfirstsite git:(master) ✗ tree
    .
    ├── manage.py
    └── myfirstsite
        ├── __init__.py
        ├── asgi.py
        ├── settings.py
        ├── urls.py
        └── wsgi.py
    
    1 directory, 6 files
    ```
    
    - **`manage.py`**: Django 프로젝트에서 사용하는 커맨드라인의 유틸리티. 자세한 정보는 [django-admin and manage.py](https://docs.djangoproject.com/ko/4.0/ref/django-admin/) 에서 확인.
    - **`myfirstsite/`** 디렉토리 내부에는 프로젝트를 위한 실제 Python 패키지들이 저장된다. 이 디렉토리 내의 이름을 이용하여, (**`myfirstsite.urls`** 와 같은 식으로) 프로젝트의 어디서나 Python 패키지들을 import할 수 있다.
    - **`myfirstsite/__init__.py`**: Python이 이 디렉토리를 패키지처럼 다루라고 알려주는 용도의 단순한 빈 파일이다. 패키지에 대해 궁금하다면 [패키지](https://docs.python.org/3/tutorial/modules.html#tut-packages)를 참고한다.
    - **`mysfirstite/settings.py`**: 현재 Django 프로젝트의 환경 및 구성을 저장한다. [Django settings](https://docs.djangoproject.com/ko/4.0/topics/settings/)에서 환경 설정이 어떻게 동작하는지 확인할 수 있다.
    - **`myfirstsite/urls.py`**: 현재 Django project 의 URL 선언을 저장한다. 사이트의 “목차” 라고 생각하면 된다. 자세한 내용은 [URL dispatcher](https://docs.djangoproject.com/ko/4.0/topics/http/urls/) 를 참고한다.
    - **`myfirstsite/asgi.py`**: 현재 프로젝트를 서비스하기 위한 ASGI-호환 웹 서버의 진입점이다. 자세한 내용은 [ASGI를 사용하여 배포하는 방법](https://docs.djangoproject.com/ko/4.0/howto/deployment/asgi/) 를 참고한다.
    - **`myfirstsite/wsgi.py`**: 현재 프로젝트를 서비스하기 위한 WSGI 호환 웹 서버의 진입점다. 자세한 내용은 [WSGI를 사용하여 배포하는 방법](https://docs.djangoproject.com/ko/4.0/howto/deployment/wsgi/)를 참고한다.

<br/><br/>

# 4. 개발 서버

`myfirstsite` 디렉터리로 이동해 다음 명령어를 입력하면 Django 개발 서버를 시작할 수 있다.

```python
➜  myfirstsite git:(master) ✗ python3 manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.
July 23, 2022 - 14:39:59
Django version 4.0.6, using settings 'myfirstsite.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

<br/>

- 데이터베이스에 적용되지 않은 변경사항들(migrations)는 현재는 크게 신경쓰지 않아도 된다.
- 웹 브라우저에서 `http://127.0.0.1:8000` 을 입력해 개발서버에 접속할 수 있다.
- 개발 서버는 순수 Python으로 작성된 경량의 웹 서버이며 운영 이관 전까지 Apache와 같은 운영 서버를 구성할 필요 없이 신속하게 개발 할 수 있도록 만들어진 도구이다(운영 환경과 유사한 환경에서는 사용하지 말 것)
- 포트 변경
    - 기본적으로 runserver 명령은 8080포트를 사용하도록 설정되어있다.
    - 이 설정을 변경하려면 아래와 같이 커맨드라인에서 인수를 전달하면 된다.
        
        ```python
        python manage.py runserver 8080
        ```
        
    - IP를 변경하려면 포트와 함께 커맨드라인에서 인수를 전달한다.
- runserver는 요청이 들어올 때마다 Python 파일을 다시 불러오므로 코드 변경사항 반영을 위해 서버를 기동하지 않아도 된다. 다만 파일 추가 등 몇 동작은 개발서버가 자동으로 인식하지 못하는 경우도 있다.

<br/><br/>

# 5. 설문조사(polls) 앱 만들기

다음으로는 생성된 프로젝트 내에서 앱(app)을 생성해보자. Django에서는 앱의 기본 디렉터리 구조를 자동으로 생성해준다.

- 참고: 프로젝트와 앱의 차이
    - 앱: 블로그 시스템, 공개 기록 데이터베이스 또는 소규모 의견조사 앱과 같은 작업을 수행하는 웹 애플리케이션.
    - 프로젝트: 특정 웹 사이트에 대한 구성 및 앱의 모음. 한 프로젝트에 여러 개의 앱이 포함될 수 있으며, 앱은 여러 프로젝트에 있을 수 있다.

manage.py가 존재하는 디렉터리에서 polls라는 이름의 앱을 생성해보자.

```python
➜  myfirstsite git:(master) ✗ python3 manage.py startapp polls
➜  myfirstsite git:(master) ✗ ll
total 8
-rw-r--r--  1 jinipark  staff     0B Jul 23 23:39 db.sqlite3
-rwxr-xr-x  1 jinipark  staff   667B Jul 23 23:10 manage.py
drwxr-xr-x  8 jinipark  staff   256B Jul 23 23:39 myfirstsite
drwxr-xr-x  9 jinipark  staff   288B Jul 24 05:50 polls
➜  myfirstsite git:(master) ✗ cd polls
➜  polls git:(master) ✗ tree
.
├── __init__.py
├── admin.py
├── apps.py
├── migrations
│   └── __init__.py
├── models.py
├── tests.py
└── views.py
```

# 6. 첫 번째 뷰 작성하기

`polls` 디렉터리의 `view.py`파일을 열어 다음과 같은 파이썬 코드를 입력한다.

```python
from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
```

뷰를 생성한 뒤에는 URLconf를 사용해 뷰를 호출할 수 있도록 URL을 연결해준다. 먼저, urls.py라는 파일을 생성한다.

```bash
➜  polls git:(master) ✗ touch urls.py
➜  polls git:(master) ✗ tree
.
├── __init__.py
├── admin.py
├── apps.py
├── migrations
│   └── __init__.py
├── models.py
├── tests.py
├── urls.py
└── views.py

1 directory, 8 files
```

`urls.py` 파일에 다음과 같은 코드를 작성한다.

```bash
from django.urls import path

from . import views

urlpatterns = [
    path('', view.index, name='index'),
]
```

다음으로는 최상위 URLconf에서 `polls.urls` 모듈을 바라보게 설정한다.

```bash
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
]
```

- `include()` : 다른 URLconf들을 참조할 수 있도록 도와주는 함수. Django가 이 함수를 만나게 되면 URL의 그 시점까지 일치하는 부분을 잘라내고, 남은 문자열 부분을 후속 처리를 위해 include된 URLconf로 전달한다.

`polls` 의 index뷰가 잘 연결되어있는지 확인하기 위해 개발서버를 올려 확인해보자.

```bash
➜  myfirstsite git:(master) ✗ python3 manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.
July 23, 2022 - 21:07:37
Django version 4.0.6, using settings 'myfirstsite.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

`http://127.0.0.1:8000/polls`를 브라우저에 입력하면 polls의 index 뷰에 정의한 “Hello, world. You're at the polls index.” 가 보인다.

`path()` 함수에는 필수 인수 `route` & `view`, 추가 옵션으로 `kwargs` & `name` 까지 총 4개의 인수가 전달된다.

## 1. path() 인수: route

- URL 패턴을 가진 문자열. 요청이 처리될 때 Django는 urlpatterns의 첫 패턴부터 일치하는 패턴을 찾을때까지 요청된 URL을 각 패턴과 리스트를 순서대로 비교한다.
- 패턴은 GET, POST의 매개변수들, 혹은 도메인 이름을 색인하지 않는다.
    - `https://www.example.com/myapp/` → `myapp/` 만 바라본다.
    - `https://www.example.com/myapp/?page=3` → `myapp/`만 바라본다.

## 1. path() 인수: view

- 일치하는 패턴을 찾으면, [HttpRequest](https://docs.djangoproject.com/ko/4.0/ref/request-response/#django.http.HttpRequest) 객체를 첫번째 인수로 하여 경로로 부터 ‘캡처된’ 값을 키워드 인수로하여 특정한 view 함수를 호출한다.

## 1. path() 인수: kwargs

- 임의의 키워드 인수들은 목표한 view 에 딕셔너리형으로 전달된다.

## 1. path() 인수: name

- URL 에 name을 붙이면, 템플릿을 포함한 Django 어디에서나 명확하게 참조할 수 있다.
- 이 기능을 이용해 단 하나의 파일만 수정해도 project 내의 모든 URL 패턴을 바꿀 수 있다.
    
<br/><br/>