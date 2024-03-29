---
emoji: 💫
title:  '리눅스(Linux) 다중 명령어(;, &&, ||)'
date: '2022-12-13 09:12:00'
author: jinnypark9393
tags: linux
categories: devops
---

# 1. 배경 상황

Node.js 프로젝트를 진행하다가 package.json에 npm 명령어를 정의해주고 있었는데, 초기에 빌드 아웃풋 폴더 내의 파일을 삭제한 뒤에 빌드를 실행하도록 명령어를 아래와 같이 지정해주었었다.

```bash
"scripts": {
    "init": "rm ./bin/*",
    "start": "nodemon ./server.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "npm run init; && pkg . --out-path bin"
  },
```

<br/>

하지만 bin에 아무 파일이 없는 상태에서 실행하니 아래와 같은 에러가 발생해서 다중 명령어를 `&&` 에서 `;` 로 고쳐주었다(뭔가 init쪽 명령어를 고쳐주는 게 좋을 것 같은데 나중에 더 찾아보기로).

```bash
rm: ./bin/*: No such file or directory
```

<br/>

# 2. 리눅스(Linux) 다중 명령어 차이

리눅스 쉘에서 다중 명령어를 사용하면 하나의 라인에서 여러 명령어를 실행할 수 가 있는데, 다중 명령어를 실행하는 `;` , `&&` , `||` 세 명령어 사이에 차이가 있어 정리해두려 한다.

1. 세미콜론(`;`)
    
    선행 명령어의 성공, 실패 여부와 관계 없이 모든 명령어를 실행한다.
    
    ```bash
    $ 명령1; 명령2; 명령3; ...
    ```
    
    - 명령 2이 실패하더라도 명령 3이후의 명령어가 실행된다.

<br/>

2. 엠퍼센트(`&&`)
    
    앞에서부터 순차적으로 실행 되고, 선행 명령어가 **실패**할 경우, 뒤의 명령어를 실행하지 않는다.
    
    ```bash
    $ 명령1 && 명령2 && 명령3 && ...
    ```
    
    - 명령 2가 실패할 경우 명령 3 이후는 실행되지 않는다.

<br/>

3. 더블 버티컬바(`||`)
    
    앞에서부터 명령어가 순차적으로 실행되고, 선행 명령어가 **성공**할 경우, 뒤의 명령어를 실행하지 않는다.
    
    ```bash
    $ 명령1 || 명령2 || 명령3 || ...
    ```
    
    - 명령 2가 성공할 경우 명령 3 이후는 실행되지 않는다.

<br/>