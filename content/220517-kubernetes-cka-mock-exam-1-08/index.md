---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA 모의고사 1.8 - 파드(POD) 특정 네임스페이스에 생성하기'
date: '2022-05-17 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# 모의고사 1.8 - 파드(POD) 특정 네임스페이스에 생성하기

## 1. 문제 요건

Create a POD in the `finance` namespace named `temp-bus` with the image `redis:alpine`.

- Name: temp-bus
- Image Name: redis:alpine

<br/><br/>

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다(이미 진행한 경우 불필요).

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

<br/><br/>

### 2. 특정 네임스페이스(Namespace)에 파드(POD)생성

- 명령문으로 파드의 매니페스트 파일을 생성한다.

```bash
root@controlplane ~ ➜  k run -n finance temp-bus --image=redis:alpine --dry-run=client -o yaml > temp-bus.yaml
```

<br/>

- 매니페스트 파일이 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  vi temp-bus.yaml

====

apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: temp-bus
  name: temp-bus
  namespace: finance
spec:
  containers:
  - image: redis:alpine
    name: temp-bus
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

<br/>

- 매니페스트 파일을 이용해 파드를 생성한다.

```bash
root@controlplane ~ ➜  k create -f temp-bus.yaml 
pod/temp-bus created
```

<br/>

- 파드가 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k get pods -n finance
NAME       READY   STATUS    RESTARTS   AGE
temp-bus   1/1     Running   0          71s
```

<br/><br/>

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)

<br/>