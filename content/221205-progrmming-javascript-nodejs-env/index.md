---
emoji: 💫
title:  'Node.js 프로젝트에서 환경변수 관리하기(파일로 분리)'
date: '2022-12-05 08:59:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

# 1. 배경상황

급하게 FE+BE가 간단하게 구성된 데모 사이트를 만들어야 할 일이 생겨서 Node.js + Express 프레임워크로 웹사이트를 작성하던 도중 환경 변수 파일 분리가 필요해서 기록용으로 남겨본다.

<br/>

이전에 [Django 의 SECRET_KEY를 별도 파일로 분리 저장하는 포스팅](https://jinnypark9393.github.io/220725-programming-python-django-tutorial2%20copy/)을 올린 적이 있는데, 이번에는 해당 포스팅의 Node.js 버전이라고 보면 될 듯.

<br/>

# 2. Node.js 프로젝트에서 환경변수 관리하기(파일로 분리)

- server.js 코드

```jsx
var db;
MongoClient.connect('mongodb+srv://blablabla', function(err, client){
  if (err) return console.log(err)
  db = client.db('Example1');
  app.listen(8080, function() {
    console.log('listening on 8080')
  })
})
```

<br/>

- 여기서 포트번호, DB접속 문자열은 환경에 따라 가변적인 변수, 즉 **환경변수(environment variable)**
    
     ⇒ 다른 개발 환경에서는 수정이 필요할 수 있음 = **한 곳에 모아서 관리하자!**
    
    - 다른 컴퓨터에서 다른 포트 사용
    - DB 이사가서 DB 접속 문자열 면경
    - 내가 만든 코드를 팀원과 공유할 때 유출 위험

<br/>

- 환경 변수 사용을 위한 라이브러리 설치
    
    ```
    ➜  todoapp git:(master) ✗ npm install dotenv                                 
    
    added 1 package, and audited 179 packages in 636ms
    
    14 packages are looking for funding
      run `npm fund` for details
    
    found 0 vulnerabilities
    ```
    
<br/>

- server.js 파일 상단에 아래 코드 추가
    
    ```jsx
    // 환경변수 설정용 라이브러리 설정
    require('dotenv').config()
    ```
    
<br/>

- server.js와 같은 경로에 .env파일 추가 & 환경변수들을 적고 저장한다.
    
    ```
    PORT=8081
    DB_URL="mongodb+srv://blablabla"
    ```
    
    - 변수 이름은 일반적으로 대문자료 표기한다.

<br/>

- 환경변수를 server.js에 불러오기
    - process.env.변수명 형식으로 불러오면 된다.
        
        ```jsx
        var db;
        MongoClient.connect(procss.env.DB_URL, function(err, client){
          if (err) return console.log(err)
          db = client.db('Example1');
          app.listen(procss.env.PORT, function() {
            console.log('listening on 8080')
          })
        })
        ```

<br/>