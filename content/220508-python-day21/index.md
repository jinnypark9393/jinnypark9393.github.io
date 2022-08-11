---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 21일차'
date: '2022-05-08 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 7-2. 딕셔너리를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-08-Python-Photo1](/assets/images/2022-05-08-Python-Photo/2022-05-08-Python-Photo1.jpg)

![2022-05-08-Python-Photo2](/assets/images/2022-05-08-Python-Photo/2022-05-08-Python-Photo2.jpg)

<br/><br/>

# 1. 클래스와 객체

## 1. 클래스와 객체의 개념

- 클래스: 객체를 만들기 위한 **설계도**
- 객체: 설계도로부터 만들어낸 **제품**

<br/>

- 실습

```python
# 클래스를 사용하는 이유
champion1_name = "이즈리얼"
champion1_health = 700
champion1_attack = 90

print(f"{champion1_name}님 소환사의 협곡에 오신것을 환영합니다.")

champion2_name = "리신"
champion2_health = 800
champion2_attack = 95

print(f"{champion2_name}님 소환사의 협곡에 오신것을 환영합니다.")

def basic_attack(name, attack):
    print(f"{name} 기본공격 {attack}")

basic_attack(champion1_name, champion1_attack)
basic_attack(champion2_name, champion2_attack)
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter8/01.클래스개념.py
이즈리얼님 소환사의 협곡에 오신것을 환영합니다.
리신님 소환사의 협곡에 오신것을 환영합니다.
이즈리얼 기본공격 90
리신 기본공격 95
```

<br/>

- 위의 프로그램을 클래스로 만들어보자

```python
print("=============클래스를 사용한 경우=============")

class Champion:
    def __init__(self, name, health, attack):
        self.name = name
        self.health = health
        self.attack = attack
        print(f"{name}님 소환사의 협곡에 오신것을 환영합니다.")
    def basic_attack(self):
        print(f"{self.name} 기본공격 {self.attack}")

ezreal = Champion("이즈리얼", 700, 90)
leesin = Champion("리신", 800, 95)
ezreal.basic_attack()
leesin.basic_attack()
```

<br/>

- 챔피언을 하나 더 추가해야하는 경우: **클래스 미사용**

```python
# 클래스를 사용하는 이유
champion1_name = "이즈리얼"
champion1_health = 700
champion1_attack = 90

print(f"{champion1_name}님 소환사의 협곡에 오신것을 환영합니다.")

champion2_name = "리신"
champion2_health = 800
champion2_attack = 95

print(f"{champion2_name}님 소환사의 협곡에 오신것을 환영합니다.")

#### 추가 및 수정이 필요한 부분 ####
champion3_name = "야스오"
champion3_health = 750
champion3_attack = 92

print(f"{champion3_name}님 소환사의 협곡에 오신것을 환영합니다.")
#### /추가 및 수정이 필요한 부분 ####

def basic_attack(name, attack):
    print(f"{name} 기본공격 {attack}")

basic_attack(champion1_name, champion1_attack)
basic_attack(champion2_name, champion2_attack)
basic_attack(champion3_name, champion3_attack) #### 추가 및 수정이 필요한 부분
```

<br/>

- 챔피언을 하나 더 추가해야하는 경우: **클래스 사용**

```python
print("=============클래스를 사용한 경우=============")

class Champion:
    def __init__(self, name, health, attack):
        self.name = name
        self.health = health
        self.attack = attack
        print(f"{name}님 소환사의 협곡에 오신것을 환영합니다.")
    def basic_attack(self):
        print(f"{self.name} 기본공격 {self.attack}")

ezreal = Champion("이즈리얼", 700, 90)
leesin = Champion("리신", 800, 95)
yasuo = Champion("야스오", 750, 92) # 추가 및 수정이 필요한 부분

ezreal.basic_attack()
leesin.basic_attack()
yasuo.basic_attack() # 추가 및 수정이 필요한 부분
```

<br/>

- 클래스를 사용하면 단 두줄만 수정하면 된다 ⇒ 객체를 많이 생산해내야 할 수 록 클래스 사용이 효율적

- 클래스 = 속성 + 메서드(method)
    
    ![2022-05-08-Python-Photo3](/assets/images/2022-05-08-Python-Photo/2022-05-08-Python-Photo3.png)
    
    - 속성: 특징들을 나타낸 것
    - 메서드: 동작들을 나타낸 것
    
<br/><br/>

## 2. 클래스 만들기

```python
class 클래스이름
    def 메서드이름(self):
       명령블록

# 예시
class Monster:
    def say(self):
        print("나는 몬스터다")
```

<br/>

- 만든 클래스를 호출하기

```python
# 호출하기
인스턴스 = 클래스이름()
인스턴스.메서드()

# 예시
goblin = Monster()
goblin.say()
```

- 인스턴스: 클래스와 연관지어 표현할 때 자주 사용하는 표현(객체와 유사)

<br/><br/>

## 3. 실습

- 파이썬에서는 자료형도 클래스다

```python
class Monster:
    def say(self):
        print("나는 몬스터다!")

goblin = Monster()
goblin.say()

# 파이썬에서는 자료형도 클래스다
a = 10
b = "문자열객체"
c = True
```

<br/>

- 결과 출력

```python
(myvenv) ➜  python_basic /Users/jinipark/Documents/pyt
hon_basic/myvenv/bin/python /Users/jinipark/Documents/
python_basic/myvenv/Chapter8/02.클래스만들기.py
나는 몬스터다!
<class 'int'>
<class 'str'>
<class 'bool'>
```

<br/>

- 각 자료형이 class로 출력되는 것을 알 수 있다.

```python
print(b.__dir__())
```

- 문자열 객체에 대해 생성할 수 있는 메서드 확인

<br/>

- 출력 확인

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
['__new__', '__repr__', '__hash__', '__str__', '__getattribute__', '__lt__', '__le__', '__eq__', '__ne__', '__gt__', '__ge__', '__iter__', '__mod__', '__rmod__', '__len__', '__getitem__', '__add__', '__mul__', '__rmul__', '__contains__', 'encode', 'replace', 'split', 'rsplit', 'join', 'capitalize', 'casefold', 'title', 'center', 'count', 'expandtabs', 'find', 'partition', 'index', 'ljust', 'lower', 'lstrip', 'rfind', 'rindex', 'rjust', 'rstrip', 'rpartition', 'splitlines', 'strip', 'swapcase', 'translate', 'upper', 'startswith', 'endswith', 'removeprefix', 'removesuffix', 'isascii', 'islower', 'isupper', 'istitle', 'isspace', 'isdecimal', 'isdigit', 'isnumeric', 'isalpha', 'isalnum', 'isidentifier', 'isprintable', 'zfill', 'format', 'format_map', '__format__', 'maketrans', '__sizeof__', '__getnewargs__', '__doc__', '__setattr__', '__delattr__', '__init__', '__reduce_ex__', '__reduce__', '__subclasshook__', '__init_subclass__', '__dir__', '__class__']
```

<br/><br/>

이번 포스팅에서는 클래스와 객체의 개념에 대해 알아보았다. 다음 포스팅에서는 생성자에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**