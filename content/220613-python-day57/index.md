---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 57일차'
date: '2022-06-13 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 상속을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-13-Python-Photo1](/assets/images/2022-06-13-Python-Photo/2022-06-13-Python-Photo1.jpg)

![2022-06-13-Python-Photo2](/assets/images/2022-06-13-Python-Photo/2022-06-13-Python-Photo2.jpg)

<br/><br/>

# 04. 상속

## 1. 상속의 개념

- 클래스들의 **공통된 속성과 메서드**를 뽑아내 부모 클래스를 만든다.
- 이를 자식 클래스에서 상속받아 사용한다.
    
    ![2022-06-13-Python-Photo3](/assets/images/2022-06-13-Python-Photo/2022-06-13-Python-Photo3.png)
    

<br/><br/>

## 2. 상속의 장점

- 코드의 중복을 제거할 수 있다.
- 유지보수가 편리해진다.
    - 공통 구현 ⇒ 부모클래스만 수정하면 된다.
    - 상세 구현 ⇒ 자식클래스만 수정하면 된다.

<br/><br/>

## 3. 상속 구현하기

- Weapon 클래스 구현
    
    ![2022-06-13-Python-Photo4](/assets/images/2022-06-13-Python-Photo/2022-06-13-Python-Photo4.png)
    
    - Item 클래스로부터 `이름` 속성, `줍기` , `버리기` 메서드를 상속받았다.
    - Weapon 클래스에는 `데미지` 속성, `공격하기` 메서드가 추가되었다.

- HealingItem 클래스 구현
    
    ![2022-06-13-Python-Photo5](/assets/images/2022-06-13-Python-Photo/2022-06-13-Python-Photo5.png)
    
- Item 클래스로부터 `이름` 속성, `줍기` , `버리기` 메서드를 상속받았다.
- HealingItem 클래스에는 `회복량` 속성, `사용하기` 메서드가 추가되었다.

<br/><br/>

## 4. 추상 클래스

- 추상 메서드를 가질 수 있다.
- 해당 클래스를 상속 받는 자식 클래스에서 구현을 강제하도록 하는 클래스
    
    ![2022-06-13-Python-Photo6](/assets/images/2022-06-13-Python-Photo/2022-06-13-Python-Photo6.png)

<br/><br/>

## 5. 실습

```python
class Item:
    """
    속성 : 이름
    메서드 : 줍기, 버리기
    """
    def __init__(self, name):
        self.name = name 
    
    def pick(self):
        print(f"[{self.name}]을(를) 주웠습니다.") 

    def discard(self):
        print(f"[{self.name}]을(를) 버렸습니다.") 
    
class Weapon(Item):
    """
    속성 : 공격력
    메서드 : 공격하기
    """
    def __init__(self, name, demage):
        super().__init__(name)
        self.demage = demage
    def attack(self):
        print(f"[{self.name}]을(를) 이용해 {self.demage}로 공격합니다.")

class HealingItem(Item):
    """
    속성 : 회복량
    메서드 : 사용하기
    """
    def __init__(self, name, recovery_amount):
        super().__init__(name)
        self.recovery_amount = recovery_amount
    def use(self):
        print(f"[{self.name}]을(를) 사용합니다. {self.recovery_amount} 회복")

m16 = Weapon("m16", 110)
bungdae = HealingItem("붕대", 20)

m16.attack()
bungdae.use()
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter04/05.상속.py
[m16]을(를) 이용해 110로 공격합니다.
[붕대]을(를) 사용합니다. 20 회복
```

<br/>

- 추상 클래스를 실습해보자
    - abc라는 모듈을 가져와야한다(from abc import *)

```python
from abc import *

class Item(metaclass=ABCMeta):
    """
    속성 : 이름
    메서드 : 줍기, 버리기
    """
    def __init__(self, name):
        self.name = name 
    
    def pick(self):
        print(f"[{self.name}]을(를) 주웠습니다.") 

    def discard(self):
        print(f"[{self.name}]을(를) 버렸습니다.") 
    
    @abstractmethod
    def use(self):
        pass

class Weapon(Item):
    """
    속성 : 공격력
    메서드 : 공격하기
    """
    def __init__(self, name, demage):
        super().__init__(name)
        self.demage = demage
    def attack(self):
        print(f"[{self.name}]을(를) 이용해 {self.demage}로 공격합니다.")

class HealingItem(Item):
    """
    속성 : 회복량
    메서드 : 사용하기
    """
    def __init__(self, name, recovery_amount):
        super().__init__(name)
        self.recovery_amount = recovery_amount
    def use(self):
        print(f"[{self.name}]을(를) 사용합니다. {self.recovery_amount} 회복")

m16 = Weapon("m16", 110)
bungdae = HealingItem("붕대", 20)

m16.attack()
bungdae.use()
```

<br/>

- Weapon클래스에서 use를 구현하지 않고 실행해보자.

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter04/06.추상클래스.py
Traceback (most recent call last):
  File "/Users/usr/Documents/python_advanced/myvenv/Chapter04/06.추상클래스.py", line 44, in <module>
    m16 = Weapon("m16", 110)
TypeError: Can't instantiate abstract class Weapon with abstract method use
```

- abstract 메서드를 구현하지 않아 사용할 수 없다는 메시지 발생

<br/>

- Weapon클래스에서 attack을 use로 수정해주자.

```python
from abc import *

class Item(metaclass=ABCMeta):
    """
    속성 : 이름
    메서드 : 줍기, 버리기
    """
    def __init__(self, name):
        self.name = name 
    
    def pick(self):
        print(f"[{self.name}]을(를) 주웠습니다.") 

    def discard(self):
        print(f"[{self.name}]을(를) 버렸습니다.") 
    
    @abstractmethod
    def use(self):
        pass

class Weapon(Item):
    """
    속성 : 공격력
    메서드 : 공격하기
    """
    def __init__(self, name, demage):
        super().__init__(name)
        self.demage = demage
    def use(self):
        print(f"[{self.name}]을(를) 이용해 {self.demage}로 공격합니다.")

class HealingItem(Item):
    """
    속성 : 회복량
    메서드 : 사용하기
    """
    def __init__(self, name, recovery_amount):
        super().__init__(name)
        self.recovery_amount = recovery_amount
    def use(self):
        print(f"[{self.name}]을(를) 사용합니다. {self.recovery_amount} 회복")

m16 = Weapon("m16", 110)
bungdae = HealingItem("붕대", 20)

m16.use()
bungdae.use()
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter04/06.추상클래스.py
[m16]을(를) 이용해 110로 공격합니다.
[붕대]을(를) 사용합니다. 20 회복
```

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 상속을 알아보았다. 다음 포스팅에서는 클래스 실습문제를 풀어보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**