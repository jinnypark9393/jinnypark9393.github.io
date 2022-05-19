---

published: true
title:  "[Kubernetes/CKA]모의고사 3.9 - 디플로이먼트(Deployment) 트러블슈팅"
excerpt: "디플로이먼트의 레플리카 수를 늘려도 파드가 생성되지 않고, 이벤트에 아무것도 생성되지 않는다면 스케줄러를 확인한다"

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

### 2. 디플로이먼트(Deployment) 트러블슈팅

- 명령형 커맨드로 디플로이먼트를 3으로 증가시킨다

```bash
root@controlplane ~ ➜  kubectl scale --replicas=3 deployment/nginx-deploy
deployment.apps/nginx-deploy scaled
```

<br/>

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

- 특별한 에러 메시지는 보이지 않는다.

<br/>

- kube-system 네임스페이스의 kube-controller-manager가 제대로 동작하지 않는다(`STATUS=ErrImagePull`).

```bash
root@controlplane ~ ➜  k get pods -n kube-system 
NAME                                   READY   STATUS         RESTARTS   AGE
coredns-74ff55c5b-g8tqw                1/1     Running        0          43m
coredns-74ff55c5b-t5d97                1/1     Running        0          43m
etcd-controlplane                      1/1     Running        0          43m
kube-apiserver-controlplane            1/1     Running        0          43m
kube-contro1ler-manager-controlplane   0/1     ErrImagePull   0          34s
kube-proxy-j7hk8                       1/1     Running        0          43m
kube-proxy-k4vpm                       1/1     Running        0          42m
kube-scheduler-controlplane            1/1     Running        0          43m
weave-net-mz8wq                        2/2     Running        0          42m
weave-net-p4pb9                        2/2     Running        1          43m
```

<br/>

- kube-controller-manager 파드의 상세 설정을 확인한다.

```bash
root@controlplane ~ ➜  k describe pod -n kube-system kube-contro1ler-manager-controlplane
Name:                 kube-contro1ler-manager-controlplane
Namespace:            kube-system
Priority:             2000001000
Priority Class Name:  system-node-critical
Node:                 controlplane/10.28.158.12
Start Time:           Thu, 19 May 2022 12:45:32 +0000
Labels:               component=kube-contro1ler-manager
                      tier=control-plane
Annotations:          kubernetes.io/config.hash: f1785ce0b7f69827b85f828fee6a9cb4
                      kubernetes.io/config.mirror: f1785ce0b7f69827b85f828fee6a9cb4
                      kubernetes.io/config.seen: 2022-05-19T12:45:32.958919589Z
                      kubernetes.io/config.source: file
Status:               Pending
IP:                   10.28.158.12
IPs:
  IP:           10.28.158.12
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
      Reason:       ErrImagePull
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
  Type     Reason   Age                From     Message
  ----     ------   ----               ----     -------
  Normal   Pulling  21s (x3 over 59s)  kubelet  Pulling image "k8s.gcr.io/kube-contro1ler-manager:v1.20.0"
  Warning  Failed   21s (x3 over 59s)  kubelet  Failed to pull image "k8s.gcr.io/kube-contro1ler-manager:v1.20.0": rpc error: code = Unknown desc = Error response from daemon: manifest for k8s.gcr.io/kube-contro1ler-manager:v1.20.0 not found: manifest unknown: Failed to fetch "v1.20.0" from request "/v2/kube-contro1ler-manager/manifests/v1.20.0".
  Warning  Failed   21s (x3 over 59s)  kubelet  Error: ErrImagePull
  Normal   BackOff  6s (x4 over 59s)   kubelet  Back-off pulling image "k8s.gcr.io/kube-contro1ler-manager:v1.20.0"
  Warning  Failed   6s (x4 over 59s)   kubelet  Error: ImagePullBackOff
```

- Image:         k8s.gcr.io/kube-contro1ler-manager:v1.20.0
    - controller 가 아니라 contro”1”ler로 되어있다.
<br/>


- kube-controller-manager는 스태틱 파드이므로 vi 명령어로 매니페스트 파일에 접속해 직접 수정한다.

```bash
root@controlplane ~ ➜  vi /etc/kubernetes/manifests/kube-controller-manager.yaml

---
(생략)
    Image:         k8s.gcr.io/kube-controller-manager:v1.20.0
(생략)

```

<br/>

- `get` 명령어로 파드가 잘 동작하는지 확인한다.

```bash
root@controlplane ~ ➜  k get -n kube-system pods
NAME                                   READY   STATUS              RESTARTS   AGE
coredns-74ff55c5b-g8tqw                1/1     Running             0          49m
coredns-74ff55c5b-t5d97                1/1     Running             0          49m
etcd-controlplane                      1/1     Running             0          50m
kube-apiserver-controlplane            1/1     Running             0          50m
kube-contro1ler-manager-controlplane   0/1     RunContainerError   3          85s
kube-proxy-j7hk8                       1/1     Running             0          49m
kube-proxy-k4vpm                       1/1     Running             0          49m
kube-scheduler-controlplane            1/1     Running             0          50m
weave-net-mz8wq                        2/2     Running             0          49m
weave-net-p4pb9                        2/2     Running             1          49m
```

- RunContainerError가 발생했음을 알 수 있다.

<br/>

- `describe` 명령어로 다시 내용을 확인한다.

```bash
root@controlplane ~ ➜  k describe -n kube-system pod kube-contro1ler-manager-controlplane 
Name:                 kube-contro1ler-manager-controlplane
Namespace:            kube-system
Priority:             2000001000
Priority Class Name:  system-node-critical
Node:                 controlplane/10.28.158.12
Start Time:           Thu, 19 May 2022 12:51:54 +0000
Labels:               component=kube-contro1ler-manager
                      tier=control-plane
Annotations:          kubernetes.io/config.hash: d1b03e68f1957bd0567379ca57c2517a
                      kubernetes.io/config.mirror: d1b03e68f1957bd0567379ca57c2517a
                      kubernetes.io/config.seen: 2022-05-19T12:51:36.844508338Z
                      kubernetes.io/config.source: file
Status:               Running
IP:                   10.28.158.12
IPs:
  IP:           10.28.158.12
Controlled By:  Node/controlplane
Containers:
  kube-contro1ler-manager:
    Container ID:  docker://844721f13d9bb78e13f2e2b598d085d5b2a3c51b5a872ee63c13f47467a6842d
    Image:         k8s.gcr.io/kube-controller-manager:v1.20.0
    Image ID:      docker-pullable://k8s.gcr.io/kube-controller-manager@sha256:00ccc3a5735e82d53bc26054d594a942fae64620a6f84018c057a519ba7ed1dc
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
      Reason:       CrashLoopBackOff
    Last State:     Terminated
      Reason:       ContainerCannotRun
      Message:      OCI runtime create failed: container_linux.go:367: starting container process caused: exec: "kube-contro1ler-manager": executable file not found in $PATH: unknown
      Exit Code:    127
      Started:      Thu, 19 May 2022 12:53:47 +0000
      Finished:     Thu, 19 May 2022 12:53:47 +0000
    Ready:          False
    Restart Count:  4
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
  Type     Reason                  Age                  From     Message
  ----     ------                  ----                 ----     -------
  Warning  Failed                  2m32s                kubelet  Error: open /var/lib/kubelet/pods/d1b03e68f1957bd0567379ca57c2517a/etc-hosts: no such file or directory
  Warning  FailedCreatePodSandBox  2m32s                kubelet  Failed to create pod sandbox: rpc error: code = Unknown desc = failed to create a sandbox for pod "kube-contro1ler-manager-controlplane": Error response from daemon: Conflict. The container name "/k8s_POD_kube-contro1ler-manager-controlplane_kube-system_d1b03e68f1957bd0567379ca57c2517a_0" is already in use by container "775fa97beafb1dbf81920ae34fa8655cff1002ad4105a5a5a00ab666b3c37a4f". You have to remove (or rename) that container to be able to reuse that name.
  Warning  BackOff                 53s (x7 over 2m12s)  kubelet  Back-off restarting failed container
  Normal   Pulled                  39s (x6 over 2m32s)  kubelet  Container image "k8s.gcr.io/kube-controller-manager:v1.20.0" already present on machine
  Normal   Created                 39s (x5 over 2m32s)  kubelet  Created container kube-contro1ler-manager
  Warning  Failed                  38s (x5 over 2m30s)  kubelet  Error: failed to start container "kube-contro1ler-manager": Error response from daemon: OCI runtime create failed: container_linux.go:367: starting container process caused: exec: "kube-contro1ler-manager": executable file not found in $PATH: unknown
```

- kube-contro’1’ler-manager로 되어있는 부분을 모두 수정한다.

<br/>

- `get` 명령어로 파드가 정상동작하는지 확인한다.

```bash
root@controlplane ~ ➜  k get -n kube-system podsNAME                                   READY   STATUS    RESTARTS   AGE
coredns-74ff55c5b-g8tqw                1/1     Running   0          55m
coredns-74ff55c5b-t5d97                1/1     Running   0          55m
etcd-controlplane                      1/1     Running   0          55m
kube-apiserver-controlplane            1/1     Running   0          55m
kube-controller-manager-controlplane   1/1     Running   0          76s
kube-proxy-j7hk8                       1/1     Running   0          55m
kube-proxy-k4vpm                       1/1     Running   0          55m
kube-scheduler-controlplane            1/1     Running   0          55m
weave-net-mz8wq                        2/2     Running   0          55m
weave-net-p4pb9                        2/2     Running   1          55m
```

<br/>

- `get` 명령어로 nginx-deploy의 파드가 3개로 스케일링 되었는지 확인한다.

```bash
root@controlplane ~ ➜  k get deployments.apps 
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deploy   3/3     3            3           19m
```

<br/><br/>

## 3. 참고 URL

- kubectl 치트 시트: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)