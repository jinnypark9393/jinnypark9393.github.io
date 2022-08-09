---
emoji: 💫
title:  'NAS/CIFS/NFS 개념'
date: '2022-06-07 06:00:00'
author: jinnypark9393
tags: storge
categories: CS
---

# 1. 배경

현재 컨테이너 전환을 진행하고 있는 담당 시스템이 Microsoft Azure에서 운영되고있는데, 인프라팀에서 쿠버네티스 파드(Pod)와 연결된 NAS(쿠버네티스 리소스로 말하면 Persistent Volume과 Persistent Volume Claim) 정보를 변경해달라는 요청을 받았다.

NAS를 기존 CIFS타입에서 NFS 타입으로 변경하셨다고 하는데, 둘 다 처음 듣는 용어라 생소해서 정리해보았다. 

참고로 NAS 타입으로 스토리지를 바꾼 건 기존 Azure files(AWS의 EFS에 해당)에서 대/소문자 구분이 되지 않아 NetApp Files(NFS type)으로 변경한 것이라고 한다.

Azure files에서 디렉토리/파일명의 [대/소문자 구분이 되지 않아(case-insensitive)](https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-shares--directories--files--and-metadata) 윈도우 기반으로만 구동되는 것인 줄 알았는데 [NFS/SMB로 윈도우/리눅스 시스템에 모두 마운트](https://docs.microsoft.com/ko-kr/azure/storage/files/storage-files-how-to-mount-nfs-shares)할 수 있는 것을 보면 그렇지는 않은 듯(자세한 것은 다시 조사 할 것).

# 2. NAS/CIFS/NFS 개념

NAS, CIFS, NFS의 개념과 차이점, 장단점을 알아보자.

## 0. 파일 서버(File Server)이란?

NAS, CIFS, NFS 개념에 대해 알아보기 전 먼저 파일서버에 대해 간략히 알아보겠다.

- **파일서버(File server)**란, LAN, WAN과 같은 같은 네트워크에서 다른 컴퓨터와 파일을 공유하거나 데이터를 송수신하기 위해 사용하는 서버이다.

### 0-1. 파일 서버의 장점

- 여러 사람이 같은 파일을 다룰 때 발생하기 쉬운 갱신 무결성 문제를 막을 수 있다.
- 사내에서 파일 공유를 원활히 할 수 있다.
- 파일을 중앙집중화해 백업이 편리해진다.
- 파일을 한 곳에서 관리해 데이터 유출 가능성도 최소한으로 막을 수 있다.

### 0-2. 파일 서버의 기능

- 각 폴더에 대해 누가 어디까지 이용 가능한지 액세스 권한 설정
- 각 폴더 저장 용량(크기)를 설정
- 각 폴더에 대해 저장할 수 있는 파일 종류 제한

### 0-3. 파일 서버의 종류

- OS에 따라 **Windows** 파일서버, **Unix** 파일서버, **Linux** 파일서버가 있다.
- 파일서버 구축은 OS를 어떤 것을 사용하는지가 중요
    - 윈도우 - 윈도우 간 파일서버: CIFS 사용(윈도우 공유 기능 이용)
    - 리눅스 - 리눅스 간 파일서버: NFS 사용(리눅스 nfs-utils 이용)
    - 리눅스 - 윈도우 간 파일서버: SMB/CIFS 사용(Samba 이용)

## 1. NAS(Network Attached Storage)란?

- **Network Attached Storage**의 약어.
- 이름 그대로 네트워크에 연결된 스토리지 기기(컴퓨터에 직접 연결하는 HDD/SSD와 반대 개념).
- **접근 권한이 있는 네트워크 사용자**와 **여러 클라이언트**가 **중앙집중화된 위치의 데이터**를 읽고 쓸 수 있게 하는 스토리지(Storage).
- NAS를 사용하기 위해서는 컴퓨터/서버에 NAS를 마운트 해 파일을 읽고 쓸 수 있다(컴퓨터/서버에서는 IP를 기반으로 NAS를 찾는다)
- OS에 따라 달라지는 CIFS, NFS 등 기반의 파일 시스템의 한계를 극복해주고 데이터를 쉽게 공유하게 해준다.
- 단순 데이터 저장 뿐만 아니라 영상 스트리밍, 데이터 백업, 가상머신, 웹 호스팅 등 여러 가지 기능들이 늘어 나 서버 역할도 겸할 수 있다.

## 2. CIFS(Common Interest File System)란?

### 1. SMB(Server Message Block)란?

- **Server Message Block**의 약어
- 마이크로소프트(Microsoft)와 인텔(Intel)에서 개발
- 윈도우 시스템에서 다른 시스템의 디스크나 프린터와 같은 자원을 공유하기 위해 개발된 프로토콜
- TCP/IP 기반 하의 NetBIOS 프로토콜을 사용하며 NFS, NIS, LPD와 같은 유닉스 분산 인증 구조와 유사

### 2. CIFS(Common Interest File System)란?

- **Common Interest File System**의 약어
- SMB 파일공유 프로토콜의 확장된 버전
- **윈도우**, 유닉스 환경을 동시에 지원하는 인터넷 표준 파일 규약의 프로토콜
- 폐쇄적인 SMB 프로토콜과 달리 CIFS의 규약 정의는 여러 유닉스 업체의 참여 하에 결정
- 사용방법: 윈도우 탐색기 ⇒ 내 PC ⇒ 네트워크 드라이브 연결 ⇒ NAS 정보 입력(이름 형식: \\서버IP혹은Name\공유name)

### 2. Samba란?

- SMB/CIFS 네트워킹 프로토콜을 다시 구현한 소프트웨어(버전 2.2 이상부터 CIFS 규약을 준수)
- 오스트리아의 Andrew Tridgell이 최초 개발(GNU 라이선스)
- 삼바(Samba)의 이름은 SMB에서 따온 것

## 3. NFS(Network File System)란?

- **Network File System**의 약어.
- 1985년 Sun Microsystems사에서 개발된 네트워크를 통한 분산 파일 시스템 프로토콜
- 유닉스/**리눅스**의 로컬 파일 시스템을 공유하는 방식
- 다른 호스트(host)에 있는 파일 시스템 일부를 자신의 디렉토리인 것 처럼 마운트(mount)하여 사용할 수 있다.
- 사용 방법: `mount -t 서버(IP)주소:/디렉토리경로 마운트포인트` 명령어를 사용하여 마운트하며, `df` 명령어로 마운트 된 것을 확인할 수 있다.

<br/><br/>