# [Kubernetes/CKA]모의고사 1.11 - JSON PATH로 Node의 osImage 정보 출력

# 모의고사 1.11 - JSON PATH로 Node의 osImage 정보 출력

## 1. 문제 요건

Use JSON PATH query to retrieve the `osImage`s of all the nodes and store it in a file `/opt/outputs/nodes_os_x43kj56.txt`.

The `osImages` are under the `nodeInfo` section under `status` of each node.

- Task Completed

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

- kubectl cheat sheet에서 최대한 비슷한 jsonpath 명령어를 복사해둔다.

```bash
kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}'
```

- 문제의 제시 정보를 참고해 쿼리문을 작성한다(단계별로 테스트해가며 경로가 맞는지 확인한다).

```bash
root@controlplane ~ ➜  kubectl get nodes -o jsonpath='{.items[*].status.nodeInfo.osImage}'
Ubuntu 18.04.6 LTS
```

- 문제에서 제시한 경로로 쿼리 결과를 저장한다.

```bash
root@controlplane ~ ➜  kubectl get nodes -o jsonpath='{.items[*].status.nodeInfo.osImage}' > /opt/outputs/nodes_os_x43kj56.txt
```

- 쿼리 결과가 잘 저장되었는지 확인한다.

```bash
root@controlplane ~ ➜  cat /opt/outputs/nodes_os_x43kj56.txt
Ubuntu 18.04.6 LTS
```

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)
- 노드(Node): [https://kubernetes.io/ko/docs/concepts/architecture/nodes/](https://kubernetes.io/ko/docs/concepts/architecture/nodes/)