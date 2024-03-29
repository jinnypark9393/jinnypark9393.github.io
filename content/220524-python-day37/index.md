---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 37일차'
date: '2022-05-24 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 12-4. 메뉴 출력하기, 글쓰기를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-24-Python-Photo1](/assets/images/2022-05-24-Python-Photo/2022-05-24-Python-Photo1.jpg)

![2022-05-24-Python-Photo2](/assets/images/2022-05-24-Python-Photo/2022-05-24-Python-Photo2.jpg)

<br/><br/>

# 4-1. 블로그 메뉴 출력하기

## 1. 프로젝트 설계

- 프로그램 기능 설계
    - 게시글 로딩하기 (완료)
    - **메뉴 출력하기** (이번 강의에서 다룰 내용)
    - **게시글 쓰기** (이번 강의에서 다룰 내용)
    - 게시글 목록 확인하기
    - 게시글 상세 확인하기
    - 게시글 수정하기
    - 게시글 삭제하기
    - 게시글 저장하기

<br/><br/>

## 2. 메뉴 출력하기 결과물 예시

```bash
- CANARY BLOG -
- 메뉴를 선택해 주세요 -
1. 게시글 쓰기
2. 게시글 목록
3. 프로그램 종료
>>>1
```

- 메뉴를 출력하기 까지만 진행할 것(메뉴별 기능 구현은 뒤의 강의에서 다룰 예정)
- 숫자 1,2,3외의 숫자를 입력할 경우 ⇒ 다시 메뉴 출력
- 문자 입력 시 ⇒ 예외처리가 필요
- 해당 기능 구현은 실습문제 5.3.2와 유사하다(while True라는 무한반복문 사용).

<br/><br/>

## 3. 기능 구현

```bash
import os
import csv
from post import Post

# 파일 경로
file_path = "./myvenv/Chapter12/data.csv" # data.csv 파일 경로를 변수로 지정해준다.

# post 객체를 저장할 리스트 생성
post_list = []

# data.csv 파일이 있다면
if os.path.exists(file_path): # 결과로 true를 반환한다
    # 게시글 로딩
    print("게시글 로딩중...")
    f = open(file_path, "r", encoding="utf8")
    reader = csv.reader(f)
    for data in reader:
        # post 인스턴스 생성하기
        post = Post(int(data[0]), data[1], data[2], int(data[3])) # Post 인스턴스를 생성해 post 객체에 담아준다.
        post_list.append(post)
else:
    # 파일 생성하기
    f = open(file_path, "w", encoding="utf8", newline="")
    f.close()

# 메뉴 출력하기
while True:
    print("\n\n- CANARY BLOG")
    print("- 메뉴를 선택해 주세요")
    print("1. 게시글 쓰기")
    print("2. 게시글 목록")
    print("3. 프로그램 종료")
    choice = int(input(">>> "))
    if choice == 1:
        print("게시글 쓰기")
    elif choice == 2:
        print("게시글 목록")
    elif choice == 3:
        print("프로그램 종료")
        break
```

- 먼저 메뉴를 출력해준 뒤, 입력값에 따라 표시되는 출력문을 분기한다(3이 나올경우 break로 프로그램 종료)

<br/>

- 실행 결과

```bash
# 1번 선택
(myvenv) ➜  python_basic /Users/usr/Documents
/python_basic/myvenv/bin/python /Users/usr/Do
cuments/python_basic/myvenv/Chapter12/main.py
게시글 로딩중...

- CANARY BLOG
- 메뉴를 선택해 주세요
1. 게시글 쓰기
2. 게시글 목록
3. 프로그램 종료
>>> 1
게시글 쓰기

# 2번 선택
(myvenv) ➜  python_basic /Users/usr/Documents
/python_basic/myvenv/bin/python /Users/usr/Do
cuments/python_basic/myvenv/Chapter12/main.py
게시글 로딩중...

- CANARY BLOG
- 메뉴를 선택해 주세요
1. 게시글 쓰기
2. 게시글 목록
3. 프로그램 종료
>>> 2
게시글 목록

# 3번 선택
(myvenv) ➜  python_basic /Users/usr/Documents
/python_basic/myvenv/bin/python /Users/usr/Do
cuments/python_basic/myvenv/Chapter12/main.py
게시글 로딩중...

- CANARY BLOG
- 메뉴를 선택해 주세요
1. 게시글 쓰기
2. 게시글 목록
3. 프로그램 종료
>>> 3
프로그램 종료
```

<br/>

- 문자열 입력시에는 아래와 같이 에러가 발생한다.

```bash
(myvenv) ➜  python_basic /Users/usr/Documents
/python_basic/myvenv/bin/python /Users/usr/Do
cuments/python_basic/myvenv/Chapter12/main.py
게시글 로딩중...

- CANARY BLOG
- 메뉴를 선택해 주세요
1. 게시글 쓰기
2. 게시글 목록
3. 프로그램 종료
>>> aa
Traceback (most recent call last):
  File "/Users/usr/Documents/python_basic/myvenv/Chapter12/main.py", line 33, in <module>
    choice = int(input(">>> "))
ValueError: invalid literal for int() with base 10: 'aa'
```

- 예외 처리가 필요한 상황.

<br/>

- try-except 구문으로 예외처리하자.

```bash
import os
import csv
from post import Post

# 파일 경로
file_path = "./myvenv/Chapter12/data.csv" # data.csv 파일 경로를 변수로 지정해준다.

# post 객체를 저장할 리스트 생성
post_list = []

# data.csv 파일이 있다면
if os.path.exists(file_path): # 결과로 true를 반환한다
    # 게시글 로딩
    print("게시글 로딩중...")
    f = open(file_path, "r", encoding="utf8")
    reader = csv.reader(f)
    for data in reader:
        # post 인스턴스 생성하기
        post = Post(int(data[0]), data[1], data[2], int(data[3])) # Post 인스턴스를 생성해 post 객체에 담아준다.
        post_list.append(post)
else:
    # 파일 생성하기
    f = open(file_path, "w", encoding="utf8", newline="")
    f.close()

# 메뉴 출력하기
while True:
    print("\n\n- CANARY BLOG")
    print("- 메뉴를 선택해 주세요")
    print("1. 게시글 쓰기")
    print("2. 게시글 목록")
    print("3. 프로그램 종료")
    try:
        choice = int(input(">>> "))
    except ValueError:
        print("숫자를 입력해 주세요")
    else:
        if choice == 1:
            print("게시글 쓰기")
        elif choice == 2:
            print("게시글 목록")
        elif choice == 3:
            print("프로그램 종료")
            break
```

<br/>

- 실행 결과

```bash
(myvenv) ➜  python_basic /Users/usr/Documents
/python_basic/myvenv/bin/python /Users/usr/Do
cuments/python_basic/myvenv/Chapter12/main.py
게시글 로딩중...

- CANARY BLOG
- 메뉴를 선택해 주세요
1. 게시글 쓰기
2. 게시글 목록
3. 프로그램 종료
>>> aa
숫자를 입력해 주세요
```

<br/><br/>

# 4-2. 게시글 쓰기

## 1. 게시글 쓰기 결과 화면 예시

```bash
- 게시글 쓰기 - 
제목을 입력해 주세요 >>>
파이썬 공부 1일차
본문을 입력해 주세요>>>
자료형 변수 배웠다
# 게시글이 등록되었습니다.
```

- 게시글 등록 기능
    1. Post 인스턴스 생성
    2. Post 리스트에 저장
- Post 인스턴스
    1. 글번호 ⇒ **어떻게 처리?**
    2. 제목 ⇒ 입력값 받기
    3. 내용 ⇒ 입력값 받기
    4. 조회수 ⇒ 초기 값 0
    - 마지막 글번호 ⇒ 현재 post_list의 마지막 요소의 id값 +1

<br/><br/>

## 2. 코드 구현

```bash
import os
import csv
from post import Post

# 파일 경로
file_path = "./myvenv/Chapter12/data.csv" # data.csv 파일 경로를 변수로 지정해준다.

# post 객체를 저장할 리스트 생성
post_list = []

# data.csv 파일이 있다면
if os.path.exists(file_path): # 결과로 true를 반환한다
    # 게시글 로딩
    print("게시글 로딩중...")
    f = open(file_path, "r", encoding="utf8")
    reader = csv.reader(f)
    for data in reader:
        # post 인스턴스 생성하기
        post = Post(int(data[0]), data[1], data[2], int(data[3])) # Post 인스턴스를 생성해 post 객체에 담아준다.
        post_list.append(post)
else:
    # 파일 생성하기
    f = open(file_path, "w", encoding="utf8", newline="")
    f.close()

# 게시글 쓰기
def write_post():
    """게시글 쓰기 함수"""
    print("\n\n- 게시글 쓰기 -")
    title = input("제목을 입력해 주세요\n>>>")
    content = input("내용을 입력해 주세요\n>>>")
    # 글번호
    id = post_list[-1].get_id() + 1
    post = Post(id, title, content, 0)
    post_list.append(post)
    print("# 게시글이 등록되었습니다.")

# 게시글 목록
def list_post():
    """게시글 목록 횟수"""
    print(post_list)

# 메뉴 출력하기
while True:
    print("\n\n- CANARY BLOG")
    print("- 메뉴를 선택해 주세요")
    print("1. 게시글 쓰기")
    print("2. 게시글 목록")
    print("3. 프로그램 종료")
    try:
        choice = int(input(">>> "))
    except ValueError:
        print("숫자를 입력해 주세요")
    else:
        if choice == 1:
            write_post()
        elif choice == 2:
            list_post()
        elif choice == 3:
            print("프로그램 종료")
            break
```

- 블로그 메뉴 출력: while True ~ break 함수를 정의해 구현
    - 숫자 대신 문자열 입력값이 들어올 경우 “숫자를 입력해 주세요"라는 에러메시지 출력(try~except를 사용해 구현)
- 게시글 쓰기 기능: write_post() 함수를 정의해 구현
    - id라는 변수를 정의해 구현(리스트의 마지막 id에서 1을 더한 것)

<br/><br/>

이번 포스팅에서는 진행할 프로젝트의 메뉴 출력과 글쓰기 기능에 대해 알아보았다. 다음 포스팅에서는 먼저 블로그 프로젝트의 게시글 목록, 상세를 구현해보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**