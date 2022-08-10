---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA 모의고사 1.7 - 스태틱 파드(Static Pod) 생성하기'
date: '2022-05-17 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# 모의고사 1.7 - 스태틱 파드(Static Pod) 생성하기

## 1. 문제 요건

Create a static pod named `static-busybox` on the controlplane node that uses the `busybox` image and the command `sleep 1000`.

- Name: static-busybox
- Image: busybox

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

### 2. YAML 파일을 선언형으로 생성해 스태틱 파드(Static Pod) 생성

- 스태틱 파드가 생성되는 경로를 찾는다.

```bash
root@controlplane /etc/kubernetes ➜  cd manifests/

root@controlplane /etc/kubernetes/manifests ➜  ls -al
total 28
drwxr-xr-x 1 root root 4096 May 16 12:53 .
drwxr-xr-x 1 root root 4096 May 16 12:53 ..
-rw------- 1 root root 2183 May 16 12:53 etcd.yaml
-rw------- 1 root root 3807 May 16 12:53 kube-apiserver.yaml
-rw------- 1 root root 3314 May 16 12:53 kube-controller-manager.yaml
-rw------- 1 root root 1384 May 16 12:53 kube-scheduler.yaml
```

<br/>

- 매니페스트 파일을 저장한다.

```bash
root@controlplane /etc/kubernetes/manifests ➜  k run static-busybox --image=busybox --dry-run=client -o yaml --command -- sleep 1000 > static-busybox.yaml
```

<br/>

- 매니페스트 파일이 잘 생성되었는지 확인한다.

```bash
root@controlplane /etc/kubernetes/manifests ➜  cat static-busybox.yaml 
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: static-busybox
  name: static-busybox
spec:
  containers:
  - command:
    - sleep
    - "1000"
    image: busybox
    name: static-busybox
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

<br/>

- 스태틱 파드(Static Pod)가 잘 생성되었는지 확인한다.

```bash
root@controlplane /etc/kubernetes/manifests ➜  k get pods -A
NAMESPACE     NAME                                   READY   STATUS    RESTARTS   AGE
default       hr-web-app-99dfd4c9d-nwvlr             1/1     Running   0          8m6s
default       hr-web-app-99dfd4c9d-xfpx5             1/1     Running   0          8m6s
default       messaging                              1/1     Running   0          23m
default       nginx-pod                              1/1     Running   0          26m
default       static-busybox-controlplane            1/1     Running   0          83s
```

<br/><br/>

## 3. 참고 URL

- 스태틱 파드 생성하기: [https://kubernetes.io/ko/docs/tasks/configure-pod-container/static-pod/](https://kubernetes.io/ko/docs/tasks/configure-pod-container/static-pod/)

<br/>