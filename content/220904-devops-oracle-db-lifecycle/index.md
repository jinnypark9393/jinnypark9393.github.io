---
emoji: 💫
title:  'Oracle JDBC drive(ojdbc)란 및 호환 JDK버전'
date: '2022-09-04 15:51:00'
author: jinnypark9393
tags: database
categories: 데브옵스
---

# 1. 배경 상황

진행하고 있던 프로젝트에서 Oracle DB 버전 업데이트로 인해 ojdbc 라이브러리 파일을 교체했는데, JDBC 자체의 개념에 대해 어렴풋이 이해하기만 하고 깊게 생각해 본 적이 없는 듯해 정리해두려 한다.

<br/>

# 2. JDBC란?

**JDBC**란 Java Database Connectivity의 약자로, 자바(Java)에서 데이터베이스에 접근할 수 있게 해주는 API이다.

<br/>

Java는 DBMS(Oracle, MySQL 등)의 종류에 관계 없이 하나의 JDBC 인터페이스I를 이용해 데이터 베이스 작업을 처리하게 된다. 각 데이터베이스 벤터 혹은 서드파티에서 이러한 JDBC 인터페이스를 구현한 드라이버를 제공하고 있다.

<br/>

JDBC는 아래와 같은 역할을 수행한다.

- Java 코드에서 데이터베이스 서버 접속
- SQL문을 구성하고 데이터베이스 서버에서 실행
- 데이터베이스에서 처리한 결과를 가져옴
- 데이터베이스 정보 가져옴

<br/>

# 3. Oracle JDBC와 JDK 버전 호환성

먼저, ojdbc의 버전 정보를 살펴보기 전, OracleDB의 지원 기간에 대해 알아보자.

| DB버전 | GA Date | 프리미어 지원 종료 | 연장 지원 종료 | 지속 지원(sustaining support) 종료 |
| --- | --- | --- | --- | --- |
| 19c(LTS) | 19년 4월 | 24년 4월 | 27년 4월 | 무기한 |
| 18.3 | 18년 7월 | 21년 6월 | 종료 | 무기한 |
| 12.2 | 17년 3월 | 20년 11월 | 종료 | 무기한 |
| 12.1 | 13년 6월 | 18년 7월 | 종료 | 무기한 |

<br/>

Oracle 데이터베이스 버전과 호환되는 JDK이다.

| OracleDB 버전 | 호환되는 JDBC 파일 버전 |
| --- | --- |
| 21.1 | ojdbc11.jar(JDK 11, 12, 13, 14, 15 포함)
ojdbc8.jar(JDK 8, 11, 12, 13, 14, 15 포함) |
| 19.x | ojdbc10.jar(JDK 10, 11 포함)
ojdbc8.jar(JDK 8, 9, 11 포함) |
| 18.3 | ojdbc8.jar(JDK 8, 9, 10, 11 포함) |
| 12.2또는 12cR2 | ojdbc8.jar(JDK 8 포함) |
| 12.1 또는 12cR1 | ojdbc7.jar(JDK 7, 8 포함)
ojdbc6.jar(JDK 6 포함) |
| 11.2 또는 11gR2 | ojdbc6.jar(JDK 6, 7, 8 포함) → 참고: JDK7 & 8는 11.2.0.3 및 11.2.0.4에서만 지원
ojdbc5.jar(JDK 5 포함) |

<br/>

그 다음은 Oracle JDBC와 표준 JDBC의 관계이다.

| OracleDB 버전 | 호환되는 JDBC 파일 버전 |
| --- | --- |
| 21.1 | ojdbc11.jar(JDBC 4.3)
ojdbc8.jar(JDBC 4.2) |
| 19.x | ojdbc10.jar(JDBC 4.3)
ojdbc8.jar(JDBC 4.2) |
| 18.3 | ojdbc8.jar(JDBC 4.2) |
| 12.2또는 12cR2 | ojdbc8.jar(JDBC 4.2) |
| 12.1 또는 12cR1 | ojdbc7.jar(JDBC 4.1)
ojdbc6.jar(JDBC 4.0) |
| 11.2 또는 11gR2 | ojdbc6.jar(JDBC 4.0) → 참고: JDK7 & 8는 11.2.0.3 및 11.2.0.4에서만 지원
ojdbc5.jar(JDBC 3.0) |

<br/>

# 4. 참고 자료

- **Oracle JDBC FAQ** - [https://www.oracle.com/kr/database/technologies/faq-jdbc.html](https://www.oracle.com/kr/database/technologies/faq-jdbc.html)
- **Oracle Lifetime Support Policy** - [https://www.oracle.com/us/assets/lifetime-support-technology-069183.pdf](https://www.oracle.com/us/assets/lifetime-support-technology-069183.pdf)

<br/>