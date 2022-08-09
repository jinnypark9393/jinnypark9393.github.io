---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA - KillerKoda Q9. RBAC Service Account Permission'
date: '2022-05-21 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

# Q9. 서비스 어카운트 권한(Service Account Permission)

기존 네임스페이스 `ns1`, `ns2` 가 존재하는데, `pipeline`이라는 서비스 어카운트를 두 네임스페이스에 생성하자.

<br/>

이 서비스 어카운트는 전체 클러스터의 거의 모든 것을 볼 수 있도록 허용해야하며, 기본 Clusterrole인 `view` 를 이용할 수 있다.

<br/>

이 서비스 어카운트는 `ns1` , `ns2` 네임스페이스에서 디플로이먼트를 생성하고 삭제할 수 있어야 한다.

<br/>

`kubectl auth can-i` 를 사용해 검증하자.

<br/><br/>

## RBAC 정보

RBAC 리소스에 대해 얘기해보자.

<br/>

Clusterrole/Role은 전체클러스터 혹은 단일 네임스페이스에서의 사용 가능한 권한들의 집합이다.

<br/>

ClusterRoleBinding/RoleBinding 은 전체 클러스터 혹은 단일 네임스페이스에서의 권한 범위를계정과 연결한다.

<br/>

따라서 4가지의 RBAC 조합이 있으며, 이 중 3개만 유효하다.

<br/>

1. Role + RoleBinding (단일 네임스페이스에서 사용가능하며, 단일 네임스페이스에 적용)
2. Clusterrole + ClusterRoleBinding (전체 클러스터 범위에서 사용가능하며, 전체 클러스터 범위에 적용)
3. Clusterrole + RoleBinding (전체 클러스터에서 사용가능하며, 단일 네임스페이스에 적용)
4. Role + ClusterRoleBinding (**불가능**: 단일 네임스페이스에서 사용 가능하며 전체클러스터 범위에 적용)

<br/><br/>

## 팁

```jsx
k create clusterrole view # 기본 클러스터롤이 존재한다

k create clusterrole -h # 예시 확인

k create rolebinding -h # 예시 확인

k auth can-i delete deployments --as system:serviceaccount:ns1:pipeline -n ns1
```

<br/><br/>

## 해결 방법

```jsx
# ClusterRole view 를 사용한다.
k get clusterrole view # 기본 클러스터롤이 존재합니다.
k create clusterrolebinding pipeline-view --clusterrole view --serviceaccount ns1:pipeline --serviceaccount ns2:pipeline

# 두 네임스페이스 모두에서의 디플로이먼트를 관리하자
k create clusterrole -h # 예시 확인
k create clusterrole pipeline-deployment-manager --verb create,delete --resource deployments
# 클러스터 롤 하나 대신 두 네임스페이스에 롤을 생성해도 된다

k -n ns1 create rolebinding pipeline-deploymenet-manager --clusterrole pipeline-deployment-manager --serviceaccount ns1:pipeline
k -n ns2 create rolebinding pipeline-deploymenet-manager --clusterrole pipeline-deployment-manager --serviceaccount ns2:pipeline
```

<br/><br/>

## 검증

```jsx
# 네임스페이스 ns1 deployment manager
k auth can-i delete deployments --as system:serviceaccount:ns1:pipeline -n ns1 # YES
k auth can-i create deployments --as system:serviceaccount:ns1:pipeline -n ns1 # YES
k auth can-i update deployments --as system:serviceaccount:ns1:pipeline -n ns1 # NO
k auth can-i update deployments --as system:serviceaccount:ns1:pipeline -n default # NO

# 네임스페이스 ns2 deployment manager
k auth can-i delete deployments --as system:serviceaccount:ns2:pipeline -n ns2 # YES
k auth can-i create deployments --as system:serviceaccount:ns2:pipeline -n ns2 # YES
k auth can-i update deployments --as system:serviceaccount:ns2:pipeline -n ns2 # NO
k auth can-i update deployments --as system:serviceaccount:ns2:pipeline -n default # NO

# 전체 클러스터 view role
k auth can-i list deployments --as system:serviceaccount:ns1:pipeline -n ns1 # YES
k auth can-i list deployments --as system:serviceaccount:ns1:pipeline -A # YES
k auth can-i list pods --as system:serviceaccount:ns1:pipeline -A # YES
k auth can-i list pods --as system:serviceaccount:ns2:pipeline -A # YES
k auth can-i list secrets --as system:serviceaccount:ns2:pipeline -A # NO (기본 view-role이 허용하지 않음)
```

<br/>
