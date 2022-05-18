---

published: true
title:  "[Kubernetes/CKA]모의고사 3.4 - 시큐리티 폴리시(Security Policy)가 적용된 파드(POD) 생성하기"
excerpt: "명령형 커맨드로 매니페스트 파일 생성한 뒤, securityContext를 추가한다"

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

# 1. 모의고사 3.4 - 시큐리티 폴리시(Security Policy)가 적용된 파드(POD) 생성하기

## 1. 문제 요건

Create a Pod called `non-root-pod` , image: `redis:alpine`runAsUser: 1000 fsGroup: 2000

- Pod non-root-pod fsGroup configured
- Pod non-root-pod runAsUser configured

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

<br/>

### 2. 시큐리티 폴리시(Security Policy)가 적용된 파드(POD) 생성

- 명령형 커맨드로 파드의 매니페스트 파일을 만들어 저장한다.

```bash
root@controlplane ~ ➜  k run non-root-pod --image=redis:alpine --dry-run=client -o yaml > non-root-pod.yaml
```

<br/>

- 생성한 매니페스트 파일을 문제 요건에 맞게 수정한다.

```jsx
vi non-root-pod.yaml

---

apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: non-root-pod
  name: non-root-pod
spec:
  containers:
  - image: redis:alpine
    name: non-root-pod
  securityContext:
    runAsUser: 1000
    fsGroup: 2000
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

<br/>

- `create` 명령어로 파드를 생성한다.

```bash
root@controlplane ~ ➜  k create -f non-root-pod.yaml 
pod/non-root-pod created
```

<br/>

- `describe` 명령어로 컨테이너가 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k describe pod non-root-pod 
Name:         non-root-pod
Namespace:    default
Priority:     0
Node:         node01/10.29.76.9
Start Time:   Wed, 18 May 2022 12:57:18 +0000
Labels:       run=non-root-pod
Annotations:  <none>
Status:       Running
IP:           10.50.192.3
IPs:
  IP:  10.50.192.3
Containers:
  non-root-pod:
    Container ID:   docker://eb29b88b097e1687c99d134b2ae2742a0128e0ba574d3505c8d2f8aeb7820058
    Image:          redis:alpine
    Image ID:       docker-pullable://redis@sha256:541e6d75df5dfb08e8859929bab06da265673808a6f2285abe6b7c76c1c98c6e
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Wed, 18 May 2022 12:57:29 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mq4qs (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  default-token-mq4qs:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-mq4qs
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                 node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  13s   default-scheduler  Successfully assigned default/non-root-pod to node01
  Normal  Pulling    9s    kubelet            Pulling image "redis:alpine"
  Normal  Pulled     5s    kubelet            Successfully pulled image "redis:alpine" in 3.895443062s
  Normal  Created    4s    kubelet            Created container non-root-pod
  Normal  Started    2s    kubelet            Started container non-root-pod
```

<br/><br/>

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)
- Configure a Security Context: [https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod)