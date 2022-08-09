---
emoji: 💫
title: AWS S3(Simple Storage Service) 및 S3 Glacier란? (Block Storage, Object Storage, File Storage의 차이점)
date: '2022-06-27 06:00:00'
author: jinnypark9393
tags: storage
categories: 클라우드
---

# 1. S3(Simple Storage Service)란?

- [Amazon S3(Simple Storage Service)](https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/Welcome.html)란?: 업계 최고의 확장성, 데이터 가용성, 보안 및 성능을 제공하는 객체(object) 스토리지 서비스
- 사용 예시: 데이터 레이크, 웹 사이트, 모바일 애플리케이션, 백업 및 복원, 아카이브, 엔터프라이즈 애플리케이션, IoT 디바이스, 빅 데이터 분석 등 원하는 양의 데이터를 저장하고 보호할 수 있다.
- S3 오브젝트는 key로 접근하게 된다.
    - key: prefix + filename (예: /abc.jpg)
    - delimeter(/)로 file system을 흉내낸다. (예: /photos/2022/Jul/abc.jpg)
    - Prefix당 요청 제한이 있다(3,500 PUT, COPY, POST, DELETE, 5,500 GET/HEAD).
- 사용 패턴에 따라 다양한 스토리지 클래스를 제공한다.
    
    
    | 스토리지 클래스 | 목적 | 내구성(설계상) | 가용성(설계상) | 가용영역 | 최소 스토리지 기간 | 최소 요금 객체 크기 | 기타 |
    | --- | --- | --- | --- | --- | --- | --- | --- |
    | S3 Standard | 자주 액세스하는 데이터(한 달에 한 번 이상), 밀리초 단위의 액세스 | 99.999999999% | 99.99% | >= 3 | 없음 | 없음 | 없음 |
    | S3 Standard-IA | 밀리초 단위의 액세스로 한 달에 한 번 이따금 액세스하는 수명이 긴 데이터 | 99.999999999% | 99.9% | >= 3 | 30일 | 128KB | GB당 검색 요금이 적용. |
    | S3 Intelligent-Tiering | 알 수 없거나 변경되거나 예측할 수 없는 액세스 패턴이 있는 데이터 | 99.999999999% | 99.9% | >= 3 | 없음 | 없음 | 객체당 모니터링 및 자동화 비용이 적용. 검색 요금 없음. |
    | S3 One Zone-IA | 재생성 가능하고 자주 액세스하지 않는 데이터(한 달에 한 번), 밀리초 단위의 액세스 | 99.999999999% | 99.5% | 1 | 30일 | 128KB | GB당 검색 요금이 적용. 가용 영역의 손실에 대한 복원력이 없음. |
    | S3 Glacier Instant Retrieval | 밀리초 단위의 액세스로 분기에 한 번 액세스하는 수명이 긴 아카이브 데이터 | 99.999999999% | 99.9% | >= 3 | 90일 | 128KB | GB당 검색 요금이 적용. |
    | S3 Glacier Flexible Retrieval | 몇 분에서 몇 시간의 검색 시간으로 1년에 한 번 액세스하는 수명이 긴 아카이브 데이터 | 99.999999999% | 99.99%(객체 복원 후) | >= 3 | 90일 | 40KB | GB당 검색 요금이 적용. 이 객체에 액세스하려면 먼저 보관된 객체를 복원해야 함. |
    | S3 Glacier Deep Archive | 몇 시간의 검색 시간으로 1년에 한 번 미만 액세스하는 수명이 긴 아카이브 데이터 | 99.999999999% | 99.99%(객체 복원 후) | >= 3 | 180일 | 40KB | GB당 검색 요금이 적용. 이 객체에 액세스하려면 먼저 보관된 객체를 복원해야 함.. |
    | RRS(권장되지 않음) | 자주 액세스하는 중요하지 않은 데이터, 밀리초 단위의 액세스 | 99.99% | 99.99% | >= 3 | 없음 | 없음 | 없음 |

<br/><br/>

## 추가) Block Storage vs File Storage vs Object Storage란?

### (1) Block Storage

- 데이터를 일정한 크기의 덩어리(블록)으로 나누어 저장하는 방식
- 블록(block) = 파일보다 작은 단위
- 각 블록은 고유한 주소를 갖고 있어 이 주소를 통해 블록을 재구성 및 데이터 불러오기
- 예시: SAN(Storage Area Network)혹은 가상머신의 디스크로 활용. AWS EBS(Elastic Block Storage)

<br/><br/>

### (2) File Storage

- 파일 & 폴더의 계층구조
- 파일: 이름, 위치, 생성일, 수정일, 크기 등의 제한적 메타데이터를 갖고 있다.
- 파일이 늘어나면 데이터도 늘어나고 파일을 찾는 것도 힘들어진다.
- 예시: DAS(Direct Attached Storage), NAS(Network Attached Storage). AWS EFS(Elastic File Storage)

<br/><br/>

### (3) Object Storage

- 스토리지에 store, get 하기 위해 key, value store에 접근
- key에 해당하는 storage node로 mapping
- 오브젝트(Object)라는 개별 데이터 단위로 저장
- 오브젝트: 비디오, 오디오, 텍스트 등 모든 데이터 유형 포괄
- 평면 구조로 데이터 저장 (≠ 계층 구조)
- 접근이 빠르며 확장성이 높다.
- 오브젝트의 메타데이터에는 사용자가 원하는 상세 정보를 추가할 수 있어 데이터 검색이 유용
- 폭증하는 대량의 데이터를 저장 / 관리하기 좋은 최신 스토리지
- 예시: AWS S3

### [블록 스토리지 vs 파일 스토리지 vs 오브젝트 스토리지]

|  | Block Storage | File Storage | Object Storage |
| --- | --- | --- | --- |
| 장점 | - 데이터를 신속하게 검색
  (계층구조 X, 다양한 경로)
- 다른 운영체제에서 액세스 가능
- 대규모 DB운영에 적합 | - 전통적 데이터 스토리지 시스템
- 사용이 친숙
- 표준화가 잘 되어있다 | - 평면 구조로 데이터 접근이 빠름
- 확장성
- 메타데이터가 오브젝트 자체로 저장되어 접근, 검색이 쉽다 |
| 단점 | - 비용이 많이 든다.
- 관리자 부담 증가
  (메타데이터 처리가 제한적) | - 데이터가 많아지면 성능이 저하
  (파일, 폴더 찾기위한 리소스 사용)
- 시스템을 추가해 스케일 아웃해야한다 | - 오브젝트를 수정할 수 없다
- 수정 대신 덮어쓰기 사용
- 자주 변경되는 데이터에 적합하지 않음(수정이 잘 일어나지 않는 이미지, 영상에 적합) |

<br/><br/>

# 2. S3 Glacier란?

- S3 Glacier(글래이셔)는 archive를 위한 전용 storage class이다.
- HA이며, AES-256 암호화가 적용되어있다.
- Amazon S3 수명주기(Lifecycle)를 이용해 객체를 비용 효율적으로 저장할 수 있다. 다음 두 가지 유형의 작업이 있다.
    - 전환 작업: 객체가 다른 스토리지 클래스로 전환되는 기간(예: 생성 후 6개월 경과한 객체를 S3에서 S3 Glacier Deep Archive 스토리지에 아카이브)
    - 만료 작업: 객체가 만료되는 시기를 정의. 만료 객체는 자동 삭제.

<br/><br/>

# 3. 참고자료

- AWS S3: [https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/Welcome.html](https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/Welcome.html)
- AWS S3 FAQ: [https://aws.amazon.com/ko/s3/faqs/#Amazon_S3_Glacier_Deep_Archive](https://aws.amazon.com/ko/s3/faqs/#Amazon_S3_Glacier_Deep_Archive)

<br/><br/>