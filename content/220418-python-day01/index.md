---
emoji: 🐍
title:  'Python - 패스트캠퍼스 캐시백 챌린지 2일차'
date: '2022-04-19 06:00:00'
author: jinnypark9393
tags: python
categories: 프로그래밍
---

회사분의 추천을 받고 또 충동적으로 구매해버린 패스트캠퍼스 강의... 이번에야말로 꼭 완강을 해보겠다는 의지로 캐시백 챌린지를 신청해보았다. 이번에 내가 신청한 강의는 “[한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online](https://fastcampus.co.kr/dev_online_pyweb)”. 파이썬 기초 언어 뿐만 아니라 배포, 관련 라이브러리 등을 한꺼번에 습득할 수 있는 커리큘럼인데다 이미 강의를 듣고 계신 회사분이 설명도 나쁘지 않다고 해주셔서 12개월 할부로 긁었다. 

<br/>

캐시백 챌린지는 기본적으로 매일 최소 1강 이상씩 듣고 공부기록을 블로그에 올리면 강의료를 환급해주는 형식인데, 중간과제가 있긴 하나 코딩 관련이 아닌 리뷰 개념이라 부담없이 성공할 수 있을 듯 한 느낌. (하지만 이러고 실패하면 정말 노간지인데....^^ 열심히 해야겠다) 

<br/>

![220418_Python_Day1(01).jpeg](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(01).jpeg)

<br/>

강의를 미리 결제해놓았어서 1일차는 그동안 미리 들어두었던 공부 내용을 전체적으로 정리해보았다.

<br/>

# Part 1. 파이썬 필수 문법

## Ch01. 강의소개

### 1. 파이썬을 선택하는 세 가지 이유

1. 문법이 쉽고 간결하다
    
    아래는 같은 결과값을 출력하는데 필요한 코딩 양. 
    [첫번째 코드블록: C]
    
    ```c
    #include<studio.h>
    int main (void){
    	printf("안녕하세요\n");
    	return 0;
    }
    ```
    [두번째 코드블록: Python]
    ```python
    print("안녕하세요")
    ```

<br/>

1. 인기가 많다.
    - 학습 자료가 많음 (책, 온/오프라인 강의, 블로그 등)
    - 오류가 생겼을 때 누군가 해결 방법을 찾아놓았을 경우가 많다.
    
<br/>
    
2. 다양한 분야에 활용 가능하다
    - 웹 서버 개발(Django, flask)
    - 크롤링
    - 업무자동화
    - 데이터분석
    - 인공지능
    - 게임제작

<br/>

## Ch02. 환경 설정

![220418_Python_Day1(02).jpeg](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(02).jpeg)

<br/>

- 참고: MacOS에서 설치를 진행했기 때문에 MacOS 에 대한 설명만 기재하였다.

<br/>

### 1. 파이썬 설치

- [https://www.python.org](https://www.python.org/) > Download > 파이썬 패키지 다운로드
- 패키지 파일 더블클릭해 설치 (이용약관: 동의)
- 설치가 완료되면 아래와 같이 파이썬 디렉토리가 생성된다.

![220418_Python_Day1(25).png](/assets/images//2022-04-18-Python-Photo/220418_Python_Day1(25).png)

<br/>

- python 3 명령어로 설치된 버전을 확인 할 수 있다.

![220418_Python_Day1(26).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(26).png)

<br/>

- python 명령어를 실행해보자.

![220418_Python_Day1(16).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(16).png)

<br/>

### 2. idle로 파이썬 실행

- Launchpad에서 ‘Idle’을 검색해 더블클릭으로 실행
- 명령어 한줄씩 실행 예시:
    
![220418_Python_Day1(17).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(17).png)

<br/>

- 명령어 여러줄 실행: File > New File
    - 실행하고 싶은 명령어 입력
    
    ![220418_Python_Day1(18).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(18).png)
    
    - Run > Run Module 클릭 > 파일 저장
        - 실행 결과가 최초 실행했던 idle 창에 표시된다.
        
        ![220418_Python_Day1(19).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(19).png)
        
- idle을 사용하지 않는 이유
    1. UI가 예쁘지 않다
    2. 자동완성 기능이 없다
    3. 파일 탐색기능이 없어 폴더/파일 기능 관리가 어렵다
    
    ⇒ 결론: **VScode를 사용하자!**

<br/>

### 3. 소스코드 편집기를 사용하는 이유

- 폴더, 파일 쉽게 정리
- 코드 자동완성 기능
- 디버깅(오류수정)이 쉽다: 오타, 문법오류 날 시 알려 준다
- 유용한 단축키가 많다

<br/>

### 4. vscode 설치

- vscode 공식 홈페이지 > Download
- 루트폴더 지정
    - File > Open > ‘Documents’ > 새로운 폴더 ‘python_basic’을 root로 지정
    - vscode에서 보는 디렉토리/파일과 실제 디렉토리/파일이 연동 되어있다.
        - vscode에서 생성 ⇒ 실제 폴더에도 생성
        - 실제 폴더 생성 ⇒ vscode 에도 생성
        
        ![220418_Python_Day1(20).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(20).png) 
        
        <br/>
        
    - 파일 생성 버튼 > ‘hello.py’ 이름 입력 후 엔터 > 파이썬 파일 생성됨
        - print(”hello python!”) 입력하기
            
        ![220418_Python_Day1(23).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(23).png) 
        
        <br/>
            
        - 저장 되었는지 여부 판단하기: 탭 이름 옆 흰 동그라미가 있을 경우 변경사항이 저장이 되지 않은 것.
            
        ![220418_Python_Day1(22).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(22).png) 
        
        <br/>
            
    - **[추가]** 폰트 설정 바꾸기: Code > Preferences > 폰트사이즈 입력 후 ‘Settings’ 닫아줌
        
        ![220418_Python_Day1(21).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(21).png) 

        <br/>
        
        폰트 크기 변경이 적용이 된 것을 확인할 수 있다.
        
        ![220418_Python_Day1(24).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(24).png) 

        <br/>
        
    - Extensions에서 확장 프로그램 “Python(Microsoft)” 설치
        
        ![220418_Python_Day1(03).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(03).png) 

        <br/>
        
    - 파이썬 코드 실행방법: Run > Run without Debugging
        
        ![220418_Python_Day1(04).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(04).png) 

        <br/>
        
    - 파이썬 코드 실행방법 2: vscode 오른쪽 상단의 재생 버튼 클릭
        
        ![220418_Python_Day1(05).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(05).png) 

        <br/>

        
    - 하단 콘솔에서 파이썬 코드가 실행됨을 확인할 수 있다.
        
        ![220418_Python_Day1(06).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(06).png) 

<br/>

### 5. VScode의 장점

1. 파일과 폴더를 보기 쉽게 정리할 수 있다(탐색기 내장).
    
    ![220418_Python_Day1(08).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(08).png) 
    
    <br/>
    
2. 코드 자동완성 기능 (클릭 혹은 엔터키로 입력 가능)
    
    ![220418_Python_Day1(07).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(07).png) 

    <br/>
    
3. 디버깅, 오류 수정이 쉽다(아래처럼 오류가 난 부분을 표시해준다).
    
    ![220418_Python_Day1(09).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(09).png) 

    <br/>
    
4. 유용한 단축키가 많다.
    1. 예: option + shift + 아래/위 방향키로 간단하게 복사 가능
    
    ![220418_Python_Day1(10).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(10).png) 
    
    <br/>
    
    2. 예: option + 클릭 (여러 줄을 동시에 선택/수정할 수 있다).
    
    ![220418_Python_Day1(11).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(11).png) 

<br/>

### 6. 가상환경 설정(Mac)

**1. 가상환경을 사용하는 이유**

- A 프로젝트: 패키지 1.0 버전 사용
- B 프로젝트: 패키지 2.0 버전 사용
    
    ⇒ 컴퓨터 안 공간을 나누면 한 컴퓨터 안에서 다른 버전을 사용할 수 있다.

<br/>

**2. 가상환경 만들고 패키지 설치**

- venv로 설치
- myvenv 라는 이름의 가상환경 만들기
    
    ![220418_Python_Day1(12).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(12).png)

    <br/>
    
- myvenv 라는 새로운 폴더가 생성된 것을 확인할 수 있다.
    
    ![220418_Python_Day1(13).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(13).png) 

    <br/>
    
- myvenv > bin > activate 파일을 이용해 활성화
    - (myvenv) 라는 가상환경명이 명령줄 앞에 붙게 된다.
    
    ```python
    python_basic source ./myvenv/bin/activate
    (myvenv) ➜  python_basic
    ```

    <br/>

    - 가상환경에서 빠져나오려면 deactivate 명령어를 실행해주면 된다.
    
    ```python
    (myvenv) ➜  python_basic deactivate
    ➜  python_basic
    ```
    <br/>

    - **TIP) 위/아래 방향키로 이전에 사용했던 명령어들을 사용할 수 있다.**
    
    <br/>
    
    - pip 명령어를 통해 가상환경에 설치된 모듈이나 패키지를 확인할 수 있다.
        - 예 1) pip list: 현재 설치되어 있는 패키지 파일 리스트 확인
            
            ```python
            (myvenv) ➜  python_basic pip list
            Package    Version
            ---------- -------
            pip        22.0.4
            setuptools 58.1.0
            ```

            <br/>

        - 예 2) pip install requests: requests 라는 패키지 파일을 **myvenv라는 가상환경 안**에 설치
            - 따라서 다른 프로젝트와 충돌이 나지 않게 된다.
            
            ```python
            (myvenv) ➜  python_basic pip install requests
            Collecting requests
              Downloading requests-2.27.1-py2.py3-none-any.whl (63 kB)
                 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 63.1/63.1 KB 3.0 MB/s eta 0:00:00
            Collecting charset-normalizer~=2.0.0
              Downloading charset_normalizer-2.0.12-py3-none-any.whl (39 kB)
            Collecting idna<4,>=2.5
              Downloading idna-3.3-py3-none-any.whl (61 kB)
                 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 61.2/61.2 KB 1.9 MB/s eta 0:00:00
            Collecting urllib3<1.27,>=1.21.1
              Downloading urllib3-1.26.9-py2.py3-none-any.whl (138 kB)
                 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 139.0/139.0 KB 2.6 MB/s eta 0:00:00
            Collecting certifi>=2017.4.17
              Downloading certifi-2021.10.8-py2.py3-none-any.whl (149 kB)
                 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 149.2/149.2 KB 1.9 MB/s eta 0:00:00
            Installing collected packages: certifi, urllib3, idna, charset-normalizer, requests
            Successfully installed certifi-2021.10.8 charset-normalizer-2.0.12 idna-3.3 requests-2.27.1 urllib3-1.26.9
            ```

            <br/>

        - 예 3) pip list 로 설치된 패키지 파일을 다시 확인한다.
            - requests 패키지와 requests 패키지가 필요로 하는 다른 패키지들이 설치된 것을 확인할 수 있다.
            
            ```python
            (myvenv) ➜  python_basic pip list            
            Package            Version
            ------------------ ---------
            certifi            2021.10.8
            charset-normalizer 2.0.12
            idna               3.3
            pip                22.0.4
            requests           2.27.1
            setuptools         58.1.0
            urllib3            1.26.9
            ```

            <br/>

- 강의에서의 소스코드 디렉토리 구성: myvenv 하위에 Chapter 별로 폴더 생성 ⇒ 필요한 실습 소스 파일 생성해 코드 작성
    1. myvenv/Chapter 2/01.가상환경세팅.py 구조로 폴더 및 파일 생성
    
    ![220418_Python_Day1(14).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(14).png) 
    
    <br/>

    1. [01.가상환경세팅.py](http://01.가상환경세팅.py) 파일 안에 실습코드 작성 및 실행
    
    ![220418_Python_Day1(15).png](/assets/images/2022-04-18-Python-Photo/220418_Python_Day1(15).png) 
    
<br/>

**본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.**

<br/>

- 패스트캠퍼스 강의 등록하기: [https://bit.ly/3L3avNW](https://bit.ly/3L3avNW)

<br/>

**#패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online**