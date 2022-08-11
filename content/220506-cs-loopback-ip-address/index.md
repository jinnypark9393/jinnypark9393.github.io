---
emoji: 💫
title:  '루프백 주소(Loopback IP address)란?'
date: '2022-05-06 06:00:00'
author: jinnypark9393
tags: network
categories: CS
---

업무 중 테스트를 위해 시스템 도메인주소에 `nslookup` 을 한 뒤, DNS 쿼리 결과를 공유해달라는 요청을 받았었는데, nslookup으로 나온 DNS 쿼리 결과값이 흔히 보는 127.0.0.1 이 아닌 127.0.0.11 로 리턴되어 문득 loopback 으로 사용할 수 있는 IP 주소 대역이 궁금해져 관련 내용을 찾아서 정리해보았다.

<br/><br/>

# 1. Loopback 주소란?

<br/>

IPv4 혹은 IPv6 에서 자기자신을 가리키기 위한 목적으로 쓰기 위해 예약된 IP주소이다.

<br/><br/>

# 2. Loopback 주소로 사용하는 IP대역

<br/>

루프백 주소로는 아래의 대역을 이용하게 된다.


- IPv4: 127.0.0.0/24 (127.0.0.0 ~ 127.255.255.255 사이의 주소 사용)
- IPv6: ::1/128 (단 1개 주소만 사용)

<br/><br/>

# 3. Localhost 주소 확인 및 수정

<br/>

이 중 IPv4의 기본 localhost값은 127.0.0.1, IPv6의 기본 localhost값은 ::1/128 이다.

<br/>

만일 Localhost의 설정값을 수정하려면 /etc/hosts/ (윈도우의 경우 C:\WIndows\System32\drivers\etc\hosts 경로) 파일을 수정하면 된다.

<br/>

이렇게 hosts 파일에서 지정한 localhost주소를 브라우저에 입력하면, DNS를 타지 않고 바로 로컬로 연결된다.

<br/>

만약 현재 PC에 등록된 localhost 주소를 알고 싶은 경우, /etc/hosts 파일을 살펴보거나, terminal 에서 `nslookup localhost` 명령어를 입력하면 된다.

<br/>