---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 12일차'
date: '2022-04-29 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 5-6. 반복문 개념(1)을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-04-29-Python-Photo1](/assets/images/2022-04-29-Python-Photo/2022-04-29-Python-Photo1.jpg)

![2022-04-29-Python-Photo2](/assets/images/2022-04-29-Python-Photo/2022-04-29-Python-Photo2.jpg)

<br/><br/>

# 6. 반복문 개념(1)

## 1. 반복문을 사용하는 이유

- 반복적인 작업을 코드로 작성하기 위해 사용.

<br/>

```python
data = [] # 빈 리스트 생성

# 1 ~ 7일차까지 반복 작업
x = int(input("1일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("2일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("3일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("4일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("5일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("6일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("7일차 턱걸이 횟수 >>>"))
data.append(x)

total = data[0] + data[1] + data[2] + data[3] + data[4] + data[5] + data[6]
avg = total / 7

print(int(avg))
```

<br/>

- 위의 코드를 반복문으로 축약해보자.

```python
for i in range(1, 101):
    x = int(input(i, "일차 턱걸이 횟수 >>>"))
    data.append(x)
```

<br/><br/>

## 2. 시퀀스 자료형(Sequence Data Type)

- 순서가 있는 자료형
    - 리스트
    - 문자열
    - range 객체
    - 튜플, 딕셔너리

<br/><br/>

## 3. for 사용법

```bash
for 변수 in 시퀀스 자료:
    명령문

# 예시
for a in [1, 2, 3, 4]:
    print(a)
```

<br/>

- 동작 방식
    - 리스트 자료 안에 있는 첫번째 값인 1이 a에 저장
    - 명령문을 실행: print(a) ⇒ print(1) ⇒ 1 이 출력
    - 두번째 값인 2를 a에 저장
    - 명령문을 실행: print(a) ⇒ print(2) ⇒ 2 가 출력
    - 리스트에 더 이상 데이터가 없을 때까지 반복

<br/><br/>

## 4. range 명령어

```python
range(10) # 0~9까지 숫자를 포함하는 range 객체를 만들어준다.
```

<br/><br/>

## 5. 실습

```python
# 반복문
# : 반복해서 명령을 사용하고 싶을 때

# 시퀀스 자료형
# : 순서가 있는 자료형
# 1. 리스트
# 2. 문자열
# 3. range 객체
# 4. 튜플
# 5. 딕셔너리

# for 문
# - 리스트 사용
champions = ["티모", "이즈리얼", "리신"]

for champion in champions:
    print("선택한 챔피언은", champion, "입니다.")
```

<br/>

- 리스트는 복수형태로 작성하고 변수는 단수형태로 많이 사용

- 출력 결과물

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/09.반복문개념_for.py
선택한 챔피언은 티모 입니다.
선택한 챔피언은 이즈리얼 입니다.
선택한 챔피언은 리신 입니다.
```

<br/>

- 문자열 사용

```python
# - 문자열 사용
fighting_message = "자신감을 가지자! 나에게 한계란 없다!"

for word in fighting_message:
    print(word)
```

<br/>

- 결과 출력

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/09.반복문개념_for.py
자
신
감
을
 
가
지
자
!
 
나
에
게
 
한
계
란
 
없
다
!
```

<br/>

- range 객체를 사용해보자.

```python
# - range 객체 사용
# range(10) -> 0~9까지 숫자를 포함하는 Range 객체가 나온다. 0,1,2,3,4,5,6,7,8,9
for i in range(10):
    print(i)
```

<br/>

- 결과 출력

```python
# (myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/09.반복문개념_for.py
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

<br/>

- range 응용

```python
# - range 객체 사용
# range(10) -> 0~9까지 숫자를 포함하는 Range 객체가 나온다. 0,1,2,3,4,5,6,7,8,9
# range(시작, 끝+1, 단계)
for i in range(1,10, 2):
    print(i)
```

<br/>

- 결과 출력

```python
# (myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/09.반복문개념_for.py
1
3
5
7
9
```
<br/>

이번 포스팅에서는 반복문 기초 개념에 대해서 알아보았다. 다음 포스팅에서도 이어서 반복문 개념에 대해 알아보자.

<br/><br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**