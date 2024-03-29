---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 11일차'
date: '2022-04-28 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 5-5. 리스트 자료형 실습문제를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-04-28-Python-Photo1](/assets/images/2022-04-28-Python-Photo/2022-04-28-Python-Photo1.jpg)

![2022-04-28-Python-Photo2](/assets/images/2022-04-28-Python-Photo/2022-04-28-Python-Photo2.jpg)

<br/><br/>

# 5. 리스트 자료형 실습문제

## 1. 실습문제 5.2.1

- 다음은 패스트 고등학교 2학년 3반 1번부터 5번까지의 1분간 팔굽혀펴기 개수이다. 데이터는 각 리스트에 저장되어있다. 각 문항을 실행한 결과를 출력해보자.
    - result = [33, 40, 12, 63, 52]
    
<br/>

### [내 풀이]

**문항 1. 6번의 팔굽혀펴기 개수는 9개이다. 리스트의 마지막에 추가하자.**

```python
result = [33, 40, 12, 63, 52]

# 문항 1
result.append(9)
print(result)
```

<br/>

- 출력결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/07-1.실습문제5.2.1.py
[33, 40, 12, 63, 52, 9]
```

<br/>

**문항 2. 2번은 재측정하여 50개를 하였다. 2번의 데이터를 변경해보자.**

```python
result = [33, 40, 12, 63, 52]

result[1] = 50
print(result)
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/07-1.실습문제5.2.1.py
[33, 50, 12, 63, 52, 9]
```

<br/>

**문항 3. 3번부터 6번까지 데이터를 슬라이싱하자.**

```python
result = [33, 40, 12, 63, 52]

print(result[2:6])
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/07-1.실습문제5.2.1.py
[12, 63, 52, 9]
```

<br/>

**문항 4. 모든 데이터를 오름차순으로 정렬하자.**

```python
result = [33, 40, 12, 63, 52]

result.sort()
print(result)
```

<br/>

- 출력결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/07-1.실습문제5.2.1.py
[9, 12, 33, 50, 52, 63]
```

<br/><br/>

### [강의 해설]

**문항 1. 6번의 팔굽혀펴기 개수는 9개이다. 리스트의 마지막에 추가하자.**

```python
# 실습문제 5.2.1
result = [33, 40, 12, 63, 52]

# 문항 1
result.append(9)
print(result)
```

<br/>

**문항 2. 2번은 재측정하여 50개를 하였다. 2번의 데이터를 변경해보자.**

```python
# 문항 2
result[1] = 50
print(result)
```

<br/>

**문항 3. 3번부터 6번까지 데이터를 슬라이싱하자.**

```python
# 문항 3
print(result[2:6])
```

<br/>

**문항 4. 모든 데이터를 오름차순으로 정렬하자.**

```python
# 문항 4
result.sort()
print(result)
```

<br/><br/>

## 2. 실습문제 5.2.2

- 턱걸이 평균 측정 프로그램을 만들어보자. 먼저, 턱걸이 횟수를 저장할 빈 리스트를 만든다. 그리고 일주일간의 턱걸이 횟수를 입력 받아 리스트에 저장한다. 리스트에 저장된 데이터의 평균을 구해 출력한다.
- 표준입력
    - `1일차 턱걸이 횟수 >>> 20`
    - `2일차 턱걸이 횟수 >>> 23`
    - `3일차 턱걸이 횟수 >>> 16`
    - `4일차 턱걸이 횟수 >>> 14`
    - `5일차 턱걸이 횟수 >>> 24`
    - `6일차 턱걸이 횟수 >>> 27`
    - `7일차 턱걸이 횟수 >>> 30`
- 표준 출력: 22

<br/><br/>

### [내 풀이]

```python
# 빈 리스트 만들기
week = []

# 반복문 사용해 1일차부터 7일차까지 값 입력받기
i = 0
for i in range(0,7):
    i = i + 1
    day = int(input("%d일차 턱걸이 횟수 >>>" % i))
    week.append(day)
    print(week)

# 리스트 요소를 모두 더한 값 구하기
total = sum(week)

# 평균값 = 리스트 요소를 모두 더한 값 / 리스트 요소 개수
# 계산된 평균값을 정수형으로 변경해준다(기본 출력 float).
average = int(total/len(week))
print(int(average))
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/08-1.실습문제5.2.2.py
1일차 턱걸이 횟수 >>>20
[20]
2일차 턱걸이 횟수 >>>23
[20, 23]
3일차 턱걸이 횟수 >>>16
[20, 23, 16]
4일차 턱걸이 횟수 >>>14
[20, 23, 16, 14]
5일차 턱걸이 횟수 >>>24
[20, 23, 16, 14, 24]
6일차 턱걸이 횟수 >>>27
[20, 23, 16, 14, 24, 27]
7일차 턱걸이 횟수 >>>30
[20, 23, 16, 14, 24, 27, 30]
22
```

<br/><br/>

### [강의 해설]

```python
# 실습 5.2.2

data = [] # 빈 리스트 생성

x = int(input("1일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("2일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("3일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("4일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("5일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("6일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("7일차 턱걸이 횟수 >>>"))
data.append(x)

total = data[0] + data[1] + data[2] + data[3] + data[4] + data[5] + data[6] + data[7]
avg = total / 7

print(avg)
```

<br/>

- 위의 코드를 실행하면 아래와 같이 인덱스 에러가 발생한다.

```python
IndexError: list index out of range
```

<br/>

- 인덱스 중 범위를 벗어난 경우 발생: `data[7]` 삭제해준다.

```python
# 실습 5.2.2

data = [] # 빈 리스트 생성

x = int(input("1일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("2일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("3일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("4일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("5일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("6일차 턱걸이 횟수 >>>"))
data.append(x)
x = int(input("7일차 턱걸이 횟수 >>>"))
data.append(x)

total = data[0] + data[1] + data[2] + data[3] + data[4] + data[5] + data[6]
avg = total / 7

print(int(avg))
```

<br/>

- 출력된 평균값이 float형이기 때문에 int로 변경해준다.

<br/><br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**