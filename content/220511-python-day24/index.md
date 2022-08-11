---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 24일차'
date: '2022-05-11 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 8-4. 오버라이딩, 클래스변수를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-11-Python-Photo1](/assets/images/2022-05-11-Python-Photo/2022-05-11-Python-Photo1.jpg)

![2022-05-11-Python-Photo2](/assets/images/2022-05-11-Python-Photo/2022-05-11-Python-Photo2.jpg)

<br/><br/>

# 01. 오버라이딩, 클래스 변수

## 1. RPG 게임 업데이트(예시)

### 1. 생성자 오버라이딩

- 요건
    - 드래곤 클래스에 인스턴스 속성으로 3개의 스킬을 추가
    - 드래곤이 스킬을 사용하면 속성 중 하나가 무작위로 사용

<br/>

- 어떻게 속성을 추가할까?
    - Monster class에 속성 추가 ⇒ 다른 자식클래스에도 해당 속성이 추가됨 (X)
    - 생성자 자체를 오버라이딩하자!

```python
class Monster:
    def __init__(self, name, health, attack):
        self.name = name
        self.health = health
        self.attack = attack
    def move(self):
        print(f"[{self.name}] 지상에서 이동하기")

class Dragon(Monster):
    # 생성자 오버라이딩
    def __init__(self, name, health, attack, skill):
        self.name = name
        self.health = health
        self.attack = attack    
    def move(self): # 메서드 오버라이딩
        print(f"[{self.name}] 날기")
```

- 부모 클래스의 함수를 그대로 복사 붙여넣기 해도 되지만, 매번 붙여넣기 하기는 너무 번거롭다

<br/>

- super 함수를 사용하자.
    - super().__init__(): 부모클래스의 `__init__` 함수를 불러온다.

```python
class Monster:
    def __init__(self, name, health, attack):
        self.name = name
        self.health = health
        self.attack = attack
    def move(self):
        print(f"[{self.name}] 지상에서 이동하기")

class Dragon(Monster):
    # 생성자 오버라이딩
    def __init__(self, name, health, attack, skill):
        super().__init__(name, health, attack)
    def move(self): # 메서드 오버라이딩
        print(f"[{self.name}] 날기")
```

<br/>

- 추가 매개변수인 skill의 함수를 선언해준다.

```python
class Dragon(Monster):
    # 생성자 오버라이딩
    def __init__(self, name, health, attack, skill):
        super().__init__(name, health, attack)
        self.skill = skill
        
    def move(self): # 메서드 오버라이딩
        print(f"[{self.name}] 날기")
```

- Dragon을 호출할 때, 스킬을 추가해서 호출한다.
    - 스킬은 불변하므로, 리스트가 아닌 튜플이 적절

```python
class Dragon(Monster):
    # 생성자 오버라이딩
    def __init__(self, name, health, attack, skill):
        super().__init__(name, health, attack)
        self.skill = skill
        
    def move(self): # 메서드 오버라이딩
        print(f"[{self.name}] 날기")

dragon = Dragon("드래곤", 8000, 800, ("불뿜기", "꼬리치기", "날개치기"))
dragon.move()
```

<br/>

- 스킬은 불변한데, 호출할 때 매번 넣어주면 중복이 발생한다.

```python
class Dragon(Monster):
    # 생성자 오버라이딩
    def __init__(self, name, health, attack, skill):
        super().__init__(name, health, attack)
        self.skill = skill
        
    def move(self): # 메서드 오버라이딩
        print(f"[{self.name}] 날기")

dragon1 = Dragon("드래곤", 8000, 800, ("불뿜기", "꼬리치기", "날개치기"))
dragon2 = Dragon("드래곤", 7000, 700, ("불뿜기", "꼬리치기", "날개치기"))
dragon3 = Dragon("드래곤", 6000, 600, ("불뿜기", "꼬리치기", "날개치기"))

dragon.move()
```

<br/>

- 튜플을 속성 자체에 직접 대입

```python
class Dragon(Monster):
    # 생성자 오버라이딩
    def __init__(self, name, health, attack):
        super().__init__(name, health, attack)
        self.skill = ("불뿜기", "꼬리치기", "날개치기")

    def move(self): # 메서드 오버라이딩
        print(f"[{self.name}] 날기")

dragon = Dragon("드래곤", 8000, 800)

```

<br/>

- skill ⇒ skills 로 바꾸고 skill 메서드를 생성
- random.randint를 사용해 스킬을 랜덤으로 불러오기 (import random)
- dragon.skill()로 스킬을 사용해준다.

```python
# 상속
# : 클래스들에 중복된 코드를 제거하고 유지보수를
#    편하게 하기 위해 사용

import random

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
    # 생성자 오버라이딩
    def __init__(self, name, health, attack):
        super().__init__(name, health, attack)
        self.skills = ("불뿜기", "꼬리치기", "날개치기")

    def move(self): # 메서드 오버라이딩
        print(f"[{self.name}] 날기")
    
    def skill(self):
        print(f"[{self.name}] 스킬 사용 {self.skills[random.randint(0,2)]}")

wolf = Wolf("울프", 1500, 200)
wolf.move()

shark = Shark("샤크", 300, 400)
shark.move()

dragon = Dragon("드래곤", 8000, 800)
dragon.move()
dragon.skill()
```

<br/>

- 출력 결과: 코드를 실행할 때마다 다른 스킬을 사용하는 것을 확인할 수 있다.

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter8/05.오버라이딩클래스변수.p
y
[울프] 지상에서 이동하기
[샤크] 헤엄치기
[드래곤] 날기
[드래곤] 스킬 사용 날개치기
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter8/05.오버라이딩클래스변수.p
y
[울프] 지상에서 이동하기
[샤크] 헤엄치기
[드래곤] 날기
[드래곤] 스킬 사용 불뿜기
```

<br/><br/>

### 2. 클래스 변수

- 전체 Monster의 개수를 최대 1000 마리로 제한 ⇒ 클래스 변수 사용해야함
- Monster 하위에 max_num = 1000을 정의
- Monster 를 생성(`__init__` ) 할때마다 1000에서 1씩 빼주기 ⇒ `Monster.max_num -= 1`
    - self 가 아님에 주의!

```python
# 상속
# : 클래스들에 중복된 코드를 제거하고 유지보수를
#    편하게 하기 위해 사용

# 클래스 변수
# : 인스턴스들이 모두 공유하는 변수

import random

class Monster:
    max_num = 1000
    def __init__(self, name, health, attack):
        self.name = name
        self.health = health
        self.attack = attack
        Monster.max_num -= 1
    def move(self):
        print(f"[{self.name}] 지상에서 이동하기")

class Wolf(Monster):
    pass

class Shark(Monster):
    def move(self): # 메서드 오버라이딩
        print(f"[{self.name}] 헤엄치기")

class Dragon(Monster):
    # 생성자 오버라이딩
    def __init__(self, name, health, attack):
        super().__init__(name, health, attack)
        self.skills = ("불뿜기", "꼬리치기", "날개치기")

    def move(self): # 메서드 오버라이딩
        print(f"[{self.name}] 날기")
    
    def skill(self):
        print(f"[{self.name}] 스킬 사용 {self.skills[random.randint(0,2)]}")

wolf = Wolf("울프", 1500, 200)
wolf.move()
print(wolf.max_num)

shark = Shark("샤크", 300, 400)
shark.move()
print(shark.max_num)

dragon = Dragon("드래곤", 8000, 800)
dragon.move()
dragon.skill()
print(dragon.max_num)
```

<br/>

- 출력 결과: max_num 을 모든 클래스에서 공유하는 것을 확인할 수 있다.

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter8/05.오버라이딩클래스변수.p
y
[울프] 지상에서 이동하기
999
[샤크] 헤엄치기
998
[드래곤] 날기
[드래곤] 스킬 사용 꼬리치기
997
```

<br/><br/>

이번 포스팅에서는 오버라이딩, 클래스 변수의 개념에 대해 알아보았다. 다음 포스팅에서는 실습문제를 풀어보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**