---

published: true
title:  "[Kubernetes/CKA]모의고사 1.10 - 노드포트(NodePort)타입 서비스(Service) 생성"
excerpt: "명령형 커맨드로 파드(POD) YAML를 생성한 뒤 매니페스트 파일을 수정해 생성한다"

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

# 모의고사 1.10 - 노드포트(NodePort)타입 서비스(Service) 생성

## 1. 문제 요건

Expose the `hr-web-app` as service `hr-web-app-service` application on port `30082` on the nodes on the cluster.

The web application listens on port `8080`.

- Name: hr-web-app-service
- Type: NodePort
- Endpoints: 2
- Port: 8080
- NodePort: 30082

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

### 2. 노드포트(NodePort) 타입의 서비스(Service) 생성

- 노출 대상 애플리케이션이 파드인지 디플로이먼트인지 확인한다.

```bash
root@controlplane ~ ➜  k get pods
NAME                          READY   STATUS                  RESTARTS   AGE
hr-web-app-99dfd4c9d-nwvlr    1/1     Running                 0          17m
hr-web-app-99dfd4c9d-xfpx5    1/1     Running                 0          17m
messaging                     1/1     Running                 0          32m
nginx-pod                     1/1     Running                 0          36m
orange                        0/1     Init:CrashLoopBackOff   5          3m56s
static-busybox-controlplane   1/1     Running
```

<br/>

- 명령문으로 서비스의 매니페스트 파일을 생성한다.

```bash
root@controlplane ~ ➜  k expose deployment hr-web-app --name=hr-web-app-service --port=8080 --dry-run=client -o yaml > hr-web-app-service.yaml
```

<br/>

- 매니페스트 파일에 잘못된 부분이 없는지 확인하고, NodePort 부분을 추가한다.

```bash
root@controlplane ~ ➜  vi hr-web-app-service.yaml

====

apiVersion: v1
kind: Service
metadata:
  creationTimestamp: null
  labels:
    app: hr-web-app
  name: hr-web-app-service
spec:
  type: NodePort
  ports:
  - port: 8080
    protocol: TCP
    targetPort: 8080
    nodePort: 30082
  selector:
    app: hr-web-app
status:
```

<br/>

- 서비스가 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k get svc -o wide
NAME                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE   SELECTOR
hr-web-app-service   NodePort    10.107.107.163   <none>        8080:30082/TCP   26s   app=hr-web-app
kubernetes           ClusterIP   10.96.0.1        <none>        443/TCP          55m   <none>
messaging-service    ClusterIP   10.102.189.233   <none>        6379/TCP         27m   tier=msg
```

<br/><br/>

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)
- 서비스(Service): [https://kubernetes.io/ko/docs/concepts/services-networking/service/](https://kubernetes.io/ko/docs/concepts/services-networking/service/)