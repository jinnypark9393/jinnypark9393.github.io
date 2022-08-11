---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) 네트워킹(3) - Linux Namespaces'
date: '2022-05-03 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

**💡  쿠버네티스 네트워킹을 알아보기에 앞서 리눅스의 네임스페이스에 대해 알아보자.**

<br/>

# 1. Linux Namespaces

## 1. 네임스페이스

- 호스트 안의 격리된 공간(집 안에 방이 있는 것과 같음): 컨테이너를 생성할 때 컨테이너를 격리해 다른 컨테이너가 표시되지 않도록 하고 싶은 경우
- 네임스페이스 안의 컨테이너 ⇒ 자기자신만 볼 수 있음
- Underlying (기본) 호스트: 모든 프로세스를 볼 수 있음
    - `ps aux` 로 확인할 수 있음 ⇒ 네임스페이스 내부/외부에서 같은 프로세스지만 PID가 상이하게 됨
    - 호스트
        - LAN에 연결하는 인터페이스 존재
        - 라우팅 테이블
        - ARP 테이블: IP - MAC 주소 일대일 대응한 테이블
        
        ⇒ 컨테이너에서 위 세부사항을 보이지 않게 하고 싶다면?
        

<br/>

- 네임스페이스 내에 컨테이너 생성 시 호스트에 대한 네트워크 정보에 대한 가시성 없어짐
    - 네임스페이스는 자체 가상 인터페이스(veth) 및 라우팅 테이블/ARP 테이블을 가질 수 있음

<br/><br/>

## 2. 네트워크 네임스페이스 생성

- `ip netns add red`
- `ip netns add blue`
- `ip netns`
- `ip link` : host 의 인터페이스 확인
- `ip netns exec red ip link` : 네임스페이스의 인터페이스 확인 (= `ip -n red link` )

<br/><br/>

## 3. 네트워크 네임스페이스 안에서 실행

- `arp` : 호스트에서의 항목들 출력
- `ip netns exec red arp` : 컨테이너에서의 항목들 출력

- `route` : 호스트에서의 라우팅 테이블 출력
- `ip netns exec red route` : 컨테이너에서의 라우팅 테이블 출력

- 2개의 다른 네임스페이스간의 통신: 가상 이더넷 페어 혹은 가상 케이블(=파이프)
    - `ip link add veth-red type veth peer name veth-blue`
    - `ip link set veth-red netns red` & `ip link set veth-blue netns blue`
    - IP 할당
        - `ip -n red addr add 192.168.15.1 dev veth-red`
        - `ip -n blue addr add 192.168.15.2 dev veth-blue`
    - IP 링크 업
        - `ip -n red link set veth-red up`
        - `ip -n blue link set veth-blue up`
    - 테스트
        - `ip netns exec red ping 192.168.15.2`
        - `ip netns exec red arp`
        - `ip netns exec blue arp`
            - 상대방의 mac/ip주소 표시
        - `arp` : host 의 arp 테이블
            - 네임스페이스 내의 정보 없음

<br/>

- 가상 스위치 생성
    - 가상 스위치 생성하고 네임스페이스 연결
        - Linux Bridge / Open vSwitch를 통해 생성 가능

<br/>

- Linux Bridge
    - `ip link add v-net-0 type bridge` : 호스트에 ip 인터페이스를 추가 ( `ip link` 로 확인할 수 있음)
    - `ip link set dev v-net-0 up` : 네트워크 링크 활성화
    - 기존 직접연결 링크 삭제
        - `ip -n red link del veth-red`: 한쪽 링크 삭제하면 다른쪽 링크 자동 삭제됨
    - `ip link add veth-red type veth peer name vth-red-br`
    - `ip link add veth-blue type veth peer name vth-blue-br`
    - `ip link set veth-red netns red`
        - `ip link set veth-red-br master v-net-0` : v-net-0(스위치)에 veth-red-br 인터페이스 연결
        - `ip -n red addr add 192.168.15.1 dev veth-red` : IP 주소 연결
        - `ip -n red link set veth-red up`: 인터페이스 링크 활성화
    - `ip link set veth-blue netns blue`
        - `ip link set veth-blue-br master v-net-0`: v-net-0(스위치)에 veth-blue-br 인터페이스 연결
        - `ip -n blue addr add 192.168.15.2 dev veth-blue` : IP주소 연결
        - `ip -n blue link set veth-blue up`: 인터페이스 링크 활성화

<br/>

- 호스트와 네임스페이스간 연결
    - 브리지스위치: 호스틑의 네트워크 인터페이스 중 하나
    - `ip addr add 192.168.15.5/24 dev v-net-0` : 호스트 IP 추가
    - 로컬 호스트에서 네임스페이스 연결

<br/>

- 호스트 바깥과 통신
    - Blue namespace ⇒ 호스트 바깥 망(192.168.1.3)
        - `ip netns exec blue ping 192.168.1.3` ⇒ 도달하지 않음 ( `ip netns exec blue route` 확인해보면 등록되지 않았음)
        - 라우팅 테이블에 항목을 추가해 외부에 대한 게이트웨이 제공해야함
            - `ip netns exec blue ip route add 192.168.1.0/24 via 192.168.15.5` 등록
                - 192.168.15.5 : v-net-0
                - Ping이 가지만 돌아오지 않음
            
            ⇒ NAT 을 구성해야함
            
            - `iptables -t nat -A POSTROUTING -s 192.168.15.0/2 -j MASQUERADE`

<br/>

- 인터넷에 연결
    - `ip netns exec blue ip route add default via 192.168.15.5`
        - 0.0.0.0 주소가 v-net-0를 통해 가도록 게이트웨이 구성

<br/>

- 외부에서 네임스페이스로 통신
    - 외부 호스트에 Namespace의 IP 라우팅 등록: 192.168.15.5(v-net-0) via 192.168.1.2(eth0)
    - `iptables -t nat -A PREROUTING —dport 80 —to-destination 192.168.15.2:80 -j DNAT`

<br/>