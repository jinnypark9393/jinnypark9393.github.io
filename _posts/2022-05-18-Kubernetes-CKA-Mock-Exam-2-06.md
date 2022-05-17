---

published: true
title:  "[Kubernetes/CKA]모의고사 2.6 - 유저 생성 및 권한 부여하기"
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

# 모의고사 2.6 - 유저 생성 및 권한 부여하기

## 1. 문제 요건

Create a new user called `john`. Grant him access to the cluster. John should have permission to `create, list, get, update and delete pods` in the `development` namespace . The private key exists in the location: `/root/CKA/john.key` and csr at `/root/CKA/john.csr`.

`Important Note`: As of kubernetes 1.19, the CertificateSigningRequest object expects a `signerName`.Please refer the documentation to see an example. The documentation tab is available at the top right of terminal.

- CSR: `john-developer`; Status: Approved
- Role Name: `developer`; namespace: `development`; Resource: `Pods`
- Access: User 'john' has appropriate permissions

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다.

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

### 2. 유저 생성 및 권한 부여

- 명령문으로 디플로이먼트(Deployment) 매니페스트 파일을 생성한다.

```bash

```

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)