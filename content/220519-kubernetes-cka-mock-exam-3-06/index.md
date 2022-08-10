---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA 모의고사 3.6 - 테인트(Taint) & 톨러레이션(Toleration) 적용하기'
date: '2022-05-19 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# 1. 모의고사 3.6 - 테인트(Taint) & 톨러레이션(Toleration) 적용하기

## 1. 문제 요건

Taint the worker node `node01` to be Unschedulable. Once done, create a pod called `dev-redis`, image `redis:alpine`, to ensure workloads are not scheduled to this worker node. Finally, create a new pod called `prod-redis` and image: `redis:alpine` with toleration to be scheduled on `node01`.

key: `env_type`, value: `production`, operator: `Equal` and effect: `NoSchedule`

- Key = env_type
- Value = production
- Effect = NoSchedule
- pod 'dev-redis' (no tolerations) is not scheduled on node01?
- Create a pod 'prod-redis' to run on node01

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

### 2. 테인트(Taint) & 톨러레이션(Toleration) 적용하기

- 명령형 커맨드로 node01에 테인트를 설정한다.

```bash
kubectl taint nodes node01 env_type=production:NoSchedule
```

<br/>

- dev-redis 파드를 생성한다.

```jsx
root@controlplane ~ ➜  k run dev-redis --image=redis:alpine
pod/dev-redis created
```

<br/>

- dev-redis 파드가 control plane 노드에 스케줄링 된 것을 확인한다.

```bash
root@controlplane ~ ➜  k get pods -o wide
NAME           READY   STATUS    RESTARTS   AGE     IP            NODE           NOMINATED NODE   READINESS GATES
dev-redis      1/1     Running   0          10s     10.50.0.4     controlplane   <none>           <none>
multi-pod      2/2     Running   0          18m     10.50.192.2   node01         <none>           <none>
non-root-pod   1/1     Running   0          10m     10.50.192.3   node01         <none>           <none>
np-test-1      1/1     Running   0          9m14s   10.50.192.4   node01         <none>           <none>
pvviewer       1/1     Running   0          29m     10.50.192.1   node01         <none>           <none>
```

<br/>

- prod-redis 파드의 매니페스트 파일을 생성한다.

```bash
root@controlplane ~ ➜  k run prod-redis --image=redis:alpine --dry-run=client -o yaml > prod-redis.yaml
```

<br/>

- 문제 요건에 맞게 편집한다.

```bash
vi prod-redis.yaml

---

apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: prod-redis
  name: prod-redis
spec:
  containers:
  - image: redis:alpine
    name: prod-redis
    resources: {}
  tolerations:
  - key: "env_type"
    operator: "Equal"
    value: "production"
    effect: "NoSchedule"
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

<br/>

- `create` 명령어로 파드를 생성한다.

```bash
root@controlplane ~ ➜  k create -f prod-redis.yaml 
pod/prod-redis created
```

<br/>

- prod-redis 파드가 node01에 스케줄링된 것을 확인한다.

```bash
root@controlplane ~ ➜  k get pods -o wide
NAME           READY   STATUS    RESTARTS   AGE     IP            NODE           NOMINATED NODE   READINESS GATES
dev-redis      1/1     Running   0          6m41s   10.50.0.4     controlplane   <none>           <none>
multi-pod      2/2     Running   0          24m     10.50.192.2   node01         <none>           <none>
non-root-pod   1/1     Running   0          17m     10.50.192.3   node01         <none>           <none>
np-test-1      1/1     Running   0          15m     10.50.192.4   node01         <none>           <none>
prod-redis     1/1     Running   0          58s     10.50.192.5   node01         <none>           <none>
pvviewer       1/1     Running   0          36m     10.50.192.1   node01         <none>           <none>
```

<br/><br/>

## 3. 참고 URL

- kubectl 치트 시트: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)
- 테인트와 톨러레이션: [https://kubernetes.io/ko/docs/concepts/scheduling-eviction/taint-and-toleration/](https://kubernetes.io/ko/docs/concepts/scheduling-eviction/taint-and-toleration/)

<br/>