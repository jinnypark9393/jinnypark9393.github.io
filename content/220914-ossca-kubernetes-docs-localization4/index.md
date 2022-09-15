---
emoji: 🔧
title: '오픈소스 컨트리뷰션 아카데미(쿠버네티스 한글화) - 쿠버네티스 공식문서 한글화에 기여하는 방법(4)리뷰 내용 반영 & 승인 완료'
date: '2022-09-14 21:09:00'
author: jinnypark9393
tags: kubernetes
categories: OSSCA
---

이 포스팅은 유투브에 올라온 **[Kubernetes 오픈소스 컨트리뷰션 방법 소개 (한글화 기여를 통해 쿠버네티스에 참여하기, CNCG2020 발표)](https://www.youtube.com/watch?v=2JiKkPv_IGs)** 및 **[[Youtube]초간단 쿠버네티스 문서 한글화 시작 가이드](https://www.youtube.com/watch?v=OTl8HBjxIhc)** 영상, [Kubernetes Contributor Cheatsheat](https://www.kubernetes.dev/docs/contributor-cheatsheet/), [쿠버네티스 문서 한글화 가이드](https://kubernetes.io/ko/docs/contribute/localization_ko/) 문서를 참조하여 직접PR을 올린 경험을 토대로 작성 된 자료입니다. 혹시 잘못된 부분이 있을 경우에는 메일(jinnypark9393@gmail.com)로 알려주시면 반영하도록 하겠습니다 😊

<br/>

## **쿠버네티스 공식문서 한글화에 기여하는 방법 시리즈**

- [쿠버네티스 공식문서 한글화에 기여하는 방법(1)사전준비 & 이슈 생성하기](https://jinnypark9393.github.io/220710-ossca-kubernetes-docs-localization1/)
- [쿠버네티스 공식문서 한글화에 기여하는 방법(2)소스코드 복사 & 번역하기](https://jinnypark9393.github.io/220717-ossca-kubernetes-docs-localization2/)
- [쿠버네티스 공식문서 한글화에 기여하는 방법(3)PR(Pull Request)생성 & CLA 서명](https://jinnypark9393.github.io/220914-ossca-kubernetes-docs-localization3/)
- [쿠버네티스 공식문서 한글화에 기여하는 방법(4)리뷰 내용 반영 & 승인 완료](https://jinnypark9393.github.io/220914-ossca-kubernetes-docs-localization4/)

<br/>

# 1. 쿠버네티스 공식문서 한글화에 기여하는 방법(4)

## 1. 리뷰 내용 반영

PR을 올린 뒤 며칠을 기다리면 리뷰어분들이나 다른 기여자들이 내가 올린 PR에 대해 검토하고 코드 리뷰 내용을 남겨 주시게 된다(참고 예시 링크: **[Translate tasks/debug/debug-cluster/monitor-node-health into Korean](https://github.com/kubernetes/website/pull/34385)**).

<br/>

한 번에 LGTM(Looks Good To Me: 괜찮아 보인다. 문제 없어 보인다 라는 뜻)을 받으면 좋겠지만, 개선할 부분이 생긴다면 소스코드를 수정한 뒤 다시 업데이트를 진행해야한다.

<br/>

변경사항을 반영할 때에는 아래 절차대로 진행하면 된다.

<br/>

- 내 로컬 저장소의 작업브랜치(예시의 경우에는 `jinnypark9393/monitor-node-health/v0.1` 브랜치)로 돌아가 코드를 수정한다.
- `git add`와 `git commit` 명령어로 커밋을 새로 생성한다.
- `git push origin <작업브랜치>` 명령어로 origin의 작업브랜치에 변경사항을 push한다.
- (Github에서 자동으로 기존 생성한 PR에 변경사항을 업데이트 해준다)

<br/>

이렇게 변경사항을 적용해 새로운 커밋들을 push하게 되면 하나의 PR에 여러 개의 커밋이 쌓이게 되는데, 쿠버네티스 공식문서 한글화팀에서는 PR을 한글화팀 작업 브랜치(예: dev-1.24-ko.1)에 머지할 때 1개 PR당 1개의 commit만 남도록 정리하고 있다.

<br/>

이렇게 여러 개의 커밋을 하나로 합쳐야 할 경우에는 아래의 링크에 기재한 설명대로 git rebase 명령어를 사용해  커밋을 합치면 된다. 

- 참고 링크: ****[Github/Git 여러 개의 커밋을 한개로 합치기(git rebase -i HEAD~3/git squash)](https://jinnypark9393.github.io/220619-git-rebase-squash/)****

<br/>

## 2. 승인 완료

모든 수정 및 커밋 정리가 완료되면 아래와 같이 승인 권한이 있는 멤버분들께서 `lgtm` 및 `approve` 라벨을 코멘트로 달아주게 되고, 이후에는 Prow(쿠버네티스의 CI 도구)가 이 라벨을 인식해 자동으로 한글화팀 작업 브랜치(예시의 경우에는 `dev-1.24-ko.1` 브랜치)로 PR을 병합해준다.

![220914-OSS-Kubernetes-Contribute-to-k8s-Docs-Localization4-01.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/19d3ac76-068f-4155-80a3-d6d58e4861fb/220914-OSS-Kubernetes-Contribute-to-k8s-Docs-Localization4-01.png)

<br/>