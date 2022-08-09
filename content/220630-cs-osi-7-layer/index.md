---
emoji: 💫
title:  OSI 7 Layer, TCP/IP란?
date: '2022-06-30 06:00:00'
author: jinnypark9393
tags: network
categories: CS
---

# 1. OSI 7 Layer란?

- Open System Interconnection Reference Model의 약어이다.
- ISO(국제 표준화 기구)에서 개발한 모델로, 컴퓨터 네트워크 프로토콜 디자인과 통신 계층을 나누어 설명한다.
- 통신 장치를 구분하고 계층이라는 형태로 독립시킨다.
- 각 계층에서의 변경은 다른 계층에 영향을 주지 않는다.

<br/>

# 2. OSI 7 Layer 계층별 설명

| 계층 | 이름 | 프로토콜 예시 |
| --- | --- | --- |
| 7 | 응용 계층(Application Layer) | HTTP, FTP, DNS, SNMP, Telnet |
| 6 | 표현 계층(Presentation Layer) | SSL, TLS |
| 5 | 세션 계층(Session Layer) | NetBIOS, PPTP |
| 4 | 전송 계층(Transport Layer) | TCP, UDP |
| 3 | 네트워크 계층(Network Layer) | IP, ARP, ICMP, IPSec |
| 2 | 데이터 링크 계층(Data Link Layer) | PPP, ARP, Ethernet |
| 1 | 물리 계층(Physical Layer) | USB, Bluetooth, IEEE802.11 |

<br/>

## (1) 물리 계층(Physical Layer)

- 물리 계층에서는 물리적인 커뮤니케이션/데이터 전송을 담당한다.

<br/>

## (2) 데이터 링크 계층(Data Link Layer)

- 데이터 링크 계층의 주요 기능은 아래 4가지이다.

1. **Service to neighbors (Service to neighbor layer)**
    - 이웃한 계층들에게 잘 정의된 서비스 인터페이스를 제공해 이웃한 물리계층과 네트워크 계층에 서비스를 제공한다.
2. **Framing**
    - 데이터를 프레임(Frame)으로 그룹화해 전송해 물리계층의 비트스트림 오류를 수정한다.
    - 물리 계층에 의해 제공된 비트스트림을 분리된 프레임으로 분할한다.
3. **Flow Control**
    - 데이터를 보내는 측과 받는 측의 속도를 확인해 제어하는 것.
    - 데이터를 받는 측이 속도가 느릴 때 빠르게 데이터를 전송하는 측에 의해 막히지 않도록 속도를 규제
4. **Error Control**
    - 모든 프레임이 최종 목적지에 올바른 순서로 전달되었는지 확인하여 전송된 오류를 처리한다.
    - 비연결형 서비스에서는 문제되지 않지만 연결지향에서는 문제가 되니 오류 검출 및 수정 기능이 필요하다.
    - 패리티 검사(Parity Check), 체크섬(Checksum), 순환중복검사(Cyclic Redundancy Code)

## (3) 네트워크 계층(Network Layer)

## (4) 전송 계층(Transport Layer)

- **라우팅(Routing)**: 특정 네트워크 안에서 통신 데이터를 보낼 경로를 선택한다.
- **혼잡 제어(Congestion Control)**: 현재 서브넷에 많은 패킷이 들어올 때 수행능력이 감소하지 않도록 한다. 혼잡 제어 알고리즘의 예시로는 Choke Packets, Hop-by-hop chock packets, Load Shedding, Jitter Control
- **인터네트워킹(Internetworking)**: 네트워크 간의 통신하는 개념 및 제반 기술. 독립적으로 움직이는 개개의 네트워크간의 접속. 예시로는 여러 독립적 LAN을 WAN을 통해 연결한다.

## (5) 세션 계층(Session Layer)

- 연결의 확립, 해제, 전송 데이터의 단락 설정 등 데이터 전송의 관리 수행

## (6) 표현 계층(Presentation Layer)

- 데이터 형식의 변환 수행
- 사용자와 컴퓨터를 연결하는 계층
- 보내고 싶은 데이터를 통신에 적합한 형태로 만들거나 전달된 데이터를 사용자에게 맞게 변환

## (7) 응용 계층(Application Layer)

- 사용자에게 다양한 응용 프로그램 제공

# 3. OSI 7 Layer를 사용하는 장단점

## (1) 장점

- 단순함
    - 설계하기 쉽다: 한 번 각 층과 각 층간의 상호작용이 명확히 정의되면, 디자인/구현/테스팅이 간단해진다.
    - 유지보수가 쉽고 간편하다: 각 계층의 프로토콜은 다른 계층들과 나누어 설계될 수 있다.
- 유연성
    - 수정이 쉽다: 각 계층이 독립되어있어 다른 계층에 영향 없이 수정을 할 수 있다.
    - 개선이 쉽다: 새로운 계층을 더하거나 새로운 기능을 계층에 더할 수 있다.

## (2) 단점

- 7개의 계층을 거쳐야 하기 때문에 지연시간이 발생한다.
- 각 계층마다 헤더 등의 정보를 추가하거나 없애기 때문에 지연시간이 발생한다.

# 4. TCP/IP 프로토콜

- 오늘날 인터넷에서 컴퓨터들이 서로 정보를 주고받는 데에 쓰이는 프로토콜(protocol)의 모음이다.
- 하드웨어, 운영체제, 접속 매체에 관계없이 동작할 수 있는 개방성을 가진다.
- TCP/IP 프로토콜의 경우 세션과 표현 계층이 없다.
- TCP/IP 프로토콜의 계층
    - Application Layer
    - Transport Layer
    - Internett Layer
    - Data Access Layers

<br/><br/>
