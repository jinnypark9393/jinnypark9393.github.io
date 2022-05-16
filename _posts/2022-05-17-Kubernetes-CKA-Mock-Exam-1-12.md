# [Kubernetes/CKA]모의고사 1.12 - 퍼시스턴트 볼륨(Persistent Volume: PV) 생성하기

# 모의고사 1.12 - 퍼시스턴트 볼륨(Persistent Volume: PV) 생성하기

## 1. 문제 요건

Create a `Persistent Volume` with the given specification.

- Volume Name: pv-analytics
- Storage: 100Mi
- Access modes: ReadWriteMany
- Host Path: /pv/data-analytics

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

- 작성한 매니페스트 파일을 이용해 PV를  생성한다.

```bash
root@controlplane ~ ➜  kubectl create -f pv-analytics.yaml 
persistentvolume/pv-analytics created
```

- PV가 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k get pv
NAME           CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
pv-analytics   100Mi      RWX            Retain           Available           manual                  58s
```

## 3. 참고 URL

- 퍼시스턴트 볼륨(Persistent Volume): [https://kubernetes.io/ko/docs/concepts/storage/persistent-volumes/](https://kubernetes.io/ko/docs/concepts/storage/persistent-volumes/)
- hostPath 타입 PV 생성하기: [https://kubernetes.io/ko/docs/tasks/configure-pod-container/configure-persistent-volume-storage/#퍼시스턴트볼륨-생성하기](https://kubernetes.io/ko/docs/tasks/configure-pod-container/configure-persistent-volume-storage/#%ED%8D%BC%EC%8B%9C%EC%8A%A4%ED%84%B4%ED%8A%B8%EB%B3%BC%EB%A5%A8-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0)

root@controlplane ~ ➜  kubectl create -f pv-analytics.yaml
persistentvolume/pv-analytics created