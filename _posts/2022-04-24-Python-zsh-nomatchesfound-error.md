---

published: true
title:  "[Python/VScode]MacOS zsh: no matches found 에러 해결"
excerpt: "zsh에서는 몇몇 특수문자를 문자열이 아닌 명령어로 인식한다."

categories:
- Programming
tags:
- [패스트캠퍼스, 파이썬에러, zsh에러, nomatchesfound에러, 파이썬특수문지, 파이썬, Python, vscode에러, Python에러]

toc: true
toc_sticky: true

date: 2022-04-24
last_modified_at: 2022-04-24

---

<br/><br/>

*💡   zsh에서는 몇몇 특수문자를 문자열이 아닌 명령어로 인식한다.*

<br/><br/>

# 1. 에러 상황

한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online 과정을 들으며 vscode에 코드를 작성하던 중, 아래와 같이 파이썬(Python) 코드가 실행이 되지 않는 현상이 발생했다.

<br/>

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter4/02.연산(2).py
zsh: no matches found: /Users/usr/Documents/python_basic/myvenv/Chapter4/02.연산(2).py
```

<br/>

zsh에서 파이썬 파일 경로를 찾지 못하고 있었는데, 구글링을 해보니 zsh에서 몇몇 특수문자를 문자열이 아닌 명령어로 인식해 발생한 현상이라고 한다.

<br/><br/>

# 2. 해결 방법

내 경우에는 괄호 `()` 가 명령어로 인식되어 발생한 문제라, 다음과 같이 파일명에 괄호를 제거하고 `-` 를 넣어주었더니 에러가 해결되었다.

<br/>

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyt
hon_basic/myvenv/bin/python /Users/usr/Documents/
python_basic/myvenv/Chapter4/02.연산-2.py
```

<br/>

참고로 zsh 에서 명령어로 예약된 특수문자는 다음과 같다. `zsh: no matches found` 에러가 발생할 경우 파일명이나 디렉토리명 등 파이썬 코드가 저장된 경로에 아래의 특수문자가 삽입되어있지 않은지 확인해보자.

<br/>

| 특수문자 | 의미 |
| --- | --- |
| ~ | 홈 디렉토리 |
| ` | 명령 대체 |
| # | Comment |
| () | 하위 셸 시작 / 종료 |
| `|` | 파이프 |
| {} | 명령 블록 |
| ‘ | 강한 인용부호 |
| < | 입력 재지정 |
| / | 경로명 분리 |
| $ | 변수 |
| & | 백그라운드 실행 |
| *? | 와일드카드 |
| \ | 문자 그대로 |
| [] | 문자 집합 |
| ; | 명령 분리 |
| “ | 약한 인용부호 |
| > | 출력 재지정 |
| ! | NOT |
