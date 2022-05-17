---

published: true
title:  "[Kubernetes/CKA]모의고사 1.6 - 디플로이먼트(Deployment) 생성하기"
excerpt: "명령형 커맨드로 디플로이먼트(Deployment) YAML를 생성한 뒤 생성한다"

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

# 모의고사 1.6 - 디플로이먼트(Deployment) 생성하기

## 1. 문제 요건

Create a deployment named `hr-web-app` using the image `kodekloud/webapp-color` with `2` replicas.

- Name: hr-web-app
- Image: kodekloud/webapp-color
- Replicas: 2

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

### 2. 명령문으로 디플로이먼트(Deployment) 생성

- 명령문으로 디플로이먼트의 매니페스트 파일을 생성한 뒤 저장한다.

```bash
root@controlplane ~ ➜  k create deployment hr-web-app --image=kodekloud/webapp-color --replicas=2 --dry-run=client -o yaml > hr-web-app.yaml
```

<br/>

- 매니페스트 파일이 제대로 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  vi hr-web-app.yaml

====

apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: hr-web-app
  name: hr-web-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: hr-web-app
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: hr-web-app
    spec:
      containers:
      - image: kodekloud/webapp-color
        name: webapp-color
        resources: {}
status: {}
```

<br/>

- 매니페스트 파일을 이용해 디플로이먼트를 생성한다.

```bash
root@controlplane ~ ➜  k create -f hr-web-app.yaml 
deployment.apps/hr-web-app created
```

<br/>

- 디플로이먼트가 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k get deployments.apps 
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
hr-web-app   2/2     2            2           20s
```

<br/><br/>

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)