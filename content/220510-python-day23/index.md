---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 23일차'
date: '2022-05-10 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 8-3. 상속을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-10-Python-Photo1](/assets/images/2022-05-10-Python-Photo/2022-05-10-Python-Photo1.jpg)

![2022-05-10-Python-Photo2](/assets/images/2022-05-10-Python-Photo/2022-05-10-Python-Photo2.jpg)

<br/><br/>

# 03. 상속

## 1. 상속의 개념

- 자식클래스는 부모클래스의 속성과 메서드를 그대로 가져올 수 있다.

![2022-05-10-Python-Photo3](/assets/images/2022-05-10-Python-Photo/2022-05-10-Python-Photo3.png)

<br/>

- 상속이 필요한 이유: 클래스를 하나하나 설정하게 될 경우 관리포인트가 너무 많아진다.

<br/>

- 예시
    
    ![2022-05-10-Python-Photo3](/assets/images/2022-05-10-Python-Photo/2022-05-10-Python-Photo4.png)
    
- ‘몬스터' 관련코드가 중복으로 발생 ⇒ 중복을 없애 효율적으로 만드는 방법은?

<br/>

- 세 클래스의 공통된 부분을 합쳐 ‘몬스터'라는 클래스를 생성한 뒤 상속하여 중복을 없애 코드를 간결하게 작성할 수 있다.

![2022-05-10-Python-Photo3](/assets/images/2022-05-10-Python-Photo/2022-05-10-Python-Photo5.png)

<br/><br/>

## 2. 상속 사용 방법

- 위 예시를 코드로 작성해보자.
- 먼저, 부모클래스를 정의해보자

```python
class Monster:
    def __init__(self, name, health, attack):
        self.name = name
        self.health = health
        self.attack = attack
    def move(self):
        print("지상에서 이동하기")
```

- 속성
    - 이름
    - 체력
    - 공격력
- 메서드
    - 이동하기

<br/>

- 자식클래스 정의(`__init__` 는 생략 가능)

```python
class Wolf(Monster):
    pass # 상속 받은 메서드만 사용

class Shark(Monster):
    def move(self):
        print("헤엄치기")

class Dragon(Monster):
    def move(self):
        print("날기")
```

- 속성 (Monster 로부터 상속받은)
    - 이름
    - 체력
    - 공격력
- 메서드 오버라이딩: 메서드 재 정의
    - 헤엄치기
    - 날기

<br/><br/>

## 3. 실습

```python
# 상속
# : 클래스들에 중복된 코드를 제거하고 유지보수를
#    편하게 하기 위해 사용

class Monster:
    def __init__(self, name, health, attack):
        self.name = name
        self.health = health
        self.attack = attack
    def move(self):
        print(f"[{self.name}] 지상에서 이동하기")

class Wolf(Monster):
    pass

class Shark(Monster):
    def move(self): # 메서드 오버라이딩
        print(f"[{self.name}] 헤엄치기")

class Dragon(Monster):
    def move(self): # 메서드 오버라이딩
        print(f"[{self.name}] 날기")

wolf = Wolf("울프", 1500, 200)
wolf.move()

shark = Shark("샤크", 300, 400)
shark.move()

dragon = Dragon("드래곤", 8000,800)
dragon.move()
```

<br/><br/>

이번 포스팅에서는 상속의 개념에 대해 알아보았다. 다음 포스팅에서는 오버라이딩, 클래스 변수에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**