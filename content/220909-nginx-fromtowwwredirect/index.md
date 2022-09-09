---
emoji: 🔧
title:  'NGINX 도메인경로에 www를 자동으로 추가/삭제하는 방법'
date: '2022-09-09 16:56:00'
author: jinnypark9393
tags: nginx
categories: 데브옵스
---

<br/>

# 1. 배경 상황

신규로 담당하게 되었던 시스템이 특정 환경에서만 접속이 되지 않아 팀원분들과 함께 원인을 찾아보던 중 ingress의 annotation 중 특이하게 설정되어있는 부분이 있어 해당 어노테이션에 대해 찾아보게 되었다.

<br/>

내가 눈여겨 보았던 어노테이션은 도메인 경로에서 `www` 라는 하위 도메인을 자동으로 추가하는 설정이었는데, 테스트를 위해 해당 시스템의 도메인 정보를 사전에 받았을 때, `www` 하위 도메인이 포함되어있지 않았었다. 따라서 www라는 하위 도메인으로 redirect하는 설정때문에 시스템 접속에 문제가 생긴 것이 아닐까 하고 추측했었다. 하지만 이 설정은 다른 분이 시스템 접속 이슈를 해결하고자 이것 저것 시도해보시다가 들어가게 된 설정이었고, 해당 설정을 하기 전에도 시스템 접속에 문제가 있었던 상황이었다(그리고 해당 이슈의 원인도 결국은 도메인 주소의 문제가 아니라 mime-type 설정의 문제로 밝혀졌다).

<br/>

# 2. 설정 방법

NGINX Ingress controller를 사용하는 쿠버네티스 환경에서 특정 Ingress에 www라는 하위 도메인으로 자동으로 redirect하게 해주거나, 반대로 www라는 하위 도메인이 붙어있을 경우 하위 도메인을 제거해주는 설정은 아래와 같다.

<br/>

참고로 이 설정은 Ingress의 annotation 항목에 아래와 같은 설정을 추가하여 적용할 수 있다.

```python
nginx.ingress.kubernetes.io/from-to-www-redirect: "true"
```

<br/>

# 3. 참고 링크

- Kubernetes/ingress-nginx annotations - [https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#redirect-fromto-www](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#redirect-fromto-www)

<br/>