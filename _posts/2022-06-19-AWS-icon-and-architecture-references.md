---

published: true
title:  "[AWS]서비스 아이콘 모음 및 아키텍처/다이어그램 작성에 유용한 자료"
excerpt: "AWS 서비스를 표현하는 아이콘 모음 및 아키텍처/다이어그램 작성에 유용한 자료를 정리해보았다."

categories:
- Cloud
tags:
- [AWS자격증, 클라우드자격증, 클라우드엔지니어, AWSCLF, AWSCloudPractitioner 데브옵스엔지니어, DevOps, solutionsarchitect, AWSSA, 솔루션아키텍트 ]

toc: true
toc_sticky: true

date: 2022-06-19
last_modified_at: 2022-06-19

---

<br/><br/>

최근 AWS 서비스 아키텍처를 그려야 할 일이 생겨 노션에 간단하게 정리하다 AWS 아이콘 모음과 아키텍처를 그릴 때 유용한 사이트, 정보 포스팅을 작성해보았다.

<br/>

# 1. AWS 서비스 아이콘 이미지 모음

AWS는 아키텍처 다이어그램을 그리기 위한 아이콘 이미지 모음을 공식 웹사이트에서 제공한다(아래 웹사이트 링크에서 서드파티 툴들도 소개하고 있는데 대부분 AWS에서 제공하는 아이콘 이미지로 아키텍처를 그리는 듯).

<br/>

- **AWS Architecture Icons:** [https://aws.amazon.com/ko/architecture/icons/](https://aws.amazon.com/ko/architecture/icons/)

<br/>

AWS는 서비스가 수시로 업데이트되고 추가되는 만큼, 아이콘들도 주기적으로 업데이트 되기 때문에 기존에 다운로드 받아놓았다 하더라도 그릴 때마다 새로 받아서 그리는 것을 추천한다.

<br/>

참고로 아이콘들은 다크모드/일반모드 배경 및 pptx,ppt,svg,png 등 다양한 포맷으로 제공되고 있으니 본인이 원하는 스타일의 파일을 다운로드 받으면 된다.

<br/>

참고로 아이콘 pptx를 살펴보면 아이콘 자체 뿐만아니라 해당 프레젠테이션 덱의 사용법도 나와있으니 잘 살펴보자.

<br/><br/>

# 2. 아키텍처 예시

AWS는 공식 웹사이트의 아키텍처 센터에서 벤치마킹할만한 아키텍처 및 발표 자료, 백서 등을 제공한다. 원하는 서비스나 구조 등이 있으면 검색으로 찾아서 볼 수 있다.

<br/>

- **AWS 아키텍처 센터:** [https://aws.amazon.com/ko/architecture](https://aws.amazon.com/ko/architecture)

<br/>

참고로 AWS 의 유명한 서비스가 대부분 들어가 있는 기본 아키텍처를 참고하고 싶다면 워드프레스(Wordpress)라는 호스팅 플랫폼에 웹페이지를 구성한 아키텍처를 참고해보자.

<br/>

- **Hosting WordPress on AWS:** [https://github.com/aws-samples/aws-refarch-wordpress](https://github.com/aws-samples/aws-refarch-wordpress)

![Hosting WordPress on AWS](/assets/images/2022-06-19-AWS-icon/2022-06-19-AWS-icon.png)

<br/>

살펴보면 알겠지만 ALB, Cloudfront, Route53, EC2 등 실제로 많이 쓰이는 요소가 배치되어있다.

<br/>

이 외에도 다양한 상황에서의 글들이 많이 올라와있으니 확인해보자.

<br/><br/>

# 3. Well-Architecture Framework

AWS에서 아키텍처를 그릴 때 여섯 개의 축을 가지고 아키텍처를 그리게 되는데, 이 설계원칙을 `AWS Well-Architected` 라고 한다.

<br/>

AWS의 Well-Architected란 아래와 같은 총 6가지 원칙을 준수한다(6번의 지속 가능성 원칙은 최근에 추가된 것으로 보인다).

<br/>

### 1. 운영 우수성 원칙

운영 우수성 원칙은 시스템을 실행 및 모니터링하고 프로세스와 절차를 지속적으로 개선하는 데 중점을 둔다. 주요 주제에는 **변경 자동화, 이벤트 대응 및 일상적인 작업 관리를 위한 표준 정의**가 포함된다.

<br/>

### 2. 보안 원칙

보안 원칙은 정보와 시스템을 보호하는 데 중점을 둔다. 주요 주제에는 **데이터의 기밀성 및 무결성, 사용자 권한 관리, 보안 이벤트 감지를 위한 제어 설정**이 포함된다.

<br/>

### 3. 안정성 원칙

안정성 원칙은 의도한 기능을 수행하는 워크로드와 요구 사항을 충족하기 위해 실패로부터 신속하게 복구하는 방법에 중점을 둔다. 주요 주제에는 **분산 시스템 설계, 복구 계획** 및 **변화하는 요구 사항에 대한 적응**이 포함된다.

<br/>

### 4. 성능 효율성 원칙

성능 효율성 원칙은 IT 및 컴퓨팅 리소스의 구조화되고 간소화된 할당에 중점을 둔다. 주요 주제에는 워크로드 요구 사항에 **최적화된 리소스 유형 및 크기 선택, 성능 모니터링**, 비즈니스 요구 사항 변화에 따른 **효율성 유지**가 포함된다.

<br/>

### 5. 비용 최적화 원칙

비용 최적화 원칙은 불필요한 비용 발생을 방지하는 데 중점을 둔다. 주요 주제에는 **시간 경과에 따른 지출 이해 및 자금 할당 제어, 올바른 유형 및 수량의 리소스 선택, 초과 지출 없이 비즈니스 요구를 충족하도록 확장**이 포함됩니다.

<br/>

### 6. **지속 가능성 원칙**

지속 가능성 원칙은 클라우드 워크로드 실행이 환경에 미치는 영향을 최소화하는 데 중점을 둔다. 지속 가능성을 위한 **공동 책임 모델, 영향 이해 및 활용**을 극대화하여 필요한 리소스를 최소화하고 다운스트림 영향을 줄이는 방법과 같은 주요 주제를 다룬다.

<br/>

이 외에도 AWS에서 Well-Architected Labs라는 Lab을 제공해 위의 원칙들을 어떻게 적용해나가는 지 실습해볼 수 있다.

<br/>

- **Well-Architected Labs:** [https://www.wellarchitectedlabs.com/](https://www.wellarchitectedlabs.com/)

<br/><br/>