---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 52일차'
date: '2022-06-08 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 map, filter함수를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-08-Python-Photo1](/assets/images/2022-06-08-Python-Photo/2022-06-08-Python-Photo1.jpg)

![2022-06-08-Python-Photo2](/assets/images/2022-06-08-Python-Photo/2022-06-08-Python-Photo2.jpg)

<br/><br/>

# 04. map, filter 함수

## 1. map 함수

- map 함수 사용 방법

```python
map(함수, 순서가있는자료형)

# 예시
map(int, ['3','4','5','6']
```

- 순서가 있는 자료형: 리스트(`[]`), 튜플(`()`), 딕셔너리(`{}`), range 객체
- 함수 = int (데이터를 정수형으로 바꿔주는 함수)

![2022-06-08-Python-Photo3](/assets/images/2022-06-08-Python-Photo/2022-06-08-Python-Photo3.png)

- 리스트의 각각의 데이터가 int 함수를 거쳐 그 결과를 map 오브젝트로 만들어낸다.

- map 함수를 리스트로 감싸주면 리스트로 결과를 받을 수 있다.

```python
list(map(함수, 순서가있는자료형))

# 예시
list(map(int, ['3','4','5','6']))
```

### Map 함수를 이용한 간단한 예제: 리스트 모든 요소의 공백 제거

- for문 사용했을 때

```python
items = [' 로지덱마우스 ', ' 앱솔키보드 ']
for i in range(len(items)):
    items[i] = items[i].strip()
```

- map 사용했을 때 (1)

```python
def strip_all(x):
    return x.strip()

items = [' 로지덱마우스 ', ' 앱솔키보드 ']

items = list(map(strip_all, items))
```

- strip_all 이라는 함수를 정의하고, 매개변수로는 x를 받는다.

![2022-06-08-Python-Photo4](/assets/images/2022-06-08-Python-Photo/2022-06-08-Python-Photo4.png)

- strip_all 함수를 거쳐 앞뒤 공백이 사라진 데이터가 map객체에 담긴다.
- list 함수를 거쳐 각 데이터가 다시 리스트로 만들어진 뒤 items에 할당된다.

- map 사용했을 때 (2)

```python
def strip_all(x):
    return x.strip()

items = [' 로지덱마우스 ', ' 앱솔키보드 ']

items = list(map(strip_all, items))
```

- 한번 쓰고 말 함수에 이름을 붙이기 귀찮은 경우 ⇒ **람다 함수** 이용

- 람다 함수를 사용했을 때

```python
items = [' 로지덱마우스 ', ' 앱솔키보드 ']

items = list(map(lambda x:x.strip(), items))
```

## 2. filter 함수

- filter 함수 사용 방법

```python
filter(함수, 순서가있는 자료형)

def func(x):
    return x<0

filter(func, [-3, -2, 0, 5, 7,])
```

- 동작 과정

![2022-06-08-Python-Photo5](/assets/images/2022-06-08-Python-Photo/2022-06-08-Python-Photo5.png)

- 리스트 중 func함수가 true일 때 결과를 filter 오브젝트로 만들어 낸다.

### Filter 함수 예제: 리스트에서 길이가 3이하인 문자들만 필터링

- for문 사용했을 때

```python
animals = ['cat', 'tiger', 'dog', 'bird', 'monkey']

result = []

for i in animals:
    if len(i) <= 3:
        result.append(i)
```

- filter문 사용했을 때

```python
animals = ['cat', 'tiger', 'dog', 'bird', 'monkey']

def word_check(x):
    return len(x) <= 3

result = list(filter(word_check, animals))
```

- 람다 함수를 사용했을 때

```python
animals = ['cat', 'tiger', 'dog', 'bird', 'monkey']

result = list(filter(lambda x:len(x) <= 3, animals)
```

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 map, filter함수를 알아보았다. 다음 포스팅에서는 map, filter 함수를 실습해 보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**