---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 50일차'
date: '2022-06-06 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 다양한 매개변수(1),(2)를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-06-Python-Photo1](/assets/images/2022-06-06-Python-Photo/2022-06-06-Python-Photo1.JPG)

![2022-06-06-Python-Photo2](/assets/images/2022-06-06-Python-Photo/2022-06-06-Python-Photo2.JPG)

<br/><br/>

# 01. 다양한 매개변수 (1)

## 1. 위치 매개변수(positional parameter)

- 가장 기본적인 매개변수
- 함수 호출 시 **순서대로** 데이터(인자)를 넘겨줘야 한다.
- 다른 매개변수와 함께 쓸때는 **항상 맨 앞에(중요!)** 써야 한다.

```python
# 함수 정의
def my_func(a, b):
    print(a, b)

# 함수 호출
my_func(1, 2)
```

<br/>

## 2. 기본 매개변수(default parameter)

- 매개변수의 기본적인(default) 값
- 함수를 정의할 때 매개변수의 기본 값을 지정할 수 있다.

```python
# 함수 정의
def post_info(title, content='내용없음'):
    print('제목:',title)
    print('내용:',content)

# 함수 호출
>>> post_info('출석합니다!')
제목: 출석합니다!
내용: 내용없음
```

- title: 위치 매개변수
- content: 기본 매개변수(내용이 없는 경우에는 내용없음이 기본 값으로 들어간다.)

<br/>

## 3. 키워드 매개변수(keyword parameter)

- 함수 호출 시에 키워드를 붙여 호출한다.
- 매개변수의 순서를 지키지 않아도 된다.

```python
# 함수 정의
def post_info(title, content):
    print('제목:',title)
    print('내용:',content)

# 함수 호출
>>> post_info(content='없어요',title='여자친구 만드는 방법')
제목: 여자친구 만드는 방법
내용: 없어요
```

- title을 뒤에서 보내줘도 된다.
- 각 키워드(title, content)에 맞는 값이 할당된다.

<br/><br/>

## 4. 실습

### 1. 위치 매개변수

```python
# 1. 위치 매개변수
# 가장 기본적인 매개변수
def my_func(a, b):
    print(a, b)

my_func(2, 3)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/01.다양한매개변수1.py
2 3
```

<br/>

### 2. 기본 매개변수

```python
# 2. 기본 매개변수
# 매개변수의 기본값을 지정할 수 있다.

def post_info(title, content='내용없음'):
    print('제목:', title)
    print('내용:', content)

post_info('출석합니다!')
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/01.다양한매개변수1.py
제목: 출석합니다!
내용: 내용없음
```

<br/>

### 3. 키워드 매개변수

```python
# 3. 키워드 매개변수
# 함수 호출 시 키워드를 붙여서 호출
# 매개변수의 순서를 지키지 않아도 된다.

def post_info(title, content):
    print('제목:', title)
    print('내용:', content)

post_info(content='없어요', title='여자친구 만드는 방법')
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/01.다양한매개변수1.py
제목: 여자친구 만드는 방법
내용: 없어요
```

<br/><br/>

# 02. 다양한 매개변수 (2)

## 1. 위치 가변 매개변수(position variable parameter)

- 가변 매개변수: 개수가 정해지지 않은 매개변수
- 매개변수 앞에 *가 붙는다 (**튜플형**)
- 예시

```python
# 함수 정의
def print_fruits(*args):
    for arg in args:
        print(arg)

# 함수 호출
>>> print_fruits('apple','orange','mango')
apple
orange
mango
```

<br/><br/>

## 2. 키워드 가변 매개변수(keyword variable parameter)

- 매개변수 앞에 **가 붙는다. (딕셔너리형)

```python
# 함수 정의
def comment_info(**kwargs):
    for key, value in kwargs.items():
        print(f'{key} : {value}')

# 함수 호출
>>> comment_info(name='파린이', content='정말 감사합니다!')
name: 파린이
content: 정말 감사합니다!
```

<br/><br/>

## 3. 실습

### 1. 위치 가변 매개변수

```python
# 1. 위치 가변 매개변수
def print_fruits(*args):
    print(args)

print_fruits('apple', 'orange', 'mango', 'grape')
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/02.다양한매개변수2.py
('apple', 'orange', 'mango', 'grape')
```

- 기본적으로 튜플 형태로 가져온다.

<br/>

- for in 문을 사용해 출력할 수도 있다.

```python
# 1. 위치 가변 매개변수
def print_fruits(*args):
    for arg in args:
        print(arg)

print_fruits('apple', 'orange', 'mango', 'grape')
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/02.다양한매개변수2.py
apple
orange
mango
grape
```

<br/><br/>

### 2. 키워드 가변 매개변수

```python
# 2. 키워드 가변 매개변수
def comment_info(**kwargs):
    print(kwargs)

comment_info(name='파린이', contents='정말 감사합니다!')
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/02.다양한매개변수2.py
{'name': '파린이', 'contents': '정말 감사합니다!'}
```

- 딕셔너리 형태로 출력된다.

<br/>

- for in 문을 사용해 출력해보자.

```python
# 2. 키워드 가변 매개변수
def comment_info(**kwargs):
    for key, value in kwargs.items():
        print(f'{key} : {value}')

comment_info(name='파린이', contents='정말 감사합니다!')
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/02.다양한매개변수2.py
name : 파린이
contents : 정말 감사합니다!
```

<br/><br/>

### 3. 매개변수 작성 순서

```python
# 매개변수 작성 순서
# 위치 - 기본 - 위치 가변 - 키워드(기본) - 키워드 가변
```

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 다양한 매개변수(1),(2)를 알아보았다. 다음 포스팅에서는 람다함수에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**