---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA 모의고사 3.3 - 멀티컨테이터 파드(Multi-Container POD) 생성하기 및 파드(POD)연결'
date: '2022-05-19 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# 3.3 - 멀티컨테이터 파드(Multi-Container POD) 생성하기

## 1. 문제 요건

Create a pod called `multi-pod` with two containers.Container 1, name: `alpha`, image: `nginx`Container 2: name: `beta`, image: `busybox`, command: `sleep 4800`Environment Variables:container 1:`name: alpha`Container 2:`name: beta`

- Pod Name: multi-pod
- Container 1: alpha
- Container 2: beta
- Container beta commands set correctly?
- Container 1 Environment Value Set
- Container 2 Environment Value Set

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

### 2. 멀티컨테이터 파드(Multi-Container POD) 생성

- 명령형 커맨드로 컨테이너가 하나 있는 파드의 매니페스트 파일을 만들어 저장한다.

```bash
root@controlplane ~ ➜  k run --image=busybox multi-pod --env=name=beta --dry-run=client -o yaml --command -- sleep 4800 > multi-pod.yaml
```

<br/>

- 생성한 매니페스트 파일을 문제 요건에 맞게 수정한다.

```jsx
vi multi-pod.yaml

---

apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: multi-pod
  name: multi-pod
spec:
  containers:
  - command:
    - sleep
    - "4800"
    env:
    - name: name
      value: beta
    image: busybox
    name: beta
  - env:
    - name: name
      value: alpha
    image: nginx
    name: alpha
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

<br/>

- `create` 명령어로 파드를 생성한다.

```bash
root@controlplane ~ ➜  k create -f multi-pod.yaml 
pod/multi-pod created
```

<br/>

- `describe` 명령어로 컨테이너가 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k describe pod multi-pod 
Name:         multi-pod
Namespace:    default
Priority:     0
Node:         node01/10.29.76.9
Start Time:   Wed, 18 May 2022 12:49:34 +0000
Labels:       run=multi-pod
Annotations:  <none>
Status:       Pending
IP:           
IPs:          <none>
Containers:
  beta:
    Container ID:  
    Image:         busybox
    Image ID:      
    Port:          <none>
    Host Port:     <none>
    Command:
      sleep
      4800
    State:          Waiting
      Reason:       ContainerCreating
    Ready:          False
    Restart Count:  0
    Environment:
      name:  beta
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mq4qs (ro)
  alpha:
    Container ID:   
    Image:          nginx
    Image ID:       
    Port:           <none>
    Host Port:      <none>
    State:          Waiting
      Reason:       ContainerCreating
    Ready:          False
    Restart Count:  0
    Environment:
      name:  alpha
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-mq4qs (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             False 
  ContainersReady   False 
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
  Normal  Scheduled  9s    default-scheduler  Successfully assigned default/multi-pod to node01
  Normal  Pulling    8s    kubelet            Pulling image "busybox"
  Normal  Pulled     6s    kubelet            Successfully pulled image "busybox" in 1.343368595s
  Normal  Created    6s    kubelet            Created container beta
  Normal  Started    5s    kubelet            Started container beta
  Normal  Pulling    5s    kubelet            Pulling image "nginx"
  Normal  Pulled     0s    kubelet            Successfully pulled image "nginx" in 5.046956529s
  Normal  Created    0s    kubelet            Created container alpha
```

<br/>

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)

<br/>