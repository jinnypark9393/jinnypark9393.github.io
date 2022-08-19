---
emoji: 🤖
title:  '그림으로 배우는 알고리즘 제 5장 - 정렬과 검색 (2)'
date: '2022-08-12 06:00:00'
author: jinnypark9393
tags: algorithm
categories: 알고리즘
---

# 제 5장: 정렬과 검색(2)

## 50. 다른 배열(bucket)에 데이터를 저장하고 정렬하는 버킷 정렬

- 버킷 정렬: 가장 간단한 정렬 알고리즘이나 장소적 자원(배열의 크기)를 많이 소모한다.
- 정렬 순서
    - 정렬할 데이터 중 가져올 수 있는 값의 범위만큼 버킷을 준비
    - 정렬할 데이터를 버킷 번호에 맞춰 저장
    - 모든 데이터를 버킷에 넣은 후, 1번째 버킷부터 차례대로 버킷 데이터를 가져옴
- 정렬 순서
    
    **1단계**; 버킷 역햘을 할 배열 BUCKET을 준비하고 전체 내용을 Empty 값으로 초기화
    
    **2단계**: 정렬할 배열(N개)의 첨자를 저장하는 저장하는 변수 I를 0으로 초기화
    
    **3단계**: I가 N미만일 경우 아래의 4~6단계 반복
    
    **4단계**: VALUE에 DATA[I]를 ㄷ입
    
    **5단계**: BUCKET[VALUE]에 VALUE를 대입
    
    **6단계** I의 값을 1 증가
    
    **7단계**: BUCKET의 처음 요소부터 차례대로 값이 저장되어있을 경우 데이터를 꺼냄
    
- Empty 값 → 데이터가 비어 있음을 나타내는 값으로 취급하는 데이터 외의 값이라면 무엇이든 상관 없다. 0, -1을 자주 사용한다.

## 51. 아래 자릿수부터 윗 자릿수까지 버킷 정렬을 반복하는 기수 정렬

- 기수 정렬: 데이터가 여러 개 들어갈 수 있는 버킷을 이용해 정렬. 버킷 속 데이터 순서 관리가 가능
- 정렬 데이터의 자릿수가 k일 경우 버킷 정렬을 k번 실시
- 정렬 데이터 각 자릿수별 들어갈 수 있는 범위 만큼 버킷을 준비(예: 10진수 숫자 정렬 → 한 자리당 0~9를 사용하므로 버킷이 10개 필요)
- 모든 숫자를 정렬한 뒤 0번째 버킷부터 마지막 버킷까지 차례로 저장된 값을 꺼내면 정렬된 데이터 열을 구할 수 있다.
- 정렬할 데이터 열이 3자리(k=3) 10진수 일 경우의 정렬 단계
    
    **1단계**: 정렬할 데이터들의 1의 자리를 기준으로 0번 버킷 ~ 9번 버킷에 나눠 저장
    
    **2단계**: 0번 버킷 → 9번 버킷 순서대로, 그 안에 저장된 데이터들을 10의 자리를 기준으로 0번 버킷 ~ 9번 버킷에 나누어 저장
    
    **3단계**: 0번 버킷 → 9번 버킷 순서대로, 그 안에 저장된 데이터를 100의 자리를 기준으로 0번 버킷 ~ 9번 버킷에 나눠 저장
    
- 기수 정렬에서 중요한 사항
    - 정렬 자릿수의 선택 방향을 가장 낮은 자릿수에서 윗자릿수로 할 것
    - 아래 자리에서 이미 정렬된 데이터들의 순서를 그대로 유지할 것

<br/>