---

published: true
title:  "[Kubernetes/CKA]Lightning Lab 3 - KubeConfig 관련 이슈 트러블 슈팅"
excerpt: "(수정중)"

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스자격증, 유데미강의추천, 유데미쿠버네티스, cka연습문제풀이, cka덤프, cka기출문제, cka, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어]

toc: true
toc_sticky: true

date: 2022-05-15
last_modified_at: 2022-05-15

---
<br/><br/>

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

## [참고 URL]