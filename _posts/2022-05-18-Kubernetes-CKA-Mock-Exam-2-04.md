---

published: true
title:  "[Kubernetes/CKA]모의고사 2.4 - 퍼시스턴트 볼륨(Persistent Volume)을 마운트한 파드(POD) 생성하기"
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

# 모의고사 2.4 - 퍼시스턴트 볼륨(Persistent Volume)을 마운트한 파드(POD) 생성하기

## 1. 문제 요건

A pod definition file is created at `/root/CKA/use-pv.yaml`. Make use of this manifest file and mount the persistent volume called `pv-1`. Ensure the pod is running and the PV is bound.

mountPath: `/data` persistentVolumeClaim Name: `my-pvc`

- persistentVolume Claim configured correctly
- pod using the correct mountPath
- pod using the persistent volume claim?

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다(이미 진행한 경우 불필요).

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

### 2. 퍼시스턴트 볼륨(Persistent Volume)을 마운트한 파드(POD) 생성

- 명령문으로 파드 매니페스트 파일을 생성한다.

```bash
root@controlplane ~ ➜  k run super-user-pod --image=busybox:1.28 --dry-run=client -o yaml --command -- sleep 4800 > super-user-pod.yaml
```

- 파드 매니페스트 파일에 수정할 부분이 없는지 확인한다.

```bash

```

- 작성한 매니페스트 파일을 이용해 파드를 생성한다.

```bash

```

- 파드가 잘 생성되었는지 확인한다.

```bash

```

## 3. 참고 URL

- 볼륨(Volume): [https://kubernetes.io/ko/docs/concepts/storage/volumes/](https://kubernetes.io/ko/docs/concepts/storage/volumes/)