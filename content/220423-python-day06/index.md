---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 6일차'
date: '2022-04-23 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 4-3. 입력과 자료형 변환 강의를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-04-23-Python-Photo1](/assets/images/2022-04-23-Python-Photo/2022-04-23-Python-Photo1.jpg)

![2022-04-23-Python-Photo2](/assets/images/2022-04-23-Python-Photo/2022-04-23-Python-Photo2.jpg)

<br/><br/>

# 3. 입력과 자료형 변환

## 1. 데이터 입력 받기

- 입력 함수: `input()`
- 사용자로부터 데이터를 입력 받는 함수
- 예시 1
    - 아래 코드를 파이썬 인터프리터가 어떻게 해석하고 실행할까?
    - 파이썬 인터프리터: 파이썬 소스코드를 해석 & 실행
    
    ```python
    x = input()
    
    ```
    
    **[파이썬 코드 실행 순서]**
    
    - 할당연산자 (=) **오른쪽**부터 실행
    - input 함수 실행 시, **입력**을 기다린다
    - 사용자가 데이터를 입력하고 **엔터**를 치면
    - **input 함수** 자리에 데이터가 들어간다.
    - x에 **데이터가 할당**된다.

<br/><br/>

- 예시 2
    
    ```python
    x = input("입력하세요 >>> ")
    ```
    
    - `입력하세요 >>>` : 입력을 유도하게끔 하는 안내문
    
    <br/><br/>
    
    **[파이썬 코드 실행 순서]**
    
    1. 할당연산자 (=) 오른쪽부터 실행
    2. input 함수 실행 시, **메시지를 출력**하고 입력을 기다린다.
    3. 사용자가 데이터를 입력하고 엔터를 치면
    4. input 함수 자리에 데이터가 들어간다.
    5. x에 데이터가 할당된다.

<br/><br/>

## [실습문제 4.3.1]

- 사용자로부터 2개의 숫자(20, 40)를 입력 받고, 더한 결과를 출력하기
- 먼저 푼 뒤 강의 이어 들을 것
- 내가 푼 결과
    
    ```python
    NumOne = input("첫번째 숫자를 입력하세요 >>> ")
    NumTwo = input("두번째 숫자를 입력하세요 >>> ")
    
    result = int(NumOne) + int(NumTwo)
    print(result)
    ```
    

<br/><br/>

- 강의 해설
    
    ```python
    # 실습문제 4.3.1
    # 사용자로부터 두 개의 숫자를 입력 받고,
    # 더한 결과를 출력하기
    
    x = input("첫번째 숫자를 입력하세요 >>>")
    y = input("두번째 숫자를 입력하세요 >>>")
    
    result = x + y
    print(result)
    ```
    
    ⇒ 코드를 실행한 뒤 차례로 20, 40의 입력값을 넣고 엔터를 치면 “2040”라는 결과값이 출력된다.
    

<br/><br/>

- 자료형을 확인해본다
    
    ```python
    # 자료형 확인하기 : type(x)
    # str = string = 문자열
    print(type(x))
    ```
    
    - <class ‘str’>라는 결과값이 출력된다. 즉, x의 자료형은 문자열이다.
    
    <br/><br/>
    
    ```python
    # 숫자형으로 변환
    # int 함수를 사용 : int(데이터)
    result = int(x) + int(y)
    print(result)
    ```
    
    - x, y 값을 정수로 변환해주면 정상적으로 작동한다.

<br/><br/>

## [실습문제 4.3.2]

사용자로부터 태어난 연도를 입력 받으면, 현재 나이를 출력하기

- 표준 입력: 태어난 연도를 입력하세요 >>> 1994
- 표준 출력: 현재 나이는 29세입니다.
- 내가 푼 방법

```python
birth_year = input("태어난 연도를 입력하세요 >>> ")
current_year = 2022
current_age = current_year - int(birth_year)

result = "현재 나이는" + str(current_age) + "세 입니다."
print(result)
```

- 수정이 필요한 부분: 현재 나이를 계산할 때에는 현재연도 - 출생연도에 1을 더해주어야한다.

<br/><br/>

- 강의 해설
    
    ```python
    year = input("태어난 연도를 입력하세요 >>> ")
    age = 2022 - year + 1
    print("현재나이는", age, "세 입니다.")
    ```
    
    - 해당 함수 실행 시 `TypeError: unsupported operator type(s) for : 'int' and 'str'` 에러 발생
    - input으로 받은 값이 str이기 때문에 age에서 숫자 연산이 불가능
    
    - year를 정수형으로 변환한다.
    
    ```python
    // 바로 int로 감싸도 됨
    year = int(input("태어난 연도를 입력하세요 >>> "))
    
    age = 2022 - year + 1
    print("현재나이는", age, "세 입니다.")
    ```
    
    - 해당 함수 실행 및 태어난 연도를 입력하면 “현재나이는 `현재나이` 세 입니다"라는 결과가 나온다.
    
    <br/><br/>
    
    ## 2. 정리
    
    1. 사용자로부터 입력받기: `input("입력할 시 출력할 메시지"))
    2. 자료형변환: 숫자형으로 변환(int(데이터))

<br/><br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/><br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/><br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**