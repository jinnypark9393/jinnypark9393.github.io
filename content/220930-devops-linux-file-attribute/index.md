---
emoji: 💫
title:  '리눅스(Linux) File Attribute'
date: '2022-09-30 06:31:00'
author: jinnypark9393
tags: linux
categories: 데브옵스
---

# File Attribute

## 1. File attributes

- **lsattr**
    - 리눅스 파일시스템의 파일 속성을 보는 명령어
    - chattr 명령어의 결과를 확인할 수 있음.
        
        ```bash
        ttabae@ubuntu:~/lfcs-exam$ lsattr file1
        --------------e----- file1
        ```
        
- **chattr** (Change attribute)
    - 파일을 보호하는 명령어
    - 파일 시스템의 파일 속성을 변경하여 파일 손상을 방지함.
    
    ```bash
    ttabae@ubuntu:~/lfcs-exam$ chattr --help
    Usage: chattr [-pRVf] [-+=aAcCdDeijPsStTuF] [-v version] files...
    ```
    
- 속성 설정
    
    
    | + | 속성 추가하기 |
    | --- | --- |
    | - | 속성 제거하기 |
    | = | 원래 파일이 가지고 있는 속성 유지하기 |
- 속성 의미
    
    
    | A(no atime updates) | Access가 발생하더라도 파일 시스템의 파일 정보에 저장되는 atime이 갱신되지 않음 |
    | --- | --- |
    | a(append only) | 해당 파일을 추가만 할 수 있음(파일 보안을 위해 주로 사용하는 속성) |
    | C(no copy on write) | 기록 중 복사 업데이트가 적용되지 않음. |
    | c(compressed) | 디스크에 자동적으로 압축된 상태로 저장됨 |
    | D(synchronous directory updates) | 디렉터리의 변경사항을 동기화 시킴. |
    | d(no dump) | dump 명령어로 백업되지 않음. |
    | e(extent format) | 파일이 디스크 블록에 매핑될 때 extent를 사용함 (리눅스 기본 속성 정보) |
    | i(immutable) | 파일을 수정할 수 없음(superuser만 가능) |
    | j(data journaling) | 파일에 데이터를 쓰기 전에 ext3 journal에 먼저 씀 |
    | S(synchronous updates) | 파일이 변경되면 디스크에 동기식으로 저장됨. |
    | s(secure deletion) | 파일이 삭제될 경우 해당 블럭이 0이 되고 디스크에 다시 쓰기가 됨. 삭제파일 복구 불가능. |
    | T(top of directory hierarchy) | 해당 디렉터리를 최상위 디렉터리로 인식함. |
    | t(On-time merging) | 파일에 partial block fragmentation(tail-merging)이 발생하지 않음. |
    - atime이란?
        
        ```bash
        ttabae@ubuntu:~/lfcs-exam$ stat file1
          File: file1
          Size: 0         	Blocks: 0          IO Block: 4096   regular empty file
        Device: 805h/2053d	Inode: 786908      Links: 1
        Access: (0664/-rw-rw-r--)  Uid: ( 1000/  ttabae)   Gid: ( 1000/  ttabae)
        Access: 2022-09-22 07:42:34.075365325 -0700
        Modify: 2022-09-22 07:42:34.075365325 -0700
        Change: 2022-09-22 07:42:34.075365325 -0700
         Birth: -
        ```
        
        - Access: 마지막으로 접속한 시간(cat 명령어 등) → atime
            - a 옵션으로 오버헤드 줄일 수 있다.
        - Modify: 마지막 수정 시간
        - Change: 마지막 속성 변경 시간

- example
    - a 속성
        - 해당 파일을 추가(append only)만 할 수 있다.
            
            ```bash
            ttabae@ubuntu:~/lfcs-exam$ cat hosts
            127.0.0.1	localhost
            127.0.1.1	ubuntu
            
            # The following lines are desirable for IPv6 capable hosts
            ::1     ip6-localhost ip6-loopback
            fe00::0 ip6-localnet
            ff00::0 ip6-mcastprefix
            ff02::1 ip6-allnodes
            ff02::2 ip6-allrouters
            
            ttabae@ubuntu:~/lfcs-exam$ lsattr hosts 
            --------------e----- hosts
            
            ttabae@ubuntu:~/lfcs-exam$ sudo chattr +a hosts 
            [sudo] password for ttabae: 
            ttabae@ubuntu:~/lfcs-exam$ lsattr hosts 
            -----a--------e----- hosts
            
            ttabae@ubuntu:~/lfcs-exam$ echo "hello linux" >> hosts 
            ttabae@ubuntu:~/lfcs-exam$ cat hosts
            127.0.0.1	localhost
            127.0.1.1	ubuntu
            
            # The following lines are desirable for IPv6 capable hosts
            ::1     ip6-localhost ip6-loopback
            fe00::0 ip6-localnet
            ff00::0 ip6-mcastprefix
            ff02::1 ip6-allnodes
            ff02::2 ip6-allrouters
            hello linux
            
            # 하지만 vi모드에서는 수정이 불가능하다.
            
            # a 속성을 지우면 다시 편집이 가능하다.
            ttabae@ubuntu:~/lfcs-exam$ sudo chattr -a hosts 
            ttabae@ubuntu:~/lfcs-exam$ vi hosts
            ```
            
    
    - A 속성
        - Access가 발생하더라도 파일 시스템의 파일 정보에 저장되는 atime이 갱신되지 않음.
        - SSD의 수명 연장이나 Laptop의 배터리 절약
        
        ```bash
        ttabae@ubuntu:~/lfcs-exam$ stat hosts 
          File: hosts
          Size: 233       	Blocks: 8          IO Block: 4096   regular file
        Device: 805h/2053d	Inode: 786942      Links: 1
        Access: (0644/-rw-r--r--)  Uid: ( 1000/  ttabae)   Gid: ( 1000/  ttabae)
        Access: 2022-09-24 02:27:21.160559895 -0700
        Modify: 2022-09-24 02:25:53.498717876 -0700
        Change: 2022-09-24 02:27:08.724940252 -0700
         Birth: -
        ttabae@ubuntu:~/lfcs-exam$ sudo chattr +A hosts
        ttabae@ubuntu:~/lfcs-exam$ lsattr hosts 
        -------A------e----- hosts
        ttabae@ubuntu:~/lfcs-exam$ cat hosts 
        127.0.0.1	localhost
        127.0.1.1	ubuntu
        
        # The following lines are desirable for IPv6 capable hosts
        ::1     ip6-localhost ip6-loopback
        fe00::0 ip6-localnet
        ff00::0 ip6-mcastprefix
        ff02::1 ip6-allnodes
        ff02::2 ip6-allrouters
        hello linux
        -------A------e----- hosts
        ttabae@ubuntu:~/lfcs-exam$ stat hosts 
          File: hosts
          Size: 233       	Blocks: 8          IO Block: 4096   regular file
        Device: 805h/2053d	Inode: 786942      Links: 1
        Access: (0644/-rw-r--r--)  Uid: ( 1000/  ttabae)   Gid: ( 1000/  ttabae)
        Access: 2022-09-24 02:27:21.160559895 -0700
        Modify: 2022-09-24 02:25:53.498717876 -0700
        Change: 2022-09-24 02:29:59.416735731 -0700
         Birth: -
        ttabae@ubuntu:~/lfcs-exam$ sudo chattr -A hosts 
        ttabae@ubuntu:~/lfcs-exam$ lsattr hosts 
        --------------e----- hosts
        ```
        
    
    - i 속성
        - 파일을 수정할 수 없음. (superuser만 수정 가능)
        - 중요한 configuration 파일을 보호하기 위해 만든 것
        
        ```bash
        ttabae@ubuntu:~/lfcs-exam$ echo "=====" > hosts
        ttabae@ubuntu:~/lfcs-exam$ cat hosts 
        =====
        
        ttabae@ubuntu:~/lfcs-exam$ sudo chattr +i hosts 
        ttabae@ubuntu:~/lfcs-exam$ lsattr hosts 
        ----i---------e----- hosts
        
        ttabae@ubuntu:~/lfcs-exam$ echo "=====" >> hosts
        -bash: hosts: Operation not permitted
        ttabae@ubuntu:~/lfcs-exam$ sudo echo "=====" >> hosts
        -bash: hosts: Operation not permitted
        ttabae@ubuntu:~/lfcs-exam$ mv hosts myhosts
        mv: cannot move 'hosts' to 'myhosts': Operation not permitted
        ttabae@ubuntu:~/lfcs-exam$ sudo rm hosts 
        rm: cannot remove 'hosts': Operation not permitted
        
        ttabae@ubuntu:~/lfcs-exam$ sudo chattr -i hosts 
        ttabae@ubuntu:~/lfcs-exam$ lsattr hosts 
        --------------e----- hosts
        ttabae@ubuntu:~/lfcs-exam$ sudo echo "***" > hosts 
        ttabae@ubuntu:~/lfcs-exam$ cat hosts 
        ***
        ```

<br/>