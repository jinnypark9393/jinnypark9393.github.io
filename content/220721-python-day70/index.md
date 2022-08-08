---
emoji: 🐍
title:  Python 패스트캠퍼스 챌린지 70일차
date: '2022-07-21 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 셀프 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 강의 1일 1강 포스팅 챌린지 :)

<br/><br/>

# 04. Django Database Modeling (2)

## 1. Database Modeling

- 지난 시간에 이어 PayPlan에 대해 모델링을 진행할 것

```python
from django.db import models

# Create your models here.

class PayPlan(models.Model):
    name = models.CharField(max_length=20)
    price = models.IntegerField()
    updated_at = models.DateTimeField(auto_now=True)
    create_at = models.DateTimeField(auto_now_add=True)
```

- class로 models라는 모듈의 Model을 상속받아온다.
- 컬럼 이름 및 데이터 타입 정의(예: name → 컬럼 이름, CharField → 데이터 타입)
- price의 경우 미국 등의 경우 integer를 사용할 수 없으나 한국 원화의 경우 integer를 사용해도 무방.

<br/>

실제로 코드에 적용해보자.

- SHRINKERS > shortner > models.py 파일을 아래와 같이 수정해준다.
    
    ```python
    from django.db import models
    
    # Create your models here.
    
    class PayPlan(models.Model):
        name = models.CharField(max_length=20)
        price = models.IntegerField()
        updated_at = models.DateTimeField(auto_now=True)
        create_at = models.DateTimeField(auto_now_add=True)
    ```
    
    - class를 추가해 준 뒤에는 잠시 주석처리 해둔다.

<br/>

- Terminal > New Terminal로 새 터미널 창을 연 다음 아래 명령어를 실행해준다.
    
    ```python
    (venv) ➜  shrinkers git:(master) ✗ python manage.py migrate
    Operations to perform:
      Apply all migrations: admin, auth, contenttypes, sessions
    Running migrations:
      Applying contenttypes.0001_initial... OK
      Applying auth.0001_initial... OK
      Applying admin.0001_initial... OK
      Applying admin.0002_logentry_remove_auto_add... OK
      Applying admin.0003_logentry_add_action_flag_choices... OK
      Applying contenttypes.0002_remove_content_type_name... OK
      Applying auth.0002_alter_permission_name_max_length... OK
      Applying auth.0003_alter_user_email_max_length... OK
      Applying auth.0004_alter_user_username_opts... OK
      Applying auth.0005_alter_user_last_login_null... OK
      Applying auth.0006_require_contenttypes_0002... OK
      Applying auth.0007_alter_validators_add_error_messages... OK
      Applying auth.0008_alter_user_username_max_length... OK
      Applying auth.0009_alter_user_last_name_max_length... OK
      Applying auth.0010_alter_group_name_max_length... OK
      Applying auth.0011_update_proxy_permissions... OK
      Applying auth.0012_alter_user_first_name_max_length... OK
      Applying sessions.0001_initial... OK
    ```
    
    - 위 명령어를 통해 Django 프레임워크가 필요로 하는 데이터 베이스를 생성한다.

<br/>

- 앞에서 작성한 class 코드의 주석처리를 해제하고, 아래의 명령어를 실행해준다.
    
    ```python
    (venv) ➜  shrinkers git:(master) ✗ python manage.py makemigrations shortener  
    Migrations for 'shortener':
      shortener/migrations/0001_initial.py
        - Create model PayPlan
    ```
    
<br/>

- 여기서 에러가 발생했는데 해결 방법은 [여기](https://jinnypark9393.github.io/programming/Python-Django-makemigrations-error/) 참조

<br/>

- migrate 을 진행해준다.

```python
(venv) ➜  shrinkers git:(master) ✗ python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions, shortener
Running migrations:
  Applying shortener.0001_initial... OK
```

<br/><br/>

## 2. CreateSuperUser

- 앱의 첫 슈퍼 유저(사용자)를 만드는 방법
    
    ```python
    python manage.py createsuperuser
    ```

<br/>    

- 실습해보자.
    
    ```python
    (venv) ➜  shrinkers git:(master) ✗ python manage.py createsuperuser
    Username (leave blank to use 'jinipark'): admin
    Email address: admin@shrinkers.com 
    Password: 
    Password (again): 
    Superuser created successfully.
    ```
    
    - 비밀번호 규칙 → 최소 8자(8자 이하인 경우에도 생성은 가능)

<br/><br/>

# 3. DBeaver 설치

- DBeaver 공식 웹사이트([https://dbeaver.io/download/](https://dbeaver.io/download/))에 접속해 설치파일을 다운로드, 설치를 진행한다.

<br/>

- DBeaver를 실행한뒤, 좌측 상단의 `+` 버튼을 눌러 프로젝트 생성을 시작한다.
- SQLite를 선택
- Path 옆의 Open 버튼을 선택 → 프로젝트 폴더의 SQLite3 파일을 선택
- 완료 버튼 클릭(DB 드라이버가 없는 경우 다운로드를 받도록 안내창이 생성된다)

<br/>

- Tables 중 `auth` 와 `Django` 로 시작하는 테이블은 Django 프레임워크가 사용하는 부분, `shortener_payplan` 위의 실습에서 생성한 부분이다.
- `auth_user` 테이블에서 `Data` 탭을 클릭해 들어가보면, 위의 실습에서 생성한 superuser를 확인할 수 있다.

<br/>

- 위의 사항들은 Django admin에서도 확인할 수 있지만 DBMS에서 확인하는 것이 훨씬 편리하다.

<br/>

- Django admin으로 접속해 내용을 확인해보자.
    - 터미널에서 아래 명령어를 입력해 서버를 실행해주자.
        
        ```python
        (venv) ➜  shrinkers git:(master) ✗ python manage.py runserver
        ```
        
    - [http://127.0.0.1:8000/](http://127.0.0.1:8000/) 주소로 접속하면 Django 메인 화면이 뜨는데, 여기서 [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/) 로 이동해 위 실습에서 생성한 admin 유저로 로그인해준다.
    - user를 들어가보면 admin이 등록되어있음을 확인할 수 있다.

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**

<br/><br/>