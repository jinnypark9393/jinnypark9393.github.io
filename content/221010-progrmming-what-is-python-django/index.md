---
emoji: 🐍
title:  'Python Django(장고)란?'
date: '2022-10-10 13:29:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

# Python Django(장고)란?

## 1. 배경 상황

이전 회사 팀분들과 토이프로젝트를 진행하려 하는데, 나는 이번 프로젝트에서 다른 팀원분과 함께 백엔드를 맡게 되었다. 우연찮게도 백엔드를 담당하게 된 두 명 모두 제일 많이 다뤄 본 언어가 Python이라 자연스럽게(?) Django를 선택하게 되었다.

<br/>

## 2. Django란?

- Django Official Website: [https://www.djangoproject.com/](https://www.djangoproject.com/)
- 보안이 우수하고 유지보수가 편리한 웹사이트를 신속하게 개발하는 하도록 도움을 주는 파이썬 웹 프레임워크
    - 개발자의 보안 실수 방지 (SQL Injection, Cross-site scripting, Cross-site request forgery, Clickjaking 등)
    - 일반적인 웹 개발 작업을 처리하는 데 필요한 추가 기능이 미리 포함 (User Authentication, Content Administration, Site Maps, RSS feeds 등)
- 무료 오픈소스 프로젝트로 파이썬 기반의 웹 애플리케이션 프레임워크 중 커뮤니티가 활성화 되어있는 편
- 다양한 클라이언트측 프레임워크와 호환 가능(예: React 등)
- 대부분의 형식(HTML, RSS 피드, JSON, XML 등)의 컨텐츠 전송 가능

<br/>

## 3. Django의 특징

- 웹 개발시 필요한 번거로운 요소들을 직접 새로 개발할 필요 없이, 내장된 기능을 활용해 빠르게 개발 할 수 있다.
- MVT 패턴을 따름(Model, View, Template): MVC(Model, View, Controller)소프트웨어 디자인 패턴의 일종
- 파이썬 언어를 기반으로 하고 있어 상대적으로 느린 편
- MSA로의 전환이 까다로움(*Need more investigation: 구글링 등으로 확인된 정보 아님)
- Django를 이용해 개발된 사이트
    - 인스타그램(instagram)
    - 빗버킷(BitBucket)
    - 디스커스(Disqus)
    - 모질라(Mozilla)
    - 에이블리
    - 요기요

<br/>

## 4. Django의 구조

- Django는 Model, View, Template이라는 세 가지 구조로 이루어진 MVT 패턴을 채택하고 있다.
- MVT패턴은 MVC(Model, View, Controller)소프트웨어 디자인 패턴의 일종
    
    
    |  | MVC 패턴 | MVT 패턴 |
    | --- | --- | --- |
    | 앱을 구성하는 데이터 담당 기능 | Model | Model |
    | 유저에게 데이터 보여주는 방식 담당 기능 | View | Template |
    | 유저의 입력을 처리하는 로직 담당 기능 | Controller | View |
- MVT 파일에 대한 정의는 `settings.py` 에서 찾아볼 수 있다.

<br/>

### Model

- **데이터**를 다루는 영역(CRUD 처리)
    - settings.py의 `DATABASES` 에 데이터베이스 연동정보가 저장되어 있다.
- 데이터베이스에 적용될 모델(Model)을 설계
    - 프로젝트의 각 App의 model.py 파일 안에 클래스 형태로 정의
    - DB관련 설정은 settings.py의 DATABASES 항목에서 설정(Default: SQLite)
- SQL문 대신 **ORM(Object Relation Mapping)**방식을 통해 DB에 접근
    - Java의 JPA와 유사
    - 데이터베이스 테이블을 model.py의 클래스와 매핑
    - 테이블에 대한 CRUD기능을 class 객체에 대해 수행 → Django에서 내부적으로 DB에 반영하게 됨
        - 하나의 모델 클래스는 하나의 DB 테이블과 대응
        - 모델 클래스의 모든 Attribute는 각각 DB 필드가 됨
        - 모델의 구현 사항 변경 내역을 반영해 DB 스키마를 변경시키는 migration 기능 제공
        
<br/>

### View

- 웹 어플리케이션 상에서 데이터들이 처리되는 **로직** 담당(HTTP 요청을 수신하고 HTTP 응답을 반환하는 요청 처리)
- 크게 2개 파트로 구성
    1. 요청의 URL을 보고 대응하는 파이썬 함수로 routing하는 **URL dispatcher(url.py파일)**
        - settings.py의 `ROOT_URLCONF` 에 Root URL 정보가 정의되어있다.
        - 위에서 정의된 파일에서 Django가 `urlpatterns` 라는 변수명을 가진 리스트 탐색
        - 해당 리스트에 순서대로 정의된 패턴 중, 가장 먼저 매치된 패턴에 따라 매핑된 `View function`으로 라우팅
    2. URL dispatcher를 거쳐 넘어온 요청을 처리하는 파이썬 함수들(**View function**)
        - HTTP 요청을 받음 → 모델에 들어있는 데이터를 조회 → 필요 시 가공 → 결과를 HTTP 응답 형태로 유저에게 전달
        - View Function 호출 우선 순위
            - Django의 [HttpRequest](https://docs.djangoproject.com/en/4.0/ref/request-response/#django.http.HttpRequest) 객체
            - URLconf에 패턴 정의한 대로 요청 URL로부터 capture된 문자열들 → 함수 내부에서 사용할 인자를 유저가 요청 URL에 포함하도록 할 수 있음
        - Response → [HttpResponse](https://docs.djangoproject.com/en/4.0/ref/request-response/#django.http.HttpResponse) 타입 객체로만 리턴
    
<br/>

### Template

- 웹페이지에서 사용자가 보게 될 페이지의 모습을 구성(파일의 구조 정의)
- HTML, CSS, Javascript 등을 이용한 클라이언트 웹페이지를 작성 (**View**에서 이 **Template**을 사용해 동적으로 웹 페이지(예: HTML 페이지)를 생성하고 **Model**에서 가져온 데이터로 채움)
- 동적인 부분(요청 처리 결과에 따라 변경)과 정적인 부분(요청 처리 결과와 상관없이 변경되지 않음)을 구분해 Django template을 미리 작성
    - Template: 문서 파일 혹은 파이썬 문자열 형태
    - 유저에 보여줄 때 동적으로 처리할 부분은 Django template language([DTL](https://docs.djangoproject.com/en/4.0/topics/templates/#the-django-template-language))를 사용하며, 코드에 명시된 DTL 문법에 따라 요청 처리 결과를 가공해 채워넣게 됨

<br/>

### 기타 주요 요소들

- **Forms**
    - 일단 웹 서비스는 **화면을 통해 유저로부터 다양한 형태의 입력**을 받을 필요가 있음(회원가입, 로그인, 검색 등)
    - 따라서 HTML에는 해당 기능을 위한 `<form>...</form>` 태그가 있음 (**HTML Form**)
        - form 태그 아래에서 입력이 어떤 타입의 데이터인지, 어떤 HTTP 메소드를 사용할지, 입력 데이터를 보낼 URL 등을 결정
        - form을 통해 **선택 가능한 HTTP 메소드는 시스템의 상태를 바꾸는 POST, 조회 목적의 GET** 두 개
    - 정리하자면 HTML Form은 유저가 GUI(웹 화면)를 통해 특정한 형태의 HTTP 요청을 서버에 쉽게 보낼 수 있도록 도와줌
    - 쟝고의 Form은…
        - 입력을 위한 **HTML Form을 자동으로 생성**
        - **입력 값에 대한 유효성 검증** 수행 (Validation)
    - 쟝고의 기본 [Form](https://docs.djangoproject.com/en/4.0/ref/forms/api/#django.forms.Form) 클래스를 상속받아 커스텀 클래스를 정의하고 이를 View function 안에서 들어온 HTTP 메소드에 따라 분기해서 사용하는 방식
        1. **GET** 요청으로 URL 접근 시 **HTML Form 생성**해서 그려주고
        2. **POST** 요청으로 **입력 데이터 넘겼을 시 처리해서 결과** 보여주는 방식
    - 유효성 검증 완료된 값은 `Form` 객체 안의 딕셔너리 타입 `cleaned_data` 어트리뷰트를 통해 접근 가능

<br/>

- **django-admin & manage.py**
    - django-admin: 쟝고의 프로젝트 관리용 CLI 도구
    - manage.py
        - 쟝고 프로젝트 생성 시 아래에 자동으로 생성되는 파이썬 모듈
        - django-admin과 같은 역할을 하고 그에 더해 프로젝트 내부에서 사용할 설정 파일을 지정하는 `DJANGO_SETTINGS_MODULE` 환경변수 세팅까지 함
        - 프로젝트의 설정 파일 지정까지 하기 때문에 하나의 쟝고 프로젝트에서 작업할 땐 manage.py 사용 권장
    - 기본 용법
    
    ```
        $ django-admin <command> [options]
        $ manage.py <command> [options]
        $ python -m django <command> [options]
    ```

<br/>
  
    - 주요 작업
        - 모델 migration
            1. 모델 코드 수정
            2. migration 파일 생성`django-admin makemigrations <app_name>`
            3. DB에 migrate`django-admin migrate <app_name> <migration_name>`
        - 서버 실행`django-admin runserver [addrport]`ex) `django-admin runserver localhost:8000`
        - 쟝고 쉘 실행`django-admin shell --interface {ipython,bpython,python}`현재 쟝고 프로젝트 내부에서 작업할 수 있는 대화형 파이썬 쉘을 여는 명령
        - 쟝고 프로젝트 생성`django-admin startproject name [directory]`디렉토리 아래에 manage.py 모듈과 프로젝트 패키지(기본 설정 파일인 settings.py 포함)가 생성됨
        - 쟝고 앱 생성`django-admin startapp name [directory]`반복되는 기능을 모아 정의할 수 있는 최소 단위의 **쟝고 앱** 패키지를 생성하는 명령디렉토리 아래에 빈 models.py를 포함해 쟝고 앱을 제작할 수 있는 기본 얼개가 만들어짐
        - superuser 생성`django-admin createsuperuseris_staff` 속성이 `True`인 admin 사이트에 접근할 수 있는 관리자 계정을 만드는 명령

<br/>

- **Settings**
    - 쟝고에서는 프로젝트와 관련된 다양한 설정 사항을 파이썬 모듈에 기록해 관리
    - 터미널의 `DJANGO_SETTINGS_MODULE` 환경변수로 어떤 파이썬 모듈을 설정 파일로 사용할지 지정
        - `django-admin runserver` 명령 시 `-settings` 옵션을 통해서도 파이썬 모듈 경로 전달 가능
    - 주요 설정 변수
        - `INSTALLED_APPS`
            - 해당 쟝고 프로젝트에서 사용하는 쟝고 앱을 모두 나열한 리스트
            - 서드파티 앱을 설치하거나 앱을 직접 구현했을 때 추가해줘야 함
        - `ALLOWED_HOSTS`
            - 해당 쟝고 프로젝트가 요청을 받고 응답을 보낼 수 있는 호스트/도메인 whitelist
            - 요청을 보내는 프론트엔드가 따로 있고 별도의 호스트/도메인으로 서빙 중일 경우 여기에 명시해줘야 함
        - `AUTH_USER_MODEL`
            - 프로젝트 내부에서 사용자 인증에 사용할 User 모델 클래스를 명시
            - 기본값은 `[auth.User](https://docs.djangoproject.com/en/4.0/ref/contrib/auth/#user-model)`
            - 프로젝트 생성과 함께 `django.contrib.auth.models.AbstractUser` 를 상속받아 커스텀 User 모델을 만들고, 가장 처음 migration에서 해당 User 모델을 반영하는 것을 권장 → 이후 필요에 따라 모델 수정
        - `DEBUG`
            - 디버그 모드 사용 여부를 나타내는 boolean 변수
            - 배포 시에는 `False`로 꺼서 나가야 함
        - `MEDIA_ROOT`
            - 모델 클래스의 `FileField`/`ImageField`를 통해 저장한 모든 파일은 Media 파일로 취급
            - Media 파일의 경우 DB 필드에는 저장경로(문자열)를 저장하고 파일 원본은 파일 스토리지에 저장
            - 파일 스토리지의 저장 위치는 설정 파일에 정의한 `MEDIA_ROOT` 변수 값
        - `MEDIA_URL`
            - `MEDIA_ROOT`에 있는 Media 파일에 접근할 때 사용할 수 있는 URL
            - Django Template에서 `{{ MEDIA_URL }}`과 같이 사용 가능
        - `STATIC_ROOT`
            - 배포 시 프로젝트 내부 Static 파일을 `django-admin collectstatic` 명령으로 모을 때 사용할 경로
        - `STATIC_URL`
            - `STATIC_ROOT`에 있는 Static 파일에 접근할 때 사용할 수 있는 URL

<br/>

- **Admin 사이트**
    - 쟝고의 Model 중심 자동 어드민 인터페이스
    - 별도의 화면 설계 없이 쟝고에서 제공하는 admin 사이트를 통해 내부 Model 관리를 할 수 있음
    - 기본 설정된 `/admin/` URL로 admin 사이트 접근 가능
    - 기본 용법별도 admin.py 모듈에 admin 사이트를 통해 관리하고 싶은 모델에 대해 아래와 같이 선언
    
<br/>