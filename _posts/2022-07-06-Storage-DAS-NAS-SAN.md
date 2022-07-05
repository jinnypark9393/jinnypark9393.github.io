---

published: true
title:  "[Storage]DAS, NAS, SAN이란? (정의, 차이점)"
excerpt: "DAS, NAS, SAN은 모두 대표적인 스토리지의 종류이며, 각 스토리지는 연결 방식에 차이가 있다"

categories:
- Programming
tags:
- [인프라엔지니어, SRE, DevOps, 데브옵스엔지니어, 스토리지종류, 스토리지연결방식, DAS, NAS, SAN]

toc: true
toc_sticky: true

date: 2022-07-06
last_modified_at: 2022-07-06

---

<br/><br/>

DAS, NAS, SAN은 모두 대표적인 스토리지의 종류이며, 각 스토리지는 연결 방식에 차이가 있다. 이번 포스팅에서는 DAS, NAS, SAN의 개념과 차이점에 대해 알아보자.

# 0. 스토리지(Storage)란?

컴퓨터의 데이터를 저장하는 역할을 수행한다. 컴퓨터 내부의 하드디스크와 유사한 역할을 수행한다고 생각하면 된다.

# 1. DAS(Data Attached Storage)

- 서버와 스토리지가 **물리적으로 직접 연결**되는 방식.
- 네트워크상의 다른 서버는 저장된 데이터에 액세스 불가하다.
- 컴퓨터에 연결하는 외장 하드와 비슷한 개념이라고 생각하면 된다.
    
    ![2022-07-06-Storage-DAS-NAS-SAN1](/assets/images/2022-07-06-Storage-DAS-NAS-SAN/2022-07-06-Storage-DAS-NAS-SAN1.png)
    

- 서버와 스토리지가 FC(Fiber Channel) cable로 직접 연결된다.

- 장점
    - 속도가 빠르다(서버에 물리적으로 직접 연결하기 때문).
    - 확장이 쉽다(구축이 쉽다).
- 단점
    - 연결 수에 한계가 있다.

# 2. NAS(Network Attached Storage)

- DAS가 직접 연결된 것이라면 NAS는 LAN방식의 네트워크를 통해 연결된다.
- 여러 컴퓨터가 동일한 저장소 공간을 공유한다.
- LAN은 TCP/IP 프로토콜, 저장장치는 SCSI를 사용하기 때문에 중계 역할을 하는 파일서버가 필요하다.
- NFS 프로토콜 등을 통해 접속한다.
    
    ![2022-07-06-Storage-DAS-NAS-SAN1](/assets/images/2022-07-06-Storage-DAS-NAS-SAN/2022-07-06-Storage-DAS-NAS-SAN2.png)
    

- Server - LAN - Storage 구조

- 장점
    - 하드디스크를 중앙에서 관리할 수 있어서 오버헤드가 적게 걸린다.
    - 상대적으로 구축/유지보수가 용이하다.
    - 상대적으로 저렴하다.
    - DAS와 달리 Port수 제한이 없어 확장성, 유연성이 뛰어나다.
- 단점
    - 접속 증가 시 성능이 저하된다.
    - 전송 속도가 DAS보다 느리다.
    - 파일시스템을 공유하기 때문에 보안에 비교적 취약하다.
    - 백업이 어렵다.
    

# 3. SAN(Storage Network Area)

- 디스크 어레이(외장 스토리지) 컨트롤러 및 테이프 라이브러리와 같은 컴퓨터 스토리지 디바이스를 서버와 연결하기 위해 설계되었다.
- 컴퓨터 시스템과 스위치 사이에서 데이터를 전송한다.
- NAS와는 달리 파일이 아닌 블록 단위의 I/O(입출력: input & output)을 기본으로 한다.
- 이 때 스위치는 일반 네트워크 스위치 아닌 SAN 방식을 지원하는 FC(Fiber Channel) 스위치.
- FC 케이블이라는 전용 케이블을 사용해 서버와 스토리지, 그리고 FC 스위치를 연결해 통신한다.
- SAN 스위치의 종류
    - FC-SAN: 광 케이블로 통신하는 FCqㅏㅇ식. 광 케이블을 사용하므로 10km이내에서만 사용한다.
    - IP-SAN: Internet Protocol 방식을 채용해 IP통신이 가능한 범위라면 거리 제한이 없다.
    
    ![2022-07-06-Storage-DAS-NAS-SAN3](/assets/images/2022-07-06-Storage-DAS-NAS-SAN/2022-07-06-Storage-DAS-NAS-SAN3.png)
    

- Server - SAN - Storage 구조

- 장점
    - 서버 당 접속 스토리지 수 제한을 해결했다.
    - 전용 FC스위치(광 채널)을 두어 빠른 속도의 연결을 유지한다.
    
- 단점
    - 상대적으로 고가이다.
    - 상대적으로 구축이 까다롭다.

<br/><br/>
