---
emoji: 💫
title:  '리눅스(Linux) Password Administration'
date: '2022-09-25 08:45:00'
author: jinnypark9393
tags: linux
categories: 데브옵스
---

# Password Administration

## 1. Password 관련 설정파일

### 1-1. Password 관련 설정 파일

- **/etc/passwd: 계정정보 파일**
    - login name
    - optional encrypted password
        - x 라는 문자를 가질 경우 실제 encrypted password는 **/etc/shadow**에 저장
    
    ```bash
    root@ubuntu:~# useradd -m -s /bin/bash smlee
    ```
    
    → 이 경우 /etc/passwd에 계정정보가 생성된다.
    
    man 명령어로 매뉴얼을 확인해보자.
    
    ```bash
    $ man 5 passwd
    PASSWD(5)                File Formats and Conversions                PASSWD(5)
    
    NAME
           passwd - the password file
    
    DESCRIPTION
           /etc/passwd contains one line for each user account, with seven fields
           delimited by colons (“:”). These fields are:
    
           •   login name
    
           •   optional encrypted password
    
           •   numerical user ID
    
           •   numerical group ID
    
           •   user name or comment field
    
           •   user home directory
    
           •   optional user command interpreter
    
    FILES
           /etc/passwd
               User account information.
    
           /etc/shadow
               optional encrypted password file
    
           /etc/passwd-
               Backup file for /etc/passwd.
    
               Note that this file is used by the tools of the shadow toolsuite,
               but not by all user and password management tools.
    ```
    

- **/etc/shadow**
    - login name
    - encrypted password: 암호화된 패스워드
        - man으로 파일 설명 확인
        
        ```bash
        root@ubuntu:~# man 5 shadow
        NAME
               shadow - shadowed password file
        ```
        
        - 예시
        
        ```bash
        root@ubuntu:~# cat /etc/shadow
        root:$6$jEZjezlaSvOfNIUI$vxW/3sm5U1uRzf4CPIWztVxcJ/BosEhYb6QAa.coOZPS/Va.aUgsD2zF4cSIXhdcZCd4SbP54BZqmFfXoG.2W0:19251:0:99999:7:::
        ```
        
        - * 혹은 !가 들어있는 경우 로그인 금지(system account(*), password lock(!))
        - 로그인 할 수 없는 계정의 비밀번호에 * / ! 가 쓰인 이유
            - 암호화 알고리즘에서 절대 쓸 수 없는 문자이기 때문
    - date of last password change: 비밀번호 바꾼 날짜
        - 패스워드 수정일(1970.1.1을 기준으로 카운트한 날짜)
    - minimum password age: 0이 기본값. 수정된 패스워드를 최소한으로 사용해야하는 날 수.
    - maximum password age: 99999이 기본값. 수정된 패스워드를 최대 사용해야할 수 있는 날 수.
    - password warning period
        - 만료일로부터 몇일 전부터 패스워드 변경 경고를 보낼지 설정
    - password inactivity period
        - 패스워드 만료일로부터 몇 일 후부터 패스워드를 비활성화 할 지 설정(max day + inactive period)
    - account expiration date
        - account 만료일
    - reserved field
        - 추후 사용을 위해 예약된 필드

## 2. Password 관리 명령어

### 2-1. Password 생성: passwd

- **passwd**
    - 특정 계정 사용자에게 로그인 패스워드를 할당하거나 패스워드 정책을 수정

```bash
Usage: passwd [options] [LOGIN]

Options:
  -a, --all                     report password status on all accounts
  -d, --delete                  delete the password for the named account
  -e, --expire                  force expire the password for the named account
  -h, --help                    display this help message and exit
  -k, --keep-tokens             change password only if expired
  -i, --inactive INACTIVE       set password inactive after expiration
                                to INACTIVE
  -l, --lock                    lock the password of the named account
  **-n, --mindays MIN_DAYS        set minimum number of days before password
                                change to MIN_DAYS**
  -q, --quiet                   quiet mode
  -r, --repository REPOSITORY   change password in REPOSITORY repository
  -R, --root CHROOT_DIR         directory to chroot into
  -S, --status                  report password status on the named account
  -u, --unlock                  unlock the password of the named account
  **-w, --warndays WARN_DAYS      set expiration warning days to WARN_DAYS
  -x, --maxdays MAX_DAYS        set maximum number of days before password**
                                change to MAX_DAYS

## 예시 ##
root@ubuntu:~# passwd -x 30 -w 5 -n 1 smlee
passwd: password expiry information changed.
root@ubuntu:~# cat /etc/shadow
smlee:!:19252:1:30:5:::

## 예시 2 ##
root@ubuntu:~# usermod -e 2022-05-31 -s /bin/bash lee
root@ubuntu:~# grep lee /etc/passwd
seongmi:x:1001:1001:seong mi lee:/home/seongmi:/bin/sh
smlee:x:2000:2000::/home/smlee:/bin/bash
lee:x:2001:2001::/home/lee:/bin/bash
root@ubuntu:~# passwd lee
New password: 
Retype new password: 
passwd: password updated successfully
root@ubuntu:~# grep lee /etc/shadow
smlee:!:19252:1:30:5:::
lee:$6$pcn9rD2i39GR5B79$5iYz06Et6T20VmcIskvi7dg5KxgE8bi8zM682NHWN2Nd/89gWWM5HNhrMplopSpwCTLGWxL3dDeynAw9llwtq1:19256:0:99999:7::19143:
```

- **/etc/login.defs**
    - 계정 생성, 패스워드를 할당할 때 default로 적용되는 값, 환경 구성
    
    ```bash
    root@ubuntu:~# cat /etc/login.defs
    # Password aging controls: 
    PASS_MAX_DAYS	99999
    PASS_MIN_DAYS	0
    PASS_WARN_AGE	7
    
    # Min/max values for automatic uid selection in useradd
    UID_MIN			 1000
    UID_MAX			60000
    
    # Min/max values for automatic gid selection in groupadd
    GID_MIN			 1000
    GID_MAX			60000
    
    USERGROUPS_ENAB yes
    
    ENCRYPT_METHOD SHA512
    ```
    

### 2-2. Password 변경: passwd

- passwd
    - 특정 계정 사용자에게 로그인 패스워드를 할당하거나 패스워드 정책을 수정
    
    ```bash
    Usage: passwd [options] [LOGIN]
    
    Options:
      -a, --all                     report password status on all accounts
      -d, --delete                  delete the password for the named account
      **-e, --expire                  force expire the password for the named account**
      -h, --help                    display this help message and exit
      -k, --keep-tokens             change password only if expired
      -i, --inactive INACTIVE       set password inactive after expiration
                                    to INACTIVE
      -l, --lock                    lock the password of the named account
      **-n, --mindays MIN_DAYS        set minimum number of days before password
                                    change to MIN_DAYS**
      -q, --quiet                   quiet mode
      -r, --repository REPOSITORY   change password in REPOSITORY repository
      -R, --root CHROOT_DIR         directory to chroot into
      -S, --status                  report password status on the named account
      -u, --unlock                  unlock the password of the named account
      **-w, --warndays WARN_DAYS      set expiration warning days to WARN_DAYS
      -x, --maxdays MAX_DAYS        set maximum number of days before password**
                                    change to MAX_DAYS
    
    ## 예시 ##
    root@ubuntu:~# passwd -x 30 -w 5- n 1 smlee
    ```
    
    - expire 옵션은 계정 비밀번호를 즉시 만료시키는 옵션 → last change date = 0 으로 변경하는 옵션

- 예시
    
    ```bash
    root@ubuntu:~# passwd -e lee
    passwd: password expiry information changed.
    root@ubuntu:~# grep lee /etc/shadow
    smlee:!:19252:1:30:5:::
    lee:$6$pcn9rD2i39GR5B79$5iYz06Et6T20VmcIskvi7dg5KxgE8bi8zM682NHWN2Nd/89gWWM5HNhrMplopSpwCTLGWxL3dDeynAw9llwtq1:0:0:99999:7::19143:
    ```
    

### 2-2. Password 설정 변경

- **chage**
    - change user password expiry information
    
    ```bash
    root@ubuntu:~# chage --help
    Usage: chage [options] LOGIN
    
    Options:
      -d, --lastday LAST_DAY        set date of last password change to LAST_DAY
      -E, --expiredate EXPIRE_DATE  set account expiration date to EXPIRE_DATE
      -h, --help                    display this help message and exit
      -i, --iso8601                 use YYYY-MM-DD when printing dates
      -I, --inactive INACTIVE       set password inactive after expiration
                                    to INACTIVE
      -l, --list                    show account aging information
      -m, --mindays MIN_DAYS        set minimum number of days before password
                                    change to MIN_DAYS
      -M, --maxdays MAX_DAYS        set maximum number of days before password
                                    change to MAX_DAYS
      -R, --root CHROOT_DIR         directory to chroot into
      -W, --warndays WARN_DAYS      set expiration warning days to WARN_DAYS
    
    ## 예시 ##
    root@ubuntu:~# sudo chage -l smlee 
    Last password change					: Sep 17, 2022
    Password expires					: Oct 17, 2022
    Password inactive					: never
    Account expires						: never
    Minimum number of days between password change		: 1
    Maximum number of days between password change		: 30
    Number of days of warning before password expires	: 5
    
    ## 예시 ##
    root@ubuntu:~# sudo chage -M 90 -m 0 -W 7 -I 20 smlee
    root@ubuntu:~# grep smlee /etc/shadow
    smlee:!:19252:0:90:7:20::
    ```
    

- **usermod**
    
    ```bash
    Usage: usermod [options] LOGIN
    
    Options:
      -b, --badnames                allow bad names
      -c, --comment COMMENT         new value of the GECOS field
      -d, --home HOME_DIR           new home directory for the user account
      -e, --expiredate EXPIRE_DATE  set account expiration date to EXPIRE_DATE
      -f, --inactive INACTIVE       set password inactive after expiration
                                    to INACTIVE
      -g, --gid GROUP               force use GROUP as new primary group
      -G, --groups GROUPS           new list of supplementary GROUPS
      -a, --append                  append the user to the supplemental GROUPS
                                    mentioned by the -G option without removing
                                    the user from other groups
      -h, --help                    display this help message and exit
      -l, --login NEW_LOGIN         new value of the login name
      **-L, --lock                    lock the user account**
      -m, --move-home               move contents of the home directory to the
                                    new location (use only with -d)
      -o, --non-unique              allow using duplicate (non-unique) UID
      -p, --password PASSWORD       use encrypted password for the new password
      -R, --root CHROOT_DIR         directory to chroot into
      -P, --prefix PREFIX_DIR       prefix directory where are located the /etc/* files
      -s, --shell SHELL             new login shell for the user account
      -u, --uid UID                 new UID for the user account
      **-U, --unlock                  unlock the user account**
      -v, --add-subuids FIRST-LAST  add range of subordinate uids
      -V, --del-subuids FIRST-LAST  remove range of subordinate uids
      -w, --add-subgids FIRST-LAST  add range of subordinate gids
      -W, --del-subgids FIRST-LAST  remove range of subordinate gids
      -Z, --selinux-user SEUSER     new SELinux user mapping for the user account
    ```
    
    - lock & unlock → passwd라는 명령어로도 가능 (lock 명령어 적용시 /etc/shadow 의 해당 유저란에 !가 붙게 된다)

<br/>