---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 10일차'
date: '2022-04-27 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 5-4. 리스트 자료형 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-04-27-Python-Photo1](/assets/images/2022-04-27-Python-Photo/2022-04-27-Python-Photo1.jpg)

![2022-04-27-Python-Photo2](/assets/images/2022-04-27-Python-Photo/2022-04-27-Python-Photo2.jpg)

<br/><br/>

# 4. 리스트 자료형

## 1. 리스트를 사용하는 이유

- 10개의 동물 이름 데이터를 저장해야 할 때
    - animal1 = “사자”
    - animal2 = “호랑이”
    - ...
    - animal10 = “강아지”

- 리스트를 사용하면 한줄의 코드로 작성할 수 있다.
    - animal = [”사자”, “호랑이", ... “강아지”]

<br/><br/>

## 2. 리스트를 만드는 방법

- 리스트명 = [데이터, 데이터, ... , 데이터]
- 빈 리스트도 만들 수 있다: 리스트명 = []

<br/><br/>

## 3. 데이터 접근하기

- 인덱스를 이용해 몇 번째 데이터인지 알려줄 수 있다.
- 인덱스는 0부터 시작한다.
- animals[n] ⇒ animals[0] = “사자”, animals[1] = “호랑이”

<br/><br/>

## 4. 데이터 조작하기

- **데이터 추가**: 리스트.append(데이터)
- **데이터 할당**: 리스트[인덱스] = 데이터
- **데이터 삭제**: del 리스트[인덱스]

<br/>

- 예: a = [1, 2, 3]
    - 추가: a.append(4) ⇒ a = [1, 2, 3, 4]
    - 할당: a[0] = 0 ⇒ a = [0, 2, 3, 4]
    - 삭제: del a[1] ⇒ [0, 3, 4]

<br/>

- **슬라이싱**: 리스트[시작:끝+1]
- **리스트 길이**: len(리스트)
- **리스트 정렬**: 리스트.sort()

<br/>

- 예: b = [3, 4, 2, 1]
    - 슬라이싱: b[1:3] ⇒ [4,2]
    - 길이: len(b) ⇒ 4
    - 정렬: b.sort() ⇒ [1, 2, 3, 4]

<br/><br/>

## 5. 실습

```python
# 1. 리스트 만들기
# - 데이터가 있는 리스트
from operator import le

animals = ["가물치", "벼메뚜기", "비단뱀", "도룡뇽"]

#  - 데이터가 없는 리스트
empty = []

# 2. 리스트 조작하기

# - 데이터 접근하기
# 인덱스는 0 부터 시작한다.
print(animals[2])
print(animals[-1]) # 뒤에서부터 첫번째

# - 데이터 추가하기
animals.append("고라니")
print(animals)

# - 데이터 할당하기
# 기존 데이터를 대체
animals[1] = "청개구리"
print(animals)

# - 데이터 삭제하기
del animals[0]
print(animals)

# - 리스트 슬라이싱
print(animals[1:3])
print(animals[:]) # 전체
print(animals[:3]) # 시작 인덱스부터
print(animals[1:]) # 마지막까지

# - 리스트 길이
print(len(animals))

# 리스트 정렬
# 내림차순 정렬 시 animals.sort(reverse=True)
animals.sort()
print(animals)
```
<br/><br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**