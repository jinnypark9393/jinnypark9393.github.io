---
emoji: 🐍
title:  Python 패스트캠퍼스 챌린지 69일차
date: '2022-07-20 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 셀프 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 강의 1일 1강 포스팅 챌린지 :)

<br/><br/>

# 03. Django Database Modeling(1)

## 1. DB 모델링이란?

- 어떤 Item에 속성데이터(의 포맷)를 사전에 정의하는 것
- 예: Jobs 이라는 Table에 각 Job의 정보를 정의
    - 산업
    - 연봉
    - 근무지
    - 수정일
    - 생성일

## 2. Django Modeling

- Django에서 id는 기본 값(Primary Key: PK) 정의하지 않아도 자동 정의 **(Django의 특수 기능)**
    - id외의 다른 컬럼을 PK로 사용하고 싶다면 primary key = true 해서 컬럼을 생성 & id 컬럼 생성되지 않음
- 외래 키(Foreign Key)를 사용하면 뒤에 xxxx_id를 자동 생성
    - 예: Job에 위치를 추가하고 싶은데 위치가 다른 테이블에 있는 경우, location으로 정의해주면 location_id로 데이터 컬럼이 생성됨

## 3. Django DB 컬럼 타입

- Django 3.0으로 넘어오면서 새롭게 생긴 컬럼 타입 등 필요한 컬럼들을 정리한 것.

- CharField (길이가 정해진 문자열)
    - 길이가 정해진 문자열은 스토리지 / 최적화가 비교적 편함
    - 길이를 정해주어야하는 필드 → CharField사용 (아닐 경우 TextField 사용)
- IntegerField (-2147483648 ~ 2147483647)
- PositiveIntegerField
    - 양수만 사용할 때
- BigIntegerField(-9223372036854775808 ~ 9223372036854775807)
    - 새로운 필드(새로운 프로젝트를 생성하면 이 필드가 PK)
- PositiveBigIntegerField
- DataField(날짜)
- DatetimeField(날짜 + 시간)
- BooleanField(True/False)
    - 0(false) / 1(true)
- TextField(길이가 정해지지 않은 문자열)
    
    ⇒ 블로그 글, 상품설명 등 길이가 얼마가 될 지 모르는 문자열 저장에 사용
    
- EmailField(이메일 포맷)
- JSONField(JSON 포맷)
- AutoField(Auto Increment 필드 withIntegerField)
    - 들어가는 순서에 따라 숫자가 늘어난다.
- BigAutoField(Auto Increment 필드 withIntegerField, BigIntegerField)
- ForeignKey (다른 테이블 PK 참조필드)

## 4. 다음 시간 예습

Django를 처음에 마이그레이션하게 되면 자동으로 유저 테이블을 생성한다.

| 컬럼(Users Table) | 데이터 |
| --- | --- |
| pay_plan | Foreign Key |

프로젝트를 위해 새로운 테이블을 생성하였다.

| 컬럼(PayPlan) | 데이터 |
| --- | --- |
| id | Big Integer |
| name | CharField |
| price | IntegerField |
| updated_at | DateTimeField |
| created_at | DateTimeField |

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**

<br/><br/>