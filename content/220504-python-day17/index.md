---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 17일차'
date: '2022-05-04 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 6-2. 함수 실습문제(1)를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-04-Python-Photo1](/assets/images/2022-05-04-Python-Photo/2022-05-04-Python-Photo1.jpg)

![2022-05-04-Python-Photo2](/assets/images/2022-05-04-Python-Photo/2022-05-04-Python-Photo2.jpg)

<br/><br/>

# 02. 함수실습문제(1)

## 1. 실습문제 6.1.1

- 다음은 두 수의 곱셈을 반환하는 multiply 함수이다. multiply 함수를 호출하는 방법으로 옳은 것을 고르세요.
    
<br/>

    ```python
    def multiply(x, y):
        result = x * y
        return result   
    ```
    
    1. multiply()
    2. multiply(3)
    3. multiply(3, 4)
    4. multiply(”a”, “b”)

<br/><br/>

### [내 풀이]

- 정답은 3. multiply(3, 4)

```python
def multiply(x, y):
    result = x * y
    return result

print(multiply(3, 4))
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter6/03-1.실습문제6.1.1.py
12
```

<br/><br/>

### [강의 해설]

- 1.multiply() 실행결과

    ```python
    multiply()
    TypeError: multiply() missing 2 required positional arguments: 'x' and 'y'
    ```

    - x, y 매개변수에 해당하는 인자가 필요하다는 에러 메시지 발생

<br/>

- 2.multiply(1) 실행결과

    ```python
    multiply(1)
    TypeError: multiply() missing 1 required positional argument: 'y'
    ```

    - 1번과 동일한 에러 발생

<br/>

- 3.multiply(3, 4) 실행결과

    ```python
    (myvenv) ➜  python_basic /Users/usr/Documents/python_basic/myvenv/bin/python /Users/usr/Documents/
    python_basic/myvenv/Chapter6/03-2.실습문제6.1.1-해설.py
    ```

    - 에러 발생하지 않음(Print를 입력하지 않아 연산 결과는 화면에 표시되지 않음)

<br/>

- 4.multiply(”3”, ”4”) 실행결과

    ```python
    result = x * y
    TypeError: can't multiply sequence by non-int of type 'str'
    ```

- 문자열은 곱셈 연산이 불가능하다

- Tip: docstring: 설명문
    - `“””` 쌍따옴표 세개로 감싸진 문장. IDE에서 함수에 커서를 가져다 대면 docstring에서 기입한 설명문이 표시된다.
    
    ```python
    # docstring : 설명문
    
    def multiply(x, y):
        """
        두 수의 곱셈 결과를 반환하는 함수
        매개변수 x : 숫자
        매개변수 y : 숫자
        """
        result = x * y
        return result
    
    multiply("3", "4")
    ```
    
<br/><br/>

## 2. 실습문제 6.1.2

- 다음은 세개의 정수를 인자로 받아, 합계와 평균을 출력해주는 함수이다. 함수를 호출한 결과로 표준 출력이 나오도록 함수를 정의해보자.

```python
def printSumAvg(x, y, z):
# 이하 수강생 작성

# 함수호출
printSumAvg(10, 20, 30)

# 표준 출력
# 합계: 60 평균: 20
```

<br/><br/>

### [내 풀이]

```python
def printSumAvg(x, y, z):
    sum = x + y + z
    avg = int(sum / 3)
    return print("합계:", sum, "평균:", avg)

printSumAvg(10, 20, 30)
```

- return은 불필요함

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter6/04-2.실습문제6.1.2.p
y
합계: 60 평균: 20
```

<br/><br/>

### [강의 해설]

```python
# 실습문제 6.1.2

# 문자열 포매팅
def printSumAvg(x, y, z):
    """
    세개의 숫자를 받아 합계와 평균을 출력하는 함수
    """
    sum = x + y + z
    avg = sum / 3
    print(f"합계 : {sum}, 평균: {avg}")

printSumAvg(10, 20, 30)
```

- Tip: 문자열과 변수를 번갈아 입력하지 않고 f 스트링을 사용하면 편하게 변수와 문자열을 입력할 수 있다.
    - `f”문자열 {변수}”` 형태로 입력해주면 된다.

<br/>

이번 포스팅에서는 함수 실습문제(1) 을 풀어보았다. 다음 포스팅에서는 함수 실습문제(2)를 풀어보도록 하자.

<br/><br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**