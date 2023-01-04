---
emoji: 💫
title:  'MacOS zsh에서 wget 다운로드(zsh: command not found: wget)받기'
date: '2022-12-17 09:36:00'
author: jinnypark9393
tags: wget
categories: devops
---

# 1. 배경 상황

EKS 실습 중에 wget으로 AWS Load balance 설정 파일을 다운로드 받아야 하는 부분이 있는데 wget을 실행하니 명령어를 찾을 수 없다는 메시지가 나왔다.

```bash
➜  manifests git:(master) wget https://github.com/kubernetes-sigs/aws-load-balancer-controller/releases/download/v2.4.4/v2_4_4_full.yaml
zsh: command not found: wget
```

<br/>

# 2. 해결 방법

사실 해결 방법은 매우 간단한데, brew로 wget 패키지를 다운받으면 된다.

```bash
➜  manifests git:(master) brew install wget
```

<br/>