---

published: true
title:  "[Kubernetes/CKA]모의고사 1.2 - 레이블(Label)을 지정한 파드(POD) 생성하기"
excerpt: "명령형 커맨드로 파드(POD)의 레이블을 지정하여 매니페스트 파일을 생성한다"

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스자격증, 유데미강의추천, 유데미쿠버네티스, cka연습문제풀이, cka덤프, cka기출문제, cka, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어]

toc: true
toc_sticky: true

date: 2022-05-17
last_modified_at: 2022-05-17

---

<br/><br/>

# 모의고사 1.2 - 레이블(Label)을 지정한 파드(POD) 생성하기

## 1. 문제 요건

Deploy a `messaging` pod using the `redis:alpine` image with the labels set to `tier=msg`.

- Pod Name: messaging
- Image: redis:alpine
- Labels: tier=msg

<br/><br/>

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다(이미 설정했으면 중복 설정 불필요).

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

<br/><br/>

### 2. 명령문으로 파드(POD) 생성

- 명령문을 사용해 Pod 매니페스트 파일을 생성한다.

```bash
root@controlplane ~ ➜  k run messaging --image=redis:alpine -l tier=msg --dry-run=client -o yaml > messaging.yaml
```

<br/>

- 생성된 매니페스트 파일 내용이 맞는지 확인한다.

```bash
root@controlplane ~ ➜  vi messaging.yaml

====

apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    tier: msg
  name: messaging
spec:
  containers:
  - image: redis:alpine
    name: messaging
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

<br/>

- 매니페스트 파일을 이용해 파드를 생성한다.

```bash
root@controlplane ~ ➜  k create -f messaging.yaml 
pod/messaging created
```

<br/>

- 파드가 제대로 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k get pods
NAME        READY   STATUS    RESTARTS   AGE
messaging   1/1     Running   0          14s
nginx-pod   1/1     Running   0          3m22s
```

<br/>

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)