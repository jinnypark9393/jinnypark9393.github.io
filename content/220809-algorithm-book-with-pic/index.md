---
emoji: 🤖
title:  그림으로 배우는 알고리즘 제 4장 - 기본적인 알고리즘(5)
date: '2022-08-09 06:00:00'
author: jinnypark9393
tags: algorithm
categories: 알고리즘
---

# 제 4장: 기본적인 알고리즘(5)

## 44. 시간의 크고 작음을 비교하려면 단위를 초 단위로 통일한다

- 시간의 크고작음을 계산할 때에는 시간, 분, 초 순서대로 비교하는 알고리즘으로 구할 수도 있지만 초 단위로 시간을 통일시켜 비교하는 것이 더 좋다(컴퓨터는 연산에 특화 되었기 때문)
- 시 분 초를 초단위로 변환하는 계산식
    - H시 M분 S초 = H*3600 + M*60 + S
    - 예: 6시 32분 12초(A) 7 7시 10분 52초(B)
        - 6*3600 + 32*60 + 12 = 32532 (A)
        - 7*3600 + 10*60 + 52 =25832 (B)

<br/>

## 45. 시간차를 구할 때에는 초 단위로 바꾸어 뺄셈하고, 다시 시간으로 바꾼다

- 시간을 초단위로 바꾸는 식
    - H시 M분 s초 = H*3600 + M*60 + S
- 초 단위 값인 TIME을 H시 M분 S초로 변환
    
    1단계: TIME을 3600으로 나눈 몫의 정수 부분 =H
    
    2단계: TIME을 3600으로 나눈 나머지 값이 R
    
    3단계: R을 60으로 나눈 몫이 M
    
    4단계: R을 60으로 나눈 나머지 값이 S
    
- 예시
    
    1단계: TIME1에 H1 *3600 + M1 *60 + S1 대입
    
    2단계: TIME2에 H2 *3600 + M2 *60 + S2대입
    
    3단계: DIFF에 TIME2 - TIME1을 대입
    
    4단계: H에 DIFF를 3600으로 나눈 몫의 정수 부분을 대입
    
    2단계: TIME을 3600으로 나눈 나머지 값이 R
    
    3단계: R을 60으로 나눈 몫이 M
    
    4단계: R을 60으로 나눈 나머지 값이 S

<br/><br/>