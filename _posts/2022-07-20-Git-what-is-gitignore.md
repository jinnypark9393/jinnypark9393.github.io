---

published: true
title:  "[Git].gitignore란? (+사용방법)"
excerpt: "Remote 저장소에 올리고 싶지 않은 파일이 있는 경우 gitignore 파일을 이용해 커밋에서 제외해주면 된다"

categories:
- DevOps
tags:
- [git사용법, 깃사용법, 깃허브사용법, github사용법, gitignore사용법, gitignore란, gitignore파일]

toc: true
toc_sticky: true

date: 2022-07-20
last_modified_at: 2022-07-20

---

<br/><br/>

`.gitignore` 는 지금까지 업무에서 종종 사용하고 있었는데, 집에서 Django 실습 진행하다가 `.gitignore`를 사용할 일이 생겨 다시금 개념과 사용 방법을 정리해두려 한다.

<br/><br/>

# 1. .gitignore란?

프로젝트 내에 remote 저장소에 올리고 싶지 않은 파일이 있을 경우 Git에서 제외할 수 있는 설정 파일이다.

<br/>

일반적으로 IDE tool과 관련된 설정파일(예를 들면 이클립스의 `.classpath` 나 `.project` 파일), 백업파일이나 로그, 컴파일/빌드가 완료된 파일, 시크릿 정보(AWS root 계정 접속 key나 Django secret key 등)을 제외할 때 사용한다.

<br/><br/>

# 2. .gitignore 사용법

- .gitignore 파일은 항상 최상위 디렉터리에 존재해야 한다고 한다.
- .gitignore 파일을 생성 후, 제외할 파일명을 지정해주면 되는데, 여러 옵션을 사용할 수 있다.

```bash
# : 주석

# a.txt 파일을 제외
a.txt

# .txt 확장자를 가진 모든 파일 제외
*.txt

# .txt 확장자 파일을 제외하나, 이 중 b.txt 파일만 포함하고 싶을 경우
!b.txt

# 현재 디렉터리에 있는 c.txt 파일만 제외(하위 폴더 내의 c.txt 파일은 제외하지 않음)
/c.txt

# build 디렉터리 내의 모든 파일 제외
build/

# doc/d.txt 파일만 제외 (doc/sub/e.txt는 제외하지 않음)
doc/*.txt

# doc 디렉터리 내의 모든 .txt 파일 제외
doc/**/*.txt

```

- 위와 같이 제외할 파일을 지정한 뒤에는 GitHub과 같은 원격 저장소에 소스코드와 함께 `.gitignore` 를 push 해주면 적용된다.

<br/><br/>