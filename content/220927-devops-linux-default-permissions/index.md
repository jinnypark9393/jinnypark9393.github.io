---
emoji: 💫
title:  '리눅스(Linux) Default Permissions(umask)'
date: '2022-09-27 06:31:00'
author: jinnypark9393
tags: linux
categories: 데브옵스
---

# Default Permissions(umask)

## 1. Default Permission 설정

- 파일과 디렉토리가 생성될 때 기본으로 적용되는 설정
    - 예시
        
        ```bash
        ttabae@ubuntu:~/lfcs-exam$ touch file1
        ttabae@ubuntu:~/lfcs-exam$ mkdir dir1
        ttabae@ubuntu:~/lfcs-exam$ ls -ld file1 dir1
        drwxrwxr-x 2 ttabae ttabae 4096 Sep 22 07:42 dir1
        -rw-rw-r-- 1 ttabae ttabae    0 Sep 22 07:42 file1
        ```
        
        - file1과 dir1이 생성된 직후 부여받는 permission 설정 → umask
        
    
    ```bash
    umask: umask [-p] [-S] [mode]
    
    Display or set file mode mask.
    
    Options:
          -p	if MODE is omitted, output in a form that may be reused as input
          -S	makes the output symbolic; otherwise an octal number is output
    
    ttabae@ubuntu:~/lfcs-exam$ umask
    0002
    ```
    
    |  | file | directory |
    | --- | --- | --- |
    | default | 0666 | 0777 |
    | umask | 0002 | 0002 |
    | permission | 0664 | 0775 |
    | default permission | rw-rw-r— | rwxrwxr-x |
    - default - umask = permission
    - umask의 값을 변경해 기본 퍼미션을 변경할 수 있다.
    
- example
    
    ```bash
    ttabae@ubuntu:~/lfcs-exam$ umask 0022 ## file 0644 directtory 0755
    ttabae@ubuntu:~/lfcs-exam$ umask -S
    u=rwx,g=rx,o=rx
    
    ttabae@ubuntu:~/lfcs-exam$ touch file2
    ttabae@ubuntu:~/lfcs-exam$ mkdir dir2
    ttabae@ubuntu:~/lfcs-exam$ ls -ld file2 dir2
    drwxr-xr-x 2 ttabae ttabae 4096 Sep 22 08:27 dir2
    -rw-r--r-- 1 ttabae ttabae    0 Sep 22 08:27 file2
    ttabae@ubuntu:~/lfcs-exam$ ls -ld file2 dir2
    drwxr-xr-x 2 ttabae ttabae 4096 Sep 22 08:27 dir2
    -rw-r--r-- 1 ttabae ttabae    0 Sep 22 08:27 file2
    
    ttabae@ubuntu:~/lfcs-exam$ umask 077
    ttabae@ubuntu:~/lfcs-exam$ umask
    0077
    ttabae@ubuntu:~/lfcs-exam$ touch file3
    ttabae@ubuntu:~/lfcs-exam$ mkdir dir3
    ttabae@ubuntu:~/lfcs-exam$ ls -ld file3 dir3
    drwx------ 2 ttabae ttabae 4096 Sep 22 08:31 dir3
    -rw------- 1 ttabae ttabae    0 Sep 22 08:30 file3
    
    ## umask 설정의 로그아웃 후 재로그인할 때 사라지는데, 재로그인시에도 유지하고 싶은 경우 ##
    ttabae@ubuntu:~$ vi ~/.bashrc
    ## 아래와 같은 umask 설정을 파일에 추가한다 ##
    umask 002
    ```

<br/>