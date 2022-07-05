---

published: true
title:  "[AWS]AWS의 CI/CD 툴: AWS CodeCommit, CodeBuild, CodeDeploy, CodePipeline"
excerpt: "AWS의 CI/CD 자동화 툴에는 AWS CodeCommit, CodeBuild, CodeDeploy, CodePipeline가 있다"

categories:
- Cloud
tags:
- [AWS자격증, 클라우드자격증, 클라우드엔지니어, AWSCloudPractitioner 데브옵스엔지니어, DevOps, solutionsarchitect, AWSSA, 솔루션아키텍트, wellarchitectedframework, awsarchitect, awssolutionsarchitect, awscicd, codecommit, codebuild, codedeploy, codepipeline ]

toc: true
toc_sticky: true

date: 2022-07-05
last_modified_at: 2022-07-05

---

<br/><br/>

# 1. AWS CodeCommit

- GIt 기반의 repository를 클라우드 기반으로  제공하는 서비스
- 애플리케이션을 개발하면서 관리할 소스코드를 안전하게 저장, 제어할 수 있는 기능을 제공
- 완전 관리형 서비스로 사용자가 자체 소스코드 제어 시스템을 운영하거나 인프라 규모 조정을 걱정할 필요 없이 코드부터 바이너리까지 모든 사항을 저장
- 비용은 최초 5명의 활성 사용자의 경우 프리티어, 이상일 경우 사용자당 과금
    - 최초 5명의 활성사용자
        - 비용: 0.00 USD
        - 계정당 리포지토리 1,000개, 요청 시 최대 25,000개
        - 매달 50GB의 스토리지
        - 매달 10,000건의 Git 요청
- 최초 5명 이후 추가되는 활성 사
    - 계정당 리포지토리 1,000개, 요청 시 최대 25,000개
    - 활성 사용자당 50GB의 스토리지
    - 활성 사용자당 10,000건의 Git 요청
    - CodeCommit에 해당하는 외부 툴로는 Github, Gitlab 등이 존재

<br/><br/>

# 2. AWS CodeBuild

- 애플리케이션 개발에 필요한 소스코드를 컴파일 및 테스트 후 배포하기 전 단계까지 제공하는 서비스
- 자체 빌드서버가 필요하지 않기 때문에 서버를 직접 설정, 패치 및 업데이트를 적용하고 관리할 필요가 없다(완전 관리형 서비스)
    - Jenkins의 경우 별도 서버세팅이 필요
- 비용은 분 단위로 계산되며, 빌드 제출 시간부터 빌드 종료시까지가 비용 계산에 포함. 끝자리는 반올림 처리.
    - 컴퓨팅 인스턴스(arm1.small, general1.small, general1.medium) 및 지역에 따라 비용 상이.
    - 프리티어: 매월 100분(빌드 시간 기준) build.general1.small 티어.

<br/><br/>

# 3. AWS CodeDeploy

- AWS EC2, ECS 등 컴퓨팅 시스템에 대한 애플리케이션 배포를 자동화하는 완전 관리형 서비스.
- 지속적인 배포를 지원하는 대표적 CD(Continuous Deployment/Continuous Delivery)도구
- 기존 운영 중인 애플리케이션의 영향을 최소화하며 신속하게 배포할 수 있는 기능을 제공
- 비용은 EC2 인스턴스에 코드를 배포하는 경우 무료, 온프레미스에 배포하는 경우에만 1개 서버 당 0.02USD 발생

<br/><br/>

# 4. AWS CodePipeline

- 애플리케이션의 변경 내용을 지속적으로 릴리스 하는 데에 필요한 단계를 자동화
    - 고객으로부터 새로운 개발에 대한 요청이나 버그 수정 요청을 받는다.
    - 개발자는 요청사항을 반영해 소스 리포지토리에 변경사항 업데이트 ⇒ CodePipeline이 자동으로 변경내용 감지
    - 변경 내용을 빌드. 테스트를 구성한 경우에는 테스트 실행
    - 빌드된 코드를 스테이징 서버로 배포. CodePipeline은 스테이징 서버에서 통합 또는 부하 테스트 등의 추가 테스트 진행
    - 파이프라인에 추가한 수동 승인 작업 승인 후 CodePipeline이 테스트 및 승인 된 코드를 운영(production) 인스턴스에 배포
- 비용은 활성 파이프라인 당 월별 1 USD 청구(매월 1개의 활성파이프라인 프리티어 제공)
    - **활성 파이프라인?** 해당 월에 한 번 이상 코드 변경이 수행된 파이프라인
    - 타 서비스에서 작업을 트리거 하는 경우 추가 요금이 발생할 수 있음.

<br/><br/>

# 4. 참고 자료

- AWS에서 CI/CD 파이프라인 설정 - [aws.amazon.com/ko/getting-started/hands-on/set-up-ci-cd-pipeline](http://aws.amazon.com/ko/getting-started/hands-on/set-up-ci-cd-pipeline)

<br/><br/>