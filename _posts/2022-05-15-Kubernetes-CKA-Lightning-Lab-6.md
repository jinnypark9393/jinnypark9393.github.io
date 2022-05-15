---

published: true
title:  "[Kubernetes/CKA]Lightning Lab 6 - ETCD 백업파일 생성하기"
excerpt: "ETCD를 백업하기 위해서는 etcd의 파드(POD) 참조"

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

# 6. ETCD 백업파일 생성하기

## [문제 요건]

- ETCD 백업을 `controlplane` 의 `/opt/etcd-backup.db`에 생성한다.
- 채점기준: 트러블 슈팅으로 이슈 해결

<br/><br/>

## [내 풀이]

- `kubectl describe pod etcd -n kube-system` 명령어를 사용해 etcd 파드 정보를 확인한다.

```bash
root@controlplane:/opt# k describe pod etcd -n kube-system 
Name:                 etcd-controlplane
Namespace:            kube-system
Priority:             2000001000
Priority Class Name:  system-node-critical
Node:                 controlplane/10.4.57.3
Start Time:           Sun, 15 May 2022 04:14:46 +0000
Labels:               component=etcd
                      tier=control-plane
Annotations:          kubeadm.kubernetes.io/etcd.advertise-client-urls: https://10.4.57.3:2379
                      kubernetes.io/config.hash: 722e84fe51d881b86833db89a526d572
                      kubernetes.io/config.mirror: 722e84fe51d881b86833db89a526d572
                      kubernetes.io/config.seen: 2022-05-15T04:14:44.965341411Z
                      kubernetes.io/config.source: file
Status:               Running
IP:                   10.4.57.3
IPs:
  IP:           10.4.57.3
Controlled By:  Node/controlplane
Containers:
  etcd:
    Container ID:  docker://08595528da5102b7b25f6498f97630b6b0bcef22c4f5e2ad93156112cffa63dd
    Image:         k8s.gcr.io/etcd:3.4.9-1
    Image ID:      docker-pullable://k8s.gcr.io/etcd@sha256:735f090b15d5efc576da1602d8c678bf39a7605c0718ed915daec8f2297db2ff
    Port:          <none>
    Host Port:     <none>
    Command:
      etcd
      --advertise-client-urls=https://10.4.57.3:2379
      --cert-file=/etc/kubernetes/pki/etcd/server.crt
      --client-cert-auth=true
      --data-dir=/var/lib/etcd
      --initial-advertise-peer-urls=https://10.4.57.3:2380
      --initial-cluster=controlplane=https://10.4.57.3:2380
      --key-file=/etc/kubernetes/pki/etcd/server.key
      --listen-client-urls=https://127.0.0.1:2379,https://10.4.57.3:2379
      --listen-metrics-urls=http://127.0.0.1:2381
      --listen-peer-urls=https://10.4.57.3:2380
      --name=controlplane
      --peer-cert-file=/etc/kubernetes/pki/etcd/peer.crt
      --peer-client-cert-auth=true
      --peer-key-file=/etc/kubernetes/pki/etcd/peer.key
      --peer-trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
      --snapshot-count=10000
      --trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
    State:          Running
      Started:      Sun, 15 May 2022 04:14:31 +0000
    Ready:          True
    Restart Count:  0
    Liveness:       http-get http://127.0.0.1:2381/health delay=10s timeout=15s period=10s #success=1 #failure=8
    Startup:        http-get http://127.0.0.1:2381/health delay=10s timeout=15s period=10s #success=1 #failure=24
    Environment:    <none>
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
QoS Class:         BestEffort
Node-Selectors:    <none>
Tolerations:       :NoExecuteop=Exists
Events:            <none>
```

- 위의 etcd 파드(POD)의 정보를 참조하여 백업 명령어를 작성한다.

```bash
root@controlplane:/opt# ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 \
>   --cacert=/etc/kubernetes/pki/etcd/ca.crt --cert=/etc/kubernetes/pki/etcd/server.crt --key=/etc/kubernetes/pki/etcd/server.key \
>   snapshot save /opt/etcd-backup.db
Snapshot saved at /opt/etcd-backup.db
```

- `--endpoints` : listen-client-urls 참조
- `--cacert` : trusted-ca-file 참조
- `--cert` : cert-file 참조
- `--key` : key-file 참조

<br/>

- 백업파일이 잘 생성되었는지 확인한다.

```bash
root@controlplane:/opt# ETCDCTL_API=3 etcdctl --write-out=table snapshot status /opt/etcd-backup.db
+----------+----------+------------+------------+
|   HASH   | REVISION | TOTAL KEYS | TOTAL SIZE |
+----------+----------+------------+------------+
| aca19208 |    10592 |       1317 |     2.8 MB |
+----------+----------+------------+------------+
```

## [참고 URL]

- etcd backup: [https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#backing-up-an-etcd-cluster](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#backing-up-an-etcd-cluster)