---

published: true
title:  "[Kubernetes/CKA]모의고사 2.7 - 파드(POD)와 서비스 생성 및 DNS Lookup"
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

# 모의고사 2.7 - 파드(POD)와 서비스 생성 및 DNS Lookup

## 1. 문제 요건

Create a nginx pod called `nginx-resolver` using image `nginx`, expose it internally with a service called `nginx-resolver-service`.

Test that you are able to look up the service and pod names from within the cluster. Use the image `busybox:1.28` to create a pod for dns lookup. Record results in `/root/CKA/nginx.svc` and `/root/CKA/nginx.pod` for service and pod name resolutions respectively

- Pod: nginx-resolver created
- Service DNS Resolution recorded correctly
- Pod DNS resolution recorded correctly

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다(이미 진행한 경우 불필요).

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

### 2. 파드(POD)와 서비스 생성 및 DNS Lookup

- 명령문으로 파드 매니페스트 파일을 생성한 뒤, 매니페스트 파일을 이용해 파드를 생성한ㄷ.

```bash
root@controlplane ~ ➜  k run nginx-resolver --image=nginx --dry-run=client -o yaml > nginx-resolver.yaml

root@controlplane ~ ➜  k create -f nginx-resolver.yaml 
pod/nginx-resolver created
```

- 명령문으로 서비스를 생성한다.

```bash
root@controlplane ~ ➜ k expose pod nginx-resolver --name=nginx-resolver-service --port=8080
service/nginx-resolver-service exposed
```

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)
- Debugging DNS Resolution: [https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/](https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/)