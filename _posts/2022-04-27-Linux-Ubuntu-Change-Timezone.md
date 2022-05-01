---

published: true
title:  "[Linux/Ubuntu]리눅스(Linux) 시간을 한국 표준시(KST)로 변경하기"
excerpt: "리눅스의 기본 Timezone은 PDT/UST 이므로 KST로 재설정해주어야 한다"

categories:
- DevOps
tags:
- [linux설정, linux, Ubuntu, Ubuntu설정, 우분투시간변경, 리눅스시간변경, 데브옵스엔지니어, DevOps]

toc: true
toc_sticky: true

date: 2022-04-27
last_modified_at: 2022-04-27

---

<br/><br/>

# 1. 리눅스(Linux) 시간을 한국 표준시(KST)로 변경

*💡  리눅스의 기본 Timezone은 PDT/UST 이므로 KST로 재설정해주어야 한다.*

<br/><br/>

깃허브 블로그(Github Pages)용으로 VMware Fusion에서 우분투(Ubuntu)를 설치하고 난 뒤, Jekyll과 Git으로 블로그에 포스팅을 진행했다. 하지만 Github에서 표시되는 commit 일시와 실제 commit 일시가 다른 현상이 발생했는데, 확인해보니 Timezone이 한국표준시가 아닌 다른 시간대로 설정되어 생긴 현상이었다.

<br/>

구글링으로 찾아보니 리눅스를 설치할 때 Timezone을 설정하지 않으면 PDT/UST 등이 기본으로 설정된다고 한다.

<br/>

시스템 자체에 문제가 생긴 부분은 아니지만 패스트캠퍼스에서 매일 포스팅 업로드 챌린지를 하고 있는데, 나중에 업로드 일자가 문제가 될까 싶어서 아래와 같은 방법으로 Timezone을 KST로 변경해주었다.

<br/>

참고로 현재 내 환경은 아래와 같다.

<br/>

- MacOS Monterey 12.3.1
- VMware Fusion 12.1.2
- Ubuntu 20.04

<br/><br/>

1. `date` 명령어를 사용해 현재 시간을 확인한다.
    - 나의 경우에는 PDT(태평양 표준시: Pacific Daylight Time)로 설정되어있었다.

    ```bash
    canary@ubuntu:~/myblog/jinnypark9393.github.io$ date
    Mon 18 Apr 2022 04:54:58 AM PDT
    ```
<br/>

2. 현재 Timezone 을 확인한다.

    ```bash
    canary@ubuntu:~/myblog/jinnypark9393.github.io$ ls -al /etc/localtime
    lrwxrwxrwx 1 root root 39 Apr 13 06:29 /etc/localtime -> /usr/share/zoneinfo/America/Los_Angeles
    ```

<br/>

3. Timezone을 한국표준시(KST)로 변경해준다.

    ```bash
    canary@ubuntu:~/myblog/jinnypark9393.github.io$ sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
    [sudo] password for canary: 
    ```

<br/>

4. 변경된 Timezone 을 확인한다.

    ```bash
    canary@ubuntu:~/myblog/jinnypark9393.github.io$ ls -al /etc/localtime
    lrwxrwxrwx 1 root root 30 Apr 18 20:56 /etc/localtime -> /usr/share/zoneinfo/Asia/Seoul
    ```

<br/>

5. `date`로 현재 시간이 제대로 설정되었는지 확인한다.

    ```bash
    canary@ubuntu:~/myblog/jinnypark9393.github.io$ date
    Mon 18 Apr 2022 08:56:34 PM KST
    ```
