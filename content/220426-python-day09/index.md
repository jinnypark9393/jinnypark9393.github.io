---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 9일차'
date: '2022-04-26 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 5-3. 조건문 실습문제(2)을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-04-26-Python-Photo1](/assets/images/2022-04-26-Python-Photo/2022-04-26-Python-Photo1.jpg)

![2022-04-27-Python-Photo2](/assets/images/2022-04-26-Python-Photo/2022-04-26-Python-Photo2.jpg)

<br/><br/>

# 3. 조건문 실습문제(2)

## 1. 실습문제 5.1.3

- 현동이는 강의를 8시간 동안 들으니, 배가 너무 고파 저녁을 먹기로 하였다. 현동이가 현재 가진 금액을 통해 최대로 먹을 수 있는 음식을 출력해 주는 프로그램을 작성해 보자.

<br/>

- [조건] 20000원 이상 = 치킨, 10000원 이상 = 떡볶이, 2000원 이상: 편의점 김밥
- 표준 입력 1: `현재 가진 금액을 입력 >>>`
- 표준 출력 1: `오늘 저녁은... 치킨!`
- 표준 입력 2: `현재 가진 금액을 입력 >>>`
- 표준 출력 2: `오늘 저녁은... 떡볶이!`
- 표준 입력 3: `현재 가진 금액을 입력 >>>`
- 표준 출력 3: `오늘 저녁은... 편의점 김밥!`

<br/><br/>

### [내 풀이]

```python
cash = int(input("현재 가진 금액을 입력 >>>"))

if cash >= 20000:
    print("오늘 저녁은... 치킨!")
elif cash >= 10000:
    print("오늘 저녁은... 떡볶이!")
elif cash >= 2000:
    print("오늘 저녁은... 편의점 김밥!")
```

<br/>

- 결과 출력

```python
# 현재 금액 = 20000
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/04-1.실습문제5.1.3.py
현재 가진 금액을 입력 >>>20000
오늘 저녁은... 치킨!

# 현재 금액 = 12000
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/04-1.실습문제5.1.3.py
현재 가진 금액을 입력 >>>12000
오늘 저녁은... 떡볶이!

# 현재 금액 = 2000
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr /Documents/
python_basic/myvenv/Chapter5/04-1.실습문제5.1.3.py
현재 가진 금액을 입력 >>>2000
오늘 저녁은... 편의점 김밥!
```
<br/><br/>

### [강의 해설]

```python
# 실습문제 5.1.3

money = int(input("현재 가진 금액을 입력 >>>"))

if money >= 20000:
    print("오늘 저녁은... 치킨!")
elif money >= 12000:
    print("오늘 저녁은... 떡볶이!")
elif money >= 2000:
    print("오늘 저녁은... 편의점 김밥!")
```

- if 문 사용예
    - if
    - if - else
    - if - elif (else로 끝내지 않아도 됨)
    - if - elif - else

<br/><br/>

## 2. 실습문제 5.1.4

- 프로그램 사용자로부터 국어, 수학, 영어 성적이 입력된다. 세 과목의 평균 점수가 80점 이상이면 합격이다. 그런데 점수에 따라 함격 또는 불합격이 정해지는 프로그램에 오류가 발생했다. 80점 이상일 경우 불합격이 표시되도록 프로그램을 작성해보자 (**단, 0점에서 100점 사이의 숫자를 입력하지 않으면 “잘못 입력하였습니다.”를 출력**하자)

<br/>

- 표준 입력 1: `국어 >>> 95` , `수학 >>> 75` , `영어 >>> 100`
- 표준 출력 1: 불합격
- 표준 입력 2: `국어 >>> 55` , `수학 >>> 40` , `영어 >>> 70`
- 표준 출력 2: 불합격
- 표준 입력 3: `국어 >>> 1` , `수학 >>> 120` , `영어 >>> 85`
- 표준 출력 3: 잘못 입력하였습니다.

<br/><br/>

### [내 풀이]

```python
korean = int(input("국어 >>>"))
math = int(input("수학 >>>"))
english = int(input("영어 >>>"))

average = (korean + math + english)/3

if not (0 < korean <= 100 and 0 < math <= 100 and 0 < english <= 100):
    print("잘못 입력하였습니다.")
elif average >= 80:
    print("불합격")
elif average < 80:
    print("합격")
```
<br/>

- 결과 출력

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/05-1.실습문제5.1.4.py
국어 >>>95
수학 >>>75
영어 >>>100
불합격

(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/05-1.실습문제5.1.4.py
국어 >>>55
수학 >>>40
영어 >>>70
합격

(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/05-1.실습문제5.1.4.py
국어 >>>1
수학 >>>120
영어 >>>85
잘못 입력하였습니다.
```

<br/><br/>

### [강의 해설]

- 두 가지 방법 중 첫번째 방법을 살펴보자.

```python
korean = int(input("국어 >>>"))
math = int(input("수학 >>>"))
english = int(input("영어 >>>"))

total = korean + match + english
avg = total / 3

# 방법 1
if 0 <= korean <= 100 and 0 <= math <= 100 and 0 <= english <= 100:
    print("입력이 정확함")
else:
    print("잘못 입력하였습니다.")
```
<br/>

- 위 함수가 잘 작동하는지 테스트 해보자.

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/05-2.실습문제5.1.4-해설.p
y
국어 >>>-1
수학 >>>100
영어 >>>100
잘못 입력하였습니다.

(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/05-2.실습문제5.1.4-해설.p
y
국어 >>>120
수학 >>>100
영어 >>>100
잘못 입력하였습니다.

(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/05-2.실습문제5.1.4-해설.p
y
국어 >>>50
수학 >>>60
영어 >>>70
입력이 정확함
```

<br/>

- if 문 안에 조건문을 넣어(중첩) 80점 이상/미만일 경우 불합격/합격을 출력하자.

```python
korean = int(input("국어 >>>"))
math = int(input("수학 >>>"))
english = int(input("영어 >>>"))

total = korean + math + english
avg = total / 3

# 방법 1
if 0 <= korean <= 100 and 0 <= math <= 100 and 0 <= english <= 100:
    if avg >= 80:
        print("불합격")
    else:
        print("합격")
else:
    print("잘못 입력하였습니다.")
```

<br/><br/>

- 이번에는 중첩문 없이 문제를 풀어보도록 하자.

```python
# 방법 2
if korean <0 or korean > 100 or math <0 or math > 100 or english <0 or english 100:
    print("잘못 입력하였습니다.")
elif avg >= 80:
    print("불합격")
else:
    print("합격")
```
<br/><br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**