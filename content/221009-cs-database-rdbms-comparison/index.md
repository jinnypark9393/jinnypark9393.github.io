---
emoji: 💫
title: '데이터베이스(Database) 비교 - Oracle, MySQL, PostgreSQL, SQLite'
date: '2022-10-09 19:29:00'
author: jinnypark9393
tags: database
categories: CS
---

# 데이터베이스(Database) 비교 - Oracle, MySQL, PostgreSQL, SQLite

## 1. 배경 상황

이전 회사 팀원분들과 토이 프로젝트를 준비하고 있는데, 데이터베이스를 선정하기 전 각 데이터베이스에 어떤 장단점이 있는지 살펴보았다. 데이터베이스는 필요에 따라 데이터를 일정한 형태로 저장해 놓는 것을 뜻하는데, 이 데이터베이스를 관리할 수 있는 시스템을 DBMS라고 한다. DBMS에는 관리형 데이터베이스 시스템(RDBMS: Relational Database System)과, NoSQL로 구분되는데, 이번에는 RDBMS의 대표격인 Oracle, MySQL, PostgreSQL, 그리고 Django 프레임워크에서 기본적인 연동이 제공되는 SQLite를 비교해보도록 하겠다.

<br/>

## 2. Oracle

- 장점
    - 고성능(빠른 속도)
    - 여러 가지 기능 제공
    - 백업 등 안정성
    - 대기업에서 많이 사용
- 단점
    - 라이선스 비용이 비쌈
    - 유지보수 비용 비쌈
    - 무료 버전의 용량 및 기간 제한 존재

<br/>

## 3. MySQL(MariaDB)

- 장점
    - 오픈소스로 무료 사용 가능 (상업용으로는 유료)
    - MySQL과 거의 유사한 MariaDB는 상업용일 경우에도 무료 사용 가능(MariaDB는 MySQL이 오라클에 인수되며 오픈소스 진영에서 MySQL 소스코드를 기반으로 만들어진 DBMS)
    - 속도, 성능 일반적인 수준 만족
    - 상위 몇 개 레코드를 가져오는 등 작은 범위 조회에 유리
- 단점
    - 복잡한 쿼리에서 성능 저하
    - 대량 데이터 조회 시 성능 저하가 발생

<br/>

## 4. PostgreSQL

- 장점
    - 오픈소스로 상업용으로도 무료 사용 가능
    - 오라클만큼 기능도 풍부하며 성능 보장
    - 신뢰성 및 안정성 높음
    - 데이터 대량 입력 시 성능 좋음
    - 인스타그램, 스카이프 등 기업에서 사용하여 안정성 및 신뢰성 있는 데이터베이스
- 단점
    - 업데이트 시 Update 대신 Delete 후 Insert를 하게 되어있어 업데이트 속도가 저하됨

<br/>

## 5. SQLite

- 장점
    - Django와 기본 연동 되어있어 별도 설정이 필요 없다
    - 백업이 간편(파일을 통째로 복사)
    - 경량화되어있으며, 적은 메모리 환경에서도 좋은 성능을 보임
- 단점
    - 서버 없이 로컬 파일에 데이터를 저장하므로 외부 접속 시 복잡한 우회방법 필요
    - 한 명의 사용자만 동시접근 가능, 멀티 유저 사용 시 프록시 레이어 필요
    - 편의 기능 부족
    - 테스트 목적 외 부적합

<br/>