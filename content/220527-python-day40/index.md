---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 40일차'
date: '2022-05-27 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 3의 챕터 1. 강의 개요를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-05-27-Python-Photo1](/assets/images/2022-05-27-Python-Photo/2022-05-27-Python-Photo1.jpg)

![2022-05-27-Python-Photo2](/assets/images/2022-05-27-Python-Photo/2022-05-27-Python-Photo2.jpg)

<br/><br/>

# 1. HTML, CSS 그리고 JS

- HTML(Hyper Text Markup Language): 페이지의 제목, 문단, 표, 이미지, 동영상 등 **웹의 구조**를 담당.
- CSS(Cascading Style Sheets): 실제 화면에 표시되는 방법(색상, 크기, 폰트, 레이아웃 등)을 지정해 콘텐츠를 꾸며주는 **시각적인 표현(정적)** 담당
- JS(JavaScript): 콘텐츠를 바꾸고 움직이는 등 페이지를 동작시키는 **동적 처리**를 담당 (프로그래밍 언어)

# 2. 웹앱의 동작 원리

- 웹앱(Web Application) = 웹사이트(Website)
- 사용자(User) - 클라이언트(Client) <=> 서버(Server) - DB(Database)

- 사용자, 클라이언트가 요청을 보내면
- 서버, DB가 해당 요청에 대해 응답(HTML, CSS 파일 등을 전송)

# 3. 웹 표준과 브라우저

## 1. 웹 표준

- 웹 표준(Web Standard): 웹에서 사용되는 표준 기술이나 규칙. W3C의 표준화 제정 단계의 ‘권고안(REC)’에 해당하는 기술
- 크로스 브라우징(Cross Browsing): 조금은 다르게 구동되는 여러 브라우저에서, 동일한 사용자 경험(같은 화면, 같은 동작 등)을 줄 수 있도록 제작하는 기술, 방법.
    - 브라우저의 종류: 크롬(구글), 엣지(마이크로소프트), 사파리(애플), 웨일(네이버) 등
    - 과거에는 크로스 브라우징이 중요했으나, 현재는 브라우저간의 차이가 크지 않은 편이다.

## 2. 브라우저

- 웹 브라우저를 처음 구동하면 보이는 화면 전체: **창(Window)**
- 브라우저에서 여러개의 구분을 하는 기능: **탭(Tab)**
- 실제로 어떤 사이트에 접속할 것인지 주소를 입력하는 창: **주소창(Address bar)**
- 실제로 웹사이트가 출력되고 렌더링되는 영역: **뷰포트(Viewport)**

# 3. 특수 문자 용어

- 특수 문자의 영어/한글 이름과 키보드 위치를 알아보자.

- ``(Backtick 백틱, Grave 그레이브)` : 자바스크립트(Javascript) 사용 시 많이 이용된다.
- `~ (Tilde 틸드, 물결 표시)` : 영어 이름을 기억할 것.
- `! (Exclamation mark 엑스클러메이션, 느낌표)`
- `@ (At sign: 엣, 골뱅이)`
- `# (Sharp 샵, Number sign 넘버, 우물 정)`
- `$ (Dollar sign 달러)`
- `% (Percent sign 퍼센트)`
- `^ (Caret)` : 숫자 6 키로 입력
- `& (Ampersand 엠퍼센드)` : 엠퍼센트 아님
- `* (Asterisk 에스터리스크, 별표)`
- `- (Hyphen 하이픈, Dash 대시, 마이너스)`
- `_ (Underscore 언더스코어, Low dash 로대시, 밑줄)`
- `= (Equals sign 이퀄, 동등)`
- `" (Quotation mark 쿼테이션, 큰 따옴표)`
- `' (Apostrophe 아포스트로피, 작은 따옴표)`
- `: (Colon 콜론)`
- `; (Semicolon 세미콜론)`
- `, (Comma 콤마, 쉼표)`
- `. (Period 피리어드, Dot 닷, 점, 마침표)` : dot이 제일 많이 쓰임
- `? (Question mark 퀘스천, 물음표)`
- `/ (Slash 슬래시)`
- `\ (Backslash 백슬래시, 역 슬래시)`
- `| (Vertical Bar: 버티컬 바)`
- `() (Parenthesis 퍼렌서시스, 소괄호, 괄호)`
- `{} (Brace 브레이스, 중괄호)`
- `[] (Bracket 브래킷, 대괄호)`
- `<> (Angle Bracket 앵글 브래킷, 꺽쇠괄호)`

<br/><br/>

이번 포스팅에서는 강의의 파트 3로 넘어가서 강의 개요를 정리해보았다. 다음 포스팅에서는 HTML의 기본문법을 들어보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**