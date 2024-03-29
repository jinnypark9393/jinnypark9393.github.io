---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 38일차'
date: '2022-05-25 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 12-5. 블로그 게시글 목록, 상세 구현을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-05-25-Python-Photo1](/assets/images/2022-05-25-Python-Photo/2022-05-25-Python-Photo1.jpg)

![2022-05-25-Python-Photo2](/assets/images/2022-05-25-Python-Photo/2022-05-25-Python-Photo2.jpg)

<br/><br/>

# 5. 블로그 게시글 목록, 상세

## 1. 프로그램 기능 구현하기

- 게시글 목록 구현 결과 예시

```bash
- 게시글 목록 - 
번호 : 1
제목 : 파이썬 공부 2일차
조회수 : 2

번호 : 2
제목 : 파이썬 공부 3일차
조회수: 0

번호 : 3
제목 : 파이썬 공부 1일차
조회수 : 0
```

- post_list 객체를 get 메서드로 가져와 출력하면 된다.

<br/>

- 글 번호를 선택하는 기능

```bash
Q) 글 번호를 선택해 주세요 (메뉴로 돌아가려면 -1을 입력)
>>>4
없는 글 번호입니다.
Q) 글 번호를 선택해 주세요 (메뉴로 돌아가려면 -1을 입력)
>>>5
없는 글 번호입니다.
Q) 글 번호를 선택해 주세요 (메뉴로 돌아가려면 -1을 입력)
```

- 글 번호 선택
    - 없는 글 번호 ⇒ 무한 반복
    - -1 입력 시 ⇒ 메뉴로 복귀(break)
    - **올바른 글 번호 ⇒ 게시글 상세(난이도 있음)**

<br/><br/>

## 2. 코드 구현

### 1. 게시글 목록 구현하기

- 게시글 목록을 구현해보자.

```bash
import os
import csv
from termios import VLNEXT
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
                print("게시글 상세보기")
            elif id == -1:
                break
            else:
                print("없는 글 번호 입니다.")
        except ValueError:
            print("숫자를 입력해 주세요.")
```

<br/>

- 실행 결과

```bash
(myvenv) ➜  python_basic /Users/jinipark/Documents/python_basic/m
yvenv/bin/python /Users/jinipark/Documents/python_basic/myvenv/Ch
apter12/main.py
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

- CANARY BLOG
- 메뉴를 선택해 주세요
1. 게시글 쓰기
2. 게시글 목록
3. 프로그램 종료
>>>
```

<br/>

- 게시글 목록 보기를 구현한다.

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
                print("게시글 상세보기")
            elif id == -1:
                break
            else:
                print("없는 글 번호 입니다.")
        except ValueError:
            print("숫자를 입력해 주세요.")
        

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

- 글 번호를 설정하면 게시글 상세보기를 할 수 있도록 구현한다.
    - 글 번호 선택 시 해당 번호가 있는 경우, 없는 경우를 구분한다.
    - 메뉴로 돌아가기 기능을 구현한다.
    - try - except 구문으로 문자열 입력 시의 에러 메시지를 설정해준다.

<br/>

- 실행 결과

```bash
(myvenv) ➜  python_basic /Users/usr/Documents/python_basic/m
yvenv/bin/python /Users/usr/Documents/python_basic/myvenv/Ch
apter12/main.py
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
게시글 상세보기
Q. 글 번호를 선택해 주세요 (메뉴로 돌아가려면 -1을 입력해주세요)
>>>3
없는 글 번호 입니다.
Q. 글 번호를 선택해 주세요 (메뉴로 돌아가려면 -1을 입력해주세요)
>>>-1

- CANARY BLOG
- 메뉴를 선택해 주세요
1. 게시글 쓰기
2. 게시글 목록
3. 프로그램 종료
>>>
```

<br/><br/>

### 2. 게시글 상세 확인하기

```bash
- 게시글 상세 - 
번호 : 1
제목 : 파이썬 공부 2일차
본문 : 연산 배웠다
조회수 : 3
Q) 수정: 1 삭제 : 2 (메뉴로 돌아가려면 -1을 입력)
```

- 게시글 상세
    - 사용자가 입력한 글 번호와 같은 게시글을 찾기: post_list에서 찾음
    - 조회수 증가 및 상세 내용 출력
    - 수정, 삭제 기능을 수행할 때 Post 객체 넘겨주기

<br/>

- 코드로 구현

```python
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
                print("수정")
                break
            elif choice == 2:
                print("삭제")
            else:
                print("잘못 입력 하였습니다")
        except ValueError:
            print("숫자를 입력해 주세요")

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

- 글 번호를 선택할 때 id_list에 id가 있는 경우 ⇒ detail_post(id)로 변경해줌
- detail_post라는 함수를 선언해준다.
    - for 문으로 게시글 상세 내역을 출력해준다.
    - while True + except문으로 수정 및 삭제 항목을 생성해준다.

<br/>

- 실행결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/python_basic/m
yvenv/bin/python /Users/usr/Documents/python_basic/myvenv/Ch
apter12/main.py
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
수정

- CANARY BLOG
- 메뉴를 선택해 주세요
1. 게시글 쓰기
2. 게시글 목록
3. 프로그램 종료
```

<br/><br/>

이번 포스팅에서는 진행할 프로젝트의 블로그 게시글 목록, 상세 구현을 해보았다. 다음 포스팅에서는 블로그 프로젝트의 게시글 수정, 삭제, 저장 기능을 구현해보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**