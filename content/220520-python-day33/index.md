---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 33일차'
date: '2022-05-20 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 11-2. 에러 만들기 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-20-Python-Photo1](/assets/images/2022-05-20-Python-Photo1/2022-05-20-Python-Photo1.JPG)

![2022-05-20-Python-Photo2](/assets/images/2022-05-20-Python-Photo1/2022-05-20-Python-Photo2.JPG)

<br/><br/>

## 1. raise 구문

- 에러를 강제로 발생시키기 위한 구문

```python
raise 예외("에러 메시지")

# 예시
raise Exception
raise Exception("에러 메시지")
```

## 2. 예외 계층 구조

- 예외 계층 구조

```python
BaseException
 +-- SystemExit
 +-- Keyboardinterrupt
 +-- GeneratorExit
 +-- Exception
      +-- Stopiteration
      +-- StopAsynciteration
      +-- ArithmeticError
      |    +-- FloatingPointError
      |    +-- OverflowError
      |    +-- ZeroDivisionError
      +-- AssertionError
      +-- AttributeError
      +-- BuffurError
      +-- EOFError
      +-- ImportError
      |    +-- ModuleNotFoundError
      +-- LookupError
      |    +-- IndexError
      |    +-- KeyError

```

- 예시

```python
except ZeroDivisionError # ZeroDivisionError 하나만 받아서 처리

except ArithmeticError # ArithmeticError 하위의 세 에러 모두 받을 수 있음

except Exception # 하위의 모든 내장 예외를 모두 받을 수 있음
```

## 3. 에러 만들기

```python
class 예외(Exception): # exception 클래스를 상속받는 것
    def __init__(self):
        super().__init__("에러메시지")
```

## 4. 실습

### 1. 에러 발생시키기

```python
# raise 구문을 사용해서 에러를 강제로 발생시켜 보자.

num = int(input("음수를 입력해 주세요>>>"))
if num >= 0:
    raise Exception("양수는 입력 불가")
```

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter11/02.에러발생시키기.py
음수를 입력해 주세요>>>1
Traceback (most recent call last):
  File "/Users/jinipark/Documents/python_basic/myvenv/Chapter11/02.에러발생시키기.py", line 5, in <module>
    raise Exception("양수는 입력 불가")
Exception: 양수는 입력 불가
```

- try except 구문을 사용해보자.

```python
# raise 구문을 사용해서 에러를 강제로 발생시켜 보자.

try:
    num = int(input("음수를 입력해 주세요>>>"))
    if num >= 0:
        raise Exception("양수는 입력 불가")
except Exception as e:
    print("에러 발생!", e)
```

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter11/02.에러발생시키기.py
음수를 입력해 주세요>>>1
에러 발생! 양수는 입력 불가
```

- 에러를 Exception이 아닌 기타 내장된 에러로 변경할 수 있다.

```python
# raise 구문을 사용해서 에러를 강제로 발생시켜 보자.

try:
    num = int(input("음수를 입력해 주세요>>>"))
    if num >= 0:
        raise ValueError("양수는 입력 불가")
except ValueError as e:
    print("에러 발생!", e)
```

### 2. 에러 만들기

```python
class PositiveNumberError(Exception):
    def __init__(self):
        super().__init__("양수는 입력 불가")

try:
    num = int(input("음수를 입력해 주세요>>>"))
    if num >= 0:
        raise PositiveNumberError
except PositiveNumberError as e:
    print("에러 발생!", e)
```

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter11/03.에러만들기.py
음수를 입력해 주세요>>>2
에러 발생! 양수는 입력 불가
```

<br/><br/>

이번 포스팅에서는 에러와 예외처리에 대해 알아보았다. 다음 포스팅에서는 에러와 에러를 만들어보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**