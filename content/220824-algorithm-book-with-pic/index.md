---
emoji: 🤖
title:  '그림으로 배우는 알고리즘 제 5장 - 정렬과 검색 (9)'
date: '2022-08-24 21:58:00'
author: jinnypark9393
tags: algorithm
categories: 알고리즘
---

# 제 5장: 정렬과 검색(9)

## 64.  비교할 필요가 없는 문자열은 건너 뛰고 고속으로 검색하는 ‘KMP 알고리즘’

- KMP(Knuth, Morris, Pratt) 알고리즘: 문자열 안에서 부분 문자열을 검색할 때, 부분 문자열로 검색에 실패한 위치를 바탕으로 다음번 검색 위치를 효율적으로 결정하는 알고리즘
- 실패함수에 다음과 같은 정보를 넘겨 각 조건에 따라 다음 번에 문자 비교를 시작해야 할 가장 효율적 위치를 구한다.
    - 부분 문자열이 불일치된 문자의 위치
    - 나열된 부분 문자열의 문자 데이터
- 예시: 문자열 STR “ABCABCDA’안에서 문자열 SUB “ABCD”를 찾을 경우
    - STR[0]~[2] 3문자와 SUB의 1문자부터 문자 3개가 일치하나 STR[3]의 ‘A’와 SUB 4번째 문자(’D’)가 불일치
    - 여기서 문자열 SUB의 문자가 모두 다르므로, STR[1]~[2]의 (’BC’)와 SUB[2]의 ‘C’는 부분 문자열의 1번째 문자와 일치할 수 없다.
    - 다음에는 STR[3]~과 SUB[0]을 비교하는 것이 좋음
- 예시2: 문자열 STR “ABABABCD’안에서 문자열 SUB “ABABC”를 찾을 경으
    - STR[0]~[3] 4번째 문자와 SUB의 1문자부터 문자 4가 일치하고, STR[4]의 ‘A’와 SUB 5번째 문자(’C’)가 불일치
    - 여기서 문자열 SUB에서 AB라는 문자열이 반복되므로, STR[2]~[3]의 (’AB’)와 SUB의 처음부터 2번째 문자(’AB’)와 일치할 수 없다.
    - 다음에는 STR[4]~와 SUB[2]를 비교하는 것이 좋음

<br/>

## 65. 문자열을 끝에서부터 검색하는 BM알고리즘

- BM알고리즘: 문자열을 끝에서부터 비교하다 일치하지 않는 문자를 만났을 때 그 위치에 맞춰 검색 위치의 이동 범위를 효과적으로 결정(Boyer, Moore 고안자 2명의 이름을 따 지어진 이름)
- 특징: 검색할 문자열의 끝에서부터 비교하며, 문자 불일치 감지 시 불일치한 문자를 기준으로 검색위치를 효율적으로 변경
- 예시: 문자열 STR “ABCFABCDF”에서 문자열 SUB “ABCD”를 찾아내는 경우
    - SUB의 마지막 문자 SUB[3](’D’) & STR[3](’F’)를 비교해 불일치 판정
    - 이 시점에서 STR의 불일치 문자가 중요. ‘F’는 검색 문자열에 포함되어있지 않음. 즉 이 문자 ‘F’를 포함한 문자 4개 위치에서는 검색할 문자열이 절대 존재하지 않음
    - 문자를 비교할 다음 위치는 STR[4]~[7]까지임
- 예시2: 문자열 STR “ABCBCABD” 안에서 문자열 SUB “CBCAB”를 찾는 경우
    - SUB의 마지막 문자 SUB[4](’B’) & STR[4](’C’)를 비교해 불일치 판정
    - ‘C’는 검색 문자열에 2곳 포함. 이 문자열 끝부분에 보다 가까운 문자가 위치하는 ‘C’가 위치하는 SUB[2]를 방금 불일치로 판정한 STR[4]와 동일한 위치로 단숨에 이동

<br/>