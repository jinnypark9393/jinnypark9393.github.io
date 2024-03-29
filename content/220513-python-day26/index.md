---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 26일차'
date: '2022-05-13 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 9-1. 모듈을 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-13-Python-Photo1](/assets/images/2022-05-13-Python-Photo/2022-05-13-Python-Photo1.jpg)

![2022-05-13-Python-Photo2](/assets/images/2022-05-13-Python-Photo/2022-05-13-Python-Photo2.jpg)

<br/><br/>

# 01. 모듈

## 1. 모듈을 사용하는 이유

- 프로그램을 기능별로 파일을 나누어 유지보수 등 관리를 편하게 할 수 있기 때문

<br/><br/>

## 2. 모듈의 개념

- 한 개의 완성된 프로그램 파일

<br/><br/>

## 3. 파이썬 기본 모듈 사용방법

- 파이썬의 기본 모듈을 사용해보자.

```python
import 모듈이름
모듈이름.변수
모듈이름.함수()

# 예시 1
import math
print(math.pi)
print(math.ceil(5.7)) # 올림 함수

# 예시 2: 뒤의 메소드, 변수 이름으로 그대로 작성할 수 있게 하는 방법
from math import pi, ceil
print(pi)
print(ceil(5.7))
```

<br/><br/>

## 4. 파이썬 외부 모듈 사용방법

- 파이썬 외부의 모듈을 사용해보자.

```python
pip install 모듈이름

pip install pyautogui
```

<br/><br/>

## 5. 모듈 만들기 실습

### 1. 내장모듈

- 내장모듈: 파이썬 설치 시 자동으로 설치되는 모듈
- 파이썬 내장 모듈을 사용해보자.

```python
# 내장 모듈
# : 파이썬 설치 시 자동으로 설치되는 모듈

from math import pi, ceil as c
print(pi)
print(c(5.7))
```

- from math import pi를 쓰면 math.pi라고 쓰지 않고 pi만 써도 모듈이 실행된다.
- 모듈을 간단한 이름으로 변경하여 사용하고 싶은 경우 `as` 뒤에 사용하고 싶은 이름을 작성하면 적용된다.

<br/><br/>

### 2. 외부 모듈

- pyautogui 공식 홈페이지 Documentation 페이지에 접속한다.
    - 홈페이지에 나와있는대로 `pip install pyautogui` 명령어를 터미널 창에 입력한다.

```python
(myvenv) ➜  python_basic pip install pyautogui
Collecting pyautogui
  Downloading PyAutoGUI-0.9.53.tar.gz (59 kB)
     ━━━━━━━━━━━━━ 59.0/59.0 KB 987.7 kB/s eta 0:00:00
  Preparing metadata (setup.py) ... done
Collecting pymsgbox
  Downloading PyMsgBox-1.0.9.tar.gz (18 kB)
...
(생략)
...
```

<br/>

- 설치가 완료되면 import 로 pyautogui를 불러온다(별칭 pg로 설정).

```python
# 외부 모듈
# : 다른 사람이 만든 파이썬 파일을 pipfh 설치해서 사용
# pyautogui (공식 홈페이지: https://pyautogui.readthedocs.io/en/latest/)
import pyautogui as pg
```

<br/>

- pyautogui 홈페이지([https://pyautogui.readthedocs.io/en/latest/](https://pyautogui.readthedocs.io/en/latest/))에서 Example 중 하나를 실행해보자
    - **`>>>** pyautogui.moveTo(500, 500, duration=2, tween=pyautogui.easeInOutQuad)  *# Use tweening/easing function to move mouse over 2 seconds.*`

```python
pg.moveTo(500, 500, duration=2)
# 화면의 500 * 500 위치에 마우스를 2초간 이동하라는 명령어
```

- 실행결과: 마우스를 건드리지 않아도 자동으로 500*500 위치로 이동한다.
- MacOS의 경우 vscode가 컴퓨터 시스템을 제어할 수 있도록 권한을 부여해야 실행이 가능하다.

<br/><br/>

이번 포스팅에서는 모듈에 대해 알아보았다. 다음 포스팅에서는 파이썬 모듈을 만들어보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**