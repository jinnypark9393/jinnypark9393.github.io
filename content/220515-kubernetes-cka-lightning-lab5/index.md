---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA Lightning Lab 5 - 디플로이먼트 관련 이슈 트러블슈팅'
date: '2022-05-15 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# 5. 디플로이먼트 관련 이슈 트러블슈팅

## [문제 요건]

- `alpha` 네임스페이스의 `alpha-mysql` 디플로이먼트(Deployment)가 배포되었으나, 파드(POD)가 동작하지 않는 이슈를 해결해야 한다.
- 해당 디플로이먼트는 `/var/lib/mysql` 경로에 마운트 된 `alpha-pv` 퍼시스턴트 볼륨(Persistent Volume)을 사용해야하며, root 비밀번호를 공백으로 만들기 위해 `MYSQL_ALLOW_EMPTY_PASSWORD=1` 환경변수를 설정해야한다.
- 중요: 퍼시스턴트 볼륨을 교체하지 말 것
- 채점 기준: 트러블 슈팅하여 이슈 해결

<br/><br/>

## [내 풀이]

```bash
root@controlplane:~# k describe deployments.apps -n alpha alpha-mysql 
Name:                   alpha-mysql
Namespace:              alpha
CreationTimestamp:      Sun, 15 May 2022 04:44:26 +0000
Labels:                 app=alpha-mysql
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               app=alpha-mysql
Replicas:               1 desired | 1 updated | 1 total | 0 available | 1 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=alpha-mysql
  Containers:
   mysql:
    Image:      mysql:5.6
    Port:       3306/TCP
    Host Port:  0/TCP
    Environment:
      MYSQL_ALLOW_EMPTY_PASSWORD:  1
    Mounts:
      /var/lib/mysql from mysql-data (rw)
  Volumes:
   mysql-data:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  mysql-alpha-pvc
    ReadOnly:   false
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      False   MinimumReplicasUnavailable
  Progressing    False   ProgressDeadlineExceeded
OldReplicaSets:  <none>
NewReplicaSet:   alpha-mysql-6cc9f6bb7c (1/1 replicas created)
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  27m   deployment-controller  Scaled up replica set alpha-mysql-6cc9f6bb7c to 1
```

<br/>