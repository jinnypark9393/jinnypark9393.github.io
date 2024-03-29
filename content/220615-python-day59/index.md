---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 59일차'
date: '2022-06-15 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 데이터베이스 소개, SQL DDL을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-15-Python-Photo1](/assets/images/2022-06-15-Python-Photo/2022-06-15-Python-Photo1.jpg)

![2022-06-15-Python-Photo2](/assets/images/2022-06-15-Python-Photo/2022-06-15-Python-Photo2.jpg)

<br/><br/>

# 01. 데이터베이스 소개

## 1. 데이터베이스 개념

- 데이터베이스(database): **구조화 된 데이터의 집합**(예: 엑셀)
    - 데이터베이스의 기능
        - 데이터 삽입
        - 데이터 조회
        - 데이터 수정
        - 데이터 삭제

<br/><br/>

## 2. 데이터베이스의 구성요소

- 데이터베이스(database): 테이블(table)의 집합
- 테이블(table): 행(row)의 집합
- 행(row): 한 단위의 데이터 기록(record)
- 열(column): 데이터의 항목(field)

<br/><br/>

## 3. DBMS(Database Management System)

- 데이터를 관리해주는 시스템
- 대표 예: MySQL, Oracle, SQLite(따로 설치 필요 없고 파이썬에 내장되어있기 때문에 이 DBMS로 실습 예정)

- 클라이언트 ⇒ 서버 (SQL 문 전송)
- 클라이언트 < 서버 (데이터 응답)

<br/><br/>

## 4. SQL이란?

- SQL = Structured Query Language
- 데이터베이스를 관리하기 위해 사용되는 언어

<br/><br/>

## 5. SQL의 종류

- DDL(Data Definition Language): CREATE, ALTER, DROP 등
- DML(Data Manipulation Language): SELECT, INSERT, DELETE 등

<br/><br/>

# 02. SQL DDL(Data Definition Language)

## 1. SQL CREATE

- SQLite 데이터 타입

| 데이터 타입 | 설명 |
| --- | --- |
| integer | 정수 |
| real | 실수 |
| text | 문자열 |
| null | null 값(데이터 없음) |
- 테이블 생성 명령(쿼리: query)

```python
CREATE TABLE 테이블명 (컬럼명1 데이터타입, 컬럼명2 데이터타입);
```

<br/>

- 게시판 테이블을 생성

```python
CREATE TABLE post (id integer, title text, content text);
```

<br/>

- 제약조건 1: primary key
    - 기본 키라고도 표현
    
    ```python
    CREATE TABLE 테이블명 (컬럼명1 데이터타입 primary key, 컬럼명2 데이터타입);
    ```
    
    ```python
    CREATE TABLE post (id integer primary key, title text, content text);
    ```
    
    - 레코드를 구분짓는 값 ⇒ 유일
    
<br/>

- 제약조건 2: not null
    
    ```python
    CREATE TABLE 테이블명 (컬럼명1 데이터타입 not null, 컬럼명2 데이터타입);
    ```
    
    ```python
    CREATE TABLE post (id integer primary key, 
                       title text not null,
                       content text);
    ```
    
<br/>

- 제약조건 3: default
    
    ```python
    CREATE TABLE 테이블명 (컬럼명1 데이터타입 default '제목없음', 컬럼명2 데이터타입);
    ```
    
    ```python
    CREATE TABLE post (id integer primary key, 
                       title text not null default '제목없음',
                       content text not null default '내용없음');
    ```
    
<br/>

- 제약조건 4: unique

```python
CREATE TABLE 테이블명 (컬럼명1 데이터타입 unique, 컬럼명2 데이터타입);
```

```python
CREATE TABLE user (id integer primary key autoincrement,
                   nickname text unique
```

<br/><br/>

## 2. SQL CREATE 실습

- 구글에 `DB Browser for SQLite` 을 검색해 다운로드 받은 뒤 실행했다.
- New Database 버튼 클릭 > python_advanced > myvenv >  > Chapter 5 생성 > SQL_DDL 파일 생성
- Execute SQL(SQL 실행) 탭 > 아래 쿼리문을 작성

```python
CREATE TABLE post(id INTEGER, title TEXT, content TEXT);
```

<br/>

- 실행 결과

```python
Execution finished without errors.
Result: query executed successfully. Took 2ms
At line 1:
CREATE TABLE post(id INTEGER, title TEXT, content TEXT);
```

- Database Structure(데이터베이스 구조) 탭에 들어가보면 Create로 생성한 내용을 확인할 수 있다.

<br/>

- 생성한 테이블을 삭제해보자

```python
DROP TABLE post;
```

<br/>

- 실행 결과

```python
Execution finished without errors.
Result: query executed successfully. Took 0ms
At line 1:
DROP TABLE post;
```

<br/>

- 제약 조건을 넣어보자.

```python
CREATE TABLE post(id INTEGER PRIMARY KEY, 
title TEXT NOT NULL DEFAULT '제목없음',
content TEXT DEFAULT '내용없음');
```

<br/>

- 실행결과

```python
Execution finished without errors.
Result: query executed successfully. Took 1ms
At line 1:
CREATE TABLE post(id INTEGER PRIMARY KEY, 
title TEXT NOT NULL DEFAULT '제목없음',
content TEXT DEFAULT '내용없음');
```

<br/>

- unique도 설정해보자.

```python
CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT,
nickname TEXT UNIQUE);
```

<br/>

- 실행결과

```python
Execution finished without errors.
Result: query executed successfully. Took 1ms
At line 1:
CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT,
nickname TEXT UNIQUE);
```

<br/>

- ALTER 명령어도 실습해보자.

```python
ALTER TABLE post RENAME to board;
```

- post 테이블 명을 board로 변경

<br/>

- ALTER 명령어로 column명도 변경해보자

```python
ALTER TABLE post add COLUMN post_date;
```

<br/>

- 현재 post 테이블이 존재하지 않기 때문에 에러가 발생한다.

```python
Execution finished with errors.
Result: no such table: post
At line 1:
ALTER TABLE post add
```

<br/>

- board로 바꾸어 다시 실행해보자.

```python
ALTER TABLE board add COLUMN post_date TEXT;
```

<br/>

- 실행결과

```python
Execution finished without errors.
Result: query executed successfully. Took 3ms
At line 1:
ALTER TABLE board add COLUMN post_date TEXT;
```

<br/>

- RENAME으로 컬럼명을 변경해보자

```python
ALTER TABLE board RENAME COLUMN post_date TO reg_date;
```

<br/>

- 실행결과

```python
Execution finished without errors.
Result: query executed successfully. Took 2ms
At line 1:
ALTER TABLE board RENAME COLUMN post_date TO reg_date;
```

- UI로도 테이블을 생성할 수 있다. Table명 = user, Fields 탭의 Add 버튼을 눌러 id라는 필드를 추가한다(Type=INTEGER, PK = true, AI = true).

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 데이터베이스 소개, SQL DDL을 알아보았다. 다음 포스팅에서는 SQL DML에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**