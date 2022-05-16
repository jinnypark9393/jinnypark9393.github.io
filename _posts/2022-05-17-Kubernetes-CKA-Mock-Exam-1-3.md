# [Kubernetes/CKA]모의고사 1.3 - 네임스페이스(Namespace) 생성하기

# 모의고사 1.3 - 네임스페이스(Namespace) 생성하기

## 1. 문제 요건

Create a namespace named `apx-x9984574`.

- Namespace: apx-x9984574

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다.

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

### 2.

- 명령문을 사용해 네임스페이스(namespace)를 생성한다.

```bash
root@controlplane ~ ➜  k create ns apx-x9984574
namespace/apx-x9984574 created
```

- 네임스페이스가 제대로 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k get ns
NAME              STATUS   AGE
apx-x9984574      Active   3s
default           Active   17m
kube-node-lease   Active   17m
kube-public       Active   17m
kube-system       Active   17m
```

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)