---

published: true
title:  "[Python/Django]Django 튜토리얼(3)관리자 및 관리자 사이트 생성"
excerpt: "Django 공식 문서의 튜토리얼을 따라 관리자 계정과 관리자 사이트를 생성해보자"

categories:
- Programming
tags:
- [파이썬독학, 파이썬공부, 직장인인강, 직장인자기계발, 파이썬튜토리얼, 파이썬앱만들기, 코딩입문, 개발입문]

toc: true
toc_sticky: true

date: 2022-07-27
last_modified_at: 2022-07-27

---

<br/><br/>

# 1. Django 관리자 소개

## 💡Django 철학

직원 혹은 고객이 컨텐츠를 수정하기 위한 관리자 사이트를 생성하는 것은 지루한 작업이다. 따라서 Django에서는 모델에 대한 관리용 인터페이스를 자동으로 생성한다.

<br/>

Django는 Lawrence Journal-World 신문사의 프로그래머가 처음 개발했다. 이런 태생적 이유로 “컨텐츠 게시자"와 “공개" 사이트의 구분이 명확하다. 사이트 관리자는 뉴스 기사, 사건, 스포츠 경기 결과 등을 시스템에 추가한다. 이렇게 추가한 컨텐츠는 “공개"사이트에 노출된다. Django는 사이트 관리자가 컨텐츠를 편집하는 통합 인터페이스를 생성하는 문제를 해결한다.

<br/>

관리자 사이트는 사이트 방문자가 아닌 사이트 관리자를 위한 것이다.

<br/><br/>

## 1. 관리자 생성하기

관리자 사이트에 로그인 할 수 있는 사용자를 생성한다.

```python
➜  django-myfirstsite git:(master) ✗ python3 manage.py createsuperuser 
Username (leave blank to use 'jinipark'): admin
Email address: jinnypark9393@gmail.com
Password: 
Password (again): 
Superuser created successfully.
```

<br/><br/>

## 2. 개발 서버 시작

관리자 사이트는 기본으로 활성화 되어 있다. 서버가 동작하고 있지 않다면 다음 명령으로 실행해준다.

```python
python manage.py runserver
```

웹 브라우저를 열고 로컬 도메인의 `/admin/` 으로 이동한다(http://127.0.0.1:8000/admin/).

<br/>

다음으로 관리자 로그인 화면이 나타나면 위에서 설정한 관리인 정보로 로그인해준다.

<br/>

💡 참고: LANGUAGE_CODE를 설정하면 로그인 화면이 지정된 언어로 표시된다.

<br/><br/>

## 3. 관리자 사이트 접속

앞서 생성한 슈퍼유저(superuser) 계정으로 로그인하면 Django 관리 인덱스 페이지를 볼 수 있다.

<br/>

편집 가능한 그룹과 사용자 등의 컨텐츠를 볼 수 있는데 이들은 `django.contrib.auth` 모듈(Django에서 제공하는 인증 프레임워크)에서 제공한다.

![2022-07-27-Django-tutorial1](/assets/images/2022-07-27-Django-tutorial3/2022-07-27-Django-tutorial1.png)

<br/><br/>

## 4. 관리 사이트에서 poll app을 변경 가능하도록 만들기

poll 앱은 관리자 인덱스 페이지에서 보이지 않는데, 이 앱을 보이도록 하려면 다음과 같이 `Question` 에는 관리 인터페이스가 있도록 알려주어야 한다.

<br/>

`polls/admin.py` 파일을 열러 다음과 같이 편집하자.

```python
from django.contrib import admin

# Register your models here.
from .models import Question
admin.site.register(Question)
```

<br/>

다음과 같이 관리 인덱스 페이지에 내용을 표시한다.

![2022-07-27-Django-tutorial2](/assets/images/2022-07-27-Django-tutorial3/2022-07-27-Django-tutorial2.png)

<br/>

Questions를 클릭하면 질문들을 위한 chnage list로 이동한다. 이 페이지는 데이터베이스에 저장된 모든 질문을 보여주며, 그 중 하나를 선택해 변경할 수 있다. 앞서 등록했던 “What’s up?” 질문을 확인한다.

![2022-07-27-Django-tutorial3](/assets/images/2022-07-27-Django-tutorial3/2022-07-27-Django-tutorial3.png)

<br/>

질문을 클릭하여 수정한다.

![2022-07-27-Django-tutorial4](/assets/images/2022-07-27-Django-tutorial3/2022-07-27-Django-tutorial4.png)

- 이 서식은 **`Question`** 모델에서 자동으로 생성되었다.
- 모델의 각 필드 유형들은 (**`[DateTimeField](https://docs.djangoproject.com/ko/4.0/ref/models/fields/#django.db.models.DateTimeField)`**, **`[CharField](https://docs.djangoproject.com/ko/4.0/ref/models/fields/#django.db.models.CharField)`**) 적절한 HTML 입력 위젯으로 표현된다. 필드의 각 유형들은 Django 관리 사이트에서 어떻게 표현해되어야 할지 알고 있다.
- 각각의 **`[DateTimeField](https://docs.djangoproject.com/ko/4.0/ref/models/fields/#django.db.models.DateTimeField)`** 는 JavaScript 로 작성된 단축 기능과 연결된다. 날짜는 “오늘”(“Today”) 버튼과 달력 팝업에서 입력할 수 있으며, 시간은 “지금”(“Now”) 버튼과 일반적으로 입력하는 시간들을 제공하는 편리한 팝업을 통해서도 입력할 수 있다.

<br/>

페이지의 아래 부분에서 다음과 같은 몇가지 옵션을 제공한다.

<br/>

- 저장(Save) – 이 유형의 객체에 대한 변경사항을 저장하고, 변경된 목록 페이지를 보여준다.
- 저장 및 편집 계속(Save and continue editing) – 이 객체에 대한 변경사항을 저장하고, 현재 편집창을 갱신한다.
- 저장 및 다른 이름으로 추가(Save and add another) – 변경사항을 저장하고, 이 유형의 객체에 대한 비어있는 새로운 입력창을 불러온다.
- 삭제(Delete) – 삭제를 확인하는 페이지를 띄웁니다

<br/>

만약 “Date published” 의 값이 [Tutorial 1](https://docs.djangoproject.com/ko/4.0/intro/tutorial01/) 에서 질문을 생성했을때의 시간과 일치하지 않는다면, **`[TIME_ZONE](https://docs.djangoproject.com/ko/4.0/ref/settings/#std-setting-TIME_ZONE)`** (시간대) 설정을 놓쳤기 때문일 수 있다. 이 설정을 변경 후 다시 페이지를 불러오시면 올바른 값이 표현된다.

<br/>

“Date published” 의 값을 “오늘”(“Today”) 과 “지금”(“Now”) 단축버튼을 눌러 변경해보자. 이,후 “저장 및 편집 계속”(“Save and continue editing”) 을 누른다. 그런 후, 우측 상단의 “히스토리”(“History”) 버튼을 누루저. Django 관리사이트를 통해 누가(username) 언제(timestamp)무엇을 바꾸었는지 목록을 확인할 수 있다.

![2022-07-27-Django-tutorial5](/assets/images/2022-07-27-Django-tutorial3/2022-07-27-Django-tutorial5.png)
    
<br/><br/>