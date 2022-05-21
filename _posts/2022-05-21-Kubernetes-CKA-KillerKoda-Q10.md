---

published: true
title:  "[Kubernetes/CKA]KillerKoda Q10. RBAC User Permissions"
excerpt: "API서버가 뜨지 않을 경우, kubelet(/var/log/syslog)과 api서버 자체 설정, etcd 파드 설정 등을 살펴보자"

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

# 1. RBAC 사용자 권한

`applications` 라는 기본 네임스페이스가 존재한다.

<br/>

1. `smoke` 사용자는 application 네임스페이스에서 파드, 디플로이먼트, 스테이트풀셋의 생성, 삭제를 할 수 있어야 한다.
2. `smoke` 사용자는 `kube-system` 을 제외한 모든 네임스페이스의 `view` 권한을 가지고 있어야 한다.
3. `kubectl auth can-i`를 통해 검증하자.

<br/><br/>

## RBAC 정보

RBAC 리소스에 대해 얘기해보자.

<br/>

Clusterrole/Role은 전체클러스터 혹은 단일 네임스페이스에서의 사용 가능한 권한들의 집합이다.

<br/>

ClusterRoleBinding/RoleBinding 은 전체 클러스터 혹은 단일 네임스페이스에서의 권한 범위를 계정과 연결한다.

<br/>

따라서 4가지의 RBAC 조합이 있으며, 이 중 3개만 유효하다.

<br/>

1. Role + RoleBinding (단일 네임스페이스에서 사용가능하며, 단일 네임스페이스에 적용)
2. Clusterrole + ClusterRoleBinding (전체 클러스터 범위에서 사용가능하며, 전체 클러스터 범위에 적용)
3. Clusterrole + RoleBinding (전체 클러스터에서 사용가능하며, 단일 네임스페이스에 적용)
4. Role + ClusterRoleBinding (**불가능**: 단일 네임스페이스에서 사용 가능하며 전체클러스터 범위에 적용)

<br/><br/>

## 팁

```bash
# 1)
k -n applications create role -h
k -n applications create rolebinding -h

# 2)
# 현재로서는 금지(Deny)-RBAC 설정이 불가하다
# 따라서 다른 모든 네임스페이스에 대해 허용 설정을 해야한다

# 3)
k auth can-i -h
k auth can-i create deployments --as smoke -n applications
```

<br/><br/>

## 해결 방법

### 1. `Application` 네임스페이스를 위한 RBAC

```bash
k -n applications create role smoke --verb create,delete --resource pods,deployments,sts
k -n applications create rolebinding smoke --role smoke --user smoke
```

<br/><br/>

### 2. `kube-system`을 제외한 모든 네임스페이스의 보기 권한

현재로서는 쿠버네티스에서 금지(deny)-RBAC 설정이 불가하므로 모든 다른 네임스페이스에 허용 설정을 해준다.

```bash
k get ns # get all namespaces
k -n applications create rolebinding smoke-view --clusterrole view --user smoke
k -n default create rolebinding smoke-view --clusterrole view --user smoke
k -n kube-node-lease create rolebinding smoke-view --clusterrole view --user smoke
k -n kube-public create rolebinding smoke-view --clusterrole view --user smoke
```

<br/><br/>

## 검증

```bash
# 애플리케이션
k auth can-i create deployments --as smoke -n applications # YES
k auth can-i delete deployments --as smoke -n applications # YES
k auth can-i delete pods --as smoke -n applications # YES
k auth can-i delete sts --as smoke -n applications # YES
k auth can-i delete secrets --as smoke -n applications # NO
k auth can-i list deployments --as smoke -n applications # YES
k auth can-i list secrets --as smoke -n applications # NO
k auth can-i get secrets --as smoke -n applications # NO

# kube-system을 제외한 모든 네임스페이스에서의 보기 권한
k auth can-i list pods --as smoke -n default # YES
k auth can-i list pods --as smoke -n applications # YES
k auth can-i list pods --as smoke -n kube-public # YES
k auth can-i list pods --as smoke -n kube-node-lease # YES
k auth can-i list pods --as smoke -n kube-system # NO
```

<br/>