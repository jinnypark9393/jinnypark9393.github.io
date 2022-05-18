---

published: true
title:  "[Kubernetes/CKA]모의고사 3.8 - kubeconfig 파일 트러블슈팅"
excerpt: "(수정중)kubeconfig 파일을 열어보고 포트 번호 등 설정을 확인한다"

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스자격증, 유데미강의추천, 유데미쿠버네티스, cka연습문제풀이, cka덤프, cka기출문제, cka, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어]

toc: true
toc_sticky: true

date: 2022-05-19
last_modified_at: 2022-05-19

---

<br/><br/>

# 모의고사 3.8 - kubeconfig 파일 트러블슈팅

## 1. 문제 요건

A kubeconfig file called `super.kubeconfig` has been created under `/root/CKA`. There is something wrong with the configuration. Troubleshoot and fix it.

- Fix /root/CKA/super.kubeconfig

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

### 2. kubeconfig 파일 트러블슈팅

- 명령형 커맨드로 파드 생성하기

```bash
root@controlplane ~ ➜  k run hr-pod --image=redis:alpine -l environment=production,tier=frontend -n hr
Error from server (NotFound): namespaces "hr" not found
```

- `hr` 네임스페이스가 없다는 에러 발생

- `hr` 네임스페이스를 생성한다.

```jsx
root@controlplane ~ ✖ k create ns hr
namespace/hr created
```

- 다시 명령형 커맨드로 파드를 생성한다.

```bash
root@controlplane ~ ➜  k run hr-pod --image=redis:alpine -l environment=production,tier=frontend -n hr
pod/hr-pod created
```


## 3. 참고 URL

- kubectl 치트 시트: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)