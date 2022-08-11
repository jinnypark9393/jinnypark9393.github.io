---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 27일차'
date: '2022-05-14 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

오늘도 어제에 이어서 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 의 챕터 9-2. 모듈 만들기를 듣고 정리해보았다. 참고로 이 포스팅은 공부용으로 강의 내용을 요약한 것으로 자세한 강의 내용은 위 링크를 참조 할 것.

<br/><br/>

아래는 공부 인증 사진.

<br/>

![2022-05-14-Python-Photo1](/assets/images/2022-05-14-Python-Photo/2022-05-14-Python-Photo1.jpg)

![2022-05-14-Python-Photo2](/assets/images/2022-05-14-Python-Photo/2022-05-14-Python-Photo2.jpg)

<br/><br/>

# 02. 모듈 만들기

- pay_module이라는 모듈을 생성해보자.

<br/>

- pay_module.py라는 파일을 생성한 뒤, 아래를 입력 후 저장한다.

```python
# 결제 정보, 관리 모듈
# 변수
version = 2.0

# 함수
def printAuthor():
    print("스타트코딩")

# 클래스
class Pay:
    def __init__(self, id, price, time):
        self.id = id
        self.price = price
        self.time = time
    def get_pay_info(self):
        return f"{self.time} {self.id} {self.price}"
```

<br/>

- 02.모듈만들기.py라는 파일을 생성한 뒤, pay_module을 import한다.

```python
import pay_module
```

- Import “pay_module” could not be resolved Pylance(reportMissingImports) 라는 에러가 발생한다. 해당 모듈이 root 폴더에 있을 경우에만 찾을 수 있기 때문.

<br/>

- File > Preferences > Settings(MacOS의 경우: VSCode > Preferences > Settings)로 이동 후 붉은 색 네모로 표시한 버튼 클릭
    
![2022-05-14-Python-Photo3](/assets/images/2022-05-14-Python-Photo/2022-05-14-Python-Photo3.png)
    
<br/>

- settings.json 파일에서 `"python.analysis.extraPaths": ["./myvenv/Chapter9"],` 문구를 넣어준다.

```python
{
    "python.pythonPath": "/anaconda3/bin/python",
    "editor.unicodeHighlight.allowedCharacters": {
        " ": true
    },
    "python.analysis.extraPaths": ["./myvenv/Chapter9"],
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
    "window.zoomLevel": 1
}
```

<br/>

- 다시 `pay_module` 변수 및 함수를 사용하면 에러가 발생하지 않는다.

```python
import pay_module

# 변수 사용
print(pay_module.version)

# 함수 사용
pay_module.printAuthor()
```

<br/>

- 실행결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyth
on_basic/myvenv/bin/python /Users/usr/Documents/py
thon_basic/myvenv/Chapter9/02.모듈만들기.py
2.0
스타트코딩
```

- 코드 실행 후 Chapter 9 디렉토리에 `__pycache__` 라는 디렉토리가 자동으로 생성되며, 폴더 하위에는 `pay_module.cpython-310.pyc` 라는 파일이 생성되는데, 이는 실행속도 향상을 위해 생성된 컴파일된 파이썬 코드.

<br/>

- 클래스도 사용할 수 있는지 알아보자.

```python
import pay_module

# 변수 사용
print(pay_module.version)

# 함수 사용
pay_module.printAuthor()

# 클래스 사용
pay_info = pay_module.Pay("A102030", 13000, "2021-06-13")
print(pay_info.get_pay_info())
```

<br/>

- 실행 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyth
on_basic/myvenv/bin/python /Users/usr/Documents/py
thon_basic/myvenv/Chapter9/02.모듈만들기.py
2.0
스타트코딩
2021-06-13 A102030 13000
```

- 다시 pay_module.py 파일로 돌아가서, 함수를 추가해준다.

```python
# 해당 파일을 직접 실행했을 때만 실행된다.
if __name__ == "__main__":
    print("pay module 실행")

print(__name__)
```

<br/>

- 출력 결과

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyth
on_basic/myvenv/bin/python /Users/usr/Documents/py
thon_basic/myvenv/Chapter9/pay_module.py
pay module 실행
__main__
```

<br/>

- 02.모듈만들기.py 에서도 `print(pay_module.__name__)` 로 되는지 확인해보자.

```python
(myvenv) ➜  python_basic /Users/usr/Documents/pyth
on_basic/myvenv/bin/python /Users/usr/Documents/py
thon_basic/myvenv/Chapter9/02.모듈만들기.py
pay_module
```

- pay_module 이 출력된다. 자기자신의 파일을 직접 실행 했을 때에만 할당된다.

<br/><br/>

이번 포스팅에서는 모듈을 만들어보았다. 다음 포스팅에서는 패키지에 대해 알아보도록 하자.

<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**