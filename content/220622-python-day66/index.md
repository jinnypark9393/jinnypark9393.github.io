---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 66일차'
date: '2022-06-22 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 파이썬 re 모듈 사용 방법(2)를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-22-Python-Photo1](/assets/images/2022-06-22-Python-Photo/2022-06-22-Python-Photo1.jpg)

![2022-06-22-Python-Photo2](/assets/images/2022-06-22-Python-Photo/2022-06-22-Python-Photo2.jpg)

<br/><br/>

# 05. 파이썬 re 모듈 사용 방법(2)

- 실습: 전화번호 형식을 검사하는 정규표현식

```bash
02-512-3232
010-2343-3333
1-32-321
aaa-bbb-cccc
010-23435-5555
010-2343-55555
```

<br/><br/>

## 1. group(index)

- `\d{2,3}-\d{3,4}-\d{4}` 로 전화번호 형식을 표현할 수 있다.
- 하지만 마지막 행의 경우 마지막 번호가 다섯자리(전화번호가 아님)임에도 불구하고 매칭이되었다.
    - `\d{2,3}-\d{3,4}-\d{4}$` 로 걸러낼 수 있다.
    
<br/>

- 파이썬에 적용하면 아래와 같다.

```bash
import re

# 전화번호 정규표현식 연습
# https://regexr.com/63bls

# 1. Group 그룹

str1 = '010-2343-3333'
result = re.match('\d{2,3}-\d{3,4}-\d{4}$', str1)
print(result)
```

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/use/Documents/python_advanced/myvenv/Chapter06/02.정규표현식
2.py
<re.Match object; span=(0, 13), match='010-2343-3333'>
```

<br/>

- 마지막 번호를 그룹으로 묶어준다.

```bash
import re

# 전화번호 정규표현식 연습
# https://regexr.com/63bls

# 1. Group 그룹

str1 = '010-2343-3333'
result = re.match('\d{2,3}-\d{3,4}-(\d{4})$', str1)
print(result.group(1))
```

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/use/Documents/python_advanced/myvenv/Chapter06/02.정규표현식
2.py
3333
```

- group으로 묶지 않거나 group(0)으로 지정한 경우 전체 매칭 값이 나온다.

<br/><br/>

## 2. 그룹으로 만든 매칭 결과 가져오기

```bash
010-2343-7888,010-2343-1234,010-2343-5678,010-2343-9999,010-2343-2222
```

- `\d{2,3}-\d{3,4}-\d{4}(?=,|$)` ⇒ ,를 제외한 번호값들 가져오는 정규표현식
    - `?=` 를 통해 콤마(,)를 조건에는 표현하나 결과에는 가져오지 않도록 한다.

<br/>

- 파이썬에 적용해보자.

```bash
import re

# 전화번호 정규표현식 연습
# https://regexr.com/63bls

# 1. Group 그룹

# 1) 매칭되는 문자열이 한 개
str1 = '010-2343-3333'
result = re.match('\d{2,3}-\d{3,4}-(\d{4})$', str1)
print(result.group(1))

# 2) 매칭되는 문자열 여러개
str2 = '010-2343-7888,010-2343-1234,010-2343-5678,010-2343-9999,010-2343-2222'
results = re.finditer('\d{2,3}-\d{3,4}-(\d{4})(?=,|$)', str2)

for result in results:
    print(result.group(1))
```

- 마지막 4자리를 그룹으로 감싸주어야 출력이 된다.

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/use/Documents/python_advanced/myvenv/Chapter06/02.정규표현식
2.py
3333
7888
1234
5678
9999
2222
```

<br/>

- 출력형식을 변경해주려면 enumerate를 추가한다.

```bash
import re

# 전화번호 정규표현식 연습
# https://regexr.com/63bls

# 1. Group 그룹

# 1) 매칭되는 문자열이 한 개
str1 = '010-2343-3333'
result = re.match('\d{2,3}-\d{3,4}-(\d{4})$', str1)
print(result.group(1))

# 2) 매칭되는 문자열 여러개
str2 = '010-2343-7888,010-2343-1234,010-2343-5678,010-2343-9999,010-2343-2222'
results = re.finditer('\d{2,3}-\d{3,4}-(\d{4})(?=,|$)', str2)

for idx, result in enumerate(results, 1):
    print(f'{idx}. {result.group(1)}')
```

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/use/Documents/python_advanced/myvenv/Chapter06/02.정규표현식
2.py
3333
1. 7888
2. 1234
3. 5678
4. 9999
5. 2222
```

## 3. sub(문자열 교체) & 후방 탐색

- 전방탐색의 경우, (매칭O)-(매칭X) 순서일 때만 적용 가능(뒤의 내용을 없애고 싶은 경우)
- `(?<=\d{2,3}-\d{3,4}-)\d{4}` 일 경우 뒤의 네 자리만 가져올 수 있음.

```bash
import re

# 전화번호 정규표현식 연습
# https://regexr.com/63bls

# 1. Group 그룹

# 1) 매칭되는 문자열이 한 개
str1 = '010-2343-3333'
result = re.match('\d{2,3}-\d{3,4}-(\d{4})$', str1)
print(result.group(1))

# 2) 매칭되는 문자열 여러개
str2 = '010-2343-7888,010-2343-1234,010-2343-5678,010-2343-9999,010-2343-2222'
results = re.finditer('\d{2,3}-\d{3,4}-(\d{4})(?=,|$)', str2)

for idx, result in enumerate(results, 1):
    print(f'{idx}. {result.group(1)}')

# 2. Subsitution (교체)
str3 = '010-2343-3333'
result = re.sub('(?<=\d{2,3}-\d{3,4}-)\d{4}', '****', str3)
print(result)
```

- 실행 결과

```bash
Traceback (most recent call last):
  File "/Users/jinipark/Documents/python_advanced/myvenv/Chapter06/02.정규표현식2.py", line 22, in <module>
    result = re.sub('(?<=\d{2,3}-\d{3,4}-)\d{4}', '****', str3)
  File "/Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/re.py", line 209, in sub
    return _compile(pattern, flags).sub(repl, string, count)
  File "/Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/re.py", line 303, in _compile
    p = sre_compile.compile(pattern, flags)
  File "/Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/sre_compile.py", line 768, in compile
    code = _code(p, flags)
  File "/Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/sre_compile.py", line 607, in _code
    _compile(code, p.data, flags)
  File "/Library/Frameworks/Python.framework/Versions/3.10/lib/python3.10/sre_compile.py", line 182, in _compile
    raise error("look-behind requires fixed-width pattern")
re.error: look-behind requires fixed-width pattern
```

- 에러메시지가 발생한다.
    - 후방 탐색 ⇒ 범위가 고정되어야 함
    - 전방 탐색 ⇒ 범위가 유동적임

- 각 범위를 3,4,4로 고정해준다.

```bash
import re

# 전화번호 정규표현식 연습
# https://regexr.com/63bls

# 1. Group 그룹

# 1) 매칭되는 문자열이 한 개
str1 = '010-2343-3333'
result = re.match('\d{2,3}-\d{3,4}-(\d{4})$', str1)
print(result.group(1))

# 2) 매칭되는 문자열 여러개
str2 = '010-2343-7888,010-2343-1234,010-2343-5678,010-2343-9999,010-2343-2222'
results = re.finditer('\d{2,3}-\d{3,4}-(\d{4})(?=,|$)', str2)

for idx, result in enumerate(results, 1):
    print(f'{idx}. {result.group(1)}')

# 2. Subsitution (교체)
str3 = '010-2343-3333'
result = re.sub('(?<=\d{3}-\d{4}-)\d{4}', '****', str3)
print(result)
```

<br/>

- 실행 결과

```bash
➜  myvenv git:(master) ✗ /usr/local/bin/python3 /Users/usr/Documents/python_advanced/myvenv/Chapter06/02.정규표현식
2.py
3333
1. 7888
2. 1234
3. 5678
4. 9999
5. 2222
010-2343-****
```

- 맨 마지막 4글자가 교체되었다.

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 re모듈의 사용방법(2)을 알아보았다. 다음 포스팅에서는 정규표현식 실습문제를 풀어보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**