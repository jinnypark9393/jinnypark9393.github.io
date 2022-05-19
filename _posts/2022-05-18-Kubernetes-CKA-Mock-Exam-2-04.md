---

published: true
title:  "[Kubernetes/CKA]모의고사 2.4 - 퍼시스턴트 볼륨(Persistent Volume)을 마운트한 파드(POD) 생성하기"
excerpt: "퍼시스턴트 볼륨을 파드에 마운트하기 위해 퍼시스턴트 볼륨 클레임(Persistent Volume Claim)을 생성한다"

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스자격증, 유데미강의추천, 유데미쿠버네티스, cka연습문제풀이, cka덤프, cka기출문제, cka, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어]

toc: true
toc_sticky: true

date: 2022-05-18
last_modified_at: 2022-05-18

---

<br/><br/>

# 모의고사 2.4 - 퍼시스턴트 볼륨(Persistent Volume)을 마운트한 파드(POD) 생성하기

## 1. 문제 요건

A pod definition file is created at `/root/CKA/use-pv.yaml`. Make use of this manifest file and mount the persistent volume called `pv-1`. Ensure the pod is running and the PV is bound.

mountPath: `/data` persistentVolumeClaim Name: `my-pvc`

- persistentVolume Claim configured correctly
- pod using the correct mountPath
- pod using the persistent volume claim?

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

### 2. 퍼시스턴트 볼륨(Persistent Volume)을 마운트한 파드(POD) 생성

- 문제에서 제공한 파드 매니페스트 파일을 확인한다.

```bash
root@controlplane ~ ➜  cat /root/CKA/use-pv.yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: use-pv
  name: use-pv
spec:
  containers:
  - image: nginx
    name: use-pv
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

<br/>

- 문제에서 제시한 pv 정보를 확인한다.

```bash
root@controlplane ~ ➜  k get pv
NAME   CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
pv-1   10Mi       RWO            Retain           Available                                   2m21s
```

<br/>

- 기존에 pvc가 있는지 확인한다.

```bash
root@controlplane ~ ➜  k get pvc
No resources found in default namespace.
```

<br/>

- 쿠버네티스 공식문서에서 pvc를 검색해 템플릿을 복사한 뒤 수정한다.

```bash
vi pvc.yaml

----

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
   accessModes:
      - ReadWriteOnce
   resources:
     requests:
       storage: 10Mi
```

<br/>

- `create` 명령어로 pvc를 생성한다.

```jsx
root@controlplane ~ ➜  k create -f pvc.yaml
persistentvolumeclaim/my-pvc created
```

<br/>

- `get` 명령어로 pvc가 잘 생성되었는지 확인한다.

```jsx
root@controlplane ~ ➜  k get pvc
NAME     STATUS   VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   AGE
my-pvc   Bound    pv-1     10Mi       RWO                           16s
```

- status: Bound여야한다.

<br/>

- 문제에서 제공한 파드 매니페스트 파일을 연다.

```jsx
vi /root/CKA/use-pv.yaml

----

apiVersion: v1
kind: Pod
metadata:
   creationTimestamp: null
   labels:
      run: use-pv
   name: use-pv
spec:
  containers:
  - image: nginx
    name: use-pv
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

<br/>

- 쿠버네티스 공식문서의 Claim As Volume 탭을 클릭해 Pod 예시를 보고 문제에 맞게 내용을 수정한다.

```jsx
vi /root/CKA/use-pv.yaml

----

apiVersion: v1
kind: Pod
metadata:
   creationTimestamp: null
   labels:
      run: use-pv
   name: use-pv
spec:
  containers:
  - image: nginx
    name: use-pv
    resources: {}
    volumeMounts:
      - mountPath: "/data"
        name: mypd
  dnsPolicy: ClusterFirst
  restartPolicy: Always
  volumes:
     - name: mypd
       persistentVolumeClaim:
         claimName: my-pvc 
status: {}
```

<br/>

- `create` 명령어로 Pod를 생성한다.

```jsx
root@controlplane ~ ➜  k create -f /root/CKA/use-pv.yaml
pod/use-pv created
```

<br/>

- `get` 명령어를 이용해 Pod가 잘 생성되었는지 확인한다.

```jsx
root@controlplane ~ ➜  k get pods
NAME     READY   STATUS    RESTARTS   AGE
use-pv   1/1     Running   0          14s
```

<br/>

- `describe` 명령어를 이용해 문제에서 제시한 요구조건이 제대로 설정되었는지 확인한다.

```jsx
root@controlplane ~ ➜  k describe pod use-pv
Name:         use-pv
Namespace:    default
Priority:     0
Node:         node01/10.52.31.6
Start Time:   Thu, 19 May 2022 20:38:33 +0000
Labels:       run=use-pv
Annotations:  <none>
Status:       Running
IP:           10.50.192.1
IPs:
  IP:  10.50.192.1
Containers:
  use-pv:
    Container ID:   docker://a2893bd59fa5c7e1d3a4c87778a97bcc1f4fd8aad1610c6283809993439d355d
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:2d17cc4981bf1e22a87ef3b3dd20fbb72c3868738e3f307662eb40e2630d4320
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Thu, 19 May 2022 20:38:44 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /data from mypd (rw)
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-hmwwc (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  mypd:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  my-pvc
    ReadOnly:   false
  default-token-hmwwc:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-hmwwc
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                 node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  31s   default-scheduler  Successfully assigned default/use-pv to node01
  Normal  Pulling    30s   kubelet            Pulling image "nginx"
  Normal  Pulled     21s   kubelet            Successfully pulled image "nginx" in 8.528417084s
  Normal  Created    21s   kubelet            Created container use-pv
  Normal  Started    20s   kubelet            Started container use-pv
```

<br/><br/>

## 3. 참고 URL

- 퍼시스턴트 볼륨(Persistent Volume): [https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims)