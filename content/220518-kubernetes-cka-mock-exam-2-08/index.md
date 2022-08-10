---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA 모의고사 2.8 - 스태틱 파드(Static Pod) 생성하기'
date: '2022-05-18 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# 모의고사 2.8 - 스태틱 파드(Static Pod) 생성하기

## 1. 문제 요건

Create a static pod on `node01` called `nginx-critical` with image `nginx` and make sure that it is recreated/restarted automatically in case of a failure.

Use `/etc/kubernetes/manifests` as the Static Pod path for example.

- static pod configured under /etc/kubernetes/manifests ?
- Pod nginx-critical-node01 is up and running

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다(이미 진행한 경우 불필요).

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

### 2. 스태틱 파드(Static Pod) 생성

- 명령문으로 파드 매니페스트 파일을 생성한 뒤, 매니페스트 파일을 이용해 파드를 생성한ㄷ.

```bash

```

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)
- Debugging DNS Resolution: [https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/](https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/)
  
<br/>