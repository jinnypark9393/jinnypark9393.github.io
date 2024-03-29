---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 3일차'
date: '2022-04-20 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의챕터 3-2. 변수 강의를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/>

![2022-04-20-Python-Photo1](/assets/images/2022-04-20-Python-Photo/2022-04-20-Python-Photo1.jpg)

![2022-04-20-Python-Photo1](/assets/images/2022-04-20-Python-Photo/2022-04-20-Python-Photo2.jpg)

<br/>

# 2. 변수

## 1. 변수란?

- 데이터를 저장할 공간
- 저장한 데이터를 언제든지 변경할 수 있다.

<br/>

## 2. 변수를 만드는 방법

- 변수이름 = 데이터
- `=` 는 할당 연산자: 오른쪽의 데이터를 왼쪽의 변수에 저장

<br/>

## 3. 변수 이름 규칙

- 데이터를 표현할 수 있는 이름으로 짓는다(중요).
- 문자부터 시작해야 한다.
- 대소문자는 구분한다.
- _로 시작할 수 있다.
- 미리 예약된 키워드는 사용할 수 없다.

<br/>

## 4. 실습

- 변수이름에 데이터를 저장한 뒤 출력해보자.

```python
# 변수
# 변수이름 = 데이터

# 마스터이 챔피언 데이터를 변수에 저장
name = "마스터이"
level = 5
health = 800
attack = 90

print(name, level, health, attack)
# print("마스터이", 5, 800, 90)와 같음
```

<br/>
- 실행버튼을 눌러 결과를 확인한다. 저장한 데이터가 출력됨을 알 수 있다.

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter3/02.변수.py
마스터이 5 800 90
```

<br/>

- 변수에 저장된 데이터를 변경하기

```python
# 변수에 저장된 데이터를 변경하기
level = 6
health = 850
attack = 100
print(name, level, health, attack)
```

<br/>

- 실행버튼을 눌러 결과를 확인한다. 기존에 저장되었던 데이터가 변경되어 있는 것을 확인할 수 있다.

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter3/02.변수.py
마스터이 6 850 100
```

<br/>

- 연산자를 이용해 데이터를 변경할 수도 있다.

```python
# 변수에 저장된 데이터를 변경하기
level = level + 1 # 5 + 1
health = health + 50 # 800 + 50
attack = attack + 10 # 90 + 10
print(name, level, health, attack)
```

<br/>

- 결과를 출력해보면 데이터가 변경된 것을 확인할 수 있다.

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter3/02.변수.py
마스터이 6 850 100
```

<br/>

다음 시간에는 더하기(`+` ) 연산자 외에 곱하기, 빼기 등의 연산자, 연산식을 간단하게 표현할 수 있는 복합 연산자, True/False 등의 값을 연산하는 비교연산자 등에 대해서 배워보도록 하겠다.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**
