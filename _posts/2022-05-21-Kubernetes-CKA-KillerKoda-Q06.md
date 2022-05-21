---

published: true
title:  "[Kubernetes/CKA]KillerKoda Q7. Ingress Create"
excerpt: "컨피그맵(ConfigMap)을 명령형, 선언형으로 생성해보자"

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