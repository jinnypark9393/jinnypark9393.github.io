---

published: true
title:  "[Kubernetes/CKA]모의고사 3.7 - 레이블(Label)이 여러 개인 파드 생성하기"
excerpt: "명령형 커맨드에서 옵션값을 넣어주면 레이블이 달린 파드를 생성할 수 있는데, 여러 개의 레이블을 생성할 경우 콤마(,)로 구분해준다"

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

# 모의고사 3.7 - 레이블(Label)이 여러 개인 파드 생성하기

## 1. 문제 요건

Create a pod called `hr-pod` in `hr` namespace belonging to the `production` `environment` and `frontend` `tier` .image: `redis:alpine`

Use appropriate labels and create all the required objects if it does not exist in the system already.

- hr-pod labeled with `environment=production`?
- hr-pod labeled with `tier=frontend`?

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

### 2. 레이블(Label)이 여러 개인 파드 생성

- 명령형 커맨드로 파드 생성하기

```bash
root@controlplane ~ ➜  k run hr-pod --image=redis:alpine -l environment=production,tier=frontend -n hr
Error from server (NotFound): namespaces "hr" not found
```

- `hr` 네임스페이스가 없다는 에러 발생

<br/>

- `hr` 네임스페이스를 생성한다.

```jsx
root@controlplane ~ ✖ k create ns hr
namespace/hr created
```

<br/>

- 다시 명령형 커맨드로 파드를 생성한다.

```bash
root@controlplane ~ ➜  k run hr-pod --image=redis:alpine -l environment=production,tier=frontend -n hr
pod/hr-pod created
```

<br/>

- `describe` 명령어로 파드가 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k describe pod -n hr hr-pod
Name:         hr-pod
Namespace:    hr
Priority:     0
Node:         controlplane/10.29.76.6
Start Time:   Wed, 18 May 2022 13:18:29 +0000
Labels:       environment=production
              tier=frontend
Annotations:  <none>
Status:       Running
IP:           10.50.0.5
IPs:
  IP:  10.50.0.5
Containers:
  hr-pod:
    Container ID:   docker://c8d29845cfdb73e6612d50615954132bec278cb2ea074af4a10f3de1066e3991
    Image:          redis:alpine
    Image ID:       docker-pullable://redis@sha256:541e6d75df5dfb08e8859929bab06da265673808a6f2285abe6b7c76c1c98c6e
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Wed, 18 May 2022 13:18:34 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-8mdh6 (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  default-token-8mdh6:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-8mdh6
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                 node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  84s   default-scheduler  Successfully assigned hr/hr-pod to controlplane
  Normal  Pulled     80s   kubelet            Container image "redis:alpine" already present on machine
  Normal  Created    80s   kubelet            Created container hr-pod
  Normal  Started    79s   kubelet            Started container hr-pod
```

<br/><br/>

## 3. 참고 URL

- kubectl 치트 시트: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)
