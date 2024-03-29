---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 55일차'
date: '2022-06-11 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 여러가지 속성을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-11-Python-Photo1](/assets/images/2022-06-11-Python-Photo/2022-06-11-Python-Photo1.jpg)

![2022-06-11-Python-Photo2](/assets/images/2022-06-11-Python-Photo/2022-06-11-Python-Photo2.jpg)

<br/><br/>

# 02. 여러가지 속성

## 1. 인스턴스 속성

- 객체마다 다르게 가지는 속성

```python
class Unit:
    # 생성자 (constructor)
    # 객체를 생성할 떄 호출되는 메서드
    def __init__(self, name, hp, shield, demage):
        **self.name = name # self 는 객체 자기 자신을 의미
        self.hp = hp
        self.shield = shield
        self.demage = demage**
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
```

- `self.xx` 라고 되어있는 부분이 인스턴스 속성을 가리키는 부분
- **인스턴스 속성 사용법**
    - 클래스 안: `self.속성명`
    - 클래스 밖: `객체명.속성명`

<br/><br/>

## 2. 클래스 속성

- 모든 객체가 공유하는 속성

```python
class Unit:
    **count = 0**
    def __init__(self, name, hp, shield, demage):
        self.name = name # self 는 객체 자기 자신을 의미
        self.hp = hp
        self.shield = shield
        self.demage = demage
        **Unit.count += 1**
```

- 생성된 유닛 개수를 세는 속성을 생성해보자 ⇒ 클래스 속성
- 생성자 바깥에 속성 정의 + 생성자 마지막 속성 뒤에 Unit.count 작성
- **클래스 속성 사용법**:
    - 클래스 안: `클래스명.속성명`
    - 클래스 밖: `클래스명.속성명`

<br/><br/>

## 3. 비공개 속성

- 클래스 안에서만 접근 가능한 속성

```python
class Unit:
    def __init__(self, name, hp, shield, demage):
        self.name = name # self 는 객체 자기 자신을 의미
        **self.__hp = hp**
        self.shield = shield
        self.demage = demage

probe = Unit("프로브", 20, 20, 5)
zealot = Unit("질럿", 100, 60, 16)
dragoon = Unit("드라군", 100, 80, 20)
```

- hp라는 속성을 클래스 외부에서 접근할 수 없도록 만들 때 사용
- `zealot.__hp = 9999` 로 변경 불가

<br/><br/>

## 4. 실습

### 1. 인스턴스 속성

```python
class Unit:
    """
    인스턴스 속성 : 이름, 체력, 방어막, 공격력
    -> 객체마다 다른 값을 가지는 속성
    """
    def __init__(self, name, hp, shield, demage):
        self.name = name 
        self.hp = hp
        self.shield = shield
        self.demage = demage
        print(f"[{self.name}](이)가 생성 되었습니다.")
    def __str__(self):
        return f"[{self.name}] 체력 : {self.hp} 실드: {self.shield} 공격력: {self.demage}"

probe = Unit("프로브", 20, 20, 5)
zealot = Unit("질럿", 100, 60, 16)
dragoon = Unit("드라군", 100, 80, 20)

# 인스턴스 속성 수정
probe.demage += 1
print(probe)
```

- `self.name` , `self.hp` , `self.shield` , `self.demage` ⇒ 인스턴스 속성
- **인스턴스(객체)마다 다른 값을 가진다.**
    - 예: probe, zealot, dragoon은 각각 다른 이름, 체력, 방어막, 공격력을 가진다
- 클래스 외부에서 접근 시에는 `객체명.속성명` (예: `probe.demage`)으로 접근한다.

<br/>

- 실행결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/jinipark/usr/pyt
hon_advanced/myvenv/Chapter04/02.여러가지속성.py
[프로브](이)가 생성 되었습니다.
[질럿](이)가 생성 되었습니다.
[드라군](이)가 생성 되었습니다.
[프로브] 체력 : 20 실드: 20 공격력: 6
```

<br/><br/>

### 2. 클래스 속성

```python
class Unit:
    """
    인스턴스 속성 : 이름, 체력, 방어막, 공격력
    -> 객체마다 다른 값을 가지는 속성

    클래스 속성 : 전체 유닛 개수
    -> 모든 객체가 공유하는 속성
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

# 인스턴스 속성 수정
probe.demage += 1
print(probe)

# 전체 유닛 개수
print(Unit.count)
```

- 클래스 속성 `count` 를 생성해보자(생성자 앞에서 생성)
- **모든 객체가 공유하는 속성이다.**
- `클래스명.클래스속성` 으로 호출할 수 있다.
    - 예: `Unit.count`

<br/>

- 실행결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/jinipark/usr/pyt
hon_advanced/myvenv/Chapter04/02.여러가지속성.py
[프로브](이)가 생성 되었습니다.
[질럿](이)가 생성 되었습니다.
[드라군](이)가 생성 되었습니다.
[프로브] 체력 : 20 실드: 20 공격력: 6
3
```

<br/><br/>

### 3. 비공개 속성

```python
class Unit:
    """
    인스턴스 속성 : 이름, 체력, 방어막, 공격력
    -> 객체마다 다른 값을 가지는 속성

    클래스 속성 : 전체 유닛 개수
    -> 모든 객체가 공유하는 속성

    비공개 속성 : 
    -> 클래스 안에서만 사용 가능한 속성
    """
    count = 0
    def __init__(self, name, hp, shield, demage):
        self.name = name 
        self.__hp = hp
        self.shield = shield
        self.demage = demage
        Unit.count += 1
        print(f"[{self.name}](이)가 생성 되었습니다.")
    def __str__(self):
        return f"[{self.name}] 체력 : {self.__hp} 실드: {self.shield} 공격력: {self.demage}"

probe = Unit("프로브", 20, 20, 5)
zealot = Unit("질럿", 100, 60, 16)
dragoon = Unit("드라군", 100, 80, 20)

# 인스턴스 속성 수정
probe.demage += 1
print(probe)

# 비공개 속성 접근
probe.__hp = 9999
print(probe)

# 전체 유닛 개수
print(Unit.count)
```

- 인스턴스 속성 hp를 비공개 속성으로 바꾸어 보자(`self.__hp`)
- **클래스 안에서만 사용 가능한 속성이다.**
- 클래스 안에서 선언 시 `__` 를 속성명 앞에 붙여준다.

<br/>

- 실행결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/jinipark/usr/pyt
hon_advanced/myvenv/Chapter04/02.여러가지속성.py
[프로브](이)가 생성 되었습니다.
[질럿](이)가 생성 되었습니다.
[드라군](이)가 생성 되었습니다.
[프로브] 체력 : 20 실드: 20 공격력: 6
[프로브] 체력 : 20 실드: 20 공격력: 6
3
```

- 클래스 외부에서 hp 속성에 접근할 수 없다.

<br/>

- 네임 맹글링(name mangling)을 이용해 접근해보자.

```python
class Unit:
    """
    인스턴스 속성 : 이름, 체력, 방어막, 공격력
    -> 객체마다 다른 값을 가지는 속성

    클래스 속성 : 전체 유닛 개수
    -> 모든 객체가 공유하는 속성

    비공개 속성 : 
    -> 클래스 안에서만 사용 가능한 속성
    """
    count = 0
    def __init__(self, name, hp, shield, demage):
        self.name = name 
        self.__hp = hp
        self.shield = shield
        self.demage = demage
        Unit.count += 1
        print(f"[{self.name}](이)가 생성 되었습니다.")
    def __str__(self):
        return f"[{self.name}] 체력 : {self.__hp} 실드: {self.shield} 공격력: {self.demage}"

probe = Unit("프로브", 20, 20, 5)
zealot = Unit("질럿", 100, 60, 16)
dragoon = Unit("드라군", 100, 80, 20)

# 인스턴스 속성 수정
probe.demage += 1
print(probe)

# 비공개 속성 접근
probe.__hp = 9999
print(probe)

# 네임 맹글링 (name mangling)
probe._Unit__hp = 9999
print(probe)

# 전체 유닛 개수
print(Unit.count)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/jinipark/usr/pyt
hon_advanced/myvenv/Chapter04/02.여러가지속성.py
[프로브](이)가 생성 되었습니다.
[질럿](이)가 생성 되었습니다.
[드라군](이)가 생성 되었습니다.
[프로브] 체력 : 20 실드: 20 공격력: 6
[프로브] 체력 : 20 실드: 20 공격력: 6
[프로브] 체력 : 9999 실드: 20 공격력: 6
3
```

- 체력 속성 값이 변경되었다.
- **비공개 속성은 클래스 외부에서의 접근을 완전히 차단하는 것이 아닌, 이름 규칙을 까다롭게 만든 것이라는 것을 알 수 있다.**

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 여러가지 속성를 알아보았다. 다음 포스팅에서는 여러가지 메서드를 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**