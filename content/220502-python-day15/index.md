---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 15일차'
date: '2022-05-02 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 5-6. 반복문 실습문제(2)을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-02-Python-Photo1](/assets/images/2022-05-02-Python-Photo/2022-05-02-Python-Photo1.JPG)

![2022-05-02-Python-Photo2](/assets/images/2022-05-02-Python-Photo/2022-05-02-Python-Photo2.JPG)

<br/><br/>

# 9. 반복문 실습문제(2)

## 1. 실습문제 5.3.3

- 성민은 패스트대학교에 Lily 라는 이름의 교환학생과 친해지게 되었다. 영어를 잘 하지 못했던 성민은, Lily에게 한국어를 가르쳐주기 위해 한국어 연습 프로그램을 만들게 되었다.
- - Learning Korean -
1. 연습할 한국어가 담긴 리스트를 만든다.
2. 리스트에서 순서대로 단어를 가져와 화면에 출력한다.
3. 프로그램 사용자는 단어를 그대로 입력하고
4. 맞추면 다음 단어를 가져온다. 틀리면 프로그램 종료.

<br/>

- 결과 화면

```python
Let's Learning Korean
사랑해
사랑해
귀엽다
귀엽다
고마워
고마워
행복해
행복해
```

<br/><br/>

### [내 풀이] - 실패

- 리스트를 만들어 준 뒤, while 구문으로 리스트가 끝날 때까지 반복구문을 생성
- input 값과 print 된 값이 일치하지 않을 때(틀릴때) 프로그램 종료

```python
# 리스트 만들기 => []
# 리스트 순서대로 단어를 가져와 화면에 출력 => print
# 사용자는 단어를 그대로 입력 => input
# 맞추면 다음 단어를 가져온다. => if
# 틀리면 프로그램 종료 => while True & break

korean = ["사랑해", "귀엽다", "고마워", "행복해"]

print("Let's Learning Korean")

i = 0
while i < len(korean):
    x = print(korean[i])
    y = input("")
    if x == y:
        i += 1
    else:
        break
```

<br/>

- 출력 결과: print된 문자열과 동일하게 입력했으나 프로그램이 종료되는 현상이 발생했다.
    - for in 문으로 바꿀 경우에는 break가 되지 않는 현상이 발생함
    - for in 문 사용해야함
    - 불필요한 변수를 사용해 조건문이 적용이 잘 되지 않아 발생한 오류

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/14-1.실습문제5.3.4.py
Let's Learning Korean
사랑해
사랑해
(myvenv) ➜  python_basic
```

<br/><br/>

### [강의 해설]

- 리스트 생성
- 시퀀스 자료형 ⇒ for in 문 사용
- print로 리스트에 담긴 word들을 출력해보자.

```python
# 실습문제 5.3.3
# Learning Korean

# 한국어 리스트
word_list = ["사랑해", "귀엽다", "고마워", "행복해"]

print("Let's Learning Korean")

for word in word_list:
    print(word)
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/14-2.실습문제5.3.4-해설.p
y
Let's Learning Korean
사랑해
귀엽다
고마워
행복해
```

<br/>

- 입력값을 받아줄 수 있도록 input()을 생성한다.

```python
# 실습문제 5.3.3
# Learning Korean

# 한국어 리스트
word_list = ["사랑해", "귀엽다", "고마워", "행복해"]

print("Let's Learning Korean")

for word in word_list:
    print(word)
    data = input()
```

<br/>

- 출력 결과
    - 입력값을 받을 때까지 기다린다.
    - 틀린 값을 받아도 실행이 된다.

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/14-2.실습문제5.3.4-해설.p
y
Let's Learning Korean
사랑해
사랑해
귀엽다
ㅇㅇㅇ
고마워
```

<br/>

- 화면에 출력된 값(word)와 입력된 값(data)가 일치하지 않을 경우 프로그램이 종료되도록 If 문과 break를 입력해준다.

```python
# 실습문제 5.3.3
# Learning Korean

# 한국어 리스트
word_list = ["사랑해", "귀엽다", "고마워", "행복해"]

print("Let's Learning Korean")

for word in word_list:
    print(word)
    data = input()
    if data != word:
        break
```

<br/>

- 출력 결과
    
    ```python
    (myvenv) ➜  python_basic /Users/usr/Documents/pyt
    hon_basic/myvenv/bin/python /Users/usr/Documents/
    python_basic/myvenv/Chapter5/14-2.실습문제5.3.4-해설.p
    y
    Let's Learning Korean
    사랑해
    사랑해
    귀엽다
    귀여워
    ```
    
<br/><br/>

## 코드 업그레이드 과제

- 실습문제 5.3.4 에서 문제를 틀릴 경우 프로그램을 종료하지 않고 전체 문제 개수, 맞힌 문제 개수, 틀린 문제 개수를 출력하게 한다.
    - 전체 문제 개수: 4 개
    - 맞힌 문제 개수: 2 개
    - 틀린 문제 개수: 2 개

<br/>

### [내 풀이]

- 점수를 담을 변수를 각각 선언해준 뒤,
- 정답일 경우 correct += 1, 오답일 경우 incorrect +=1 하도록 조건을 달아주었다.

```python
# 실습문제 5.3.3
# Learning Korean

# 한국어 리스트
word_list = ["사랑해", "귀엽다", "고마워", "행복해"]

print("Let's Learning Korean")

# 각 변수를 선언한 뒤, 초기값을 선언해준다.
total = len(word_list)
incorrect = 0
correct = 0

for word in word_list:
    print(word)
    data = input()
    if data != word:
        # 문제를 틀릴 경우 틀린 개수 +1
        incorrect += 1
    else:
        # 문제를 맞출 경우 맞춘 개수 +1
        correct += 1

# 전체 문제 개수: 4 개
# 맞힌 문제 개수: 2 개
# 틀린 문제 개수: 2 개 (break 하지 않음)
print("전체 문제 개수:", total, " 개")
print("맞힌 문제 개수:", correct, " 개")
print("틀린 문제 개수:", incorrect, " 개")
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/14-2.실습문제5.3.4-해설.p
y
Let's Learning Korean
사랑해
사랑해
귀엽다
귀엽다
고마워
곰 아워
행복해
행볶해
전체 문제 개수: 4  개
맞힌 문제 개수: 2  개
틀린 문제 개수: 2  개
```

<br/><br/>

### [강의 해설]

```python
# 실습문제 5.3.4
# Learning Korean ver 2.0

# 한국어 리스트
word_list = ["사랑해", "귀엽다", "고마워", "행복해"]

# 점수
score = 0

print("Let's Learning Korean")

for word in word_list:
    print(word)
    data = input()
    if data == word: # 정답일 경우
        score += 1 # 점수를 1 증가

print("전체 문제 개수 : ", len(word_list))
print("맞힌 개수 : ", score)
print("틀린 개수 : ", len(word_list) - score)

# 전체 문제 개수: 4 개
# 맞힌 문제 개수: 2 개
# 틀린 문제 개수: 2 개
```

- 점수 변수를 하나만 선언해 활용했다.

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter5/14-2.실습문제5.3.4-해설.p
y
Let's Learning Korean
사랑해
사랑해
귀엽다
귀엽다
고마워
고맙
행복해
행복
전체 문제 개수 :  4
맞힌 개수 :  2
틀린 개수 :  2
```

<br/>

이번 포스팅에서는 반복문 실습문제를 풀어보았다. 다음 포스팅에서는 반복문 실습문제(2)를 풀어보도록 하자.

<br/><br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**