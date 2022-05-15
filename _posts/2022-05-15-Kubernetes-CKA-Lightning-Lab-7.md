---

published: true
title:  "[Kubernetes/CKA]Lightning Lab 7 - Secret이 마운트된 Pod 생성하기"
excerpt: "명령형 커맨드로 파드(POD) YAML를 생성한 뒤 수정한다"

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스자격증, 유데미강의추천, 유데미쿠버네티스, cka연습문제풀이, cka덤프, cka기출문제, cka, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어]

toc: true
toc_sticky: true

date: 2022-05-15
last_modified_at: 2022-05-15

---

<br/><br/>

# 7. Secret이 마운트된 Pod 생성하기

## [문제 요건]

- `admin1401` 네임스페이스에 `busybox`이미지를 가지고 `secret-1401`라는 파드를 생성
- 파드 내 컨테이너명은 반드시 `secret-admin` 여야함
- `4800`초동안 sleep하는 명령어 실행
- 컨테이너에 마운트 되는 시크릿 볼륨은 `read-only` 여야 하며, 
- 컨테이너는 `/etc/secret-volume` 경로에 시크릿 볼륨을 마운트해야한다.
- 시크릿 이름은 `dotfile-secret`
- 채점 기준: 파드가 올바르게 생성되었는가?

<br/><br/>

## [내 풀이]

- kubectl 명령어로 pod의 yaml 파일을 생성해준다.
    - Tip:  `--dry-run` 옵션을 사용해 파드를 생성하지 않고 매니페스트 파일만 생성한다.

```bash
root@controlplane:~# k run -n admin1401 --image=busybox secret-1401 --dry-run=client -o yaml --command -- sleep 4800 > pod.yaml
```

<br/>

- 생성한 매니페스트 파일(yaml)을 편집한다.

```bash
root@controlplane:~# vi pod.yaml
```

```bash
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: secret-1401
  name: secret-1401
  namespace: admin1401
spec:
  containers:
  - command:
    - sleep
    - "4800"
    image: busybox
    name: secret-1401
  dnsPolicy: ClusterFirst
  restartPolicy: Always
```

<br/>

- 문제 요건에 맞게 pod의 yaml 파일을 수정한다.

```bash
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: secret-1401
  name: secret-1401
  namespace: admin1401
spec:
  containers:
  - command:
    - sleep
    - "4800"
    image: busybox
    name: secret-admin
    volumeMounts:
    - name: secret-volume
      readOnly: true
      mountPath: "/etc/secret-volume"
  dnsPolicy: ClusterFirst
  restartPolicy: Always
  volumes:
  - name: secret-volume
    secret:
      secretName: dotfile-secret
```

- 파드의 컨테이너명을 `secret-admin` 으로 수정한다.
- 쿠버네티스 공식 문서의 Secret 문서를 참고하여 Secret Volume과 VolumeMounts 구문을 추가한다.

<br/>

- `kubectl create -f <yaml파일명>` 명령어를 사용해 파드를 생성한 뒤, 잘 생성되었는지 확인한다.

```bash
root@controlplane:~# kubectl create -f pod.yaml 
pod/secret-1401 created
root@controlplane:~# kubectl get pods -n admin1401
NAME          READY   STATUS    RESTARTS   AGE
secret-1401   1/1     Running   0          12s
```

<br/>

## [참고 URL]

- kubectl reference: [https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#run](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#run)
- Secret: [https://kubernetes.io/ko/docs/concepts/configuration/secret/#사용-사례-ssh-키가-있는-파드](https://kubernetes.io/ko/docs/concepts/configuration/secret/#%EC%82%AC%EC%9A%A9-%EC%82%AC%EB%A1%80-ssh-%ED%82%A4%EA%B0%80-%EC%9E%88%EB%8A%94-%ED%8C%8C%EB%93%9C)