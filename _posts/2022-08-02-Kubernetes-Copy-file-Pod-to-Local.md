---

published: true
title:  "[Kubernetes]Pod to Local 파일 복사하는 방법"
excerpt: "쿠버네티스 파드(Pod)에서 로컬로 파일을 복사하려면 kubectl cp 명령어를 활용하면 된다"

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스파일복사, podtolocal파일복사, 쿠버네티스파드파일복사, kubectl, kubectl사용법, kubernetes, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어]

toc: true
toc_sticky: true

date: 2022-08-02
last_modified_at: 2022-08-02

---

<br/><br/>

# 1. 배경 상황

쿠버네티스 기반 컨테이너 마이그레이션 프로젝트에서 Pod 내의 파일을 local로 다운받아달라는 요청이 들어왔다.

<br/>

이전 담당 시스템에서도 비슷한 요청(로그 파일을 다운받아달라는 요청)이 있었으나 그 때 당시 알아보았을 때에는 다운로드가 되지 않아 다른 방법을 취했었는데, 이번에 요청을 받고 알아보니 당시와는 환경이 달라 아주 간단하게 Pod에서 local로 파일을 다운로드 받을 수 있었다.

<br/>

참고로 이전 담당시스템에서 local 복사가 불가했던 이유는 시스템에서 내가 kubectl을 사용할 수 없었기 떄문(kubectl을 사용할 수 있는 권한이 없었기 때문)이었다. 이 때에는 로컬 다운로드 대신 해당 파일을 NAS로 옮겨 운영팀에서 직접 NAS에 접속해 확인 및 다운로드를 하실 수 있도록 처리했었다.

<br/><br/>

# 2. 쿠버네티스 Pod - Local 환경간 파일 복사

쿠버네티스 파드에서 local로 파일을 복사하려면 `kubectl cp` 명령어를 사용해주면 된다(docker의 경우도 `docker cp` 로 컨테이너 → 로컬로 복사가 가능하다고 함).

<br/>

## Pod에서 Local 환경으로 파일 복사

```bash
kubectl --kubeconfig <유저정보 파일> -n <네임스페이스명> <Pod명>:경로/파일 로컬경로/파일
```

만약 Local에서 Pod로 파일을 복사하고 싶다면 Pod경로와 local 경로의 순서를 바꾸어 명령어를 입력해주면 된다.

<br/>

## Local 환경에서 Pod로 파일 복사

```bash
kubectl --kubeconfig <유저정보 파일> -n <네임스페이스명> 로컬경로/파일 로컬경로/파일<Pod명>:경로/파일
```

<br/><br/>

# 3. tar: Removing leading ‘/‘ from member names

다만 tar 파일을 복사하다보니 아래와 같은 에러 메시지가 발생했다.

```jsx
tar: Removing leading '/' from member names
```

<br/>

해당 명령어는 알아보니 최상위 /를 제거한다는 알림 메시지로 최상위 /를 제거해 상대경로로 만들어야 압축 해제 시 안전하기 때문에 발생하는 메시지였다. 정확히 말하자면 에러라고 표시되긴 했지만 에러라기보다는 경고성 메시지이기 때문에 명령어 자체를 실행하는 데에는 문제가 없다.

<br/>

실제로 해당 경로에 들어가 파일이 잘 다운로드 되었는지 확인한 결과 잘 다운로드 된 것을 확인할 수 있었다.

<br/><br/>