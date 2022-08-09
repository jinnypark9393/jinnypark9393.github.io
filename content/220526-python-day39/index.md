---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 39일차'
date: '2022-05-26 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 12-6. 블로그 게시글 수정, 삭제, 저장하기 기능 구현을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-05-26-Python-Photo1](/assets/images/2022-05-26-Python-Photo/2022-05-26-Python-Photo1.jpg)

![2022-05-26-Python-Photo2](/assets/images/2022-05-26-Python-Photo/2022-05-26-Python-Photo2.jpg)

<br/><br/>

# 06. 게시글 수정, 삭제, 저장하기

- 게시글 로딩하기 (완료)
- 메뉴 출력하기 (완료)
- 게시글 쓰기 (완료)
- 게시글 목록 확인하기 (완료)
- 게시글 상세 확인하기 (완료)
- **게시글 수정하기**
- **게시글 삭제하기**
- **게시글 저장하기**

<br/><br/>

## 2. 게시글 수정, 삭제, 저장하기

### 1. 게시글 수정

- 사용자가 새로 제목, 본문을 입력한다.
- set_post 메서드로 Post 객체를 수정해준다.

<br/><br/>

### 2. 게시글 삭제

- post_list 에서 해당 Post 객체를 삭제해준다.

<br/><br/>

### 3. 게시글 저장하기

- post_list에 저장된 내용을 data.csv파일에 저장

<br/><br/>

## 3. 코드 구현

```python
import os
import csv
from turtle import update

from requests import delete
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
    """게시글 목록 함수"""
    print("\n\n- 게시글 목록 -")
    id_list = []
    for post in post_list:
        print("번호: ", post.get_id())
        print("제목: ", post.get_title())
        print("조회수: ", post.get_view_count())
        print("")
        id_list.append(post.get_id())

    while True:
        print("Q. 글 번호를 선택해 주세요 (메뉴로 돌아가려면 -1을 입력해주세요)")
        id = int(input(">>>"))
        try:
            if id in id_list:
                detail_post(id)
                break
            elif id == -1:
                break
            else:
                print("없는 글 번호 입니다.")
        except ValueError:
            print("숫자를 입력해 주세요.")
        

# 글 상세 페이지
def detail_post(id):
    """ 게시글 상세보기 함수 """
    print("\n\n- 게시글 상세 -")

    for post in post_list:
        if post.get_id() == id:
            # 조회수 1 증가
            post.add_view_count()
            print("번호: ", post.get_id())
            print("제목: ", post.get_title())
            print("본문: ", post.get_content())
            print("조회수: ", post.get_view_count())
    while True:
        print("Q) 수정: 1 삭제: 2 (메뉴로 돌아가려면 -1을 입력)")
        try:
            choice = int(input(">>>"))
            if choice == 1:
                update_post()
                break
            elif choice == 2:
                delete_post()
                break
            else:
                print("잘못 입력 하였습니다")
        except ValueError:
            print("숫자를 입력해 주세요")

# 게시글 수정
def update_post(target_post):
    pass

# 게시글 삭제
def delete_post(target post):
    delete

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

- 게시글 수정 ⇒ update_cost()함수 정의
- 게시글 삭제 ⇒ delete_cost() 함수 정의

<br/>

```python
from email import contentmanager
import os
import csv
from turtle import update

from requests import delete
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
    """게시글 목록 함수"""
    print("\n\n- 게시글 목록 -")
    id_list = []
    for post in post_list:
        print("번호: ", post.get_id())
        print("제목: ", post.get_title())
        print("조회수: ", post.get_view_count())
        print("")
        id_list.append(post.get_id())

    while True:
        print("Q. 글 번호를 선택해 주세요 (메뉴로 돌아가려면 -1을 입력해주세요)")
        id = int(input(">>>"))
        try:
            if id in id_list:
                detail_post(id)
                break
            elif id == -1:
                break
            else:
                print("없는 글 번호 입니다.")
        except ValueError:
            print("숫자를 입력해 주세요.")
        

# 글 상세 페이지
def detail_post(id):
    """ 게시글 상세보기 함수 """
    print("\n\n- 게시글 상세 -")

    for post in post_list:
        if post.get_id() == id:
            # 조회수 1 증가
            post.add_view_count()
            print("번호: ", post.get_id())
            print("제목: ", post.get_title())
            print("본문: ", post.get_content())
            print("조회수: ", post.get_view_count())
            target_post = post

    while True:
        print("Q) 수정: 1 삭제: 2 (메뉴로 돌아가려면 -1을 입력)")
        try:
            choice = int(input(">>>"))
            if choice == 1:
                update_post(target_post)
                break
            elif choice == 2:
                delete_post(target_post)
                break
            else:
                print("잘못 입력 하였습니다")
        except ValueError:
            print("숫자를 입력해 주세요")

# 게시글 수정
def update_post(target_post):
    """게시글 수정 함수"""
    print("\n\n- 게시글 ")
    title = input("제목을 입력해 주세요\n>>>")
    content = input("본문을 입력해 주세요\n>>>")
    target_post.set_post(target_post.id, title, content, target_post.view_count)
    print("# 게시글이 수정 되었습니다.")

# 게시글 삭제
def delete_post(target_post):
    post_list.remove(target_post)
    print("# 게시글이 삭제 되었습니다.")

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

<br/>

- 실행 결과: 수정 기능 테스트

```python
(myvenv) ➜  python_basic /Users/usr/Documents/python_basic/my
venv/bin/python /Users/usr/Documents/python_basic/myvenv/Chap
ter12/main.py
게시글 로딩중...

- CANARY BLOG
- 메뉴를 선택해 주세요
1. 게시글 쓰기
2. 게시글 목록
3. 프로그램 종료
>>> 2

- 게시글 목록 -
번호:  1
제목:  테스트
조회수:  0

번호:  2
제목:  테스트2
조회수:  0

Q. 글 번호를 선택해 주세요 (메뉴로 돌아가려면 -1을 입력해주세요)
>>>1

- 게시글 상세 -
번호:  1
제목:  테스트
본문:  테스트입니다
조회수:  1
Q) 수정: 1 삭제: 2 (메뉴로 돌아가려면 -1을 입력)
>>>1

- 게시글 
제목을 입력해 주세요
>>>수정테스트중
본문을 입력해 주세요
>>>잘수정  수정테스트
# 게시글이 수정 되었습니다

- CANARY BLOG
- 메뉴를 선택해 주세요
1. 게시글 쓰기
2. 게시글 목록
3. 프로그램 종료
```

<br/>

- 실행 결과: 삭제 테스트

```python
(myvenv) ➜  python_basic /Users/usr/Documents/python_basic/my
venv/bin/python /Users/usr/Documents/python_basic/myvenv/Chap
ter12/main.py
게시글 로딩중...

- CANARY BLOG
- 메뉴를 선택해 주세요
1. 게시글 쓰기
2. 게시글 목록
3. 프로그램 종료
>>> 2

- 게시글 목록 -
번호:  1
제목:  테스트
조회수:  0

번호:  2
제목:  테스트2
조회수:  0

Q. 글 번호를 선택해 주세요 (메뉴로 돌아가려면 -1을 입력해주세요)
>>>1

- 게시글 상세 -
번호:  1
제목:  테스트
본문:  테스트입니다
조회수:  1
Q) 수정: 1 삭제: 2 (메뉴로 돌아가려면 -1을 입력)
>>>2
# 게시글이 삭제 되었습니다.

- CANARY BLOG
- 메뉴를 선택해 주세요
1. 게시글 쓰기
2. 게시글 목록
3. 프로그램 종료
>>> 3
프로그램 종료
```

<br/>

- 파일 저장 기능 구현

```python
import os
import csv
from requests import delete
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
    """게시글 목록 함수"""
    print("\n\n- 게시글 목록 -")
    id_list = []
    for post in post_list:
        print("번호: ", post.get_id())
        print("제목: ", post.get_title())
        print("조회수: ", post.get_view_count())
        print("")
        id_list.append(post.get_id())

    while True:
        print("Q. 글 번호를 선택해 주세요 (메뉴로 돌아가려면 -1을 입력해주세요)")
        id = int(input(">>>"))
        try:
            if id in id_list:
                detail_post(id)
                break
            elif id == -1:
                break
            else:
                print("없는 글 번호 입니다.")
        except ValueError:
            print("숫자를 입력해 주세요.")
        

# 글 상세 페이지
def detail_post(id):
    """ 게시글 상세보기 함수 """
    print("\n\n- 게시글 상세 -")

    for post in post_list:
        if post.get_id() == id:
            # 조회수 1 증가
            post.add_view_count()
            print("번호: ", post.get_id())
            print("제목: ", post.get_title())
            print("본문: ", post.get_content())
            print("조회수: ", post.get_view_count())
            target_post = post

    while True:
        print("Q) 수정: 1 삭제: 2 (메뉴로 돌아가려면 -1을 입력)")
        try:
            choice = int(input(">>>"))
            if choice == 1:
                update_post(target_post)
                break
            elif choice == 2:
                delete_post(target_post)
                break
            else:
                print("잘못 입력 하였습니다")
        except ValueError:
            print("숫자를 입력해 주세요")

# 게시글 수정
def update_post(target_post):
    print("\n\n- 게시글 ")
    title = input("제목을 입력해 주세요\n>>>")
    content = input("본문을 입력해 주세요\n>>>")
    target_post.set_post(target_post.id, title, content, target_post.view_count)
    print("# 게시글이 수정 되었습니다.")

# 게시글 삭제
def delete_post(target_post):
    post_list.remove(target_post)
    print("# 게시글이 삭제 되었습니다.")

# 게시글 저장
def save():
    f = open(file_path, "w", encoding="utf8", newline="")
    writer = csv.writer(f)
    for post in post_list:
        row = [post.get_id(), post.get_title(). post.get_content(), post.get_view_count()]
        writer.writerow(row)
    f.close()
    print("# 저장이 완료되었습니다.")
    print("# 프로그램 종료")

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
            save()
            break
```

- save라는 함수를 생성해 저장 기능을 구현하자.
    - csv.writer(f)라는 함수를 사용해 csv 파일 생성
    - 포스트의 각 항목을 row라는 변수에 저장한다.

<br/>

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/python_basic/my
venv/bin/python /Users/usr/Documents/python_basic/myvenv/Chap
ter12/main.py
게시글 로딩중...

- CANARY BLOG
- 메뉴를 선택해 주세요
1. 게시글 쓰기
2. 게시글 목록
3. 프로그램 종료
>>> 2

- 게시글 목록 -
번호:  1
제목:  테스트
조회수:  1

번호:  2
제목:  테스트2
조회수:  0

Q. 글 번호를 선택해 주세요 (메뉴로 돌아가려면 -1을 입력해주세요)
>>>1

- 게시글 상세 -
번호:  1
제목:  테스트
본문:  테스트입니다
조회수:  2
Q) 수정: 1 삭제: 2 (메뉴로 돌아가려면 -1을 입력)
>>>1

- 게시글 
제목을 입력해 주세요
>>>저장테스트
본문을 입력해 주세요
>>>파일저장테스트입니다.
# 게시글이 수정 되었습니다.

- CANARY BLOG
- 메뉴를 선택해 주세요
1. 게시글 쓰기
2. 게시글 목록
3. 프로그램 종료
>>> 3
# 저장이 완료되었습니다.
# 프로그램 종료
```

- data.csv 파일을 보면 아래와 같이 변경사항이 저장되어있다.

```python
1,저장테스트,파일저장테스트입니다.,2
2,테스트2,테스트2입니다,0
```

<br/><br/>

이번 포스팅에서는 진행할 프로젝트의 블로그 게시글 수정, 삭제, 저장하기 기능 구현을 해보았다. 다음 포스팅에서는 파트 3로 넘어가서 강의 개요를 들어보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**