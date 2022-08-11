---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 16일차'
date: '2022-05-03 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 6-1. 함수개념을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-03-Python-Photo1](/assets/images/2022-05-03-Python-Photo/2022-05-03-Python-Photo1.jpg)

![2022-05-03-Python-Photo2](/assets/images/2022-05-03-Python-Photo/2022-05-03-Python-Photo2.jpg)

<br/><br/>

# 1. 함수 개념

- 재사용성이 좋아지고
- 유지보수가 편리해지고
- 가독성이 좋아진다

<br/>

## 1. 함수 개념

- 함수를 사용하지 않은 경우

```python
# 함수를 사용하지 않은 경우
print("안녕하세요, 동준님")
print("현재 프리미엄서비스 사용기간이 30일 남았습니다.")

print("안녕하세요. 현식님")
print("현재 프리미엄 서비스 사용기간이 15일 남았습니다.")

print("안녕하세요. 원준님")
print("현재 프리미엄 서비스 사용기간이 7일 남았습니다.")
```

<br/>

- 함수를 사용한 경우: printMessage라는 함수를 정의

```python
# 함수를 사용한 경우
def printMessage(name, date):
    print("안녕하세요.", name, "님")
    print("현재 프리미엄 서비스 사용기간이 ", date, "일 남았습니다.")

printMessage("동준", 30)
printMessage("현식", 15)
printMessage("원준", 7)
```

<br/>

### 1. 재사용성: 코드를 다시 사용할 때 얼마나 간편한가

- 함수를 사용하지 않은 경우
    
    ```python
    # 함수를 사용하지 않은 경우
    print("안녕하세요, 동준님")
    print("현재 프리미엄서비스 사용기간이 30일 남았습니다.")
    
    print("안녕하세요. 현식님")
    print("현재 프리미엄 서비스 사용기간이 15일 남았습니다.")
    
    print("안녕하세요. 원준님")
    print("현재 프리미엄 서비스 사용기간이 7일 남았습니다.")
    
    print("안녕하세요. 길동님")
    print("현재 프리미엄 서비스 사용기간이 7일 남았습니다.")
    ```
    
    - 함수를 복사 붙여넣기 한 뒤
    - 직접 타이핑해 이름과 남은 일자를 적어준다.

<br/>

- 함수를 사용한 경우
    
    ```python
    # 함수를 사용한 경우
    def printMessage(name, date):
        print("안녕하세요.", name, "님")
        print("현재 프리미엄 서비스 사용기간이 ", date, "일 남았습니다.")
    
    printMessage("동준", 30)
    printMessage("현식", 15)
    printMessage("원준", 7)
    printMessage("길동", 7)
    ```
    
    - 함수 호출 부분만 적어주고 이름과 남은 기간만 넘겨주면 된다.

<br/><br/>

### 2. 유지보수성: 코드를 수정할 때 얼마나 간편한가

- 함수를 사용하지 않은 경우
    
    ```python
    # 함수를 사용하지 않은 경우
    print("안녕하세요, 동준님")
    print("현재 프리미엄서비스 사용기간이 30일 남았습니다.")
    
    print("안녕하세요. 현식님")
    print("현재 프리미엄 서비스 사용기간이 15일 남았습니다.")
    
    print("안녕하세요. 원준님")
    print("현재 프리미엄 서비스 사용기간이 7일 남았습니다.")
    
    print("안녕하세요. 길동님")
    print("현재 프리미엄 서비스 사용기간이 7일 남았습니다.")
    ```
    
    - 모든 부분을 하나하나 찾아 직접 바꿔주어야 한다.

<br/> 

- 함수를 사용한 경우
    
    ```python
    printMessage("동준", 30)
    printMessage("현식", 15)
    printMessage("원준", 7)
    printMessage("길동", 7)
    ```
    
    - 함수는 그대로 두고 호출 부분만 바꿔주면 된다.
    - 보기 쉽고, 찾기 쉽다.

<br/><br/>

### 3. 가독성: 코드를 읽고 이해하기 쉽다.

- 함수를 사용하지 않은 경우
    
    ```python
    # 함수를 사용하지 않은 경우
    print("안녕하세요, 동준님")
    print("현재 프리미엄서비스 사용기간이 30일 남았습니다.")
    
    print("안녕하세요. 현식님")
    print("현재 프리미엄 서비스 사용기간이 15일 남았습니다.")
    
    print("안녕하세요. 원준님")
    print("현재 프리미엄 서비스 사용기간이 7일 남았습니다.")
    
    print("안녕하세요. 길동님")
    print("현재 프리미엄 서비스 사용기간이 7일 남았습니다.")
    ```
    
    - 코드가 길어져 이해하기 쉽지 않다.

<br/>

- 함수를 사용한 경우
    
    ```python
    # 함수를 사용한 경우
    def printMessage(name, date):
        print("안녕하세요.", name, "님")
        print("현재 프리미엄 서비스 사용기간이 ", date, "일 남았습니다.")
    
    printMessage("동준", 30)
    printMessage("현식", 15)
    printMessage("원준", 7)
    printMessage("길동", 7)
    ```
    
    - 코드가 간결해 이해하기 쉽다.

<br/><br/>

## 2. 함수의 기본 형태

```python
# 정의하기(define)
def 함수이름():
    명령블록

# 호출하기
함수이름()
```

<br/>

- 예시

```python
def printHello():
    print("Hello")

printHello()
```

- Hello를 출력하는 함수를 생성한 뒤, 호출.

<br/><br/>

## 3. 매개변수가 있는 함수

```python
# 정의하기
def 함수이름(매개변수1, 매개변수2):
    명령블록

# 호출하기
함수이름(인자1, 인자2)
```

- 매개변수: 함수 안에서 쓰일 데이터를 받는 역할 ( `,` 로 구분된다)
- 인자: 매개변수 안에 들어갈 데이터

<br/>

- 예시

```python
# 정의하기 
def sum(a, b):
    print(a + b)

# 호출하기
sum(3, 4)
```

- 화면에 7이 출력된다.

<br/><br/>

## 4. 반환값이 있는 함수

```python
# 정의하기
def 함수이름():
    명령블록
    return 반환값

# 호출하기
함수이름()
```

<br/>

- 예시

```python
# 정의하기
def getRandomNumber():
    number = random.randint(1,10)
    return number

# 호출하기
getRandomNumber()
```

<br/><br/>

## 5. 매개변수와 반환값이 있는 함수

```python
# 정의하기
def 함수이름(매개변수1, 매개변수2):
    명령블록
    return 반환값

# 호출하기
함수이름(인자1, 인자2)
```

<br/>

- 예시

```python
# 정의하기
def sum(a, b):
    result = a + b
    return result

# 호출하기
sum(3, 4)
```

- 화면에 7이 출력되지 않고 sum에 7 값이 저장된다.

<br/><br/>

## 6. 실습

### 1. 기본형

```python
# 기본형
# 1. 정의하기
def printHello():
    print("Hello")

# 2. 호출하기
printHello()
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter6/02.함수실습.py
Hello
```

<br/><br/>

### 2. 매개변수가 있는 함수

```python
# 매개변수가 있는 함수
def sum(a, b):
    print(a + b)

sum(3, 4)
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter6/02.함수실습.py
7
```

<br/><br/>

### 3. 반환값이 있는 함수

```python
# 반환값이 있는 함수
import random # random 모듈을 호출
def getRandomNumber():
    number = random.randint(1, 10)
    return number

print(getRandomNumber())
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/jinipark/Documents/pyt
hon_basic/myvenv/bin/python /Users/jinipark/Documents/
python_basic/myvenv/Chapter6/02.함수실습.py
5
```

<br/><br/>

### 4. 매개변수와 반환값이 있는 함수

```python
# 매개변수와 반환값이 있는 함수
def add(a, b):
    result = a + b
    return result

print(add(5, 6))
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter6/02.함수실습.py
11
```

<br/>

이번 포스팅에서는 함수 개념을 정리해보았다. 다음 포스팅에서는 함수 실습문제(1)를 풀어보도록 하자.

<br/><br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**