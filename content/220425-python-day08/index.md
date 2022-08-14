---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 8일차'
date: '2022-04-25 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 5-2. 조건문 실습문제(1)을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-04-25-Python-Photo1](/assets/images/2022-04-25-Python-Photo/2022-04-25-Python-Photo1.jpg)

![2022-04-25-Python-Photo2](/assets/images/2022-04-25-Python-Photo/2022-04-25-Python-Photo2.jpg)


<br/><br/>


# 2. 조건문 실습문제(1)

## 1. 실습문제 5.1.1

- 회사를 그만두게 된 유진이는 유투브를 시작하게 되었다. 그리고 유투브를 통해 수익창출을 하려고 한다. 프로그램 사용자로부터 현재 구독자 수를 입력 받으면, 수익 창출이 가능한지 불가능한지 알려주는 프로그램을 작성해보자. (단, 수익창출은 구독자가 1000명 이상일 경우 가능하다)
    - 표준 입력: `현재 구독자 수를 입력하세요 >>> 1200`
    - 표준 출력: `수익 창출이 가능합니다!`
    - 표준 입력: `현재 구독자 수를 입력하세요 >>> 800`
    - 표준 출력: `수익 창출이 불가능합니다!`

### [내 풀이]

```python
subscriber = input("현재 구독자 수를 입력하세요 >>>")

if int(subscriber) >= 1000:
    print("수익 창출이 가능합니다!")
else:
    print("수익 창출이 불가능합니다!")
```

### [강의 해설]

- 구독자 수 입력값을 받는 함수를 작성한다.
- 작성한 뒤 print 함수로 제대로 출력 되는지 확인한다.
- Tip: 코드를 작성 시에는 단계적으로 동작 테스트를 하면서 작성하는 것이 좋다.

```python
sub_count = input("현재 구독자 수를 입력하세요 >>>")
print(sub_count)
```

- input 값에 숫자를 넣으면 잘 출력되는 것을 확인할 수 있다.

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/02-2.실습문제5.1.1-해설.p
y
현재 구독자 수를 입력하세요 >>>22
22
```

- 1000명 이상일 때 “수익창출이 가능합니다!”라는 문구가 출력되는 if문을 작성해보자.

```python
sub_count = input("현재 구독자 수를 입력하세요 >>>")

if sub_count >= 1000:
    print("수익 창출이 가능합니다!")
```

- 출력 결과: `sub_count` 가 string(str) 형식이기 때문에 다음과 같은 타입 에러가 발생한다.

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/02-2.실습문제5.1.1-해설.p
y
현재 구독자 수를 입력하세요 >>>1200
Traceback (most recent call last):
  File "/Users/usr/Documents/python_basic/myvenv/Chapter5/02-2.실습문제5.1.1-해설.py", line 5, in <module>
    if sub_count >= 1000:
TypeError: '>=' not supported between instances of 'str' and 'int'
```

- `sub_count` 의 자료형을 int 형태로 바꿔준다.

```python
sub_count = int(input("현재 구독자 수를 입력하세요 >>>"))

if sub_count >= 1000:
    print("수익 창출이 가능합니다!")
```

- 1000명 이상이 아닐 경우 `수익 창출이 불가능합니다!` 라는 문장을 출력하는 else문 작성

```python
sub_count = int(input("현재 구독자 수를 입력하세요 >>>"))

if sub_count >= 1000:
    print("수익 창출이 가능합니다!")
else:
    print("수익 창출이 불가능합니다!")
```

## 2. 실습문제5.1.2

- 윤행이는 평소 휴대폰을 너무 많이 사용해 공부시간을 다 빼앗기고 있었다. 이렇게 가면 얼마 남지 않는 기말고사를 망칠 게 뻔했다. 윤행이가 공부 시간을 다 채울 경우에만 휴대폰을 사용할 수 있도록 프로그램을 만들어주자.
- 조건
    - 10시간 이상: 휴대폰 잠금 해제
    - 5시간 이상: 휴대폰 30분 사용가능
    - 나머지: 사용 불가능
- 표준입력 1: `공부시간을 입력하세요(시간) >>> 10`
- 표준출력 1: 휴대폰 잠금이 해제됩니다.
- 표준입력 2: `공부시간을 입력하세요(시간) >>>` 5
- 표준출력 2: 휴대폰을 30분간 사용 가능합니다.
- 표준입력 3: `공부시간을 입력하세요(시간) >>>` 2
- 표준출력 3: 휴대폰 사용이 불가능합니다.

### [내 풀이]

```python
study_hour = int(input("공부시간을 입력하세요(시간) >>>"))

if study_hour >= 10:
    print("휴대폰 잠금이 해제됩니다.")
elif study_hour >= 5:
    print("휴대폰을 30분간 사용 가능합니다.")
else:
    print("휴대폰 사용이 불가능합니다.")
```

- 결과 확인

```python
(myvenv) ➜  python_basic /Users/jinipark/Documents/pyt
hon_basic/myvenv/bin/python /Users/jinipark/Documents/
python_basic/myvenv/Chapter5/03-1.실습문제5.1.2.py
공부시간을 입력하세요(시간) >>>10
휴대폰 잠금이 해제됩니다

(myvenv) ➜  python_basic /Users/jinipark/Documents/pyt
hon_basic/myvenv/bin/python /Users/jinipark/Documents/
python_basic/myvenv/Chapter5/03-1.실습문제5.1.2.py
공부시간을 입력하세요(시간) >>>5
휴대폰을 30분간 사용 가능합니다.

(myvenv) ➜  python_basic /Users/jinipark/Documents/pyt
hon_basic/myvenv/bin/python /Users/jinipark/Documents/
python_basic/myvenv/Chapter5/03-1.실습문제5.1.2.py
공부시간을 입력하세요(시간) >>>2
휴대폰 사용이 불가능합니다.
```

### [강의 해설]

```python
# 실습문제 5.1.2

study_time = int(input("공부시간을 입력하세요(시간) >>>"))

if study_time >= 10:
    print("휴대폰 잠금이 해제됩니다.")
elif study_time >= 5:
    print("휴대폰을 30분간 사용가능 합니다.")
else:
    print("휴대폰 사용이 불가능합니다.")
```

- 결과 확인

```python
# 공부시간 = 10
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/03-2.실습문제5.1.2-해설.p
y
공부시간을 입력하세요(시간) >>>10
휴대폰 잠금이 해제됩니다.

# 공부시간 = 5
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/jinipark/Documents/
python_basic/myvenv/Chapter5/03-2.실습문제5.1.2-해설.p
y
공부시간을 입력하세요(시간) >>>5
휴대폰을 30분간 사용가능 합니다.

# 공부시간 = 2
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/jinipark/Documents/
python_basic/myvenv/Chapter5/03-2.실습문제5.1.2-해설.p
y
공부시간을 입력하세요(시간) >>>2
휴대폰 사용이 불가능합니다.
```
<br/>
- 위의 조건식을 도식화해서 표현하자면 아래와 같다.
    
    ![2022-04-26-Python-Photo.png](/assets/images/2022-04-25-Python-Photo/2022-04-25-Python-Photo.png)
    
<br/><br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**