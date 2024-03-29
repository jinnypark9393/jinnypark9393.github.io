---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 20일차'
date: '2022-05-07 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 7-2. 딕셔너리를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-07-Python-Photo1](/assets/images/2022-05-07-Python-Photo/2022-05-07-Python-Photo1.jpg)

![2022-05-07-Python-Photo2](/assets/images/2022-05-07-Python-Photo/2022-05-07-Python-Photo2.jpg)

<br/><br/>

# 02. 딕셔너리

## 1. 딕셔너리의 특징

- 시퀀스 자료형
- 키와 데이터를 가지고 있는 사전형 자료형
- 사전형태의 자료를 만들 때 편리

<br/><br/>

## 2. 딕셔너리 만들기

- 딕셔너리를 만들어보자.

```python
딕셔너리 = {키1 : 데이터1, 키2 : 데이터2}

# 예시
stock = {"삼성전자" : 82000, "LG전자" : 150000}

# 예시2: 리스트와 튜플도 들어갈 수 있다.
stock = {
    "삼성전자" : [81000, 81500, 82000, 81500, 82000],
    "LG전자" : (150000, 149000, 148000, 151000, 152000)
}
```

<br/><br/>

## 3. 딕셔너리 접근하기

```python
딕셔너리["키"]

# 예시
stock["삼성전자"] 
```
- 결과로는 85000이 출력된다.

<br/><br/>

## 4. 딕셔너리 할당하기, 삭제하기

- 딕셔너리를 할당, 삭제해보자.

```python
# 할당하기
딕셔너리["키"] = 데이터

# 예시
stock["삼성전자"] = 85000

# 삭제하기
del 딕셔너리["키"]

# 예시
del stock["삼성전자"]
```

<br/><br/>

## 5. 딕셔너리 함수

- 딕셔너리 함수를 사용해보자.

```python
stock = {
    "삼성전자" : 82000,
    "SK하이닉스" : 123000,
    "NAVER" : 370000,
    "카카오" : 133000
}

# 키와 데이터 쌍을 가져오기
stock.items()

# 키 값을 가져오기
stock.keys()

# 데이터를 가져오기
stock.values()
```

<br/><br/>

## 6. 실습

- 위에서 배운 내용들을 vscode로 실습해보자.

```python
# 딕셔너리
# : 사전형태의 자료형

stock_a = {"삼성전자" : 82000, "LG전자" : 150000}

stock_b = {
    "삼성전자" : [81000, 81500, 82000, 81500, 82000],
    "LG전자" : (150000, 149000, 148000, 151000, 152000)
}

# 중첩 딕셔너리
stock_c = {
    "삼성전자" : {
        "현재가" : 82000,
        "보유수량" : 5,
        "매수단가" : 81000
    }
}

print(stock_a)
print(stock_b)
print(stock_c)
```

- Tip: alt + shift + 방향키를 이용해 한 줄을 쉽게 복사할 수 있다.

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter7/02.딕셔너리.py
{'삼성전자': 82000, 'LG전자': 150000}
{'삼성전자': [81000, 81500, 82000, 81500, 82000], 'LG전자': (150000, 149000, 148000, 151000, 152000)}
{'삼성전자': {'현재가': 82000, '보유수량': 5, '매수단가': 81000}}

```

<br/>

- 딕셔너리 접근/할당/삭제하기

```python
# 딕셔너리 접근하기
print(stock_a["삼성전자"])
print(stock_c["삼성전자"]["보유수량"])

# 딕셔너리 할당하기
stock_a["삼성전자"] = 85000
print(stock_a)

# 딕셔너리 삭제하기
del stock_a["LG전자"]
print(stock_a)
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter7/02.딕셔너리.py
82000
5
{'삼성전자': 85000, 'LG전자': 150000}
{'삼성전자': 85000}
```

<br/>

- 딕셔너리 함수

```python
# 딕셔너리 함수
stock_d = {
    "삼성전자" : 82000,
    "SK하이닉스" : 123000,
    "NAVER" : 370000,
    "카카오" : 133000
}

# items() : 키와 데이터 쌍
print(stock_d.items)

# 일반적 사용예
for item in stock_d.items():
    print(item[0]) # 0: 키, 1: 데이터

# keys() : 키
for key in stock_d.keys():
    print(key)

# values() : 데이터
for value in stock_d.values():
    print(value)
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter7/02.딕셔너리.py
<built-in method items of dict object at 0x10a44ef00>
삼성전자
SK하이닉스
NAVER
카카오
삼성전자
SK하이닉스
NAVER
카카오
82000
123000
370000
133000
```

<br/><br/>

이번 포스팅에서는 딕셔너리에 대해 알아보았다. 다음 포스팅에서는 클래스와 객체에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**