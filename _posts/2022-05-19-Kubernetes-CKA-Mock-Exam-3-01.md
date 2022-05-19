---

published: true
title:  "[Kubernetes/CKA]모의고사 3.1 - 서비스 어카운트(Service Account) 생성 및 파드(POD)연결"
excerpt: "먼저 service account를 생성한다. 명령형 커맨드로 role을 생성한 뒤, role binding으로 role과 service account를 연결한다. 마찬가지로 명령형 커맨드로 파드 생성 시 옵션으로 서비스어카운트를 설정한다"

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스자격증, 유데미강의추천, 유데미쿠버네티스, cka연습문제풀이, cka덤프, cka기출문제, cka, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어]

toc: true
toc_sticky: true

date: 2022-05-19
last_modified_at: 2022-05-19

---

<br/><br/>

# 모의고사 3.1 - 서비스 어카운트(Service Account) 생성 및 파드(POD)연결

## 1. 문제 요건

Create a new service account with the name `pvviewer`. Grant this Service account access to `list` all PersistentVolumes in the cluster by creating an appropriate cluster role called `pvviewer-role` and ClusterRoleBinding called `pvviewer-role-binding`.Next, create a pod called `pvviewer` with the image: `redis` and serviceAccount: `pvviewer` in the default namespace.

- ServiceAccount: pvviewer
- ClusterRole: pvviewer-role
- ClusterRoleBinding: pvviewer-role-binding
- Pod: pvviewer
- Pod configured to use ServiceAccount pvviewer ?

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

### 2. 서비스 어카운트(Service Account) 생성 및 파드(POD) 연결

- 명령형 커맨드로 서비스 어카운트 생성

```bash
root@controlplane ~ ➜  k create sa pvviewer
serviceaccount/pvviewer created
```

<br/>

- `create` 명령어로 clusterrole을 생성한다.
    - Tip: `kubectl create clusterrole --help` 로 예문을 찾으면 편리하다.
    - Tip: 정확한 리소스이름을 알고싶다면 `kubectl api-resources | grep persistent` 로 찾을 수 있다.

```jsx
root@controlplane ~ ➜  k api-resources | grep persistent
persistentvolumeclaims            pvc          v1                                     true         PersistentVolumeClaim
persistentvolumes                 pv           v1                                     false        PersistentVolume

===

root@controlplane ~ ➜  kubectl create clusterrole pvviewer-role --verb=list --resource=persistentvolumes
clusterrole.rbac.authorization.k8s.io/pvviewer-role created
```

<br/>

- `create` 명령어로 clusterrolebinding을 생성한다.

```bash
root@controlplane ~ ➜  kubectl create clusterrolebinding pvviewer-role-binding --clusterrole=pvviewer-role --serviceaccount=default:pvviewer
clusterrolebinding.rbac.authorization.k8s.io/pvviewer-role-binding created
```

<br/>

- `describe` 명령어로 clusterrole & clusterrolebinding이 제대로 생성되었는지 확인한다.

```bash
root@controlplane ~ ➜  k describe clusterrole pvviewer-role 
Name:         pvviewer-role
Labels:       <none>
Annotations:  <none>
PolicyRule:
  Resources          Non-Resource URLs  Resource Names  Verbs
  ---------          -----------------  --------------  -----
  persistentvolumes  []                 []              [list]

root@controlplane ~ ➜  k describe clusterrolebindings.rbac.authorization.k8s.io pvviewer-role-binding 
Name:         pvviewer-role-binding
Labels:       <none>
Annotations:  <none>
Role:
  Kind:  ClusterRole
  Name:  pvviewer-role
Subjects:
  Kind            Name      Namespace
  ----            ----      ---------
  ServiceAccount  pvviewer  default
```

<br/>

- `run` 명령어로 파드를 생성한다.

```jsx
root@controlplane ~ ➜  k run pvviwer --image=redis --serviceaccount=pvviewer
pod/pvviwer created
```

<br/>

- `get -o yaml`명령어로 파드가 정상적으로 생성되었는지 확인하고 상세 내용을 확인한다.

```jsx
root@controlplane ~ ➜  k get pod pvviwer -o yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: "2022-05-19T12:14:12Z"
  labels:
    run: pvviwer
  managedFields:
  - apiVersion: v1
    fieldsType: FieldsV1
    fieldsV1:
      f:metadata:
        f:labels:
          .: {}
          f:run: {}
      f:spec:
        f:containers:
          k:{"name":"pvviwer"}:
            .: {}
            f:image: {}
            f:imagePullPolicy: {}
            f:name: {}
            f:resources: {}
            f:terminationMessagePath: {}
            f:terminationMessagePolicy: {}
        f:dnsPolicy: {}
        f:enableServiceLinks: {}
        f:restartPolicy: {}
        f:schedulerName: {}
        f:securityContext: {}
        f:serviceAccount: {}
        f:serviceAccountName: {}
        f:terminationGracePeriodSeconds: {}
    manager: kubectl-run
    operation: Update
    time: "2022-05-19T12:14:12Z"
  - apiVersion: v1
    fieldsType: FieldsV1
    fieldsV1:
      f:status:
        f:conditions:
          k:{"type":"ContainersReady"}:
            .: {}
            f:lastProbeTime: {}
            f:lastTransitionTime: {}
            f:status: {}
            f:type: {}
          k:{"type":"Initialized"}:
            .: {}
            f:lastProbeTime: {}
            f:lastTransitionTime: {}
            f:status: {}
            f:type: {}
          k:{"type":"Ready"}:
            .: {}
            f:lastProbeTime: {}
            f:lastTransitionTime: {}
            f:status: {}
            f:type: {}
        f:containerStatuses: {}
        f:hostIP: {}
        f:phase: {}
        f:podIP: {}
        f:podIPs:
          .: {}
          k:{"ip":"10.50.192.1"}:
            .: {}
            f:ip: {}
        f:startTime: {}
    manager: kubelet
    operation: Update
    time: "2022-05-19T12:14:22Z"
  name: pvviwer
  namespace: default
  resourceVersion: "1467"
  uid: 249d98de-dba2-401e-9c07-f9d3af226327
spec:
  containers:
  - image: redis
    imagePullPolicy: Always
    name: pvviwer
    resources: {}
    terminationMessagePath: /dev/termination-log
    terminationMessagePolicy: File
    volumeMounts:
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: pvviewer-token-spnjk
      readOnly: true
  dnsPolicy: ClusterFirst
  enableServiceLinks: true
  nodeName: node01
  preemptionPolicy: PreemptLowerPriority
  priority: 0
  restartPolicy: Always
  schedulerName: default-scheduler
  securityContext: {}
  serviceAccount: pvviewer
  serviceAccountName: pvviewer
  terminationGracePeriodSeconds: 30
  tolerations:
  - effect: NoExecute
    key: node.kubernetes.io/not-ready
    operator: Exists
    tolerationSeconds: 300
  - effect: NoExecute
    key: node.kubernetes.io/unreachable
    operator: Exists
    tolerationSeconds: 300
  volumes:
  - name: pvviewer-token-spnjk
    secret:
      defaultMode: 420
      secretName: pvviewer-token-spnjk
status:
  conditions:
  - lastProbeTime: null
    lastTransitionTime: "2022-05-19T12:14:12Z"
    status: "True"
    type: Initialized
  - lastProbeTime: null
    lastTransitionTime: "2022-05-19T12:14:22Z"
    status: "True"
    type: Ready
  - lastProbeTime: null
    lastTransitionTime: "2022-05-19T12:14:22Z"
    status: "True"
    type: ContainersReady
  - lastProbeTime: null
    lastTransitionTime: "2022-05-19T12:14:12Z"
    status: "True"
    type: PodScheduled
  containerStatuses:
  - containerID: docker://e3094f963d230b97ad0433c40c9ad2ee8b1c99ea7fc19f7289bbf2e84eecb05e
    image: redis:latest
    imageID: docker-pullable://redis@sha256:ad0705f2e2344c4b642449e658ef4669753d6eb70228d46267685045bf932303
    lastState: {}
    name: pvviwer
    ready: true
    restartCount: 0
    started: true
    state:
      running:
        startedAt: "2022-05-19T12:14:22Z"
  hostIP: 10.28.158.3
  phase: Running
  podIP: 10.50.192.1
  podIPs:
  - ip: 10.50.192.1
  qosClass: BestEffort
  startTime: "2022-05-19T12:14:12Z"
```

- 서비스 어카운트 및 서비스 어카운트 이름이 제대로 설정되었는지 확인한다.

<br/><br/>

## 3. 참고 URL

- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)