---

published: true
title:  "[Kubernetes/CKA]KillerKoda Q4. Application Misconfigured"
excerpt: "디플로이먼트(Deployment) 등 애플리케이션에 이슈가 있을 경우, describe 혹은 logs 명령어로 에러가 발생한 부분을 살펴보자."

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스자격증, 유데미강의추천, 유데미쿠버네티스, cka연습문제풀이, cka덤프, cka기출문제, cka, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어, killerkoda, killersh, killershell, cka모의고사]

toc: true
toc_sticky: true

date: 2022-05-21
last_modified_at: 2022-05-21

---

<br/><br/>

# Q4. 애플리케이션 설정 오류

`application1` 네임스페이스에 디플로이먼트가 있으나, 이슈가 있어 준비(Ready)상태가 되지 않은 듯하다.

<br/>

다른 리소스가 아닌 디플로이먼트(Deployment)만을 수정해 이슈를 해결하자.

<br/>

## 팁

```
k -n application1 get deploy
k -n application1 logs deploy/api
k -n application1 describe deploy api
k -n application1 get cm
```

<br/><br/>

## 해결 방법

`describe` 명령어로 장애가 발생한 디플로이먼트를 살펴보자.

```
controlplane $ k describe -n application1 deployments.apps api 
Name:                   api
Namespace:              application1
CreationTimestamp:      Sat, 21 May 2022 00:04:16 +0000
Labels:                 <none>
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               app=api
Replicas:               3 desired | 3 updated | 3 total | 0 available | 3 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=api
  Containers:
   httpd:
    Image:      httpd:2.4.52-alpine
    Port:       <none>
    Host Port:  <none>
    Environment:
      CATEGORY:  <set to the key 'category' of config map 'category'>  Optional: false
    Mounts:      <none>
  Volumes:       <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      False   MinimumReplicasUnavailable
  Progressing    True    ReplicaSetUpdated
OldReplicaSets:  <none>
NewReplicaSet:   api-8ff4546b4 (3/3 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  30s   deployment-controller  Scaled up replica set api-8ff4546b4 to 3
```

<br/>

ConfigMap 에서 문제가 발생한 듯 하다. configmap 정보를 살펴보자.

```
controlplane $ k get configmaps -n application1
NAME                 DATA   AGE
configmap-category   1      3m
kube-root-ca.crt     1      3m
```

<br/>

틀린 ConfigMap 이름을 사용한 듯 하다. 설정을 바꿔주자.

```
k -n application edit deploy api
```

```
spec:
  template:
    spec:
      containers:
      - env:
        - name: CATEGORY
          valueFrom:
            conficMapKeyRef:
              key: category
              name: configmap-category
```

<br/>

조금 기다리면 모든 레플리카가 ready상태인 것을 볼 수 있다.

```
k -n application1 get deploy api
```

<br/>