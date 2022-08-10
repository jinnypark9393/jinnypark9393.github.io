---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA 모의고사 1.4 - 리소스 JSON 형태로 출력하기'
date: '2022-05-17 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# 모의고사 1.4 - 리소스 JSON 형태로 출력하기

## 1. 문제 요건

Get the list of nodes in JSON format and store it in a file at `/opt/outputs/nodes-z3444kd9.json`.

- Task completed

<br/><br/>

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다(이미 진행한 경우 불필요).

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

<br/><br/>

### 2. 리소스 JSON 형태로 출력하기

- 리소스 조회 명령어에 `-o json` 옵션을 더해 노드를 JSON 형태로 출력한다.

```bash
kubectl get nodes -o json
```

<br/>

- 명령문을 실행해 결과값이 올바르게 뜨는지 확인 후, 파일에 저장한다.

```bash
kubectl get nodes -o json > /opt/outputs/nodes-z3444kd9.json
```

<br/>

- 저장이 잘 되었는지 확인한다.

```bash
root@controlplane ~ ➜  cat /opt/outputs/nodes-z3444kd9.json
```

<br/><br/>

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)
- 노드: [https://kubernetes.io/ko/docs/concepts/architecture/nodes/](https://kubernetes.io/ko/docs/concepts/architecture/nodes/)

<br/>