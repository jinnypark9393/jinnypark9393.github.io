---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 18일차'
date: '2022-05-05 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 6-2. 함수 실습문제(2)를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-05-Python-Photo1](/assets/images/2022-05-05-Python-Photo/2022-05-05-Python-Photo1.jpg)

![2022-05-05-Python-Photo2](/assets/images/2022-05-05-Python-Photo/2022-05-05-Python-Photo2.jpg)

<br/><br/>

# 03. 함수실습문제(2)

## 1. 실습문제 6.1.3

- 로또에 당첨 되어 퇴사를 하고 싶었던 김로또는 로또 예상번호 추출 프로그램을 파이썬으로 작성하려고 한다. 다음 조건에 따라 김로또의 프로그램을 완성해보자.
    1. 로또 번호 6개를 생성한다.
    2. 로또 번호는 1 ~ 45까지의 랜덤한 번호다.
    3. 6개의 숫자 모두 달라야 한다.
    4. getRandomNumber() 함수를 사용해서 구현한다. (random 모듈의 sample함수는 사용하지 않는다)
    
    ```python
    def getRandomNumber():
        number = random.randint(1, 45)
        return number
    
    # 표준 출력
    1 8 11 13 26 42
    ```
    
- Hint: 반복문, 조건문, 리스트, 함수(getRandomNumber)를 이용

<br/><br/>

### [내 풀이]

```python
import random

def getRandomNumber():
    number = random.randint(1, 45)
    return number

result = []
for getNumber in range(6):
    getNumber = getRandomNumber()
    if getNumber not in result:
        result.append(getNumber)

print(result)
```

- 로또 결과값을 담을 result 리스트 생성
- getNumber 라는 변수로 getRandomNumber 함수를 호출해 랜덤한 숫자값을 담다.
- 중복값 제거: 받아온 getNumber 값이 결과값인 result 리스트에 들어있지 않은 경우에만 리스트에 값을 넣는다.
- for in 문으로 위의 함수를 6번 실행해 리스트에 값을 총 6개 담는다.

<br/><br/>

### [강의 해설]

```python
# 실습문제 6.1.3
# 로또 번호 추출기
import random

def get_random_number():
    number = random.randint(1, 45)
    return number

lotto_num = [] # 로또 번호를 저장할 리스트

for i in range(6):
    random_number = get_random_number()
    lotto_num.append(random_number)

lotto_num.sort()
```

- 함수명을 정의할 때 보통 언더바로 단어를 나눔
- 중복을 허용하는 번호 추출 함수를 먼저 생성
- sort 함수를 이용해 오름차 순으로 정렬

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter6/05-2.실습문제6.1.3-해설.p
y
[2, 4, 5, 16, 20, 24]
```

<br/>

- 문제의 표준출력과 맞게 줄바꿈 문자를 빼준다.

```python
# 실습문제 6.1.3
# 로또 번호 추출기
import random

def get_random_number():
    number = random.randint(1, 45)
    return number

lotto_num = [] # 로또 번호를 저장할 리스트

for i in range(6):
    random_number = get_random_number()
    lotto_num.append(random_number)

lotto_num.sort()

# 줄바꿈 문자 빼기
for num in lotto_num:
    print(num, end=" ")
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/jinipark/Documents/pyt
hon_basic/myvenv/bin/python /Users/jinipark/Documents/
python_basic/myvenv/Chapter6/05-2.실습문제6.1.3-해설.p
y
26 27 30 31 39 40
```

<br/>

- 중복을 허용하지 않는 조건문 생성하기

```python
# 실습문제 6.1.3
# 로또 번호 추출기
import random

def get_random_number():
    number = random.randint(1, 45)
    return number

lotto_num = [] # 로또 번호를 저장할 리스트

for i in range(6):
    random_number = get_random_number()
    if random_number not in lotto_num:
        lotto_num.append(random_number)

lotto_num.sort()

<br/>

# 줄바꿈 문자 빼기
for num in lotto_num:
    print(num, end=" ")
```

- 조건문을 몇 번 실행하게 될 지 알 수 없음 ⇒ 무한반복문(while True)으로 변경

<br/>

- while True 문으로 변경 리스트에 문자가 몇 번 들어갈 지 알 수 있는 count 변수 생성

```python
# 실습문제 6.1.3
# 로또 번호 추출기
import random

def get_random_number():
    number = random.randint(1, 45)
    return number

lotto_num = [] # 로또 번호를 저장할 리스트

count = 0 # 현재 뽑은 숫자 개수

while True:
    random_number = get_random_number()
    if random_number not in lotto_num:
        lotto_num.append(random_number)
        count += 1

lotto_num.sort()

# 줄바꿈 문자 빼기
for num in lotto_num:
    print(num, end=" ")
```

- 숫자가 리스트에 추가될 때에만 count 숫자 1씩 증가

- count 값이 6이 될 때(리스트에 들어간 값이 6개일 때) 프로그램이 종료하도록 break 문 정의

<br/>

```python
# 실습문제 6.1.3
# 로또 번호 추출기
import random

def get_random_number():
    number = random.randint(1, 45)
    return number

lotto_num = [] # 로또 번호를 저장할 리스트

count = 0 # 현재 뽑은 숫자 개수

while True:
    if count > 5:
        break
    random_number = get_random_number()
    if random_number not in lotto_num:
        lotto_num.append(random_number)
        count += 1

lotto_num.sort()

# 줄바꿈 문자 빼기
for num in lotto_num:
    print(num, end=" ")
```

- break문은 가장 가까운 반복문을 탈출하게 되니 while 문 밑에 위치시킬 것
- break하는 조건은 `count > 5` 이외에 `count == 6` 도 가능

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/jinipark/Documents/pyt
hon_basic/myvenv/bin/python /Users/jinipark/Documents/
python_basic/myvenv/Chapter6/05-2.실습문제6.1.3-해설.p
y
26 27 30 31 39 40
```

<br/>

- Tip: 전체 풀이 지우고 다시 한 번 풀어볼 것!

<br/><br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**