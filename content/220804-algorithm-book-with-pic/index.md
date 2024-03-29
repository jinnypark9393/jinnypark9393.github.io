---
emoji: 🤖
title:  그림으로 배우는 알고리즘 제 4장 - 기본적인 알고리즘(1)
date: '2022-08-04 06:00:00'
author: jinnypark9393
tags: algorithm
categories: 알고리즘
---

# 36. 1~N의 합을 구하려면 반복 처리한다.

- 1~N의 합은 다음 계산식으로 구할 수 있다.
    - 1 + 2 + 3 + … + (N-1) + N
- 다음과 같이 반복처리를 통해 구할 수 있다.
    
    **1단계**: 합계를 저장하는 변수 SUM을 0으로 초기화한다.
    
    **2단계**: 합계에 더할 값을 저장하는 변수 VALUE에 1을 저장한다.
    
    **3단계**: VALUE에 N 이하인 동안에 다음 4~5단계를 반복한다.
    
    **4단계**: SUM + VALUE를 계산해 그 값을 SUM에 대입한다.
    
    **5단계**: VALUE값을 1 증가시킨다. 

<br/>

# 37. 수열의 값을 유지하려면 배열을 사용한다

- 다양한 수열의 값을 유지하려면 배열을 사용하는 것이 가장 간단하다.
- 예: 피보나치 수열을 배열에 저장하고 유지하자
    - 피보나치 수열: n번째(n ≥ 0)의 값을 Fn이라고 했을 때, 아래 조건을 만족하는 수열.
    - F0=0
    - F1=1
    - Fn+2 = Fn + Fn+1 (n≥0)
- 1번째 요소부터 N개(n ≥ 2)의 피보나치 수열을 배열 F에 저장하는 알고리즘은 아래와 같다.
    
    **1단계**: F[0]에 0을, F[1]에 1을 대입한다.
    
    **2단계**: 변수 I에 2를 대입한다.
    
    **3단계**: F[4] = F[2] + F[3]
    
    **4단계**: I가 N 미만인 동안, 아래 5~6단계를 반복한다.
    
    **5단계**: F[I] 에 F[I-2] + F[I-1]을 대입한다.
    
    **6단계**: I의 값을 1 더한다.
