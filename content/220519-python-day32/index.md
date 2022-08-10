---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 32일차'
date: '2022-05-19 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 11-1. 에러와 예외처리를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-19-Python-Photo1](/assets/images/2022-05-19-Python-Photo/2022-05-19-Python-Photo1.jpg)

![2022-05-19-Python-Photo2](/assets/images/2022-05-19-Python-Photo/2022-05-19-Python-Photo2.jpg)

<br/><br/>

# 01. 에러와 예외처리

## 1. 예외처리가 필요한 이유

- 사용자가 개발자 예측대로만 프로그램을 사용하지는 않는다.
- 예: 숫자를 입력하라고 프로그램이 요청했지만 사용자가 빈칸으로 놔두거나, 문자열을 입력
- 프로그램 실행 중 발생하는 에러를 미연에 방지

<br/>

## 2. try-except 구문

```python
try:
    예외가 발생할 수 있는 코드
except:
    예외 발생 시 실행할 코드
else:
    예외 발생하지 않은 경우 실행할 코드
finally:
    항상 실행할 코드
```

- else: 자주 사용하지 않음
- finally: 어떠한 자원을 반환할 때 사용

<br/><br/>

## 3. 실습

```python
# 원화를 입력, 환율 입력 -> 달러 값 출력

won = input("원화 금액을 입력 하세요>>>")
dollar = input("환율을 입력 하세요>>>")

print(int(won) / int(dollar))
```

<br/>

- 프로그램 실행 후, 정상적으로 숫자를 입력한 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter11/01.예외처리.py
원화 금액을 입력 하세요>>>10000
환율을 입력 하세요>>>1100
9.090909090909092
```

<br/>

- 프로그램 실행 후, 문자열을 입력한 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter11/01.예외처리.py
원화 금액을 입력 하세요>>>a
환율을 입력 하세요>>>1100
Traceback (most recent call last):
  File "/Users/jinipark/Documents/python_basic/myvenv/Chapter11/01.예외처리.py", line 6, in <module>
    print(int(won) / int(dollar))
ValueError: invalid literal for int() with base 10: 'a'
```

<br/>

- 프로그램 실행 후, 숫자를 0으로 나눈 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter11/01.예외처리.py
원화 금액을 입력 하세요>>>10000
환율을 입력 하세요>>>0
Traceback (most recent call last):
  File "/Users/jinipark/Documents/python_basic/myvenv/Chapter11/01.예외처리.py", line 6, in <module>
    print(int(won) / int(dollar))
ZeroDivisionError: division by zero
```

<br/>

- try except 문으로 예외처리를 해보자.

```python
# 원화를 입력, 환율 입력 -> 달러 값 출력

won = input("원화 금액을 입력 하세요>>>")
dollar = input("환율을 입력 하세요>>>")

try: # 예외가 발생할 수 있는 코드
    print(int(won) / int(dollar))
except: # 예외가 발생했을 때 실행되는 코드
    print("예외가 발생했습니다.")
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter11/01.예외처리.py
원화 금액을 입력 하세요>>> a
환율을 입력 하세요>>>b
예외가 발생했습니다.
```

<br/>

- 주의: try ~ except를 사용하면 프로그램이 도중에 종료되지 않는다.

```python
# 원화를 입력, 환율 입력 -> 달러 값 출력

won = input("원화 금액을 입력 하세요>>>")
dollar = input("환율을 입력 하세요>>>")

try: # 예외가 발생할 수 있는 코드
    print(int(won) / int(dollar))
except: # 예외가 발생했을 때 실행되는 코드
    print("예외가 발생했습니다.")

print("프로그램이 종료되었나요?")
```

- 위의 코드에서, 예외처리를 하지 않은 경우 마지막 print문은 출력되지 않는다.

<br/>

- 예외처리시 발생하는 에러를 미리 지정하기도 한다.

```python
# 원화를 입력, 환율 입력 -> 달러 값 출력

won = input("원화 금액을 입력 하세요>>>")
dollar = input("환율을 입력 하세요>>>")

try: # 예외가 발생할 수 있는 코드
    print(int(won) / int(dollar))
except ValueError: # 예외가 발생했을 때 실행되는 코드
    print("문자열 예외가 발생했습니다.")
except ZeroDivisionError:
    print("나누기 0은 불가능합니다.")
```

<br/>

- 문자열을 입력했을 때의 표시

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter11/01.예외처리.py
원화 금액을 입력 하세요>>> a
환율을 입력 하세요>>>b
문자열 예외가 발생했습니다.
```

<br/>

- 숫자를 0으로 나눴을때 메시지를 출력한다

```python
(myvenv) ➜  python_basic /Users/jinipark/Documents/pyt
hon_basic/myvenv/bin/python /Users/jinipark/Documents/
python_basic/myvenv/Chapter11/01.예외처리.py
원화 금액을 입력 하세요>>>10000
환율을 입력 하세요>>>0
나누기 0은 불가능합니다.
```

<br/>

- 에러 뒤에 as e 를 붙여주고 print문에도 e를 추가하면 에러메시지를 추가로 확인할 수 있다.

```python
# 원화를 입력, 환율 입력 -> 달러 값 출력

won = input("원화 금액을 입력 하세요>>>")
dollar = input("환율을 입력 하세요>>>")

try: # 예외가 발생할 수 있는 코드
    print(int(won) / int(dollar))
except ValueError as e: # 예외가 발생했을 때 실행되는 코드
    print("문자열 예외가 발생했습니다.", e)
except ZeroDivisionError as e:
    print("나누기 0은 불가능합니다.", e)
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter11/01.예외처리.py
원화 금액을 입력 하세요>>>a
환율을 입력 하세요>>>b
문자열 예외가 발생했습니다. invalid literal for int() with base 10: 'a'
```

<br/>

- else와 finally를 활용해보자.

```python
# 원화를 입력, 환율 입력 -> 달러 값 출력

won = input("원화 금액을 입력 하세요>>>")
dollar = input("환율을 입력 하세요>>>")

try: # 예외가 발생할 수 있는 코드
    print(int(won) / int(dollar))
except ValueError as e: # 예외가 발생했을 때 실행되는 코드
    print("문자열 예외가 발생했습니다.", e)
except ZeroDivisionError as e:
    print("나누기 0은 불가능합니다.", e)
else: 
    print("예외가 발생하지 않았을 때 실행되는 코드")
finally: # 파일 담기
    print("예외가 발생하던지, 발생하지 않았던지 실행되는 코드")
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/jinipark/Documents/pyt
hon_basic/myvenv/bin/python /Users/jinipark/Documents/
python_basic/myvenv/Chapter11/01.예외처리.py
원화 금액을 입력 하세요>>>a
환율을 입력 하세요>>>b
문자열 예외가 발생했습니다. invalid literal for int() with base 10: 'a'
예외가 발생하던지, 발생하지 않았던지 실행되는 코드 
```

<br/><br/>

이번 포스팅에서는 에러와 예외처리에 대해 알아보았다. 다음 포스팅에서는 에러와 에러를 만들어보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**