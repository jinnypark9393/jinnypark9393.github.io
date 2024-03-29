---
emoji: 🤖
title:  '그림으로 배우는 알고리즘 제 5장 - 정렬과 검색 (6)'
date: '2022-08-20 08:38:00'
author: jinnypark9393
tags: algorithm
categories: 알고리즘
---

# 제 5장: 정렬과 검색(6)

## 58. 기존 데이터와 크기를 비교해 데이터를 2등분하는 퀵정렬

- 퀵 정렬: 정렬에 소요되는 시간이 매우 짧은 고속 알고리즘(정렬할 데이터 수가 많을 경우 단순 교환 정렬, 단순 삽입 정렬보다 처리속도가 빠름)
- 데이터 열 중 임의의 데이터 P(기준값)을 선택
- P보다 작은값을 하나, 큰 값을 하나로 묶어 새로운 데이터열 생성
- 데이터 P의 위치를 고정시키는 작업이 중요
- 예시: 11개의 데이터열을 퀵정렬을 통해 오름차순 정렬
    - 임의의 데이터를 하나 골라 P라는 이름을 붙인다
    - 나머지 데이터 중 P보다 작은 데이터 → S열
    - P보다 큰 데이터 → L열
    - 예를 들어 P보다 작은 데이터가 3개, 큰 데이터가 7개일 경우 정렬순서는 아래와 같다.
        - ([S1] [S2] [S3]) [P] ([L1] [L2] [L3] [L4] [L5] [L6] [L7])
    - 이 때 P의 위치를 4번째로 고정 시키는 것이 중요하다.
    - 동일한 작업을 S열, L열에 적용한다(임의의 값 Ps, Pl을 골라 정렬).
        - ([S11] [Ps] [L11]) [P] ([S21] [S22] [S23] [S24] [Pl] [L21] [L22])
            
            → Ps가 2번째, Pl이 9번째로 새롭게 고정
            
    - 위 작업을 그룹 안의 데이터 수가 1개 이하가 될 때까지 반복한다.
    
<br/>

## 59. 힙 구조를 이용해 정렬하는 힙 정렬

- 힙 정렬: 힙의 특성(이진 트리에서 부모노드의 값은 항상 자식 노드의 값보다 작거나 크다)을 이용한 정렬
- 예시: 데이터를 오름차순으로 정렬
    - 부모 노드의 값이 항상 자식 노드의 값보다 커지는 힙을 이용
    - 이진 트리의 루트(뿌리) 부분에는 데이터 열 안의 최대 값이 저장된다.
    - 데이터를 오름차 순으로 정렬하려면: 데이터 열을 힙 구조로 만들고 루트 값을 꺼내 정렬된 영역에 추가
- 예시2: 요소수가 N개인 데이터 열을 힙 구조로 만드는 순서
    - 데이터 열(D1, D2, … Dn)을 이진트리 구조의 깊이가 얕은쪽의 왼쪽부터 차례로 나열
        - 1단계: I = N/2, T = I 로 한다
        - 2단계: I ≥ 일때, 아래의 3단계를 반복한다.
        - 3단계: Dt, D2t, D2t+1을 비교한다.
            - Dt가 최대 → I = I -1, T = I로 한다.
            - D2t가 최대 → Dt와 D2t를 교환하여 T = 2T로 한다.
            - D2t+1가 최대 → Dt와 D2t를 교환하여 T = 2T+1로 한다.
            - 자식 D2t, 자식 D2t+1이 없을 때 → I = I -1, T = I로 한다.
    - 이 절차를 수행하면 반드시 D1(루트 위치)에 데이터 열 ㅜㅈㅇ의 최대값이 저장되므로 그 값을 반복해 꺼내면 정렬된 데이터 열을 구할 수 있다.

<br/>