---

published: true
title:  "[WEB]API란? (정의, 종류, 장단점)"
excerpt: "API란 두 애플리케이션이 서로 통신하는 방법을 정의한 것이며, API의 종류에는 SOAP API, REST API, GraphQL API등이 있다"

categories:
- DevOps
tags:
- [인프라엔지니어, SRE, DevOps, 데브옵스엔지니어, API란, API종류, API장단점, SOAPAPI, RESTAPI, GraphQL, RPCAPI, WebsocketAPI, Appsync, AWSAPIGateway]

toc: true
toc_sticky: true

date: 2022-07-07
last_modified_at: 2022-07-07

---

<br/><br/>
# 1. API란?

- **API(Application Programming Interface)**: 요청과 응답을 사용하여 두 애플리케이션이 서로 통신하는 방법을 정의한 것이다.
- API 아키텍처는 **클라이언트**와 **서버**로 설명된다.
    - 클라이언트: 요청을 보내는 애플리케이션
    - 서버: 요청을 받는 애플리케이션
- 예를 들어, 기상청의 시스템에는 일일 기상 데이터가 들어있는데, 휴대폰의 날씨 앱은 API를 이용해 이 시스템과 커뮤니케이션하고 휴대폰에 매일 최신 날씨 정보를 표시한다.
- **API 문서**에는 개발자가 요청과 응답을 어떻게 구성하는지에 대한 방법이 들어있다.

# 2. API의 종류

## (1) SOAP API

- 단순 객체 접근 프로토콜을 사용
- XML을 사용하여 메시지를 교환
- 과거에 많이 사용되었던 API
- 유연성이 떨어진다.

## (2) RPC API

- 원격 프로시저 호출 API이다.
- 클라이언트가 서버에서 함수/프로시저를 완료하면 서버가 출력을 클라이언트로 다시 전송한다.

## (3) Websocket API

- JSON 객체를 사용해 데이터를 전달하는 최신 웹 APi중 하나이다.
- 클라이언트 앱과 서버간의 양방향 통신을 지원한다.
- 서버가 연결된 클라이언트에 콜백 메시지를 전송할 수 있어 REST API보다 효율적이다.

## (4) REST API

- **REST(Representational State Transfer) API**: 현재 웹에서 가장 많이 사용되는 API로 유연하다는 특징을 갖고 있다.
- 클라이언트가 서버에 요청을 데이터로 전송한다. 서버가 이 클라이언트 입력을 사용하여 내부 함수를 시작하고, 출력 데이터를 다시 클라이언트에 반환하게 된다.
- REST는 클라이언트가 서버 데이터에 액세스하는 데 사용할 수 있는 GET, PUT, DELETE 등의 함수 집합을 정의하며, 클라이언트와 서버는 HTTP를 이용해 데이터를 교환한다.
- **무상태(stateless)**라는 특징을 갖고 있어 서버가 요청간에 클라이언트 데이터를 저장하지 않는다.
- REST API의 장점
    1. 통합
        - API는 새로운 앱을 기존 소프트웨어 시스템과 통합하는 데 사용된다.
        - 각 기능을 처음부터 작성할 필요가 없어 개발 속도가 빨라진다.
        - API를 사용해 기존 코드를 활용할 수 있다.
    2. 혁신
        - 전체 코드를 다시 작성할 필요 없이 API수준에서 변경해 혁신적인 서비스의 신속한 배포를 지원할 수 있다.
    3. 확장
        - API는 기업이 다양한 플랫폼에서 고객의 요구사항을 충족할 수 있는 기회를 제공한다.
        - 예를 들어, 지도 API를 사용하면 웹 사이트, 모바일 등을 통해 지도 정보를 통합할 수 있다.
        - 어느 기업이나 무료, 유로 API를 사용해 내부 DB에 유사한 액세스 권한을 부여할 수 있다.
    4. 유지관리 용이성
        - API는 두 시스템 간의 게이트웨이 역할을 한다.
        - API가 영향을 받지 않도록 각 시스템은 내부적으로 변경이 필요하다.
        - 한 시스템의 향후 코드 변경이 다른 시스템에 영향을 끼치지 않는다.

## (5) GraphQL

- API용으로 특별히 개발된 쿼리 언어
- 클라이언트에 요청한 데이터만 제공하는 것을 우선으로 한다.
- 빠르고 유연하며 개발자 친화적으로 설계
- 단일 GraphQL 엔드포인트로 여러 데이터베이스, 마이크로 서비스 및 API를 쿼리할 수 있는 기능을 제공

# 3. 관련 AWS 서비스

## (1) AppSync

- AWS의 경우 AppSync에서 DynamoDB, Lambda 등의 데이터 소스에 안전하게 연결해 GraphQL 개발을 용이하게 하는 완전 관리형 서비스. 웹 소켓을 통해 수백만 명의 클라이언트에 실시간 데이터 업데이트를 푸시(Push)한다.
- 디바이스가 오프라인 상태일 때의 로컬 데이터 액세스 기능도 제공.

## (2) Amazon API Gateway

- 여러 API를 동시에 효율적으로 관리할 수 있는 모든 기능이 포함된 서비스.
- Aws poratl 가입 시 최대 100만개의 API호출을 무료로 만들 수 있다.

# 4. 참고자료

- API란 무엇인가요? - [aws.amazon.com/ko/what-is/api/](http://aws.amazon.com/ko/what-is/api/)

<br/><br/>