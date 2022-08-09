---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA - KillerKoda Q8. NetworkPolicy'
date: '2022-05-21 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# Q8. 네트워크 폴리시의 네임스페이스 선택

네임스페이스 `space1` & `space2`에 기존 파드들이 존재한다.

<br/>

네임스페이스 `space1` 에 있는 모드 파드들이 네임스페이스 `space2` 의 파드들로만 외부로 향하는 트래픽을 보낼 수 있도록 제한하는  `np`라는 이름의 네트워크 폴리시가 필요하다.

<br/>

또한 `np` 라는 이름으로 네임스페이스 `space2` 의 파드들이 `space1` 의 파드로부터 들어오는 트래픽만 받도록 설정해야한다.

<br/>

네트워크 폴리시는 53포트의 DNS 트래픽과 TCP, UDP 트래픽을 허용해야 한다.

<br/><br/>

## 팁

학습을 위해 [네트워크 폴리시 에디터](http://editor.cilium.io)를 확인해보자.

<br/>

네트워크 폴리시의 `namespaceSelector`는 네임스페이스 레이블로 작동한다. 따라서 네임스페이스들의 기존 레이블을 확인하자.

```
k get ns --show-labels
```

<br/><br/>

## 해결 방법 파트 1

첫번째 네트워크 폴리시를 생성하자.

```jsx
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: np
  namespace: space1
spec:
  podSelector: {}
  policyTypes:
  - Egress
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: space2
  - ports:
    - port: 53
      protocol: TCP
    - port: 53
      protocol: UDP
```

<br/><br/>

## 해결 방법 파트 2

두번째 NP를 생성해보자.

```jsx
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: np
  namespace: space2
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: space1
```

<br/><br/>

## 검증

```jsx
# 아래가 작동해야 한다
k -n space1 exec app1-0 -- curl -m 1 microservice1.space2.svc.cluster.local
k -n space1 exec app1-0 -- curl -m 1 microservice2.space2.svc.cluster.local
k -n space1 exec app1-0 -- nslookup tester.default.svc.cluster.local
k -n kube-system exec -it validate-checker-pod -- curl -m 1 app.space1.svc.cluster.local

# 아래는 작동하지 않아야 한다
k -n space1 exec app1-0 -- curl -m 1 tester.default.svc.cluster.local
k -n kube-system exec -it validate-checker-pod -- curl -m 1 microservice1.space2.svc.cluster.local
k -n kube-system exec -it validate-checker-pod -- curl -m 1 microservice2.space2.svc.cluster.local
k -n run nginx --image=nginx:1.21.5-alpine --restart=Never -i --rm -- curl -m 1 microservice1.space2.svc.cluster.local

```

<br/>