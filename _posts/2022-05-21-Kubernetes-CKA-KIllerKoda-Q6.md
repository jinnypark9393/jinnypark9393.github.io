---

published: true
title:  "[Kubernetes/CKA]KillerKoda Q7. Ingress Create"
excerpt: "애플리케이션의 인그레스(Ingress)를 생성해보자"

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

(참고: 문제가 생성되다 중단된 듯 하다. 문제에서는 서비스 까지만 생성하도록 안내되어있다.)

<br/><br/>

# 1. 인그레스(Ingress) 생성

`world` 네임스페이스에 기존 두 개 디플로이먼트(deployment)가 존재하는데, Ingress를 통해 접근 가능해야한다.

<br/>

먼저 두 개의 디플로이먼트를 위해 포트 80을 사용하는 서비스(Service)들을 생성한다. 각 서비스는 디플로이먼트와 동일한 이름이어야한다.

<br/><br/>

## 팁

```
k expose deploy -h
```

<br/><br/>

## 해결 방법

```
k -n world expose deploy europe --port 80
k -n world expose deploy asia --port 80
```

<br/><br/>