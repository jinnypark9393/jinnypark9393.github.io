---
emoji: 🐍
title:  'Python Django No changes detected 해결'
date: '2022-10-08 07:53:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

# Python Django No changes detected 해결

## 1. 배경 상황

토이 프로젝트 시작 전 테스트 용으로 Django REST framework 사용 실습을 하고 있었는데, Model을 잘못 정의해서 한 번 날리고(…) 다시 `makemigrations` 명령어를 실행 하려고 하니 아래와 같이 No changes detected라는 메시지가 발생했다.

```bash
➜  restProject git:(master) ✗ python3 manage.py makemigrations
No changes detected
```

<br/>

## 2. 해결 방법

프로젝트 내에 캐시 파일, migrations 폴더, db.sqlite3 파일을 모두 삭제해도 인식을 못하고 같은 메시지가 발생해서 구글링을 해보니, `makemigrations` 명령어를 실행할 때 아래와 같이 앱 이름을 명시하면 해결이 된다고 한다.

```bash
python3 manage.py makemigrations <앱 이름>
```

<br/>

아래와 같이 `rest` 라고 앱 이름을 명시해주니 Migration이 잘 생성 되었다.

```bash
➜  restProject git:(master) ✗ python3 manage.py makemigrations rest
Migrations for 'rest':
  rest/migrations/0001_initial.py
    - Create model Rest
```
    
<br/>