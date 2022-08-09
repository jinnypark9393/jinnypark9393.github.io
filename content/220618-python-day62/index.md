---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 62일차'
date: '2022-06-18 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 파이썬에서의 SQLite 사용법을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-18-Python-Photo1](/assets/images/2022-06-18-Python-Photo/2022-06-18-Python-Photo1.jpg)

![2022-06-18-Python-Photo2](/assets/images/2022-06-18-Python-Photo/2022-06-18-Python-Photo2.jpg)

<br/><br/>

# 06. SQL 파이썬에서 SQLite3 사용방법

## 1. 파이썬 SQLite3 사용 순서

1. Database 파일 열기
2. 커서(Cursor) 생성
    - 커서(Cursor)란? 사용자와 DBMS(SQLite)를 연결하는 역할. 사용자의 SQL문을 DBMS에 전송해주고, DBMS에서의 data 결과값을 저장해두었다 사용자가 필요할 때 제공.
3. SQL 명령 실행
4. 커밋(Commit) 또는 롤백(Rollback) 
    - 커밋(Commit): 변경사항/SQL명령문에 대한 승인
    - 롤백(Rollback): 변경사항/SQL명령문에 대한 취소
5. 데이터베이스 닫기

<br/><br/>

## 2. 실습

- VScode로 돌아가서 작업하자.

```sql
# 모듈 추가
import sqlite3

# 데이터베이스 추가
conn = sqlite3.connect('./myvenv/Chapter05/SQL_DDL.db')

# 커서 생성
cur = conn.cursor()

# SQL 명령 작성
CREATE_SQL = """
    CREATE TABLE IF NOT EXISTS item(
        id integer primary key autoincrement,
        code text not null,
        name text not null,
        price integer not null
    )
"""

# SQL 명령 실행
conn.execute(CREATE_SQL)

# 데이터베이스 닫기
conn.close
```

- primary key 단독 사용과 autoincrement 병용과의 차이점
    - id = 3 을 삭제 후 재생성 시
        - primary key 단독 사용 ⇒ id =3
        - autoincrement key 병용 ⇒ id =4 (바람직)

<br/>

- 실행결과

```sql
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter05/01.CREATE_TABLE.py
```

<br/>

- SQLite로 돌아가 Open Database ⇒ 해당 db파일 오픈 ⇒ Database Structure에서 테이블이 추가된 것을 알 수 있다.

<br/>

- INSERT문을 실행해보자.

```sql
# 모듈 추가
import sqlite3

# 데이터베이스 추가
conn = sqlite3.connect('./myvenv/Chapter05/SQL_DDL.db')

# 커서 생성
cur = conn.cursor()

# SQL 명령 작성
INSERT_SQL = "INSERT INTO item(code, name, price) VALUES (?, ?, ?)"

# SQL 명령 실행
conn.execute(INSERT_SQL, ('A38080', '게이밍 마우스', 38080))

# 커밋 : INSERT, UPDATE, DELETE는 commit을 해야 실제 데이터베이스에 반영된다.
conn.commit()

# 데이터베이스 닫기
conn.close
```

- SELECT를 제외한 쿼리문은 commit을 해주어야 실제 데이터베이스에 반영이 된다.

<br/>

- 실행 결과

```sql
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter05/02.INSERT.py
```

<br/>

- 게이밍 마우스가 item에 추가되었다.

| id | code | name | price |
| --- | --- | --- | --- |
| 1 | A38080 | 게이밍 마우스 | 38080 |

<br/>

- 여러가지 항목을 INSERT문으로 추가해보자

```sql
# 모듈 추가
import sqlite3

# 데이터베이스 추가
conn = sqlite3.connect('./myvenv/Chapter05/SQL_DDL.db')

# 커서 생성
cur = conn.cursor()

# SQL 명령 작성
INSERT_SQL = "INSERT INTO item(code, name, price) VALUES (?, ?, ?)"

# 데이터 여러개 한번에 추가하기
data = (
    ('A00002', '에어컨 20평형', 350000),
    ('A00003', '최신형 스마트폰', 800000),
    ('A00004', '가성비 노트북', 650000)
)

# SQL 명령 실행
conn.executemany(INSERT_SQL, data)

# 커밋 : INSERT, UPDATE, DELETE는 commit을 해야 실제 데이터베이스에 반영된다.
conn.commit()

# 데이터베이스 닫기
conn.close
```

- 중첩 튜플 혹은 리스트를 넘겨주면 된다.

<br/>

- 실행 결과

```sql
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter05/02.INSERT.py
```

<br/>

- 여러 개의 데이터가 한번에 들어간 것을 알 수 있다.

| id | code | name | price |
| --- | --- | --- | --- |
| 1 | A38080 | 게이밍 마우스 | 38080 |
| 2 | A00002 | 에어컨 20평형 | 350000 |
| 3 | A00003 | 최신형 스마트폰 | 800000 |
| 4 | A00004 | 가성비 노트북 | 650000 |

<br/>

- SELECT문을 사용해보자.

```sql
# 모듈 추가
import sqlite3

# 데이터베이스 추가
conn = sqlite3.connect('./myvenv/Chapter05/SQL_DDL.db')

# 커서 생성
cur = conn.cursor()

# SQL 명령 작성
SELECT_SQL = "SELECT * FROM item"

# SQL 명령 실행
cur.execute(SELECT_SQL)

rows = cur.fetchall()
for row in rows:
    print(row)

# 데이터베이스 닫기
conn.close
```

- cur.fetchall로 결과값을 가져와야한다.

<br/>

- 실행 결과

```sql
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter05/03.SELECT.py
(1, 'A38080', '게이밍 마우스', 38080)
(2, 'A00002', '에어컨 20평형', 350000)
(3, 'A00003', '최신형 스마트폰', 800000)
(4, 'A00004', '가성비 노트북', 650000)
```

<br/>

- 일부 값만 조회할 수 있다.

```sql
# 모듈 추가
import sqlite3

# 데이터베이스 추가
conn = sqlite3.connect('./myvenv/Chapter05/SQL_DDL.db')

# 커서 생성
cur = conn.cursor()

# SQL 명령 작성
SELECT_SQL = "SELECT * FROM item WHERE code = 'A00002'"

# SQL 명령 실행
cur.execute(SELECT_SQL)

rows = cur.fetchall()
for row in rows:
    print(row)

# 데이터베이스 닫기
conn.close
```

<br/>

- 실행 결과

```sql
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter05/03.SELECT.py
(2, 'A00002', '에어컨 20평형', 350000)
```

<br/>

- 상위 두개 값만 출력하고 싶을 경우에는 아래와 같이 작성하면 된다.

```sql
# 모듈 추가
import sqlite3

# 데이터베이스 추가
conn = sqlite3.connect('./myvenv/Chapter05/SQL_DDL.db')

# 커서 생성
cur = conn.cursor()

# SQL 명령 작성
SELECT_SQL = "SELECT * FROM item LIMIT 2;"

# SQL 명령 실행
cur.execute(SELECT_SQL)

rows = cur.fetchall()
for row in rows:
    print(row)

# 데이터베이스 닫기
conn.close
```

<br/>

- 실행 결과

```sql
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter05/03.SELECT.py
(1, 'A38080', '게이밍 마우스', 38080)
(2, 'A00002', '에어컨 20평형', 350000)
```

<br/>

- UPDATE 명령어를 사용해보자.

```sql
# 모듈 추가
import sqlite3

# 데이터베이스 추가
conn = sqlite3.connect('./myvenv/Chapter05/SQL_DDL.db')

# 커서 생성
cur = conn.cursor()

# SQL 명령 작성
UPDATE_SQL = "UPDATE item set price = 650000 WHERE code='A00002';"

# SQL 명령 실행
cur.execute(UPDATE_SQL)

# 커밋 : INSERT, UPDATE, DELETE는 commit을 해야 실제 데이터베이스에 반영된다.
conn.commit()

# 데이터베이스 닫기
conn.close
```

<br/>

- 실행 결과

```sql
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter05/04.UPDATE.py
```

<br/>

- 값이 변경된 것을 알 수 있다.

| id | code | name | price |
| --- | --- | --- | --- |
| 1 | A38080 | 게이밍 마우스 | 38080 |
| 2 | A00002 | 에어컨 20평형 | 650000 |
| 3 | A00003 | 최신형 스마트폰 | 800000 |
| 4 | A00004 | 가성비 노트북 | 650000 |

<br/>

- DELETE문을 실습해보자.

```sql
# 모듈 추가
import sqlite3

# 데이터베이스 추가
conn = sqlite3.connect('./myvenv/Chapter05/SQL_DDL.db')

# 커서 생성
cur = conn.cursor()

# SQL 명령 작성
DELETE_SQL = "DELETE FROM item WHERE code='A00002';"

# SQL 명령 실행
cur.execute(DELETE_SQL)

# 커밋 : INSERT, UPDATE, DELETE는 commit을 해야 실제 데이터베이스에 반영된다.
conn.commit()

# 데이터베이스 닫기
conn.close
```

<br/>

- 실행 결과

```sql
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter05/05.DELETE.py
```

<br/><br/>

## 추가적인 데이터베이스 공부

- 여러 개의 테이블이 필요한 프로젝트 설계(5~6개)
- Primary Key, Foreign Key(외부 키)
- 정규화(+역정규화): 정규화 = 중복 제거
- ERD(Entity Relationship Diagram)

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 파이썬에서의 SQLite 사용법을 알아보았다. 다음 포스팅에서는 정규표현식에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**