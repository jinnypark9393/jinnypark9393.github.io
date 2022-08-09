---
emoji: 💫
title: 'AWS의 Well-Architected Framework란?'
date: '2022-06-24 06:00:00'
author: jinnypark9393
tags: cicd
categories: 클라우드
---

# 1. AWS의 Well-Architected Framework란?

AWS서비스를 사용해 구성한 아키텍처들을 평가하는 프레임워크로, AWS에서 시스템 구축을 진행하며 쌓아온 노하우를 살려 AWS의 고객 혹은 파트너사에서 아키텍처를 평가할 수 있는 모범 사례(Best Practice), 그리고 아키텍처가 모범사례에 얼마나 잘 맞는지 평가할 수 있도록 만들었다. 이 Well-Architected Framework를 이용하면 시스템을 구축하면서 내리게 되는 결정의 단점을 이해할 수 있다. 참고로 AWS에서 주관하는 시험 문제들도 이 Well-Architected Framework에 따라 답이 결정되므로 자격증 시험을 준비하는 사람들도 꼭 알아야 한다.

Well-architected에서 평가되는 항목은 운영 우수성, 보안, 안정성, 성능 효율성, 비용 최적화로 총 5가지의 기둥(Pillar)로 구성되며, 최신 Well-Architected Framework 자료를 보려면 [이 링크](https://aws.amazon.com/architecture/well-architected/?wa-lens-whitepapers.sort-by=item.additionalFields.sortDate&wa-lens-whitepapers.sort-order=desc)를 참조하자.

## 1. 운영 우수성

- **[운영 우수성이란?](https://docs.aws.amazon.com/ko_kr/wellarchitected/latest/framework/operational-excellence.html)** 운영 우수성 원칙은 효과적인 개발 및 워크로드 실행을 지원하고, 작업에 대한 인사이트를 얻고, 지원 프로세스 및 절차를 지속적으로 개선하여 비즈니스 가치를 제공할 수 있는 능력을 포함한다.

### 운영 우수성의 예시

- 각 구성요소가 수요에 따라 효과적으로 확장
- Blueprint Architecture를 기반으로, 여러 환경을 쉽게 관리 및 복제할 수 있어야 한다.

## 2. 보안

- **[보안이란?](https://docs.aws.amazon.com/ko_kr/wellarchitected/latest/security-pillar)** 보안 원칙에는 클라우드 기술을 활용하여 보안을 강화하고 데이터, 시스템 및 자산을 보호하는 능력이 포함된다.

### 보안 예시

- 모든 서비스 레이어에 대한 보안 조치

## 3. 안정성

- **[안정성이란?](https://docs.aws.amazon.com/ko_kr/wellarchitected/latest/reliability-pillar/welcome.html)** 워크로드의 기능이 필요한 때에 기능을 정확하고 일관되게 수행. 워크로드를 운영 및 테스트할 수 있는 기능이 포함.

### 안정성의 예시

- 고가용성(High Availability)
- 재해 복구(Disaster Recovery)
- 자가 복구(Auto Healing)
- 스토리지 보관 전략(Archive)

## 4. 성능 효율성

- **[성능 효율성이란?](https://docs.aws.amazon.com/ko_kr/wellarchitected/latest/performance-efficiency-pillar/welcome.html)** 컴퓨팅 리소스를 효율적으로 사용하여 요구 사항을 충족하고 수요 변경 및 기술 변화에 따라 이러한 효율성을 유지

### 성능 효율성 예시

- 고성능 및 높은 처리량의 데이터베이스 구성.
- 글로벌 사용자에게도 낮은 지연시간으로 서비스

## 5. 비용 최적화

- **[비용 최적화란?](https://docs.aws.amazon.com/ko_kr/wellarchitected/latest/cost-optimization-pillar/welcome.html)** 워크로드의 수명 주기에 걸쳐 시스템을 개선하고 구체화하는 지속적인 프로세스. 비용을 최소화하고 조직의 투자 수익률을 극대화하는 동시에 비즈니스 성과를 달성.

### 비용 최적화 예시

- 모든 구성요소에서 비용 효율성 추구

<br/><br/>