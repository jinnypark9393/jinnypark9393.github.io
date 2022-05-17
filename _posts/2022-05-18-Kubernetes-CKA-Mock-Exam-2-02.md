---

published: true
title:  "[Kubernetes/CKA]모의고사 2.2 - emptyDir 타입의 볼륨이 마운트 된 파드(POD) 생성하기"
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

# 모의고사 2.2 - emptyDir 타입의 볼륨이 마운트 된 파드(POD) 생성하기

## 1. 문제 요건

Create a Pod called `redis-storage` with image: `redis:alpine` with a Volume of type `emptyDir` that lasts for the life of the Pod.

Specs on the below.

- Pod named 'redis-storage' created
- Pod 'redis-storage' uses Volume type of emptyDir
- Pod 'redis-storage' uses volumeMount with mountPath = /data/redis

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다(이미 진행한 경우 불필요).

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

### 2. emptyDir 볼륨이 마운트 된 파드(POD) 생성

- 쿠버네티스 공식문서에서 `emptyDir` 키워드로 검색해 생성 예시를 복사해둔다.

```bash
apiVersion: v1
kind: Pod
metadata:
  name: test-pd
spec:
  containers:
  - image: k8s.gcr.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /cache
      name: cache-volume
  volumes:
  - name: cache-volume
    emptyDir: {}
```

- vi 에디터로 파일 생성 후 문제 요건에 맞게 수정한다.

```bash
vi redis-storage.yaml

====

apiVersion: v1
kind: Pod
metadata:
  name: redis-storage
spec:
  containers:
  - image: redis:alpine
    name: redis-storage
    volumeMounts:
    - mountPath: /data/redis
      name: redis-storage
  volumes:
  - name: redis-storage
    emptyDir: {}
```

- 작성한 매니페스트 파일을 이용해 파드를  생성한다.

```bash
root@controlplane ~ ➜  k create -f redis-storage.yaml 
pod/redis-storage created
```

- 파드가 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k get pods
NAME            READY   STATUS    RESTARTS   AGE
redis-storage   1/1     Running   0          10s
```

## 3. 참고 URL

- 볼륨(Volume): [https://kubernetes.io/ko/docs/concepts/storage/volumes/](https://kubernetes.io/ko/docs/concepts/storage/volumes/)