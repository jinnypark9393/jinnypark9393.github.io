---
emoji: 💫
title:  'MacOS의 패키지 관리 툴 Homebrew 다운로드하기'
date: '2022-10-01 10:09:00'
author: jinnypark9393
tags: homebrew
categories: 데브옵스
---

# MacOS의 패키지 관리 툴 Homebrew 다운로드하기

## 1. Homebrew란?

[Homebrew](https://brew.sh/index_ko)란 Ubuntu의 apt, CentOS의 yum과 같이 커맨드라인에서 사용가능한 패키지 관리자로, MacOS의 사실상 표준(De facto standard)이다. 맥스 호웰(Max Howell)이라는 개발자에 의해 개발되었으며, 루비(Ruby)기반으로 개발되었다. 

<br/>

## 2. Homebrew 다운로드

아래와 같은 명령어를 터미널에 입력해주면 간단하게 Homebrew를 설치할 수 있다.

```bash
jinipark@c889f3ba77e1 ~ % /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

<br/>

다음으로는 다음 세 명령어를 사용해 환경변수를 설정 해준다.

```bash
echo '# Set PATH, MANPATH, etc., for Homebrew.' >> /Users/jinipark/.zprofile
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/jinipark/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

<br/>

## 3. Homebrew 사용법

### Homebrew 버전 확인

먼저 `brew --version` 명령어로 Homebrew가 잘 설치되어있는지 확인하자.

```bash
user ~ % brew --version
Homebrew 3.6.3
Homebrew/homebrew-core (git revision a1b61b0fec3; last commit 2022-09-29)
```

<br/>

### 패키지 다운로드

패키지를 다운로드 받으려면 아래와 같이 명령어를 입력해주면 된다. 이번 예시에서는 `git` 을 다운로드 해볼 것이다.

```bash
user ~ % brew install git
==> Downloading https://ghcr.io/v2/homebrew/core/gettext/manifests/0.21
(생략)
```

<br/>

### 패키지 파일 목록 확인

`list` 명령어로 패키지가 설치한 파일 목록을 확인할 수 있으며,

```bash
user ~ % brew list git
/opt/homebrew/Cellar/git/2.37.3/.bottle/etc/gitconfig
/opt/homebrew/Cellar/git/2.37.3/bin/git
/opt/homebrew/Cellar/git/2.37.3/bin/git-cvsserver
/opt/homebrew/Cellar/git/2.37.3/bin/git-receive-pack
/opt/homebrew/Cellar/git/2.37.3/bin/git-shell
/opt/homebrew/Cellar/git/2.37.3/bin/git-upload-archive
/opt/homebrew/Cellar/git/2.37.3/bin/git-upload-pack
/opt/homebrew/Cellar/git/2.37.3/etc/bash_completion.d/ (2 files)
/opt/homebrew/Cellar/git/2.37.3/libexec/git-core/ (195 files)
/opt/homebrew/Cellar/git/2.37.3/share/doc/ (962 files)
/opt/homebrew/Cellar/git/2.37.3/share/git-core/ (165 files)
/opt/homebrew/Cellar/git/2.37.3/share/gitweb/ (5 files)
/opt/homebrew/Cellar/git/2.37.3/share/locale/ (18 files)
/opt/homebrew/Cellar/git/2.37.3/share/man/ (182 files)
/opt/homebrew/Cellar/git/2.37.3/share/perl5/ (20 files)
/opt/homebrew/Cellar/git/2.37.3/share/zsh/ (2 files)
```

<br/>

### 패키지 업그레이드

패키지를 업그레이드 할 경우 아래와 같이 `upgrade` 명령어를 입력해주면 된다.

```bash
user ~ % brew upgrade git
Running `brew update --auto-update`...
==> Homebrew is run entirely by unpaid volunteers. Please consider donating:
  https://github.com/Homebrew/brew#donations

==> Auto-updated Homebrew!
Updated 1 tap (homebrew/core).

Warning: git 2.37.3 already installed
```

<br/>

### 패키지 삭제

패키지를 삭제하려면 아래와 같이 `remove` 명령어를 입력하면 된다.

```bash
brew remove <패키지명>
```

<br/>

### Homebrew 업그레이드

참고로 Hombrew 자체를 업그레이드하려면 아래 명령어를 입력하면 된다.

```bash
brew update
```

<br/>

### Homebrew 삭제

Homebrew 를 삭제하려면 아래의 스크립트를 실행해주면 된다.

```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
```

<br/>