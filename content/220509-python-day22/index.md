---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 22일차'
date: '2022-05-09 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 8-2. 생성자를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-09-Python-Photo1](/assets/images/2022-05-09-Python-Photo/2022-05-09-Python-Photo1.jpg)

![2022-05-09-Python-Photo2](/assets/images/2022-05-09-Python-Photo/2022-05-09-Python-Photo2.jpg)

<br/><br/>

# 1. 생성자

## 1. 클래스와 객체의 개념

- 클래스 = 속성 + 메서드(method)
    
    ![2022-05-09-Python-Photo3](/assets/images/2022-05-09-Python-Photo/2022-05-09-Python-Photo3.png)
    
    - 속성: 특징들을 나타낸 것
    - 메서드: 동작들을 나타낸 것

    <br/>
    
## 2. 속성 추가하기
    
- Monster 클래스에 속성을 추가해보자.
    
    ```python
    class Monster:
        def say(self):
            print("나는 몬스터다")
    ```
    
<br/>

    1. 체력
    2. 공격력
    3. 이동속도
    
```python
class Monster:
    def __init__(self, health, attack, speed):
        self.health = health
        self.attack = attack
        self.speed = speed

goblin = Monster(800, 120, 300) #인스턴스 생성 시점
wolf = Monster(1500, 200, 350)
```
    
- `__init__` : 인스턴스를 만들 때 반드시, 가장먼저 호출되는 메서드
- goblin 인스턴스를 생성할때, 800, 120, 300는 `__init__` 메서드의 인자(argument)로 들어가게 된다.
- `self` : 인스턴스 자기자신을 뜻함. 매개변수 아님.

<br/><br/>
    
## 3. 메서드 추가하기
    
- Monster 클래스에 메서드를 추가해보자.
    
    ```python
    class Monster:
        def __init__(self, health, attack, speed):
            self.health = health
            self.attack = attack
            self.speed = speed
    
    goblin = Monster(800, 120, 300)
    wolf = Monster(1500, 200, 350)
    ```
    
    1. 체력 감소하기
    2. 체력 가져오기
    
<br/>

- 추가 메서드를 적용하면 아래와 같다.
    
    ```python
    class Monster:
        def __init__(self, health, attack, speed):
            self.health = health
            self.attack = attack
            self.speed = speed
        def decrease_health(self, num):
            self.health -= num
        def get_health(self):
            return self.health
    
    goblin = Monster(800, 120, 300)
    
    goblin.decrease_health(100)
    print(gobling.get_health())
    ```

<br/>

## 4. 실습
    
- 위에서 배운 내용을 실제 vscode에 입력해보자.
    
    ```python
    # 생성자
    # : 인스턴스를 만들 때 호출되는 메서드
    
    class Monster:
        def __init__(self, health, attack, speed):
            self.health = health
            self.attack = attack
            self.speed = speed
        def decrease_health(self, num):
            self.health -= num
        def get_health(self):
            return self.health
    
    # 고블린 인스턴스 생성
    goblin = Monster(800, 120, 300)
    goblin.decrease_health(100)
    print(goblin.get_health())
    ```
<br/>
  
- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter8/03.생성자.py
700
```

<br/>

- 늑대 인스턴스를 추가로 생성해보자.

```python
# 생성자
# : 인스턴스를 만들 때 호출되는 메서드

class Monster:
    def __init__(self, health, attack, speed):
        self.health = health
        self.attack = attack
        self.speed = speed
    def decrease_health(self, num):
        self.health -= num
    def get_health(self):
        return self.health

# 고블린 인스턴스 생성
goblin = Monster(800, 120, 300)
goblin.decrease_health(100)
print(goblin.get_health())

# 늑대 인스턴스 생성
wolf = Monster(1500, 200, 350)
wolf.decrease_health(1000)
print(wolf.get_health())
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter8/03.생성자.py
700
500
```

- 늑대 인스턴스에 health = 1500, attack = 200, speed = 350이 할당
- decrease_health 함수로 health가 1000이 감소
- get_health 함수로 현재 health값 저장 및 print로 출력

<br/><br/>

이번 포스팅에서는 생성자의 개념에 대해 알아보았다. 다음 포스팅에서는 상속에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**