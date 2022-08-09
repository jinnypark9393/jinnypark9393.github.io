---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 35일차'
date: '2022-05-22 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 12-2. 블로그 프로젝트 - 게시물 클래스 구현을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-22-Python-Photo1](/assets/images/2022-05-22-Python-Photo/2022-05-22-Python-Photo1.jpg)

![2022-05-22-Python-Photo2](/assets/images/2022-05-22-Python-Photo/2022-05-22-Python-Photo2.jpg)

<br/><br/>

# 01. 클래스 구현

## 1. 프로젝트 설계하기

- 클래스 설계하기: 어떤 것을 클래스로 만들 지 생각해보자.
    - 프로그램 기능
        - 게시글 로딩
        - 메뉴 출력
        - 게시글 쓰기
        - 게시글 목록 확인:
        - 게시글 상세 확인: 글번호, 제목, 본문 내용, 조회수 등의 데이터가 필요
        - 게시글 수정
        - 게시글 삭제
        - 게시글 저장
        
        ⇒ 공통적으로 **게시글**을 가지고 있다.
        
    <br/>

    - 게시글의 요소
        - 글 번호
        - 제목
        - 본문 내용
        - 조회수
        
        ⇒ 게시글 내에 여러 데이터들이 포함되어있다: **클래스**로 만들면 편리
        
    <br/>
    
    ### [클래스 설계]
    
    - 게시글을 어떻게 클래스로 만들까?
    - 게시물 클래스: “Post”라고 이름 붙이자.
        - 속성
            - 글번호
            - 제목
            - 본문
            - 조회수
        - 메서드
            - 게시물 수정하기
            - 조회수 증가하기
            - 속성 가져오기: 게시물 목록 조회 등의 기능을 이용할 때 사용
    
<br/><br/>

## 2. 실습(클래스 구현)

- 위에서 설계한 대로 클래스를 구현해보자.

```bash
# - 게시물 클래스: Post
#     - 속성
#         - 글번호
#         - 제목
#         - 본문
#         - 조회수
#     - 메서드
#         - 게시물 수정하기
#         - 조회수 증가하기
#         - 속성 가져오기: 게시물 목록 조회 등의 기능을 이용할 때 사용

class Post:
    """
        게시물 클래스
        param id: 글번호
        param title: 글제목
        param content: 글내용
        param view_count: 조회수
    """

    def __init__(self, id, title, content, view_count):
        self.id = id
        self.title = title
        self.content = content
        self.view_count = view_count
    
    def set_post(self, id, title, content, view_count):
        self.id = id
        self.title = title
        self.content = content
        self.view_count = view_count

    def add_view_count(self):
        self.view_count += 1

    def get_id(self):
        return self.id

    def get_title(self):
        return self.title

    def get_content(self):
        return self.content

    def get_view_count(self):
        return self.view_count
```

- `"""` (docstring): 클래스 혹은 메서드(함수)에 대한 설명을 기재한 주석이다.

<br/>

- 인스턴스를 생성해서 위에서 정의한 클래스와 메서드가 잘 동작하는지 확인하자.

```bash
# - 게시물 클래스: Post
#     - 속성
#         - 글번호
#         - 제목
#         - 본문
#         - 조회수
#     - 메서드
#         - 게시물 수정하기
#         - 조회수 증가하기
#         - 속성 가져오기: 게시물 목록 조회 등의 기능을 이용할 때 사용

class Post:
    """
        게시물 클래스
        param id: 글번호
        param title: 글제목
        param content: 글내용
        param view_count: 조회수
    """

    def __init__(self, id, title, content, view_count):
        self.id = id
        self.title = title
        self.content = content
        self.view_count = view_count
    
    def set_post(self, id, title, content, view_count):
        self.id = id
        self.title = title
        self.content = content
        self.view_count = view_count

    def add_view_count(self):
        self.view_count += 1

    def get_id(self):
        return self.id

    def get_title(self):
        return self.title

    def get_content(self):
        return self.content

    def get_view_count(self):
        return self.view_count

if __name__ == "__main__":
    post = Post(1, "테스트", "테스트입니다", 0)
    print(f"{post.get_id()} {post.get_title()} {post.get_content()} {post.get_view_count()}")
```

<br/>

- 실행 결과

```bash
(myvenv) ➜  python_basic /Users/usr/Documents/python_basic/my
venv/bin/python /Users/usr/Documents/python_basic/myvenv/Chap
ter12/post.py
1 테스트 테스트입니다 0
```

<br/>

- 나중에 게시글 수정에 쓰일 메서드인 set_post를 테스트해보자.

```bash

# - 게시물 클래스: Post
#     - 속성
#         - 글번호
#         - 제목
#         - 본문
#         - 조회수
#     - 메서드
#         - 게시물 수정하기
#         - 조회수 증가하기
#         - 속성 가져오기: 게시물 목록 조회 등의 기능을 이용할 때 사용

class Post:
    """
        게시물 클래스
        param id: 글번호
        param title: 글제목
        param content: 글내용
        param view_count: 조회수
    """

    def __init__(self, id, title, content, view_count):
        self.id = id
        self.title = title
        self.content = content
        self.view_count = view_count
    
    def set_post(self, id, title, content, view_count):
        self.id = id
        self.title = title
        self.content = content
        self.view_count = view_count

    def add_view_count(self):
        self.view_count += 1

    def get_id(self):
        return self.id

    def get_title(self):
        return self.title

    def get_content(self):
        return self.content

    def get_view_count(self):
        return self.view_count

if __name__ == "__main__":
    post = Post(1, "테스트", "테스트입니다", 0)
    post.set_post(1, "테스트2", "테스트입니다2", 0)

    print(f"{post.get_id()} {post.get_title()} {post.get_content()} {post.get_view_count()}")
```

<br/>

- 실행결과

```bash
(myvenv) ➜  python_basic /Users/jinipark/Documents/python_basic/my
venv/bin/python /Users/jinipark/Documents/python_basic/myvenv/Chap
ter12/post.py
1 테스트2 테스트입니다2 0
```

<br/>

- add_view_count 함수를 호출해서 조회수가 늘어나는지 테스트해보자.

```bash
# - 게시물 클래스: Post
#     - 속성
#         - 글번호
#         - 제목
#         - 본문
#         - 조회수
#     - 메서드
#         - 게시물 수정하기
#         - 조회수 증가하기
#         - 속성 가져오기: 게시물 목록 조회 등의 기능을 이용할 때 사용

class Post:
    """
        게시물 클래스
        param id: 글번호
        param title: 글제목
        param content: 글내용
        param view_count: 조회수
    """

    def __init__(self, id, title, content, view_count):
        self.id = id
        self.title = title
        self.content = content
        self.view_count = view_count
    
    def set_post(self, id, title, content, view_count):
        self.id = id
        self.title = title
        self.content = content
        self.view_count = view_count

    def add_view_count(self):
        self.view_count += 1

    def get_id(self):
        return self.id

    def get_title(self):
        return self.title

    def get_content(self):
        return self.content

    def get_view_count(self):
        return self.view_count

if __name__ == "__main__":
    post = Post(1, "테스트", "테스트입니다", 0)
    # post.set_post(1, "테스트2", "테스트입니다2", 0)
    post.add_view_count()

    print(f"{post.get_id()} {post.get_title()} {post.get_content()} {post.get_view_count()}")
```

<br/>

- 실행결과

```bash
(myvenv) ➜  python_basic /Users/usr/Documents/python_basic/my
venv/bin/python /Users/usr/Documents/python_basic/myvenv/Chap
ter12/post.py
1 테스트 테스트입니다 1
```

<br/><br/>

이번 포스팅에서는 블로그의 게시물 클래스를 구현해보았다. 다음 포스팅에서는 게시물 로딩 동작을 구현하도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**