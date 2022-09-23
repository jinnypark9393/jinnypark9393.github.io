---
emoji: 💫
title:  '리눅스(Linux) Archiving and Compression'
date: '2022-09-23 22:55:00'
author: jinnypark9393
tags: linux
categories: 데브옵스
---

# 05. Archiving and Compression

- archive: 파일을 **보관**. 원본의 속성을 그대로 보존 및 여러개 파일/디렉토리 묶어 보존
- compression: 파일을 **압축**. 큰 사이즈의 파일을 작은 사이즈로 압축해 보존
    - gzip, bzips, xz → 파일 단위로만 압축됨
- 파일을 전달 할 때: archive(파일을 하나로 묶어줌) → compress (압축) → 전달 & 보존이 용이

## 1. Archives with tar

- 명령어: tar, cpio 등
- 파일 보관
    - 백업
    - 여러 파일을 하나로 묶어 보존 / 전달

- tar
    - 여러 파일 혹은 디렉터리를 하나의 아카이브 파일로 모으거나 복원하기 위해 사용하는 명령어
    - 원본의 속성을 유지한 상태로 여러 파일을 묶거나 묶은 파일을 원본으로 되돌림
        
        <aside>
        💡 **Usage: tar [OPTION…] [FILE]…**
        
        GNU 'tar' saves many files together into a single tape or disk archive, and can
        
        restore individual files from the archive.
        
        **[Examples]**
        
        tar -cf archive.tar foo bar  # Create archive.tar from files foo and bar.
        
        tar -tvf archive.tar         # List all files in archive.tar verbosely.
        
        tar -xf archive.tar          # Extract all files from archive.tar.
        
        **[Options]**
        
        -c, --create create a new archive **## 신규 아카이브 생성 / 덮어쓰기**
        -v, --verbose verbosely list files processed **## 처리 과정(파일 정보) 자세히 나열**
        -f, --file=ARCHIVE use archive file or device ARCHIVE  **## 아카이브 파일 이름 지정**
        -t, --list list the contents of an archive **## 아카이브 파일에 포함된 내용 출력**
        -x, --extract, --get extract files from an archive **## 아카이브 파일 해제**
        
        -z, --gzip, --gunzip, --ungzip filter the archive through gzip **## gzip 압축 적용**
        -j, --bzip2 filter the archive through bzip2 **## bzip2 압축 적용**
        -J, --xz filter the archive through xz **## xz 압축 적용**
        
        </aside>
        
    - help 명령어로 사용법을 확인할 수 있다.
        
        ```bash
        tar --help
        ```
        
    - 예제: datadir 디렉토리를 datadir.tar 파일로 archive
        - 실습 준비
        
        ```bash
        ttabae@ubuntu:~$ mkdir lfcs-exam # 디렉토리 생성
        ttabae@ubuntu:~$ cd lfcs-exam/ # 디렉토리 이동
        ttabae@ubuntu:~/lfcs-exam$ cp /etc/h* . # etc 디렉토리 내 h로 시작하는 파일을 현재 디렉토리(.)로 복사
        cp: -r not specified; omitting directory '/etc/hp'
        ttabae@ubuntu:~/lfcs-exam$ cp /usr/bin/a* . # /user/bin 디렉토리 내 a로 시작하는 파일 현재 디렉토리(.)로 복사
        ttabae@ubuntu:~/lfcs-exam$ mkdir datadir # datadir 디렉토리 생성
        ttabae@ubuntu:~/lfcs-exam$ mv * datadir/ # 현재 디렉토리 파일 전체를 datadir로 이동
        mv: cannot move 'datadir' to a subdirectory of itself, 'datadir/datadir'
        ttabae@ubuntu:~/lfcs-exam$ ls # 현재 경로의 파일 확인
        datadir
        ttabae@ubuntu:~/lfcs-exam$ ls datadir/ # datadir에 파일이 잘 들어갔는지 확인
        ```
        
        → 참고: `history` 명령어로 사용했던 명령어 확인 가능
        
        - datadir 백업(datadir 디렉토리를 datadir.tar 파일로 아카이브)
        
        ```bash
        ttabae@ubuntu:~/lfcs-exam$ tar -cvf datadir.tar ./datadir
        ./datadir/
        ./datadir/apt-sortpkgs
        ./datadir/aseqnet
        ./datadir/avahi-resolve-address
        ./datadir/hosts.allow
        ./datadir/avahi-publish-address
        ./datadir/aspell
        ./datadir/aplay
        ./datadir/apt-add-repository
        ./datadir/amidi
        ./datadir/apropos
        ./datadir/apport-collect
        ./datadir/avahi-publish-service
        ./datadir/aa-enabled
        ./datadir/arm2hpdl
        ./datadir/aspell-import
        ./datadir/apt
        ./datadir/aa-exec
        ./datadir/addpart
        ./datadir/add-apt-repository
        ./datadir/avahi-publish
        ./datadir/hdparm.conf
        ./datadir/arch
        ./datadir/apt-ftparchive
        ./datadir/apt-mark
        ./datadir/avahi-browse-domains
        ./datadir/axfer
        ./datadir/host.conf
        ./datadir/hostname
        ./datadir/apturl-gtk
        ./datadir/apturl
        ./datadir/hosts.deny
        ./datadir/apport-cli
        ./datadir/aconnect
        ./datadir/alsaucm
        ./datadir/avahi-resolve-host-name
        ./datadir/alsatplg
        ./datadir/avahi-set-host-name
        ./datadir/alsabat
        ./datadir/arecordmidi
        ./datadir/aptdcon
        ./datadir/alsamixer
        ./datadir/amixer
        ./datadir/hostid
        ./datadir/apt-cache
        ./datadir/aseqdump
        ./datadir/alsaloop
        ./datadir/appres
        ./datadir/avahi-resolve
        ./datadir/apt-get
        ./datadir/avahi-browse
        ./datadir/apg
        ./datadir/aplaymidi
        ./datadir/apport-unpack
        ./datadir/apt-config
        ./datadir/hosts
        ./datadir/arecord
        ./datadir/apt-cdrom
        ./datadir/apt-extracttemplates
        ./datadir/apt-key
        ./datadir/appstreamcli
        ./datadir/atobm
        ./datadir/amuFormat.sh
        ./datadir/apgbfm
        ./datadir/acpi_listen
        ./datadir/apport-bug
        ./datadir/awk
        ```
        
        - datadir 디렉토리의 파일들을 tar로 아카이브(-c), 아카이브 파일 명 지정(-f), 아카이브 과정 상세 확인(-v).
        
        - ls -l 명령어로 tar 파일 생성되었는지 확인
            
            ```bash
            ttabae@ubuntu:~/lfcs-exam$ ls -l
            total 2364
            drwxrwxr-x 2 ttabae ttabae    4096 Sep 16 01:48 datadir
            -rw-rw-r-- 1 ttabae ttabae 2416640 Sep 16 01:51 datadir.tar
            ```
            
            - `-h` 옵션을 추가하면 사람이 읽기 편한 단위로 용량을 출력해준다.
        
        - 데이터 복원 사전작업
            
            ```bash
            ttabae@ubuntu:~/lfcs-exam$ rm -rf datadir # datadir 디렉토리 삭제
            ttabae@ubuntu:~/lfcs-exam$ ls # 현재 디렉토리의 파일 확인
            datadir.tar # datadir 디렉토리가 삭제되고 아카이브 파일만 남은
            ```
            
        
        - 아카이브 파일 컨텐츠 확인
            
            ```bash
            ttabae@ubuntu:~/lfcs-exam$ tar -tvf datadir.tar 
            drwxrwxr-x ttabae/ttabae     0 2022-09-16 01:48 ./datadir/
            -rwxr-xr-x ttabae/ttabae 47504 2022-09-16 01:45 ./datadir/apt-sortpkgs
            -rwxr-xr-x ttabae/ttabae 27064 2022-09-16 01:45 ./datadir/aseqnet
            -rwxr-xr-x ttabae/ttabae 22768 2022-09-16 01:45 ./datadir/avahi-resolve-address
            -rw-r--r-- ttabae/ttabae   411 2022-09-16 01:45 ./datadir/hosts.allow
            ...(생략)...
            ```
            
            → 속성정보 그대로 보존되어있다.
            
        
        - datadir 디렉토리 복원 → **restore**
            
            ```bash
            ttabae@ubuntu:~/lfcs-exam$ date # 현재 시각 확인
            Fri Sep 16 01:56:56 PDT 2022
            ttabae@ubuntu:~/lfcs-exam$ tar xf datadir.tar # 디렉토리 복원
            ttabae@ubuntu:~/lfcs-exam$ ls -l datadir # 복원된 디렉토리 확인
            total 2432
            -rwxr-xr-x 1 ttabae ttabae  31248 Sep 16 01:45 aa-enabled
            -rwxr-xr-x 1 ttabae ttabae  35344 Sep 16 01:45 aa-exec
            -rwxr-xr-x 1 ttabae ttabae  22912 Sep 16 01:45 aconnect
            -rwxr-xr-x 1 ttabae ttabae  19016 Sep 16 01:45 acpi_listen
            -rwxr-xr-x 1 ttabae ttabae   7415 Sep 16 01:45 add-apt-repository
            -rwxr-xr-x 1 ttabae ttabae  30952 Sep 16 01:45 addpart
            ```
            
            → 복원 전 시간 속성이 변경되지 않고 그대로 복원됨을 확인할 수 있다.
            

## 2. Compression Utility

- Compression
    - 압축
    - 리눅스 압축 유틸리티: gzip(표준), bzip2(압축율이 좋음), xz, zip
- gzip, bzip2, xz 요약
    - file 단위로만 압축 가능
    - 압축 하면 원본 파일은 삭제 & 압축 파일만 남겨짐
    - 예제: datadir.tar 파일로 압축해보기
        - gzip 예시
            
            ```bash
            ttabae@ubuntu:~/lfcs-exam$ gzip datadir.tar 
            ttabae@ubuntu:~/lfcs-exam$ ls -l
            total 832
            drwxrwxr-x 2 ttabae ttabae   4096 Sep 16 01:48 datadir
            -rw-rw-r-- 1 ttabae ttabae 843872 Sep 16 01:51 datadir.tar.gz
            ```
            
            → 원본파일이 없어지고 `datadir.tar.gz` 파일만 남겨짐
            
        - bzip2 예시
            
            ```bash
            ttabae@ubuntu:~/lfcs-exam$ bzip2 hosts
            ttabae@ubuntu:~/lfcs-exam$ ll
            total 848
            drwxrwxr-x  3 ttabae ttabae   4096 Sep 16 07:52 ./
            drwxr-xr-x 15 ttabae ttabae   4096 Sep 16 01:44 ../
            drwxrwxr-x  2 ttabae ttabae   4096 Sep 16 01:48 datadir/
            -rw-rw-r--  1 ttabae ttabae 843872 Sep 16 01:51 datadir.tar.gz
            -rw-r--r--  1 ttabae ttabae    183 Sep 16 07:51 hosts.bz2
            -rw-r--r--  1 ttabae ttabae   2853 Sep 16 07:51 passwd
            ttabae@ubuntu:~/lfcs-exam$ cat hosts.bz2 
            545'???h?Jj4???!??"?6?͍???7?ߗp!9??	?䱠?J????B??Xm?r??_??G?O???Ux??t?9?'k?	?Y?Z@?7???P??'^?iz??{?uR?`??J?hQ???&jp?ɷ8?rE8P????
            ```
            
        - xz 예시
            
            ```bash
            ttabae@ubuntu:~/lfcs-exam$ xz passwd
            xz: passwd: No such file or directory
            ttabae@ubuntu:~/lfcs-exam$ ll
            total 848
            drwxrwxr-x  3 ttabae ttabae   4096 Sep 16 07:52 ./
            drwxr-xr-x 15 ttabae ttabae   4096 Sep 16 01:44 ../
            drwxrwxr-x  2 ttabae ttabae   4096 Sep 16 01:48 datadir/
            -rw-rw-r--  1 ttabae ttabae 843872 Sep 16 01:51 datadir.tar.gz
            -rw-r--r--  1 ttabae ttabae    183 Sep 16 07:51 hosts.bz2
            -rw-r--r--  1 ttabae ttabae   1080 Sep 16 07:51 passwd.xz
            ```
            
    
    |  | 압축 | 압축 파일 이름 | ASCII text 압축 파일 내용 보기 | 압축 해제 |
    | --- | --- | --- | --- | --- |
    | gzip | gzip filename | filename.gz | zcat filename.gz | gunzip filename.gz
    gzip -d filename.gz |
    | bzip2 | bzip2 filename | filename.bz2 | bzcat filename.bz2 | bunzip2 filename.bz2
    bzip2 -d filename.bz2 |
    | xz | xz filename | filename.xz | xzcat filename.xz | unxz filename.xz
    xz -d filename.xz |
- zip
    - 원본을 보존하면서 압축 파일 생성
    - 디렉토리 압축 가능
    - zip [-d] filename.zip dir/dir, unzip filename.zip
    - example
        
        ```bash
        ttabae@ubuntu:~/lfcs-exam$ zip passwd.zip passwd 
          adding: passwd (deflated 64%)
        ttabae@ubuntu:~/lfcs-exam$ zip -r datadir.zip datadir
          adding: datadir/ (stored 0%)
        ...(생략)
        ```
        
- tar + (gzip, bzip2, xz)를 사용하여 /home 디렉터리 백업
    - 사전 작업
        
        ```bash
        ttabae@ubuntu:~/lfcs-exam$ rm passwd
        ttabae@ubuntu:~/lfcs-exam$ rm -rf datadir
        ttabae@ubuntu:~/lfcs-exam$ ll
        total 3236
        drwxrwxr-x  2 ttabae ttabae    4096 Sep 16 08:05 ./
        drwxr-xr-x 15 ttabae ttabae    4096 Sep 16 01:44 ../
        -rw-rw-r--  1 ttabae ttabae 2416640 Sep 16 01:51 datadir.tar
        -rw-rw-r--  1 ttabae ttabae  879523 Sep 16 08:04 datadir.zip
        -rw-r--r--  1 ttabae ttabae     221 Sep 16 07:51 hosts
        -rw-rw-r--  1 ttabae ttabae    1179 Sep 16 08:03 passwd.zip
        ```
        
    - 복원
        
        ```bash
        ttabae@ubuntu:~/lfcs-exam$ unzip datadir.zip 
        Archive:  datadir.zip
           creating: datadir/
        ...(생략)...
        ```
        

## 3. tar + compress utility

- tar + (gzip, bzip2, xz)를 사용해 /home 디렉토리 백업하기
- tar + gzip: -z
    
    ```bash
    ttabae@ubuntu:~/lfcs-exam$ sudo tar -czvf /home.tar.gz /home
    ...(생략)...
    ttabae@ubuntu:~/lfcs-exam$ ls -l /home.tar.gz 
    -rw-r--r-- 1 root root 3480414 Sep 16 08:07 /home.tar.gz
    ttabae@ubuntu:~/lfcs-exam$ file /home.tar.gz
    /home.tar.gz: gzip compressed data, from Unix, original size modulo 2^32 14469120
    ttabae@ubuntu:~/lfcs-exam$ tar -tvf /home.tar.gz 
    drwxr-xr-x root/root         0 2022-09-15 06:47 home/
    drwxr-xr-x ttabae/ttabae     0 2022-09-16 01:44 home/ttabae/
    ```
    
- tar + bz2: -j
    
    ```bash
    ttabae@ubuntu:~$ sudo tar -cjvf /home.tar.bz2 /home
    [sudo] password for ttabae: 
    tar: Removing leading `/' from member names
    /home/
    ...(생략)...
    ttabae@ubuntu:~$ ls -l /home*
    -rw-r--r-- 1 root root 3035907 Sep 16 16:50 /home.tar.bz2
    -rw-r--r-- 1 root root 3480414 Sep 16 08:07 /home.tar.gz
    
    /home:
    total 4
    drwxr-xr-x 15 ttabae ttabae 4096 Sep 16 01:44 ttabae
    ttabae@ubuntu:~$ tar -jtvf /home.tar.bz2
    drwxr-xr-x root/root         0 2022-09-15 06:47 home/
    drwxr-xr-x ttabae/ttabae     0 2022-09-16 01:44 home/ttabae/
    ...(생략)...
    ```
    
- tar + xz: -J
    
    ```bash
    ttabae@ubuntu:~$ sudo tar -cJvf /home.tar.xz /home
    tar: Removing leading `/' from member names
    /home/
    /home/ttabae/
    /home/ttabae/.local/
    /home/ttabae/.local/share/
    ...(생략)...
    ttabae@ubuntu:~$ ls -l /home*
    -rw-r--r-- 1 root root 3035907 Sep 16 16:50 /home.tar.bz2
    -rw-r--r-- 1 root root 3480414 Sep 16 08:07 /home.tar.gz
    -rw-r--r-- 1 root root 1756644 Sep 16 16:52 /home.tar.xz
    
    /home:
    total 4
    drwxr-xr-x 15 ttabae ttabae 4096 Sep 16 01:44 ttabae
    ttabae@ubuntu:~$ tar -Jtvf /home.tar.xz
    drwxr-xr-x root/root         0 2022-09-15 06:47 home/
    drwxr-xr-x ttabae/ttabae     0 2022-09-16 01:44 home/ttabae/
    drwxr-xr-x ttabae/ttabae     0 2022-09-15 17:38 home/ttabae/.local/
    ...(생략)...
    ```
    
- 백업한 /home 디렉터리 복원하기
    - gzip
    
    ```bash
    ttabae@ubuntu:~$ cd /
    ttabae@ubuntu:/$ sudo rm -rf /home
    ttabae@ubuntu:~$ sudo tar -zxf /home.tar.gz 
    ttabae@ubuntu:~$ ls
    Desktop    Downloads  Pictures  Templates  home
    Documents  Music      Public    Videos     lfcs-exam
    ```
    
    - tar + bz2
        
        ```bash
        cd /
        sudo rm -rf /home
        sudo tar -xjvf /home.tar.bz2
        ```
        
    
    - xz
        
        ```bash
        cd /
        sudo rm -rf /home
        sudo tar -xJvf /home.tar.xz
        ```
        

    ## LFCS 시험 대비 문제 풀이
    
    - **Which of the following commands displays the contents of a gzip compressed tar archive?**
        1. gzip archive.tgz | tar xvf
        2. tar ztf archive.tgz
        3. gzip -d archive.tgz | tar tvf
        4. tar cf archive.tgz

<br/>