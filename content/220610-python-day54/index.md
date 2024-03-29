---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 54일차'
date: '2022-06-10 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의  클래스와 객체를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-10-Python-Photo1](/assets/images/2022-06-10-Python-Photo/2022-06-10-Python-Photo1.jpg)

![2022-06-10-Python-Photo2](/assets/images/2022-06-10-Python-Photo/2022-06-10-Python-Photo2.jpg)

<br/><br/>

# 01. 클래스와 객체

## 1. 절차 지향 vs 객체 지향

### 1. 절차 지향 프로그래밍

- 기능들을 어떤 순서로 처리할 것인가에 초점을 맞춘다.
- 프로그래밍 규모가 작은 경우 유용

<br/>

### 2. 객체 지향 프로그래밍

- 객체가 중심, 객체를 정의하고 객체간 상호작용에 초점을 맞춘다.
- 프로그래밍 규모가 큰 경우 유용

<br/><br/>

## 2. 클래스와 객체 개념

### 1. 클래스

- 객체를 만들기 위한 설계도

<br/>

### 2. 객체

- 설계도로부터 만들어낸 제품

<br/><br/>

## 3. 클래스 만들기

![2022-06-10-Python-Photo3](/assets/images/2022-06-10-Python-Photo/2022-06-10-Python-Photo3.png)

- 클래스: ‘Unit’
    - 속성: 이름, 체력, 공격력, 방어막
    - 메서드: 위치로 이동하기, 공격하기, 정보 표시하기
    
    ⇒ 스타크래프트의 프로토스 유닛을 클래스로 만들어보자.

<br/><br/>

### 1. 클래스 만들기

```python
class 클래스이름:
    pass

class Unit:
    pass # 나중에 구현을 하겠다는 뜻
```

<br/><br/>

### 2. 객체 만들기

```python
인스턴스 = 클래스이름()

zealot = Unit()
```

<br/><br/>

### 3. 속성 추가하기

```python
# Unit 클래스에 속성을 추가해보자
# 1) 이름
# 2) 체력
# 3) 방어막
# 4) 공격력

class Unit:
    def __init__(self, name, hp, shield, demage):
        self.name = name
        self.hp = hp
        self.shield = shield
        self.demage = demage

probe = Unit("프로브", 20, 20, 5)
zealot = Unit("질럿", 100, 60, 16)
dragoon = Unit("드라군", 100, 80, 20)
```

- `__init__` : 생성자
- `(self, name, hp, shield, demage)` : 파라미터
- `probe`, `zealot` , `dragoon` : 객체

<br/><br/>

### 4. 메서드 추가하기

```python
# Unit 클래스에 속성을 추가해보자
# 1) 이름
# 2) 체력
# 3) 방어막
# 4) 공격력

class Unit:
    def __init__(self, name, hp, shield, demage):
        self.name = name
        self.hp = hp
        self.shield = shield
        self.demage = demage
    def __str__(self):
        print(f"[{self.name}] 체력 : {self.hp} 실드: {self.shield} 공격력: {self.demage}")

probe = Unit("프로브", 20, 20, 5)
print(proble)
```

<br/><br/>

# 4. 실습

```python
# Unit 클래스
class Unit:
    """
    속성 : 이름, 체력, 방어막, 공격력
    """

    # 생성자 (constructor)
    # 객체를 생성할 떄 호출되는 메서드
    def __init__(self, name, hp, shield, demage):
        self.name = name # self 는 객체 자기 자신을 의미
        self.hp = hp
        self.shield = shield
        self.demage = demage
        print(f"[{self.name}](이)가 생성 되었습니다.")

# 프로브 객체를 생성
probe = Unit("프로브", 20, 20, 5)

# 질럿 객체를 생성
zealot = Unit("질럿", 100, 60, 16)

# 드라군 객체를 생성
dragoon = Unit("드라군", 100, 80, 20)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter04/01.클래스와객체.py
[프로브](이)가 생성 되었습니다.
[질럿](이)가 생성 되었습니다.
[드라군](이)가 생성 되었습니다.
```

<br/>

- 메서드를 생성해보자

```python
# Unit 클래스
class Unit:
    """
    속성 : 이름, 체력, 방어막, 공격력
    """

    # 생성자 (constructor)
    # 객체를 생성할 떄 호출되는 메서드
    def __init__(self, name, hp, shield, demage):
        self.name = name # self 는 객체 자기 자신을 의미
        self.hp = hp
        self.shield = shield
        self.demage = demage
        print(f"[{self.name}](이)가 생성 되었습니다.")

    # 객체를 출력할 때 호출되는 메서드
    def __str__(self):
        return f"[{self.name}] 체력 : {self.hp} 실드: {self.shield} 공격력: {self.demage}"

# 프로브 객체를 생성
probe = Unit("프로브", 20, 20, 5)

# 질럿 객체를 생성
zealot = Unit("질럿", 100, 60, 16)

# 드라군 객체를 생성
dragoon = Unit("드라군", 100, 80, 20)

# 객체의 속성 정보를 출력
print(probe)
print(zealot)
print(dragoon)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter04/01.클래스와객체.py
[프로브](이)가 생성 되었습니다.
[질럿](이)가 생성 되었습니다.
[드라군](이)가 생성 되었습니다.
[프로브] 체력 : 20 실드: 20 공격력: 5
[질럿] 체력 : 100 실드: 60 공격력: 16
[드라군] 체력 : 100 실드: 80 공격력: 20
```

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 클래스와 객체를 알아보았다. 다음 포스팅에서는 여러가지 속성을 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**