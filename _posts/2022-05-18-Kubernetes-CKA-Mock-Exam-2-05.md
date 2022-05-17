---

published: true
title:  "[Kubernetes/CKA]모의고사 2.5 - 디플로이먼트(Deployment) 이미지 업그레이드하기"
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

# 모의고사 2.5 - 디플로이먼트(Deployment) 이미지 업그레이드하기

## 1. 문제 요건

Create a new deployment called `nginx-deploy`, with image `nginx:1.16` and `1` replica. Next upgrade the deployment to version `1.17` using rolling update.

- Deployment : nginx-deploy. Image: nginx:1.16
- Image: nginx:1.16
- Task: Upgrade the version of the deployment to 1:17
- Task: Record the changes for the image upgrade

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다.

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

### 2. 디플로이먼트(Deployment) 이미지 업그레이드

- 명령문으로 디플로이먼트(Deployment) 매니페스트 파일을 생성한다.

```bash
root@controlplane ~ ➜  k create deployment nginx-deploy --image=nginx:1.16 --replicas=1 --dry-run=client -o yaml > nginx-deploy.yaml
```

- 파드 매니페스트 파일로 디플로이먼트를 생성한다.

```bash
root@controlplane ~ ➜  k create -f nginx-deploy.yaml 
deployment.apps/nginx-deploy created
```

- 디플로이먼트가 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k get deployments.apps 
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deploy   1/1     1            1           37s
```

- kubectl cheat sheet에서 디플로이먼트의 이미지를 업그레이드하는 명령문을 복사한 뒤 문제 요건에 맞게 수정해 실행한다.
    - `nginx=nginx:1.17` ⇒ `<container name>=<image name>`

```bash
kubectl set image deployment/nginx-deploy nginx=nginx:1.17
```

- 이미지 버전 업데이트가 잘 되었는지 확인한다.

```bash
root@controlplane ~ ➜  k describe deployments.apps nginx-deploy Name:                   nginx-deploy
Namespace:              default
CreationTimestamp:      Mon, 16 May 2022 14:29:43 +0000
Labels:                 app=nginx-deploy
Annotations:            deployment.kubernetes.io/revision: 2
Selector:               app=nginx-deploy
Replicas:               1 desired | 1 updated | 2 total | 1 available | 1 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=nginx-deploy
  Containers:
   nginx:
    Image:        nginx:1.17
    Port:         <none>
    Host Port:    <none>
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    ReplicaSetUpdated
OldReplicaSets:  nginx-deploy-6c858c4486 (1/1 replicas created)
NewReplicaSet:   nginx-deploy-7c8d8c76bf (1/1 replicas created)
Events:
  Type    Reason             Age    From                   Message
  ----    ------             ----   ----                   -------
  Normal  ScalingReplicaSet  3m43s  deployment-controller  Scaled up replica set nginx-deploy-6c858c4486 to 1
  Normal  ScalingReplicaSet  4s     deployment-controller  Scaled up replica set nginx-deploy-7c8d8c76bf to 1
```

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)