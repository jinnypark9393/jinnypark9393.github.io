---

published: true
title:  "[Kubernetes/CKA]모의고사 3.1 - 서비스 어카운트(Service Account) 생성 및 파드(POD)연결"
excerpt: ""

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

# 모의고사 3.1 - 서비스 어카운트(Service Account) 생성 및 파드(POD)연결

## 1. 문제 요건

Create a new service account with the name `pvviewer`. Grant this Service account access to `list` all PersistentVolumes in the cluster by creating an appropriate cluster role called `pvviewer-role` and ClusterRoleBinding called `pvviewer-role-binding`.Next, create a pod called `pvviewer` with the image: `redis` and serviceAccount: `pvviewer` in the default namespace.

- ServiceAccount: pvviewer
- ClusterRole: pvviewer-role
- ClusterRoleBinding: pvviewer-role-binding
- Pod: pvviewer
- Pod configured to use ServiceAccount pvviewer ?

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

### 2. 서비스 어카운트(Service Account) 생성 및 파드(POD) 연결

- 명령형 커맨드로 서비스 어카운트 생성

```bash
root@controlplane ~ ➜  k create sa pvviewer
serviceaccount/pvviewer created
```

<br/>

- kubectl 을 사용하기 위해 controlplane으로 돌아간다(exit 명령어 입력).

- `create` 명령어로 clusterrole을 생성한다.
    - Tip: `kubectl create clusterrole --help` 로 예문을 찾으면 편리하다.

```jsx
root@controlplane ~ ➜  kubectl create clusterrole pvviewer-role --verb=list --resource=persistentvolume
clusterrole.rbac.authorization.k8s.io/pvviewer-role created
```

<br/>

- `create` 명령어로 clusterrolebinding을 생성한다.

```bash
root@controlplane ~ ➜  kubectl create clusterrolebinding pvviewer-role-binding --clusterrole=pvviewer-role --serviceaccount=default:pvviewer
clusterrolebinding.rbac.authorization.k8s.io/pvviewer-role-binding created
```

<br/>

- `describe` 명령어로 service accoun의 token값을 조사한다.

```bash
root@controlplane ~ ➜  k get secrets 
NAME                   TYPE                                  DATA   AGE
default-token-mq4qs    kubernetes.io/service-account-token   3      28m
pvviewer-token-qblk7   kubernetes.io/service-account-token   3      8m58s

root@controlplane ~ ➜  k describe secrets pvviewer-token-qblk7
Name:         pvviewer-token-qblk7
Namespace:    default
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: pvviewer
              kubernetes.io/service-account.uid: 615f3a88-3d77-4791-8ad4-5ef75b2c3b7d

Type:  kubernetes.io/service-account-token

Data
====
ca.crt:     1066 bytes
namespace:  7 bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6IlF6NzZJdEZLY1BMU19EN1kyQmF5V29JRXR5eHJILWVlc2lWWU1CbHlZWGMifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6InB2dmlld2VyLXRva2VuLXFibGs3Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6InB2dmlld2VyIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiNjE1ZjNhODgtM2Q3Ny00NzkxLThhZDQtNWVmNzViMmMzYjdkIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmRlZmF1bHQ6cHZ2aWV3ZXIifQ.c92qJ0g3X3uHebJGrXR5hnvSEKWRqHm1rn1JyG3DyIsOWFtb_FFvmv4QXXGurHkd0vRSIZsQuHZPp66-XA0MpQsBUG-DB9ahkwv7BDXOOuZW-MGbi0pGqTUDCuW31BTUX5EjaIGrI0IHVJt054wCyElgjcBJFTwlaHEV2PkYIt_EDQL2tOhgaYRns2qfpI7korqbAu-zl9AJsn3Dpe-s0uXCCppEzSem46jAa5vwOIKWqLiXnEX4BCNFyETc5uqy2it6q6z5yBaYspuF98C3kfqyRR6rlzr4OrA0NpSYaQn9VvyTsyHjhzNvEw7apIF6sPEFvKWgH0K4Eekgb6BsGQ
```

<br/><br/>

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)
