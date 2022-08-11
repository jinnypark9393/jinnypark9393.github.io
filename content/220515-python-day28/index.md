---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 28일차'
date: '2022-05-15 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 9-3. 패키지를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-15-Python-Photo1](/assets/images/2022-05-15-Python-Photo/2022-05-15-Python-Photo1.jpg)

![2022-05-15-Python-Photo2](/assets/images/2022-05-15-Python-Photo/2022-05-15-Python-Photo2.jpg)

<br/><br/>


# 03. 패키지

## 1. 패키지의 개념

- 관련있는 모듈을 **하나의 폴더**로 구성해 놓은 것.

<br/><br/>

## 2. 패키지 만들고, 사용하기

- 디렉토리(=폴더) 구조

```python
- startcoding / 
    unit /
        __init__.py
        character.py
        item.py
        monster.py
    main.py
```

<br/>

- VScode로 이동해 Chapter9 폴더 밑에 startcoding, startcoding 하위에 unit 폴더를 생성 및 위 디렉토리 구조대로 파일생성
    - Tip: unit 폴더 생성 시 `startcoding/unit` 이라는 컴팩트폴더 형식으로 폴더가 표시되는데, 이를 해제하려면 `File > Preference > Settings` (MacOS의 경우 `Code > Preference > Settings` ) 에 들어가 `compact` 라고 검색한 뒤, `Explorer: Compact Folders` 라는 항목의 체크박스를 해제해주면 폴더가 트리형식으로 표시된다.

<br/>

- 디렉토리 및 파일 생성이 완료되면 이런 형태가 된다.
    
    ![2022-05-15-Python-Photo3](/assets/images/2022-05-15-Python-Photo/2022-05-15-Python-Photo3.png)
    
<br/>

- unit 패키지 안의 모듈부터 작성해보자. 먼저 `character.py`를 아주 간단하게 Print 문으로만 구성해 작성해보자.

```python
def test():
    print("this is a character module")
```

<br/>

- item, monster 모듈도 동일 요령으로 작성하자.

```python
def test():
    print("this is a item module")
```

```python
def test():
    print("this is a monster module")
```

<br/>

- 이렇게 작성한 위 모듈들을 main.py에서 불러오자.

```python
# 1. import 패키지.모듈
import unit.character
```

<br/>

- “unit.character” is not accessed: Import “unit.character” could not be resolved Pylance(reportMissingImports) 라는 에러메시지가 발생
    - startcoding이라는 새로운 폴더를 만들었기 때문
    - `File > Preference > Settings` (MacOS의 경우 `Code > Preference > Settings` ) 에서 아래 빨간색 박스로 표시한 아이콘을 클릭
        
        ![2022-05-15-Python-Photo4](/assets/images/2022-05-15-Python-Photo/2022-05-15-Python-Photo4.png)
    
    <br/>
        
    - settings.json 파일에서 "python.analysis.extraPaths” 에 startcoding으로 향하는 경로를 추가한다.
    
    ```python
    {
        "python.pythonPath": "/anaconda3/bin/python",
        "editor.unicodeHighlight.allowedCharacters": {
            " ": true
        },
        "python.analysis.extraPaths": ["./myvenv/Chapter9", "./myvenv/Chapter9/startcoding"],
        "liveSassCompile.settings.formats": [
            {
                "format": "expanded",
                "extensionName": ".css",
                "savePath": "/assets/css/"
            }
        ],
        "pasteImage.basePath": "${currentFileDir}/images/",
        "pasteImage.prefix": "./",
        "liveServer.settings.donotShowInfoMsg": true,
        "editor.fontSize": 15,
        "window.zoomLevel": 1,
        "explorer.compactFolders": false
    }
    ```

<br/><br/>

### 1. import 패키지.모듈 방식

- 이어서 main.py 에서 import 를 이용해 character 모듈을 호출해보자.

```python
# 1. import 패키지.모듈
import unit.character
unit.character.test()
```

<br/>

- 실행 결과: unit.character의 test 함수가 잘 실행되는 것을 알 수 있다.

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyth
on_basic/myvenv/bin/python /Users/usr/Documents/py
thon_basic/myvenv/Chapter9/startcoding/main.py
this is a character module
```

<br/><br/>

### 2. from 패키지 import 모듈 방식 (사용빈도 높음)

- 이번에는 from 패키지 import 모듈 구문을 이용해 모듈을 불러와보자.

```python
# 2. from 패키지 import 모듈
from unit import item
item.test()
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyth
on_basic/myvenv/bin/python /Users/usr/Documents/py
thon_basic/myvenv/Chapter9/startcoding/main.py
this is a item module
```

<br/><br/>

### 3. from 패키지 import * 방식

- from 패키지 import * 방식을 이용해 패키지의 모든 모듈을 불러올 수 있다.

```python
# 3. import 패키지 import *
# : 패키지 안의 모든 모듈 가져오기
from unit import *
character.test()
```

- `*` (Asterisk): ‘모든' 이라는 뜻
- character 모듈을 불러올 수 없음 ⇒ `__init__` 파일을 수정해야한다.

<br/>

- init 모듈을 수정해주자.

```python
from . import character, item, monster
```

- `.` : 현재 위치를 뜻한다.
- 현재위치의 character, item, monster 모듈을 init 모듈에 import 한다 라는 뜻.

<br/>

- 다시 main.py 로 돌아가 character, item, monster 모듈의 함수들을 불러와보자.

```python
# 3. import 패키지 import *
# : 패키지 안의 모든 모듈 가져오기
from unit import *
character.test()
item.test()
monster.test()
```

<br/>

- 실행결과: 각 모듈의 test 함수가 잘 실행됨을 알 수 있다.

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyth
on_basic/myvenv/bin/python /Users/usr/Documents/py
thon_basic/myvenv/Chapter9/startcoding/main.py
this is a character module
this is a item module
this is a monster module
```

<br/><br/>

### 4. import 패키지 방식

- import 패키지 방식을 사용해 패키지 전체를 불러와 사용할 수 있다.
- 참고: 이 방식도 3 방식의 init 모듈 수정 절차가 필요하다.
- main.py 에서 import unit 으로 unit 패키지 전체를 불러온 뒤, 각 모듈의 함수를 호출한다.

```python
# 4. import 패키지
# : 패키지 자체를 import 
import unit
unit.character.test()
unit.item.test()
unit.monster.test()
```

<br/>

- 실행결과: 각 모듈의 함수가 잘 동작함을 알 수 있다.

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyth
on_basic/myvenv/bin/python /Users/usr/Documents/py
thon_basic/myvenv/Chapter9/startcoding/main.py
this is a character module
this is a item module
this is a monster module
```
<br/><br/>

이번 포스팅에서는 패키지에 대해 알아보았다. 다음 포스팅에서는 파일입출력 기본에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**