---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 46일차'
date: '2022-06-02 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 강의 소개, 문자열 다루기를 듣고 정리해보았다(파트 3의 CSS 챕터는 파트 2 수강 후에 다시 들을 것. 현재 병행해서 듣고 있는 DevOps강의가 Django 베이스라서 문법 + Django 프레임워크 기준으로 빠르게 진도를 나가야 할 듯 해서 수강 순서를 다시 바꾸었다). 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-02-Python-Photo1](/assets/images/2022-06-02-Python-Photo/2022-06-02-Python-Photo1.jpg)

![2022-06-02-Python-Photo2](/assets/images/2022-06-02-Python-Photo/2022-06-02-Python-Photo2.jpg)

<br/><br/>

# 1. 강의 소개

## 환경설정(MacOS)

- 챕터 01의 1,2강은 강의소개/Windows의 환경설정 내용이므로 생략하였다.
- 파이썬 기본 챕터와 마찬가지로 가상환경을 만들어준다(MacOS기준).

<br/>

## 1. 프로젝트 폴더 생성

- Documents 폴더 하위에 python_advanced라는 폴더를 새로 생성한다.
- VScode에 들어가 File > Open > python_advanced 폴더를 연다.

<br/>

## 2. Python 가상환경 세팅(venv)

- Terminal > New Terminal 을 클릭한다.
- 터미널 창에서 `python3 -m venv myvenv` 를 실행한다.
- 아래와 같이 bin(바이너리)폴더의 activate를 실행하면 `myvenv` 라는 가상환경이 활성화된다.

```python
➜  python_advanced python3 -m venv myvenv
➜  python_advanced source ./myvenv/bin/activate
(myvenv) ➜  python_advanced
```

- myvenv 폴더 하위에 Chapter01라는 폴더를 생성한다.
    - 챕터별로 폴더를 생성해 관리할 예정
- `[환경설정테스트.py](http://환경설정테스트.py)` 라는 파일을 생성해 `print("hello startcoding!")` 라는 간단한 명령어를 입력해준 뒤 실행한다.

<br/>

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter01/01.환경설정테스트.py
hello startcoding!
```

<br/><br/>

# 2. 자료형 심화 - 01. 문자열 다루기

## 1. 문자열 메서드

- 소문자를 대문자로 바꾸는 방법

```python
>>> "be proud of yourself".upper()

"BE PROUD OF YOURSELF"
```

- 문자열 내의 모든 문자를 대문자로 변경해준다.

- 대문자를 소문자로 바꾸는 방법

```python
>>> "LOVE YOURSELF".lower()

"love yourself"
```

<br/>

- 문자열 바꾸는 방법**(자주 사용!)**

```python
>>> "오늘 날씨는 흐림 입니다.".replace("흐림", "맑음")

"오늘 날씨는 맑음 입니다."
```

- .replace(”바뀌기 전 문자열", “바뀐 뒤 문자열")

<br/>

- 문자열 위치 찾는 방법

```python
>>> "Hello World!".find("World")

6
```

- 찾고싶은 문자열의 인덱스를 알려준다(인덱스는 0부터 시작).
- 찾고 싶은 문자열이 존재하지 않는다면 -1을 반환한다.

<br/>

- 문자열 개수 세는 방법

```python
>>> "This cat is my cat".count("cat")

2
```

<br/>

- 문자열 분리하는 방법**(크롤링 할때 중요!)**

```python
>>> '나이키신발 265 X2421 78000'.split()

['나이키신발', '265', 'X2421', '78000']

>>> '나이키신발:265:X2421:78000'.split(':')

['나이키신발', '265', 'X2421', '78000']
```

- 쇼핑몰 크롤링 시 4가지 정보를 가져왔는데 문자열 종류별로 분리하고싶을 때 사용
    - split() ⇒ 공백을 기준으로 분리
    - split(:) ⇒ 콜론을 기준으로 분리

<br/>

- 문자열 연결하는 방법

```python
' '.join(['나이키신발', '265', 'X2421', '78000'])

나이키신발 265 X2421 78000

':'.join(['나이키신발', '265', 'X2421', '78000'])

나이키신발:265:X2421:78000
```

- `'구분자'.join([문자열 리스트])` 형식으로 사용한다.

<br/>

- 공백 삭제하는 방법

```python
>>> '     Yeah     '.lstrip()

'Yeah     '

>>> '     Yeah     '.rstrip()

'     Yeah'

>>> '     Yeah     '.strip()

'Yeah'
```

- `lstrip()` : 왼쪽 공백을 없앤다.
- `rstrip()` : 오른쪽 공백을 없앤다.
- `strip()` : 양쪽 공백을 없앤다.

<br/><br/>

## 2. 실습

### 1. replace: 문자열 교체

```python
# 1. replace
# 문자열 교체
a = '오늘 날씨는 흐림 입니다.'.replace("흐림", "맑음")
print(a)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/01.문자열다루기.py
오늘 날씨는 맑음 입니다.
```

<br/>

### 2. find: 문자열 찾기

```python
# 2. find
# 문자열 찾기
b = 'Hello world'.find('world')
print(b)

b2 = 'Hello world'.find('world2')
print(b2)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/01.문자열다루기.py
6
-1
```

<br/>

### 3. split: 문자열 분리

```python
# 3. split
# 문자열 분리
c = '나이키신발 265 X1212 78000'.split()
print(c)

d = '나이키신발:265:X1212:78000'.split(':')
print(d)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/01.문자열다루기.py
['나이키신발', '265', 'X1212', '78000']
['나이키신발', '265', 'X1212', '78000']
```

<br/>

### 4. strip: 문자열 공백 제거

```python
# 4. strip
# 문자열 공백 제거
e = '     Yeah     '.lstrip()
print(e)

f = '     Yeah     '.rstrip()
print(f)

g = '     Yeah     '.strip()
print(g)
```

<br/>

- 실행결과

```python

(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/01.문자열다루기.py
Yeah     
     Yeah
Yeah
```

- 첫번째 행은 우측에 공백 존재, 마지막 행은 우측에 공백 없음

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 강의 소개, 문자열 다루기를 정리해보았다. 다음 포스팅에서는 문자열 포매팅을 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**