---
emoji: 🔧
title:  Git에서 .gitignore가 적용이 되지 않는 에러 해결 방법
date: '2022-07-23 06:00:00'
author: jinnypark9393
tags: git
categories: 데브옵스
---

# 1. 배경 상황

며칠 전 `.gitignore`에 대해 알아보는 [포스팅](https://jinnypark9393.github.io/devops/Git-what-is-gitignore/)을 올린 적이 있는데, 관련해서 `.gitignore`를 적용했음에도 불구하고 커밋 내역에 해당 파일이 계속 남아잇는 문제가 발생해 해결 방법을 적어두려 한다.

<br/><br/>

# 2. 해결 방법

`.gitignore`에 파일을 추가했음에도 불구하고 파일이 계속해서 커밋 목록에 남아 있는 것은 `.gitignore`에 파일을 추가하기 전 stage에 올라갔던 파일들이 캐시가 남아있어 커밋 목록에 뜨게 되는 것이라고 한다.

<br/>

따라서 해당 파일이 들어 있는 디렉터리로 이동한 후, 아래와 같이 캐시를 삭제해주는 명령어를 입력해주면 된다.

```bash
git rm -r --cached .
```

- `.` ; 현재 디렉터리를 지정

<br/>

이렇게 캐시를 지운 뒤, git add와 git commit으로 다시 커밋을 생성해주면 이제 `.gitignore`가 제대로 적용되는 것을 확인할 수 있다.

<br/><br/>