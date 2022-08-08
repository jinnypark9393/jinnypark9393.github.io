---
emoji: 🐍
title:  Python Django 튜토리얼(2)데이터베이스 설치, API 실습
date: '2022-07-26 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

# 1. 데이터베이스 설치

settings.py를 열어보자. settings.py는 Django 설정을 모듈 변수로 표현한 보통의 Python 모듈이다.

<br/>

Django에서는 기본적으로 SQLite를 사용하도록 구성되어있으며(Python에서 기본으로 제공되어 별도 설치 불필요), 이번 실습에서는 SQLite를 활용하여 데이터베이스를 구성하도록 한다. 만약 다른 데이터베이스를 사용하고 싶은 경우 DATABASES의 키 값을 적절히 변경해준다(상세 설명은 [공식문서](https://docs.djangoproject.com/ko/4.0/intro/tutorial02/)를 참고한다).

<br/><br/>

## 1. settings.py설정

settings.py의 TIME_ZONE 설정값을 수정해 현재 작업하고 있는 시간대를 맞춰준다.

<br/>

settings.py의 [INSTALLED_APPS](https://docs.djangoproject.com/ko/4.0/ref/settings/#std-setting-INSTALLED_APPS)는 현재 Django 인스턴스에서 활성화된 모든 Django 어플리케이션들의 이름이 들어있다. 앱들은 다수의 프로젝트에서 사용될 수 있고, 다른 프로젝트에서 쉽게 사용될 수 있도록 패키징하여 배포할 수 있다.

<br/>

[INSTALLED_APPS](https://docs.djangoproject.com/ko/4.0/ref/settings/#std-setting-INSTALLED_APPS)에 기본적으로 설정되어 있는 앱은 아래와 같다.

<br/>

- [django.contrib.admin](https://docs.djangoproject.com/ko/4.0/ref/contrib/admin/#module-django.contrib.admin) – 관리용 사이트.
- [django.contrib.auth](https://docs.djangoproject.com/ko/4.0/topics/auth/#module-django.contrib.auth) – 인증 시스템.
- [django.contrib.contenttypes](https://docs.djangoproject.com/ko/4.0/ref/contrib/contenttypes/#module-django.contrib.contenttypes) – 컨텐츠 타입을 위한 프레임워크.
- [django.contrib.sessions](https://docs.djangoproject.com/ko/4.0/topics/http/sessions/#module-django.contrib.sessions) – 세션 프레임워크.
- [django.contrib.messages](https://docs.djangoproject.com/ko/4.0/ref/contrib/messages/#module-django.contrib.messages) – 메세징 프레임워크.
- [django.contrib.staticfiles](https://docs.djangoproject.com/ko/4.0/ref/contrib/staticfiles/#module-django.contrib.staticfiles) – 정적 파일을 관리하는 프레임워크.

<br/>

애플리케이션들은 데이터베이스 테이블을 사용하므로, 데이터베이스에서 테이블을 생성해야한다. 다음 명령으로 테이블을 생성해주자.

```bash
➜  myfirstsite git:(master) python3 manage.py migrate
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

- `migrate` : INSTALLED_APPS의 설정을 탐색해 settings.py의 데이터베이스 설정 및 app과 함께 제공되는 database migrations에 따라 데이터베이스 테이블을 생성한다.
- 생성 내용을 확인하려면 데이터베이스 클라이언트로 접속 후 `\dt` (PostgreSQL), `SHOW TABLES;` (MariaDB, MySQL), `.tables` (SQLite), `SELECT TABLE_NAME FROM USER_TABLES;`(Oracle)로 확인할 수 있다.
- 기본 앱 중에 필요 없는 앱이 있다면 INSTALLED_APPS에서 주석처리하면 migrate 명령에서 데이터베이스 테이블을 생성하지 않는다.

<br/><br/>

# 2. 모델 만들기

모델이란 부가적인 메타데이터를 가진 데이터베이스의 구조(layout)을 뜻한다.

<br/>

## 💡 Django 철학 (1)

- 모델 = 데이터에 대한 단 하나의 확실한 정보 출처
- 저장 중인 데이터의 필수 필드 및 동작 포함
- DRY Principle(Don’t Repeat Yourself)을 준수: 데이터 모델을 한 곳에서 정의 및 데이터 모델 자동으로 파생(`migration`: 모델 파일에서 파생)

<br/>

이 설문조사 앱에서는 `Question` 과 `Choice` 라는 두 가지 모델을 생성한다.

- `Questions`: 질문 및 발행일
- `Choice`: 선택 텍스트, 투표 집계
- 각 `Choice` 모델은 `Question`과 연동된다.

<br/>

위의 개념은 Python 클래스로 표현된다. `polls/models.py`파일을 아래와 같이 수정한다.

```python
from django.db import models

# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

- Question, Choice 각 모델은 :class:`django.db.models.Model`의 하위 클래스로 표현된다.
- 모델은 여러 클래스 변수를 가지며 각 클래스 변수는 모델에서 데이터베이스 필드를 나타낸다.
    - 예: 모델 `Question` 은 `questions_text` 와 `pub_date` 라는 클래스 변수를 가지며 각 클래스 변수는 데이터베이스의 필드에 해당한다.

<br/>

데이터베이스의 각 필드는 `Field` 클래스의 인스턴스로서 표현되며, 각 필드가 어떤 자료형을 가질 수 있는지 Django에 알려주는 역할을 한다.

- CharField: 문자(Character) 필드
- DateTimeField: 날짜와 시간(Datetime)필드

각 Field 인스턴스의 이름(`questions_text` 와 `pub_date`)는 기계가 읽기 좋은 형식의 데이터베이스 필드 이름이다. 이 필드명을 **Python 코드**에서 사용할 수 있으며, 데이터베이스에서는 **컬럼명**으로 사용된다.

<br/>

- Field 클래스 생성자에 선택적인 첫번째 위치 인수를 전달하여 사람이 읽기 좋은(human-readable) 이름을 지정할 수도 있습니다. 이 방법은 Django 의 내부를 설명하는 용도로 종종 사용되는데, 이는 마치 문서가 늘어나는 것 같은 효과를 가집니다. 만약 이 선택적인 첫번째 위치 인수를 사용하지 않으면, Django 는 기계가 읽기 좋은 형식의 이름을 사용합니다. 이 예제에서는, `Question.pub_date`에 한해서만 인간이 읽기 좋은 형태의 이름을 정의하겠습니다. 그 외의 다른 필드들은, 기계가 읽기 좋은 형태의 이름이라도 사람이 읽기에는 충분합니다.
- 일부 Field 클래스는 필수 인수가 필요하다(예: CharField → max_length 가 필요)
- Field 는 다양한 옵션 인수를 가질 수 있다(예: default를 이용해 votes의 기본값을 0으로 설정)
- ForeignKey를 사용해 모델간의 관계를 설정할 수 있다.
    - 예: 각 Choice가 하나의 Question에 연관
    - Django에서 지원하는 데이터베이스 관계:  다-대-일(many-to-one), 다-대-다(many-to-many), 일-대-일(one-to-one) 등 모든 일반 데이터베이스의 관계

<br/><br/>

# 3. 모델의 활성화

위에서 작성한 코드를 이용해 Django에서는 다음과 같은 작업을 수행할 수 있다.

<br/>

- 앱을 위한 데이터베이스 스키마 생성(CREATE TABLE문)
- Question과 Choice객체에 접근하기 위한 Python 데이터베이스 접근 API 생성


<br/>

## 💡 Django의 철학(2)

- Django의 앱들은 끼웠다 뺐다 할 수 있다(=모듈)
- 앱을 다수의 프로젝트에서 사용 혹은 배포할 수 있다.
- 특정 Django 사이트에 앱이 묶여있지 않아도 된다.

<br/>

위의 작업을 수행하기 전, 프로젝트에 `polls` 앱이 설치되어 있다는 것을 알려야 한다. 그러기 위해서는 `INSTALLED_APPS` 설정에 앱을 추가해야 한다. polls 앱의 설정을 담은 PollsConfig 클래스는 `polls/apps.py` 파일 내에 존재한다. 따라서 점으로 구분된 경로는 `polls.apps.PollsConfig` 가 된다. 이 점으로 구분된 경로를 `django-myfirstsite/settings.py` 파일을 편집해 아래와 같이 추가한다.

```python
INSTALLED_APPS = [
    'polls.apps.PollsConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

<br/>

이제 Django에서 polls앱을 인식할 수 있다. 다음은 makemigrations 명령어를 실행해보자.

```python
➜  django-myfirstsite git:(master) ✗ python3 manage.py makemigrations polls
Migrations for 'polls':
  polls/migrations/0001_initial.py
    - Create model Question
    - Create model Choice
```

- `makemigrations`: 모델 변경 사항(위의 경우는 모델을 생성) 및 변경사항을 migration으로 저장하고 싶다는 점을 Django에 알려준다.
- `Migration`: Django가 모델(데이터베이스 스키마)의 변경사항을 디스크에 저장하는 방법. Django의 변경점을 수동으로 수정하는 것도 가능하다.
- `migrate` 명령어: migration을 실행하고 자동으로 데이터베이스 스키마(모델)를 관리하는 역할.

<br/>

migration이 내부적으로 실행하는 SQL문장은 아래와 같다.

```python
➜  django-myfirstsite git:(master) ✗ python3 manage.py sqlmigrate polls 0001
BEGIN;
--
-- Create model Question
--
CREATE TABLE "polls_question" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "question_text" varchar(200) NOT NULL, "pub_date" datetime NOT NULL);
--
-- Create model Choice
--
CREATE TABLE "polls_choice" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "choice_text" varchar(200) NOT NULL, "votes" integer NOT NULL, "question_id" bigint NOT NULL REFERENCES "polls_question" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "polls_choice_question_id_c5b4b260" ON "polls_choice" ("question_id");
COMMIT;
```

- 사용하는 데이터베이스에 따라 출력 결과가 다를 수 있다.
- 테이블 이름: 앱 이름과 모델 이름(소문자)가 조합되어 자동 생성 (예: polls_question, polls_choice)
- 기본 키(ID): 자동으로 추가
- 외래 키: 필드명에 `_id` 이름을 자동으로 추가
- 외래 키 관계는 `FOREIGN KEY` 라는 제약에 의해 명시된다(SQLite에서는 보이지 않음). `DEFERRABLE` 부분은 DBMS에 트랜잭션이 끝날 때까지 외래 키를 강제하지 말라고 알려준다.
- 사용하는 데이터베이스에 따라, 데이터베이스 고유의 필드타입이 조정된다. 따라서, 자동 증가 필드를 생성할 경우, `auto_increment`(MySQL), `serial`(PostgreSQL), `integer primary key autoincrement`(SQLite)와 같이 사용하는 데이터베이스에 따라 적절한 필드타입이 자동으로 선택된다. 필드 명에 사용되는 인용부호도 상황에 따라 겹따옴표나 홑따옴표가 적절히 선택된다.
- `sqlmigrate`명령은 실제로 데이터베이스에서 마이그레이션을 실행하는 것이 아니라 화면에 인쇄하여 필요한 SQL Django를 확인할 수 있도록 한다. 이것은 Django가 수행할 작업이나 변경을 위해 SQL 스크립트를 필요로 하는 데이터베이스 관리자가 있는지 확인하는 데 유용하다.

<br/>

더 자세히 알고 싶은 경우 `python manage.py check` 명령어를 통해 마이그레이션을 수행해보자.

<br/>

migrate을 실행해 데이터베이스 모델과 관련된 테이블을 생성하자.

```python
➜  django-myfirstsite git:(master) ✗ python3 manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, polls, sessions
Running migrations:
  Applying polls.0001_initial... OK
```

migrate 명령은 아직 적용되지 않은 마이그레이션을 수집해 실행한다(Django는 django_migrations 테이블을 두어 마이그레이션 적용 여부를 추적). 이 과정을 통해 모델에서의 변경 사항과 데이터베이스 스키마의 동기화가 이루어진다.

<br/>

데이터베이스나 테이블에 손대지 않고도 모델의 반복적인 변경을 가능하게 해준다. 동작 중인 데이터베이스를 자료 손실 없이 업그레이드 하는 데 최적화 되어 있다. 이제 모델의 변경을 만드는 아래 세 단계를 기억하도록 하자.

- (`models.py` 에서) 모델을 변경한다.
- [python manage.py makemigrations](https://docs.djangoproject.com/ko/4.0/ref/django-admin/#django-admin-makemigrations)을 통해 이 변경사항에 대한 마이그레이션을 생성한다.
- [python manage.py migrate](https://docs.djangoproject.com/ko/4.0/ref/django-admin/#django-admin-migrate)명령을 통해 변경사항을 데이터베이스에 적용한다.

<br/>

마이그레이션 생성과 적용 명령이 분리된 것은 Git과 같은 버전 관리 시스템에 마이그레이션을 커밋하고 앱과 함께 출시할 수 있도록 하기 위해서이다. 개발을 쉽게 해줄 뿐 아니라, 다른 개발자가 운영 환경에서도 사용할 수 있게 해준다(`manage.py` 유틸리티로 어떤 일들을 할 수 있는지 [django-admin 문서](https://docs.djangoproject.com/ko/4.0/ref/django-admin/)를 참고한다).

<br/><br/>

# 4. API 가지고 놀기

대화형 Python 쉘으로 Django API를 다뤄보자. 아래 명령어를 사용해 Python 쉘을 실행하자

```python
➜  django-myfirstsite git:(master) ✗ python3 manage.py shell
Python 3.10.4 (v3.10.4:9d38120e33, Mar 23 2022, 17:29:05) [Clang 13.0.0 (clang-1300.0.29.30)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
(InteractiveConsole)
```

<br/>

쉘에 진입한 후, [데이터베이스 API](https://docs.djangoproject.com/ko/4.0/topics/db/queries/)를 탐험해 보자.

```python
# 방금 생성한 모델 클래스를 import한다
>>> from polls.models import Choice, Question  

# 시스템에 아직 Question이 등록되지 않았다.
>>> Question.objects.all()
<QuerySet []>

# 신규 Question을 생성하자.
# Support for time zones is enabled in the default settings file, so
# Django expects a datetime with tzinfo for pub_date. Use timezone.now()
# instead of datetime.datetime.now() and it will do the right thing.
>>> from django.utils import timezone
>>> q = Question(question_text="What's new?", pub_date=timezone.now())

# 객체를 DB에 저장한다. save() 을 명시적으로 불러와야한다.
>>> q.save()

# 이제 해당 객체에 ID가 부여되었다.
>>> q.id
1

# 파이썬 속성을 통한 접근 모델(Access model) 필드값.
>>> q.question_text
"What's new?"
>>> q.pub_date
datetime.datetime(2022, 7, 25, 13, 18, 27, 714138, tzinfo=datetime.timezone.utc)

# 속성을 변경해 값을 변경하고 save()를 불러온다.
>>> q.question_text = "What's up?"
>>> q.save()

# objects.all()은 데이터베이스의 모든 질문들을 표시한다.
>>> Question.objects.all()
<QuerySet [<Question: Question object (1)>]>
```

- 마지막 결과값은 <Question: Question object (1)>인데, 이러한 출력 형태로는 객체를 이해하기 어렵다.

<br/>

`polls/models.py` 파일의 Question과 Choice에 `__str__()` 메서드를 추가해 모델을 수정해보자.

```python
from django.db import models

# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    # 데이터베이스의 필드값을 알기 쉽게 표시한다.
    def __str__(self):
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    # 데이터베이스의 필드값을 알기 쉽게 표시한다.
    def __str__(self):
        return self.choice_text
```

- `__str__()` 메서드의 추가는 객체 표현을 대화형 프롬프트에서 편하게 보려는 이유 외에도 Django가 자동으로 생성하는 관리 사이트에서도 이 객체 표현이 사용된다.

<br/>

이 모델에 커스텀 메소드도 추가해보자.

```python
from datetime import datetime
from time import timezone
from django.db import models
from django.utils import timezone

# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    # 데이터베이스의 필드값을 알기 쉽게 표시한다.
    def __str__(self):
        return self.question_text
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    # 데이터베이스의 필드값을 알기 쉽게 표시한다.
    def __str__(self):
        return self.choice_text
```

- `import datetime` 은 파이썬의 표준 모듈인 datetime 모듈을, `from django.utils import timezone` 은 Django의 시간 관련 유틸리티인 django.utils.timezone을 참조하기 위해 추가

<br/>

변경 사항을 저장하고 `python manage.py shell` 을 다시 실행해보자.

```python
>>> from polls.models import Choice, Question

# Make sure our __str__() addition worked.
>>> Question.objects.all()
<QuerySet [<Question: What's up?>]>

# Django provides a rich database lookup API that's entirely driven by
# keyword arguments.
>>> Question.objects.filter(id=1)
<QuerySet [<Question: What's up?>]>
>>> Question.objects.filter(question_text__startswith='What')
<QuerySet [<Question: What's up?>]>

# Get the question that was published this year.
>>> from django.utils import timezone
>>> current_year = timezone.now().year
>>> Question.objects.get(pub_date__year=current_year)
<Question: What's up?>

# Request an ID that doesn't exist, this will raise an exception.
>>> Question.objects.get(id=2)
Traceback (most recent call last):
    ...
DoesNotExist: Question matching query does not exist.

# Lookup by a primary key is the most common case, so Django provides a
# shortcut for primary-key exact lookups.
# The following is identical to Question.objects.get(id=1).
>>> Question.objects.get(pk=1)
<Question: What's up?>

# Make sure our custom method worked.
>>> q = Question.objects.get(pk=1)
>>> q.was_published_recently()
True

# Give the Question a couple of Choices. The create call constructs a new
# Choice object, does the INSERT statement, adds the choice to the set
# of available choices and returns the new Choice object. Django creates
# a set to hold the "other side" of a ForeignKey relation
# (e.g. a question's choice) which can be accessed via the API.
>>> q = Question.objects.get(pk=1)

# Display any choices from the related object set -- none so far.
>>> q.choice_set.all()
<QuerySet []>

# Create three choices.
>>> q.choice_set.create(choice_text='Not much', votes=0)
<Choice: Not much>
>>> q.choice_set.create(choice_text='The sky', votes=0)
<Choice: The sky>
>>> c = q.choice_set.create(choice_text='Just hacking again', votes=0)

# Choice objects have API access to their related Question objects.
>>> c.question
<Question: What's up?>

# And vice versa: Question objects get access to Choice objects.
>>> q.choice_set.all()
<QuerySet [<Choice: Not much>, <Choice: The sky>, <Choice: Just hacking again>]>
>>> q.choice_set.count()
3

# The API automatically follows relationships as far as you need.
# Use double underscores to separate relationships.
# This works as many levels deep as you want; there's no limit.
# Find all Choices for any question whose pub_date is in this year
# (reusing the 'current_year' variable we created above).
>>> Choice.objects.filter(question__pub_date__year=current_year)
<QuerySet [<Choice: Not much>, <Choice: The sky>, <Choice: Just hacking again>]>

# Let's delete one of the choices. Use delete() for that.
>>> c = q.choice_set.filter(choice_text__startswith='Just hacking')
>>> c.delete()
```

- 모델의 관계 → [관련 객체에 접근하기](https://docs.djangoproject.com/ko/4.0/ref/models/relations/)를 참고
- API에서 이중 밑줄(**`__`**) 을 이용해 어떻게 필드를 조회할 수 있는지 → [필드 조회](https://docs.djangoproject.com/ko/4.0/topics/db/queries/#field-lookups-intro)를 참고
- 데이터베이스 API → [데이터베이스 API 레퍼런스](https://docs.djangoproject.com/ko/4.0/topics/db/queries/)를 참고.

    
<br/><br/>