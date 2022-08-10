---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 31일차'
date: '2022-05-18 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 10-3. 파일입출력 실습문제 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-18-Python-Photo1](/assets/images/2022-05-18-Python-Photo/2022-05-18-Python-Photo1.jpg)

![2022-05-18-Python-Photo2](/assets/images/2022-05-18-Python-Photo/2022-05-18-Python-Photo2.jpg)

<br/><br/>

## 1. 실습문제 10.1.1

- 보유한 주식이 목표가에 도달했을 때의 종목별 수익금과 수익률을 출력해주는 프로그램을 작성해보자. mystock.csv 파일로부터 종목, 매입가, 수량, 목표가 정보를 가져온다.
    - 수익금 = (목표가 - 매입가) * 수량
    - 수익률 = (목표가 / 매입가 - 1) *100
- mystock.csv
    
    ```python
    종목, 매입가, 수량, 목표가
    삼성전자, 85000, 10, 90000
    NAVER, 380000, 5, 400000
    ```

<br/>

- 표준 출력
    
    ```python
    삼성전자 50000 5.88%
    NAVER 100000 5.26%
    ```

<br/><br/>

### [내 풀이] - 못풀었음

```python
import csv

# mystock.csv 생성하기
# data = [
#     ["종목", "매입가", "수량", "목표가"],
#     ["삼성전자", 85000, 10, 90000],
#     ["NAVER", 380000, 5, 400000]
# ]

# mystock = open("./myvenv/Chapter10/mystock.csv", "w")

# writer = csv.writer(mystock)
# for d in data:
#     writer.writerow(d)

# mystock.close()

# 목표가 도달 시 종목, 수익금, 수익률 출력

mystock = open("./myvenv/Chapter10/mystock.csv", "r")
reader = csv.reader(mystock)
for line in reader:
    name = line[0]
    earning = (int(line[3]) - int(line[1])) * int(line[2])
    earning_rate = (int(line[3]) / int(line[1]) - 1) * 100
```

- csv 파일 생성까지는 성공
- 행별로 값을 추출해서 계산식에 넣으려고 했으나 문자열로 되어있는 첫번째 줄을 제거하지 못함

<br/><br/>

### [강의 해설]

- 오류 해결 과정 중심으로 실습문제 풀이

- 파일을 열어보자.

```python
# 파일 열기
file = open("mystock.csv", "r")
file.close()
```

- 실행결과: no such file or directory 에러

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter10/06-2.실습문제10.1.1-해설
.py
Traceback (most recent call last):
  File "/Users/jinipark/Documents/python_basic/myvenv/Chapter10/06-2.실습문제10.1.1-해설.py", line 4, in <module>
    file = open("mystock.csv", "r")
FileNotFoundError: [Errno 2] No such file or directory: 'mystock.csv'
```

- 파이썬 파일을 실행하면, 파이썬은 파일을 root 폴더(PYTHON_BASIC)에서 찾게 됨
- 따라서 앞의 경로를 다 적어주어야한다.

<br/>

- 경로를 수정하고 실행하면 에러가 발생되지 않는다.

```python
# 파일 열기
file = open("./myvenv/Chapter10/mystock.csv", "r")
file.close()
```

<br/>

- 파일의 데이터를 읽어오자.

```python
# 오류 해결 중심!!!
import csv

# 파일 열기
file = open("./myvenv/Chapter10/mystock.csv", "r")

# 파일 데이터 읽기
reader = csv.reader(file)
for data in reader:
    print(data)

file.close()
```

<br/>

- 파일을 실행하면 아래와 같은 오류가 발생한다(MacOS는 발생하지 않음).

```python
UnicodeDecodeError: 'cp949' codec can't decode byte 0xe2 in position 6987: illegal multibyte sequence
```

<br/>

- 인코딩 방식을 지정해주면 문제가 해결된다.

```python
# 오류 해결 중심!!!
import csv

# 파일 열기
file = open("./myvenv/Chapter10/mystock.csv", "r", encoding="utf-8")

# 파일 데이터 읽기
reader = csv.reader(file)
for data in reader:
    print(data)

file.close()
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter10/06-2.실습문제10.1.1-해설
.py
['종목', '매입가', '수량', '목표가']
['삼성전자', '85000', '10', '90000']
['NAVER', '380000', '5', '400000']
```

<br/>

- 출력 값의 첫번째 행은 필요 없는 값: 슬라이싱

```python
# 오류 해결 중심!!!
import csv

# 파일 열기
file = open("./myvenv/Chapter10/mystock.csv", "r", encoding="utf-8")

# 파일 데이터 읽기
reader = csv.reader(file)
for data in reader[1:]:
    print(data)

file.close()
```

<br/>

- 에러 발생: TypeError: '_csv.reader' object is not subscriptable

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter10/06-2.실습문제10.1.1-해설
.py
Traceback (most recent call last):
  File "/Users/usr/Documents/python_basic/myvenv/Chapter10/06-2.실습문제10.1.1-해설.py", line 9, in <module>
    for data in reader[1:]:
TypeError: '_csv.reader' object is not subscriptable
```

<br/>

- reader를 list 로 자료형변환을 하면 에러가 발생하지 않는다.

```python
# 오류 해결 중심!!!
import csv

# 파일 열기
file = open("./myvenv/Chapter10/mystock.csv", "r", encoding="utf-8")

# 파일 데이터 읽기
reader = list(csv.reader(file))
for data in reader[1:]:
    print(data)

file.close()
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter10/06-2.실습문제10.1.1-해설
.py
['삼성전자', '85000', '10', '90000']
['NAVER', '380000', '5', '400000']
```

<br/>

- 수익률, 수익금 계산: for 문 안에서 작성하면 가독성이 좋지 않으니 함수를 새로 선언해보자.

```python
# 오류 해결 중심!!!
import csv

def show_profit(data):
    name = data[0] # 종목
    purchase_price = int(data[1]) # 매입가
    amount = int(data[2]) # 수량
    target_price = int(data[3]) # 목표가

    profit = (target_price - purchase_price) * amount # 수익금
    profit_ratio = (target_price/purchase_price - 1) * 100 # 수익률

    print(f"{name} {profit} {profit_ratio}")

# 파일 열기
file = open("./myvenv/Chapter10/mystock.csv", "r", encoding="utf-8")

# 파일 데이터 읽기
reader = list(csv.reader(file))
for data in reader[1:]:
    show_profit(data)

file.close()
```

<br/>

- 실행결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter10/06-2.실습문제10.1.1-해설
.py
삼성전자 50000 5.882352941176472
NAVER 100000 5.263157894736836
```

- 수익률을 출력할 때, 문제에서는 소수점 두번째 자리까지 출력해주고 % 기호를 붙여주었다.

- 소수점 자릿수 제한: 구글링 ⇒ 파이썬 소수점 자리수 제한
    - round 함수(반올림)
    - format 서식 지정
    - **f-string 서식 지정(아래 반영)**

<br/>

```python
# 오류 해결 중심!!!
import csv

def show_profit(data):
    name = data[0] # 종목
    purchase_price = int(data[1]) # 매입가
    amount = int(data[2]) # 수량
    target_price = int(data[3]) # 목표가

    profit = (target_price - purchase_price) * amount # 수익금
    profit_ratio = (target_price/purchase_price - 1) * 100 # 수익률

    print(f"{name} {profit} {profit_ratio:.2f}%")

# 파일 열기
file = open("./myvenv/Chapter10/mystock.csv", "r", encoding="utf-8")

# 파일 데이터 읽기
reader = list(csv.reader(file))
for data in reader[1:]:
    show_profit(data)

file.close()
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter10/06-2.실습문제10.1.1-해설
.py
삼성전자 50000 5.88%
NAVER 100000 5.26%
```

<br/><br/>

이번 포스팅에서는 파일입출력 실습문제를 풀어보았다. 다음 포스팅에서는 에러와 예외처리에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**