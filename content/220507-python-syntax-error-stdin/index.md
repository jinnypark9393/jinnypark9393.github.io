---
emoji: 🐍
title:  'Python - Syntax Error stdin 에러 해결'
date: '2022-05-07 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

**💡 파이썬에서 Syntax Error : stdin 에러가 났을 경우, exit() 혹은 Ctrl + Z을 입력하여 해결할 수 있다.**

<br/>

# 1. 에러 상황

<br/>

패스트캠퍼스 챌린지 강의 실습 중, 파이썬 코드를 실행하니 아래와 같은 Syntax 에러가 발생했다.

<br/>

```python
/Users/usr/Documents/python_basic/myvenv/bin/python /Users/usr/Documents/python_basic/myvenv/Chapter8/04.상속.py
    ^
SyntaxError: invalid syntax
>>>
```

<br/><br/>

# 2. 해결 방법

<br/>

찾아보니 vscode를 껐다가 다시 켜면 해결된다는 얘기도 있는데, 구글링을 조금 더 해보니 해당 에러는 파이썬 코드를 파이썬 인터프리터 내에서 실행하고자 할 때 발생하는 에러였다.

<br/>

따라서 파이썬 인터프리터 밖에서 코드를 실행할 수 있도록 에러 마지막 부분의 `>>>` 다음 부분에

<br/>

- `exit()` 를 입력하고 엔터
- `ctrl + Z` 를 누른 뒤 엔터

<br/>

둘 중 하나를 해주면 파이썬 코드가 정상적으로 실행된다고 한다.

<br/>

이 안내를 따라서 exit()을 입력하고 엔터를 누른 뒤, 파이썬 코드를 다시 실행해주니 아래와 같이 파이썬 코드가 정상적으로 실행되었다.

<br/>

```python
/Users/usr/Documents/python_basic/myvenv/bin/python /Users/usr/Documents/python_basic/myvenv/Chapter8/04.상속.py
    ^
SyntaxError: invalid syntax
>>> exit()

(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter8/04.상속.py
[울프] 지상에서 이동하기
[샤크] 헤엄치기
[드래곤] 날기
```

<br/>