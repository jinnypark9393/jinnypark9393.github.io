---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA 모의고사 3.5 - 네트워크 폴리시(Security Policy) 적용하기'
date: '2022-05-19 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# 1. 모의고사 3.5 - 네트워크 폴리시(Network Policy) 적용하기

## 1. 문제 요건

We have deployed a new pod called `np-test-1` and a service called `np-test-service`. Incoming connections to this service are not working. Troubleshoot and fix it.Create NetworkPolicy, by the name `ingress-to-nptest` that allows incoming connections to the service over port `80`.

Important: Don't delete any current objects deployed.

- Important: Don't Alter Existing Objects!
- NetworkPolicy: Applied to All sources (Incoming traffic from all pods)?
- NetWorkPolicy: Correct Port?
- NetWorkPolicy: Applied to correct Pod?

<br/><br/>

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다(이미 진행한 경우 불필요).

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

<br/><br/>

### 2. 네트워크 폴리시(Network Policy) 적용

- `get` 명령어로 문제에서 제시한 파드와 서비스가 제대로 생성되어 실행되고 있는지 확인한다.

```bash
root@controlplane ~ ➜  k get pod,service
NAME            READY   STATUS    RESTARTS   AGE
pod/np-test-1   1/1     Running   0          36s
pod/pvviwer     1/1     Running   0          6m16s

NAME                      TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
service/kubernetes        ClusterIP   10.96.0.1       <none>        443/TCP   17m
service/np-test-service   ClusterIP   10.110.84.136   <none>        80/TCP    37s
```

<br/>

- `run` 명령어로 테스트용 파드를 생성한다.

```jsx
root@controlplane ~ ➜  k run curl --image=alpine/curl --rm -it -- sh
If you don't see a command prompt, try pressing enter.
/ # curl np-test-service
```

- `curl` 명령어에 반응이 없는 상태.

<br/>

- `vi` 명령어로 네트워크 폴리시 매니페스트 파일을 생성해준다.

```bash
vi np.yaml

---

apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ingress-to-nptest
  namespace: default
spec:
  podSelector:
    matchLabels:
      run: np-test-1
  policyTypes:
  - Ingress
  ingress:
  - from:
    - ipBlock:
        cidr: 0.0.0.0/0
    ports:
    - protocol: TCP
      port: 80
```

<br/>

- `create` 명령어로 네트워크 폴리시를 생성해준다.

```bash
root@controlplane ~ ➜  k create -f np.yaml 
networkpolicy.networking.k8s.io/ingress-to-nptest created
```

<br/>

- `describe` 명령어로 네트워크 폴리시가 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k describe networkpolicies.networking.k8s.io ingress-to-nptest 
Name:         ingress-to-nptest
Namespace:    default
Created on:   2022-05-19 12:30:41 +0000 UTC
Labels:       <none>
Annotations:  <none>
Spec:
  PodSelector:     run=np-test-1
  Allowing ingress traffic:
    To Port: 80/TCP
    From:
      IPBlock:
        CIDR: 0.0.0.0/0
        Except: 
  Not affecting egress traffic
  Policy Types: Ingress
```

<br/>

- 생성해두었던 테스트용 파드의 쉘을 실행해 `curl` 명령어로 파드에 트래픽을 전송할 수 있는지 확인한다.
    - 확인이 완료된 후, `exit` 명령어로 컨테이너 내의 쉘에서 빠져나올 수 있다.

```bash
root@controlplane ~ ✖ k exec curl -it -- sh
/ # curl np-test-service
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

<br/><br/>

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)
- 네트워크 정책(Network Policy): [https://kubernetes.io/ko/docs/concepts/services-networking/network-policies/](https://kubernetes.io/ko/docs/concepts/services-networking/network-policies/)

<br/>