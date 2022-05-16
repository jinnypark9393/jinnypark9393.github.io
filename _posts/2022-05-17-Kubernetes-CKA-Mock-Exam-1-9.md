# [Kubernetes/CKA]모의고사 1.9 - 파드(POD) 트러블 슈팅

# 모의고사 1.9 - 파드(POD) 트러블 슈팅

## 1. 문제 요건

A new application `orange` is deployed. There is something wrong with it. Identify and fix the issue.

- Issue fixed

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다.

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

### 2.

- 문제가 되는 리소스를 확인한다.

```bash
root@controlplane ~ ➜  k get pods
NAME                          READY   STATUS                  RESTARTS   AGE
hr-web-app-99dfd4c9d-nwvlr    1/1     Running                 0          14m
hr-web-app-99dfd4c9d-xfpx5    1/1     Running                 0          14m
messaging                     1/1     Running                 0          29m
nginx-pod                     1/1     Running                 0          32m
orange                        0/1     Init:CrashLoopBackOff   1          37s
static-busybox-controlplane   1/1     Running                 0          7m36s
```

- 문제 리소스의 상세 정보를 확인한다.

```bash
root@controlplane ~ ➜  k describe pod orange 
Name:         orange
Namespace:    default
Priority:     0
Node:         controlplane/10.33.139.9
Start Time:   Mon, 16 May 2022 13:38:48 +0000
Labels:       <none>
Annotations:  <none>
Status:       Pending
IP:           10.244.0.10
IPs:
  IP:  10.244.0.10
Init Containers:
  init-myservice:
    Container ID:  docker://ceff8513b3e73cbb4ac8b351ba8b58b228c9d48e41c3e16be3ca53a790699e4a
    Image:         busybox
    Image ID:      docker-pullable://busybox@sha256:d2b53584f580310186df7a2055ce3ff83cc0df6caacf1e3489bff8cf5d0af5d8
    Port:          <none>
    Host Port:     <none>
    Command:
      sh
      -c
      sleeeep 2;
    State:          Waiting
      Reason:       CrashLoopBackOff
    Last State:     Terminated
      Reason:       Error
      Exit Code:    127
      Started:      Mon, 16 May 2022 13:39:54 +0000
      Finished:     Mon, 16 May 2022 13:39:54 +0000
    Ready:          False
    Restart Count:  3
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-g456l (ro)
Containers:
  orange-container:
    Container ID:  
    Image:         busybox:1.28
    Image ID:      
    Port:          <none>
    Host Port:     <none>
    Command:
      sh
      -c
      echo The app is running! && sleep 3600
    State:          Waiting
      Reason:       PodInitializing
    Ready:          False
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-g456l (ro)
Conditions:
  Type              Status
  Initialized       False 
  Ready             False 
  ContainersReady   False 
  PodScheduled      True 
Volumes:
  default-token-g456l:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-g456l
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                 node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type     Reason     Age                From               Message
  ----     ------     ----               ----               -------
  Normal   Scheduled  90s                default-scheduler  Successfully assigned default/orange to controlplane
  Normal   Pulled     78s                kubelet            Successfully pulled image "busybox" in 820.289773ms
  Normal   Pulled     76s                kubelet            Successfully pulled image "busybox" in 835.60682ms
  Normal   Pulled     60s                kubelet            Successfully pulled image "busybox" in 816.153841ms
  Normal   Pulling    27s (x4 over 79s)  kubelet            Pulling image "busybox"
  Normal   Pulled     26s                kubelet            Successfully pulled image "busybox" in 795.989984ms
  Normal   Created    25s (x4 over 78s)  kubelet            Created container init-myservice
  Normal   Started    24s (x4 over 78s)  kubelet            Started container init-myservice
  Warning  BackOff    12s (x6 over 75s)  kubelet            Back-off restarting failed container
```

- Event 를 살펴보았을 때 init 컨테이너에서 문제가 발생한 것을 알 수 있다.

- orange 파드의 매니페스트 파일을 저장한다.

```bash
root@controlplane ~ ➜  k get pod orange -o yaml > orange.yaml
```

- 문제가 있는 부분을 찾아서 고친다.

```bash
vi orange.yaml

====

(생략)
initContainers:
  - command:
    - sh
    - -c
    - sleeeeep 2;
(생략)
```

- sleeeeep 2 ⇒ sleep 2로 수정한다.

- 기존에 생성되었던 파드를 지운다.

```bash
root@controlplane ~ ➜  k delete pod orange 
pod "orange" deleted
```

- 수정한 매니페스트 파일을 이용해 파드를 재생성한다.

```bash
root@controlplane ~ ➜  k create -f orange.yaml 
pod/orange created
```

- 파드가 잘 동작하는지 확인한다.

```bash
root@controlplane ~ ➜  k get pods
NAME                          READY   STATUS    RESTARTS   AGE
hr-web-app-99dfd4c9d-nwvlr    1/1     Running   0          42m
hr-web-app-99dfd4c9d-xfpx5    1/1     Running   0          42m
messaging                     1/1     Running   0          57m
nginx-pod                     1/1     Running   0          61m
orange                        1/1     Running   0          16s
static-busybox-controlplane   1/1     Running   2          35m
```

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)