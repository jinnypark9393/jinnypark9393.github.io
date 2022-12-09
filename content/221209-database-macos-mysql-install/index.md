---
emoji: 💫
title:  'MacOS에서 MySQL Workbench 설치 및 데이터베이스 생성하기'
date: '2022-12-09 16:59:00'
author: jinnypark9393
tags: mysql
categories: 데이터베이스
---

# 1. MySQL 설치

MacOS에서 MySQL을 설치하기 위해서는 홈브루(Homebrew)를 사용할 수 있다.

<br/>

먼저 홈브루를 최신으로 업데이트 해준다.

```
brew update
```

<br/>

다음으로는 홈브루를 통해 mysql을 설치해준다.

```
brew install mysql
```

<br/>

`brew list` 명령어를 통해 mysql이 정상적으로 설치 되었는지 확인해준다.

```
➜  anyshopping git:(master) ✗ brew list         
==> Formulae
aws-iam-authenticator   icu4c                   lz4                     protobuf
ca-certificates         libcbor                 mysql                   xz
gettext                 libevent                openssl@1.1             zlib
git                     libfido2                pcre2                   zstd

==> Casks
iterm2
```

<br/>

mysql 서버를 아래와 같이 기동해 준다.

```
➜  anyshopping git:(master) ✗ mysql.server start    
Starting MySQL
.. SUCCESS!
```

<br/>

`mysql_secure_installation` 으로 상세 설정을 진행해준다.

- VALIDATE PASSWORD COMPONENT can be used to test passwords and improve security. It checks the strength of password and allows the users to set only those passwords which are secure enough. Would you like to setup VALIDATE PASSWORD component?
    - 비밀번호 설정 규칙 설정할 것인지 여부. 예를 선택할 경우 3단계 중에서 하나를 선택할 수있다.
- By default, a MySQL installation has an anonymous user, allowing anyone to log into MySQL without having to have a user account created for them. This is intended only for testing, and to make the installation go a bit smoother. You should remove them before moving into a production environment. Remove anonymous users?
    - 익명 사용자 허용을 삭제할 것인지? 예를 선택할 경우 `-u` 옵션을 통해 유저를 지정해야한다.
- Normally, root should only be allowed to connect from 'localhost'. This ensures that someone cannot guess at the root password from the network. Disallow root login remotely?
    - 원격지에서 root 사용자 로그인금지(localhost만 허용). 예를 선택할 경우 localhost에서의 접속만 허용하게 된다.
- By default, MySQL comes with a database named 'test' that anyone can access. This is also intended only for testing, and should be removed before moving into a production
environment. Remove test database and access to it?
    - 자동으로 생성되는 테스트용 데이터베이스를 삭제할지 여부 선택. 예를 선택할 경우 테스트용 데이터베이스가 삭제된 상태로 설정된다.

<br/>

생성한 MySQL 서버에 접속해보자.

```
➜  anyshopping git:(master) ✗ mysql -p                 
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 10
Server version: 8.0.31 Homebrew

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
```

- 참고: MySQL CLI에서 빠져나오려면 `exit` 을 입력하면 된다.

<br/>

# 2. MySQL Workbench 설치

구글에서 MySQL workbench 다운로드로 검색하거나 [이 URL](https://dev.mysql.com/downloads/workbench/)을 통해 접속한 뒤, 해당하는 OS를 선택하고, 다운로드 버튼을 클릭한다.

<br/>

다음 화면에서는 로그인 하라는 메시지가 뜨는데, 무시하고 스크롤 다운해서 `No thanks, just start my download.` 라는 문구를 클릭해주면 다운로드를 받을 수 있다.

<br/>

MacOS의 경우 일반적인 애플리케이션을 설치하듯, 다운로드 받은 dmg파일 오픈하여 Application폴더에 넣어주면 설치가 완료된다.

<br/>

MySQL Workbench 앱을 더블 클릭해 오픈하게 되면, 현재 기동중인 MySQL 서비스로 접속할 수 있다(메인 화면에 보이지 않는 경우에는 MySQL이 현재 구동중인지 확인).

<br/>

첫 접속 뒤 팝업으로 뜨는 Database creation창에서 database를 생성해도 되고, 추후에 Schema 탭으로 이동한 뒤, Create schema로 새로운 schema를, Create table로 table을 생성할 수 있다.

<br/>

# 3. MySQL 종료

설치 및 구동 확인이 끝나면 서버를 종료한다.

```jsx
➜  anyshopping git:(master) ✗ mysql.server stop 
Shutting down MySQL
. SUCCESS!
```

<br/>