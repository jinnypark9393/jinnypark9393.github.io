---
emoji: 💫
title:  '리눅스(Linux) Managing File Permissions'
date: '2022-09-26 06:18:00'
author: jinnypark9393
tags: linux
categories: 데브옵스
---

# Managing File Permissions

- Authentication vs. Authorization
    - [https://learn.microsoft.com/ko-kr/azure/active-directory/develop/authentication-vs-authorization](https://learn.microsoft.com/ko-kr/azure/active-directory/develop/authentication-vs-authorization)

## 1. Permission 정보 보기

- permission, 허락, 권한을 뜻하는 말(나무위키)
- 리눅스 시스템에서는 파일이나 디렉토리에 사용자들이 접근할 수 있는 권한을 할당해서 운영
    - 파일 소유자, 그룹 멤버들, 그 외 사용자들
    - read, write, execute
        
        
        |  | file | directory |
        | --- | --- | --- |
        | read(r) | 파일의 내용을 읽기(cat, more, less…) | 디렉토리 내용을 읽기(ls) |
        | write(w) | 파일의 내용을 변경 | 디렉토리 내용을 변경 |
        | execute(x) | 파일을 프로그램으로 실행 | 디렉토리 안에 저장된 파일의 세부 속성 확인
        현재 작업 디렉토리로 설정 가능 |
    - 파일의 permission 보기
        
        ```bash
        root@ubuntu:~# ls -al
        total 28
        drwx------  5 root root 4096 Sep 20 23:58 .
        drwxr-xr-x 20 root root 4096 Sep 16 16:52 ..
        -rw-r--r--  1 root root 3106 Dec  5  2019 .bashrc
        drwx------  2 root root 4096 Feb 23  2022 .cache
        -rw-r--r--  1 root root  161 Dec  5  2019 .profile
        drwx------  2 root root 4096 Sep 20 23:58 .ssh
        drwx------  3 root root 4096 Sep 15 17:27 snap
        ```
        
        - d로 시작 → 디렉토리 / 그 외 문자로 시작 → 파일 (이 중 -로 시작하면 일반 파일)
        - 다음 9문자: (소유자 권한 3문자) (소유 그룹 권한 3문자) (그 외 사용자 권한 3문자)

## 2. Permission 변경 명령어: chmod [Mode] filename

- 파일이나 디렉토리의 퍼미션을 설정할 때 사용하는 명령어
- symbolic representation
    
    ```bash
    chmod [mode: 누가 무엇을] [file/directory]
    chmod u+w file.txt
    ```
    
    - symbolic mode를 사용하면 누구에게 어떤 퍼미션을 부여할 지 알기 쉬움.
    - +: 할당 / -: 제거 / =: 기존 설정 무시하고 새로 덮어쓰기

- numerical representation
    - 8진수 모드
    - 표현 값
        
        
        | 의미 | 숫자 |
        | --- | --- |
        | 읽기(r) | 4 |
        | 쓰기(w) | 2 |
        | 실행(x) | 1 |
    - example
        
        ```bash
        chmod 640 file.txt == chmod rw-r----- file.txt
        chmod 775 file.txt == chmod rwxrwxr-x file.txt
        ```

<br/>