---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 13일차'
date: '2022-04-30 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 5-6. 반복문 개념(2)를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-04-30-Python-Photo1](/assets/images/2022-04-30-Python-Photo/2022-04-30-Python-Photo1.jpg)

![2022-04-30-Python-Photo2](/assets/images/2022-04-30-Python-Photo/2022-04-30-Python-Photo2.jpg)

<br/><br/>


# 7. 반복문 개념(2)

## 1. while 사용법

- for와의 차이점은?
    - for문 : 반복할 횟수가 정해져 있을 때
    - while문: 반복할 횟수가 정해져있지 않을 때

<br/>

- while 사용법

```python
# 초기식
# while 조건식:
#     반복할 명령
#     증감식

i = 0
while i <10:
    print(i, "번째 다짐, 나는 할 수 있다!")
    i += 1 # 복합할당연산자 i + 1 = i
```

- `i = 0` : 반복문에 사용되는 변수의 값을 지정
- `while i < 10:` : 반복에 대한 조건 체크. 이 식이 false가 될 때까지 반복.
- `증감식` : 반복하는 작업을 위해 변수값 증가.

<br/><br/>

## 2. 무한루프와 break

```python
# while True:
#    반복할 명령
#    if 조건식:
#        break

while True:
    x = input("종료하려면 exit을 입력하세요 >>>")
    if x == "exit":
        break

```

- 조건식 대신 불리언(Boolean) 값을 불러온다.
- 참일 경우 break를 만나기 전까지 명령을 계속 반복한다. (가장 가까운 반복문만 빠져나오게 됨)

<br/><br/>

## 3. 실습

```python
# while
# : 보통 반복횟수가 정해지지 않았을 때 사용한다.

i = 5 # 초기식
while i < 9: # 조건식
    print(i, "번째 다짐, 나는 할 수 있다!")
    i += 1 # 증감식
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/10.반복문개념_while.py
5 번째 다짐, 나는 할 수 있다!
6 번째 다짐, 나는 할 수 있다!
7 번째 다짐, 나는 할 수 있다!
8 번째 다짐, 나는 할 수 있다!
```
<br/>

```python
# while
# : 보통 반복횟수가 정해지지 않았을 때 사용한다.

i = 0 # 초기식
while i < 10: # 조건식
    print(i, "번째 다짐, 나는 할 수 있다!")
    i += 2 # 증감식
```

<br/>

- 결과 출력

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/10.반복문개념_while.py
0 번째 다짐, 나는 할 수 있다!
2 번째 다짐, 나는 할 수 있다!
4 번째 다짐, 나는 할 수 있다!
6 번째 다짐, 나는 할 수 있다!
8 번째 다짐, 나는 할 수 있다!
```

<br/>

```python
# 무한루프
# : 조건식에 True를 넣어서 항상 반복되게 만든 것.

while True:
    x = input("종료하려면 exit을 입력하세요 >>>")
    if x == "exit":
        break
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/10.반복문개념_while.py
종료하려면 exit을 입력하세요 >>>exid
종료하려면 exit을 입력하세요 >>>a
종료하려면 exit을 입력하세요 >>>b
종료하려면 exit을 입력하세요 >>>c
종료하려면 exit을 입력하세요 >>>d
종료하려면 exit을 입력하세요 >>>e
종료하려면 exit을 입력하세요 >>>f
종료하려면 exit을 입력하세요 >>>exit
```

<br/>

이번 포스팅에서는 반복문 개념에 대해서 알아보았다. 다음 포스팅에서는 반복문 실습문제를 풀어보도록 하자.

<br/><br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**