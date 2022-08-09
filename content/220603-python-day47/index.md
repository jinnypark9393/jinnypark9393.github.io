---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 47일차'
date: '2022-06-03 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 강의 소개, 문자열 다루기를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-03-Python-Photo1](/assets/images/2022-06-03-Python-Photo/2022-06-03-Python-Photo1.jpg)

![2022-06-03-Python-Photo2](/assets/images/2022-06-03-Python-Photo/2022-06-03-Python-Photo2.jpg)

<br/><br/>

# 02. 문자열 포매팅

- 문자열 포매팅: 문자열을 편리하게 만드는 방법. 문자열을 여러 데이터를 조합해 만드는 방법

<br/>

## 1. 문자열 포매팅이 없다면?

```python
# 문자열 포매팅이 없다면?
# 기준님 수강기간이 7일 남았습니다.
# (사용자)님 수강기간이 (남은기간)일 남았습니다 => 변수처리

name = "기준"
duration = 7

message = name + '님 수강기간이 ' + str(duration) + '일 남았습니다.'
print(message)
```

- 사용하기 불편하다(형변환도 필요함).

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/02.문자열포매팅.py
기준님 수강기간이 7일 남았습니다.
```

<br/><br/>

## 2. 문자열 포매팅 사용시

```python
# 문자열 포매팅 사용시!!!
name = "기준"
duration = 7

message_format = f'{name}님 수강기간이 {duration}일 남았습니다.'
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/02.문자열포매팅.py
기준님 수강기간이 7일 남았습니다.
```

<br/>

- 형변환도 필요 없음.

## 3. format 메서드

```python
'{인덱스}'.format(데이터)

>>> 'Hello{0}'.format('startcoding')

'Hello startcoding'
```

- 데이터가 인덱스에서 지정한 자리에 들어가게 된다.

<br/>

- 값을 여러 개 넣으려면?

```python
>>> 'Hello{0} {1} {2}'.format('apple', 'pineapple', 'pen')

'Hello apple pineapple pen'
```

<br/>

- 인덱스를 생략하려면?

```python
>>> 'Hello {} {} {}'.format('apple', 'pineapple', 'pen')

'Hello apple pineapple pen'
```

- 인덱스를 생략하면 순서대로 들어가게 된다.

<br/><br/>

## 4. f-string

```python
name1 = 'apple'

name2 = 'pineapple'

name3 = 'pen'

msg = f'Hello {name1} {name2} {name3}'

'Hello apple pineapple pen'
```

<br/><br/>

## 5. 실습

```python
# format 메서드 사용
a = 'Hello {0} {1} {2}'.format('apple', 'pinapple', 'pen')
print(a)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/02.문자열포매팅.py
Hello apple pinapple pen
```

<br/>

- 인덱스 값을 바꾸면 바꾼대로 출력된다.

```python
# format 메서드 사용
a = 'Hello {2} {1} {0}'.format('apple', 'pinapple', 'pen')
print(a)
```

<br/>

- 실행결과

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/02.문자열포매팅.py
Hello pen pinapple apple
```

<br/>

- 인덱스값을 비워두면 차례대로 값이 들어간다.

```python
b = 'Hello {} {} {}'.format('apple', 'pinapple', 'pen')
print(b)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/02.문자열포매팅.py
Hello apple pinapple pen
```

<br/>

- f-string 사용

```python
# f-string 사용
name1 = 'apple'
name2 = 'pineapple'
name3 = 'pen'

c = f'Hello {name} {name2} {name3}'
print(c)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/02.문자열포매팅.py
Hello apple pineapple pen
```
<br/><br/>

이번 포스팅에서는 강의의 파트 2의 문자열 포매팅을 정리해보았다. 다음 포스팅에서는 리스트 다루기를 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**