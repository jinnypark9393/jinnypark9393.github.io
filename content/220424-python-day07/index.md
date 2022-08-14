---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 7일차'
date: '2022-04-24 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 5-1. 조건문 개념 강의를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-04-24-Python-Photo1](/assets/images/2022-04-24-Python-Photo/2022-04-24-Python-Photo1.jpg)

![2022-04-24-Python-Photo2](/assets/images/2022-04-24-Python-Photo/2022-04-24-Python-Photo2.jpg)

<br/><br/>

# Ch05. 제어문

# 1. 조건문 개념

## 1. 제어문 사용 이유

- 프로그램은 기본적으로 **위에서 아래**로 순차적으로 실행
- 명령 A,B 중 한 개를 선택해 실행하고 싶거나 - **조건문**
- 명령들을 반복해 실행하고 싶을 때 - **반복문**
- 제어문 = 조건문 + 반복문

<br/>

- 예시1: 치킨 or 피자? - 조건문
- 예시2: 유투브 영상보기 - 반복문

<br/><br/>

## 2. 조건문의 개념

- 예시: 술집이나 클럽에 입장할 때 입장 가능 여부를 출력하는 조건문

<br/>

![2022-04-24-Python-Photo3.png](/assets/images/2022-04-24-Python-Photo/2022-04-24-Python-Photo3.png)

<br/>

- `start`: 시작
- `age` = 20: age에 20이라는 값을 저장
- `age > 19`: 조건문
- `입장 가능`: age가 19보다 클 경우
- `입장 불가능`: age가 19보다 크지 않을 경우
- `end`

<br/>

- 이 개념을 파이썬에 적용하면? **if문**

<br/><br/>

## 3. if 문 사용법

- **기존** 비밀번호 = “1234”
- **입력한** 비밀번호 = “1234”
- **만약** 비밀번호를 정확히 입력했으면
    
    ⇒ **로그인 성공**
    

<br/>

**[파이썬 코드]**

```python
origin_pass = "1234"
input_pass = "1234"
if origin_pass == input_pass:
    print("로그인 성공")
```

- `origin_pass = input_pass` : 비교연산자
- `:` : if의 명령블록이 실행된다는 뜻
- `print(”로그인 성공")` : if문의 명령블록임을 나타내기 위해 들여쓰기.

<br/><br/>

## 4. 실습

### 1. if와 else

```python
# 조건문
# : 조건에 따라 실행할 명령이 달라 지는 것

origin_pass = "1234"
input_pass = input("패스워드를 입력하세요 >>>")

if input_pass == origin_pass: # 조건 A
    # 조건 A가 참
    print("로그인 성공!")
    print("반갑습니다.")
else:
    # 조건 A가 거짓
    print("로그인 실패!")
    print("비밀번호를 확인하세요.")
```

- `else:` 조건 A가 거짓일 때 하위 명령블록 실행

<br/>

- 출력 결과

```python
# input_pass == 1234
# 조건 A가 참
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/01.조건문개념.py
패스워드를 입력하세요 >>>1234
로그인 성공!
반갑습니다.

# input_pass == 123
# 조건 A가 거짓
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/01.조건문개념.py
패스워드를 입력하세요 >>>123
로그인 실패!
비밀번호를 확인하세요.
```

<br/>

### 3. else if

```python
origin_pass = "1234"
input_pass = input("패스워드를 입력하세요 >>>")

if input_pass == origin_pass: # 조건 A
    # 조건 A가 참
    print("로그인 성공!")
    print("반갑습니다.")
elif input_pass == "":
    # 조건 A 거짓, 조건 B 참
    print("아무것도 입력하지 않았습니다.")
else:
    # 조건 A가 거짓, 조건 B 거짓
    print("로그인 실패!")
    print("비밀번호를 확인하세요.")
```

- elif = if 외의 조건을 새로 추가하고 싶을 때 사용
- elif는 if 바로 뒤에 입력해야한다.

<br/>

- 출력 결과

```python
# 조건 A가 참
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/01.조건문개념.py
패스워드를 입력하세요 >>>1234
로그인 성공!
반갑습니다.

# 조건 A 거짓, 조건 B 참
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/01.조건문개념.py
패스워드를 입력하세요 >>>
아무것도 입력하지 않았습니다.

# 조건 A가 거짓, 조건 B 거짓
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/01.조건문개념.py
패스워드를 입력하세요 >>>123
로그인 실패!
비밀번호를 확인하세요.
```

<br/><br/>

오늘 강의에서는 조건문 if의 개념과 간단한 사용법을 알아보았다. 다음 시간부터는 조건문 실습문제를 풀어보도록 하자.

<br/><br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**