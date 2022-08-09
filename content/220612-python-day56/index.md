---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 56일차'
date: '2022-06-12 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 여러가지 메서드를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-12-Python-Photo1](/assets/images/2022-06-12-Python-Photo/2022-06-12-Python-Photo1.jpg)

![2022-06-12-Python-Photo2](/assets/images/2022-06-12-Python-Photo/2022-06-12-Python-Photo2.jpg)

<br/><br/>

# 03. 여러가지 메서드

## 1. 인스턴스 메서드

- 인스턴스 속성에 접근할 수 있는 메서드
- 항상 첫번째 파라미터로 self를 갖는다.

<br/>

### hit 메서드 구현하기

- 데미지를 받으면 체력과 방어막이 깎이는 hit 메서드를 구현해 보자.
    1. 데미지가 방어막보다 작거나 같으면 방어막만 깎인다.
    2. 데미지가 방어막보다 크고 체력보다 작으면 체력과 방어막이 깎인다.
    3. 데미지가 체력보다 크면 체력을 0으로 만든다.

<br/>

### 내 풀이

```python
class Unit:
    """
    인스턴스 속성 : 이름, 체력, 방어막, 공격력
    클래스 속성 : 전체 유닛 개수
    """
    count = 0
    def __init__(self, name, hp, shield, demage):
        self.name = name 
        self.hp = hp
        self.shield = shield
        self.demage = demage
        Unit.count += 1
        print(f"[{self.name}](이)가 생성 되었습니다.")
    def __str__(self):
        return f"[{self.name}] 체력 : {self.hp} 실드: {self.shield} 공격력: {self.demage}"

probe = Unit("프로브", 20, 20, 5)
zealot = Unit("질럿", 100, 60, 16)
dragoon = Unit("드라군", 100, 80, 20)

# 인스턴스 메서드 (instance method)
# - instance = 실체하다는 뜻. 객체가 메모리에 실체하기 때문.
# 인스턴스 속성에 접근할 수 있는 메서드
def hit(self, demage):
        if demage <= self.shield:
            self.shield = self.shield - demage
        elif demage > self.shield and demage <= self.hp:
            self.shield = 0
            self.hp = self.hp - (self.demage - self.shield)
        else:
            self.hp = 0
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter04/03.여러가지메서드.py
[프로브](이)가 생성 되었습니다.
[질럿](이)가 생성 되었습니다.
[드라군](이)가 생성 되었습니다.
[프로브] 체력 : 20 실드: 4 공격력: 5
[프로브] 체력 : 15 실드: 0 공격력: 5
[프로브] 체력 : 0 실드: 0 공격력: 5
```

- 제대로 동작하지 않음

<br/>

### 강의 해설

- 방어막과 체력을 분리해서 생각해보자.

```python
class Unit:
    """
    인스턴스 속성 : 이름, 체력, 방어막, 공격력
    클래스 속성 : 전체 유닛 개수
    """
    count = 0
    def __init__(self, name, hp, shield, demage):
        self.name = name 
        self.hp = hp
        self.shield = shield
        self.demage = demage
        Unit.count += 1
        print(f"[{self.name}](이)가 생성 되었습니다.")
    def __str__(self):
        return f"[{self.name}] 체력 : {self.hp} 실드: {self.shield} 공격력: {self.demage}"

# 인스턴스 메서드 (instance method)
# - instance = 실체하다는 뜻. 객체가 메모리에 실체하기 때문.
# 인스턴스 속성에 접근할 수 있는 메서드
# def hit(self, demage):
#     if demage <= self.shield:
#         self.shield = demage - self.shield
#     elif demage > self.shield and demage <= self.hp:
#         self.shield = 0
#         self.hp = self.hp - (self.demage - self.shield)
#     else:
#         self.hp = 0

    def hit(self, demage):
        # 방어막 변경
        if self.shield >= demage:
            self.shield -= demage
            demage = 0
        else:
            demage -= self.shield
            self.shield = 0
        
        # 체력 변경
        if demage > 0:
            if self.hp > demage:
                self.hp -= demage
            else:
                self.hp = 0

probe = Unit("프로브", 20, 20, 5)
zealot = Unit("질럿", 100, 60, 16)
dragoon = Unit("드라군", 100, 80, 20)

probe.hit(16)
print(probe)

probe.hit(16)
print(probe)

probe.hit(16)
print(probe)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter04/03.여러가지메서드.py
[프로브](이)가 생성 되었습니다.
[질럿](이)가 생성 되었습니다.
[드라군](이)가 생성 되었습니다.
[프로브] 체력 : 20 실드: 4 공격력: 5
[프로브] 체력 : 8 실드: 0 공격력: 5
[프로브] 체력 : 0 실드: 0 공격력: 5
```

<br/>

## 2. 클래스 메서드

- 클래스 속성에 접근하기 위해 사용한다.
- 클래스를 의미하는 cls를 파라미터로 받는다.

```python
class Unit:
    count = 0
    ...
    @classmethod
    def print_count(cls):
        print(f"전체 유닛 개수 : {cls.count}")
```

- `@classmethod` ⇒ decorator

<br/>

## 3. 정적 메서드

- 인스턴스를 만들 필요가 없는 메서드
- self를 받지 않는다
- 메서드가 인스턴스 유무와 관계없이 독립적으로 사용될 때

```python
class Math:
    @staticmethod
    def add(x, y):
        return x + y
```

<br/>

## 4. 매직 메서드

- 클래스 안에 정의할 수 있는 스페셜 메서드
- 특별한 상황에 호출된다.
- `__이름__` 의 형태로 되어있다. (ex. `__init__` )

<br/>

## 5. 실습

```python
class Unit:
    """
    인스턴스 속성 : 이름, 체력, 방어막, 공격력
    클래스 속성 : 전체 유닛 개수
    """
    count = 0
    def __init__(self, name, hp, shield, demage):
        self.name = name 
        self.hp = hp
        self.shield = shield
        self.demage = demage
        Unit.count += 1
        print(f"[{self.name}](이)가 생성 되었습니다.")
    def __str__(self):
        return f"[{self.name}] 체력 : {self.hp} 실드: {self.shield} 공격력: {self.demage}"

# 인스턴스 메서드 (instance method)
# - instance = 실체하다는 뜻. 객체가 메모리에 실체하기 때문.
# 인스턴스 속성에 접근할 수 있는 메서드
    def hit(self, demage):
        # 방어막 변경
        if self.shield >= demage:
            self.shield -= demage
            demage = 0
        else:
            demage -= self.shield
            self.shield = 0
        
        # 체력 변경
        if demage > 0:
            if self.hp > demage:
                self.hp -= demage
            else:
                self.hp = 0
    # 클래스 메서드 (class method)
    # 클래스 속성에 접근하는 메서드
    @classmethod
    def print_count(cls):
        print(f"생성된 유닛 개수 : [{cls.count}]개")

probe = Unit("프로브", 20, 20, 5)
zealot = Unit("질럿", 100, 60, 16)
dragoon = Unit("드라군", 100, 80, 20)

probe.hit(16)
print(probe)
probe.hit(16)
print(probe)
probe.hit(16)
print(probe)

Unit.print_count()
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter04/03.여러가지메서드.py
[프로브](이)가 생성 되었습니다.
[질럿](이)가 생성 되었습니다.
[드라군](이)가 생성 되었습니다.
[프로브] 체력 : 20 실드: 4 공격력: 5
[프로브] 체력 : 8 실드: 0 공격력: 5
[프로브] 체력 : 0 실드: 0 공격력: 5
생성된 유닛 개수 : [3]개
```

<br/>

- 정적 메서드를 실습해보자.

```python
class Math:

    # 정적 메서드(static method)
    # 인스턴스를 만들 필요가 없는 메서드
    @staticmethod
    def add(x, y):
        return x + y

    @staticmethod
    def sub(x, y):
        return x - y

print(Math,add(3,4))
print(Math,sub(3,4))
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter04/04.여러가지메서드_2.py
7
-1
```

<br/>

- 매직 메서드(스페셜 메서드, 던더 메서드): 특정한 상황에서만 쓰임

```python
class Unit:
    """
    인스턴스 속성 : 이름, 체력, 방어막, 공격력
    클래스 속성 : 전체 유닛 개수
    """
    count = 0
    def __init__(self, name, hp, shield, demage):
        self.name = name 
        self.hp = hp
        self.shield = shield
        self.demage = demage
        Unit.count += 1
        print(f"[{self.name}](이)가 생성 되었습니다.")
    def __str__(self):
        return f"[{self.name}] 체력 : {self.hp} 실드: {self.shield} 공격력: {self.demage}"

print(dir(probe))
```

- `__init__` : 객체를 생성할 때 호출되는 메서드
- `__str__` : 객체를 출력할 때 호출되는 메서드
- `dir()` : 객체가 갖고있는 속성과 메서드를 확인하는 함수

<br/>

- dir 실행 결과

```python
['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'count', 'demage', 'hit', 'hp', 'name', 'print_count', 'shield']
```

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 여러가지 메서드를 알아보았다. 다음 포스팅에서는 상속을 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**