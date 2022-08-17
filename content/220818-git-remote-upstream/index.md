---
emoji: 🔧
title:  'Git/Github - upstream이란? upstream 원격 저장소 추가하는 방법'
date: '2022-08-18 05:44:00'
author: jinnypark9393
tags: git
categories: 데브옵스
---

# 1. 배경 상황

최근 쿠버네티스 한글화 프로젝트를 비롯한 오픈소스 프로젝트에 기여를 진행하고 있는데, 필요할 때 매번 관련 명령어를 찾기 귀찮아서(?) 블로그에 기록해놓으려고 한다. 

<br/>

# 2. upstream이란?

쿠버네티스 공식문서와 같은 오픈소스 프로젝트의 경우에는 작업자가 로컬에서 바로 원본 저장소로 코드를 push하는 형태가 아니라 개인 원격 저장소(ex. 깃허브)에 fork(소스코드를 복사하는 개념과 유사하다고 생각하면 된다) 한다. 그리고 로컬에서 작업한 내용을 먼저 개인 원격 저장소에 push한 뒤, 원본 저장소에 pull request(repository 측에서 내 수정사항을 당겨받아(pull)달라는 요청)를 올려 관리자의 승인을 받아 반영을 하게 된다. 이 때, 원본 브랜치를 `upstream`, 내 개인 원격 저장소를 `origin`이라고 한다.

<br/>

이렇듯, `upstream`은 일반적으로 fork한 원본 저장소를 뜻하고, `origin`은 fork한 저장소를 뜻하게 된다(다만 fork를 하지 않고, 원본 저장소에 작업자가 바로 push하게 될 경우 원본 저장소를 origin으로 설정하기도 한다). 

<br/>

# 3. upstream 브랜치 설정 방법

따라서, 오픈소스 프로젝트를 포크해 git clone으로 로컬에 소스코드를 다운받았을 경우, 이미 upstream 브랜치가 설정되어있지 않았다면 upstream을 설정해 주어야 한다. 

<br/>

참고로, upstream을 설정하지 않아도 origin만 존재한다면 코드를 origin에 push해 upstream으로 pull request를 생성하는 것 자체에는 문제가 없을 수 있다. 하지만, 로컬에 upstream을 생성하지 않을 경우, upstream과 싱크를 맞출 수 없어 conflict이 발생하거나, 소스코드를 fork한 이후 upstream에 새로운 브랜치가 생성되어있을 경우 브랜치를 로컬에 받아올 수 없으니 반드시 설정해 주도록 하자.

<br/>

먼저 upstream branch가 추가되어있는지 확인하자.

```bash
➜  website git:(main) git remote -v
origin	https://github.com/jinnypark9393/website.git (fetch)
origin	https://github.com/jinnypark9393/website.git (push)
```

origin만 존재하고 upstream이 추가되어있지 않다.

<br/>

`git remote add` 명령어를 사용해 upstream을 추가해준다.

```bash
➜  website git:(main) git remote add upstream https://github.com/kubernetes/website.git
```

<br/>

다시 확인해보면 upstream이 추가된 것을 알 수 있다.

```bash
➜  website git:(main) git remote -v
origin	https://github.com/jinnypark9393/website.git (fetch)
origin	https://github.com/jinnypark9393/website.git (push)
upstream	https://github.com/kubernetes/website.git (fetch)
upstream	https://github.com/kubernetes/website.git (push)
```

<br/>

이 상황에서 만약 새로운 브랜치를 업데이트 하고싶다면 아래와 같이 `fetch`명령어를 작성해준다.

```bash
➜  website git:(main) git fetch upstream dev-1.24-ko.3
remote: Enumerating objects: 8067, done.
remote: Counting objects: 100% (3264/3264), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 8067 (delta 3262), reused 3261 (delta 3261), pack-reused 4803
Receiving objects: 100% (8067/8067), 2.66 MiB | 2.86 MiB/s, done.
Resolving deltas: 100% (6258/6258), completed with 985 local objects.
From https://github.com/kubernetes/website
 * branch                  dev-1.24-ko.3 -> FETCH_HEAD
 * [new branch]            dev-1.24-ko.3 -> upstream/dev-1.24-ko.3
```

<br/>