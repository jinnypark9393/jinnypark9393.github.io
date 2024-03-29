---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 48일차'
date: '2022-06-04 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 리스트 다루기를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-04-Python-Photo1](/assets/images/2022-06-04-Python-Photo/2022-06-04-Python-Photo1.jpg)

![2022-06-04-Python-Photo2](/assets/images/2022-06-04-Python-Photo/2022-06-04-Python-Photo2.jpg)

<br/><br/>

# 03. 리스트 다루기

## 1. 리스트 메서드

### 1. 리스트에 데이터 추가하는 방법

```python
>>> fruits = ['apple', 'orange']

>>> fruits.append('grape')

>>> print(fruits)

['apple', 'orange', 'grape']
```

- `append` 를 사용해 리스트에 데이터를 추가할 수 있다.
- grape라는 새로운 데이터가 리스트에 추가된 것을 알 수 있다.

<br/><br/>

### 2. 리스트에 리스트 추가하는 방법

```python
>>> fruits = ['apple', 'orange']

>>> fruits.append(['grape', 'mango'])

>>> print(fruits)

['apple', 'orange', ['grape', 'mango']]
```

- 마찬가지로 `append` 를 사용해 리스트에 리스트를 추가할 수 있다.
- fruits 리스트 안에 `['grape', 'mango']` 라는 리스트가 추가 된 것을 알 수 있다(중첩).

<br/><br/>

### 3. 리스트 데이터 삭제 방법

```python
>>> fruits = ['apple', 'orange', 'mango']

>>> fruits.pop()

'mango'

>>> print(fruits)

['apple', 'orange']
```

- `pop` 메서드를 사용하면 마지막 데이터를 삭제할 수 있다.
- 위의 예시에서는 ‘mango’라는 데이터가 삭제된 것을 알 수 있다.

<br/><br/>

### 4. 리스트 데이터 삭제 방법(인덱스 이용)

```python
>>> fruits = ['apple', 'orange', 'mango']

>>> fruits.pop(0)

'apple'

>>> print(fruits)

['orange', 'mango']
```

- `pop` 메서드에 인덱스를 이용하면 인덱스에 해당하는 데이터를 삭제할 수 있다.
- 위의 예시에서는 인덱스 0을 사용해 'apple’ 이라는 첫번째 데이터가 삭제 된 것을 알 수 있다.

<br/><br/>

### 5. 리스트 데이터 삭제 방법(데이터 이용)

```python
>>> fruits = ['apple', 'orange', 'mango']

>>> fruits.remove('orange')

>>> print(fruits)

['apple', 'mango']
```

- `remove` 메서드를 사용해 데이터를 직접 명시하여 리스트에서 데이터를 삭제할 수 있다.
- 위의 예시에서는 ‘orange’라는 데이터가 삭제된 것을 알 수 있다.

<br/><br/>

### 6. 리스트 특정 값의 인덱스 구하는 방법

```python
>>> fruits = ['apple', 'orange', 'mango']

>>> fruits.index('orange')

1
```

- `index` 메서드를 이용해 특정 데이터의 인덱스를 구할 수 있다.

<br/><br/>

### 7. 리스트 특정 값의 개수 구하는 방법

```python
>>> fruits = ['apple', 'orange', 'mango', 'apple', 'apple']

>>> fruits.count('apple')

3
```

- `count` 메서드를 이용해 특정 데이터의 개수를 구할 수 있다.

<br/><br/>

### 8. 리스트 모든 요소 삭제하는 방법

```python
>>> fruits = ['apple', 'orange', 'mango', 'apple', 'apple']

>>> fruits.clear()

>>> print(fruits)

[]
```

- `clear` 메서드를 이용해 리스트의 모든 요소를 삭제할 수 있다.

<br/><br/>

### 9. 리스트 정렬하기

```python
>>> numbers = [5, 2, 8, 1, 10]

>>> numbers.sort()

>>> print(numbers)

[1, 2, 5, 8, 10]
```

- `sort` 메서드를 이용해 데이터를 오름차순으로 정렬할 수 있다.

<br/><br/>

## 2. enumerate

- for in 반복문 사용 시 인덱스를 같이 출력하는 방법

```python
numbers = [5, 2, 8, 1, 10]

for index, number in enumerate(numbers):

    print(index, number)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/03.리스트다루기.py
0 5
1 2
2 8
3 1
4 10
```

<br/><br/>

## 3. 실습

- 리스트의 메서드를 다 외워야 할까? 아님
- 그렇다면 프로그램 개발 중 리스트의 메서드가 필요할 때 어떻게 찾아야할까?
    - 구글링: 언어 + 기능 검색어로 검색 (예: 파이썬 + 리스트 삭제)
    - 구글링 할 때 한국어 검색에 익숙해지면 영어로 검색하자(정확도가 높음).

```python
# 리스트 메서드

# 리스트 데이터 삭제
fruits = ['apple', 'orange', 'mango']
del fruits[1]
print(fruits)

# 결과
['apple', 'mango']
```

- del 을 사용해 ‘orange’ 데이터를 삭제 할 수 있다.

<br/>

- 데이터 정렬도 마찬가지로 구글링으로 찾아서 적용해보자(sort 적용)

```python
# 리스트 정렬
numbers = [5, 2, 8, 3]
numbers.sort()
print(numbers)

# 결과
[2, 3, 5, 8]
```

<br/>

- enumerate 도 실습해보자.
    - 어떤 카페에서 게시글 제목을 크롤링해서 갖고왔다고 가정해보자.

```python
# enumerate
titles = ['출석!!', '출석인증합니다!', '출석이요!!']

for title in titles:
    print(title)
```

<br/>

- 실행해보면 아래와 같이 게시글 제목들이 출력된다.

```python
(myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
myvenv/Chapter02/03.리스트다루기.py
출석!!
출석인증합니다!
출석이요!!
```

<br/>

- 게시글 제목 앞에 번호(인덱스)를 붙여주고 싶은 경우에는?
    - 원래는 for in 문 밖에서 변수를 선언하고 하나씩 증가시켜주는 형태로 작성
    
    ```python
    # enumerate
    titles = ['출석!!', '출석인증합니다!', '출석이요!!']
    
    index = 1
    for title in titles:
        print(index, title)
        index = index + 1
    ```

    <br/>
    
    - enumerate를 사용하면 간단하게 구현할 수있다.
    
    ```python
    # enumerate
    titles = ['출석!!', '출석인증합니다!', '출석이요!!']
    
    for index, title in enumerate(titles, 1):
        print(index, title)
    ```
    
    - enumerate(titles, 1)의 1은 시작 번호를 지정해주는 역할이다.
    
    <br/>

    - 출력 결과
    
    ```python
    (myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
    nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
    myvenv/Chapter02/03.리스트다루기.py
    1 출석!!
    2 출석인증합니다!
    3 출석이요!!
    ```

    <br/>
    
    - f string 을 사용하여 형식을 예쁘게 다듬어보자.
    
    ```python
    # enumerate
    titles = ['출석!!', '출석인증합니다!', '출석이요!!']
    
    for index, title in enumerate(titles, 1):
        print(f'{index} 번째 글입니다. 제목: {title}')
    ```
    
    <br/>

    - 출력 결과
    
    ```python
    (myvenv) ➜  python_advanced /Users/usr/Documents/python_adva
    nced/myvenv/bin/python /Users/usr/Documents/python_advanced/
    myvenv/Chapter02/03.리스트다루기.py
    1 번째 글입니다. 제목: 출석!!
    2 번째 글입니다. 제목: 출석인증합니다!
    3 번째 글입니다. 제목: 출석이요!!
    ```

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 리스트 다루기를 정리해보았다. 다음 포스팅에서는 리스트 내포를 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**