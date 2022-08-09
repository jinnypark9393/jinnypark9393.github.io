---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA - KillerKoda Q2. Apiserver Crash'
date: '2022-05-21 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# Q2. API서버 장애

이 실습에서는 API서버가 여러 방식으로 망가지도록 잘못 설정한 뒤, 에러를 확인할 수 있는 로그 경로를 확인한다.

<br/>

당신은 API서버가 올라오지 않는 상황에 익숙해져야 한다.

<br/>

API서버 매니페스트 파일에 `—-this-is-very-wrong` 이라는 신규 인자(argument)를 설정하자. 파드가 다시 올라오는지 확인하고, 이 설정이 어떤 로그를 발생시키는지 확인하자.

<br/>

## 로그 경로

아래는 확인해야할 로그 경로이다.

- `/var/log/pods`
- `/var/log/containers`
- `crictl ps` + `crictl logs`
- `docker ps` + `docker logs` (컨테이너 런타임으로 도커를 사용할 경우)
- Kubelet 로그: `/var/log/syslog` 혹은 `journalctl`

<br/>

## 해결 방법

```jsx
# 항상 백업을 생성하자!
cp /etc/kubernetes/manifests/kube-apiserver.yaml

# 변경 사항을 적용하자
vim /etc/kubernetes/manifests/kube-apiserver.yaml

# 컨테이너가 재시작할때까지 기다리자
watch crictl ps

# API 서버 파드를 확인하자
k -n kube-system get pod
```

<br/>

- API 서버가 돌아오지 않는다.

```jsx
# 파드 로그를 확인한다

cat /var/log/pods/kube-system_kube-apiserver-controlplane_<hashed value>/kube-apiserver/X.log
> 2022-01-26T10:41:12.401641185Z stderr F Error: unknown flag: --this-is-very-wrong
```

<br/>

변경사항을 취소하고 다음 실습으로 넘어가자.

```jsx
# 백업을 사용하면 편리하다
cp ~/kube-apiserver.yaml.ori /etc/kuberentes/manifests/kube-apiserver.yaml
```

<br/>