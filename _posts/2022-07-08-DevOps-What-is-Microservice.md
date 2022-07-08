---

published: true
title:  "[DevOps]마이크로서비스(Microservice)란?"
excerpt: "마이크로서비스란 하나의 큰 애플리케이션을 작은 애플리케이션으로 쪼개 변경과 조합이 가능하도록 만든 것이며, 배포 용이성, 확장 가능성, 장애복구, 유지보수 측면에서 모놀리틱 보다 향상되었다"

categories:
- DevOps
tags:
- [인프라엔지니어, SRE, DevOps, 데브옵스엔지니어, 애플리케이션아키텍처, 마이크로서비스란, 모놀리식서비스란, 모놀리틱서비스랑, 마이크로서비스모놀리식비교]

toc: true
toc_sticky: true

date: 2022-07-08
last_modified_at: 2022-07-08

---

<br/><br/>

# 1. 모놀리틱 아키텍처 vs 마이크로서비스 아키텍처

## (1) 모놀리틱 아키텍처(Monolithic Architecture)

- 애플리케이션의 모든 구성 요소가 한 프로젝트에 통합되어있다.
- 기능별로 독립적이지 않다(예: 한 프로젝트 내에 기능을 폴더로 구분)

## (2) 마이크로서비스 아키텍처(Microservice Architecture)

- 하나의 큰 애플리케이션을 작은 애플리케이션으로 쪼개 변경과 조합이 가능하도록 만든 것.
- 기능별로 독립적인 서비스를 구성한다(예: 기능별 도커 컨테이너 생성)
- 마틴 파울러와 제임스 루이스에 의하면 마이크로 서비스는 아래와 같다.
    
    > In short, the microservice architectural style is an approach to developing a single application as a **suite of small services**, each **running in its own process** and communicating with lightweight mechanisms, often an HTTP resource API. These services are **built around business capabilities** and **independently deployable** by fully automated deployment machinery. There is a **bare minimum of centralized management** of these services, which may be written in different programming languages and use different data storage technologies.
    > 
    - suite of small services, each running in its own process(개별 프로세스로 구동되는 작은 서비스)
    - Independently deployable(독립적 배포 가능)

# 2. 모놀리틱 아키텍처와 마이크로서비스 아키텍처의 장단점

## (1) 모놀리틱 아키텍처(Monolithic Architecture)

### [장점]

- End-to-End 테스트가 용이하다.
    - 한 개 프로젝트에서 모든 기능이 있기 때문
- 단순한 아키텍처 구조로 개발 초기에 빠르게 간단한 서비스를 만들 수 있다.
- 배포가 간단하다.

### [단점]

- 작은 수정사항이 있을 경우에도 전체를 다시 빌드 및 배포해야한다.
- 많은 양의 코드가 몰려있어 개발자가 모든 코드를 이해하기 힘들며, 유지보수가 힘들다.
- 덩치가 커져서 구동시간이 늘어나고, 빌드 및 배포 시간도 늘어난다.
- 일부분의 오류가 전체에 영향을 미친다()장애전파.
    - 작은 프로젝트에서 시작해 기능을 추가하면서 확장하다보면 수정하지 않은 부분에서 에러가 발생하는 경우가 있다.
- 각 기능에 따라 다른 언어를 사용할 수 없다.

## (2) 마이크로서비스 아키텍처(Microservice Architecture)

### [장점]

- 배포
    - 서비스별 개별 배포가 가능하다.
    - 거대한 서비스도 빠르게 수정해 요구사항을 신속하게 반영할 수 있다.
- 확장
    - 특정 서비스에 대한 확장성이 용이하다.
    - 클라우드 사용에 적합하다.
- 장애
    - 장애가 전체 서비스로 확장될 가능성이 적다.
    - 부분적 장애에 대한 격리가 수월하다
- 코드/유지보수
    - 팀 별로 프로젝트를 분리해 코드의 이해도가 증가하며, 유지보수도 쉽다.
    - 신기술의 적용이 유연하고 여러 프로그래밍 언어, 패러다임을 이용해 개발/운영 할 수 있다.

### [단점]

- 성능
    - 서비스 간 호출 시 API를 이용하기 때문에 통신비용 및 지연 시간이 증가한다.
- 데이터 관리
    - 데이터가 여러 서비스에 분산되므로 한번에 조회 어렵고 정합성 관리가 어렵다.
- 테스트 / 트랜잭션
    - 단위 테스트는 쉽지만 End-to-End 테스트가 불편하다.
    - 각 서비스 별 데이터베이스가 존재해 트랜잭션을 구현하기 까다롭다.
- 모니터링이 힘들다 (Service Mesh 도입으로 해결)

# 3. 참고자료

- 마이크로서비스 - [aws.amazon.com/ko/microservices](http://aws.amazon.com/ko/microservices)

<br/><br/>
