---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA - KillerKoda Q6. ConfigMap Access in Pods'
date: '2022-05-21 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# Q6. 파드(POD)에서의 컨피그맵(ConfigMap) 접근

1. `tree=trauerweide`라는 내용을 갖고있는 `trauerweide` 라는 이름의 ConfigMap 을 생성하자
2. `/root/cm.yaml` 로 ConfigMap을 생성하자

<br/><br/>

## 팁

```
# 신규 ConfigMap 생성
kubectl create cm trauerweide -h

# 파일에서 ConfigMap 생성
kubectl create -f ...
```

<br/><br/>

## 해결 방법

```
kubectl create cm trauerweide --from-literal tree=trauerweide

k create -f /root/cm.yaml
```

<br/>