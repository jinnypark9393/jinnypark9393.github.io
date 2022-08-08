---
emoji: 🐍
title:  Python 패스트캠퍼스 챌린지 68일차
date: '2022-07-19 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 셀프 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 강의 1일 1강 포스팅 챌린지 :)

<br/>

# 02. Django 프로젝트 시작

## 1. PEP8 Coding Convention

### (1) Coding Convention

- 여러 사람이 협업을 해도 모두가 읽기 편한 코드를 작성하기 위한 기본 규칙
    - 한 줄의 문자열은 79자
    - DocString은 72자
    - snake_case(소문자_소문자) 사용
    - 모듈 레벨 상수는 모두 대문자
    - ClassName은 Caplitalized Word(단어의 앞 철자만 대문자)
    - 한줄로 된 if, try … except, for, while 구문은 사용하지 않는다.
- **하지만 Local Rule이 더 중요하다.**

<br/>

### (2) Django 에서의 Coding Convention

- 한 줄의 문자열은 119자 추천
- DocString 은 72자

<br/><br/>

## 2. Zen of Python

### (1) PEP20 - Zen of Python

- Beautiful is better than ugly.
- Explicit is better than implicit.
- Simple is better than complex
- Complex is better than complicated.
- Flat is better than nested.
- Sparse is better than dense.
- **Readability counts(가독성이 중요하다)**
- Special cases aren’t special enough to break the rules

<br/>

- 상세 내용을 확인하려면 터미널에서 python3 후 import this 입력

```bash
➜  ~ git:(master) ✗ python3
Python 3.10.4 (v3.10.4:9d38120e33, Mar 23 2022, 17:29:05) [Clang 13.0.0 (clang-1300.0.29.30)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

<br/><br/>

## 3. 프로젝트 시작하기

- 파이썬 버전확인하기

```bash
➜  ~ git:(master) ✗ python.3.8
zsh: command not found: python.3.8
➜  ~ git:(master) ✗ python3.8
zsh: command not found: python3.8
➜  ~ git:(master) ✗ python3
Python 3.10.4 (v3.10.4:9d38120e33, Mar 23 2022, 17:29:05) [Clang 13.0.0 (clang-1300.0.29.30)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

<br/>

- 파이썬 버전에 맞는 Django 설치하기

```bash
➜  ~ git:(master) ✗ pip3.10 install django
Collecting django
  Downloading Django-4.0.6-py3-none-any.whl (8.0 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 8.0/8.0 MB 2.4 MB/s eta 0:00:00
Collecting sqlparse>=0.2.2
  Downloading sqlparse-0.4.2-py3-none-any.whl (42 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 42.3/42.3 KB 2.0 MB/s eta 0:00:00
Collecting asgiref<4,>=3.4.1
  Downloading asgiref-3.5.2-py3-none-any.whl (22 kB)
Installing collected packages: sqlparse, asgiref, django
Successfully installed asgiref-3.5.2 django-4.0.6 sqlparse-0.4.2
WARNING: You are using pip version 22.0.4; however, version 22.1.2 is available.
You should consider upgrading via the '/Library/Frameworks/Python.framework/Versions/3.10/bin/python3.10 -m pip install --upgrade pip' command.
```

- Django 버전정보는 링크 참조: [https://docs.djangoproject.com/en/4.0/faq/install/](https://docs.djangoproject.com/en/4.0/faq/install/)

<br/>

- 프로젝트 생성

```bash
➜  ~ git:(master) ✗ django-admin startproject shrinkers
➜  ~ git:(master) ✗ ls
AWS                        Documents                  Music                      Virtual Machines.localized jinnypark9393.github.io
Applications               Downloads                  Pictures                   anaconda3                  old
Creative Cloud Files       Library                    Public                     data                       shrinkers
Desktop                    Movies                     PycharmProjects            data.csv
```

<br/>

- 생성된 프로젝트 확인

```bash
➜  shrinkers git:(master) ✗ ls
manage.py shrinkers
```

<br/>

- 가상환경 생성(파이썬 프로젝트에서 필수)

```bash
➜  shrinkers git:(master) ✗ virtualenv venv
created virtual environment CPython3.10.4.final.0-64 in 980ms
  creator CPython3Posix(dest=/Users/jinipark/shrinkers/venv, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/Users/jinipark/Library/Application Support/virtualenv)
    added seed packages: pip==22.1.2, setuptools==62.6.0, wheel==0.37.1
  activators BashActivator,CShellActivator,FishActivator,NushellActivator,PowerShellActivator,PythonActivator
```

<br/>

- 가상환경 디렉토리 하위에 파일들이 잘 생성되었는지 확인 후, 가상환경을 활성화한다.

```bash
➜  shrinkers git:(master) ✗ ls
manage.py shrinkers venv
➜  shrinkers git:(master) ✗ cd venv
➜  venv git:(master) ✗ ls                      
bin        lib        pyvenv.cfg

➜  shrinkers git:(master) ✗ source venv/bin/activate
```

<br/>

- Django를 다시 설치하면 다시 새롭게 설치된다.

```bash
(venv) ➜  shrinkers git:(master) ✗ pip install django
Collecting django
  Using cached Django-4.0.6-py3-none-any.whl (8.0 MB)
Collecting sqlparse>=0.2.2
  Using cached sqlparse-0.4.2-py3-none-any.whl (42 kB)
Collecting asgiref<4,>=3.4.1
  Using cached asgiref-3.5.2-py3-none-any.whl (22 kB)
Installing collected packages: sqlparse, asgiref, django
Successfully installed asgiref-3.5.2 django-4.0.6 sqlparse-0.4.2
```

<br/>

- `runserver` 로 서버를 실행하면 `localhost` 로 Django에 접속할 수 있다.
    - 참고: `[localhost` 주소](https://jinnypark9393.github.io/devops/Network-Loopback-IP-address/)

```bash
(venv) ➜  shrinkers git:(master) ✗ python manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.
July 04, 2022 - 20:50:16
Django version 4.0.6, using settings 'shrinkers.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

<br/>

- 브라우저에서 주소창에 localhost:port넘버를 입력하면 접속된다.

![2022-07-19-Python-Photo1](/assets/images/2022-07-19-Python-Photo/2022-07-19-Python-Photo1.png)

<br/>

- 앱을 하나 실행해주자.

```bash
(venv) ➜  shrinkers git:(master) ✗ python manage.py startapp shortener
(venv) ➜  shrinkers git:(master) ✗ ls
db.sqlite3 manage.py  shortener  shrinkers  venv
```

<br/>

- vscode에서 shrinkers 폴더를 오픈하자.
- 가상환경 접속이 되어 있지 않은 경우 `source venv/bin/activate` 명령어로 다시 접속해주자.
- 가상환경을 비활성화 하고 싶은 경우 `deactivate` 를 입력하면 된다.

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**

<br/><br/>