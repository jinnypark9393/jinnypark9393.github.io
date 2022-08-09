---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA - KillerKoda Q5. Application Multi Container Issue'
date: '2022-05-21 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# Q5. 애플리케이션 멀티 컨테이너 이슈

`management` 네임스페이스에 멀티 컨테이너 디플로이먼트(Deployment)가 있으나 이슈가 있어 ready상태가 되지 않은 듯 하다.

<br/>

`/root/logs.log` 파일에 모든 컨테이너의 로그를 기록하자.

<br/>

장애의 원인이 보이는가?

<br/><br/>

## 팁

```
k -n management get deploy

k -n management logs -h
```

<br/><br/>

## 해결 방법

```
k -n management logs deploy/collect-data -c nginx >> /root/logs.log
k -n management logs deploy/collect-data -c nginx >> /root/logs.log

```

이슈는 두 컨테이너가 모두 80번 포트에서 리스닝하려는 프로세스를 갖고있기 때문으로 보인다. 컨테이너 순서와 속도에 따라서 처음 컨테이너가 성공하면 다른 쪽 컨테이너가 실패하게 된다.

<br/>