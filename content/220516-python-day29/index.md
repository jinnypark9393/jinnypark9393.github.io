---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 29일차'
date: '2022-05-16 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 10-1. 파일입출력 기본을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-16-Python-Photo1](/assets/images/2022-05-16-Python-Photo/2022-05-16-Python-Photo1.jpg)

![2022-05-16-Python-Photo2](/assets/images/2022-05-16-Python-Photo/2022-05-16-Python-Photo2.jpg)

<br/><br/>

# 01. 파일입출력 기본

## 1. 파일 입출력을 사용하는 이유

- 앞선 수업에서 사용자로부터 데이터를 입력 받을 때 사용하는 함수: `input()`
- 데이터를 표시: `print()`
- 프로그램 외부파일에 있는 데이터를 가져와야하거나 프로그램에서 만든 유의미한 데이터를 저장해야할 때에는 ⇒ 파일형태로 데이터를 읽고 저장해야함

<br/>

### **[파일 입출력을 사용하는 이유]**

- **파일로부터 데이터를 읽어와서** 프로그램에 사용하기 위해
- 프로그램에서 만든 데이터를 **파일 형태로 저장하기 위해**

<br/><br/>

## 2. 파일 열기 모드

- w: 쓰기 모드 (write)
- a: 추가 모드 (append)
- r: 읽기 모드 (read)

<br/>

### [파일 입출력을 할 때 필요한 과정: 파일 열기, 작업, 닫기]

![2022-05-16-Python-Photo3](/assets/images/2022-05-16-Python-Photo/2022-05-16-Python-Photo3.png)

<br/>

### 1. 파일 쓰기

```python
파일객체 = open("파일이름", "파일모드")
파일객체.write(데이터)
파일객체.close()

# 예시 1
file = open("data.txt", "w")
file.write("1.스타트코딩과 함께 파이썬 공부")
file.close()
```

- open 함수: data.txt 파일을 객체 형태로 가져와 file이라는 변수에 담아준다.
- write 함수: 데이터를 파일객체에 쓴다.
- close 함수: 파일을 닫아준다.

<br/>

### 2. 파일 추가

```python
파일객체 = open("파일이름", "파일모드")
파일객체.write(데이터)
파일객체.close()

# 예시 1
file = open("data.txt", "a")
file.write("2.비전공자도 정말 쉽게 배울 수 있습니다.")
file.close()
```

- open 함수: data.txt 파일을 객체 형태로 가져와 file이라는 변수에 담아준다.
- write 함수: 데이터를 파일객체에 쓴다.
- close 함수: 파일을 닫아준다.
- `w 모드` & `a 모드` 차이점
    - `w 모드` : 덮어쓰기(기존에 데이터가 있더라도 새로 데이터를 덮어쓴다)
    - `a 모드` : 이어쓰기

<br/>

### 3. 파일 읽기

```python
파일객체 = open("파일이름", "파일모드")
변수 = 파일객체.read(데이터)
파일객체.close()

# 예시 1
file = open("data.txt", "r")
data = file.read()
file.close()
```

- open 함수: data.txt 파일을 객체 형태로 가져와 file이라는 변수에 담아준다.
- read 함수: data.txt 파일에 있는 데이터 전체를 가져온다.
- close 함수: 파일을 닫아준다.

<br/><br/>

## 3. 실습

### 1. 파일 쓰기

```python
# 1. 파일 쓰기
file = open("data.txt", "w")
file.write("1. 스타트코딩과 함께 파이썬 공부")
file.close()
```

<br/>

- 파일을 실행하면 `PYTHON_BASIC` 폴더에 data.txt 가 생성된다.
- 경로를 설정하지 않았기 때문에 root 디렉터리 바로 아래에 파일이 생성된 것.
    
    ![2022-05-16-Python-Photo4](/assets/images/2022-05-16-Python-Photo/2022-05-16-Python-Photo4.png)
    
<br/>

- data.txt 파일을 open 할 때 경로를 지정해주면 된다.

```python
# 1. 파일 쓰기
file = open("./myvenv/Chapter10/data.txt", "w")
file.write("1. 스타트코딩과 함께 파이썬 공부")
file.close()
```

<br/>

- 기존에 생성한 data.txt 파일을 삭제한 뒤, 다시 파일입출력.py 파일을 실행해주면 Chapter10 하위에 data.txt 파일이 생성된다.
    
    ![2022-05-16-Python-Photo5](/assets/images/2022-05-16-Python-Photo/2022-05-16-Python-Photo5.png)

<br/>

- 만약 생성된 data.txt 파일이 깨질 경우, encoding 방법을 설정해주면 깨지지 않는다.

```python
# 1. 파일 쓰기
file = open("./myvenv/Chapter10/data.txt", "w", encoding="utf-8")
file.write("1. 스타트코딩과 함께 파이썬 공부")
file.close()
```

<br/>

### 2. 파일 추가

```python
# 2. 파일 추가
file = open("./myvenv/Chapter10/data.txt", "a", encoding="utf-8")
file.write("2. 비전공자도 정말 쉽게 배울 수 있습니다.")
file.close()
```

<br/>

- 실행 결과

```python
1. 스타트코딩과 함께 파이썬 공부2. 비전공자도 정말 쉽게 배울 수 있습니다.
```

<br/>

- 1 과 2 사이에 행을 바꾸고 싶은 경우 문장 시작하는 부분에 \n을 입력해주면 된다.

```python
# 2. 파일 추가
file = open("./myvenv/Chapter10/data.txt", "a", encoding="utf-8")
file.write("\n2. 비전공자도 정말 쉽게 배울 수 있습니다.")
file.close()
```

<br/>

- 실행 결과

```python
1. 스타트코딩과 함께 파이썬 공부
2. 비전공자도 정말 쉽게 배울 수 있습니다.
```

<br/>

### 3. 파일 읽기

- 파일 전체 읽기

```python
# 3. 파일 읽기
file = open("./myvenv/Chapter10/data.txt", "r", encoding="utf-8")

# 3.1. 파일 전체 읽기
data = file.read()
print(data)
file.close()
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyth
on_basic/myvenv/bin/python /Users/usr/Documents/py
thon_basic/myvenv/Chapter10/01.파일입출력.py
1. 스타트코딩과 함께 파이썬 공부
2. 비전공자도 정말 쉽게 배울 수 있습니다.
```

<br/>

- 파일 한 줄 읽기

```python
# 3. 파일 읽기
file = open("./myvenv/Chapter10/data.txt", "r", encoding="utf-8")

# 3.2. 파일 한 줄 읽기
while True:
    data = file.readline()
    print(data)
    if data == "":
        break
```

- 파일의 끝이 어디인지를 알 수 없기 때문에 파일의 끝을 알려주는 함수가 필요
- 데이터가 공백이었을 경우 무한반복문을 빠져나오도록 작성

<br/>

- 실행결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyth
on_basic/myvenv/bin/python /Users/usr/Documents/py
thon_basic/myvenv/Chapter10/01.파일입출력.py
1. 스타트코딩과 함께 파이썬 공부

2. 비전공자도 정말 쉽게 배울 수 있습니다.
```

- print 문이 줄바꿈을 실행하기 때문에 줄이 띄어져 출력(없애려면 print 문에 end=””를 추가하자)

<br/><br/>

이번 포스팅에서는 파일입출력 기본에 대해 알아보았다. 다음 포스팅에서는 csv파일 입출력에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**