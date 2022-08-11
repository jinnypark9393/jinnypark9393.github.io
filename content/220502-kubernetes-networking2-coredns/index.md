---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) 네트워킹(2) - DNS & CoreDNS'
date: '2022-05-02 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# 1. DNS(Domain Name System)

## 1. DNS란?

지난 포스팅에서 들었던 시스템 A, B의 예시를 다시 살펴보자.

만약 시스템 A에서 시스템 B에 접속할 때, `192.168.1.11` 라는 IP 대신 `DB` 라는 이름/별칭을 사용하고 싶다면 어떻게 해야할까?  

![1.png](/assets/images/2022-05-02-Kubernetes-Networking-DNS-CoreDNS/1.png)

- 시스템 A `/etc/hosts` 에 `192.168.1.11 db` 를 등록하면 된다.
- 단 주의할 사항은, 시스템 B의 실제 호스팅명(시스템 B에서 `hostname` 명령어로 확인할 수 있다)이 실제로 db가 아니라 host-2와 같이 다른 이름일 경우에도 `db` 로 접속이 된다는 점이다.

이처럼 DNS는 IP주소를 사람이 읽을 수 있는 도메인명으로 바꿔주는 시스템을 뜻한다.

## 2. Name Resolution

위의 예와 같이, 호스트에서 `/hosts` 파일 내에 DNS명과 IP명을 읽고 변환하는 작업을 **Name Resolution** 이라고 한다.

오늘날에는 환경이 커지고 너무 많은 항목이 생겨서 파일을 관리하기가 어렵기 때문에, 해당 정보를 한개의 단일 서버로 관리하게 되는데, 이 서버를 **DNS 서버**이다.

그렇다면, 각 호스트(컴퓨터)가 DNS 서버를 가리키게 하려면 어떻게 해야할까?

![2.png](/assets/images/2022-05-02-Kubernetes-Networking-DNS-CoreDNS/2.png)

- 모든 호스트에는 `/etc/resolv.conf` 라는 DNS resolution 구성 파일이 존재한다.
- 따라서, A 서버의 `resolv.conf` 파일에 `nameserver 192.168.1.100` 를 등록하면 네임서버(DNS서버)를 향하게 된다.

단, 테스트 목적 등으로 사용할 경우, 이전처럼 `etc/hosts` 에 등록하여 사용할 수 있다.

만약, A 서버의 hosts 파일에 192.168.1.115 IP 서버를 test 로 등록하고, DNS 서버에도 같은 호스트 이름으로 다른 IP를 등록한 경우에는 어떻게 될까?

![3.png](/assets/images/2022-05-02-Kubernetes-Networking-DNS-CoreDNS/3.png)

- 호스트는 먼저 로컬의 hosts 파일에 등록된 내역을 찾은 뒤, DNS 서버에 쿼리하게 된다.
- 따라서, A 서버에서 test로 통신요청을 보낸 경우, hosts 파일에 등록된 192.168.1.115 서버가 응답하게 된다.

참고로, 파일을 읽는 순서는 `/etc/nsswitch.conf` 파일에서 정의된다.

만약 로컬 & DNS 서버 모두 모르는 호스트명이 있을 경우, Ping이 실패하게 되는데, 그럴 경우에는 **public nameserver**를 DNS서버에 등록하면 된다(로컬 hosts 파일에 등록해도 적용되나 모든 호스트에 하나하나 적용을 해야하기 때문에 DNS 서버에 등록하는 것이 효율적).

## 3. Domain Names

인터넷을 하다보면, `www.google.com` , `www.naver.com` , `www.kubernetes.io` 등의 주소를 볼 수 있는데, 이 이름들이 바로 도메인명(Domain Name)이다. 

### 1. Domain Name 구조

![4.png](/assets/images/2022-05-02-Kubernetes-Networking-DNS-CoreDNS/4.png)

- `.` 으로 구분 된 것은 비슷한 것들끼리 묶어서 보기 편하게 분류하려고 한 것.
- 최상위 도메인 종류(Top Level Domain Name)
    - `.com`: 상업적 / 일반 목적
    - `.net` : 네트워크
    - `.edu` : 교육기관
    - `.org` : 비영리기관
    - `.io` : 영국령 인도양식민지(British Indian Ocean Territory)의 국가 톱 레벨 도메인

- Domain name 구조
    - `.` : root
    - `.com` : 탑 레벨 도메인 네임
    - `google` : 구글에 할당된 도메인 이름
    - `www` : 하위 도메인 (기타 예: drive, maps, apps, mail 등)

- [apps.google.com](http://apps.google.com) 에 접속
    - 본인이 속한 조직의 DNS 서버에 도착
    - ⇒ 리스트에 없으니 Root DNS로 전송
    - ⇒ 요청을 확인하고 .com DNS 서버로 전송
    - ⇒ 요청을 확인하고 google DNS 서버로 전송: IP 제공
    
    → **조직의 DNS 서버는 일정기간(일반적으로 몇 초)동안 해당 IP를 캐시**
    

## 4. Search Domain

- 회사에서 mydomain.com이라는 도메인과 nfs, web, mail, drive 등의 서브도메인을 운영
- 외부에서 접속할 때에는 web.mydomain.com으로 접속
    
    ⇒ 내부에서도 web이 아닌 web.mydomain.com
    
    `[mydomain.com](http://mydomain.com)` 같은 서치 도메인을 조직 내에서 생략하고 싶을 경우
    
    ⇒ `/etc/resolv.conf` 에 `search [mycompany.com](http://mycompany.com)` 을 등록하면 앞의 web만 검색해도 [web.mycompany.com](http://web.mycompany.com) 으로 연결됨 (두 개이상 등록도 가능함: 두개 사이에 공백을 넣어주면 됨)
    

## 5. 레코드 타입

| A | web-server | 192.168.1.1 |
| --- | --- | --- |
| AAAA | web-server | 2001:0db8:85a3:0000:0000:8a2e:0370:7334 |
| CNAME | food.web-server | eat.web-server, hungry.web-server |
- A record: 호스트 이름에 IP 저장
- AAAA record: IPv6를 저장
- CNAME: 호스트네임을 다른 호스트네임과 매핑

## 6. DNS 조회 도구들

### 1. nslookup

- `nslookup [www.google.com](http://www.google.com)`
- Nslookup은 로컬 hosts 파일을 조회하지 않고 DNS 서버만 조회하게 됨

### 2. Dig

- `dig www.google.com`
- Nslookup보다 더 많은 정보 제공

# 2. CoreDNS

- Core DNS 설치방법
    - Github 릴리스 페이지 혹은 도커 이미지로 다운로드 할 수 있음.
        - Wget 혹은 curl
        - 압축 해제
        - `./coredns` 로 실행
        - 기본 포트(53 포트)에서 수신대기
        - CoreDNS는 Corefile에서 구성 로딩
            - Corefile에 hosts /etc/hosts 구문을 넣어 hosts 파일을 가져오도록 지시

- CoreDNS는 플러그인을 통해 DNS항목을 구성할 수도 있다(쿠버네티스용 플러그인도 존재)

<br/>