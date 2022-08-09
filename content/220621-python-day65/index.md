---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 65일차'
date: '2022-06-21 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 파이썬에서의 re모듈 사용방법(1)을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-21-Python-Photo1](/assets/images/2022-06-21-Python-Photo/2022-06-21-Python-Photo1.jpg)

![2022-06-21-Python-Photo2](/assets/images/2022-06-21-Python-Photo/2022-06-21-Python-Photo2.jpg)

<br/><br/>

# 04. 파이썬 re 모듈 사용 방법(1)

## 1. re 모듈의 메서드

| 종류 | 기능 | 찾는 경우 | 없는 경우 |
| --- | --- | --- | --- |
| match | 문자열 처음부터 검색 | match object 1개 | None |
| search | 문자열 전체를 검색 | match object 1개 | None |

- (regex, 문자열) 형태로 표현

<br/>

| 종류 | 기능 | 찾는 경우 | 없는 경우 |
| --- | --- | --- | --- |
| findall | 문자열 전체를 검색 | 문자열 리스트 | 빈 리스트 |
| finditer | 문자열 전체를 검색 | match object iterator | None |

- findall ⇒ (’a’, ‘a’) 형태로 표현
- finditer ⇒ iterator(순서가 있는)의 약어.

<br/>

| 종류 | 기능 | 찾는 경우 | 없는 경우 |
| --- | --- | --- | --- |
| fullmatch | 패턴과 문자열이 남는 부분 없이 완벽하게 일치 | match object 1개 | None |

<br/><br/>

## 2. match 객체의 메서드

| 종류 | 기능 | 반환 값 예시 |
| --- | --- | --- |
| group | 매칭된 문자열을 반환 | people |
| start | 매칭된 문자열의 시작 위치 | 5 |
| end | 매칭된 문자열의 끝 위치 | 11 |
| span | 매칭된 문자열의 (시작, 끝) 튜플 | (5,11) |

<br/><br/>

## 3. 실습

```bash
import re

# 1. re 모듈의 메서드
str = 'love people around you, love your work, love yourself'

# 1) match
result = re.match('love', str)
print(result)
```

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/usr/Documents/python_advanced/myvenv/Chapter06/01.정규표현식
1.py
<re.Match object; span=(0, 4), match='love'>
```

<br/>

- 맨 앞의 love를 지울 경우에는 어떻게 표시되는지 보자.

```bash
import re

# 1. re 모듈의 메서드
str = 'love people around you, love your work, love yourself'

# 1) match : 문자열의 처음부터 검색 (결과 : 1개의 match 객체)
result = re.match('love', str)
print(result)
```

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/usr/Documents/python_advanced/myvenv/Chapter06/01.정규표현식
1.py
None
```

<br/>

- search 메서드를 사용해보자.

```bash
import re

# 1. re 모듈의 메서드
str = 'love people around you, love your work, love yourself'

# 1) match : 문자열의 처음부터 검색 (결과 : 1개의 match 객체)
result = re.match('love', str)
print(result)

# 2) search : 문자열의 전체를 검색 (결과 : 1개의 match 객체)
result = re.search('people', str)
print(result)
```

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/usr/Documents/python_advanced/myvenv/Chapter06/01.정규표현식
1.py
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(5, 11), match='people'>
```

<br/>

- findall 메서드를 사용해보자.

```bash
import re

# 1. re 모듈의 메서드
str = 'love people around you, love your work, love yourself'

# 1) match : 문자열의 처음부터 검색 (결과 : 1개의 match 객체)
result = re.match('love', str)
print(result)

# 2) search : 문자열의 전체를 검색 (결과 : 1개의 match 객체)
result = re.search('people', str)
print(result)

# 3) findall : 문자열의 전체를 검색 (결과 : 문자열 리스트)
results = re.findall('love', str)
print(results)
```

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/usr/Documents/python_advanced/myvenv/Chapter06/01.정규표현식
1.py
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(5, 11), match='people'>
['love', 'love', 'love']
```

<br/>

- finditer를 사용해보자.

```bash
import re

# 1. re 모듈의 메서드
str = 'love people around you, love your work, love yourself'

# 1) match : 문자열의 처음부터 검색 (결과 : 1개의 match 객체)
result = re.match('love', str)
print(result)

# 2) search : 문자열의 전체를 검색 (결과 : 1개의 match 객체)
result = re.search('people', str)
print(result)

# 3) findall : 문자열의 전체를 검색 (결과 : 문자열 리스트)
results = re.findall('love', str)
print(results)

# 4) finditer : 문자열의 전체를 검색 (결과 : match 객체 이터레이터(순서가 있는 자료형))
results = re.finditer('love', str)
print(results)

# 순서가 있는 자료형을 프린트 할 때에는 for in문을 사용한다.
for result in results:
    print(result)
```

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/usr/Documents/python_advanced/myvenv/Chapter06/01.정규표현식
1.py
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(5, 11), match='people'>
['love', 'love', 'love']
<callable_iterator object at 0x108ea7fa0>
```

- 순서가 있는 오브젝트를 출력할 때에는 for in문을 사용해야한다.

<br/>

- for in문을 사용해 finditer문의 결과를 다시 출력해보자.

```bash
import re

# 1. re 모듈의 메서드
str = 'love people around you, love your work, love yourself'

# 1) match : 문자열의 처음부터 검색 (결과 : 1개의 match 객체)
result = re.match('love', str)
print(result)

# 2) search : 문자열의 전체를 검색 (결과 : 1개의 match 객체)
result = re.search('people', str)
print(result)

# 3) findall : 문자열의 전체를 검색 (결과 : 문자열 리스트)
results = re.findall('love', str)
print(results)

# 4) finditer : 문자열의 전체를 검색 (결과 : match 객체 이터레이터(순서가 있는 자료형))
results = re.finditer('love', str)
print(results)

# 순서가 있는 자료형을 프린트 할 때에는 for in문을 사용한다.
for result in results:
    print(result)
```

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/usr/Documents/python_advanced/myvenv/Chapter06/01.정규표현식
1.py
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(5, 11), match='people'>
<callable_iterator object at 0x108ea7fa0>
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(24, 28), match='love'>
<re.Match object; span=(40, 44), match='love'>
```

<br/>

- fullmatch도 사용해보자.

```bash
import re

# 1. re 모듈의 메서드
str = 'love people around you, love your work, love yourself'

# 1) match : 문자열의 처음부터 검색 (결과 : 1개의 match 객체)
result = re.match('love', str)
print(result)

# 2) search : 문자열의 전체를 검색 (결과 : 1개의 match 객체)
result = re.search('people', str)
print(result)

# 3) findall : 문자열의 전체를 검색 (결과 : 문자열 리스트)
results = re.findall('love', str)
print(results)

# 4) finditer : 문자열의 전체를 검색 (결과 : match 객체 이터레이터(순서가 있는 자료형))
results = re.finditer('love', str)
print(results)

# 순서가 있는 자료형을 프린트 할 때에는 for in문을 사용한다.
for result in results:
    print(result)

# 5) fullmatch : 패턴과 문자열이 완벽하게 일치하는지 검사
str2 = 'Hey Guys, read books'
result = re.fullmatch('Hey Guys, read books', str2)
print(result)
```

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/usr/Documents/python_advanced/myvenv/Chapter06/01.정규표현식
1.py
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(5, 11), match='people'>
<callable_iterator object at 0x108ea7fa0>
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(24, 28), match='love'>
<re.Match object; span=(40, 44), match='love'>
<re.Match object; span=(0, 20), match='Hey Guys, read books'>
```

<br/>

- `.*` 로 표현해도 일치할 것이다.

```bash
import re

# 1. re 모듈의 메서드
str = 'love people around you, love your work, love yourself'

# 1) match : 문자열의 처음부터 검색 (결과 : 1개의 match 객체)
result = re.match('love', str)
print(result)

# 2) search : 문자열의 전체를 검색 (결과 : 1개의 match 객체)
result = re.search('people', str)
print(result)

# 3) findall : 문자열의 전체를 검색 (결과 : 문자열 리스트)
results = re.findall('love', str)
print(results)

# 4) finditer : 문자열의 전체를 검색 (결과 : match 객체 이터레이터(순서가 있는 자료형))
results = re.finditer('love', str)
print(results)

# 순서가 있는 자료형을 프린트 할 때에는 for in문을 사용한다.
for result in results:
    print(result)

# 5) fullmatch : 패턴과 문자열이 완벽하게 일치하는지 검사
str2 = 'Hey Guys, read books'
result = re.fullmatch('.*', str2)
print(result)
```

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/usr/Documents/python_advanced/myvenv/Chapter06/01.정규표현식
1.py
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(5, 11), match='people'>
<callable_iterator object at 0x108ea7fa0>
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(24, 28), match='love'>
<re.Match object; span=(40, 44), match='love'>
<re.Match object; span=(0, 20), match='Hey Guys, read books'>
```

<br/>

## 3. search object의 메서드

- `.group()` 메서드를 사용해보자.

```bash
import re

# 1. re 모듈의 메서드
str = 'love people around you, love your work, love yourself'

# 1) match : 문자열의 처음부터 검색 (결과 : 1개의 match 객체)
result = re.match('love', str)
print(result)

# 2) search : 문자열의 전체를 검색 (결과 : 1개의 match 객체)
result = re.search('people', str)
print(result)

# 3) findall : 문자열의 전체를 검색 (결과 : 문자열 리스트)
results = re.findall('love', str)
print(results)

# 4) finditer : 문자열의 전체를 검색 (결과 : match 객체 이터레이터(순서가 있는 자료형))
results = re.finditer('love', str)
print(results)

# 순서가 있는 자료형을 프린트 할 때에는 for in문을 사용한다.
for result in results:
    print(result)

# 5) fullmatch : 패턴과 문자열이 완벽하게 일치하는지 검사
str2 = 'Hey Guys, read books'
result = re.fullmatch('.*', str2)
print(result)

# 2. match object 의 메서드
result = re.search('people', str)

# 1) group() : 매칭된 문자열 반환
print(result.group())
```

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/usr/Documents/python_advanced/myvenv/Chapter06/01.정규표현식
1.py
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(5, 11), match='people'>
['love', 'love', 'love']
<callable_iterator object at 0x10c233fa0>
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(24, 28), match='love'>
<re.Match object; span=(40, 44), match='love'>
<re.Match object; span=(0, 20), match='Hey Guys, read books'>
people
```

<br/>

- `.start()` 메서드도 사용해보자.

```bash
import re

# 1. re 모듈의 메서드
str = 'love people around you, love your work, love yourself'

# 1) match : 문자열의 처음부터 검색 (결과 : 1개의 match 객체)
result = re.match('love', str)
print(result)

# 2) search : 문자열의 전체를 검색 (결과 : 1개의 match 객체)
result = re.search('people', str)
print(result)

# 3) findall : 문자열의 전체를 검색 (결과 : 문자열 리스트)
results = re.findall('love', str)
print(results)

# 4) finditer : 문자열의 전체를 검색 (결과 : match 객체 이터레이터(순서가 있는 자료형))
results = re.finditer('love', str)
print(results)

# 순서가 있는 자료형을 프린트 할 때에는 for in문을 사용한다.
for result in results:
    print(result)

# 5) fullmatch : 패턴과 문자열이 완벽하게 일치하는지 검사
str2 = 'Hey Guys, read books'
result = re.fullmatch('.*', str2)
print(result)

# 2. match object 의 메서드
result = re.search('people', str)

# 1) group() : 매칭된 문자열 반환
print(result.group())

# 2) start() : 매칭된 문자열의 시작 위치 반환
print(result.start())
```

<br/>

- 실행 결과: 매칭된 문자열의 시작 위치(5)를 반환한다.

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/usr/Documents/python_advanced/myvenv/Chapter06/01.정규표현식
1.py
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(5, 11), match='people'>
['love', 'love', 'love']
<callable_iterator object at 0x10c233fa0>
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(24, 28), match='love'>
<re.Match object; span=(40, 44), match='love'>
<re.Match object; span=(0, 20), match='Hey Guys, read books'>
people
5
```

<br/>

- `.end()` 메서드를 사용해보자.

```bash
import re

# 1. re 모듈의 메서드
str = 'love people around you, love your work, love yourself'

# 1) match : 문자열의 처음부터 검색 (결과 : 1개의 match 객체)
result = re.match('love', str)
print(result)

# 2) search : 문자열의 전체를 검색 (결과 : 1개의 match 객체)
result = re.search('people', str)
print(result)

# 3) findall : 문자열의 전체를 검색 (결과 : 문자열 리스트)
results = re.findall('love', str)
print(results)

# 4) finditer : 문자열의 전체를 검색 (결과 : match 객체 이터레이터(순서가 있는 자료형))
results = re.finditer('love', str)
print(results)

# 순서가 있는 자료형을 프린트 할 때에는 for in문을 사용한다.
for result in results:
    print(result)

# 5) fullmatch : 패턴과 문자열이 완벽하게 일치하는지 검사
str2 = 'Hey Guys, read books'
result = re.fullmatch('.*', str2)
print(result)

# 2. match object 의 메서드
result = re.search('people', str)

# 1) group() : 매칭된 문자열 반환
print(result.group())

# 2) start() : 매칭된 문자열의 시작 위치 반환
print(result.start())

# 3) end() : 매칭된 문자열의 끝 위치 반환
print(result.end())
```

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/usr/Documents/python_advanced/myvenv/Chapter06/01.정규표현식
1.py
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(5, 11), match='people'>
['love', 'love', 'love']
<callable_iterator object at 0x10c233fa0>
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(24, 28), match='love'>
<re.Match object; span=(40, 44), match='love'>
<re.Match object; span=(0, 20), match='Hey Guys, read books'>
people
5
11
```

<br/>

- `.span()` 메서드를 사용해보자.

```bash
import re

# 1. re 모듈의 메서드
str = 'love people around you, love your work, love yourself'

# 1) match : 문자열의 처음부터 검색 (결과 : 1개의 match 객체)
result = re.match('love', str)
print(result)

# 2) search : 문자열의 전체를 검색 (결과 : 1개의 match 객체)
result = re.search('people', str)
print(result)

# 3) findall : 문자열의 전체를 검색 (결과 : 문자열 리스트)
results = re.findall('love', str)
print(results)

# 4) finditer : 문자열의 전체를 검색 (결과 : match 객체 이터레이터(순서가 있는 자료형))
results = re.finditer('love', str)
print(results)

# 순서가 있는 자료형을 프린트 할 때에는 for in문을 사용한다.
for result in results:
    print(result)

# 5) fullmatch : 패턴과 문자열이 완벽하게 일치하는지 검사
str2 = 'Hey Guys, read books'
result = re.fullmatch('.*', str2)
print(result)

# 2. match object 의 메서드
result = re.search('people', str)

# 1) group() : 매칭된 문자열 반환
print(result.group())

# 2) start() : 매칭된 문자열의 시작 위치 반환
print(result.start())

# 3) end() : 매칭된 문자열의 끝 위치 반환
print(result.end())

# 4) span() : 매칭된 문자열의 (시작, 끝)의 위치 튜플을 반환
print(result.span())
```

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/usr/Documents/python_advanced/myvenv/Chapter06/01.정규표현식
1.py
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(5, 11), match='people'>
['love', 'love', 'love']
<callable_iterator object at 0x10c233fa0>
<re.Match object; span=(0, 4), match='love'>
<re.Match object; span=(24, 28), match='love'>
<re.Match object; span=(40, 44), match='love'>
<re.Match object; span=(0, 20), match='Hey Guys, read books'>
people
5
11
(5, 11)
```

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 re모듈 사용방법(1))을 알아보았다. 다음 포스팅에서는 파이썬 re모듈 사용방법(2)에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**