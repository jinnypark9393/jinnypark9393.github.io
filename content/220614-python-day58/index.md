---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 58일차'
date: '2022-06-14 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 클래스 실습문제를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-14-Python-Photo1](/assets/images/2022-06-14-Python-Photo/2022-06-14-Python-Photo1.jpg)

![2022-06-14-Python-Photo2](/assets/images/2022-06-14-Python-Photo/2022-06-14-Python-Photo2.jpg)

<br/><br/>

# 05. 클래스 실습문제

## 실습문제 4.5.1

- Player 클래스를 구현해 보자.
    - 1) 속성: 닉네임, 미네랄, 가스, 유닛리스트
    - 예시
        
        ```python
        Player
        
        닉네임 : "Bisu"
        미네랄: 500
        가스: 200
        유닛 리스트: [프로브, 프로브, 질럿]
        ```
        
        - 유닛 리스트의 프로브, 질럿은 Unit 클래스로 만든 객체.
        
        ```python
        Unit
        
        이름 : "프로브"
        체력 : 20
        방어막 : 20
        공격력 : 5
        ```
        
        ```python
        Unit
        
        이름 : "프로브"
        체력 : 20
        방어막 : 20
        공격력 : 5
        ```
        
        ```python
        Unit
        
        이름 : "질럿"
        체력 : 100
        방어막 : 60
        공격력 : 16
        ```
        
        - 위와 같은 클래스간의 관계를 has-a 라고 한다.
            - **has-a**: Player has-a Unit (클래스가 다른 객체를 가지고 있는 형태)
                - Player가 여러 Unit을 갖고있음 ⇒ 1 : N 관계
            - **is-a**: Weapon is-a Item (서로 상속 시 발생: Weapon < Item)
    - 유닛 정보
        
        ```python
        unit_info = {
            "probe" : {
                "name" : "프로브",
                "mineral" : 50,
                "gas" : 0,
                "hp" : 20,
                "shield" : 20,
                "demage" : 5
            },
            "zealot" : {
                "name" : "질럿",
                "mineral" : 100,
                "gas" : 0,
                "hp" : 100,
                "shield" : 60,
                "demage" : 16
            },
            "dragoon" : {
                "name" : "드라군",
                "mineral" : 125,
                "gas" : 50,
                "hp" : 100,
                "shield" : 80,
                "demage" : 20
            },
        }
        ```
        
        - 메서드: 생산하기
            
            ```python
            produce(이름, 미네랄, 가스, 체력, 방어막, 공격력)
            
            - Player의 미네랄과 가스가 충분한 경우
             -> 유닛 객체를 생성하고 유닛 리스트에 추가한다.
            - Player의 미네랄이 부족한 경우
             -> "미네랄이 부족합니다"를 출력
            - Player의 가스가 부족한 경우
             -> "가스가 부족합니다"를 출력
            ```
            
## 강의 해설

```python
unit_info = {
    "probe" : {
        "name" : "프로브",
        "mineral" : 50,
        "gas" : 0,
        "hp" : 20,
        "shield" : 20,
        "demage" : 5
    },
    "zealot" : {
        "name" : "질럿",
        "mineral" : 100,
        "gas" : 0,
        "hp" : 100,
        "shield" : 60,
        "demage" : 16
    },
    "dragoon" : {
        "name" : "드라군",
        "mineral" : 125,
        "gas" : 50,
        "hp" : 100,
        "shield" : 80,
        "demage" : 20
    },
}

# 유닛 클래스
class Unit:
    """
    속성 : 이름, 체력, 방어막, 공격력
    """
    def __init__(self, name, hp, shield, demage):
        self.name = name
        self.hp = hp
        self.shield = shield
        self.demage = demage

# 플레이어 클래스
class Player:
    """
    속성 : 닉네임, 미네랄, 가스, 유닛리스트
    메서드 : 유닛 생산 하기
    """
    def __init__(self, nickname, mineral, gas, unit_list=[]):
        self.nickname = nickname
        self.mineral = mineral
        self.gas = gas
        self.unit_list = unit_list
    # 생산 하기
    def produce(self, name, mineral, gas, hp, shield, demage):
        if self.mineral - mineral < 0:
            print("미네랄이 부족합니다.")
        elif self.gas - gas < 0:
            print("가스가 부족합니다.")
        else:
            self.mineral -= mineral
            self.gas -= gas
            unit = Unit(name, hp, demage)
            self.unit_list.append(unit)
            print(f"[{name}]을(를) 생산합니다.")

# 플레이어 생성
player1 = Player("Bisu", 400, 10)

# 유닛 생성
player1.produce(unit_info['probe']['name'], unit_info['probe']['mineral'], unit_info['probe']['gas'], unit_info['probe']['demage'],
                unit_info['probe']['hp'], unit_info['probe']['shield'])

# 생성된 모든 유닛 확인
for unit in player1.unit_list:
    print(f"[{unit.name}] 체력 : {unit.hp} 방어막 : {unit.shield} 공격력 : {unit.demage}")
```

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 클래스 실습문제를 알아보았다. 다음 포스팅에서는 데이터베이스에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**