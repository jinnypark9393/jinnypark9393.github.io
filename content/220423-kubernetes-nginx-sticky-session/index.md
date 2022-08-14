---
emoji: 🔧
title:  'Kubernetes NGINX Ingress의 Sticky Session 설정이 되지 않는 이슈 해결'
date: '2022-04-23 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

**💡 NGINX Ingress Controller 사용 시 nginx.ingress.kubernetes.io 어노테이션을 사용해야 Sticky session 등의 설정값이 적용된다(일반 ingress.kubernetes.io 설정 적용시 설정 적용 안됨)**

<br/>

# 1. 에러 상황

컨테이너 전환 프로젝트 진행 도중 Ingress Controller를 Contour에서 NGINX-Ingress Controller로 변경 후, 시스템에 간헐적으로 접속이 되지 않는 현상이 발생했다(구체적으로는 브라우저에서 관리자에게 문의하라는 페이지가 뜨며 접속이 되지 않다가 새로고침 시 접속이 되는 현상).

<br/>

해당 시스템은 Multi Pod로 구성되어있었는데(replicas = 2), 각 Pod로그를 보니 아래와 같은 SQL 에러가 발생하고 있었다.

```bash
Error querying database. Cause: com.edb.util.SQLException: FATAL: terminating connection due to administrator command
```

<br/><br/>

로그를 추가적으로 살펴보니 user 정보를 SELECT하는 데에서 오류가 나고 있었고, 각 파드에서 로그인 아이디 정보를 찍어주는 로그에 아래와 같은 로그가 발생하고 있었다.

<br/>

- Pod A 로그

```bash
2022-MM-DD_hh:mm:ss.000:loginId=null, /파일경로,
clientTimezone=Asia/Seoul
```

<br/>

- Pod B 로그

```bash
2022-MM-DD_hh:mm:ss.000:loginid=canary,/파일경로,
userId=canary
```

<br/>

로그인 아이디를 한쪽에서만 받아주고 있었는데, 브라우저에서 관리자도구(F12키로 관리자 도구 기동 ⇒ Network에서 JSESSIONID 확인) 로 확인해보니 새로고침마다 다른 Pod에서 세션을 받아오는 `round robin` 방식으로 세션 설정이 되어있어 로그인 정보가 저장되지 않은 Pod에 접근할 때 에러가 나고있었다.

<br/>

쿠버네티스 대시보드의 Ingress 설정을 확인해보니, annotation 값들이 `nginx.ingress.kubernetes` (NGINX ingress controller를 적용했을 때의 설정)가 아닌 `ingress.kubernetes` , 즉 **일반 쿠버네티스 ingress 객체 설정으로 되어있어 annotation 설정이 적용이 되지 않고 있었다.**

<br/>

# 2. 해결 방법

따라서 해당 설정을 아래와 같이 nginx.ingress로 변경해 `round robin` 대신  `sticky session`을 적용했다. `sticky sesison` 적용 후 사용자 로그인 정보가 저장된 Pod로만 요청이 라우팅되어 에러가 해결되었다.

<br/>

- nginx-ingress.yaml 설정

```yaml
apiVersion: netwroking.k8s.io/v1
kind: Ingress
metadata:
 name: nginx-ingress
 namespace: web-app
 annotations:
  kubernetes.io/ingress.class: nginx
  nginx.ingress.kuberentes.io/affinity: cookie
  nginx.ingress.kuberentes.io/affinity-mode: persistent
  nginx.ingress.kuberentes.io/session-cookie-expires: '172800'
  nginx.ingress.kuberentes.io/session--cookie-max-age: '172800'

(이하 생략)

```

- `kubernetes.io/ingress.class: nginx` : 어떤 인그레스를 쓸 것인지 설정
- `nginx.ingress.kuberentes.io/affinity-mode: cookie` : 세션 어피니티(session affinity = sticky session) 설정 활성화. 현재 NGINX에서 사용 가능한 어피니티 타입은 `cookie` 하나 뿐이다.
- `nginx.ingress.kuberentes.io/affinity-mode: persistent` : 얼마나 sticky 하게 설정할 것인지 설정. `balanced` (기본값) 과 `persistent` 두 가지가 있다. Persistent로 설정할 경우 Pod가 확장되어도 서버간 부하를 분산하지 않는다.
- `nginx.ingress.kuberentes.io/session-cookie-expires: '172800'` : 쿠키 만료시까지의 시간(초 단위)
- `nginx.ingress.kuberentes.io/session--cookie-max-age: '172800'` : 오래된 브라우저와 호환되는 이전 버전의 Annotation 값. `Expires` 쿠키를 생성함.

<br/>

- 참고
    - NGINX Configuration ([https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/))
    - NGINX Examples Sticky Sessions ([https://kubernetes.github.io/ingress-nginx/examples/affinity/cookie/](https://kubernetes.github.io/ingress-nginx/examples/affinity/cookie/))

<br/>