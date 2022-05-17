---

published: true
title:  "[Kubernetes/CKA]모의고사 2.3 - 커맨드를 지정한 파드(POD) 생성하기"
excerpt: "etcd 파드 상세 정보를 참고해 백업 파일 명령어를 실행한다"

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

# 모의고사 2.3 - 커맨드를 지정한 파드(POD) 생성하기

## 1. 문제 요건

Create a new pod called `super-user-pod` with image `busybox:1.28`. Allow the pod to be able to set `system_time`.

The container should sleep for 4800 seconds.

- Pod: super-user-pod
- Container Image: busybox:1.28
- SYS_TIME capabilities for the conatiner?

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다(이미 진행한 경우 불필요).

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

### 2. 커맨드를 지정한 파드(POD) 생성

- 명령문으로 파드 매니페스트 파일을 생성한다.

```bash
root@controlplane ~ ➜  k run super-user-pod --image=busybox:1.28 --dry-run=client -o yaml --command -- sleep 4800 > super-user-pod.yaml
```

- 파드 매니페스트 파일에 수정할 부분이 없는지 확인한다.

```bash
root@controlplane ~ ➜  vi super-user-pod.yaml

====

apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: super-user-pod
  name: super-user-pod
spec:
  containers:
  - command:
    - sleep
    - "4800"
    image: busybox:1.28
    name: super-user-pod
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

- 작성한 매니페스트 파일을 이용해 파드를 생성한다.

```bash
root@controlplane ~ ➜  k create -f super-user-pod.yaml 
pod/super-user-pod created
```

- 파드가 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k get pods
NAME             READY   STATUS              RESTARTS   AGE
redis-storage    1/1     Running             0          4m5s
super-user-pod   1/1     ContainerCreating   0          31s
```

## 3. 참고 URL

- 볼륨(Volume): [https://kubernetes.io/ko/docs/concepts/storage/volumes/](https://kubernetes.io/ko/docs/concepts/storage/volumes/)