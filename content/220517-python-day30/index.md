---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 31일차'
date: '2022-05-17 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 10-2. csv파일입출력을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-17-Python-Photo1](/assets/images/2022-05-17-Python-Photo/2022-05-17-Python-Photo1.jpg)

![2022-05-17-Python-Photo2](/assets/images/2022-05-17-Python-Photo/2022-05-17-Python-Photo2.jpg)

<br/><br/>

# 1. 파일 입출력 기본(이어서)

## 1. pickle 모듈

- 파일에 파이썬 객체를 저장한다.

```python
import pickle
data = {
    "목표1": "매일 팔굽혀펴기 100회",
    "목표2": "매일 코딩 공부 1시간"
}

file = open("data.pickle", "wb")
pickle.dump(data, file)
file.close()
```

- wb: write binary 모드. 컴퓨터가 바로 읽을 수 있는 데이터 형식
- “data.pickle” 의 pickle은 .p 혹은 .pc 로 변경해도 된다.

<br/>

- 파일로부터 파이썬 객체를 읽어보자.

```python
import pickle
file = open("data.pickle", "rb")
data = pickle.load(file)
print(data) 
file.close()
```

- rb: read binary 모드.
- data = pickle.load(file): 파일에서 데이터가 하나하나 로드되어 data 객체에 저장

<br/><br/>

## 2. With 구문

- With 구문을 사용해보자.

```python
# with 구문 사용 X
file = open("data.txt", "r")
data = file.read()
file.close()

# with 구문 사용 O
with open("data.txt", "r") as file:
    data = file.read()
```

- with 구문을 사용하는 이유: file.close 를 매번 사용하기 번거롭기 때문.

<br/><br/>

## 3. 실습

- 파이썬 객체를 pickle로 저장해보자.

```python
# 1. 파이썬 객체를 pickle로 저장하기
import pickle

data = {
    "목표1" : "매일 팔굽혀 펴기 100회",
    "목표2" : "매일 코딩 공부 1시간"
}

file = open("./myvenv/Chapter10/data.pickle", "wb")
pickle.dump(data, file)
file.close()
```

- 코드를 실행하면 Chapter10 폴더 하위에 data.pickle 이라는 파일이 생성된다(바이너리 파일이므로 열어서 내용을 읽을 수 없음)

<br/>

- pickle 파일을 파이썬으로 가져와보자.

```python
# 2. pickle 파일 파이썬으로 가져오기
file = open("./myvenv/Chapter10/data.pickle", "rb")
data = pickle.load(file)
print(data)
file.close()
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyth
on_basic/myvenv/bin/python /Users/usr/Documents/py
thon_basic/myvenv/Chapter10/02.pickle.py
{'목표1': '매일 팔굽혀 펴기 100회', '목표2': '매일 코딩 공부 1시간'}
```

<br/>

- with 구문도 사용해보자.

```python
# with 구문을 사용하면 자동으로 file.close 해준다.
with open("./myvenv/Chapter10/data.txt", "r", encoding="utf-8") as file:
    data = file.read()
    print(data)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyth
on_basic/myvenv/bin/python /Users/usr/Documents/py
thon_basic/myvenv/Chapter10/03.with구문.py
1. 스타트코딩과 함께 파이썬 공부
2. 비전공자도 정말 쉽게 배울 수 있습니다.
```

<br/><br/>

# 2. csv 파일 입출력

## 1. csv 파일이란?

- CSV: comma-seperated values의 약어. 데이터가 콤마로 구분된 텍스트 파일 형식
- 예: student.csv
    
    이름, 반, 번호
    
    재석, 1, 20
    
    홍철, 3, 8
    
    형돈, 5, 32
    

⇒ 테이블 형태의 데이터

<br/><br/>

## 2. csv 파일 입출력 사용방법

### 1. csv 파일 쓰기

```python
# csv파일 쓰기
import csv

data = [
    ["이름", "반", "번호"],
    ["재석", 1, 20],
    ["홍철", 3, 8],
    ["형돈", 5, 32]
]

file = open("student.csv", "w")
writer = csv.writer(file)
for d in data:
    writer.writerow(d)
file.close()
```

<br/><br/>

### 2. csv 파일 읽기

```python
import csv

file = open("student.csv", "r")
reader = csv.reader(file)
for d in reader:
    print(d)
file.close()
```

<br/><br/>

## 3. 실습

```python
from asyncore import write
import csv
from dataclasses import dataclass # 내장 모듈

data = [
    ["이름", "반", "번호"],
    ["재석", 1, 20],
    ["홍철", 3, 8],
    ["형돈", 5, 32]
]

# Window의 경우 newline="" (자동 띄어쓰기 방지), encoding="utf-8-sig" (글씨 깨짐 방지) 삽입: open("student.csv", "w", newline="", encoding="")
file = open("./myvenv/Chapter10/student.csv", "w")
writer = csv.writer(file)

for d in data:
    writer.writerow(d)

file.close()
```

- for d in data: data의 데이터들을 하나씩 갖고와 d 에 저장한다.

<br/>

- csv파일 읽기 파일을 생성해 아래 코드를 작성한다.

```python
import csv

file = open("./myvenv/Chapter10/student.csv", "r")
reader = csv.reader(file)
for data in reader:
    print(data)
file.close()
```

<br/>

- 실행결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyth
on_basic/myvenv/bin/python /Users/usr/Documents/py
thon_basic/myvenv/Chapter10/05.csv파일읽기.py
['이름', '반', '번호']
['재석', '1', '20']
['홍철', '3', '8']
['형돈', '5', '32']
```

<br/><br/>

이번 포스팅에서는 csv파일 입출력에 대해 알아보았다. 다음 포스팅에서는 파일입출력 실습문제를 풀어보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**