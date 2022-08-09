---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 53일차'
date: '2022-06-09 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 map, filter 실습을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-09-Python-Photo1](/assets/images/2022-06-09-Python-Photo/2022-06-09-Python-Photo1.jpg)

![2022-06-09-Python-Photo2](/assets/images/2022-06-09-Python-Photo/2022-06-09-Python-Photo2.jpg)

<br/><br/>

# 05. map, filter 함수 실습

## 1. map 함수

- map 함수를 사용해보자.

```python
# 1. map 함수
# - 사용 이유
# 기존 리스트를 수정해서 새로운 리스트를 만들 때

# - 사용 방법
# map(함수, 순서가있는자료형)
print(map(int, ['3', '4', '5', '6']))
```

<br/>

- 실행 결과: map 객체가 생성되었다.

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/04.map,filter함수.py
<map object at 0x106e22cb0>
```

<br/>

- 다시 리스트로 만드려면 list()로 map을 감싸주면 된다.

```python
# 1. map 함수
# - 사용 이유
# 기존 리스트를 수정해서 새로운 리스트를 만들 때

# - 사용 방법
# map(함수, 순서가있는자료형)
print(list(map(int, ['3', '4', '5', '6'])))
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/04.map,filter함수.py
[3, 4, 5, 6]
```

<br/><br/>

### 1. 예제: 리스트 모든 요소의 공백 제거

- 먼저 for문을 이용해서 구현해보자.

```python
# - 예제
# 리스트 모든 요소의 공백 제거
items = ['   로지텍마우스   ', '   앱솔키보드   ']

# 1) for문 사용
result = []

for i in range(len(items)):
    items[i] = items[i].strip()
print(items)
```

- 참고: 데이터에 앞뒤 공백이 붙는 경우는 크롤링을 할 때 자주 만날 수 있다.

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/04.map,filter함수.py
['로지텍마우스', '앱솔키보드']
```

<br/>

- map 함수를 사용해 구현해보자.

```python
# 2) map 사용
def strip_all(x):
    return x.strip()

items = list(map(strip_all, items))
print(items)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/04.map,filter함수.py
['로지텍마우스', '앱솔키보드']
```

<br/>

- 마지막으로 lambda 함수를 이용해 구현해보자.

```python
# 3) lambda 사용
items = list(map(lambda x:x.strip, items))
print(items)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/04.map,filter함수.py
['로지텍마우스', '앱솔키보드']
```

<br/><br/>

## 2. filter 함수

- filter 함수의 사용법을 알아보자.

```python
# - 사용 방법
# filter(함수, 순서가있는자료형)
def func(x):
    return x < 0
print(list(filter(func, [-3, -2, 0, 5, 7])))
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/04.map,filter함수.py
[-3, -2]
```

<br/><br/>

### 1. 예제: 리스트에서 길이가 3이하인 문자들만 필터링

- for 문을 사용해 구현해보자.

```python
# - 예제
# 리스트에서 길이가 3이하인 문자들만 필터링
animals = ['cat', 'tiger', 'dog', 'bird', 'monkey']

# 1) for 사용
result = []
for i in animals:
    if len(i) <= 3:
        result.append(i) 
print(result)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/04.map,filter함수.py
['cat', 'dog']
```

<br/>

- filter 함수를 이용해 구현해보자.

```python
# 2) filter 사용
def word_check(x):
    return len(i) <= 3

result = list(filter(word_check, animals))
print(result)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/04.map,filter함수.py
['cat', 'dog']
```

<br/>

- lambda 함수를 이용해 구현해보자

```python
# 3) lambda 사용
result = list(filter(lambda x:len(x) <= 3, animals))
print(result)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter03/04.map,filter함수.py
['cat', 'dog']
```

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 map, filter함수를 실습해보았다. 다음 포스팅에서는 클래스와 객체를 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**