---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 36일차'
date: '2022-05-23 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 12-3. 블로그 프로젝트 - 게시물 로딩 기능 구현을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-23-Python-Photo1](/assets/images/2022-05-23-Python-Photo/2022-05-23-Python-Photo1.JPG)

![2022-05-23-Python-Photo2](/assets/images/2022-05-23-Python-Photo/2022-05-23-Python-Photo2.JPG)

<br/><br/>

# 03. 블로그 게시글 로딩하기

## 1. 프로그램 기능 구현하기

- 게시글 로딩하기 기능의 의사 코드(Pseudo Code)를 작성해보자.
    - **의사코드(Pseudo Code)**란? 직역하면 가짜(Pseudo) 코드라는 뜻으로, 프로그램 코드를 작성하기위해 프로그램의 진행 과정을 단계별로 기록해 놓은 것.
    
    ```bash
    # 게시글 로딩하기
    
    data.csv 파일이 있으면
        게시글을 로딩한다.
    data.csv 파일이 없으면
        data.csv파일을 만든다.
    
    # 게시글 로딩 기능
    data.csv 파일을 읽는다.
    데이터 한 줄마다
        Post 인스턴스를 만든다.
        Post 리스트에 인스턴스를 저장한다.
    ```
    
    - 게시글 로딩 예시
    
    ```bash
    1, 파이썬 공부 2일차, 연산 배웠다, 2
    2, 파이썬 공부 3일차, 조건문 배웠다, 0
    ```
    

## 2. 코드 구현

- 위에서 의사코드로 작성한 내용을 실제 코드로 구현해보자.

```bash
import os

# 파일 경로
file_path = "./myvenv/Chapter12/data.csv" # data.csv 파일 경로를 변수로 지정해준다.

# data.csv 파일이 있다면
if os.path.exists(file_path): # 결과로 true를 반환한다
    # 게시글 로딩
    pass
else:
    # 파일 생성하기
    f = open(file_path, "w", encoding="utf8", newline="")
    f.close()
```

- 파일유무를 체크하기 위해 os.path.exists 모듈을 활용한다: os 모듈을 import한 뒤 사용할 수 있음
- 파일 생성 ⇒ open 함수를 이용해 생성. newline은 윈도우 환경일 때 추가할 것.

- 실행결과: data.csv 파일이 Chapter12 폴더 하위에 생성된다.
    
    ![2022-05-23-Python-Photo3.png](/assets/images/2022-05-23-Python-Photo/2022-05-23-Python-Photo3.png)
    
    - file not found 에러가 발생한 경우 경로 설정을 다시 확인해보자.

- 테스트를 위해 data.csv 파일에 데이터를 넣어준다.

```bash
1,테스트,테스트입니다
```

- 게시글 로딩을 구현해보자.

```bash
import os
import csv

# 파일 경로
file_path = "./myvenv/Chapter12/data.csv" # data.csv 파일 경로를 변수로 지정해준다.

# data.csv 파일이 있다면
if os.path.exists(file_path): # 결과로 true를 반환한다
    # 게시글 로딩
    print("게시글 로딩중...")
    f = open(file_path, "r", encoding="utf8")
    reader = csv.reader(f)
    for data in reader:
        print(data)
else:
    # 파일 생성하기
    f = open(file_path, "w", encoding="utf8", newline="")
    f.close()
```

- 위의 코드가 이해가 되지 않는다면 **파일 입출력** 파트의 **csv 입출력 강의**를 복습하고 오자.
- csv.reader는 순회 가능한 함수 ⇒ for in 문을 사용해 데이터를 한줄씩 리스트 형태로 뽑아와 data객체에 저장할 수 있다.

- 지금까지 만든 부분을 출력해보자.

```bash
(myvenv) ➜  python_basic /Users/usr/Documents
/python_basic/myvenv/bin/python /Users/usr/Do
cuments/python_basic/myvenv/Chapter12/main.py
게시글 로딩중...
['1', '테스트', '테스트입니다', '0']
['2', '테스트2', '테스트입니다2', '0']
```

- 게시글을 리스트 형태로 잘 받아오는 것을 확인할 수 있다. 이제 인덱스를 이용해 각 데이터에 접근할 수 있다.

- 지금까지 구현된 코드를 확인해보자.

```bash
# 게시글 로딩하기

data.csv 파일이 있으면 # 구현 완료
    게시글을 로딩한다. # 구현중
data.csv 파일이 없으면 # 구현 완료
    data.csv파일을 만든다. # 구현중

# 게시글 로딩 기능
data.csv 파일을 읽는다. # 구현 완료
데이터 한 줄마다 # 구현 완료(데이터 한 줄씩 리스트 형태로 불러오기)
    Post 인스턴스를 만든다. # 구현해야 함
    Post 리스트에 인스턴스를 저장한다. # 구현해야 함
```

- post 객체를 저장할 리스트를 생성하고 post 객체를 불러온다(이해가 되지 않을 경우 **모듈과 패키지** 강의를 복습하자)

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
        print(data)
else:
    # 파일 생성하기
    f = open(file_path, "w", encoding="utf8", newline="")
    f.close()
```

- Post 객체를 생성해보자.

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

print(post_list)
```

- print문으로 post_list를 확인하면 2개의 객체가 담겨있는 것을 알 수 있다.

```bash
(myvenv) ➜  python_basic /Users/usr/Documents
/python_basic/myvenv/bin/python /Users/usr/Do
cuments/python_basic/myvenv/Chapter12/main.py
게시글 로딩중...
[<post.Post object at 0x104ddea70>, <post.Post object at 0x104eece20>]
```

- post_list에 저장된 첫번째 객체에서 get_title 메서드를 호출해보자.

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

print(post_list[0].get_title()) # 호출 부분
```

- 실행 결과

```bash
(myvenv) ➜  python_basic /Users/usr/Documents
/python_basic/myvenv/bin/python /Users/usr/Do
cuments/python_basic/myvenv/Chapter12/main.py
게시글 로딩중...
테스트
```

<br/><br/>

이번 포스팅에서는 블로그의 게시물 로딩 기능을 구현해보았다. 다음 포스팅에서는 메뉴 출력하기, 게시글 쓰기 기능을 구현하도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**