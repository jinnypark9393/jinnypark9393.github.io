---

published: true
title:  "[Kubernetes/CKA]모의고사 1.11 - JSON PATH로 Node의 osImage 정보 출력"
excerpt: "JSON PATH를 이용해 노드의 하위 항목응ㄹ 출력한다"

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스자격증, 유데미강의추천, 유데미쿠버네티스, cka연습문제풀이, cka덤프, cka기출문제, cka, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어]

toc: true
toc_sticky: true

date: 2022-05-17
last_modified_at: 2022-05-17

---

<br/><br/>

# 모의고사 1.11 - JSON PATH로 Node의 osImage 정보 출력

## 1. 문제 요건

Use JSON PATH query to retrieve the `osImage`s of all the nodes and store it in a file `/opt/outputs/nodes_os_x43kj56.txt`.

The `osImages` are under the `nodeInfo` section under `status` of each node.

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

### 2. JSON PATH를 이용해 리소스의 특정 데이터 출력

- kubectl cheat sheet에서 최대한 비슷한 jsonpath 명령어를 복사해둔다.

```bash
kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}'
```

<br/>

- 문제의 제시 정보를 참고해 쿼리문을 작성한다(단계별로 테스트해가며 경로가 맞는지 확인한다).

```bash
root@controlplane ~ ➜  kubectl get nodes -o jsonpath='{.items[*].status.nodeInfo.osImage}'
Ubuntu 18.04.6 LTS
```

<br/>

- 문제에서 제시한 경로로 쿼리 결과를 저장한다.

```bash
root@controlplane ~ ➜  kubectl get nodes -o jsonpath='{.items[*].status.nodeInfo.osImage}' > /opt/outputs/nodes_os_x43kj56.txt
```

<br/>

- 쿼리 결과가 잘 저장되었는지 확인한다.

```bash
root@controlplane ~ ➜  cat /opt/outputs/nodes_os_x43kj56.txt
Ubuntu 18.04.6 LTS
```

<br/><br/>

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)
- 노드(Node): [https://kubernetes.io/ko/docs/concepts/architecture/nodes/](https://kubernetes.io/ko/docs/concepts/architecture/nodes/)