---
emoji: 🔧
title:  '쿠버네티스(Kubernetes) CKA 모의고사 2.1 - ETCD 백업 파일 생성하기'
date: '2022-05-18 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: 데브옵스
---

 모의고사 2.1 - ETCD 백업 파일 생성하기

## 1. 문제 요건

Take a backup of the etcd cluster and save it to `/opt/etcd-backup.db`.

- Backup Completed

<br/><br/>

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다(이미 진행했다면 불필요).

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

<br/><br/>

### 2. ETCD 백업파일 생성

- get 명령어로 etcd 파드 이름을 찾는다.

```bash
root@controlplane ~ ➜  k get pods -n kube-system 
NAME                                   READY   STATUS    RESTARTS   AGE
coredns-74ff55c5b-2cf6t                1/1     Running   0          17m
coredns-74ff55c5b-vcq46                1/1     Running   0          17m
etcd-controlplane                      1/1     Running   0          18m
kube-apiserver-controlplane            1/1     Running   0          18m
kube-controller-manager-controlplane   1/1     Running   0          18m
kube-proxy-9wlvh                       1/1     Running   0          17m
kube-proxy-rmcf6                       1/1     Running   0          17m
kube-scheduler-controlplane            1/1     Running   0          18m
weave-net-h74h2                        2/2     Running   1          17m
weave-net-v77kn                        2/2     Running   0          17m
```

<br/>

- describe 명령어로 etcd 백업에 필요한 내용들을 확인한다.

```bash
root@controlplane ~ ➜  k describe pod -n kube-system etcd-controlplane 
Name:                 etcd-controlplane
Namespace:            kube-system
Priority:             2000001000
Priority Class Name:  system-node-critical
Node:                 controlplane/10.33.195.6
Start Time:           Tue, 17 May 2022 13:16:59 +0000
Labels:               component=etcd
                      tier=control-plane
Annotations:          kubeadm.kubernetes.io/etcd.advertise-client-urls: https://10.33.195.6:2379
                      kubernetes.io/config.hash: fb131373ab567ef644cab42ba7a9234a
                      kubernetes.io/config.mirror: fb131373ab567ef644cab42ba7a9234a
                      kubernetes.io/config.seen: 2022-05-17T13:16:57.930616180Z
                      kubernetes.io/config.source: file
Status:               Running
IP:                   10.33.195.6
IPs:
  IP:           10.33.195.6
Controlled By:  Node/controlplane
Containers:
  etcd:
    Container ID:  docker://7c8ad68c241e98453154d077113bec3195c5fdf088fdb0a5383d3dce7d36405a
    Image:         k8s.gcr.io/etcd:3.4.13-0
    Image ID:      docker-pullable://k8s.gcr.io/etcd@sha256:4ad90a11b55313b182afc186b9876c8e891531b8db4c9bf1541953021618d0e2
    Port:          <none>
    Host Port:     <none>
    Command:
      etcd
      --advertise-client-urls=https://10.33.195.6:2379
      --cert-file=/etc/kubernetes/pki/etcd/server.crt
      --client-cert-auth=true
      --data-dir=/var/lib/etcd
      --initial-advertise-peer-urls=https://10.33.195.6:2380
      --initial-cluster=controlplane=https://10.33.195.6:2380
      --key-file=/etc/kubernetes/pki/etcd/server.key
      --listen-client-urls=https://127.0.0.1:2379,https://10.33.195.6:2379
      --listen-metrics-urls=http://127.0.0.1:2381
      --listen-peer-urls=https://10.33.195.6:2380
      --name=controlplane
      --peer-cert-file=/etc/kubernetes/pki/etcd/peer.crt
      --peer-client-cert-auth=true
      --peer-key-file=/etc/kubernetes/pki/etcd/peer.key
      --peer-trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
      --snapshot-count=10000
      --trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
    State:          Running
      Started:      Tue, 17 May 2022 13:16:38 +0000
    Ready:          True
    Restart Count:  0
    Requests:
      cpu:                100m
      ephemeral-storage:  100Mi
      memory:             100Mi
    Liveness:             http-get http://127.0.0.1:2381/health delay=10s timeout=15s period=10s #success=1 #failure=8
    Startup:              http-get http://127.0.0.1:2381/health delay=10s timeout=15s period=10s #success=1 #failure=24
    Environment:          <none>
    Mounts:
      /etc/kubernetes/pki/etcd from etcd-certs (rw)
      /var/lib/etcd from etcd-data (rw)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  etcd-certs:
    Type:          HostPath (bare host directory volume)
    Path:          /etc/kubernetes/pki/etcd
    HostPathType:  DirectoryOrCreate
  etcd-data:
    Type:          HostPath (bare host directory volume)
    Path:          /var/lib/etcd
    HostPathType:  DirectoryOrCreate
QoS Class:         Burstable
Node-Selectors:    <none>
Tolerations:       :NoExecute op=Exists
Events:
  Type    Reason  Age   From     Message
  ----    ------  ----  ----     -------
  Normal  Pulled  19m   kubelet  Container image "k8s.gcr.io/etcd:3.4.13-0" already present on machine
```

```bash
ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 \
  --cacert=<trusted-ca-file> --cert=<cert-file> --key=<key-file> \
  snapshot save <backup-file-location>
```

<br/>

- etcdctl 실행 시 필요한 파라미터값들을 확인하며 메모로 남겨 놓은 뒤 알맞은 정보를 채워넣는다.

```bash
--listen-client-urls=https://127.0.0.1:2379,https://10.33.195.6:2379
--cert-file=/etc/kubernetes/pki/etcd/server.crt  
--key-file=/etc/kubernetes/pki/etcd/server.key
--trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt

====

ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt --cert=/etc/kubernetes/pki/etcd/server.crt --key=/etc/kubernetes/pki/etcd/server.key \
  snapshot save /opt/etcd-backup.db
```

<br/>

- ETCD 백업 파일이 잘 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  ETCDCTL_API=3 etcdctl --write-out=table snapshot status /opt/etcd-backup.db
+----------+----------+------------+------------+
|   HASH   | REVISION | TOTAL KEYS | TOTAL SIZE |
+----------+----------+------------+------------+
| 6040e181 |     2738 |       1027 |     2.4 MB |
+----------+----------+------------+------------+
```

<br/><br/>

## 3. 참고 URL

- ETCD backup: [https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#backing-up-an-etcd-cluster](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#backing-up-an-etcd-cluster)
  
<br/>