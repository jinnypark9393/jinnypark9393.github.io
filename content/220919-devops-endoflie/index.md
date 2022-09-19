---
emoji: 💫
title:  '각종 언어 및 프레임워크의 수명(End of Life) 확인하기'
date: '2022-09-19 13:48:00'
author: jinnypark9393
tags: endoflife
categories: 데브옵스
---

# 1. 배경 상황

이전 프로젝트에서 Open JDK 특정 버전에 대한 수명을 찾아보려고 자료를 찾다가 유용한 사이트를 발견하여 기록해 두려 한다.

제품 수명의 만료에는 EOL(End of Life)과 EOS(End of Service/End of Sales)크게 두 가지 종류가 있으며, 보통 EOS 을 선언 한 뒤 일정 기간 뒤 EOL을 선언하게 된다.

<br/>

- **EOS(End of Service/End of Sales)**
    
    제조사에서 공식적으로 해당 서비스 / 소프트웨어에 대한 생산 및 판매를 중단한다는 뜻이다.
    
    제품에 대한 신규 판매가 중단된다는 뜻으로 기존 판매된 제품에 대한 버그 수정, 업데이트 혹은 지원 등은 계속해서 제공 될 수 있다.
    
- **EOL(End of Life)**
    
    제조사에서 공식적으로 지원을 중단한다는 뜻이다.
    
    이 시점 이후 신규 기능 추가, 성능 개선, 보안 취약점 대응 등의 지원이 불가하다.
    
<br/>

# 2. 각종 언어 및 프레임 워크의 수명 확인하기

이러한 각종 소프트웨어 서비스에 대한 EOS/EOL 정보는 각 제조사에 들어가면 확인할 수 있지만, 여러 소프트웨어의 수명 주기에 대한 정보를 한 사이트에 정리해 둔 곳이 있다(자원봉사자들에 의해 관리되는 곳으로 최신 정보인지에 대해서는 검증이 필요할 것 같긴 하다).

<br/>

- endoflife.date 웹사이트: [endoflife.date](http://endoflife.date)

<br/>

위 웹페이지에서 NGINX나 Ubuntu, OpenJDK, Kubernetes 등의 제품에 대한 수명을 간단히 확인할 수 있다.

<br/>