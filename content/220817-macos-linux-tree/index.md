---
emoji: 🔧
title:  'MacOS/Linux - CLI환경에서 디렉터리 구조 한눈에 보는 방법(tree 명령어 다운로드)'
date: '2022-08-17 05:54:00'
author: jinnypark9393
tags: macos
categories: 데브옵스
---

최근 Django 튜토리얼에 따라 실습을 진행하고 있는데, IDE외에 CLI도 꽤 사용하고 있어서 CLI환경에서 디렉터리 구조를 한 눈에 보고 싶어 `tree` 를 다운받았다. `tree` 는 CLI 환경에서 디렉터리 구조를 표시해주는 패키지로 MacOS나 Ubuntu의 경우 기본설치가 되어있지 않아 별도로 다운받아야 한다.

<br/>

# 1. 설치 방법

macOS의 경우 패키지 매니저인 `brew`로 간단하게 `tree`를 다운로드 받을 수 있다.

```bash
➜  myfirstsite git:(master) ✗ brew install tree
Running `brew update --auto-update`...
==> Auto-updated Homebrew!
Updated 2 taps (homebrew/core and homebrew/cask).
==> New Formulae
aws2-wrap           glib-utils          ocl-icd             treefmt
cargo-nextest       helix               openvi              ttdl
cargo-udeps         libbpf              pocl                vile
git-codereview      nmrpflash           spr                 vulkan-loader
==> New Casks
astrofox                   drawpile                   ved
calhash                    opencore-patcher

You have 8 outdated formulae installed.
You can upgrade them with brew upgrade
or list them with brew outdated.

==> Downloading https://ghcr.io/v2/homebrew/core/tree/manifests/2.0.2
######################################################################## 100.0%
==> Downloading https://ghcr.io/v2/homebrew/core/tree/blobs/sha256:ea1c2527bde74
==> Downloading from https://pkg-containers.githubusercontent.com/ghcr1/blobs/sh
######################################################################## 100.0%
==> Pouring tree--2.0.2.monterey.bottle.tar.gz
🍺  /usr/local/Cellar/tree/2.0.2: 8 files, 151KB
==> Running `brew cleanup tree`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
```

리눅스의 경우 마찬가지로 `apt-get` 혹은 `yum`과 같은 패키지 매니저를 이용해 다운로드 받을 수 있다.

<br/>

# 2. 사용 예시

디렉터리 구조를 파악하고 싶은 디렉터리로 이동해 tree 명령어를 사용하면 된다.

```bash
➜  myfirstsite git:(master) ✗ tree
.
├── manage.py
└── myfirstsite
    ├── __init__.py
    ├── asgi.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py
```

<br/>
