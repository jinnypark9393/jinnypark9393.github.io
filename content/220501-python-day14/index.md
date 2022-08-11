---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 14일차'
date: '2022-05-01 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 5-6. 반복문 실습문제(1)을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-01-Python-Photo1](/assets/images/2022-05-01-Python-Photo/2022-05-01-Python-Photo1.jpg)

![2022-05-01-Python-Photo2](/assets/images/2022-05-01-Python-Photo/2022-05-01-Python-Photo2.jpg)

<br/><br/>

# 8. 반복문 실습문제(1)

## 1. 실습문제 5.3.1

- 구구단 출력 프로그램을 만들어보자. 프로그램 사용자로부터 출력할 단을 입력 받고, 해당 구구단을 출력하는 프로그램이다.
- 표준입력: `몇 단을 출력할까요? >>> 5`
- 표준출력
    - 5 * 1 = 5
    - 5 * 2 = 10
    - ...
    - 5 * 9 =45

<br/>

### [내 풀이]

```python
# 단 입력 받기
# 입력값 * 1 ~ 9 까지 반복 곱셈

multiple = int(input("몇 단을 출력할까요? >>> "))

i = 1
while i < 10:
    print(multiple, "*", i, "=", multiple * i)
    i += 1
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/11.실습문제5.3.1.py
몇 단을 출력할까요? >>> 5
5 * 1 = 5
5 * 2 = 10
5 * 3 = 15
5 * 4 = 20
5 * 5 = 25
5 * 6 = 30
5 * 7 = 35
5 * 8 = 40
5 * 9 = 45
```

<br/>

### [강의 해설]

- for ~ in 구문과 range를 이용해 함수를 작성해보자.

```python
# 바뀌는 부분을 잘 살펴보자.
# 실습문제 5.3.1
# 구구단 출력하기

x = int(input("몇 단을 출력할까요? >>>"))

for i in range(10):
    print(i)
```

<br/>

- 출력 확인

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/11.실습문제5.3.1-해설.py
몇 단을 출력할까요? >>>1
0
1
2
3
4
5
6
7
8
9
```

- 0 ~ 9 까지가 출력된다.

<br/>

- Range의 시작값(=1) 을 넣어준다.

```python
# 실습문제 5.3.1
# 구구단 출력하기

x = int(input("몇 단을 출력할까요? >>>"))

for i in range(1, 10):
    print(i)
```

<br/>

- 출력 확인

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/11.실습문제5.3.1-해설.py
몇 단을 출력할까요? >>>1
1
2
3
4
5
6
7
8
9
```

- 1 ~ 9 까지가 출력된다.

<br/>

- 구구단 모양으로 출력해주자.

```python
# 실습문제 5.3.1
# 구구단 출력하기

x = int(input("몇 단을 출력할까요? >>>"))

for i in range(1, 10):
    print(x, "*", i, "=", x*i)
```

<br/>

- 출력 확인

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/11.실습문제5.3.1-해설.py
몇 단을 출력할까요? >>>5
5 * 1 = 5
5 * 2 = 10
5 * 3 = 15
5 * 4 = 20
5 * 5 = 25
5 * 6 = 30
5 * 7 = 35
5 * 8 = 40
5 * 9 = 45
```

<br/><br/>

## 2. 실습문제 5.3.2

- 패스트게임즈에 인턴으로 근무하게 된 종현. 사수에게 과제로 게임 메뉴 만들기를 받았다. 과제 내용은 다음과 같았다.
- 과제
    - 숫자 1 입력: “게임을 시작합니다" 출력
    - 숫자 2 입력: “실시간 랭킹” 출력
    - 숫자 3 입력: “게임을 종료합니다" 출력 후 프로그램 종료
    - 단, 3을 입력할때까지 프로그램은 계속 실행된다. 1 ~ 3 외 다른 숫자를 입력한 경우 “다시 입력해주세요"를 출력

<br/>

### [내  풀이]

```python
# while True 사용
# if elif else 사용

while True:
    x = int(input("[메뉴를 입력하세요]\n 1. 게임시작 2. 랭킹보기 3. 게임종료 >>>"))
    if x == 1:
        print("->게임을 시작합니다")
    elif x == 2:
        print("->실시간 랭킹")
    elif x == 3:
        print("->게임을 종료합니다")
        break
    else:
        print("->다시 입력해 주세요")
```

- 파이썬 문자열 줄바꿈 ⇒ `\n` 문자 삽입

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/12-1.실습문제5.3.2.py
[메뉴를 입력하세요]
 1. 게임시작 2. 랭킹보기 3. 게임종료 >>>1
->게임을 시작합니다
[메뉴를 입력하세요]
 1. 게임시작 2. 랭킹보기 3. 게임종료 >>>2
->실시간 랭킹
[메뉴를 입력하세요]
 1. 게임시작 2. 랭킹보기 3. 게임종료 >>>4
->다시 입력해 주세요
[메뉴를 입력하세요]
 1. 게임시작 2. 랭킹보기 3. 게임종료 >>>5
->다시 입력해 주세요
[메뉴를 입력하세요]
 1. 게임시작 2. 랭킹보기 3. 게임종료 >>>3
->게임을 종료합니다
```

<br/>

### [강의 해설]

```python
# 몇 번 반복 될 지 모를 때 = while
# 무한 반복 => while True:
# 반복문 탈출 => break
# 조건문 => while 문 안에 작성

# 실습문제 5.3.2
# 게임 메뉴 개발하기

while True:
    print("[메뉴를 입력하세요]")
    select = int(input("1. 게임시작 2. 랭킹보기 3. 게임종료 >>>"))

    if select == 1:
        print("-> 게임을 시작합니다")
    elif select == 2:
        print("-> 실시간 랭킹")
    elif select == 3:
        print("-> 게임을 종료합니다")
        break
    else:
        print("-> 다시 입력해 주세요")
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/12-2.실습문제5.3.2-해설.p
y
[메뉴를 입력하세요]
1. 게임시작 2. 랭킹보기 3. 게임종료 >>>1
-> 게임을 시작합니다
[메뉴를 입력하세요]
1. 게임시작 2. 랭킹보기 3. 게임종료 >>>2
-> 실시간 랭킹
[메뉴를 입력하세요]
1. 게임시작 2. 랭킹보기 3. 게임종료 >>>4
-> 다시 입력해 주세요
[메뉴를 입력하세요]
1. 게임시작 2. 랭킹보기 3. 게임종료 >>>5
-> 다시 입력해 주세요
[메뉴를 입력하세요]
1. 게임시작 2. 랭킹보기 3. 게임종료 >>>3
-> 게임을 종료합니다
```

<br/>

이번 포스팅에서는 반복문 실습문제를 풀어보았다. 다음 포스팅에서는 반복문 실습문제(2)를 풀어보도록 하자.

<br/><br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**