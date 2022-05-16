# [Kubernetes/CKA]모의고사 1.1 - 기본적인 파드(POD) 생성하기

# 모의고사 1.1 - 기본적인 파드(POD) 생성하기

## 1. 문제 요건

Deploy a pod named `nginx-pod` using the `nginx:alpine` image.

Once done, click on the `Next Question` button in the top right corner of this panel. You may navigate back and forth freely between all questions. Once done with all questions, click on `End Exam`. Your work will be validated at the end and score shown. Good Luck!

- Name: nginx-pod
- Image: nginx:alpine

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

- 명령문을 사용해 Pod 매니페스트 파일을 생성한다.

```bash
root@controlplane ~ ➜  k run nginx-pod --image=nginx:alpine --dry-run=client -o yaml > nginx-pod.yaml
```

- 생성된 매니페스트 파일 내용이 맞는지 확인한다.

```bash
root@controlplane ~ ➜  vi nginx-pod.yaml

====

apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: nginx-pod
  name: nginx-pod
spec:
  containers:
  - image: nginx:alpine
    name: nginx-pod
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

- 매니페스트 파일을 이용해 파드를 생성한다.

```bash
root@controlplane ~ ➜  k create -f nginx-pod.yaml 
pod/nginx-pod created
```

- 파드가 제대로 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k get pods
NAME        READY   STATUS    RESTARTS   AGE
nginx-pod   1/1     Running   0          12s
```

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)