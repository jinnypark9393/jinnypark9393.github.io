---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 25일차'
date: '2022-05-12 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 8-5. 클래스 실습문제를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-12-Python-Photo1](/assets/images/2022-05-12-Python-Photo/2022-05-12-Python-Photo1.jpg)

![2022-05-12-Python-Photo2](/assets/images/2022-05-12-Python-Photo/2022-05-12-Python-Photo2.jpg)

<br/><br/>

# 05. 클래스 실습문제

## 1. 실습문제 8.1.1

- 영철은 스타트게임즈 회사에 개발자로 취직을 하게 되었다. 지난 주 회의 결과로 신작 MMORPG 게임의 아이템 구성안을 만들었다.
    - 아이템 공통: 이름, 가격, 무게, 판매하기, 버리기
    - 장비 아이템: 착용효과, 착용하기
    - 소모품 아이템: 사용효과, 사용하기
    - (단, 버리기는 버릴 수 있는 아이템만 가능하가)
- 구성안을 토대로 클래스 다이어그램을 설계하였다.
    
    ![2022-05-12-Python-Photo3](/assets/images/2022-05-12-Python-Photo/2022-05-12-Python-Photo3.png)
    
- 구성안과 설계도를 보고 클래스를 코드로 완성해보자.
    
    (메서드 구현은 자유롭게 한다)
    
<br/><br/>

### [내 풀이]

```python
# 부모: Item
#  - 속성: 이름(name), 가격(price), 무게(weight)
#  - 메서드: 판매하기(sale), 버리기(discard)
# 자식 1: WearableItem
#  - 속성: 착용효과(effect)
#  - 메서드: 착용하기(wear)
# 자식 2: Usable item
#  - 속성: 사용효과(effect)
#  - 메서드: 사용하기(use)

class Item:
    def __init__(self, name, price, weight, isdropable):
        self.name = name
        self.price = price
        self.weight = weight
        self.isdropable = isdropable
        print(f"{self.name} 아이템을 얻었습니다. 아이템 가격은 {self.price}원, 무게는 {self.weight} 입니다.")
    def sell(self):
        print(f"{self.name} 아이템을 {self.price}원에 판매했습니다.")
        self.isdropable = False
    def discard(self):
        if self.isdropable == True:
            print(f"{self.name} 아이템을 버렸습니다.")
        elif self.isdropable == False:
            print(f"{self.name} 아이템을 버릴 수 없습니다.")

class WearableItem(Item):
    def __init__(self, name, price, weight, isdropable):
        super().__init__(name, price, weight, isdropable)

    def wear(self):
        print(f"[{self.name}] 아이템을 착용했습니다.")
        self.effect = ("공격력이 +200 상승했습니다.", "속도가 +100 상승했습니다.")

class UsableItem(Item):
    def __init__(self, name, price, weight, isdropable):
        super().__init__(name, price, weight, isdropable)

    def use(self):
        print(f"[{self.name}] 아이템을 사용했습니다.")
        self.effect = ("체력이 +100 상승했습니다.")

sword = WearableItem("검", 10000, 10, True)
sword.sell()
sword.discard()

medicine = UsableItem("medicine", 1000, 0.5, True)
medicine.use()
```

- 착용, 사용효과는 아이템마다 상이하므로 변수로 빼주어야한다.

<br/>

- 실행결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter8/06-1.실습문제8.1.1.py
검 아이템을 얻었습니다. 아이템 가격은 10000원, 무게는 10 입니다.
검 아이템을 10000원에 판매했습니다.
검 아이템을 버릴 수 없습니다.
medicine 아이템을 얻었습니다. 아이템 가격은 1000원, 무게는 0.5 입니다.
[medicine] 아이템을 사용했습니다.
```

<br/><br/>

### [강의 해설]

```python
# 클래스 생성

class Item:
    def __init__(self, name, price, weight, isdropable):
        self.name = name
        self.price = price
        self.weight = weight
        self.isdropable = isdropable
    
    def sale(self):
        print(f"[{self.name} 판매가격은 [{self.price}]입니다.]")
    
    def discard(self):
        if self.isdropable:
            print(f"[{self.name} 버렸습니다.]")
        else:
            print(f"[{self.name}] 버릴 수 없습니다.")
    
class WearbleItem(Item):
    def __init__(self, name, price, weight, isdropable, effect):
        super().__init__(name, price, weight, isdropable)
        self.effect = effect
    def wear(self):
        print(f"[{self.name}] 착용했습니다. {self.effect}")

class UsableItem(Item):
    def __init__(self, name, price, weight, isdropable, effect):
        super().__init__(name, price, weight, isdropable):
        self.effect = effect
    
    def use(self):
        print(f"[{self.name}]. {self.effect}")

# 인스턴스 생성
sword = WearbleItem("이가닌자의검", 30000, 3.5, True, "체력 5000 증가, 마력 5000 증가")
sword.wear()
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter8/06-2.실습문제8.1.1-해설.p
y
[이가닌자의검] 착용했습니다. 체력 5000 증가, 마력 5000 증가
```

<br/>

- 부모클래스의 메서드도 잘 상속받아왔는지 확인해보자.

```python
# 클래스 생성

class Item:
    def __init__(self, name, price, weight, isdropable):
        self.name = name
        self.price = price
        self.weight = weight
        self.isdropable = isdropable
    
    def sale(self):
        print(f"[{self.name} 판매가격은 [{self.price}]입니다.]")
    
    def discard(self):
        if self.isdropable:
            print(f"[{self.name} 버렸습니다.]")
        else:
            print(f"[{self.name}] 버릴 수 없습니다.")
    
class WearbleItem(Item):
    def __init__(self, name, price, weight, isdropable, effect):
        super().__init__(name, price, weight, isdropable)
        self.effect = effect
    def wear(self):
        print(f"[{self.name}] 착용했습니다. {self.effect}")

class UsableItem(Item):
    def __init__(self, name, price, weight, isdropable, effect):
        super().__init__(name, price, weight, isdropable)
        self.effect = effect
    
    def use(self):
        print(f"[{self.name}]. {self.effect}")

# 인스턴스 생성
sword = WearbleItem("이가닌자의검", 30000, 3.5, True, "체력 5000 증가, 마력 5000 증가")
sword.wear()
sword.sale()
sword.discard()
```

<br/>

- 실행결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter8/06-2.실습문제8.1.1-해설.p
y
[이가닌자의검] 착용했습니다. 체력 5000 증가, 마력 5000 증가
[이가닌자의검 판매가격은 [30000]입니다.]
[이가닌자의검 버렸습니다.]
```

- 부모클래스의 메서드인 sale, discard 모두 실행 가능함을 알 수 있다.

<br/>

- UsableItem & 버릴 수 없는 아이템을 생성해보자.

```python
# 클래스 생성

class Item:
    def __init__(self, name, price, weight, isdropable):
        self.name = name
        self.price = price
        self.weight = weight
        self.isdropable = isdropable
    
    def sale(self):
        print(f"[{self.name} 판매가격은 [{self.price}]입니다.]")
    
    def discard(self):
        if self.isdropable:
            print(f"[{self.name} 버렸습니다.]")
        else:
            print(f"[{self.name}] 버릴 수 없습니다.")
    
class WearbleItem(Item):
    def __init__(self, name, price, weight, isdropable, effect):
        super().__init__(name, price, weight, isdropable)
        self.effect = effect
    def wear(self):
        print(f"[{self.name}] 착용했습니다. {self.effect}")

class UsableItem(Item):
    def __init__(self, name, price, weight, isdropable, effect):
        super().__init__(name, price, weight, isdropable)
        self.effect = effect
    
    def use(self):
        print(f"[{self.name}]. {self.effect}")

# 인스턴스 생성
potion = UsableItem("신비한투명물약", 150000, 0.1, False, "투명효과 300초 지속")
potion.discard()
potion.sale()
potion.use()
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter8/06-2.실습문제8.1.1-해설.p
y
[신비한투명물약] 버릴 수 없습니다.
[신비한투명물약 판매가격은 [150000]입니다.]
[신비한투명물약]. 투명효과 300초 지속
```

<br/><br/>

이번 포스팅에서는 실습문제를 풀어보았다. 다음 포스팅에서는 모듈에 대해서 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**