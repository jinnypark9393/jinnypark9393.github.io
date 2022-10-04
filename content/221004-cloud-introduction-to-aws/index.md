---
emoji: 💫
title: '클라우드 및 AWS 서비스 소개'
date: '2022-10-04 19:29:00'
author: jinnypark9393
tags: aws
categories: 클라우드
---

# 1. AWS 클라우드 개요 - 리전 및 AZ

## 1. AWS 클라우드의 역사

- 02년 내부에서부터 시작
- 03년 외부 시장에 참여 기획
- 04 SQS 서비스 런칭
- 06 S3, EC2 추가
- 07 유럽 리전 출시
- Gartner Magic Quadrant ⇒ 1위

## 2. Use cases

- 섬세하며 확장가능한 애플리케이션 운용을 가능케 함
- 다양한 산업에 적용 가능
- 다음의 사용례를 포함
    - 기업 IT, 백업 & 스토리지, 빅데이터 분석
    - 웹사이트 호스팅, 모바일 & 소셜 앱
    - 게임

## 3. 글로벌 인프라

- AWS Regions
- AWS Availability Zones
- AWS Data Centers
- AWS Edge locations / Points of Presence
- [https://infrastructure.aws](https://infrastructure.aws)
- 각 리전은 네트워크를 통해 연결(사설 네트워크)
- 파란 점: AZ

### 1. AWS Regions

- AWS는 전 세계에 Regions 을 갖고 있다.
- 이름 예시: us-east-1, eu-west-3, 등
- 리전: 데이터센터들의 클러스터(집합)
- 대부분의 서비스는 한 개의 서비스에 국한된다.
- Q. 만약 당신이 새로운 어플리케이션을 런칭한다면 어디에 할 것인가?
    - 고려요소
        - Compliance with data governance and legal requirements: 법적 규제, 데이터 거버넌스(e.g. 프랑스에서 애플리케이션 런칭한다면 데이터를 대상 국가 내에 보관해야함)
        - Proximity to customers: 레이턴시(지연시간) 줄이기
        - Available Services within a Region: 새로운 서비스 혹은 기능은 모든 리전에서 제공된지 않는다.
        - Pricing: 지역마다 비용이 상이

### 2. AWS Availability Zones

- 각 리전은 여러 개의 Availability Zones(가용영역)을 포함
    - 보통 3개 (최소 2~최대 6개)
    - 예: ap-southeast-2(시드니 리전)
        - ap-southeast-2a
        - ap-southeast-2b
        - ap-southeast-2C
- 각 가용영역은 여유분의 전원, 네트워킹, 연결성을 가진 최소 1개 이상의 개별적 데이터 센터로 이루어져 있다.
- 각 AZ는 분리되어있어 재해로부터 단절된다.
- 각 AZ는 높은 대역폭 & 매우 낮은 지연시간을 가진 네트워크로 연결

### 3. AWS Points of Presence (Edge Locations)

- AWS는 42개국 84도시에 216개의 PoP(전송지점)를 소유 (205 Edge locations & 11 Regional Caches)

## 4. AWS 콘솔

- AWS 의 글로벌 서비스
    - Identity and Access Management(IAM)
    - Route 53 (DNS Service)
    - CloudFront (Content Delivery Network)
    - WAF (Web Application Firewall)

- 대부분의 AWS 서비스는 리전 범위에 국한
    - Amazon EC2 (Infrastructure as a Service)
    - Elastic Beanstalk (Platform as a Service)
    - Lamda (Function as a Service)
    - Rekognition (Software as a Service)

- Region Table:

[AWS 리전 서비스](https://aws.amazon.com/ko/about-aws/global-infrastructure/regional-product-services/)

# 2. AWS 콘솔 및 서비스 둘러보기

- 우측 상단에 리전이 표시됨 (us-east-1)
- 현재 위치와 가까운 곳으로 선택하는 것이 좋음
    - 지연 시간 단축
- 좌측 상단 커서 올리면 모든 서비스를 탐색할 수 있음
- 검색창을 통해 상품 혹은 기능, 문서 및 마켓플레이스도 탐색할 수 있다.

- 예시: IAM 대시보드
    - 리전: 글로벌
- 예시 2: EC2
    - 리전: 아일랜드
    ⇒ EC2는 특정 리전에 국한된다.

<br/><br/>