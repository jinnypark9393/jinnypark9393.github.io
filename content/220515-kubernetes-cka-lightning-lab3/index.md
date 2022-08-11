---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA Lightning Lab 3 - KubeConfig 관련 이슈 트러블 슈팅'
date: '2022-05-15 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# 3. KubeConfig 트러블 슈팅

## [문제 요건]

- `/root/CKA` 경로에 `admin.kubeconfig` kubeconfig 파일이 생성되었으나 무언가 잘못되었다. 트러블 슈팅 후 고칠 것
- 채점 기준
    - /root/CKA/admin.kubeconfig 고치기

<br/><br/>

## [내 풀이]

- kubeconfig 파일을 살펴보자.

```bash
root@controlplane:~# cd /root/CKA
root@controlplane:~/CKA# ls -al
total 16
drwxr-xr-x 2 root root 4096 May 15 04:49 .
drwx------ 1 root root 4096 May 15 04:44 ..
-rw------- 1 root root 5564 May 15 04:49 admin.kubeconfig
root@controlplane:~/CKA# cat admin.kubeconfig 
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: [encrypted ca]
    server: https://controlplane:4380
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
current-context: kubernetes-admin@kubernetes
kind: Config
preferences: {}
users:
- name: kubernetes-admin
  user:
    client-certificate-data: [encrypted-certification]
    client-key-data: [encrypted-key]
```

<br/>

```bash
root@controlplane:~/CKA# k config view
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://controlplane:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
current-context: kubernetes-admin@kubernetes
kind: Config
preferences: {}
users:
- name: kubernetes-admin
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED
```

<br/>