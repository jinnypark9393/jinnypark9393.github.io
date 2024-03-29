---
emoji: 🤖
title:  그림으로 배우는 알고리즘 제3장 - 자료구조(3)
date: '2022-05-30 06:00:00'
author: jinnypark9393
tags: algorithm
categories: 알고리즘
---

# 제 3장: 자료구조

## 25. 계산대 앞에 줄을 서듯 대기하는 자료구조가 대기 행렬(큐)

- **큐(queue)/대기행렬**: 먼저 입력한 데이터가 먼저 출력되는 특징을 가진 자료구조.
- 예: 슈퍼에서 계산하기 위해 기다리는 대기자, ATM기에 줄 서서 기다리는 사람들
    - 대기열의 1번째 사람부터 용무를 보게 된다.
    - 중간에 끼어들거나 & 순서를 어기고 새치기 (X)
- 먼저 입력한 데이터가 먼저 출력되는 데이터 관리 방법: **FIFO**(First In, First Out), **LILO**(Last In, Last Out)

<br/>

## 26. 끈으로 엮어 데이터를 관리하는 것이 리스트

- 1차원 배열
    - 데이터들은 차례대로 빈틈없이 나열된다.
    - 데이터의 **순서가 고정**되어있다.
    - 데이터 개수 관리: **다른 변수** 사용
    
- 리스트
    - 데이터들은 모두 떨어져 있지만, 끈으로 묶여 있다.
    - 데이터의 순서가 고정되어있지 않아 **데이터의 위치에 구애받지 않는다**.
    - 데이터 개수 관리: **다음 데이터에 연결된 끈**이 있는지 여부

<br/>

## 27. 한쪽 방향에서 데이터를 찾아가는 단방향 리스트

- **단방향 리스트**: 리스트 안에서 앞쪽에서 뒷쪽을 가리키는 방향성을 가진 끈으로 순서가 있는 데이터 연결 방식
- 단방향의 각 요소는 다음 2가지 항목을 가지고 있다.
    - **데이터**
    - **다음 요소를 가리키는 포인터(NEXT 포인터)**
- **마지막 요소**의 NEXT 포인터 ⇒ **종료 정보** 저장
- **1번째 요소**를 가리키는 포인터 ⇒ **HEAD 포인터**
- 단방향 리스트: HEAD 포인터 ~ NEXT 포인터 = 종료 정보

<br/>

## 28. 양쪽 방향에서 데이터를 찾아가는 양방향 리스트

- **양방향 리스트:** 리스트 안에서 앞에서부터 뒤를 가리키는 끈과 뒤에서 앞을 가리키는 끈 2개를 사용해 순서 있는 데이터를 연결
- 양방향의 각 요소는 다음 3가지 항목을 가지고 있다.
    - 데이터
    - 다음 요소를 가리키는 포인터(**NEXT 포인터**)
    - 이전 요소를 가리키는 포인터(**PREV 포인터**)
- 마지막 요소인 NEXT 포인터 & 1번째 요소인 PREV 포인터 ⇒ 종료정보 저장
- 양방향의 추가 요소
    - **HEAD 포인터**: 1번째 요소를 가리키는 포인터
    - **TAIL 포인터**: 마지막 요소를 가리키는 포인터
  
<br/><br/>