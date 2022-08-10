---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA 모의고사 1.5 - 서비스(Service) 노출하기'
date: '2022-05-17 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# 모의고사 1.5 - 서비스(Service) 노출하기

## 1. 문제 요건

Create a service `messaging-service` to expose the `messaging` application within the cluster on port `6379`.

Use imperative commands.

- Service: messaging-service
- Port: 6379
- Type: ClusterIp
- Use the right labels

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

### 2. 명령형 커맨드를 이용해 서비스(Service) 생성

- 명령문으로 서비스의 매니페스트 파일을 생성한 뒤 저장한다.

```bash
root@controlplane ~ ➜  k expose pod messaging --name=messaging-service --port=6379 --type=ClusterIP --dry-run=client -o yaml > messaging-service.yaml
```

<br/>

- 매니페스트 파일이 제대로 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  vi messaging-service.yaml

====

apiVersion: v1
kind: Service
metadata:
  creationTimestamp: null
  labels:
    tier: msg
  name: messaging-service
spec:
  ports:
  - port: 6379
    protocol: TCP
    targetPort: 6379
  selector:
    tier: msg
  type: ClusterIP
status:
  loadBalancer: {}
```

<br/>

- 매니페스트 파일을 이용해 서비스를 생성한다.

```bash
root@controlplane ~ ➜  k create -f messaging-service.yaml 
service/messaging-service created
```

<br/>

- 서비스가 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k get service -o wide
NAME                TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE   SELECTOR
kubernetes          ClusterIP   10.96.0.1        <none>        443/TCP    28m   <none>
messaging-service   ClusterIP   10.102.189.233   <none>        6379/TCP   40s   tier=msg
```

<br/><br/>

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)

<br/>