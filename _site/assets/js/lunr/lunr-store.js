var store = [{
        "title": "첫 글",
        "excerpt":"깃허브 블로그 첫 글  우여곡절 끝에 깃허브 블로그를 생성했다.   MacOS 와 Jekyll(이라기보다는 ruby 버전 호환 문제) 설치 문제 때문에 임시로 티스토리를 사용했었는데, Ubuntu 20.04 버전 환경에서 설치하니 이렇게 금방 설치 될 수가 없더라…(허무)   기존 티스토리 블로그에 있던 포스팅은 조만간 전부 이관할 예정.   이제 깃허브 블로그도 생성했겠다 1일 1커밋을 생활화 해야지.  ","categories": ["ETC"],
        "tags": ["GithubPages","깃허브페이지","깃허브블로그","개발자블로그비교"],
        "url": "/etc/my-first-post/",
        "teaser": null
      },{
        "title": "[ETC]VMware Fusion에서 Ubuntu 20.04 설치하기",
        "excerpt":"   💡 MacOS 환경에서 VMware로 Ubuntu를 설치하려면 “VMware Fusion”을 설치해야 한다.        이번 포스팅에서는 VMware Fusion에서 Ubuntu 20.04 버전을 설치해보도록 하겠다. 코딩 강의를 수강하거나 스터디 할 때 실습 환경을 맞춰주기 위해서 우분투를 설치했었는데, 이번에는 Jekyll을 설치하기 위해 우분투 환경을 만들어주게 되었다.     만약 나와 같이 MacOS(Catalina 이상 버전)에서 Jekyll 설치에 실패했던 사람은 Ubuntu 20.04 버전에서 설치 해보는 걸 추천한다. (참고로 Ubuntu 18.04 버전에서는 Jekyll 설치는 가능했었으나 테마 적용에서 버전 이슈가 발생했다.)     그럼 VMware Fusion과 Ubuntu가 무엇인지에 대해 간단하게 살펴본 뒤 두 소프트웨어를 설치해보도록 하자.      1. VMware Fusion이란?   VMware Fusion은 VMware사에서 제공하는 MacOS 컴퓨터용 가상머신 소프트웨어이다. 무료버전인 VMware Fusion Player와 유료버전인 VMware Fusion Pro 두 가지 버전을 배포하고 있다.     VMware 에서는 VMware Fusion외에도 Windows 환경에서 사용할 수 있는 VMware Workstation이 있으며, VMware Workstation도 Player와 마찬가지로 Player(무료 버전), Pro(유료 버전) 두 가지 버전을 배포하고 있다.      2. 우분투(Ubuntu)란?   우분투(Ubuntu)는 데비안(Debian) GNU/리눅스를 기반으로 만들어진 운영체제로, 남아공 출신의 사업가인 Canonical의 CEO인 마크 셔틀워스(Mark Shuttleworth)에 의해 시작되었다. 우분투라는 제품명도 남아프리카의 반투어에서 따온 것으로, 사람들간의 관계와 헌신에 중점을 둔 윤리 사상, 인본주의에 기반한 아프리카의 전통적 사상이다. 우분투는 이러한 ‘우분투’ 정신을 개발 철학으로 삼고 있어 1. 소프트웨어 사용이 무료여야하고, 2. 모든 사람들의 모국어로 사용되어야하며, 3. 장애를 가진 사람도 이용할 수 있어야 한다고 한다. 또한 우분투는 오픈소스 소프트웨어로 무료로 제공되며 사람들이 자유롭게 소프트웨어를 수정할 수 있다.     뿐만 아니라 대부분의 리눅스 배포판들이 서버용으로 사용되고 있는 데 반해, 우분투는 개인 사용자나 데스크탑 환경에 최적화 되도록 개발되어 개인 컴퓨터에 리눅스 환경을 구축하고 싶을 때 매우 유용하다.      3. VMware Fusion 설치하기           구글에서 vmware fusion download 12를 검색해 맨 위의 링크로 들어간다.                       VMware Fusion Player - Personal Use License에 접속해 로그인한다(아이디가 없을 경우 Create an Account 탭을 클릭 ⇒ 빨간 박스 안에 들어간 내용을 입력해 회원가입을 진행한 뒤 로그인한다).                       패키지를 다운로드 및 설치한다(License Key가 필요한 경우 다운로드 창 위에 발급된 라이선스 키를 사용한다).                 4. Ubuntu 20.04 버전 설치하기            구글에서 “Ubuntu 20.04 download”를 검색해 우분투 공식 웹사이트 링크로 접속한다.                       다운로드를 클릭한다.                       iso 파일을 다운로드 받는다.                       VMware Fusion을 구동한 뒤, File &gt; New를 클릭한다.                       Install from disc or image에 다운로드 받은 iso파일을 드래그앤드롭 한다.                       ubuntu-20.04버전이 선택된 것을 확인 한 뒤 Continue 클릭한다.                       계정명과 비밀번호를 입력한 뒤 Continue 버튼을 클릭한다.                       내용을 확인한 뒤 Continue를 클릭한다(만일 생성되는 머신의 이름을 변경하고 싶은 경우 Customize Settings를 클릭해 이름을 변경해준다).                       설치가 완료되면 화면을 더블클릭해 활성화 한 뒤 설정한 비밀번호를 입력한 후 접속할 수 있다.            이렇게 MacOS 환경에서 VMware Fusion을 이용해 Ubuntu20.04 환경을 구성해보았다. 다음 포스팅에서는 Ubuntu 환경 위에서 Jekyll을 설치한 뒤, Github Pages(깃허브 블로그)를 생성해보도록 하자.      ","categories": ["ETC"],
        "tags": ["GithubPages","깃허브페이지","깃허브블로그","macosvmware설치","vmwarefusion설치","ubuntu20.04설치"],
        "url": "/etc/ETC-VMware-ubuntu/",
        "teaser": null
      },{
        "title": "[Python]패스트캠퍼스 캐시백 챌린지 1일차",
        "excerpt":"     회사분의 추천을 받고 또 충동적으로 구매해버린 패스트캠퍼스 강의… 이번에야말로 꼭 완강을 해보겠다는 의지로 캐시백 챌린지를 신청해보았다. 이번에 내가 신청한 강의는 “한 번에 끝내는 파이썬 웹 개발 초격차 패키지 Online”. 파이썬 기초 언어 뿐만 아니라 배포, 관련 라이브러리 등을 한꺼번에 습득할 수 있는 커리큘럼인데다 이미 강의를 듣고 계신 회사분이 설명도 나쁘지 않다고 해주셔서 12개월 할부로 긁었다.      캐시백 챌린지는 기본적으로 매일 최소 1강 이상씩 듣고 공부기록을 블로그에 올리면 강의료를 환급해주는 형식인데, 중간과제가 있긴 하나 코딩 관련이 아닌 리뷰 개념이라 부담없이 성공할 수 있을 듯 한 느낌. (하지만 이러고 실패하면 정말 노간지인데….^^ 열심히 해야겠다)           강의를 미리 결제해놓았어서 1일차는 그동안 미리 들어두었던 공부 내용을 전체적으로 정리해보았다.     Part 1. 파이썬 필수 문법   Ch01. 강의소개   1. 파이썬을 선택하는 세 가지 이유           문법이 쉽고 간결하다       (같은 결과값을 출력하는데 필요한 코딩 양. C vs Python)        #include&lt;studio.h&gt;  int main (void){  \tprintf(\"안녕하세요\\n\");  \treturn 0;  }            print(\"안녕하세요\")                   인기가 많다.            학습 자료가 많음 (책, 온/오프라인 강의, 블로그 등)       오류가 생겼을 때 누군가 해결 방법을 찾아놓았을 경우가 많다.                    다양한 분야에 활용 가능하다            웹 서버 개발(Django, flask)       크롤링       업무자동화       데이터분석       인공지능       게임제작                 Ch02. 환경 설정             참고: MacOS에서 설치를 진행했기 때문에 MacOS 에 대한 설명만 기재하였다.        1. 파이썬 설치      https://www.python.org &gt; Download &gt; 파이썬 패키지 다운로드   패키지 파일 더블클릭해 설치 (이용약관: 동의)   설치가 완료되면 아래와 같이 파이썬 디렉토리가 생성된다.              python 3 명령어로 설치된 버전을 확인 할 수 있다.              python 명령어를 실행해보자.            2. idle로 파이썬 실행      Launchpad에서 ‘Idle’을 검색해 더블클릭으로 실행        명령어 한줄씩 실행 예시:                      명령어 여러줄 실행: File &gt; New File            실행하고 싶은 명령어 입력                         Run &gt; Run Module 클릭 &gt; 파일 저장                    실행 결과가 최초 실행했던 idle 창에 표시된다.                                      idle을 사용하지 않는 이유            UI가 예쁘지 않다       자동완성 기능이 없다       파일 탐색기능이 없어 폴더/파일 기능 관리가 어렵다           ⇒ 결론: VScode를 사용하자!              3. 소스코드 편집기를 사용하는 이유      폴더, 파일 쉽게 정리   코드 자동완성 기능   디버깅(오류수정)이 쉽다: 오타, 문법오류 날 시 알려 준다   유용한 단축키가 많다        4. vscode 설치      vscode 공식 홈페이지 &gt; Download   루트폴더 지정            File &gt; Open &gt; ‘Documents’ &gt; 새로운 폴더 ‘python_basic’을 root로 지정       vscode에서 보는 디렉토리/파일과 실제 디렉토리/파일이 연동 되어있다.                    vscode에서 생성 ⇒ 실제 폴더에도 생성           실제 폴더 생성 ⇒ vscode 에도 생성                                  파일 생성 버튼 &gt; ‘hello.py’ 이름 입력 후 엔터 &gt; 파이썬 파일 생성됨                                 print(”hello python!”) 입력하기                                                   저장 되었는지 여부 판단하기: 탭 이름 옆 흰 동그라미가 있을 경우 변경사항이 저장이 되지 않은 것.                                                           추가) 폰트 설정 바꾸기: Code &gt; Preferences &gt; 폰트사이즈 입력 후 ‘Settings’ 닫아줌                      폰트 크기 변경이 적용이 된 것을 확인할 수 있다.                                   Extensions에서 확장 프로그램 “Python(Microsoft)” 설치                                   파이썬 코드 실행방법: Run &gt; Run without Debugging                                   파이썬 코드 실행방법 2: vscode 오른쪽 상단의 재생 버튼 클릭                                   하단 콘솔에서 파이썬 코드가 실행됨을 확인할 수 있다.                                   5. VScode의 장점           파일과 폴더를 보기 쉽게 정리할 수 있다(탐색기 내장).                   코드 자동완성 기능 (클릭 혹은 엔터키로 입력 가능)                   디버깅, 오류 수정이 쉽다(아래처럼 오류가 난 부분을 표시해준다).                   유용한 단축키가 많다.             예: option + shift + 아래/위 방향키로 간단하게 복사 가능                  b. 예: option + 클릭 (여러 줄을 동시에 선택/수정할 수 있다).                    6. 가상환경 설정(Mac)   1. 가상환경을 사용하는 이유      A 프로젝트: 패키지 1.0 버전 사용        B 프로젝트: 패키지 2.0 버전 사용       ⇒ 컴퓨터 안 공간을 나누면 한 컴퓨터 안에서 다른 버전을 사용할 수 있다.            2. 가상환경 만들고 패키지 설치      venv로 설치        myvenv 라는 이름의 가상환경 만들기                   myvenv 라는 새로운 폴더가 생성된 것을 확인할 수 있다.              myvenv &gt; bin &gt; activate 파일을 이용해 활성화            (myvenv) 라는 가상환경명이 명령줄 앞에 붙게 된다.             python_basic source ./myvenv/bin/activate   (myvenv) ➜  python_basic                  가상환경에서 빠져나오려면 deactivate 명령어를 실행해주면 된다.             (myvenv) ➜  python_basic deactivate   ➜  python_basic                  TIP) 위/아래 방향키로 이전에 사용했던 명령어들을 사용할 수 있다.                           pip 명령어를 통해 가상환경에 설치된 모듈이나 패키지를 확인할 수 있다.                                 예 1) pip list: 현재 설치되어 있는 패키지 파일 리스트 확인                 (myvenv) ➜  python_basic pip list   Package    Version   ---------- -------   pip        22.0.4   setuptools 58.1.0                                   예 2) pip install requests: requests 라는 패키지 파일을 myvenv라는 가상환경 안에 설치                            따라서 다른 프로젝트와 충돌이 나지 않게 된다.                             (myvenv) ➜  python_basic pip install requests   Collecting requests     Downloading requests-2.27.1-py2.py3-none-any.whl (63 kB)        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 63.1/63.1 KB 3.0 MB/s eta 0:00:00   Collecting charset-normalizer~=2.0.0     Downloading charset_normalizer-2.0.12-py3-none-any.whl (39 kB)   Collecting idna&lt;4,&gt;=2.5     Downloading idna-3.3-py3-none-any.whl (61 kB)        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 61.2/61.2 KB 1.9 MB/s eta 0:00:00   Collecting urllib3&lt;1.27,&gt;=1.21.1     Downloading urllib3-1.26.9-py2.py3-none-any.whl (138 kB)        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 139.0/139.0 KB 2.6 MB/s eta 0:00:00   Collecting certifi&gt;=2017.4.17     Downloading certifi-2021.10.8-py2.py3-none-any.whl (149 kB)        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 149.2/149.2 KB 1.9 MB/s eta 0:00:00   Installing collected packages: certifi, urllib3, idna, charset-normalizer, requests   Successfully installed certifi-2021.10.8 charset-normalizer-2.0.12 idna-3.3 requests-2.27.1 urllib3-1.26.9                                   예 3) pip list 로 설치된 패키지 파일을 다시 확인한다.                            requests 패키지와 requests 패키지가 필요로 하는 다른 패키지들이 설치된 것을 확인할 수 있다.                             (myvenv) ➜  python_basic pip list               Package            Version   ------------------ ---------   certifi            2021.10.8   charset-normalizer 2.0.12   idna               3.3   pip                22.0.4   requests           2.27.1   setuptools         58.1.0   urllib3            1.26.9                                                   강의에서의 소스코드 디렉토리 구성: myvenv 하위에 Chapter 별로 폴더 생성 ⇒ 필요한 실습 소스 파일 생성해 코드 작성            myvenv/Chapter 2/01.가상환경세팅.py 구조로 폴더 및 파일 생성                          01.가상환경세팅.py 파일 안에 실습코드 작성 및 실행              본 포스팅은 패스트캠퍼스 환급 챌린지 참여를 위해 작성되었습니다.      패스트캠퍼스 강의 등록하기: https://bit.ly/3L3avNW   #패스트캠퍼스 #패캠챌린지 #직장인인강 #직장인자기계발 #패스트캠퍼스후기 #캐시백챌린지 #캐시백 #환급챌린지 #한번에끝내는파이썬웹개발초격차패키지Online  ","categories": ["Programming"],
        "tags": ["패스트캠퍼스","패캠챌린지","직장인인강","직장인자기계발","패스트캠퍼스후기","캐시백챌린지","캐시백","환급챌린지","한번에끝내는파이썬웹개발초격차패키지Online"],
        "url": "/programming/Python-%ED%8C%A8%EC%8A%A4%ED%8A%B8%EC%BA%A0%ED%8D%BC%EC%8A%A4-%EC%BA%90%EC%8B%9C%EB%B0%B1-%EC%B1%8C%EB%A6%B0%EC%A7%80-1%EC%9D%BC%EC%B0%A8/",
        "teaser": null
      }]
