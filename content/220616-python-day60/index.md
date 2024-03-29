---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 60일차'
date: '2022-06-16 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 데이터베이스 소개, SQL DML을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-16-Python-Photo1](/assets/images/2022-06-16-Python-Photo/2022-06-16-Python-Photo1.jpg)

![2022-06-16-Python-Photo2](/assets/images/2022-06-16-Python-Photo/2022-06-16-Python-Photo2.jpg)

<br/><br/>

# 03. SQL DML(INSERT, SELECT, UPDATE, DELETE)

- CRUD(크루드)

<br/>

## 1. SQL INSERT

- 데이터(행) 추가 명령 **(중요!)**

```sql
INSERT INTO 테이블명 (컬럼명, 컬럼명2) VALUES(값1, 값2);
```

```sql
INSERT INTO post (title, content) VALUES('코딩', '재미있어요!');
```

<br/>

## 2. SQL SELECT

- 데이터 조회 명령 **(제일 중요!!!!)**

```sql
SELECT 컬럼명, 컬럼명2 FROM post;
```

```sql
SELECT INTO title, content FROM post;
```

```sql
SELECT INTO )\* FROM post; 
```

- 특히 마지막 쿼리문은 자주 사용하니 알아둘 것.

<br/>

- 조건 추가: WHERE 추가하기(조회 조건)

```sql
SELECT 컬럼명, 컬럼명2 FROM 조건;
```

```sql
SELECT title, content FROM post WHERE id=3;
```

```sql
SELECT title, content FROM post WHERE title like 'startcoding%';
```

- like로 상세조건 설정 가능: `like 'startcoding%'` 는 startcoding으로 시작하는 항목만 검색

<br/>

```sql
SELECT title, content FROM post WHERE id BETWEEN 1 and 10;
```

- id가 1~10 사이인 것만 가져올 것.

<br/>

```sql
SELECT * FROM user WHERE address IN('seoul', 'busan', 'daegu');
```

- user테이블에서 address가 seoul, busan, daegu가 들어간 것만 출력

<br/>

```sql
SELECT * FROM 테이블명 ORDER BY 컬럼명 [ASC|DESC];
```

```sql
SELECT * FROM post ORDER BY ASC;
```

- `ASC` 오름차순  / `DESC` 내림차순

<br/><br/>

## 3. SQL UPDATE

- 데이터 수정 명령

```sql
UPDATE 테이블명 SET 컬럼명 = 값, ..., WHERE 조건식;
```


```sql
UPDATE post SET title = '제목 수정 중', 
            content = '본문 수정 중',
            WHERE is =3;
```

- where 구문이 없다면 해당 테이블 내의 모든 컬럼이 지정한대로 변경된다.

<br/><br/>

## 4. SQL DELETE

- 데이터 삭제 명령

```sql
DELETE FROM 테이블명 WHERE 조건식;
```

```sql
DELETE FROM post WHERE id=3;
```

- post 테이블에서 id=3인 행을 삭제하라는 쿼리문

<br/><br/>

## 5. 실습

- 시작 전 지난 실습에서의 데이터를 수정한다.
    - board ⇒ post로 변경, reg_date ⇒ 삭제
    - user ⇒ address 추가(type: text)

- SQL 실행 탭으로 이동해 INSERT문을 작성 및 실행

```sql
INSERT INTO post(title, content) VALUES ('스타트코딩', '강의 정말 재미있어요!');
```

<br/>

- 실행 결과

```sql
Execution finished without errors.
Result: query executed successfully. Took 1ms, 1 rows affected
At line 1:
INSERT INTO post(title, content) VALUES ('스타트코딩', '강의 정말 재미있어요!'); 
```

<br/>

- Browse Data(데이터 보기) ⇒ Table: post 선택

| id | title | content |
| --- | --- | --- |
| 1 | 스타트코딩 | 강의 정말 재미있어요! |

<br/>

- INSERT문으로 데이터를 추가하자.

```sql
INSERT INTO post(title, content) VALUES ('돈버는 코딩', '코딩으로 돈을 쉽게 벌 수 있습니다.');
INSERT INTO post(title, content) VALUES ('시간을 버는 코딩', '코딩으로 시간을 벌 수 있습니다.');
INSERT INTO post(title, content) VALUES ('startcoding은?', '누구나 쉽게 코딩으로 돈과 시간을 벌 수 있게 만들어 드립니다.');
INSERT INTO post(title, content) VALUES ('파이썬 배우는 이유', '쉬우니까');
```

<br/>

- 실행결과

```sql
Execution finished without errors.
Result: query executed successfully. Took 0ms, 1 rows affected
At line 4:
INSERT INTO post(title, content) VALUES ('파이썬 배우는 이유', '쉬우니까');
```

<br/>

- 추가된 데이터

| id | title | content |
| --- | --- | --- |
| 1 | 스타트코딩 | 강의 정말 재미있어요! |
| 2 | 돈버는 코딩 | 코딩으로 돈을 쉽게 벌 수 있습니다. |
| 3 | 시간을 버는 코딩 | 코딩으로 시간을 벌 수 있습니다. |
| 4 | startcoding은? | 누구나 쉽게 코딩으로 돈과 시간을 벌 수 있게 만들어 드립니다. |
| 5 | 파이썬 배우는 이유 | 쉬우니까 |

<br/>

- SELECT 명령어를 이용해보자.

```sql
SELECT title, content FROM post
```

<br/>

- 실행 결과

| id | title | content |
| --- | --- | --- |
| 1 | 스타트코딩 | 강의 정말 재미있어요! |
| 2 | 돈버는 코딩 | 코딩으로 돈을 쉽게 벌 수 있습니다. |
| 3 | 시간을 버는 코딩 | 코딩으로 시간을 벌 수 있습니다. |
| 4 | startcoding은? | 누구나 쉽게 코딩으로 돈과 시간을 벌 수 있게 만들어 드립니다. |
| 5 | 파이썬 배우는 이유 | 쉬우니까 |

- id=3인 행만 가져와보자.

```sql
SELECT title, content FROM post WHERE id=3;
```

- 실행 결과

| id | title | content |
| --- | --- | --- |
| 3 | 시간을 버는 코딩 | 코딩으로 시간을 벌 수 있습니다. |

- like 제약조건도 사용해보자.

```sql
SELECT * FROM post WHERE title like 'startcoding%';
```

- 실행결과

| id | title | content |
| --- | --- | --- |
| 4 | startcoding은? | 누구나 쉽게 코딩으로 돈과 시간을 벌 수 있게 만들어 드립니다. |

<br/>

- between 제약조건도 사용해보자.

```sql
SELECT * FROM post WHERE id BETWEEN 1 and 3;
```

<br/>

- 실행 결과

| id | title | content |
| --- | --- | --- |
| 1 | 스타트코딩 | 강의 정말 재미있어요! |
| 2 | 돈버는 코딩 | 코딩으로 돈을 쉽게 벌 수 있습니다. |
| 3 | 시간을 버는 코딩 | 코딩으로 시간을 벌 수 있습니다. |

<br/>

- INSERT문으로 데이터를 user 테이블에 삽입한다.

```sql
INSERT INTO user (nickname, address) VALUES ('스타트코딩', 'daegu');
INSERT INTO user (nickname, address) VALUES ('startcoding', 'seoul');
INSERT INTO user (nickname, address) VALUES ('이쁜겅듀', 'incheon');
```

<br/>

- 실행 결과

```sql
Execution finished without errors.
Result: query executed successfully. Took 0ms, 1 rows affected
At line 3:
INSERT INTO user (nickname, address) VALUES ('이쁜겅듀', 'incheon');
```

<br/>

- 추가된 데이터

| id | nickname | address |
| --- | --- | --- |
| 1 | 스타트코딩 | daegu |
| 2 | startcoding | seoul |
| 3 | 이쁜겅듀 | incheon |

<br/>

- select in 문을 작성해보자.

```sql
SELECT * FROM user WHERE address in ('seoul', 'busan', 'daegu');
```

<br/>

- 실행 결과

| id | nickname | address |
| --- | --- | --- |
| 1 | 스타트코딩 | daegu |
| 2 | startcoding | seoul |

<br/>

- select ~ order by~ 문을 작성해보자.

```sql
SELECT * FROM post ORDER BY title ASC;
```

<br/>

- 실행결과

| id | nickname | address |
| --- | --- | --- |
| 4 | startcoding은? | 누구나 쉽게 코딩으로 돈과 시간을 벌 수 있게 만들어 드립니다. |
| 2 | 돈버는 코딩 | 코딩으로 돈을 쉽게 벌 수 있습니다. |
| 1 | 스타트코딩 | 강의 정말 재미있어요! |
| 3 | 시간을 버는 코딩 | 코딩으로 시간을 벌 수 있습니다. |
| 5 | 파이썬 배우는 이유 | 쉬우니까 |

<br/>

- UPDATE 명령을 사용해보자.

```sql
UPDATE post SET title = '제목 수정 중',
content = '본문 수정 중' WHERE id=3;
```

<br/>

- 실행결과

```sql
Execution finished without errors.
Result: query executed successfully. Took 0ms, 1 rows affected
At line 1:
UPDATE post SET title = '제목 수정 중',
content = '본문 수정 중' WHERE id=3;
```

<br/>

- 데이터

| id | nickname | address |
| --- | --- | --- |
| 1 | 스타트코딩 | 강의 정말 재미있어요! |
| 2 | 돈버는 코딩 | 코딩으로 돈을 쉽게 벌 수 있습니다. |
| 3 | 제목 수정 중 | 본문 수정 중 |
| 4 | startcoding은? | 누구나 쉽게 코딩으로 돈과 시간을 벌 수 있게 만들어 드립니다. |
| 5 | 파이썬 배우는 이유 | 쉬우니까 |

<br/>

- DELETE 명령어를 사용해보자.

```sql
DELETE from post WHERE id=3;
```

<br/>

- 실행 결과

```sql
Execution finished without errors.
Result: query executed successfully. Took 0ms, 1 rows affected
At line 1:
DELETE from post WHERE id=3;
```

<br/>

- 데이터

| id | nickname | address |
| --- | --- | --- |
| 1 | 스타트코딩 | 강의 정말 재미있어요! |
| 2 | 돈버는 코딩 | 코딩으로 돈을 쉽게 벌 수 있습니다. |
| 4 | startcoding은? | 누구나 쉽게 코딩으로 돈과 시간을 벌 수 있게 만들어 드립니다. |
| 5 | 파이썬 배우는 이유 | 쉬우니까 |

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 데이터베이스 소개, SQL DML을 알아보았다. 다음 포스팅에서는 SQL GROUP BY, JOIN에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**