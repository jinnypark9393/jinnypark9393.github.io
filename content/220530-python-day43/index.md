---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 43일차'
date: '2022-05-30 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 3의 주요 요소, 정보 태그를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-05-30-Python-Photo1](/assets/images/2022-05-30-Python-Photo/2022-05-30-Python-Photo1.jpg)

![2022-05-30-Python-Photo2](/assets/images/2022-05-30-Python-Photo/2022-05-30-Python-Photo2.jpg)

<br/><br/>

# 04. 주요 요소

- ‘html’이라는 폴더를 생성해 vscode에서 실습을 해보자.
    - Tip: 폴더명을 작성할때는 가능하면 영문/숫자로만 작성하자

<br/>

- `index.html` 파일을 생성하자.
    - index ⇒ 브라우저에서 사이트에 접속할 때 최우선으로 오픈하는 파일
    - 느낌표 `(!)` 키 + 탭 키 ⇒ 기본적은 html 양식이 입력됨

```python
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

- html이라는 요소 하위에
    - head, body라는 자식요소가 들어있다.
    - head라는 요소에는 meta, title이라는 요소로 구성되어있다.
        - meta ⇒ 빈태그
    - head, body요소 안에 내용을 작성해 html파일을 완성해보자.

<br/><br/>

# 05. 주요 요소 정리 - 정보 태그

```python
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="./main.css" />
    <meta charset="UTF-8">
    <meta name="author" content="CANARY">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        div {
            color: red;
        }
    </style>
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

- `<html>` : 문서의 **전체** 범위. HTML문서가 어디에서 시작하고, 어디에서 끝나는지 알려주는 역할
- `<head>` : 문서의 **정보**를 나타내는 범위. 웹 브라우저가 해석해야 할 웹 페이지의 제목, 설명, 사용할 파일 위치, 스타일(CSS)같은 웹페이지의 보이지 않는 정보를 작성하는 범위
    - `<meta />` : HTML문서(웹페이지)의 제작자, 내용, 키워드 같은 여러 정보를 검색엔진이나 브라우저에 제공
        - `charset` : 문자 인코딩 방식 (ex. UTF-8)
        - `name` : 정보의 종류
        - `content` : 정보의 값
    - `title` : HTML 문서의 제목(title)을 정의 ⇒ 웹브라우저 탭에 표시됨
    - `<link />` : 외부 문서를 가져와 연결할 때 사용(대부분 CSS파일).
        - `rel` : 가져올 문서와의 관계(**필수 속성**)
        - `href` : Hypertext REFerence. 가져올 문서의 경로
    - `<style>` : 스타일(CSS)를 HTML 문서 안에서 작성하는 경우 사용(권장되지 않음)
    - `<script>` : 외부에서 가져오거나, HTML문서 내에서 작성하는 경우 모두 사용.
        - `<script src="./main.js"></script>` : 외부에서 자바스크립트(JS)파일을 가져오는 경우
        - `<script>console.log('Hello World!')</script>` : 자바스크립트(JS)를 HTML 문서 안에서 작성하는 경우
- `<body>` : 문서의 **구조**를 나타내는 범위. 사용자 화면을 통해 보여지는 로고, 헤더, 푸터, 네비게이션, 메뉴, 버튼, 이미지와 같은 웹페이지의 보여지는 구조를 작성하는 범위
- `<!DOCTYPE html>` : 문서의 HTML 버전을 지정. DOCTYPE(DTD, Document Type Definition)은 마크업 언어에서 문서 형식을 정의하며, 웹 브라우저가 어떤 HTML 버전의 해석 방식으로 웹페이지를 이해하면 되는지 알려주는 용도. (HTML 1, 2, 3, 4, XHTML, **HTML5(표준)**)

<br/><br/>

이번 포스팅에서는 강의의 파트 3의 HTML 글자와 상자를 정리해보았다. 다음 포스팅에서는 HTML의 주요 요소를 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**