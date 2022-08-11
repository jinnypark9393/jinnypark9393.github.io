---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) Pod의 /etc/hosts 파일에 DNS 추가하는 방법(HostAlias)'
date: '2022-05-11 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

**💡Pod의 /etc/hosts 파일에 DNS를 추가하기 위해서는 Deployment의 hostalias 옵션을 사용한다.**

<br/>

# 1. 배경 상황

프로젝트 진행 중 인프라팀에서 NAS의 연결 주소를 내부 private IP로 변경하기위해서 파드 내 컨테이너의 /etc/hosts 파일을 변경해달라는 요청을 받았다.

<br/>

# 2. 설정 방법

Pod의 /etc/hosts 파일을 변경하기 위해서는 Pod(Pod가 Deployment에 의해 생성되었을 경우에는 Deployment) YAML 파일의 hostAlias 항목에 도메인, 그리고 도메인과 맵핑할 ip를 기입해주면 된다.

<br/>

**※ 컨테이너 내부의 호스트 파일을 수동으로 변경하면 안된다. 컨테이너는 휘발성이기 때문에, 컨테이너 종료 시 변경사항이 손실된다.**

<br/>

- Deployment에 등록할 경우

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: web-app
 namespace: default
spec:
 replicas: 2
 selector:
  matchLabels:
    app: web
 template:
   metadata:
     labels:
       app: web
   spec:
     restartPolicy: Always
     hostAliases:
     - ip: "127.0.0.1"
       hostnames:
       - "foo.local"
     containers:
     - name: cat-hosts
       image: busybox
       command:
       - cat
       args:
       - "/etc/hosts"
```

- spec.template.hostAliases.ip ⇒ /etc/hosts 파일에 등록할 ip
- spec.template.hostAliases.hostnames ⇒ /etc/hosts 파일에 등록할 호스트명

<br/>

- Pod에 등록할 경우

```yaml
apiVersion: v1
kind: Pod
metadata:
 name: web-app
 namespace: default
 labels:
   app: web
spec:
  restartPolicy: Always
  hostAliases:
  - ip: "127.0.0.1"
    hostnames:
    - "foo.local"
  containers:
  - name: cat-hosts
    image: busybox
    command:
    - cat
    args:
    - "/etc/hosts"
```

- spec.hostAliases.ip ⇒ /etc/hosts 파일에 등록할 ip
- spec.hostAliases.hostnames ⇒ /etc/hosts 파일에 등록할 호스트명

<br/>
# 3. 참고 자료

- Kubernetes 공식문서: [kubernetes.io/ko/docs/tasks/network/customize-hosts-file-for-pods](http://kubernetes.io/ko/docs/tasks/network/customize-hosts-file-for-pods)

<br/>