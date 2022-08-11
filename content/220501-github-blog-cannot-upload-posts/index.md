---
emoji: 🍒
title:  'Github Pages/Blog - 포스팅 게시 안됨 이슈 해결'
date: '2022-05-01 06:00:00'
author: jinnypark9393
tags: githubpages
categories: BLOG
---

# 1.[Github Pages/Blog]포스팅 게시 안됨 이슈 해결

<br/>

*💡  Github Pages에 포스팅이 게시가 안될 경우, 올바른 포스팅 파일 이름규칙, future=true, published=true 옵션을 적용해보자.*

<br/><br/>

## 1. 에러 상황

패스트캠퍼스 챌린지 Day3 포스팅을 작성한 뒤, 깃헙 블로그 레파지토리에 push 를 했음에도 불구하고 github 블로그에 해당 페이지가 올라오지 않는 이슈가 있었다.

<br/>

원래 Github에 코드를 push한 뒤, 실제 페이지에 반영되기까지 빠르면 1~2분, 길게는 30분까지도 걸린다고는 하지만 내 포스팅은 1시간이 넘도록 올라오지 않았다.

<br/>

참고로 내 환경은 다음과 같다.

- MacOS Monterey 12.3.1
- VMware Fusion 12.1.2
- Ubuntu 20.04
- Git 2.25.1

<br/><br/>

## 2. 해결 방법

‘깃허브 블로그 포스팅 안됨 에러' 키워드로 구글링 하다가 세 가지 방법을 시도해봤는데, 나에게는 그 중 마지막 방법인 `published: true` 설정이 유효했다.

<br/>

### 1. 포스팅의 Naming Convention 지키기

Github Pages의 경우, 포스트의 네이밍 컨벤션이 `YYYY-MM-DD-포스팅-제목.md` 로 정해져있고, 이를 어길 시에는 포스팅이 제대로 올라가지 않는다. 

<br/>

참고로 이 파일명을 가지고 Jekyll에서 페이지를 생성하게 되면, `http://username.github.io/YYYY/MM/DD/category/포스팅-제목` 형태로 url이 생성된다.

<br/>

따라서 아래 두 가지를 반드시 유의해야한다.

- 포스팅 제목 맨 앞에 YYYY-MM-DD 형태로 날짜를 입력했는가
- 포스팅 파일명은 해당 깃허브 저장소의 `_posts` 디렉토리 내에서 반드시 유일해야한다.

<br/>

나는 이 내용을 몰랐지만 post 폴더 내의 파일을 관리할 때 우연히 YYYY-MM-DD 형태로 파일 이름을 설정했던 터라 다행히도(?) 이 부분은 수정할 필요가 없었다.

<br/><br/>

### 2. `_config.yaml` 파일에 `future: true` 추가

구글링을 해보니 `config.yaml` 파일에 `future: true` 를 추가해보라는 글이 있어서 추가해보았으나 나에게는 효과가 없었다.

<br/>

`future: true` 옵션은 현재 시스템 시간보다 더 뒤의 일자로 포스팅 발행일을 선택했을 때 (예를 들어 시스템 시간은 2022년 4월 28일이나 포스팅 발행일을 2022년 4월 29일로 입력) 포스팅이 올라가도록 허용해주는 옵션이다.

<br/>

예상컨대 나와 같이 가상머신 환경에서 가상머신의 Timezone이 한국보다 늦은 경우, 시차때문에 일자에 오류가 생길 경우에는 유효할 듯 하지만, 나는 이미 가상머신과 실제 Timezone을 맞춰놨기 때문에 그러한 오류는 발생하지 않았다.

<br/><br/>

### 3. 포스팅 내에 `published: true` 옵션 추가 (유효)

마지막으로 내가 작성한 포스팅의 정보란에 `published: true` 로 설정해 발행 여부를 명시할 수 있는데, 나의 경우에는 이 옵션이 유효했다.

<br/>

아래는 내가 [수정했던 마크다운 파일](https://github.com/jinnypark9393/jinnypark9393.github.io/blob/main/_posts/2022-04-20-Python-%ED%8C%A8%EC%8A%A4%ED%8A%B8%EC%BA%A0%ED%8D%BC%EC%8A%A4-%EC%BA%90%EC%8B%9C%EB%B0%B1-%EC%B1%8C%EB%A6%B0%EC%A7%80-3%EC%9D%BC%EC%B0%A8.md) 일부를 발췌한 것이다.


```markdown
---
published: true
title:  "[Python]패스트캠퍼스 캐시백 챌린지 3일차"
excerpt: "패스트캠퍼스 캐시백 챌린지 3일차: 한 번에 끝내는 파이썬 웹개발 초격차 패키지 Online"

categories:
  - Programming
tags:
  - [패스트캠퍼스, 패캠챌린지, 직장인인강, 직장인자기계발, 패스트캠퍼스후기, 캐시백챌린지, 캐시백, 환급챌린지, 한번에끝내는파이썬웹개발초격차패키지Online]

toc: true
toc_sticky: true
 
date: 2022-04-20
last_modified_at: 2022-04-20
---

(이하 포스팅 내용)
```

<br/>

이후에는 같은 문제가 발생할까 걱정되어 미리 `published: true` 옵션을 기본으로 넣은 채로 포스팅 문서를 작성하고 있는데, 이 이후에는 같은 문제가 발생하지 않았다.

<br/>