---
emoji: 💫
title:  '리눅스(Linux) SetUID, SetGID, and Sticky bit'
date: '2022-09-29 06:31:00'
author: jinnypark9393
tags: linux
categories: 데브옵스
---

# SetUID, SetGID, and Sticky bit

# 10. SetUID, SetGID, and Sticky bit

## 1. Special Permissions on Files

- **SetUID, SetGID, and Sticky bit**
    
    
    | SetUID | SetUID가 설정된 프로그램이 실행될 때, 그 프로그램이 실행되는 동안에는 파일 소유자의 권한으로 권한이 변경되어 실행되는 퍼미션
    
       rwx(+s) rwx r-x root root program
       rws rwx r-x root root program
    
    user 퍼미션에 $가 설정되어있는 프로그램
    ttabae$ lls -l /usr/bin/passwd
    -rwsr-xr-x 1 root root 68208 5월 28 2020 /usr/bin/passwd |
    | --- | --- |
    | SetGID | SetGID가 설정된 프로그램이 실해오딜 때 그 프로그램이 실행되는 동안에는 파일 소유 그룹 멤버로의 권한으로 권한이 변경되어 실행되는 퍼미션
    
       rwx rwx(+s) r-x root root program
       rwx rws r-x root root program
    
    ttabae$ ls -l /usr/bin/passwd
    -rwxrwsr-x 1 root root 68208 5월 28 2020 /usr/bin/passwd |
    | Sticky bit | Sticky bit가 설정된 디렉토리에는 누구든 파일을 저장할 수 있으나 파일 삭제는 그 파일 소유자만 가능하도록 허용하는 퍼미션
    
    $ ls - ld /tmp
    drwxrwxrwt 14 root root 4096 5월 29 01:32 /tmp |

- 예제
    
    ```bash
    ## 애플리케이션에 SetUID 설정, 확인, 삭제
        ls -l
        chmod u+s program
        chmod 4754 program
        chmod u-s program
    
    ttabae@ubuntu:~/lfcs-exam$ cp /usr/bin/pkexec .
    ttabae@ubuntu:~/lfcs-exam$ ls -l pkexec 
    -rwx------ 1 ttabae ttabae 31032 Sep 23 00:09 pkexec
    
    ## SUID 설정 ##
    ttabae@ubuntu:~/lfcs-exam$ chmod 4755 pkexec
    ttabae@ubuntu:~/lfcs-exam$ ls -l pkexec 
    -rwsr-xr-x 1 ttabae ttabae 31032 Sep 23 00:09 pkexec
    
    ## SUID 설정 제거 ## 
    ttabae@ubuntu:~/lfcs-exam$ chmod u-s pkexec 
    ttabae@ubuntu:~/lfcs-exam$ ls -l pkexec 
    -rwxr-xr-x 1 ttabae ttabae 31032 Sep 23 00:09 pkexec
    
    ## 애플리케이션에 SetGID 설정, 확인, 삭제 ## 
        ls -l
        chmod g+s program
        chmod 2754 program
        chmod g-s program
    
    ttabae@ubuntu:~/lfcs-exam$ chmod g+s pkexec 
    ttabae@ubuntu:~/lfcs-exam$ ls -l pkexec 
    -rwxr-sr-x 1 ttabae ttabae 31032 Sep 23 00:09 pkexec
    
    ttabae@ubuntu:~/lfcs-exam$ chmod 0755 pkexec 
    ttabae@ubuntu:~/lfcs-exam$ ls -l pkexec 
    -rwxr-xr-x 1 ttabae ttabae 31032 Sep 23 00:09 pkexec
    
    777 permission이 설정된 Directory에 Stickybit 설정, 확인, 삭제
    ** 파일 소유자만 해당 파일을 삭제할 수 있도록 하는 권한.
    
    ttabae@ubuntu:~/lfcs-exam$ ls -ld /tmp
    drwxrwxrwt 17 root root 4096 Sep 23 00:30 /tmp
    
    ttabae@ubuntu:~/lfcs-exam$ mkdir tmp
    ttabae@ubuntu:~/lfcs-exam$ ls -ld tmp
    drwx------ 2 ttabae ttabae 4096 Sep 23 00:35 tmp
    
    ttabae@ubuntu:~/lfcs-exam$ chmod 1777 tmp
    ttabae@ubuntu:~/lfcs-exam$ ls -ld tmp
    drwxrwxrwt 2 ttabae ttabae 4096 Sep 23 00:35 tmp
    
    ttabae@ubuntu:~/lfcs-exam$ chmod o-t tmp
    ttabae@ubuntu:~/lfcs-exam$ ls -ld tmp
    drwxrwxrwx 2 ttabae ttabae 4096 Sep 23 00:35 tmp
    ```

<br/>