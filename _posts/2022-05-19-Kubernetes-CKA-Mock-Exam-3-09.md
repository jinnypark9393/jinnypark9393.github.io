---

published: true
title:  "[Kubernetes/CKA]모의고사 3.9 - 디플로이먼트(Deployment) 트러블슈팅"
excerpt: "(수정중)디플로이먼트의 레플리카 수를 늘려도 파드가 생성되지 않고, 이벤트에 아무것도 생성되지 않는다면 스케줄러를 확인한다"

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

# 1. 모의고사 3.9 - 디플로이먼트(Deployment) 트러블슈팅

## 1. 문제 요건

We have created a new deployment called `nginx-deploy`. scale the deployment to 3 replicas. Has the replica's increased? Troubleshoot the issue and fix it.

- deployment has 3 replicas

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다(이미 진행한 경우 불필요).

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

### 2. 디플로이먼트(Deployment) 트러블슈팅

- 명령형 커맨드로 디플로이먼트를 3으로 증가시킨다

```bash
root@controlplane ~ ➜  kubectl scale --replicas=3 deployment/nginx-deploy
deployment.apps/nginx-deploy scaled
```

- nginx-deploy의 상세정보를 살펴본다.

```jsx
root@controlplane ~ ➜  k describe deployments.apps nginx-deploy 
Name:                   nginx-deploy
Namespace:              default
CreationTimestamp:      Wed, 18 May 2022 13:20:36 +0000
Labels:                 app=nginx-deploy
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               app=nginx-deploy
Replicas:               3 desired | 1 updated | 1 total | 1 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=nginx-deploy
  Containers:
   nginx:
    Image:        nginx
    Port:         <none>
    Host Port:    <none>
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   nginx-deploy-65db889b76 (1/1 replicas created)
Events:
  Type    Reason             Age    From                   Message
  ----    ------             ----   ----                   -------
  Normal  ScalingReplicaSet  5m34s  deployment-controller  Scaled up replica set nginx-deploy-65db889b76 to 1
```

- kube-system 네임스페이스의 kube-controller-manager가 제대로 동작하지 않음

```bash
root@controlplane ~ ➜  k get pods -n kube-system 
NAME                                   READY   STATUS             RESTARTS   AGE
coredns-74ff55c5b-jhqg5                1/1     Running            0          82m
coredns-74ff55c5b-tw892                1/1     Running            0          82m
etcd-controlplane                      1/1     Running            0          82m
kube-apiserver-controlplane            1/1     Running            0          82m
kube-contro1ler-manager-controlplane   0/1     ImagePullBackOff   0          3m57s
kube-proxy-629g4                       1/1     Running            0          82m
kube-proxy-lk2tz                       1/1     Running            0          82m
kube-scheduler-controlplane            1/1     Running            0          82m
weave-net-lhbqz                        2/2     Running            0          82m
weave-net-r592n                        2/2     Running            1          82m
```

- kube-controller-manager

```bash
root@controlplane ~ ➜  k describe pod -n kube-system kube-contro1ler-manager-controlplane 
Name:                 kube-contro1ler-manager-controlplane
Namespace:            kube-system
Priority:             2000001000
Priority Class Name:  system-node-critical
Node:                 controlplane/10.29.76.6
Start Time:           Wed, 18 May 2022 13:23:02 +0000
Labels:               component=kube-contro1ler-manager
                      tier=control-plane
Annotations:          kubernetes.io/config.hash: f1785ce0b7f69827b85f828fee6a9cb4
                      kubernetes.io/config.mirror: f1785ce0b7f69827b85f828fee6a9cb4
                      kubernetes.io/config.seen: 2022-05-18T13:23:02.827595351Z
                      kubernetes.io/config.source: file
Status:               Pending
IP:                   10.29.76.6
IPs:
  IP:           10.29.76.6
Controlled By:  Node/controlplane
Containers:
  kube-contro1ler-manager:
    Container ID:  
    Image:         k8s.gcr.io/kube-contro1ler-manager:v1.20.0
    Image ID:      
    Port:          <none>
    Host Port:     <none>
    Command:
      kube-contro1ler-manager
      --allocate-node-cidrs=true
      --authentication-kubeconfig=/etc/kubernetes/controller-manager.conf
      --authorization-kubeconfig=/etc/kubernetes/controller-manager.conf
      --bind-address=127.0.0.1
      --client-ca-file=/etc/kubernetes/pki/ca.crt
      --cluster-cidr=10.244.0.0/16
      --cluster-name=kubernetes
      --cluster-signing-cert-file=/etc/kubernetes/pki/ca.crt
      --cluster-signing-key-file=/etc/kubernetes/pki/ca.key
      --controllers=*,bootstrapsigner,tokencleaner
      --kubeconfig=/etc/kubernetes/controller-manager.conf
      --leader-elect=true
      --port=0
      --requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.crt
      --root-ca-file=/etc/kubernetes/pki/ca.crt
      --service-account-private-key-file=/etc/kubernetes/pki/sa.key
      --service-cluster-ip-range=10.96.0.0/12
      --use-service-account-credentials=true
    State:          Waiting
      Reason:       ImagePullBackOff
    Ready:          False
    Restart Count:  0
    Requests:
      cpu:        200m
    Liveness:     http-get https://127.0.0.1:10257/healthz delay=10s timeout=15s period=10s #success=1 #failure=8
    Startup:      http-get https://127.0.0.1:10257/healthz delay=10s timeout=15s period=10s #success=1 #failure=24
    Environment:  <none>
    Mounts:
      /etc/ca-certificates from etc-ca-certificates (ro)
      /etc/kubernetes/controller-manager.conf from kubeconfig (ro)
      /etc/kubernetes/pki from k8s-certs (ro)
      /etc/ssl/certs from ca-certs (ro)
      /usr/libexec/kubernetes/kubelet-plugins/volume/exec from flexvolume-dir (rw)
      /usr/local/share/ca-certificates from usr-local-share-ca-certificates (ro)
      /usr/share/ca-certificates from usr-share-ca-certificates (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             False 
  ContainersReady   False 
  PodScheduled      True 
Volumes:
  ca-certs:
    Type:          HostPath (bare host directory volume)
    Path:          /etc/ssl/certs
    HostPathType:  DirectoryOrCreate
  etc-ca-certificates:
    Type:          HostPath (bare host directory volume)
    Path:          /etc/ca-certificates
    HostPathType:  DirectoryOrCreate
  flexvolume-dir:
    Type:          HostPath (bare host directory volume)
    Path:          /usr/libexec/kubernetes/kubelet-plugins/volume/exec
    HostPathType:  DirectoryOrCreate
  k8s-certs:
    Type:          HostPath (bare host directory volume)
    Path:          /etc/kubernetes/pki
    HostPathType:  DirectoryOrCreate
  kubeconfig:
    Type:          HostPath (bare host directory volume)
    Path:          /etc/kubernetes/controller-manager.conf
    HostPathType:  FileOrCreate
  usr-local-share-ca-certificates:
    Type:          HostPath (bare host directory volume)
    Path:          /usr/local/share/ca-certificates
    HostPathType:  DirectoryOrCreate
  usr-share-ca-certificates:
    Type:          HostPath (bare host directory volume)
    Path:          /usr/share/ca-certificates
    HostPathType:  DirectoryOrCreate
QoS Class:         Burstable
Node-Selectors:    <none>
Tolerations:       :NoExecute op=Exists
Events:
  Type     Reason   Age                    From     Message
  ----     ------   ----                   ----     -------
  Normal   Pulling  4m3s (x4 over 5m28s)   kubelet  Pulling image "k8s.gcr.io/kube-contro1ler-manager:v1.20.0"
  Warning  Failed   4m3s (x4 over 5m28s)   kubelet  Failed to pull image "k8s.gcr.io/kube-contro1ler-manager:v1.20.0": rpc error: code = Unknown desc = Error response from daemon: manifest for k8s.gcr.io/kube-contro1ler-manager:v1.20.0 not found: manifest unknown: Failed to fetch "v1.20.0" from request "/v2/kube-contro1ler-manager/manifests/v1.20.0".
  Warning  Failed   4m3s (x4 over 5m28s)   kubelet  Error: ErrImagePull
  Warning  Failed   3m38s (x7 over 5m27s)  kubelet  Error: ImagePullBackOff
  Normal   BackOff  18s (x21 over 5m27s)   kubelet  Back-off pulling image "k8s.gcr.io/kube-contro1ler-manager:v1.20.0"
```

- -port=0

## 3. 참고 URL

- kubectl 치트 시트: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)