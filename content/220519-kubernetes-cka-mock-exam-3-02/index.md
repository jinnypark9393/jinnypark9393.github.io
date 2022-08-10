---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA 모의고사 3.2 - JSON PATH로 노드 Internal IP 출력하기 및 파드(POD) 연결하기'
date: '2022-05-19 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# 모의고사 3.2 - JSON PATH로 노드 Internal IP 출력하기

## 1. 문제 요건

List the `InternalIP` of all nodes of the cluster. Save the result to a file `/root/CKA/node_ips`.

Answer should be in the format: `InternalIP of controlplane`<space>`InternalIP of node01` (in a single line)

- Task Completed

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

### 2. JSON PATH로 노드 Internal IP 출력 및 파드(POD) 연결

- 쿠버네티스 치트시트에서 가장 유사한 명령어를 찾아 복사한 뒤 수정한다.

```bash
kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="InternalIP")].address}
```

<br/>

- 문제에서 지정한 경로에 저장한다.

```jsx
root@controlplane ~ ➜  kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="InternalIP")].address}' > /root/CKA/node_ips
```

<br/>

- `cat` 명령어로 잘 저장되었는지 확인한다.

```bash
root@controlplane ~ ➜  cat /root/CKA/node_ips
10.29.76.6 10.29.76.9
```

<br/><br/>

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)

<br/>