---

published: true
title:  "[Kubernetes/CKA]KillerKoda Q5. Application Multi Container Issue"
excerpt: "한 파드에 컨테이너가 여러개 존재할 경우 각자 다른 포트를 리스닝해야한다."

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