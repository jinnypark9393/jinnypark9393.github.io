---
emoji: 🐍
title:  Python 패스트캠퍼스 챌린지 67일차
date: '2022-07-18 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

지난 달 말 쯤 패스트캠퍼스에서 진행하던 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 캐시백 챌린지가 끝났다. 하지만 강의는 아직 들을 것들이 많이 남아서...^^ 캐시백 리워드는 없지만 셀프(?)로 1일 1포스팅 챌린지를 재개해보려 한다.

<br/><br/>

# 01. Django 웹 프레임워크의 이해

## 1. Why Django?

- 파이썬 웹 프레임워크 순위 2위(1위 Flask, 3위 FastAPI)
- Django의 철학
    - Batteries Included: 필요한 것이 무엇이건 Django안에, 커뮤니티 안에 있다는 뜻
    - 다양한 사용이 가능: 문서, SNS, 뉴스, 블로그 등
    - **안전하다**: ID/PW, 세션 관리, XSS, SQL Injection, Click Hijacking
    - Shared-nothing Architecture: 확장성(의존성이 없음) ex.
    - Very Maintainable - DRY(Don’t Repeat Yourself) - 불필요한 중복 코드 제거

<br/><br/>

## 2. References

- Pinterest
- Bitbucket
- Udemy
- Disqus
- Washington Post
- NASA
- Spotify
- JSfiddle
- Reddit
- Youtube
- National Geography
- Toss
- Delivery Hero Korea
- CoinBit
- 숨고
- Instagram

<br/><br/>

## 2. Django는 인기있는 프레임워크인가?

- StackOverflow 질문 수
    - Django (255,697개) vs Flask(111,246개)
- Indeed US Position 수
    - Django (2,164개) vs Flask(1,059개)

<br/><br/>

## 3. 프레임워크 vs 라이브러리

- Serving을 하게 되는 주체가 다름
- 프레임워크
    - 내 코드 > Django > Serving
        
        ⇒ Django가 내 코드를 가져다가 Serving (주체 = Django)
        
- 라이브러리
    - 라이브러리 > 내 코드 > Serving
        
        ⇒ 내 코드가 라이브러리를 가져다가 Serving (주체 = 내 코드)

<br/><br/>       

## 4. Django의 탄생

- Django는 한 신문사의 웹 팀에서 2003년부터 개발되었다.
- 공통 모듈과 코드, 패턴을 뽑아내 재사용
- 대중에 첫 선보인 날은 2005년 7월
- 오픈소스로 공개
- 2008년 9월 1.0 버전을 배포
- 현재는 3.0버전

<br/><br/>

## 5. Django의 구조

- User < → web server → [URLs.py](http://URLs.py) (유효한 URL인지 판단) → Views < - Template(렌더링)
- Other Services < → web server ← views ↔ Models
- → Reuquest
- ← Response

<br/>

- MVC 패턴 → MVT 패턴
    - Model
    - View
    - Template(Controller와 유사)

- 강의에서는 URLs.py와 View사이에 미들웨어를 전부 타고 들어가도록 설계 (로깅, 인증, 감시를 위한 목적)

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**

<br/><br/>