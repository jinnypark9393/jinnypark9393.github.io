---

published: true
title:  "[Python/Django]settings.py의 SECRET_KEY 변경 및 분리하기"
excerpt: "Django 프로젝트의 소스코드를 공개된 장소에 올리기 전, 반드시 SECRET_KEY를 따로 저장하도록 한다"

categories:
- Programming
tags:
- [패스트캠퍼스, 패캠챌린지, 직장인인강, 직장인자기계발, 패스트캠퍼스후기, 한번에끝내는파이썬웹개발초격차패키지Online, Django에러, Python에러, makemigrations에러]

toc: true
toc_sticky: true

date: 2022-07-25
last_modified_at: 2022-07-25

---

<br/><br/>

# 1. 배경 상황

Django 실습 내용을 Github 저장소에 업로드해서 소스코드를 관리하려고 새롭게 깃허브 저장소를 생성하고 코드를 올렸었다.

<br/>

그런데 올리자마자 메일 알람이 울리는 것;;; 내용을 확인했더니 GitGuardian이라는 곳에서 온 “Django Secret Key exposed on GitHub”이라는 보안 알람 메일이었다. 깜짝 놀라서 소스코드를 뜯어봤더니 settings.py에 SECRET_KEY가 대놓고 들어있어서 얼른 github에 생성했던 저장소를 삭제했다(실습 시작한지 진짜 얼마 안되어서 다행이었음).

<br/>

이 SECRET_KEY는 [Django의 보안 관련 기능](https://docs.djangoproject.com/en/1.11/ref/settings/#std:setting-SECRET_KEY)에 사용하는 값으로, 다음과 같은 경우에 사용된다.

- **`django.contrib.sessions.backends.cache`**가 아닌 다른 세션 백엔드를 사용하는 경우 혹은 기본 **`[get_session_auth_hash()](https://docs.djangoproject.com/en/1.11/topics/auth/customizing/#django.contrib.auth.models.AbstractBaseUser.get_session_auth_hash)`**를 사용하는 모든 [sessions](https://docs.djangoproject.com/en/1.11/topics/http/sessions/).
- **`[CookieStorage](https://docs.djangoproject.com/en/1.11/ref/contrib/messages/#django.contrib.messages.storage.cookie.CookieStorage)`** 혹은 **`[FallbackStorage](https://docs.djangoproject.com/en/1.11/ref/contrib/messages/#django.contrib.messages.storage.fallback.FallbackStorage)`**를 사용하는 모든 [messages](https://docs.djangoproject.com/en/1.11/ref/contrib/messages/).
- 모든 **`[PasswordResetView](https://docs.djangoproject.com/en/1.11/topics/auth/default/#django.contrib.auth.views.PasswordResetView)`** 토큰.
- 다른 키가 제공되지 않는 [cryptographic signing](https://docs.djangoproject.com/en/1.11/topics/signing/) 에 사용된다.

<br/>

이 시크릿 키는 Django 프로젝트의 설정값을 모아놓은 `[settings.py](http://settings.py)` 에 저장되어있는데, 아래와 같이 키값이 그대로 파일에 들어가있어 공개된 저장소에 올릴 경우 시크릿 키 값이 그대로 노출이 된다.

```python
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-(i6d9syn7v6s#=q19h4p64-vn&%g6gw+vk7l&uqu@ee9quz!i@'
```

<br/>

구글링으로 찾아보니 SECRET_KEY를 노출하지 않고 관리하기 위해서는 환경변수로 지정하는 방법, 그리고 별도 파일로 분리해서 관리하는 방법, 총 두 가지 방법이 있었다.

<br/><br/>

# 2. Django 프로젝트의 SECRET_KEY를 별도 파일에 저장하기

기본으로 생성되는 키 대신 다른 키를 사용하고 싶다면 [Django Secret Key Generator](https://miniwebtool.com/django-secret-key-generator/)를 사용하거나, 아래의 코드를 실행해 임의의 50글자를 생성할 수 있다.

```bash
import string, random

# Get ascii Characters numbers and punctuation (minus quote characters as they could terminate string).
chars = ''.join([string.ascii_letters, string.digits, string.punctuation]).replace('\'', '').replace('"', '').replace('\\', '')

SECRET_KEY = ''.join([random.SystemRandom().choice(chars) for i in range(50)])

print(SECRET_KEY)
```

<br/>

아래 명령어로 시크릿 키 값을 저장할 json파일을 프로젝트 root 디렉토리에 생성한다.

```bash
➜  myfirstsite git:(master) ✗ touch secrets.json
➜  myfirstsite git:(master) ✗ tree
.
├── db.sqlite3
├── manage.py
├── myfirstsite
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-310.pyc
│   │   ├── settings.cpython-310.pyc
│   │   ├── urls.cpython-310.pyc
│   │   └── wsgi.cpython-310.pyc
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── polls
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-310.pyc
│   │   ├── urls.cpython-310.pyc
│   │   └── views.cpython-310.pyc
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
└── secrets.json

5 directories, 23 files
```

<br/>

생성한 json 파일에 새로 생성한 시크릿 키 값을 저장한다.

```bash
{
    "SECRET_KEY": "생성한 시크릿 키 값"
  }
```

<br/>

`[settings.py](http://settings.py)` 파일에서 새로운 모듈을 추가한 뒤, 하드코딩된 SECRET_KEY를 대체하는 코드를 추가한다.

```bash
import os, json
from django.core.exceptions import ImproperlyConfigured

secret_file = os.path.join(BASE_DIR, 'secrets.json') # secrets.json 파일 위치를 명시

with open(secret_file) as f:
    secrets = json.loads(f.read())

def get_secret(setting, secrets=secrets):
    """비밀 변수를 가져오거나 명시적 예외를 반환한다."""
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {} environment variable".format(setting)
        raise ImproperlyConfigured(error_msg)

SECRET_KEY = get_secret("SECRET_KEY")
```

<br/>

`.gitignore` 파일을 생성해 secrets.json 파일을 Git 커밋에 포함하지 않도록 한다.

```bash
➜  myfirstsite git:(master) ✗ vi .gitignore
===
secrets.json
```

<br/>

개발서버를 실행해 서버 빌드에 문제가 없는지 확인한다.

```bash
➜  myfirstsite git:(master) ✗ python3 manage.py runserver 
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.
July 24, 2022 - 00:44:49
Django version 4.0.6, using settings 'myfirstsite.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

문제 없이 올라간 경우 git 명령어로 원격 저장소에 소스코드를 업로드하자(git status로 푸시 전 반드시 secrets.json이 스테이지 영역에서 제외되었는지 확인할 것).

<br/><br/>
