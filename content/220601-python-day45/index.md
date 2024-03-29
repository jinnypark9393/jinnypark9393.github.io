---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 45일차'
date: '2022-06-01 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 파트 3의 CSS 기본 문법을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진. 

<br/>

![2022-06-01-Python-Photo1](/assets/images/2022-06-01-Python-Photo/2022-06-01-Python-Photo1.jpg)

![2022-06-01-Python-Photo2](/assets/images/2022-06-01-Python-Photo/2022-06-01-Python-Photo2.jpg)

<br/><br/>

# 06. 주요 요소 정리 - 구조 태그

```python
<!DOCTYPE html>
<html lang="en">
<head></head>
<body>
    <div>
        <h1>오늘의 날씨</h1>
        <p>중부 집중 호우, 남부는 열대야, 12호 태풍 북상 중..</p>
        <img src="img/weather.jpg" alt="12호 태풍" />
    </div>
</body>
</html>
```

- `<div>` : 블록(상자) 요소. 특별한 의미가 없는 구분을 위한 요소. (Division)
- `<h1>` : 블록(상자) 요소. 제목을 의미하는 요소. (Heading)
    - h1~h6번까지 값을 가질 수 있다. 숫자가 작을수록 더 중요한 제목을 정의
- `<p>` : 블록(상자) 요소. 문장을 의미하는 요소. (Paragraph)
- `<img src="" alt=""/>` : 인라인(글자) 요소. 이미지를 삽입하는 요소(Image)
    - `src` ⇒ 삽입할 이미지의 경로 (**필수** 속성)
    - `alt` ⇒ 삽입할 이미지의 이름 (**필수** 속성). 대체 텍스트(이미지가 정상 출력되지 않았을 때 출력된다)

<br/>

```python
<!DOCTYPE html>
<html lang="en">
<head></head>
<body>
    <div>
        <ul>
            <li>사과</li>
            <li>딸기</li>
            <li>수박</li>
            <li>오렌지</li>
        </ul>
    </div>
</body>
</html>
```

- `<ul>` : 블록(상자) 요소. 순서가 필요없는 목록의 집합을 의미. (Unordered List)
- `<li>` : 블록(상자) 요소. 목록 내 각 항목. (List Item)

<br/>

```python
<!DOCTYPE html>
<html lang="en">
<head></head>
<body>
    <a href="https://www.naver.com">NAVER</a>
    <a href="https://www.google.com" target="_blank">Google</a>
</body>
</html>
```

- `<a>` : 인라인(글자) 요소. 다른/같은 페이지로 이동하는 **하이퍼링크**를 지정하는 요소. (Anchor)
    - `href` : 링크 URL
    - `target` : 링크 URL의 표시(브라우저 탭) 위치 (_blank를 입력한 경우 새 창에서 링크 URL에 접속하게 된다)
    - 일반적으로 인라인 요소에는 블록 요소를 넣을 수 없지만, a 태그의 경우 예외적으로 단 한개의 블록 요소를 넣을 수 있다.

<br/>

```python
<!DOCTYPE html>
<html lang="en">
<head></head>
<body>
    <span>동해물</span>과 백두산이 마르고 닳도록
</body>
</html>
```

- `<span>` : 인라인(글자) 요소. 특별한 의미가 없는 구분을 위한 요소 (vs `<div>`)
    - 구분을 한 뒤, css로 해당 부분에만 스타일을 적용해줄 수 있다.

<br/>

```python
<!DOCTYPE html>
<html lang="en">
<head></head>
<body>
    동해물과 백두산이<br/>마르고 닳도록
</body>
</html>
```

- `<br/>` : 인라인(글자) 요소. 줄바꿈 요소. (Break)

<br/>

```python
<!DOCTYPE html>
<html lang="en">
<head></head>
<body>
    <input type="text" value="CANARY!" />
</body>
</html>
```

- `<input>` : 인라인(글자)요소, 블록(상자) 요소 ⇒ Inline-block요소
    - 사용자가 데이터를 입력하는 요소.
    - `type` : 입력받을 데이터의 타입
    - `value` : 미리 입력된 값(데이터)
        - 혹은 `placeholder` 라는 속성으로 사용자가 입력할 값(데이터)의 힌트를 줄 수도 있다.
        - 혹은 `disabled` 로 입력 요소를 비활성화 할 수 도 있다(자바스크립트로 입력요소를 상황에 맞게 활성/비활성화 할 때 사용한다)

<br/><br/>

# 07. 주석과 전역 속성

## 1. 주석

```python
<!DOCTYPE html>
<html lang="en">
<head></head>
<body>
    <div>
        <!-- 애국가 -->
        <img src="img/korean_flag.jpg" alt="태극기">
        <h1>애국가</h1>
        <p>동해물과 백두산이 마르고 닳도록</p>
    </div>
</body>
</html>
```

- 주석: <!—Comment—>
    - 수정사항이나 설명 등을 작성(주석).
    - 브라우저는 이 태그를 해석하지 않기 때문에 화면에 내용이 표시되지 않음
    - 단축키: Windows ⇒ `Ctrl` + `/` , MacOS ⇒ `Cmd` + `/`

<br/><br/>

## 2. 전역 속성

- 전역 속성(Global Attribute): 태그 종류에 상관 없이 요소의 속성값을 정의할 수 있다.

<br/>

## <태그 style=”스타일”></태그>

- 요소에 적용할 스타일(CSS)를 지정

<br/>

## <태그 class=”이름”></태그>

- 요소를 지칭하는 **중복 가능**한 이름
- css와 javascript로 해당 속성을 찾아 효과를 적용한다.

<br/>

## <태그 id=”이름”></태그>

- 요소를 지칭하는 **고유한** 이름

<br/><br/>

이번 포스팅에서는 강의의 파트 3의 CSS 기본 문법을 정리해보았다. 다음 포스팅에서는 CSS의 선택자를 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**