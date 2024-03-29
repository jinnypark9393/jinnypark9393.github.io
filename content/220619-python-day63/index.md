---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 63일차'
date: '2022-06-19 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘은 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 2의 파이썬에서의 정규표현식 사용방법(1)을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-19-Python-Photo1](/assets/images/2022-06-19-Python-Photo/2022-06-19-Python-Photo1.jpg)

![2022-06-19-Python-Photo2](/assets/images/2022-06-19-Python-Photo/2022-06-19-Python-Photo2.jpg)

<br/><br/>

# 01. 정규표현식 소개

- 정규표현식: 문자열에서 특정 패턴을 찾고 싶을 때
    - 조건문, 반복문 들을 복잡하게 사용해야할 때 사용
- 유효성 검사: if문을 사용하면 여러 줄에 걸쳐 작업해야하나 정규표현식은 아주 빠르게 할 수 있다.정

<br/>

## 정규 표현식의 장점

- 문자열 추출, 유효성 검사에서 유용하게 쓰일 수 있다.
- 거의 모든 언어에서 지원(범용성이 높다)

<br/>

## 정규 표현식의 단점

- 가독성이 좋지 못하다.
- 유지보수가 힘들다(내가 짠 코드를 남이 이해하기 어렵고, 남이 짠 코드를 내가 이해하기 어렵다).
    - 예: `^(?=.*[A-Za-z]...(생략)`

<br/><br/>

# 02. 정규표현식 사용방법(1)

## 1. 정규표현식 연습 사이트 소개

- 실습 사이트: [https://regexr.com/639t5](https://regexr.com/639t5)
- Expression: 해당 사이트에서 정규표현식을 입력하는 곳. `/` 사이에 정규표현식을 입력하면 된다.
- `gm` : Flag(정규표현식의 옵션)
- Text: 정규표현식을 적용할 샘플 텍스트
- Tools: 정규표현식의 매칭 결과의 설명
- Cheatsheet: 표현식을 정리해놓은 시트

<br/>

- Expression에 Hello를 넣어보자.

```python
/Hello/gm
```

<br/>

- Text에 표시되는 결과는 아래와 같다.
    - 몇 개가 매칭되었는지, 매치에 걸린 시간이 우측 상단에 표시된다.
    - 매칭된 결과는 색이 다르게 표시된다(Hello)

```python
안녕하세요. 스타트코딩입니다.
코딩을 최대한 쉽고 재미있게 배울 수 있도록 끊임없이 연구하고 있습니다.

궁금한 사항이 생기면 아래 SNS를 통해 질문을 남겨 주세요.
여러분의 열정과 도전을 함께 하겠습니다.

**Hello**. This is startcoding.
startcoding constantly studying to make coding as easy and fun as possible.

If you have any questions, please leave them on SNS below
I will share your passion and challenge.

-티스토리
https://startcoding0.tistory.com

-네이버블로그
https://blog.naver.com/kkj6369

-유튜브
http://www.youtube.com/channel/UCHwhZ7HPBhUh2IscPSL0pHA

-email
kkj6369@naver.com

**여러분 행복한 부자되세요!** \(--)/ /(__)\ 꾸벅	

apple pineapple appleappleapple

rait rabit rabbit rabbbit rabbbbit

#좋아요, #좋아요반사, #팔로우, #맞팔,

grey gray

I am a tiny tiny boy.
May I have have a question?

[특가할인]소가죽 샌들 -레몬스토어
[품절]스마트 워치 -레몬스토어
[품절]브이넥 반팔 티셔츠 -애플스토어
쿨링밴딩 팬츠 -바나나스토어
[특가할인]남친룩 오버핏 셔츠 -래빗팜
[특가할인]여친룩 오버핏 셔츠 -래빗팜
```

<br/><br/>

## 2. 정규표현식 사용방법(1)

### 1. Flags

- 실습 사이트 우측 상단에 위치
- 정규표현식의 옵션을 설정할 수 있다.
- 현재 실습환경에서는 `gm` 이 설정되어있는데 `global` 과 `multiline` 이 활성화 되어있다는 뜻이다.

<br/>

- `global` : 전체 텍스트에서 검색하게 하는 옵션(옵션이 비활성화 되어있을 경우 첫번째로 매칭되는 값에만 표시된다.)
- `multiline` : 라인별로 범위를 지정하는 것(옵션이 비활성화 되어있을 경우 텍스트 전체를 한개의 범위로 본다.)

<br/><br/>

### 2. Character classes

- `.` : 개행을 제외한 모든 문자를 다 찾겠다는 뜻
- `\w` (word): 문자/숫자(alphanumeric), 밑줄(`_`)을 역슬래시로 가져온다.
- `\W` : 위와 반대의 개념
- `\d` (digit): 숫자만 검색한다.
- `\D` : 숫자가 아닌 것만 검색한다.
- `\s` : 공백인 것만 검색한다.
- `\S` : 공백이 아닌 것만 검색한다.
- `[abc]` : a, b, 혹은 c가 들어간 것만 검색한다(or)
- `[^abc]` : a,b,c가 아닌 값만 가져온다.
- `[a-k]` : a~k 사이의 문자를 가져온다.
- `[가-힣]` : 한글이 들어간 문자를 가져온다.

<br/><br/>

### 3. Anchors

- `^abc` : 문장의 시작을 가져온다.
- 예시: `^https/gm`
    
    ```python
    안녕하세요. 스타트코딩입니다.
    코딩을 최대한 쉽고 재미있게 배울 수 있도록 끊임없이 연구하고 있습니다.
    
    궁금한 사항이 생기면 아래 SNS를 통해 질문을 남겨 주세요.
    여러분의 열정과 도전을 함께 하겠습니다.
    
    Hello. This is startcoding.
    startcoding constantly studying to make coding as easy and fun as possible.
    
    If you have any questions, please leave them on SNS below
    I will share your passion and challenge.
    
    -티스토리
    **https**://startcoding0.tistory.com
    
    -네이버블로그
    **https**://blog.naver.com/kkj6369
    
    -유튜브
    **http**://www.youtube.com/channel/UCHwhZ7HPBhUh2IscPSL0pHA
    
    -email
    kkj6369@naver.com
    
    **여러분 행복한 부자되세요!** \(--)/ /(__)\ 꾸벅	
    
    apple pineapple appleappleapple
    
    rait rabit rabbit rabbbit rabbbbit
    
    #좋아요, #좋아요반사, #팔로우, #맞팔,
    
    grey gray
    
    I am a tiny tiny boy.
    May I have have a question?
    
    [특가할인]소가죽 샌들 -레몬스토어
    [품절]스마트 워치 -레몬스토어
    [품절]브이넥 반팔 티셔츠 -애플스토어
    쿨링밴딩 팬츠 -바나나스토어
    [특가할인]남친룩 오버핏 셔츠 -래빗팜
    [특가할인]여친룩 오버핏 셔츠 -래빗팜
    ```
    
    - 총 3개가 매칭된다.

<br/>

- `abc$` : 문장의 끝을 가져온다.
    - 예시: `/com$/gm` ⇒ com으로 끝나는 문장을 가져온다.

<br/>

- `\b` : 지정한 첫 문자(열)로 시작 혹은 끝나는 단어를 가져온다.
    - 예시 1: `\bapple` ⇒ apple로 시작하는 단어를 가져온다.
    - 예시 2: `apple\b` ⇒ apple로 끝나는 단어를 가져온다.

<br/>

- `\B` : 지정한 첫 문자(열)로 시작 혹은 끝나지 않는 단어를 가져온다.
    - 예시 1: `\Bapple` ⇒ apple로 시작하지 않는 단어를 가져온다.
    - 예시 2: `apple\B` ⇒ apple로 끝나지 않는 단어를 가져온다.

<br/><br/>

### 4. Escaped Characters

- `\.` : 문자 `.` 을 찾는다.
- `\*` : 문자 `*` 를 찾는다.
- `\\` : 문자 `\` 를 찾는다.
- `\t` : `tab` 키 입력을 찾는다.
- `\n` : 개행(linefeed)문자를 찾는다.
- `\r` : 현재 위치를 나타내는 커서 를 맨 앞으로 이동시키는 캐리지 리턴(carriage return) 문자를 찾는다.

<br/><br/>

이번 포스팅에서는 강의의 파트 2의 정규표현식 사용방법(1)을 알아보았다. 다음 포스팅에서는 정규표현식 사용방법(2)에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**