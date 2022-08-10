---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA 모의고사 2.3 - Security Context를 지정한 파드(POD) 생성하기'
date: '2022-05-18 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# 모의고사 2.3 - 커맨드를 지정한 파드(POD) 생성하기

## 1. 문제 요건

Create a new pod called `super-user-pod` with image `busybox:1.28`. Allow the pod to be able to set `system_time`.

The container should sleep for 4800 seconds.

- Pod: super-user-pod
- Container Image: busybox:1.28
- SYS_TIME capabilities for the conatiner?

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

### 2. 커맨드를 지정한 파드(POD) 생성

- 명령문으로 파드 매니페스트 파일을 생성한다.

```bash
root@controlplane ~ ➜  k run super-user-pod --image=busybox:1.28 --dry-run=client -o yaml > super-user-pod.yaml
```

<br/>

- 파드 매니페스트 파일에 수정할 부분이 없는지 확인한다.

```bash
root@controlplane ~ ➜  vi super-user-pod.yaml

====

apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: super-user-pod
  name: super-user-pod
spec:
  containers:
  - command:
    - sleep
    - "4800"
    image: busybox:1.28
    name: super-user-pod
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

<br/>

- Command sleep, “4800” 추가

- `system_time`을 추가해야한다: 쿠버네티스 공식문서에서 Security Context 검색 > Set capabilities for a Container 탭으로 이동

```bash
apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo-4
spec:
  containers:
    image: gcr.io/google-samples/node-hello:1.0
    name: sec-ctx-4
    securityContexts:
      capabilities:
         add: ["NET_ADMIN", "SYS_TIME"]
```


```bash
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: super-user-pod
  name: super-user-pod
spec:
  containers:
  - command:
    - sleep
    - "4800"
    image: busybox:1.28
    name: super-user-pod
    securityContexts:
      capabilities:
         add: ["SYS_TIME"]
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

- Pod 설정 예시파일을 보고 매니페스트 파일을 수정해준다.

<br/>

- 작성한 매니페스트 파일을 이용해 파드를 생성한다.

```bash
root@controlplane ~ ➜  k create -f super-user-pod.yaml 
pod/super-user-pod created
```

<br/>

- 파드가 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k get pods
NAME             READY   STATUS              RESTARTS   AGE
redis-storage    1/1     Running             0          4m5s
super-user-pod   1/1     ContainerCreating   0          31s
```

## 3. 참고 URL

- Configure Security Context: [https://kubernetes.io/docs/tasks/configure-pod-container/security-context/](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)
  
<br/>