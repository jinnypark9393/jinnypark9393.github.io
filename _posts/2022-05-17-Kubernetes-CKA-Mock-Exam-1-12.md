---

published: true
title:  "[Kubernetes/CKA]모의고사 1.12 - 퍼시스턴트 볼륨(Persistent Volume: PV) 생성하기"
excerpt: "YAML을 직접 작성해 PV를 생성한다"

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스자격증, 유데미강의추천, 유데미쿠버네티스, cka연습문제풀이, cka덤프, cka기출문제, cka, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어]

toc: true
toc_sticky: true

date: 2022-05-17
last_modified_at: 2022-05-17

---

<br/><br/>

# 모의고사 1.12 - 퍼시스턴트 볼륨(Persistent Volume: PV) 생성하기

## 1. 문제 요건

Create a `Persistent Volume` with the given specification.

- Volume Name: pv-analytics
- Storage: 100Mi
- Access modes: ReadWriteMany
- Host Path: /pv/data-analytics

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

### 2. YAML을 이용해 hostpath타입 퍼시스턴트 볼륨(Persistent Volume)생성

- hostpath 타입 퍼시스턴트 볼륨 매니페스트 파일의 예시를 복사해둔다.

```bash
apiVersion: v1
kind: PersistentVolume
metadata:
  name: task-pv-volume
  labels:
    type: local
spec:
  storageClassName: manual
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/mnt/data"
```

<br/>

- vi 에디터로 파일 생성 후 문제 요건에 맞게 수정한다.

```bash
vi pv-analytics.yaml

apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-analytics
  labels:
    type: local
spec:
  storageClassName: manual
  capacity:
    storage: 100Mi
  accessModes:
    - ReadWriteMany
  hostPath:
    path: "/pv/data-analytics"
```

<br/>

- 작성한 매니페스트 파일을 이용해 PV를  생성한다.

```bash
root@controlplane ~ ➜  kubectl create -f pv-analytics.yaml 
persistentvolume/pv-analytics created
```

<br/>

- PV가 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k get pv
NAME           CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
pv-analytics   100Mi      RWX            Retain           Available           manual                  58s
```

<br/><br/>

## 3. 참고 URL

- 퍼시스턴트 볼륨(Persistent Volume): [https://kubernetes.io/ko/docs/concepts/storage/persistent-volumes/](https://kubernetes.io/ko/docs/concepts/storage/persistent-volumes/)
- hostPath 타입 PV 생성하기: [https://kubernetes.io/ko/docs/tasks/configure-pod-container/configure-persistent-volume-storage/#퍼시스턴트볼륨-생성하기](https://kubernetes.io/ko/docs/tasks/configure-pod-container/configure-persistent-volume-storage/#%ED%8D%BC%EC%8B%9C%EC%8A%A4%ED%84%B4%ED%8A%B8%EB%B3%BC%EB%A5%A8-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0)

root@controlplane ~ ➜  kubectl create -f pv-analytics.yaml
persistentvolume/pv-analytics created