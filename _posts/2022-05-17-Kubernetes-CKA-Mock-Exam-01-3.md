---

published: true
title:  "[Kubernetes/CKA]모의고사 1.3 - 네임스페이스(Namespace) 생성하기"
excerpt: "명령형 커맨드로 네임스페이스(Namespace)를 손쉽게 생성할 수 있다"

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

# 모의고사 1.3 - 네임스페이스(Namespace) 생성하기

## 1. 문제 요건

Create a namespace named `apx-x9984574`.

- Namespace: apx-x9984574

<br/><br/>

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다(이미 설정해놓은 경우 불필요).

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

<br/><br/>

### 2. 명령문을 사용해 네임스페이스(Namespace) 생성

- 명령문을 사용해 네임스페이스(namespace)를 생성한다.

```bash
root@controlplane ~ ➜  k create ns apx-x9984574
namespace/apx-x9984574 created
```

<br/>

- 네임스페이스가 제대로 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k get ns
NAME              STATUS   AGE
apx-x9984574      Active   3s
default           Active   17m
kube-node-lease   Active   17m
kube-public       Active   17m
kube-system       Active   17m
```

<br/><br/>

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)