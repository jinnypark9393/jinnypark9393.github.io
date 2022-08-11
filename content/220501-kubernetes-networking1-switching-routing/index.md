---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) 네트워킹(1) - 스위칭 & 라우팅'
date: '2022-05-01 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

**💡  쿠버네티스 네트워킹을 알아보기에 앞서 리눅스 머신에서의 스위칭 & 라우팅에 대해 알아보자.**

<br/>

# 1. 스위칭

![2022-05-01-Kubernetes-Networking-Swtiching-Routing1](/assets/images/2022-05-01-Kubernetes-Networking-Swtiching-Routing/2022-05-01-Kubernetes-Networking-Swtiching-Routing1.png)

- 컴퓨터 A와 B가 통신하기 위해서는 각 컴퓨터(호스트)에 물리, 혹은 가상 인터페이스가 필요하다.

<br/>

- 각 리눅스 머신(=컴퓨터), 스위치에  IP 주소를 할당하자.
    
    ```bash
    # 스위치에 ip 주소 할당
    ip addr add 192.168.1.0/24
    
    # 컴퓨터 A
    ip addr add 192.168.1.10/24 dev eth0
    
    # 컴퓨터 B
    ip addr add 192.168.1.11/24 dev eth0
    ```

<br/>

- A, B는 같은 네트워크 안에 있으므로, 스위치를 통해 서로 통신할 수 있다.
    - 컴퓨터 A(192.168.1.10)에서 컴퓨터 B(192.168.1.11)로 통신 가능
    - 컴퓨터 B(192.168.1.11)에서 컴퓨터 A(192.168.1.10)로 통신 가능

<br/><br/>

# 2. 라우팅

## 1. 다른 네트워크에 존재하는 머신과 통신

- 컴퓨터 A & B와 다른 네트워크에 컴퓨터 C & D 가 존재할 때, 컴퓨터 A, B에서 어떻게 시스템 C, D로 도달하게 될까?
    
    ![2022-05-01-Kubernetes-Networking-Swtiching-Routing2](/assets/images/2022-05-01-Kubernetes-Networking-Swtiching-Routing/2022-05-01-Kubernetes-Networking-Swtiching-Routing2.png)
    
    ⇒ **라우터**가 필요!
    
<br/>

- 라우터(Router): 다른 네트워크를 연결하는 장치
    
    ![2022-05-01-Kubernetes-Networking-Swtiching-Routing3](/assets/images/2022-05-01-Kubernetes-Networking-Swtiching-Routing/2022-05-01-Kubernetes-Networking-Swtiching-Routing3.png)
    
    - 라우터가 각 네트워크와 연결 될 수 있도록 아래의 IP를 할당
        - `192.168.1.1` (A, B와 같은 네트워크)
        - `192.168.2.1` (C, D와 같은 네트워크)

<br/>

- A, B와 C,D가 통신 할 수 있도록 각 컴퓨터에 게이트웨이(Gateway)를 설정
    
    ![2022-05-01-Kubernetes-Networking-Swtiching-Routing4](/assets/images/2022-05-01-Kubernetes-Networking-Swtiching-Routing/2022-05-01-Kubernetes-Networking-Swtiching-Routing4.png)
    
    - 각 컴퓨터(A, B, C, D)에서 `route` 커맨드를 실행해 게이트웨이를 설정
    - 예시
        
        ```bash
        # A, B의 설정
        # 192.168.2.0 번대 네트워크로 가는 요청은 192.168.1.1 으로 보낸다.
        ip route add 192.168.2.0/24 via 192.168.1.1
        
        # C, D의 설정
        # 192.168.1.0 번대 네트워크로 가는 요청은 192.168.2.1 으로 보낸다.
        ip route add 192.168.1.0/24 via 192.168.2.1
        ```
        
    - 설정 완료 후, route 커맨드로 설정 내역을 확인할 수 있다.

<br/>
<br/>

## 2. 인터넷과의 통신

- 시스템을 인터넷(172.217.194.0/24)에 연결하려면?
    
    ![2022-05-01-Kubernetes-Networking-Swtiching-Routing5](/assets/images/2022-05-01-Kubernetes-Networking-Swtiching-Routing/2022-05-01-Kubernetes-Networking-Swtiching-Routing5.png)
    
    - A,B - C,D 네트워크를 연결했을 경우와 마찬가지로 Gateway를 통해 목적지에 연결하는 루트 추가
    - A, B 설정: `ip route add 172.217.194.0/24 via 192.168.1.1`
    - C, D 설정: `ip route add 172.217.194.0/24 via 192.168.2.1`

<br/>
<br/>

## 3. 라우팅 테이블에 존재하지 않는 IP와의 통신

- 컴퓨터의 라우팅 테이블에 등록되지 않아 경로를 알 수 없는 IP와의 통신을 할 경우에는 어떻게 설정?
    
    ⇒ **디폴트 게이트웨이(Default Gateway)**

<br/>
   
- 설정 방법은 아래 둘 중 하나
    - `ip route add default via 192.168.2.1`
    - `ip route add 0.0.0.0 via 192.168.2.1`

<br/>
<br/>

## 3. 리눅스 머신을 라우터로 사용

- 라우터, 스위치 대신 리눅스 머신을 네트워크 장비처럼 사용할 수 있다.
- 라우터 설정과 동일하게 라우터가 되는 리눅스 머신에서 IP 설정
- 머신 A, B 에서 각각 Gateway IP 설정

![2022-05-01-Kubernetes-Networking-Swtiching-Routing6](/assets/images/2022-05-01-Kubernetes-Networking-Swtiching-Routing/2022-05-01-Kubernetes-Networking-Swtiching-Routing6.png)

- A와 B가 통신이 가능할까?
    - 불가능하다.
    - 리눅스에서는 기본적으로 패킷을 한 인터페이스에서 다른 인터페이스로 전달하지 않으므로, **명시적으로 정의**해야하기 때문.

<br/>

- 라우터 역할을 하는 머신에서 설정값을 확인해보자: `cat /proc/sys/net/ipv4/ip_forward`
    - 기본 설정값은 `0(포워딩하지 않음)`
    - 포워딩을 허용하는 설정값은 `1`

<br/>

- 네트워크 패킷을 전달하도록 수정:  `echo 1 > /proc/sys/net/ipv4/ip_forward`
    - 위의 설정은 **재부팅시 초기화**된다.

<br/>

- 재부팅 이후에도 설정값을 유지하도록 하려면 `etc/sysctl.conf` 파일의 `net.ipv4..ip_forward = 1` 설정값을 넣어주어야 한다.

<br/>
<br/>

# 3. 유용한 리눅스 명령어들

- `ip link` : 호스트의 인터페이스를 나열 및 수정
- `ip addr` : 해당 인터페이스에 할당된 IP 주소를 확인
- `ip addr add 192.168.1.10/24 dev eth0` : 인터페이스에 IP를 설정하는데에 사용
- 변경사항을 부팅 후에도 유지하려면 `/etc/network/interfaces` 파일을 수정해야한다.
- `ip route` `route` : 라우팅 테이블 확인
- `ip route add 192.168.1.0/24 via 192.168.2.1`: 라우팅 테이블에 항목 추가
- `cat /proc/sys/net/ipv4/ip_forward` : 호스트에서 IP전달이 활성화 되어있는지 확인(0은 전달 불가. 1은 전달 가능)

이번 포스팅에서는 쿠버네티스 네트워킹의 기본이 되는 스위칭, 라우팅, 그리고 리눅스 머신에서의 라우팅에 대해서 알아보았다. 다음 포스팅에서는 DNS에 대해 알아보도록 하자.

<br/>