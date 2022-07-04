---

published: true
title:  "[Python]zsh: command not found: pip / zsh: command not found: virtualenv 에러 해결"
excerpt: "pip가 실행이 되지 않을 때에는 뒤에 버전명을 명시하고, 명령어가 실행이 되지 않을 경우에는 해당 패키지가 설치가 되었는지 재확인하자"

categories:
- Programming
tags:
- [패스트캠퍼스, 파이썬에러, zsh에러, nomatchesfound에러, 파이썬특수문지, 파이썬, Python, vscode에러, Python에러]

toc: true
toc_sticky: true

date: 2022-07-05
last_modified_at: 2022-07-05

---

<br/><br/>

# 1. “zsh: command not found: virtualenv” 에러 배경 상황

“[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)” 강의의 Django 환경 세팅 부분을 따라하다가 가상환경 설정 부분에서 에러가 발생했다.

```bash
zsh: command not found: virtualenv
```

찾아보니 가장 간단한 방법으로는 virtualenv를 삭제했다가 다시 깔아보라는 내용이 있어 시도해보았다.

# 2. “zsh: command not found: pip”

그런데 pip 명령어도 찾을 수 없다는 에러가 발생했다.

```bash
➜  shrinkers git:(master) ✗ pip uninstall virtualenv
zsh: command not found: pip
```

# 2. “zsh: command not found: pip” 해결 방법

1분 전에 pip로 Django를 깔았는데 이럴 수가 있나? 싶어서 Django 설치 때와 동일하게 pip 뒤에 버전명을 붙여 실행하니 해결되었다.

```bash
➜  shrinkers git:(master) ✗ pip3.10 uninstall virtualenv
WARNING: Skipping virtualenv as it is not installed.
```

실행결과를 보니 virtualenv 자체가 설치가 안 된 모양. virtualenv가 실행이 되지 않은 게 당연했다.

# 2. “zsh: command not found: virtualenv” 해결 방법

`pip` 를 이용해 `virtualenv`를 깔아주었다.

```bash
➜  shrinkers git:(master) ✗ pip3.10 install virtualenv 
Collecting virtualenv
  Downloading virtualenv-20.15.1-py2.py3-none-any.whl (10.1 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 10.1/10.1 MB 3.1 MB/s eta 0:00:00
Collecting six<2,>=1.9.0
  Downloading six-1.16.0-py2.py3-none-any.whl (11 kB)
Collecting distlib<1,>=0.3.1
  Downloading distlib-0.3.4-py2.py3-none-any.whl (461 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 461.2/461.2 KB 2.5 MB/s eta 0:00:00
Collecting platformdirs<3,>=2
  Downloading platformdirs-2.5.2-py3-none-any.whl (14 kB)
Collecting filelock<4,>=3.2
  Downloading filelock-3.7.1-py3-none-any.whl (10 kB)
Installing collected packages: distlib, six, platformdirs, filelock, virtualenv
Successfully installed distlib-0.3.4 filelock-3.7.1 platformdirs-2.5.2 six-1.16.0 virtualenv-20.15.1
WARNING: You are using pip version 22.0.4; however, version 22.1.2 is available.
You should consider upgrading via the '/Library/Frameworks/Python.framework/Versions/3.10/bin/python3.10 -m pip install --upgrade pip' command.
```

그리고 나서 `virtualenv` 명령어로 가상환경을 생성해주었더니 문제 없이 생성되었다.

```bash
➜  shrinkers git:(master) ✗ virtualenv venv         
created virtual environment CPython3.10.4.final.0-64 in 1874ms
  creator CPython3Posix(dest=/Users/jinipark/shrinkers/shrinkers/venv, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/Users/jinipark/Library/Application Support/virtualenv)
    added seed packages: pip==22.1.2, setuptools==62.6.0, wheel==0.37.1
  activators BashActivator,CShellActivator,FishActivator,NushellActivator,PowerShellActivator,PythonActivator
➜  shrinkers git:(master) ✗
```