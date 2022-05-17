---

published: true
title:  "[Kubernetes/CKA]모의고사 2.8 - 스태틱 파드(Static Pod) 생성하기"
excerpt: "etcd 파드 상세 정보를 참고해 백업 파일 명령어를 실행한다"

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스자격증, 유데미강의추천, 유데미쿠버네티스, cka연습문제풀이, cka덤프, cka기출문제, cka, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어]

toc: true
toc_sticky: true

date: 2022-05-18
last_modified_at: 2022-05-18

---

<br/><br/>

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