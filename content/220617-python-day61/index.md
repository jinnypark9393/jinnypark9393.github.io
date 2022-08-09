---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 61일차'
date: '2022-06-17 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 SQL GROUP BY, JOIN을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-17-Python-Photo1](/assets/images/2022-06-17-Python-Photo/2022-06-17-Python-Photo1.jpg)

![2022-06-17-Python-Photo2](/assets/images/2022-06-17-Python-Photo/2022-06-17-Python-Photo2.jpg)

<br/><br/>

# 04. SQL GROUP BY, JOIN

## 1. user 테이블 수정

- 이전 실습에서 생성한 테이블을 아래와 같이 변경해보자.

| email | passwd | gender | age |
| --- | --- | --- | --- |
| appple@naver.com | apple123 | female | 20 |
| grape@naver.com | grape123 | male | 41 |
| peach@naver.com | peach123 | female | 27 |
| startcoding@naver.com | startcoding123 | male | 30 |

<br/>

### 내 풀이

```sql
DROP table user;
CREATE TABLE user (email text primary key, passwd text NOT NULL, gender text, age INTEGER);
INSERT INTO user (email, passwd, gender, age) VALUES('appple@naver.com', 'apple123', 'female', 20);
INSERT INTO user (email, passwd, gender, age) VALUES('grape@naver.com', 'grape123', 'male', 41);
INSERT INTO user (email, passwd, gender, age) VALUES('peach@naver.com', 'peach123', 'female', 27);
INSERT INTO user (email, passwd, gender, age) VALUES('startcoding@naver.com', 'startcoding123', 'male', 30);
```

<br/>

### 강의 풀이

- DROP으로 테이블 삭제

```sql
DROP table user;
```

<br/>

- UI를 통해 테이블 수정(Browse Data에서 수정할 수 있음)

<br/><br/>

## 2. post 테이블 수정

- 이전 실습했던 post 테이블을 변경해보자.

| id | title | content | author |
| --- | --- | --- | --- |
| 1 | 스타트코딩 | 강의 정말 재미있어요! | appple@naver.com |
| 2 | 돈버는코딩 | 코딩으로 돈을 쉽게 벌 수 있습니다. | grape@naver.com |
| 3 | 시간을 버는 코딩 | 코딩으로 시간을 벌 수 있습니다. | peach@naver.com |
| 4 | startcoding은? | 누구나 쉽게 코딩으로 돈과 시간을 벌 수 있게 만들어 드립니다. | startcoding@naver.com |
| 5 | 파이썬 배우는 애유 | 쉬우니까 | startcoding@naver.com |

<br/>

### 내 풀이

```sql
DROP table post;
CREATE TABLE post (id integer primary key, title text NOT NULL, content text NOT NULL, author text NOT NULL);
INSERT INTO post (id, title, content, author) VALUES('1', '스타트코딩', '강의 정말 재미있어요!', 'appple@naver.com');
INSERT INTO post (id, title, content, author) VALUES('2', '돈버는코딩', '코딩으로 돈을 쉽게 벌 수 있습니다.', 'grape@naver.com');
INSERT INTO post (id, title, content, author) VALUES('3', '시간을 버는 코딩', '코딩으로 시간을 벌 수 있습니다.', 'peach@naver.com');
INSERT INTO post (id, title, content, author) VALUES('4', 'startcoding은?', '누구나 쉽게 코딩으로 돈과 시간을 벌 수 있게 만들어 드립니다.', 'startcoding@naver.com');
INSERT INTO post (id, title, content, author) VALUES('5', '파이썬 배우는 애유', '쉬우니까', 'startcoding@naver.com');

```

<br/>

### 강의 해설

- Database structure에서 컬럼(열) 및 컬럼의 데이터 타입을 수정한다.
- Browse Data 탭에서 레코드(행)를 수정한다.

<br/><br/>

## 3. Group by

- 그룹화해서 계산하는 명령

```sql
SELECT count(*) FROM 테이블명 GROUP BY 컬럼명;
```

```sql
SELECT gender, count(*) FROM user GROUP BY gender;
```

```sql
SELECT gender, avg(age) FROM user WHERE age > 20 GROUP BY gender;
```

- Group by 명령어를 실습해보자.

```sql
SELECT gender , count(*) FROM user GROUP BY gender;
```

- gender별로 user를 묶어서 카운트를 해주는 쿼리문

- 실행 결과

| gender | count(*) |
| --- | --- |
| female | 2 |
| male | 2 |

- WHERE문으로 제약 조건을 설정할 수도 있다.

```sql
SELECT gender, avg(age) FROM user WHERE age > 20 GROUP BY gender;
```

- 실행 결과

| gender | avg(age) |
| --- | --- |
| female | 27.0 |
| male | 35.5 |

## 4. JOIN

- 두 테이블을 묶어 조회할 때

```sql
SELECT * FROM 테이블명1 INNER JOIN 테이블명2 WHERE 조건;
```

```sql
SELECT * FROM post INNER JOIN user WHERE post.author = user.email;
```

<br/>

- post 테이블의 author와 user테이블의 email이 같을 때 테이블을 합친다.

| id | title | content | author | email | passwd | gender | age |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 스타트코딩 | 강의 정말 재미있어요! | appple@naver.com | appple@naver.com | apple123 | female | 20 |
| 2 | 돈버는코딩 | 코딩으로 돈을 쉽게 벌 수 있습니다. | grape@naver.com | grape@naver.com | grape123 | male | 41 |
| 3 | 시간을 버는 코딩 | 코딩으로 시간을 벌 수 있습니다. | peach@naver.com | peach@naver.com | peach123 | female | 27 |
| 4 | startcoding은? | 누구나 쉽게 코딩으로 돈과 시간을 벌 수 있게 만들어 드립니다. | startcoding@naver.com | startcoding@naver.com | startcoding123 | male | 30 |
| 5 | 파이썬 배우는 애유 | 쉬우니까 | startcoding@naver.com | startcoding@naver.com | startcoding123 | male | 30 |

<br/>

- inner join은 `,` 로 대체할 수 있다.

```sql
SELECT * FROM post INNER JOIN user WHERE post.author = user.email;
```

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 SQL GROUP BY, JOIN을 알아보았다. 다음 포스팅에서는 에 Python에서 SQLite 사용법에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**