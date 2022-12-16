---
emoji: 💫
title:  'Node.js Error: Cannot find module /usr/src/app/nodemon 에러 해결'
date: '2022-12-16 09:36:00'
author: jinnypark9393
tags: docker
categories: devops
---

# 1. 배경 상황

최근 데모 실습을 위해 Codepipeline + CodeCommit + Codebuild로 CI/CD 파이프라인 구축을 하고있는데, Codebuild에서 에러가 어마무시하게 나서 하나씩 정리해두려 한다. `‘Error: Cannot find module '/usr/src/app/nodemon'` 에러는 pkg 모듈로 Node.js(Express 프레임워크) 프로젝트를 빌드하고 도커 이미지로 만드는 과정에서 발생했던 에러였다.

<br/>

정확한 에러 메시지는 아래와 같았다.

```bash
node:internal/modules/cjs/loader:988
  throw err;
  ^

Error: Cannot find module '/usr/src/app/nodemon'
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:985:15)
    at Function.Module._load (node:internal/modules/cjs/loader:833:27)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:22:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}
```

<br/>

# 2. 에러 해결

기존 Dockerfile을 다시 살펴보니 서버를 가동시키는 명령어를 nodemon으로 해두었었다. 로컬로 접속 테스트를 했었을 당시에 서버 재부팅이 귀찮아서 `-g` 모드로 nodemon을 설치해서 사용 중이었는데, 도커파일을 작성할 때에도 습관적으로 nodemon을 사용했었던 것.

```bash
FROM node:16

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 앱 의존성 설치
COPY package*.json ./
RUN npm install

# 앱 소스 파일 추가
COPY . .
RUN ls -al

EXPOSE 8090
CMD ["nodemon", "./server.js"]
```

<br/>

해결 방법은 package.json에 nodemon을 포함해주거나, 서버 기동을 위한 명령어를 기본 명령어인 node로 바꿔주는 방법이 있는데, 나는 이미지를 최대한 가볍게 만들고 싶어서 명령어를 기본 명령어로 바꿔주었다.

```bash
FROM node:16

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 앱 의존성 설치
COPY package*.json ./
RUN npm install

# 앱 소스 파일 추가
COPY . .
RUN ls -al

EXPOSE 8090
CMD ["node", "./server.js"]
```

이렇게 도커파일을 변경하고 다시 재빌드 하니 문제없이 도커빌드가 진행되었다.

<br/>