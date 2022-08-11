---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA Lightning Lab 1 - kubeadm으로 클러스터 업그레이드'
date: '2022-05-15 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

유데미(Udemy) 에서 구입한 CKA 강의 수강을 완료하고 마지막 연습문제를 풀고 있는데, 챕터별 연습문제와는 다르게 답안이 제공되지 않아 기록을 위해 문제 풀이 과정을 블로그에 올려두려 한다.

<br/>

참고로 아래의 문제 요건은 편의를 위해 한국어로 번역한 것이고, 강의에서 제공하는 시험 및 실제 시험은 100% 영어로 출제된다.

<br/><br/>

# 1. Kubeadm 으로 클러스터 업그레이드 하기

## [문제 요건]

- 쿠버네티스 버전을 현재 `1.19` 버전에서 `1.20.0` 로 업그레이드(`kubeadm` 툴을 이용)
- 업그레이드는 마스터 노드부터 한번에 한 노드씩 이루어져야 한다.
- 다운타임(downtime)을 최소화하기위해, 각 노드를 업그레이드 하기 전 `gold-nginx` 디플로이먼트가 대체 노드로 스케줄링 되어야한다.
- `controlplane` 노드를 먼저 업그레이드
- `node01` 노드를 업그레이드 전 드레인(drain)
- `gold-nginx` 디플로이먼트들의 파드는 `controlplane` 에 스케줄링 되어야한다.
- 채점 포인트
    - 클러스터가 업그레이드 되었는가?
    - 'gold-nginx'의 파드들이 컨트롤플레인에 스케줄링 되었는가?

<br/>

## [내 풀이]

- 쿠버네티스 공식문서에서 ‘클러스터 업그레이드’를 검색 > [kubeadm 클러스터 업그레이드 공식문서](https://kubernetes.io/ko/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/) 접속
- 문제 요건대로 쿠버네티스 1.19버전에서 1.20.0 버전으로 업그레이드 하는 문서로 이동
- 문서에 나와있는 대로 apt update로 패키지 관리자 업데이트

```bash
root@controlplane:~# apt update
Hit:1 https://packages.cloud.google.com/apt kubernetes-xenial InRelease         
Hit:2 https://download.docker.com/linux/ubuntu bionic InRelease                 
Hit:3 http://security.ubuntu.com/ubuntu bionic-security InRelease               
Hit:4 http://archive.ubuntu.com/ubuntu bionic InRelease                         
Hit:5 http://archive.ubuntu.com/ubuntu bionic-updates InRelease
Hit:6 http://archive.ubuntu.com/ubuntu bionic-backports InRelease
Reading package lists... Done
Building dependency tree       
Reading state information... Done
74 packages can be upgraded. Run 'apt list --upgradable' to see them.
```

<br/>

- apt-cache madison kubeadm으로 kubeadm으로 업그레이드 버전정보를 확인 (문제에서는 1.20.0으로 지정되어있어 생략 가능)

```bash
root@controlplane:~# apt-cache madison kubeadm
   kubeadm |  1.24.0-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.23.6-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.23.5-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.23.4-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.23.3-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.23.2-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.23.1-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.23.0-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.22.9-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.22.8-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.22.7-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.22.6-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.22.5-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.22.4-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.22.3-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.22.2-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.22.1-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.22.0-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm | 1.21.12-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm | 1.21.11-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm | 1.21.10-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.21.9-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.21.8-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.21.7-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.21.6-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.21.5-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.21.4-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.21.3-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.21.2-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.21.1-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.21.0-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm | 1.20.15-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm | 1.20.14-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm | 1.20.13-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm | 1.20.12-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm | 1.20.11-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm | 1.20.10-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.20.9-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.20.8-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
   kubeadm |  1.20.7-00 | http://apt.kubernetes.io kubernetes-xenial/main amd64 Packages
(이하 생략)
```

<br/>

### 1. **마스터 노드(컨트롤 플레인) 업그레이드[](https://v1-20.docs.kubernetes.io/ko/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/#%EC%BB%A8%ED%8A%B8%EB%A1%A4-%ED%94%8C%EB%A0%88%EC%9D%B8-%EB%85%B8%EB%93%9C-%EC%97%85%EA%B7%B8%EB%A0%88%EC%9D%B4%EB%93%9C)**

- 쿠버네티스 공식문서에서 업그레이드 명령어를 복사하고, kubeadm의 전체 버전명을 정확하게 수정한뒤 붙여넣기 한다(`kubeadm=1.20.x-00` ⇒ `kubeadm=1.20.0-00`).

```bash
apt-mark unhold kubeadm && \
apt-get update && apt-get install -y kubeadm=1.20.0-00 && \
apt-mark hold kubeadm
```

- **Tip: 현재 controlplane에서 작업하고있는지 반드시 확인 후 업그레이드 작업을 시작한다.**

<br/>

- 다운로드 하려는 버전이 잘 다운로드 되었는지 확인한다.

```bash
root@controlplane:~# kubeadm version
kubeadm version: &version.Info{Major:"1", Minor:"20", GitVersion:"v1.20.0", GitCommit:"af46c47ce925f4c4ad5cc8d1fca46c7b77d13b38", GitTreeState:"clean", BuildDate:"2020-12-08T17:57:36Z", GoVersion:"go1.15.5", Compiler:"gc", Platform:"linux/amd64"}
```

<br/>

- 업그레이드 계획을 확인한다.

```bash
root@controlplane:~# kubeadm upgrade plan
[upgrade/config] Making sure the configuration is correct:
[upgrade/config] Reading configuration from the cluster...
[upgrade/config] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -o yaml'
[preflight] Running pre-flight checks.
[upgrade] Running cluster health checks
[upgrade] Fetching available versions to upgrade to
[upgrade/versions] Cluster version: v1.19.0
[upgrade/versions] kubeadm version: v1.20.0
I0515 01:44:55.808176   12296 version.go:251] remote version is much newer: v1.24.0; falling back to: stable-1.20
[upgrade/versions] Latest stable version: v1.20.15
[upgrade/versions] Latest stable version: v1.20.15
[upgrade/versions] Latest version in the v1.19 series: v1.19.16
[upgrade/versions] Latest version in the v1.19 series: v1.19.16

Components that must be upgraded manually after you have upgraded the control plane with 'kubeadm upgrade apply':
COMPONENT   CURRENT       AVAILABLE
kubelet     2 x v1.19.0   v1.19.16

Upgrade to the latest version in the v1.19 series:

COMPONENT                 CURRENT   AVAILABLE
kube-apiserver            v1.19.0   v1.19.16
kube-controller-manager   v1.19.0   v1.19.16
kube-scheduler            v1.19.0   v1.19.16
kube-proxy                v1.19.0   v1.19.16
CoreDNS                   1.7.0     1.7.0
etcd                      3.4.9-1   3.4.9-1

You can now apply the upgrade by executing the following command:

        kubeadm upgrade apply v1.19.16

_____________________________________________________________________

Components that must be upgraded manually after you have upgraded the control plane with 'kubeadm upgrade apply':
COMPONENT   CURRENT       AVAILABLE
kubelet     2 x v1.19.0   v1.20.15

Upgrade to the latest stable version:

COMPONENT                 CURRENT   AVAILABLE
kube-apiserver            v1.19.0   v1.20.15
kube-controller-manager   v1.19.0   v1.20.15
kube-scheduler            v1.19.0   v1.20.15
kube-proxy                v1.19.0   v1.20.15
CoreDNS                   1.7.0     1.7.0
etcd                      3.4.9-1   3.4.13-0

You can now apply the upgrade by executing the following command:

        kubeadm upgrade apply v1.20.15

Note: Before you can perform this upgrade, you have to update kubeadm to v1.20.15.

_____________________________________________________________________

The table below shows the current state of component configs as understood by this version of kubeadm.
Configs that have a "yes" mark in the "MANUAL UPGRADE REQUIRED" column require manual config upgrade or
resetting to kubeadm defaults before a successful upgrade can be performed. The version to manually
upgrade to is denoted in the "PREFERRED VERSION" column.

API GROUP                 CURRENT VERSION   PREFERRED VERSION   MANUAL UPGRADE REQUIRED
kubeproxy.config.k8s.io   v1alpha1          v1alpha1            no
kubelet.config.k8s.io     v1beta1           v1beta1             no
_____________________________________________________________________
```

<br/>

- kubeadm 업그레이드 명령어(`sudo kubeadm upgrade apply v1.20.x` )를 복사한 뒤 올바른 버전(`sudo kubeadm upgrade apply v1.20.0`)으로 변경한 후 붙여넣기한다.

```bash
sudo kubeadm upgrade apply v1.20.0 -y
```

- **Tip: 업그레이드 명령어 뒤에 -y옵션을 주어 추가 다운로드에 대해 모두 Yes로 반응하도록 설정하면 편리**
- **Tipe: 업그레이드 완료 후 반드시 아래와 같이 SUCCESS 메시지가 출력되었는지 확인 한다.**

```bash
[upgrade/successful] SUCCESS! Your cluster was upgraded to "v1.20.0". Enjoy!

[upgrade/kubelet] Now that your control plane is upgraded, please proceed with upgrading your kubelets if you haven't already done so.
```

<br/>

- 컨트롤 플레인 노드를 drain(모든 pod를 해당 노드에서 unscheduling)한다.
    - 명령어 복사(`kubectl drain <node-to-drain> --ignore-daemonsets`) 후 대상 노드를 수정한 뒤 붙여넣기 한다.

```bash
root@controlplane:~# kubectl drain controlplane --ignore-daemonsets
node/controlplane cordoned
WARNING: ignoring DaemonSet-managed Pods: kube-system/kube-proxy-hpgrg, kube-system/weave-net-mp6bh
evicting pod admin2406/deploy3-5b6cff588b-5kxdh
evicting pod admin2406/deploy1-5799f5869d-jpgfz
evicting pod admin2406/deploy2-64885b458-jmvd5
evicting pod kube-system/coredns-74ff55c5b-j7k25
evicting pod admin2406/deploy5-78b86b74f-9rxj7
evicting pod default/gold-nginx-847f89b5b-cfrr8
evicting pod kube-system/coredns-74ff55c5b-58v24
evicting pod admin2406/deploy4-7869d88d64-xdcx9
I0515 01:54:52.043205   22973 request.go:645] Throttling request took 1.005358262s, request: GET:https://controlplane:6443/api/v1/namespaces/kube-system/pods/coredns-74ff55c5b-j7k25
pod/deploy2-64885b458-jmvd5 evicted
pod/deploy1-5799f5869d-jpgfz evicted
pod/deploy4-7869d88d64-xdcx9 evicted
pod/gold-nginx-847f89b5b-cfrr8 evicted
pod/coredns-74ff55c5b-58v24 evicted
pod/deploy5-78b86b74f-9rxj7 evicted
pod/coredns-74ff55c5b-j7k25 evicted
pod/deploy3-5b6cff588b-5kxdh evicted
node/controlplane evicted
```

<br/>

- 쿠버네티스 공식문서에서 kubelet과 kubectl 업그레이드 명령어를 복사한 뒤, 각각 올바른 버전으로 수정 후 명령어를 실행한다.

```bash
apt-mark unhold kubelet kubectl && \
apt-get update && apt-get install -y kubelet=1.20.0-00 kubectl=1.20.0-00 && \
apt-mark hold kubelet kubectl
```

<br/>

- 아래 명령어를 사용해 kubelet을 다시 시작한다.

```bash
sudo systemctl daemon-reload
sudo systemctl restart kubelet
```

<br/>

- uncordon 명령어(대상 노드이름으로 수정)를 이용해 노드에 파드를 다시 스케줄링한다.

```bash
root@controlplane:~# kubectl uncordon controlplane
node/controlplane uncordoned
```

<br/>

### **2. 워커 노드 업그레이드[](https://v1-20.docs.kubernetes.io/ko/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/#%EC%9B%8C%EC%BB%A4-%EB%85%B8%EB%93%9C-%EC%97%85%EA%B7%B8%EB%A0%88%EC%9D%B4%EB%93%9C)**

- `kubectl get nodes` 명령어(아래 예시에서는 축약어 사용)로 대상 노드를 확인한다.

```bash
root@controlplane:~# k get nodes 
NAME           STATUS   ROLES                  AGE    VERSION
controlplane   Ready    control-plane,master   104m   v1.20.0
node01         Ready    <none>                 103m   v1.19.0
```

<br/>

- ssh를 이용해 node01로 접속한다.

```bash
root@controlplane:~# ssh node01
Welcome to Ubuntu 18.04.5 LTS (GNU/Linux 5.4.0-1072-gcp x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage
This system has been minimized by removing packages and content that are
not required on a system that users do not log into.

To restore this content, you can run the 'unminimize' command.
root@node01:~#
```

- controlplane에서 node01로 잘 접속되었는지 확인한다.

<br/>

- 마스터노드 업그레이드와 같은 요령으로 kubeadm 버전을 업데이트한다.

```bash
apt-mark unhold kubeadm && \
apt-get update && apt-get install -y kubeadm=1.20.0-00 && \
apt-mark hold kubeadm
```

<br/>

- kubeadm 업그레이드 명령어를 호출해 로컬 kubelet 구성을 업그레이드한다.

```bash
root@node01:~# sudo kubeadm upgrade node
[upgrade] Reading configuration from the cluster...
[upgrade] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -o yaml'
[preflight] Running pre-flight checks
[preflight] Skipping prepull. Not a control plane node.
[upgrade] Skipping phase. Not a control plane node.
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[upgrade] The configuration for this node was successfully updated!
[upgrade] Now you should go ahead and upgrade the kubelet package using your package manager.
```

<br/>

- exit 명령어로 마스터 노드로 돌아간 뒤, 워커노드를 drain한다.

```bash
root@node01:~# exit
logout
Connection to node01 closed.
root@controlplane:~# kubectl drain node01 --ignore-daemonsets
node/node01 cordoned
WARNING: ignoring DaemonSet-managed Pods: kube-system/kube-proxy-rp74d, kube-system/weave-net-n5989
node/node01 drained
```

<br/>

- ssh로 워커노드(node01)로 재접속해 kubelet, kubectl을 업그레이드한다.

```bash
apt-mark unhold kubelet kubectl && \
apt-get update && apt-get install -y kubelet=1.20.0-00 kubectl=1.20.0-00 && \
apt-mark hold kubelet kubectl
```

<br/>

- kubelet을 재시작한다.

```bash
root@node01:~# sudo systemctl daemon-reload
root@node01:~# sudo systemctl restart kubelet
```

<br/>

- exit 명령어로 마스터노드로 돌아가 워커노드(node01)에 uncordon 명령어를 실행해준다.

```bash
kubectl uncordon node01
```

<br/>

- `kubectl get nodes` (예시에서는 축약어 사용)명령어를 사용해 v1.20.0버전으로 업데이트가 잘 수행되었는지 확인한다.

```bash
root@controlplane:~# k get nodes 
NAME           STATUS   ROLES                  AGE    VERSION
controlplane   Ready    control-plane,master   112m   v1.20.0
node01         Ready    <none>                 111m   v1.20.0
```

- 문제에서 제시되었던 파드(POD)가 controlplane에 스케줄링 되어있는지 확인한다.

```bash
root@controlplane:~# k get pod gold-nginx-847f89b5b-dcdkr -o wide
NAME                         READY   STATUS    RESTARTS   AGE   IP          NODE           NOMINATED NODE   READINESS GATES
gold-nginx-847f89b5b-dcdkr   1/1     Running   0          17m   10.50.0.3   controlplane   <none>           <none>
```

<br/>

## [참고 URL]

- kubeadm 클러스터 업그레이드: [https://kubernetes.io/ko/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/](https://kubernetes.io/ko/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/)
    - [https://v1-20.docs.kubernetes.io/ko/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/](https://v1-20.docs.kubernetes.io/ko/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/)

<br/>