---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 49일차'
date: '2022-06-05 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 리스트 내포, 실습문제, 할당과 복사, 문자열 실습문제를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-05-Python-Photo1](/assets/images/2022-06-05-Python-Photo/2022-06-05-Python-Photo1.jpg)

![2022-06-05-Python-Photo2](/assets/images/2022-06-05-Python-Photo/2022-06-05-Python-Photo2.jpg)

<br/><br/>

# 04. 리스트 내포

## 1. 리스트 내포란?

- for문, if문 등을 지정하여 리스트를 간편하게 만드는 것.

<br/><br/>

### 1. 리스트 내포 - for 문 사용하기

```python
[표현식 for 변수 in 순회가능한 데이터]

# 예시 1
nums = [i for i in range(5)]
print(nums)

# 예시 1 결과
[0, 1, 2, 3, 4]

# 예시 2
nums = [100, 200, 300]
double_nums = [i * 2 for i in nums]
print(double_nums)

# 예시 2 결과
[200, 400, 600]
```

- 예시 1
    - range(5) 로 0~4까지의 값이 들어가는데, []로 감쌌기 때문에 리스트 형태로 결과가 생성된다.
- 예시 2
    - nums에 리스트가 할당되어있다.
    - nums의 값들을 2배하라는 리스트 내포문을 작성 후 double_nums에 할당한다.
    - 각 값에 2가 곱해진 리스트가 반환된다.

<br/><br/>

### 2. 리스트 내포 - if 문 사용하기

```python
[표현식 for 변수 in 순회가능한 데이터 if 조건식]

# 예제 1
nums = [i for i in range(10) if i % 2 == 0]
print(nums)

# 예제 1 결과
[0, 2, 4, 6, 8]

# 예제 2
nums = [100, 200, 300, 400, 500]
double_nums = [i * 2 for i in nums if i >= 300]
print(double_nums)

# 예제 2 결과
[600, 800, 1000]
```

- 보는 순서: for 문 ⇒ if 문 ⇒ 표현식 ⇒ 리스트
- 예제 1
    - for 문 ⇒ 0 ~ 9까지 값 생성
    - if 문 ⇒ 2로 나누었을때 나머지가 0이 될 경우(짝수일 경우),
    - 표현식 ⇒  if문이 참일경우 i로 만들어준다.
    - 리스트 ⇒ i 값들을 리스트([])에 넣어준다.
- 예제 2
    - for ⇒ nums의 값들을 i에 담는다
    - if ⇒ 300이상일 경우 i에 2를 곱한 값을 리스트로 만든다
    
<br/><br/>

## 2. 실습

- 위에서 학습한 내용을 실습해보자.

```python
# 리스트 내포
# for 사용
nums = [i for i in range(5)]
print(nums)

nums2 = [100, 200, 300]
double_nums = [i * 2 for i in nums2]
print(double_nums)

# if 사용

nums3 = [i for i in range(10) if i % 2 == 0]
print(nums3)

nums4 = [100, 200, 300, 400, 500]
double_nums2 = [i * 2 for i in nums4 if i >= 300]
print(double_nums2)
```

<br/>

- 결과 확인

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/04.리스트내포.py
[0, 1, 2, 3, 4]
[200, 400, 600]
[0, 2, 4, 6, 8]
[600, 800, 1000]
```

- for 문을 사용해 i의 값에 2배를 곱해 돌려주는 내포문을 작성할 수 있다.
- if문을 사용해 나머지가 0일 경우(짝수일 경우)에만 값을 돌려주는 내포문을 작성할 수 있다.
- if문을 사용해 i가 300 이상일 경우 i값에 2배를 곱해 돌려주는 내포문을 작성할 수 있다.

<br/><br/>

# 05. 리스트 내포 실습문제

## 실습문제 2.4.1

- 리스트 내포를 이용해서 word_list에 들어 있는 문자열 중 첫 글자가 a인 것만 뽑아서 리스트로 만드세요.
- 변경 전
    
    ['apple', 'watch', 'apolo', 'star', 'abocado']
    
- 변경 후
    
    ['apple', 'apolo', 'abocado']

<br/><br/>

### 1. 내 풀이

```python
# 실습문제 2.4.1
word_list = ['apple', 'watch', 'apolo', 'star', 'abocado']

a_word = [i for i in word_list if i[0] == 'a']
print(a_word)
```

- 문자열의 첫 인덱스 값이 ‘a’인 i만 변수 a_word에 할당한다.

<br/>

- 결과 출력

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/05-1.실습문제2.4.1.py
['apple', 'apolo', 'abocado']
```

<br/><br/>

### 2. 강의 해설

- 먼저 리스트 내포를 사용하지 않고 문제 요건을 구현해보자.

```python
# 실습문제 2.4.1
# word_list에 들어 있는 문제열 중 첫글자가
# a 인 것만 뽑아서 리스트로 만드세요.

word_list = ['apple', 'watch', 'apolo', 'star', 'abocado']

# 리스트 내포 사용하기 전
result = []
for word in word_list:
    if word[0] == 'a':
        result.append(word)
print(result)
```

<br/>

- 결과 확인

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/05-1.실습문제2.4.1-해설.py
['apple', 'apolo', 'abocado']
```

<br/>

- 리스트 내포를 사용해서 문제요건을 구현해보자.

```python
# 실습문제 2.4.1
# word_list에 들어 있는 문제열 중 첫글자가
# a 인 것만 뽑아서 리스트로 만드세요.

word_list = ['apple', 'watch', 'apolo', 'star', 'abocado']

# 리스트 내포 사용한 후
result = [i for i in word_list if i[0] == 'a']
print(result)
```

- 코드가 4줄에서 1줄로 줄고, 가독성이 좋아짐.

<br/>

- 결과 확인

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/05-1.실습문제2.4.1-해설.py
['apple', 'apolo', 'abocado']
```

<br/><br/>

## 실습문제 2.4.2

- 리스트 내포를 사용해 다음과 같이 변경해보자
- 변경 전
    
    ```python
    ['오메가3', None, '비타민C500', None, '홍삼절편']
    ```
    
- 변경 후
    
    ```python
    ['오메가3', '', '비타민C500', '', '홍삼절편']
    ```
    
<br/><br/>

### 1. 내 풀이

```python
word_list = ['오메가3', None, '비타민C500', None, '홍삼절편']

result = [i for i in word_list if i != None]
print(result)
```

<br/>

- 결과 출력

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/06-1.실습문제2.4.2.py
['오메가3', '비타민C500', '홍삼절편']
```

- 문제를 잘못 이해함. None을 삭제하는 것이 아니라 빈 문자열로 변경해줘야한다.

<br/><br/>

### 2. 강의 해설

- None 문자열을 빈 문자열로 만들어야한다.
- 리스트 내포 사용하지 않을 경우

```python
# 실습문제 2.4.2
# ['오메가3', None, '비타민C500', None, '홍삼절편']
# ['오메가3', '', '비타민C500', '', '홍삼절편']

items = ['오메가3', None, '비타민C500', None, '홍삼절편']

# 리스트 내포 사용 전
result = []
for item in items:
    if item != None:
        item.append(item)
    else:
        result.append('')
print(result)
```

<br/>

- 결과 출력

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/06-1.실습문제2.4.2-해설.py
['오메가3', '', '비타민C500', '', '홍삼절편']
```

<br/>

- 리스트 내포문을 사용할 경우

```python
# 리스트 내포 사용 후
result = [i if i != None else '' for i in items]
print(result)
```

- 리스트 내포문 사용 시 if문이 else도 포함할 경우 for in문보다 먼저 사용해준다.

<br/>

- 결과 출력

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/06-1.실습문제2.4.2-해설.py
['오메가3', '', '비타민C500', '', '홍삼절편']
```

<br/><br/>

# 06. 할당과 복사

## 1. 파이썬에서는 데이터도 객체이다

- 변수에 데이터가 저장된다 (X)
    
    ⇒ 변수가 데이터를 가리킨다
    

```python
x = 200
y = 200
```

![2022-06-05-Python-Photo3.png](/assets/images/2022-06-05-Python-Photo/2022-06-05-Python-Photo3.png)

- 메모리 안에 X라는 변수에 200이 할당, Y라는 변수에 200이 할당되는 것이 아님.

<br/>

![2022-06-05-Python-Photo4.png](/assets/images/2022-06-05-Python-Photo/2022-06-05-Python-Photo4.png)

- 실제로는 메모리 안에 200이라는 객체가 생성되고, X와 Y변수가 객체를 각각 가리킨다.

<br/>

## 2. 리스트 할당과 복사

- 리스트 할당 방식

```python
x = [1, 2, 3, 4, 5]
y = x
```

- x 에 리스트를 할당하고 y에서는 x를 복사해서 사용
    
    ![2022-06-05-Python-Photo5.png](/assets/images/2022-06-05-Python-Photo/2022-06-05-Python-Photo5.png)
    
    - x와 y가 같은 객체를 가리키게 된다.

<br/>

- **y의 요소 값을 변경하게 되면?** 예: y[2]=0
    
    ![2022-06-05-Python-Photo6.png](/assets/images/2022-06-05-Python-Photo/2022-06-05-Python-Photo6.png)
    
    - 파이썬에서는 x의 요소 값도 같이 바뀌게 되는 문제가 발생한다.

<br/>

## 3. 실습

```python
# 리스트 할당 방식

x = [1,2,3,4,5]
y = x 
y[2] = 0

print(x)
print(y)
```

<br/>

- 실행결과

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_advan
ced/myvenv/bin/python /Users/usr/Documents/python_advanced/my
venv/Chapter02/07.할당과복사.py
[1, 2, 0, 4, 5]
[1, 2, 0, 4, 5]
```

- x와 y 모두 값이 변경되는 것을 알 수 있다.

<br/>

- x,y의 주소값(id)을 확인해보자.

```python
# 리스트 할당 방식

x = [1,2,3,4,5]
y = x 
y[2] = 0

print(x)
print(y)

print(id(x))
print(id(y))
```

<br/>

- 실행결과

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_advan
ced/myvenv/bin/python /Users/usr/Documents/python_advanced/my
venv/Chapter02/07.할당과복사.py
[1, 2, 0, 4, 5]
[1, 2, 0, 4, 5]
4397675776
4397675776
```

- 두 개의 변수가 완전히 같은 주소값을 가지고 있다.

<br/><br/>

## 4. 파이썬에서의 리스트 복사 방식

```python
x = [1,2,3,4,5]
y = x.copy()
```

- `.copy()` 라는 명령어를 사용해 복사한다.

- 메모리에서 x,y 변수에 해당하는 객체가 각각 생성되고, x,y가 각 변수를 가리키게 된다.
    
    ![2022-06-05-Python-Photo7.png](/assets/images/2022-06-05-Python-Photo/2022-06-05-Python-Photo7.png)
    
<br/><br/>

## 5. 다차원 리스트의 복사 방식

```python
x = [[1,2],[3,4,5]]
import copy
y = copy.deepcopy(x)
```

- 다차원 리스트를 복사하기 위해서는 copy라는 모듈의 deepcopy라는 메서드를 사용해야 한다.

<br/>

![2022-06-05-Python-Photo8.png](/assets/images/2022-06-05-Python-Photo/2022-06-05-Python-Photo8.png)

- deepcopy를 해야 다차원 리스트를 복제할 수 있다.

<br/><br/>

## 6. 리스트 복사 실습

```python
# 리스트 복사 방식

a = [5,6,7,8,9]
b = a.copy()
b[2] = 0
print(a)
print(b)
print(id(a))
print(id(b))
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter02/07.할당과복사.py
[5, 6, 7, 8, 9]
[5, 6, 0, 8, 9]
4301627264
4301627328
```

<br/>

- 중첩 리스트의 복사: `.copy()` 를 이용한 경우

```python
# 중첩 리스트 복사 방식

c = [[1,2], [3,4,5]]
d = c.copy()
d[0][0] = 0
print(c)
print(d)
print(id(c))
print(id(d))
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter02/07.할당과복사.py
[[0, 2], [3, 4, 5]]
[[0, 2], [3, 4, 5]]
4319846784
4319847808
```

<br/>

- 중첩 리스트의 복사: `copy.deepcopy()` 를 이용한 경우

```python
# 중첩 리스트 복사 방식

c = [[1,2], [3,4,5]]
import copy
d = copy.deepcopy(c)
d[0][0] = 0
print(c)
print(d)
print(id(c))
print(id(d))
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter02/07.할당과복사.py
[[1, 2], [3, 4, 5]]
[[0, 2], [3, 4, 5]]
4563460480
4563461632
```

<br/><br/>

# 07. 문자열 실습문제

## 실습문제 2.6.1

- 지도 어플리케이션에서 소요시간을 크롤링 하였더니 문자열 데이터였다. 소요시간을 비교하기 위해 시간을 모두 분으로 바꾸려고 한다. 다음과 같이 시간이 입력되면 분으로 바꾸어 주는 프로그램을 작성하자
    - 표준입력: 1시간 30분 / 표준출력: 2시간
    - 표준입력: 2시간 / 표준출력: 120
    - 표준입력: 30분 / 표준출력: 30

<br/><br/>

## 내 풀이

```python
# 실습문제 2.6.1
# 시간을 분으로

time = input("시간을 입력하세요 >>> ")
# 1. 분만 있는 경우 ex) 30분
# 2. 시간만 있는 경우 ex) 2시간
# 3. 시간과 분이 있는 경우 ex) 1시간 30분

if time.find('시간') == -1:
    # 분만 있는 경우
    result = int(time.split('분')[0])
    print(result)

#### 이 윗부분까지는 강의 참고 ####

elif time.find('시간') != -1 and time.find('분') == -1:
    # 시간만 있는 경우
    result = int(time.split('시간')[0]) * 60
    print(result)
else:
    # 시간만 있는 경우
    hour = time.split('시간')
    minute = hour[-1].split('분')
    result = (int(hour[0]) * 60) + int(minute[0])
    print(result)
```

<br/>

- 실행 결과

```python
# 1. 분만 있는 경우 ex) 30분
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter02/07-2.실습문제2.6.1-해설.py
시간을 입력하세요 >>> 30분 
30

# 2. 시간만 있는 경우 ex) 2시간
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter02/07-2.실습문제2.6.1-해설.py
시간을 입력하세요 >>> 2시간
120

# 3. 시간과 분이 있는 경우 ex) 1시간 30분
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter02/07-2.실습문제2.6.1-해설.py
시간을 입력하세요 >>> 1시간30분
90
```

<br/><br/>

## 강의 해설

```python
# 실습문제 2.6.1
# 시간을 분으로

time = input("시간을 입력하세요 >>> ")
# 1. 분만 있는 경우 ex) 30분
# 2. 시간만 있는 경우 ex) 2시간
# 3. 시간과 분이 있는 경우 ex) 1시간 30분

if time.find('시간') == -1:
    # 분만 있는 경우
    result = time.split('분')
    print(result)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter02/07-2.실습문제2.6.1-해설.py
시간을 입력하세요 >>> 30분 
['30', '']
```

- 분 뒤의 공백도 자르게 된다(`’’`)

<br/>

- 첫번째 인덱스만 가져오면 된다.

```python
# 실습문제 2.6.1
# 시간을 분으로

time = input("시간을 입력하세요 >>> ")
# 1. 분만 있는 경우 ex) 30분
# 2. 시간만 있는 경우 ex) 2시간
# 3. 시간과 분이 있는 경우 ex) 1시간 30분

if time.find('시간') == -1:
    # 분만 있는 경우
    result = int(time.split('분')[0])
    print(result)
```

- `[0]` 로 time.split(’분') 결과의 첫번째 인덱스만 가져오게 된다.
- 현재는 데이터가 문자열로 되어있으니 숫자인 int로 변환해준다.

<br/>

- 시간만 있는 경우도 구현해본다.

```python
# 실습문제 2.6.1
# 시간을 분으로

time = input("시간을 입력하세요 >>> ")
# 1. 분만 있는 경우 ex) 30분
# 2. 시간만 있는 경우 ex) 2시간
# 3. 시간과 분이 있는 경우 ex) 1시간 30분

if time.find('시간') == -1:
    # 분만 있는 경우
    result = int(time.split('분')[0])
    print(result)
else:
    if time.find('분') == -1:
        # 시간만 있는 경우
        result = int(time.split('시간')[0]) * 60
```

<br/>

- 마지막 시나리오의 경우,

```python
# 실습문제 2.6.1
# 시간을 분으로

time = input("시간을 입력하세요 >>> ")
# 1. 분만 있는 경우 ex) 30분
# 2. 시간만 있는 경우 ex) 2시간
# 3. 시간과 분이 있는 경우 ex) 1시간 30분

if time.find('시간') == -1:
    # 분만 있는 경우
    result = int(time.split('분')[0])
    print(result)
else:
    if time.find('분') == -1:
        # 시간만 있는 경우
        result = int(time.split('시간')[0]) * 60
    else:
        sub = time.split('시간')
        result = int(sub[0]) * 60 + int(sub[1].split('분')[0])
    
print(result)
```

<br/>

- 실행 결과

```python
# 1. 분만 있는 경우 ex) 30분
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter02/07-2.실습문제2.6.1-해설.py
시간을 입력하세요 >>> 30분 
30

# 2. 시간만 있는 경우 ex) 2시간
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter02/07-2.실습문제2.6.1-해설.py
시간을 입력하세요 >>> 2시간
120

# 3. 시간과 분이 있는 경우 ex) 1시간 30분
(myvenv) ➜  python_advanced git:(master) ✗ /Users/usr/Documen
ts/python_advanced/myvenv/bin/python /Users/usr/Documents/pyt
hon_advanced/myvenv/Chapter02/07-2.실습문제2.6.1-해설.py
시간을 입력하세요 >>> 1시간30분
90
```

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 리스트 내포, 실습문제, 할당과 복사, 문자열 실습문제를 정리해보았다. 다음 포스팅에서는 다양한 매개변수를 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**