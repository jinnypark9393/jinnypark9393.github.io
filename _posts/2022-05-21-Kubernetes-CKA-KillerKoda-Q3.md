---

published: true
title:  "[Kubernetes/CKA]KillerKoda Q3. Apiserver Misconfigured"
excerpt: "API서버가 뜨지 않을 경우, kubelet(/var/log/syslog)과 api서버 자체 설정, etcd 파드 설정 등을 살펴보자"

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

# Q3. API서버 설정 오류

먼저, API서버 장애 실습을 풀지 않았다면 풀고 오도록 하자.

<br/>

API 서버가 올라오지 않는 상황이다. 매니페스트 파일의 3곳이 잘못 설정되어있다. 에러를 수정하자.

<br/><br/>

## 로그 경로

확인해야할 로그 경로는 아래와 같다.

- `/var/log/pods`
- `/var/log/containers`
- `crictl ps` + `crictl logs`
- `docker ps` + `docker logs` (도커가 사용될 경우)
- kubelet 로그: `/var/log/syslog` 혹은 `journalctl`

<br/><br/>

## 이슈

변경사항을 적용하기 위해 다음의 작업을 해야할 수 있다.

1. `kube-apiserver.yaml` 파일을 manifests 디렉토리에서 뺀다
2. API 서버 컨테이너가 사라질때까지 기다린다 (`watch crictl ps` )
3. 매니페스트 파일을 다시 돌려놓은 뒤 api서버가 돌아올 때까지 기다린다.

일부 유저들이 kubelet을 재시작해야했다고 보고 했으나(`service kubelet restart`) 이론상으로는 필요없다.

<br/><br/>

## 해결 방법 1

Kubelet이 파드/컨테이너를 시작도 생성하지도 못하고 있다. Kubelet로그를 syslog로 확인해보자.

```jsx
cat /var/log/syslog | grep kube-apiserver
```

<br/>

- manifest파일의 metadata 부분에 오타가 있다
    - `metadata;` 를 `metadata:` 로 수정해준다.

<br/><br/>

## 해결 방법 2

잘못된 YAML을 수정한 뒤에도 여전히 틀도잘못된 파라미터로 이슈가 있는 듯 하다.

- `/var/log/pods` 에 있는 로그를 확인하자.
- 에러: `Error: unknown flag: —authorization-modus`
- 맞는 파라미터: `—authorization-mode`

<br/><br/>

## 해결 방법 3

파라미터를 고친 뒤, 파드/컨테이너는 up되었을 수 있지만, 파드가 재시작(restart) 되는 현상이 발생한다.

<br/>

컨테이너 로그를 확인하거나 `/var/log/pods` 를 확인하면 아래를 찾을 수 있다.

```jsx
Error while dialing dial tcp 127.0.0.1:23000: connect:connection refused
```

<br/>

컨테이너 로그를 확인하자: ETCD 연결이 잘못된 듯 하다. ETCD가 동작하는 올바른 포트를 설정하자(포트 번호는 ETCD 매니페스트를 확인하자).

<br/>

설정값은 `—etcd-servers=https://127.0.0.1:2379` 여야 한다(자세한 내용은 쿠버네티스 공식문서의 Ports and Protocols 문서를 확인하자).

<br/>