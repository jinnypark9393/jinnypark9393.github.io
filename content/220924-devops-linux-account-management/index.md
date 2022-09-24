---
emoji: 💫
title:  '리눅스(Linux) Account management'
date: '2022-09-24 20:15:00'
author: jinnypark9393
tags: linux
categories: 데브옵스
---

# Account Management

## 1. User & Group 관련 betabase file들

### 1-1. 계정 관련 파일

- **/etc/passwd**
    - 시스템의 모든 계정에 대한 정보를 담고 있는 설정 파일
    - 7개 필드로 구분. 구분자 colon(`:`)
        - login name
        - encrypted password: (x) → `/etc/shadow`
        - numerical user ID: root (0), system account(1~999: app들이 사용), local user(1000~59999), system account(60000~65535)
        - numerical group ID: root (0)
            - User Private Group: 개인 그룹 (user가 저마다 개인 그룹을 가지고 있음)
        - user name or comment field:
        - user home directory(login directory): root(root), local user: user (/home/user), ttabae(/home/ttabae)
        - login shell
            - 일반 유저: /bin/bash
            - system daemon: /usr/sbin/nologin
    
    ```bash
    ttabae@ubuntu:/$ sudo cat /etc/passwd
    [sudo] password for ttabae: 
    root:x:0:0:root:/root:/bin/bash
    daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
    ```
    

- **/etc/shadow**
    - login name
    - encrypted password
        - *, ! 가 들어간 경우 로그인 금지: password lock
        
        ```bash
        ttabae@ubuntu:/$ sudo cat /etc/shadow
        root:$6$jEZjezlaSvOfNIUI$vxW/3sm5U1uRzf4CPIWztVxcJ/BosEhYb6QAa.coOZPS/Va.aUgsD2zF4cSIXhdcZCd4SbP54BZqmFfXoG.2W0:19251:0:99999:7:::
        daemon:*:19046:0:99999:7:::
        bin:*:19046:0:99999:7:::
        ```
        

### 1-2. 그룹 관련 파일

- 모든 리눅스 유저는 primary group 1개, 그 외 추가 그룹을 여러개 가질 수 있다.
- **/etc/group**
    - 4개 필드로 구분
        - group_name: user name과 동일
        - group_password
        - GID
        - 해당 그룹을 추가 그룹(additional group)으로 사용하는 유저들의 user_list
        
        ```bash
        ttabae@ubuntu:/$ sudo cat /etc/group
        root:x:0:
        daemon:x:1:
        bin:x:2:
        ```
        

## 2. Managing Local Users Accounts

### 2-1. 계정(Account) 추가

- **useradd**

```bash
ttabae@ubuntu:/$ useradd --help
Usage: useradd [options] LOGIN
       useradd -D
       useradd -D [options]

Options:
  -b, --base-dir BASE_DIR       base directory for the home directory of the
                                new account
      --btrfs-subvolume-home    use BTRFS subvolume for home directory
  -c, --comment COMMENT         GECOS field of the new account
  -d, --home-dir HOME_DIR       home directory of the new account
  -g, --gid GROUP               name or ID of the primary group of the new
  **-G, --groups GROUPS           list of supplementary groups of the new
                                account**
  -m, --create-home             create the user's home directory
  -o, --non-unique              allow to create users with duplicate
                                (non-unique) UID
  -p, --password PASSWORD       encrypted password of the new account
  
  -D, --defaults                print or change default useradd configuration
  -e, --expiredate EXPIRE_DATE  expiration date of the new account
  -f, --inactive INACTIVE       password inactivity period of the new account
                                account
-r, --system                  create a system account
  -s, --shell SHELL             login shell of the new account
  -u, --uid UID                 user ID of the new account
```

- 예시
    
    ```bash
    ttabae@ubuntu:~$ sudo useradd -c "seong mi lee" -m seongmi
    [sudo] password for ttabae: 
    ttabae@ubuntu:~$ sudo id seongmi
    uid=1001(seongmi) gid=1001(seongmi) groups=1001(seongmi)
    ttabae@ubuntu:~$ tail /etc/passwd
    colord:x:121:126:colord colour management daemon,,,:/var/lib/colord:/usr/sbin/nologin
    geoclue:x:122:127::/var/lib/geoclue:/usr/sbin/nologin
    pulse:x:123:128:PulseAudio daemon,,,:/var/run/pulse:/usr/sbin/nologin
    gnome-initial-setup:x:124:65534::/run/gnome-initial-setup/:/bin/false
    gdm:x:125:130:Gnome Display Manager:/var/lib/gdm3:/bin/false
    sssd:x:126:131:SSSD system user,,,:/var/lib/sss:/usr/sbin/nologin
    ttabae:x:1000:1000:ttabae,,,:/home/ttabae:/bin/bash
    systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
    sshd:x:127:65534::/run/sshd:/usr/sbin/nologin
    seongmi:x:1001:1001:seong mi lee:/home/seongmi:/bin/sh
    ttabae@ubuntu:~$ tail /etc/passwd
    colord:x:121:126:colord colour management daemon,,,:/var/lib/colord:/usr/sbin/nologin
    geoclue:x:122:127::/var/lib/geoclue:/usr/sbin/nologin
    pulse:x:123:128:PulseAudio daemon,,,:/var/run/pulse:/usr/sbin/nologin
    gnome-initial-setup:x:124:65534::/run/gnome-initial-setup/:/bin/false
    gdm:x:125:130:Gnome Display Manager:/var/lib/gdm3:/bin/false
    sssd:x:126:131:SSSD system user,,,:/var/lib/sss:/usr/sbin/nologin
    ttabae:x:1000:1000:ttabae,,,:/home/ttabae:/bin/bash
    systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
    sshd:x:127:65534::/run/sshd:/usr/sbin/nologin
    seongmi:x:1001:1001:seong mi lee:/home/seongmi:/bin/sh
    ttabae@ubuntu:~$ sudo tail /etc/shadow
    colord:*:19046:0:99999:7:::
    geoclue:*:19046:0:99999:7:::
    pulse:*:19046:0:99999:7:::
    gnome-initial-setup:*:19046:0:99999:7:::
    gdm:*:19046:0:99999:7:::
    sssd:*:19046:0:99999:7:::
    ttabae:$1$TUt6tEFq$u.0w6A1rLulrhCN4AZOdW/:19250:0:99999:7:::
    systemd-coredump:!!:19251::::::
    sshd:*:19251:0:99999:7:::
    seongmi:!:19252:0:99999:7:::
    ```
    
    - 이 때 seongmi는 로그인이 불가능한 유저이다(보안상 이유) → password 를 지정해야한다(sudo passwd seongmi)
        
        ```bash
        ttabae@ubuntu:~$ sudo passwd seongmi 
        New password: 
        Retype new password: 
        passwd: password updated successfully
        ttabae@ubuntu:~$ sudo passwd seongmi 
        New password: 
        Retype new password: 
        passwd: password updated successfully
        ttabae@ubuntu:~$ sudo tail /etc/shadow
        colord:*:19046:0:99999:7:::
        geoclue:*:19046:0:99999:7:::
        pulse:*:19046:0:99999:7:::
        gnome-initial-setup:*:19046:0:99999:7:::
        gdm:*:19046:0:99999:7:::
        sssd:*:19046:0:99999:7:::
        ttabae:$1$TUt6tEFq$u.0w6A1rLulrhCN4AZOdW/:19250:0:99999:7:::
        systemd-coredump:!!:19251::::::
        sshd:*:19251:0:99999:7:::
        seongmi:$6$UJcDxCoNLe8YWWS1$1xIqoQx1R8LE4lSdpktfq7FMHsc2MufYCm8T69v6PFCZUs1s4fG/vYUtCH6asPPPsNjspkkT1rA4RWjAOdOGq.:19252:0:99999:7:::
        ```
        

- 예제: guru 계정을 만드시오

```bash
ttabae@ubuntu:~$ sudo useradd guru
ttabae@ubuntu:~$ sudo id guru
uid=1002(guru) gid=1002(guru) groups=1002(guru)

ttabae@ubuntu:~$ sudo useradd -u 2000 -G sudo smlee

ttabae@ubuntu:~$ sudo id smlee
uid=2000(smlee) gid=2000(smlee) groups=2000(smlee),27(sudo)

ttabae@ubuntu:~$ sudo useradd -u 2000 -g 2000 -G sudo smlee
smlee:x:2000:2000::/home/smlee:/bin/sh

ttabae@ubuntu:~$ sudo tail /etc/group
pulse-access:x:129:
gdm:x:130:
sssd:x:131:
lxd:x:132:ttabae
ttabae:x:1000:
sambashare:x:133:ttabae
systemd-coredump:x:999:
seongmi:x:1001:
guru:x:1002:
smlee:x:2000:
ttabae@ubuntu:~$ sudo cat /etc/group
root:x:0:
daemon:x:1:
bin:x:2:
...(생략)...
sssd:x:131:
lxd:x:132:ttabae
ttabae:x:1000:
sambashare:x:133:ttabae
systemd-coredump:x:999:
seongmi:x:1001:
guru:x:1002:
smlee:x:2000:
```

- -u 2000으로 생성하면 gid가 자동으로 2000번으로 부여됨

### 2-2. Account 변경

- usermod: 계정정보를 수정할 수 있다.
    - useradd 에는 없는 옵션이 있다.
    
    ```bash
    Options:
      -b, --badnames                allow bad names
      -c, --comment COMMENT         new value of the GECOS field
      -d, --home HOME_DIR           new home directory for the user account
      -e, --expiredate EXPIRE_DATE  set account expiration date to EXPIRE_DATE
      -f, --inactive INACTIVE       set password inactive after expiration
                                    to INACTIVE
      -g, --gid GROUP               force use GROUP as new primary group
      -G, --groups GROUPS           new list of supplementary GROUPS
      **-a, --append                  append the user to the supplemental GROUPS
                                    mentioned by the -G option without removing
                                    the user from other groups**
      -h, --help                    display this help message and exit
      **-l, --login NEW_LOGIN         new value of the login name**
      **-L, --lock                    lock the user account**
      -m, --move-home               move contents of the home directory to the
                                    new location (use only with -d)
      -o, --non-unique              allow using duplicate (non-unique) UID
      -p, --password PASSWORD       use encrypted password for the new password
      -R, --root CHROOT_DIR         directory to chroot into
      -P, --prefix PREFIX_DIR       prefix directory where are located the /etc/* files
      **-s, --shell SHELL             new login shell for the user account
      -u, --uid UID                 new UID for the user account
      -U, --unlock                  unlock the user account**
      -v, --add-subuids FIRST-LAST  add range of subordinate uids
      -V, --del-subuids FIRST-LAST  remove range of subordinate uids
      -w, --add-subgids FIRST-LAST  add range of subordinate gids
      -W, --del-subgids FIRST-LAST  remove range of subordinate gids
      -Z, --selinux-user SEUSER     new SELinux user mapping for the user account
    ```
    

- 예제
    - 로그인 쉘 변경하기
    
    ```bash
    
    ttabae@ubuntu:~$ sudo usermod -s /bin/bash smlee
    [sudo] password for ttabae:
    ttabae@ubuntu:~$ sudo tail /etc/passwd
    pulse:x:123:128:PulseAudio daemon,,,:/var/run/pulse:/usr/sbin/nologin
    gnome-initial-setup:x:124:65534::/run/gnome-initial-setup/:/bin/false
    gdm:x:125:130:Gnome Display Manager:/var/lib/gdm3:/bin/false
    sssd:x:126:131:SSSD system user,,,:/var/lib/sss:/usr/sbin/nologin
    ttabae:x:1000:1000:ttabae,,,:/home/ttabae:/bin/bash
    systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
    sshd:x:127:65534::/run/sshd:/usr/sbin/nologin
    seongmi:x:1001:1001:seong mi lee:/home/seongmi:/bin/sh
    guru:x:1002:1002::/home/guru:/bin/sh
    smlee:x:2000:2000::/home/smlee:/bin/bash
    ```
    
    - guru 계정을 sudo 그룹에 소속되도록 설정
    
    ```bash
    ttabae@ubuntu:~$ sudo usermod -a -G sudo guru
    ```
    
    ⇒ `-a` 옵션: 예전 설정을 지우지 않고 유지한채로 추가설정을 진행
    
    - guru 계정을 로그인 lock을 걸어 로그인 할 수 없도록 제한
    
    ```bash
    ttabae@ubuntu:~$ sudo usermod -L guru
    ```
    

### 2-3. Account 삭제

- **userdel**

```bash
Usage: userdel [options] LOGIN

Options:
  -f, --force                   force removal of files,
                                even if not owned by user
  -h, --help                    display this help message and exit
  -r, --remove                  remove home directory and mail spool
  -R, --root CHROOT_DIR         directory to chroot into
  -P, --prefix PREFIX_DIR       prefix directory where are located the /etc/* files
      --extrausers              Use the extra users database
  -Z, --selinux-user            remove any SELinux user mapping for the user
```

- 예제: guru 계정을 홈디렉토리와 mail 사서함을 포함해 삭제
    
    ```bash
    ttabae@ubuntu:~$ sudo userdel -r guru
    userdel: guru mail spool (/var/mail/guru) not found
    userdel: guru home directory (/home/guru) not found
    ```
    
    - 참고: userdel 만 사용하면 홈디렉토리와 mail 사서함이 그대로 남게 된다.

## 3. Group

### 3-1. Group 추가

- **groupadd**
    
    ```bash
    Usage: groupadd [options] GROUP
    
    Options:
      -f, --force                   exit successfully if the group already exists,
                                    and cancel -g if the GID is already used
      -g, --gid GID                 use GID for the new group
      -h, --help                    display this help message and exit
      -K, --key KEY=VALUE           override /etc/login.defs defaults
      -o, --non-unique              allow to create groups with duplicate
                                    (non-unique) GID
      -p, --password PASSWORD       use this encrypted password for the new group
      -r, --system                  create a system account
      -R, --root CHROOT_DIR         directory to chroot into
      -P, --prefix PREFIX_DIR       directory prefix
          --extrausers              Use the extra users database
    ```
    

- 예제
    
    GID 3000 번을 사용하는 project1 그룹을 생성하시오.
    
    ```bash
    ttabae@ubuntu:~$ sudo groupadd --g 3000 project1
    ttabae@ubuntu:~$ grep project1 /etc/group
    project1:x:3000:
    ```
    

- 예제
    
    project 그룹을 추가그룹으로 가지는 lee, kim 유저를 생성하시오.
    
    ```bash
    ttabae@ubuntu:~$ sudo useradd -G project1 -m -s /bin/bash lee
    ttabae@ubuntu:~$ sudo useradd -G project1 -m -s /bin/bash kim
    
    ttabae@ubuntu:~$ sudo id lee
    uid=2001(lee) gid=2001(lee) groups=2001(lee),3000(project1)
    ttabae@ubuntu:~$ sudo id kim
    uid=2002(kim) gid=2002(kim) groups=2002(kim),3000(project1)
    
    ttabae@ubuntu:~$ grep project /etc/group
    project1:x:3000:lee,kim
    ```
    

### 3-2. Group 변경

- **groupmod**
    
    ```bash
    Usage: groupmod [options] GROUP
    
    Options:
      -g, --gid GID                 change the group ID to GID
      -h, --help                    display this help message and exit
      -n, --new-name NEW_GROUP      change the name to NEW_GROUP
      -o, --non-unique              allow to use a duplicate (non-unique) GID
      -p, --password PASSWORD       change the password to this (encrypted)
                                    PASSWORD
      -R, --root CHROOT_DIR         directory to chroot into
      -P, --prefix PREFIX_DIR       prefix directory where are located the /etc/* file
    ```
    

- 예제
    
    project1 그룹의 ID를 2500으로 변경하시오
    
    ```bash
    ttabae@ubuntu:~$ sudo groupmod -g 2500 project1
    ttabae@ubuntu:~$ grep project /etc/group
    project1:x:2500:lee,kim
    ```
    

### 3-3. Group 삭제

- **groupdel**

```bash
Usage: groupdel [options] GROUP

Options:
  -h, --help                    display this help message and exit
  -R, --root CHROOT_DIR         directory to chroot into
  -P, --prefix PREFIX_DIR       prefix directory where are located the /etc/* files
  -f, --force                   delete group even if it is the primary group of a user
      --extrausers              Use the extra users database
```

⇒ addtional 그룹만 삭제 가능. primary는 삭제 불가

- 예제
    
    ```bash
    ttabae@ubuntu:~$ sudo groupdel project1
    ttabae@ubuntu:~$ sudo id kim
    uid=2002(kim) gid=2002(kim) groups=2002(kim)
    ```
    

### LFCS 시험 대비 문제 풀이

**Q1. What command will generate a list of user names from /etc/passwd along with their login shell?**

1. column -c: 1,8 /etc/passwd
2. chop - c 1,7 /etc/passwd
3. colrm 1,7 /etc/password
4. cut -d: -f 1,7 /etc/passwd

- 내 풀이: d
    
    ```bash
    Usage: cut OPTION... [FILE]...
    Print selected parts of lines from each FILE to standard output.
    
    With no FILE, or when FILE is -, read standard input.
    
    Mandatory arguments to long options are mandatory for short options too.
      -b, --bytes=LIST        select only these bytes
      -c, --characters=LIST   select only these characters
      **-d, --delimiter=DELIM   use DELIM instead of TAB for field delimiter
      -f, --fields=LIST       select only these fields;  also print any line
                                that contains no delimiter character, unless
                                the -s option is specified**
      -n                      (ignored)
          --complement        complement the set of selected bytes, characters
                                or fields
      -s, --only-delimited    do not print lines not containing delimiters
          --output-delimiter=STRING  use STRING as the output delimiter
                                the default is to use the input delimiter
      -z, --zero-terminated    line delimiter is NUL, not newline
          --help     display this help and exit
          --version  output version information and exit
    
    Use one, and only one of -b, -c or -f.  Each LIST is made up of one
    range, or many ranges separated by commas.  Selected input is written
    in the same order that it is read, and is written exactly once.
    Each range is one of:
    
      N     N'th byte, character or field, counted from 1
      N-    from N'th byte, character or field, to end of line
      N-M   from N'th to M'th (included) byte, character or field
      -M    from first to M'th (included) byte, character or field
    
    ttabae@ubuntu:~$ cut -d: -f 1,7 /etc/passwd
    root:/bin/bash
    daemon:/usr/sbin/nologin
    bin:/usr/sbin/nologin
    sys:/usr/sbin/nologin
    sync:/bin/sync
    games:/usr/sbin/nologin
    man:/usr/sbin/nologin
    lp:/usr/sbin/nologin
    mail:/usr/sbin/nologin
    ```

<br/>