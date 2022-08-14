---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 5일차'
date: '2022-04-22 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 4-2. 연산자 강의를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/>

![2022-04-22-Python-Photo1](/assets/images/2022-04-22-Python-Photo/220422-Python-Photo(01).jpg)

![2022-04-22-Python-Photo2](/assets/images/2022-04-22-Python-Photo/220422-Python-Photo(02).jpg)

<br/>

# 2. 연산(2)

## 1. 비교연산


| 연산자(연산기호) | 설명(왼쪽이 오른쪽보다) |
| --- | --- |
| > | 크다 |
| < | 작다 |
| >= | 크거나 같다 |
| <= | 작거나 같다 |
| == | 같다 |
| != | 다르다 |

<br/>

- 조건문을 이해하기 위해 꼭 필요한 내용
- 예: 1 > 2 ⇒ False(거짓),  1 < 2 ⇒ True(참)

<br/>

- VScode로 비교연산자를 활용해보자.

```python
# 1. 비교연산
print(2 > 3) # False 
print(15 < 30) # True
print(1.5 >= 0) # True
print(3 <= 3) # True
print("팛팛팛" == "팛팛팗") # False
print("1111111111111111" != "1111111111111111") # True
```

<br/>

## 2. 논리연산

| 연산자 | 설명 |
| --- | --- |
| A and B | A,B 모두 참이라면 True |
| A or B | A,B 중 하나라도 참이라면 True |
| not A | A가 참이라면 False |

<br/>

- 논리 연산은 두 개의 비교연산을 합칠 때 자주 사용
- 예: 1 < 2 and 1 == 1 ⇒ `1 < 2` , `1 == 1` 모두 참일 경우에만 True

<br/><br/>

- VScode로 비교연산자를 활용해보자.

```python
# 2. 논리연산
print(4 < 6 and 10 >= 10) # True and True -> True
print("포기하지말아요" != "포기하지말아요" or "나는 할 수 있다" == "나는 할 수 있다")
# False or True => True
print(not 5==5) # not True -> False
```

<br/><br/>

## 3. 멤버십 연산

| 연산자(연산기호) | 설명(왼쪽이 오른쪽에) |
| --- | --- |
| in | 포함되어 있다 |
| not in | 포함되어 있지 않다 |

<br/>

- 리스트 자료형을 알아야 더 잘 활용 할 수 있다.
- 예: “a” in “abc” ⇒ True

<br/>

- VScode로 비교연산자를 활용해보자.

```python
# 3. 멤버십 연산
print("- 멤버십 문제")
print("a" in "abc") # 포함되어 있다면 True
print("d" not in "abc") # 포함되어 있지 않다면 True
```

<br/>

연산 자체는 어렵지 않은 내용이나, 다다음 시간에 배울 조건문과 같이 활용하게 됨. 다음은 입력과 자료형 변환에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

[패스트캠퍼스 [직장인 실무교육]](https://bit.ly/3L3avNW)

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**