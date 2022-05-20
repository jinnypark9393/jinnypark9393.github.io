---

published: true
title:  "[Kubernetes/CKA]KillerKoda Q1. Vim Setup"
excerpt: "YAML을 보다 더 편하게 편집할 수 있도록 Vim을 설정해보자"

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스자격증, 유데미강의추천, 유데미쿠버네티스, cka연습문제풀이, cka덤프, cka기출문제, cka, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어, killerkoda, killersh, killershell, cka모의고사]

toc: true
toc_sticky: true

date: 2022-05-21
last_modified_at: 2022-05-21

---

<br/><br/>

# KillerKoda란?

CKA(Certified Kubernetes Administrator) 시험을 신청하게 되면 Killer.sh 이라는 모의 시험 환경이 제공되는데, 이번에 시험을 신청해보니 Killer.sh 외에도 Killer.sh을 만든 팀에서 KillerKoda라는 실습환경도 제공하고 있어 한 번 풀어보았다.

<br/>

[Killer.sh 과 KillerKoda의 차이점](https://killercoda.com/killer-shell)은 아래와 같다.

### [Killer.sh]

- 시험환경과 유사한 인터페이스를 제공하는 모의고사
- CKA 시험을 신청했을 때 접속할 수 있다
- 동일한 문제가 들어있는 두 개의 시뮬레이터를 제공
- 각 시뮬레이터는 활성화 한 뒤 36시간동안만 접속할 수 있다
- 채점 및 해설 제공
- 난이도: 높은 편(개인적으로 유데미의 CKA 바이블 뭄샤드님의 강의에서 제공하는 모의고사보다 훨씬 어려웠다)

<br/>

### [KillerKoda]

- CKA 실제 시험과는 다소 다른 인터페이스
- 시간 제한 없이 누구나 무료로 이용할 수 있다
- 일부 채점 및 해설 제공
- 난이도: 쉬운 편 ~ 중간
- KillerKoda는 현재 베타버전으로 운영되고 있어 현재는 12개 문제를 제공하고 있는데(첫번째는 Playground라 제외하고 나머지 문제만 업로드했다), 향후 더 다양한 문제가 제공될 예정

<br/>

이 외에도 [위의 사이트에서 쿠버네티스와 관련된 여러 가상환경을 제공](https://killercoda.com/playgrounds)하고(Kubernetes 1.24 버전의 마스터노드 1 + 워커노드 1 환경, Istio가 구성된 환경 등) 있어, 쿠버네티스 클러스터를 설치하지 않고 간단하게 실습을 해볼 수 있다.

<br/><br/>

# Q1. Vim Setup

k8s 시험에서 YAML을 편집할 때의 중요한 설정에 대해 알아보자.

<br/>

## 세팅

먼저 `.vimrc` 파일을 생성하거나 연다(이미 생성했을 경우):

```
vim ~/.vimrc

```

<br/>

 `i` 로 삽입모드를 활성화 한 상태에서 다음을 입력한다.

```
set expandtab
set tabstop=2
set shiftwidth=2

```

<br/>

`Esc` 다음  `:x` , `Enter` 를 눌러 파일을 저장하고 닫는다.

<br/><br/>

### 설명

Vim을 오픈할때마다 항상 현재 사용자로서 위의 세팅들이 적용될 것이다.

만일 당신이 다른 서버에 ssh로 접속하게 된다면 이 설정들은 **적용되지 않는다**.

설정값 설명은 다음과 같다.

```
expandtab: 탭키를 스페이스로 사용한다
tabstop: 탭키에 적용할 스페이스양
shiftwidth: 들여쓰기 중 사용할 스페이스 양
```

<br/>