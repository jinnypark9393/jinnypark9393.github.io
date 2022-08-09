---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA - KillerKoda Q11. Scheduling Priority'
date: '2022-05-21 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# Q11. 스케줄링 우선순위(Priority)

`management` 네임스페이스에서 가장 높은 우선순위를 가진 파드를 찾아 지우자.

<br/><br/>

## 팁

우선순위(Priority)는 파드 정의에 있는 속성(attribute)이다.

```bash
k -n management get pod -o yaml
```

<br/><br/>

## 해결 방법

```bash
controlplane $ k get -n management pod -o yaml | grep -i priority -B 20
    creationTimestamp: "2022-05-21T03:45:11Z"
    name: runner
    namespace: management
    resourceVersion: "1386"
    uid: 4d8b2e63-83fa-4e56-b14c-8f8f0e12c3cb
  spec:
    containers:
    - image: nginx:1.21.6-alpine
      imagePullPolicy: IfNotPresent
      name: pod
      resources: {}
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      volumeMounts:
      - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
        name: kube-api-access-tn459
        readOnly: true
    dnsPolicy: ClusterFirst
    enableServiceLinks: true
    nodeName: controlplane
    preemptionPolicy: PreemptLowerPriority
    priority: 200000000
    priorityClassName: level2
--
    creationTimestamp: "2022-05-21T03:45:11Z"
    name: sprinter
    namespace: management
    resourceVersion: "1385"
    uid: 6031417a-18ea-4d07-b3c9-09ded57d7da0
  spec:
    containers:
    - image: nginx:1.21.6-alpine
      imagePullPolicy: IfNotPresent
      name: pod
      resources: {}
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      volumeMounts:
      - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
        name: kube-api-access-khsth
        readOnly: true
    dnsPolicy: ClusterFirst
    enableServiceLinks: true
    nodeName: controlplane
    preemptionPolicy: PreemptLowerPriority
    priority: 300000000
    priorityClassName: level3

controlplane $ k -n management delete pod sprinter
pod "sprinter" deleted
```

<br/>