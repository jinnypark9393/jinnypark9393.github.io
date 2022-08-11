---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA Lightning Lab 4 - 디플로이먼트(Deployment) 생성 및 이미지 업데이트'
date: '2022-05-15 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# 4. 디플로이먼트(Deployment) 생성 및 이미지 업데이트

## [문제 요건]

- `default` 네임스페이스에 `nginx:1.16` 이미지를 사용하는 신규 디플로이먼트 `nginx-deploy`를 생성해야한다. 레플리카 수는 1.
- 그 뒤, 디플로이먼트의 버전을 롤링 업데이트(Rolling Update)로 `1.17`로 업데이트
- 채점기준
   - 이미지: nginx:1.16
   - 작업: 디플로이먼트의 버전을 1.17로 업그레이드

<br/><br/>

## [내 풀이]

- 쿠버네티스 공식 문서의 kubectl cheatsheet 페이지 참조해 디플로이먼트 리소스 생성

```bash
root@controlplane:~# kubectl create deployment nginx-deploy --image=nginx:1.16 --replicas=1
deployment.apps/nginx-deploy created
NAME           READY   UP-TO-DATE   AVAILABLE   AGE   CONTAINERS   IMAGES         SELECTOR
gold-nginx     1/1     1            1           20m   nginx        nginx:latest   app=gold-nginx
nginx-deploy   1/1     1            1           37s   nginx        nginx:1.16     app=nginx-deploy
```

<br/>

- 같은 페이지의 리소스 업데이트 탭을 참조해 이미지 업데이트
    - Tip: 이미지를 업데이트할 때에는 `kubectl set image <리소스종류>/<리소스 이름> <컨테이너명>=<이미지:버전>` 명령어를 사용하면 이미지가 롤링업데이트 된다.

```bash
root@controlplane:~# kubectl set image deployment/nginx-deploy nginx=nginx:1.17
deployment.apps/nginx-deploy image updated
root@controlplane:~# k get deployments.apps -o wide
NAME           READY   UP-TO-DATE   AVAILABLE   AGE     CONTAINERS   IMAGES         SELECTOR
gold-nginx     1/1     1            1           24m     nginx        nginx:latest   app=gold-nginx
nginx-deploy   1/1     1            1           4m10s   nginx        nginx:1.17     app=nginx-deploy
```

<br/><br/>

## [참고 URL]

- 이미지 업데이트: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/#리소스-업데이트](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/#%EB%A6%AC%EC%86%8C%EC%8A%A4-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8)

<br/>