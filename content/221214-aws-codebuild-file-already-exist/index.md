---
emoji: 💫
title:  'AWS CodeBuild “EEXIST: file already exists” 에러 해결'
date: '2022-12-14 09:10:00'
author: jinnypark9393
tags: aws
categories: 클라우드
---

# 1. 배경 상황

node.js(Express.js)프로젝트의 EKS 배포를 위한 CodePipeline CI/CD 구성 중 노드 프로젝트를 불러와서 npm install로 패키지를 설치하는 도중 다음과 같은 경고 메시지가 발생했다.

```bash
npm WARN read-shrinkwrap This version of npm is compatible with lockfileVersion@1, but package-lock.json was generated for lockfileVersion@2. I'll try to do my best with it!
EEXIST: file already exists
```

<br/>

# 2. 해결 방법

여기서 중요한 메시지는 `EEXIST: file already exists` 라는 메시지. package-lock.json 파일 및 node_modules가 기존에 이미 존재하고 있기 때문에 npm install로 새로운 모듈을 받지 못한다는 메시지였는데, 로컬이었다면 수작업으로 `package-lock.json`파일과 `node_modules` 라는 디렉터리를 삭제해줄 수도 있었겠지만, CodeBuild상에서 삭제하는 과정이 필요했기 때문에 아래와 같이 package.json 파일에서 해당 파일들을 삭제해주는 `"clean"`  scripts를 추가해주고,

```bash
"scripts": {
    "clean": "rm package-lock.json; rm -rf node_modules",
    "init": "rm ./bin/*",
    "start": "nodemon ./server.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "npm run init; pkg . --out-path bin"
  },
```

CodeBuild위에서 실행할 명령어들을 정의하는 buildspec.yaml 파일에 `npm run clean` 커맨드를 추가했더니 위와 같은 에러가 해결되었다.

<br/>