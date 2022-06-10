---

published: true
title:  "[NGINX/Contour]HTTP ⇒ HTTPS 자동 리다이렉션 옵션 끄기(auto-redirect)"
excerpt: "NGINX에서 HTTPS 자동 리다이렉션 설정은 annotation에서(기본값 off), Contour에서 HTTPS 자동 리다이렉션 설정은 spec 하위에서(기본값 on) 설정한다"

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스네트워킹, ingresscontroller, nginx, contour, vmwaretanzu, nginx, nginxautoredirect, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어]

toc: true
toc_sticky: true

date: 2022-06-10
last_modified_at: 2022-06-10

---

<br/><br/>

**💡  NGINX에서 HTTPS 자동 리다이렉션 설정은 annotation에서(기본값=off), Contour에서 HTTPS 자동 리다이렉션 설정은 spec 하위에서(기본값=on) 설정한다**

<br/>

# 1. 발생 상황

현재 컨테이너 이관 프로젝트를 진행 중인데, 프로젝트 초기에 http 기반으로 되어있는 담당 시스템이 이관 후에는 http로 접속해도 https로 리다이렉션 되는 현상이 발생했다.

<br/>

http로 보낸 요청이 https로 변경되어 전송되어 컨테이너에서 요청을 제대로 인식하지 못해 http를 https로 변경하는 옵션을 찾아서 disable 시켜야하는 상황이었다.

<br/>

현재 프로젝트가 VMware의 Tanzu Kubernetes Cluster라는 솔루션 기반에서 동작하고 있어 같은 VMware에서 시작한 오픈소스들을 많이 사용하고 있었는데, 그래서 Ingress Controller도 일반적으로 사용하는 NGINX가 아닌 Contour라는 솔루션을 사용하고 있었다.

<br/><br/>

# 2. 설정 방법 - Contour

Contour에서는 쿠버네티스에서 제공하는 Ingress라는 리소스 대신 HTTPproxy라는 커스텀 리소스(Custom Resource)를 사용하고 있다. 

<br/>

Ingress의 경우 annotation에 설정값들을 넣어주게 되는데, HTTPproxy의 경우 spec 하단에 적어주게 된다.

<br/>

그리고 Contour는 `virtual.host` 블록에 값이 존재할 경우 기본적으로 HTTP를 HTTPS로 자동 리다이렉션 하도록 설정되어있다. 따라서 HTTP로 해당 애플리케이션에 접속할 수 있도록 하려면, 아래와 같이 `permitInsecure` 라는 옵션을 true로 설정해주어야한다.

```yaml
...(생략)...
spec:
	routes:
		permitInsecure: true
...(생략)...
```

- `permitInsecure` : 해당 경로에서 보안되지 않은 요청에 대해 HTTP를 통해 응답하는 것을 허용하는 설정.  `virtual.host` 블록이 존재할 경우 보통 허용되지 않는다.

<br/><br/>

# 3. 설정 방법 - NGINX

반면 NGINX에서는 HTTP ⇒ HTTPS 자동 리다이렉션 기능이 기본적으로 활성화 되어있지 않다.

<br/>

Ingress 리소스에서 아래 두 가지 옵션을 쌍으로 설정하여 자동 리다이렉션 기능을 켜거나 끌 수 있다.

```yaml
nginx.ingress.kubernetes.io/proxy-redirect-from: 'http://'
nginx.ingress.kubernetes.io/proxy-redirect-to: 'https://'
```

<br/><br/>

# 참고 링크

- Contour API reference: [https://projectcontour.io/docs/main/config/api/](https://projectcontour.io/docs/main/config/api/)
- NGINX kubernetes ingress annotation: [https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/)