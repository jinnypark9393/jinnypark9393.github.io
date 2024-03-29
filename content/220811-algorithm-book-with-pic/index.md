---
emoji: 🤖
title:  '그림으로 배우는 알고리즘 제 5장 - 정렬과 검색 (1)'
date: '2022-08-11 06:00:00'
author: jinnypark9393
tags: algorithm
categories: 알고리즘
---

# 제 5장: 정렬과 검색(1)

## 48. 정렬(sort)이란 대상을 특정한 규칙에 따라 정렬하는 것

- 데이터 → 사물(객체)에 부여한 **특성**
    - 예: 학생 객체의 특성 → 이름, 키, 기말고사 성적 등
- **정렬(sort)**: 특정한 사물이 가진 특성을 데이터 삼아 여러 개의 사물을 정렬 시키는 처리
- 정렬 순서의 종류
    - 오름차순: 작은 순서대로 나열하기
    - 내림차순: 큰 순서대로 나열하기

## 49. 정렬 알고리즘에는 다양한 종류가 있다

### [정렬 알고리즘의 종류]

1. 버킷 정렬
    - 최 대 값의 개수만큼 버킷을 준비한 다음, 그 곳에 데이터를 저장 및 정렬
2. 기수 정렬
    - 숫자의 각 자리를 기준으로 차례대로 데이터 정렬
3. 단순 선택 정렬
    - 데이터 중에서 최소 값(또는 최대 값)을 찾아 1번째 요소 (도는 마지막 요소)의 데이터와 교환
4. 단순 교환 정렬(버블 정렬)
    - 이웃한 데이터끼리 크고 작음을 비교해 올바른 위치로 데이터 이동
5. 단순 삽입 정렬
    - 정렬할 데이터를 이미 정렬된 데이터들 사이의 올바른 위치에 삽입한다.
6. 셸 정렬
    - 정렬할 데이터들을 일정한 개수의 그룹으로 묶어 정렬
7. 병합 정렬
    - 정렬할 데이터를 반으로 자르고, 자른 데이터를 다시 반으로 자르는 작업을 되풀이한다. 데이터를 더 이상 자를 수 없다면, 자른 데이터들을 정렬한 후 다른 부분들과 병합하고, 다시 정렬시키는 작업을 자른 순서의 역순으로 반복해 정렬
8. 퀵 정렬
    - 정렬할 데이터 안에서 임의의 숫자를 선택하고 그 값의 크고 작음을 기준으로 데이터들을 반으로 쪼갠다. 이 과정을 반복해 정렬한다.
9. 힙 정렬
    - 힙 구조를 이용해 정렬한다.

<br/><br/>