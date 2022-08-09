---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 42일차'
date: '2022-05-29 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 3의 글자와 상자를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-05-29-Python-Photo1](/assets/images/2022-05-29-Python-Photo/2022-05-29-Python-Photo1.jpg)

![2022-05-29-Python-Photo2](/assets/images/2022-05-29-Python-Photo/2022-05-29-Python-Photo2.jpg)

<br/><br/>

# 03. 글자와 상자

- **글자와 상자**: 요소가 화면에 출력되는 특정. 크게 2가지로 구분된다.
    - **인라인(Inline) 요소**: 글자를 만들기 위한 요소들
    - **블록(Block) 요소**: 상자(레이아웃)를 만들기 위한 요소들
    - 참고: 글자를 제외한 모든 요소들을 **레이아웃(layout)**이라고 부른다.

<br/><br/>

## 1. 인라인(Inline) 요소

```html
<span>Hello</span>
<span>World</span>
```

- `<span></span>`: 대표적인 인라인 요소. 본질적으로 아무것도 나타내지 않는, 콘텐츠 영역을 설정하는 용도.

<br/>

- 출력 결과

```html
Hello World
```

- 요소가 수평으로 쌓이게 된다.
- 인라인 요소는 포함한 콘텐츠 크기만큼 **자동으로 줄어들게** 된다(가로세로 상관없이).

<br/>

```html
<span style="width: 100px;">Hello</span>
<span style="height: 100px;">World</span>
```

- `width: 100px;` : 요소의 가로 너비를 지정하는 CSS 속성
- `height: 100px;` : 요소의 세로 너비를 지정하는 CSS 속성
- CSS 속성을 지정해도 인라인 요소에는 반응이 없다: **요소의 크기를 지정할 수 없다**.

<br/>

```html
<span style="margin: 20px 20px;">Hello</span>
<span style="padding: 20px 20px;">World</span>
```

- `margin: 20px 20px;` : 요소의 외부 여백을 지정하는 CSS 속성
- `padding: 20px 20px;` : 요소의 내부 여백을 지정하는 CSS 속성

<br/>

- 출력 결과

```html
<-20px-> Hello <-20px-><-20px-> World <-20px>
```

- 인라인 요소는 좌우여백은 지정할 수 있지만 세로 여백은 지정할 수 없다.

<br/>

```html
<span><div></div></span> # 불가능
<div><span></span></div> # 가능
```

- `<인라인><블록></블록></인라인>` : 불가능
- `<블록><인라인></인라인></블록>` : 가능

<br/><br/>

## 2. 블록(Block) 요소

```html
<div>Hello</div>
<div>World</div>
```

- `<div></div>` : 대표적인 블록요소. 본질적으로 아무것도 나타내지 않는, 콘텐츠 영역을 설정하는 용도

<br/>

- 출력 결과

```html
Hello
World
```

- 요소가 수직으로 쌓인다.
- **가로 너비**: 부모 요소의 크기만큼 **자동으로 늘어남**
- **세로 너비**: 포함한 컨텐츠 크기만큼 **자동으로 줄어듬**

<br/>

```html
<div style="width: 100px;">Hello</div>
<div style="height: 100px;">World</div>
```

- 요소의 가로, 세로 너비를 지정해보자.

<br/>

```html
<--------100px-------->
Hello
World^
     |
    40px
     |
```

- style 로 지정한 만큼 요소의 가로, 세로 너비가 조정된다.

<br/>

```html
<div style="margin: 10px;">Hello</div>
<div style="padding: 10px;">World</div>
```

- 요소의 내부, 외부 여백도 마찬가지로 잘 적용된다.

<br/>

```html
<div><div></div></div>
<div><span></span></div>
```

- `<블록><블록></블록></블록>` : 가능
- `<블록><인라인></인라인></블록>` : 가능

<br/><br/>

이번 포스팅에서는 강의의 파트 3의 HTML 글자와 상자를 정리해보았다. 다음 포스팅에서는 HTML의 주요 요소를 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**