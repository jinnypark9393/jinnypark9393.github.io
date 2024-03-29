---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 51일차'
date: '2022-06-07 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 람다함수를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-07-Python-Photo1](/assets/images/2022-06-07-Python-Photo/2022-06-07-Python-Photo1.jpg)

![2022-06-07-Python-Photo2](/assets/images/2022-06-07-Python-Photo/2022-06-07-Python-Photo2.jpg)

<br/><br/>

# 03. 람다 함수(lamda)

## 1. 람다 함수란?

- 이름을 지을 필요도 없을 **간단한 형태의 함수**
- 다른 함수의 인자(argument)로 넣을 수 있다.
- 코드가 간결해지고, 메모리가 절약된다.

<br/>

## 2. 람다 함수 사용 방법

- 기존 함수와 람다 함수의 정의 방법을 살펴보자.

```python
# 기존 함수 정의 방법
def 함수이름(매개변수):
    return 결과

# 기존 함수 정의 방법 예시
def minus_one(a):
    return a - 1

# 람다 함수 정의 방법
lambda 매개변수 : 결과

# 람다 함수 정의 방법 예시
lambda a : a - 1
```

<br/>

- 기존 함수와 람다 함수의 호출 방법을 살펴보자.

```python
# 기존 함수 호출 방법
>>> minus_one(10)
9

# 람다 함수 호출 방법
>>> (lambda a : a - 1)(10)
9

>>> minus_one = lambda a : a - 1
>>> minus_one(10)
9
```

- 람다 함수 자체를 괄호로 감싸서 사용
- 변수에 람다함수를 할당해 사용

<br/>

- 기존 함수와 람다 함수에서 if문을 사용하는 방식을 비교해보자.

```python
# 기존 함수 정의 방법
def is_positive_number(a):
    if a > 0:
        return True
    else:
        return False

# 람다 함수 정의 방법
lambda a : True if a > 0 else False
```

<br/>

- if문을 적용한 함수를 호출해보자.

```python
# 기존 함수 호출 방법
>>> is_positive_number(-2)
False

# 람다 함수 호출 방법
>>> (lambda a : True if a > 0 else False)(-2)
False
```

<br/><br/>

## 3. 실습

```python
# 기존 함수
def minus_one(a):
    return a-1

# 람다 함수
lambda a : a-1

# 람다 함수 호출 방법 1. 함수 자체를 호출
print((lambda a : a-1)(10))

# 람다 함수 호출 방법 2. 변수에 담아서 호출
minus_one_2 = lambda a : a-1
print(minus_one_2(100))
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/03.람다함수.py
9
99
```

<br/>

- 람다 함수 안에서 if문을 사용해보자.

```python
# 람다 함수에서 if 문 사용

# 기존 함수
def is_positive_number(a):
    if a > 0:
        return True
    else:
        return False

# 람다 함수
lambda a : True if a > 0 else False

# 람다 함수 호출(1)
print((lambda a : True if a > 0 else False)(-2))

# 람다 함수 호출(2)
is_positive_number_2 = lambda a : True if a > 0 else False
print(is_positive_number_2(2))
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/03.람다함수.py
False
True
```

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 람다함수를 알아보았다. 다음 포스팅에서는 map, filter 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**