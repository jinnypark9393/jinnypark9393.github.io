---
emoji: 💫
title:  'Node.js 프로젝트 pkg 모듈로 빌드하기'
date: '2022-12-11 15:17:00'
author: jinnypark9393
tags: javascript
categories: 프로그래밍
---

# 1. 배경 상황

회사 과제 진행하느라 급히(?) Node.js + express를 배워서 웹 앱을 작성하는 중인데, Node.js를 처음 다루다보니 빌드 & 배포 방법을 처음으로 알게되어 기록용으로 남겨둔다.

<br/>

# 2. pkg 모듈 다운로드 & package.json 설정

이전 회사에서 진행했던 Java 프로젝트의 경우에는 빌드 도구로 Ant와 Maven으로 빌드를 했었는데(그런데 요즘에는 Gradle & Maven을 많이 쓰고 Ant는 거의 쓰지 않는다고 한다. 어쩐지 처음 프로젝트 시작할 때 Ant 빌드 방법을 아무리 구글링 해도 옛날 자료밖에 안나오더라….눈물), node프로젝트는 pkg 모듈로 빌드 & 실행파일 생성을 진행할 수 있다고 한다.

<br/>

먼저 pkg 모듈을 사용하기 위해 npm으로 pkg 모듈을 설치한다.

```bash
npm install --save-dev pkg
```

pkg는 빌드용 모듈이기 때문에 `--save-dev` 옵션을 주어 `devDependencies` 로 추가한다.

<br/>

설치가 완료되면 package.json 파일에 아래와 같이 pkg모듈이 `devDependencies` 에 추가된다.

```bash
  "devDependencies": {
    "pkg": "^5.8.0"
  }
```

<br/>

다음으로는 어떤 파일을 실행파일에 추가할지, 타겟 플랫폼은 무엇인지 package.json에 설정 해주어야 한다.

<br/>

package.json 파일의 scripts에 build 명령어를 정의해준다. scripts에 명령어를 정의해주면 `npm run [정의한 명령어]` 로 명령어를 실행할 수 있다.

```bash
"scripts": {
    "init": "rm ./bin/*",
    "start": "nodemon ./bin/www",
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "npm run init && pkg . --out-path bin"
  },
```

빌드를 진행하려면 기본적으로 `pkg .` 명령어만 입력하면 빌드가 진행된다. 하지만 나는 `--out-path` 로 빌드 결과물이 저장될 디렉토리를 지정하고, `"init"` 명령어를 추가해 `pkg .` 명령어를 통해 빌드 수행을 하기 전 이전 빌드로 생성된 결과물을 삭제(`rm ./bin/*`)해서 빌드 폴더를 초기화해주는 작업을 추가로 지정하였다.

<br/>

다음은 package.json 파일에 pkg를 추가해 pkg 명령어를 실행할 때 전달할 옵션값들을 정의해준다.

```bash
"pkg":{
    "scripts": [
      "./server.js"
    ],
    "assets": [
      "views/**/*"
    ],
    "targets": [
      "node18-linux-x64",
      "node18-macos-x64"
    ]
  },
```

- `"scripts"` (위에서 정의했던 scripts와는 다름): 바이너리로 컴파일할 js파일들의 경로를 지정해준다. 내가 만든 프로젝트는 매우 간단하게 작성한 express 프로젝트였기 때문에 root경로에 있는 server.js 파일만 지정해주었다.
- `"assets"` : ejs 등 컴파일은 불필요하지만 실행파일에 포함되어야하는 파일들을 정의해준다. 나는 ejs 파일들이 저장되어있는 views 디렉터리를 지정해주었다.
- `"targets"` : 타겟 플랫폼을 지정하는 옵션이다. 아무것도 지정하지 않으면 windows, linux, macos 세 개의 실행파일이 저장된다. 나는 AWS 서버 위에 올릴 linux 외에 로컬에서 실행 테스트를 하기 위해 macos로도 실행파일을 생성하도록 지정하였다. 참고로 `node` 뒤에 있는 숫자는 사용할 노드 버전이며, 현재 사용하고 있는 노드 버전을 `node -v` 로 확인하여 지정해주면 된다.

<br/>

설정이 완료되면 아래 명령어를 실행해 실행 파일을 만들고, 만들어진 파일을 열어서 실행에 문제가 없는지 확인해준다.

```bash
npm run build
```

이렇게 빌드를 완료하게 되면 Linux에서 다른 의존성 없이도 node.js 프로젝트를 실행할 수 있다.

<br/>

이렇게 작성한 전체 package.json 파일은 다음과 같다.

```bash
{
  "name": "anyshopping",
  "version": "1.0.0",
  "description": "This is e-commerse website for Anycompany",
  "main": "server.js",
  "scripts": {
    "init": "rm ./bin/*",
    "start": "nodemon ./server.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "npm run init && pkg . --out-path bin"
  },
  "license": "ISC",
  "bin": "./server.js",
  "pkg":{
    "scripts": [
      "./server.js"
    ],
    "assets": [
      "views/**/*"
    ],
    "targets": [
      "node18-linux-x64",
      "node18-macos-x64"
    ]
  },
  "dependencies": {
    "dotenv": "^16.0.3",
    "ejs": "^3.1.8",
    "express": "^4.18.2",
    "mysql": "^2.18.1"
  },
  "devDependencies": {
    "pkg": "^5.8.0"
  }
}
```

<br/>