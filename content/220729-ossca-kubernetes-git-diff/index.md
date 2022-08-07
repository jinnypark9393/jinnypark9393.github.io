---
emoji: 🔧
title:  오픈소스 컨트리뷰션 아카데미(쿠버네티스 한글화) - diff_l10n_branches.py 스크립트 실행해보기
date: '2022-07-29 06:00:00'
author: jinnypark9393
tags: kubernetes
categories: OSSCA
---

오픈소스 컨트리뷰션 아카데미 쿠버네티스 한글화 프로젝트 3주차 Action Item 중 하나인 diff_l10n_branches.py 스크립트 실행해보기를 진행하고 기록으로 남겨보려 한다.

<br/>

diff_l10n_branches.py 스크립트는 쿠버네티스 한글화 프로젝트에서 마일스톤(약 3주 주기로 한글화 전용 개발 브랜치에서 k8s 메인 브랜치로 병합하는 주기)별로 기존에 번역된 문서 중 업데이트가 필요한 문서를 리포트형식으로 뽑아주는 스크립트이다.

<br/>

따라서 마일스톤이 바뀔때마다 이 스크립트를 사용해 리포트를 뽑은 뒤, [이슈](https://github.com/kubernetes/website/issues/34903)를 생성하여 컨트리뷰터들이 자율적으로 일감을 맡아 업데이트를 진행하게 된다.

<br/><br/>

# 1. 사전 준비

- `kubernetes/website` 저장소를 개인 저장소로 fork한 뒤, fork한 저장소를 로컬에 clone해 놓는다(참고 링크).
- python3를 설치(macOS의 경우 brew로 다운로드)한다.
    
    ```bash
    $ brew install python3
    $ python3 --version
    ```

<br/>

- 스크립트 실행에 필요한 모듈을 다운로드한다([참고 링크](https://github.com/kubernetes/website/blob/main/scripts/README.md#requirements)).
    
    ```bash
    python3 -m pip install -r requirements.txt
    ```
    
    - website > scripts 하위에 위치한 `diff_l10n_branches.py` 파일을 열어보면 알겠지만 해당 파이썬 파일은 os, subprocess, jinja2, click 총 4개의 모듈을 사용하고 있다. `pip install <모듈명>` 으로 하나하나 다운 받아도 되지만 위와 같이 script 디렉터리의 requirements.txt 파일을 활용하면 한꺼번에 필요한 모듈을 다운받을 수 있기 때문에 해당 모듈이 설치되지 않은 경우 위의 명령어를 실행해주자.

<br/><br/>

# 2. 스크립트 실행하기

 사전 작업이 끝나면 아래와 같이 스크립트를 실행해주자.

```bash
➜  website git:(jinnypark9393/update-outdated-dev-1.24-ko.1-M36-M39) python3 ./scripts/diff_l10n_branches.py ko upstream/dev-1.24-ko.1 upstream/dev-1.24-ko.2
```

<br/>

위 명령어를 실행하면 영문 원문이 변경된 내역이 아래와 같이 출력되며, 문서별 추가/삭제된 라인 수도 함께 확인할 수 있다.

```bash
# This is a Bug Report
## Problem
Outdated files in the upstream/dev-1.24-ko.2 branch.

### 125 files to be modified 
1. [ ] M1.  `content/en/_index.html`  | 2(+XS) 2(-)
1. [ ] M2.  `content/en/community/code-of-conduct.md`  | 2(+XS) 2(-)
1. [ ] M3.  `content/en/community/static/cncf-code-of-conduct.md`  | 53(+M) 26(-)
1. [ ] M4.  `content/en/docs/concepts/architecture/control-plane-node-communication.md`  | 75(+M) 28(-)
1. [ ] M5.  `content/en/docs/concepts/architecture/nodes.md`  | 2(+XS) 2(-)
1. [ ] M6.  `content/en/docs/concepts/cluster-administration/_index.md`  | 2(+XS) 2(-)
1. [ ] M7.  `content/en/docs/concepts/cluster-administration/addons.md`  | 6(+XS) 6(-)
1. [ ] M8.  `content/en/docs/concepts/cluster-administration/manage-deployment.md`  | 1(+XS) 1(-)
1. [ ] M9.  `content/en/docs/concepts/cluster-administration/networking.md`  | 1(+XS) 1(-)
1. [ ] M10.  `content/en/docs/concepts/configuration/manage-resources-containers.md`  | 1(+XS) 1(-)
1. [ ] M11.  `content/en/docs/concepts/configuration/organize-cluster-access-kubeconfig.md`  | 5(+XS) 6(-)
1. [ ] M12.  `content/en/docs/concepts/configuration/secret.md`  | 28(+S) 17(-)
1. [ ] M13.  `content/en/docs/concepts/containers/runtime-class.md`  | 1(+XS) 1(-)
1. [ ] **M14.**  `content/en/docs/concepts/extend-kubernetes/_index.md`  | **108(+L) 48(-)**
1. [ ] M15.  `content/en/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins.md`  | 1(+XS) 1(-)
1. [ ] M16.  `content/en/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins.md`  | 25(+S) 16(-)
1. [ ] M17.  `content/en/docs/concepts/extend-kubernetes/operator.md`  | 2(+XS) 0(-)
1. [ ] M18.  `content/en/docs/concepts/overview/kubernetes-api.md`  | 1(+XS) 1(-)
1. [ ] M19.  `content/en/docs/concepts/overview/working-with-objects/kubernetes-objects.md`  | 1(+XS) 1(-)
1. [ ] M20.  `content/en/docs/concepts/overview/working-with-objects/names.md`  | 1(+XS) 1(-)
1. [ ] M21.  `content/en/docs/concepts/policy/limit-range.md`  | 1(+XS) 1(-)
1. [ ] M22.  `content/en/docs/concepts/policy/resource-quotas.md`  | 3(+XS) 4(-)
1. [ ] M23.  `content/en/docs/concepts/scheduling-eviction/assign-pod-node.md`  | 6(+XS) 7(-)
1. [ ] M24.  `content/en/docs/concepts/scheduling-eviction/pod-overhead.md`  | 1(+XS) 1(-)
1. [ ] M25.  `content/en/docs/concepts/scheduling-eviction/resource-bin-packing.md`  | 63(+M) 33(-)
1. [ ] M26.  `content/en/docs/concepts/scheduling-eviction/taint-and-toleration.md`  | 1(+XS) 2(-)
1. [ ] M27.  `content/en/docs/concepts/security/controlling-access.md`  | 1(+XS) 0(-)
1. [ ] M28.  `content/en/docs/concepts/services-networking/_index.md`  | 7(+XS) 8(-)
1. [ ] M29.  `content/en/docs/concepts/services-networking/dns-pod-service.md`  | 49(+M) 31(-)
1. [ ] **M30.**  `content/en/docs/concepts/services-networking/dual-stack.md`  | **200(+L) 133(-)**
1. [ ] M31.  `content/en/docs/concepts/services-networking/ingress-controllers.md`  | 1(+XS) 0(-)
1. [ ] M32.  `content/en/docs/concepts/services-networking/ingress.md`  | 4(+XS) 54(-)
1. [ ] M33.  `content/en/docs/concepts/services-networking/network-policies.md`  | 2(+XS) 2(-)
1. [ ] M34.  `content/en/docs/concepts/services-networking/service-traffic-policy.md`  | 6(+XS) 0(-)
1. [ ] M35.  `content/en/docs/concepts/services-networking/service.md`  | 22(+S) 2(-)
1. [ ] M36.  `content/en/docs/concepts/storage/ephemeral-volumes.md`  | 1(+XS) 1(-)
1. [ ] M37.  `content/en/docs/concepts/storage/persistent-volumes.md`  | 11(+S) 2(-)
1. [ ] M38.  `content/en/docs/concepts/storage/storage-classes.md`  | 1(+XS) 1(-)
1. [ ] M39.  `content/en/docs/concepts/storage/volumes.md`  | 55(+M) 15(-)
1. [ ] M40.  `content/en/docs/concepts/workloads/controllers/job.md`  | 73(+M) 14(-)
1. [ ] M41.  `content/en/docs/concepts/workloads/controllers/replicaset.md`  | 5(+XS) 5(-)
1. [ ] M42.  `content/en/docs/concepts/workloads/pods/init-containers.md`  | 1(+XS) 0(-)
1. [ ] M43.  `content/en/docs/concepts/workloads/pods/pod-topology-spread-constraints.md`  | 9(+XS) 8(-)
1. [ ] M44.  `content/en/docs/contribute/_index.md`  | 8(+XS) 1(-)
1. [ ] M45.  `content/en/docs/contribute/advanced.md`  | 3(+XS) 3(-)
1. [ ] **M46.**  `content/en/docs/contribute/new-content/open-a-pr.md`  | **299(+L) 270(-)**
1. [ ] M47.  `content/en/docs/contribute/participate/_index.md`  | 1(+XS) 1(-)
1. [ ] M48.  `content/en/docs/contribute/participate/pr-wranglers.md`  | 2(+XS) 2(-)
1. [ ] M49.  `content/en/docs/contribute/participate/roles-and-responsibilities.md`  | 1(+XS) 1(-)
1. [ ] M50.  `content/en/docs/contribute/review/for-approvers.md`  | 2(+XS) 2(-)
1. [ ] M51.  `content/en/docs/contribute/review/reviewing-prs.md`  | 53(+M) 34(-)
1. [ ] M52.  `content/en/docs/contribute/suggesting-improvements.md`  | 1(+XS) 0(-)
1. [ ] M53.  `content/en/docs/home/supported-doc-versions.md`  | 5(+XS) 0(-)
1. [ ] M54.  `content/en/docs/reference/_index.md`  | 5(+XS) 2(-)
1. [ ] M55.  `content/en/docs/reference/access-authn-authz/_index.md`  | 2(+XS) 0(-)
1. [ ] M56.  `content/en/docs/reference/command-line-tools-reference/feature-gates.md`  | 3(+XS) 3(-)
1. [ ] **M57.**  `content/en/docs/reference/command-line-tools-reference/kube-proxy.md`  | **104(+L) 48(-)**
1. [ ] M58.  `content/en/docs/reference/glossary/managed-service.md`  | 3(+XS) 0(-)
1. [ ] M59.  `content/en/docs/reference/glossary/service-catalog.md`  | 3(+XS) 3(-)
1. [ ] M60.  `content/en/docs/reference/kubectl/cheatsheet.md`  | 6(+XS) 3(-)
1. [ ] M61.  `content/en/docs/reference/labels-annotations-taints/_index.md`  | 59(+M) 41(-)
1. [ ] M62.  `content/en/docs/reference/ports-and-protocols.md`  | 1(+XS) 1(-)
1. [ ] M63.  `content/en/docs/reference/using-api/_index.md`  | 3(+XS) 3(-)
1. [ ] M64.  `content/en/docs/reference/using-api/client-libraries.md`  | 11(+S) 8(-)
1. [ ] M65.  `content/en/docs/setup/_index.md`  | 9(+XS) 1(-)
1. [ ] M66.  `content/en/docs/setup/best-practices/certificates.md`  | 1(+XS) 1(-)
1. [ ] **M67.**  `content/en/docs/setup/production-environment/_index.md`  | **157(+L) 141(-)**
1. [ ] M68.  `content/en/docs/setup/production-environment/container-runtimes.md`  | 92(+M) 35(-)
1. [ ] M69.  `content/en/docs/setup/production-environment/tools/kubeadm/install-kubeadm.md`  | 1(+XS) 22(-)
1. [ ] M70.  `content/en/docs/setup/production-environment/tools/kubespray.md`  | 2(+XS) 2(-)
1. [ ] M71.  `content/en/docs/tasks/access-application-cluster/access-cluster-services.md`  | 10(+S) 10(-)
1. [ ] M72.  `content/en/docs/tasks/access-application-cluster/access-cluster.md`  | 1(+XS) 1(-)
1. [ ] M73.  `content/en/docs/tasks/access-application-cluster/communicate-containers-same-pod-shared-volume.md`  | 1(+XS) 1(-)
1. [ ] M74.  `content/en/docs/tasks/access-application-cluster/configure-access-multiple-clusters.md`  | 8(+XS) 7(-)
1. [ ] **M75.**  `content/en/docs/tasks/access-application-cluster/port-forward-access-application-cluster.md`  | **102(+L) 116(-)**
1. [ ] **M76.**  `content/en/docs/tasks/administer-cluster/certificates.md`  | **252(+L) 200(-)**
1. [ ] M77.  `content/en/docs/tasks/administer-cluster/kubeadm/kubeadm-certs.md`  | 2(+XS) 2(-)
1. [ ] **M78.**  `content/en/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade.md`  | **155(+L) 138(-)**
1. [ ] M79.  `content/en/docs/tasks/administer-cluster/kubeadm/upgrading-windows-nodes.md`  | 15(+S) 10(-)
1. [ ] M80.  `content/en/docs/tasks/administer-cluster/manage-resources/cpu-constraint-namespace.md`  | 7(+XS) 4(-)
1. [ ] M81.  `content/en/docs/tasks/administer-cluster/manage-resources/cpu-default-namespace.md`  | 2(+XS) 1(-)
1. [ ] M82.  `content/en/docs/tasks/administer-cluster/manage-resources/memory-constraint-namespace.md`  | 5(+XS) 4(-)
1. [ ] M83.  `content/en/docs/tasks/administer-cluster/manage-resources/memory-default-namespace.md`  | 1(+XS) 1(-)
1. [ ] M84.  `content/en/docs/tasks/configure-pod-container/assign-memory-resource.md`  | 4(+XS) 4(-)
1. [ ] M85.  `content/en/docs/tasks/configure-pod-container/assign-pods-nodes.md`  | 1(+XS) 1(-)
1. [ ] M86.  `content/en/docs/tasks/configure-pod-container/configure-persistent-volume-storage.md`  | 2(+XS) 2(-)
1. [ ] M87.  `content/en/docs/tasks/configure-pod-container/configure-pod-initialization.md`  | 1(+XS) 0(-)
1. [ ] M88.  `content/en/docs/tasks/configure-pod-container/configure-runasusername.md`  | 4(+XS) 4(-)
1. [ ] M89.  `content/en/docs/tasks/configure-pod-container/static-pod.md`  | 6(+XS) 6(-)
1. [ ] M90.  `content/en/docs/tasks/debug/debug-application/debug-pods.md`  | 2(+XS) 2(-)
1. [ ] M91.  `content/en/docs/tasks/debug/debug-cluster/_index.md`  | 61(+M) 48(-)
1. [ ] M92.  `content/en/docs/tasks/debug/debug-cluster/resource-metrics-pipeline.md`  | 2(+XS) 2(-)
1. [ ] M93.  `content/en/docs/tasks/debug/debug-cluster/resource-usage-monitoring.md`  | 5(+XS) 2(-)
1. [ ] M94.  `content/en/docs/tasks/inject-data-application/define-interdependent-environment-variables.md`  | 1(+XS) 1(-)
1. [ ] M95.  `content/en/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information.md`  | 45(+M) 100(-)
1. [ ] M96.  `content/en/docs/tasks/inject-data-application/environment-variable-expose-pod-information.md`  | 43(+M) 44(-)
1. [ ] M97.  `content/en/docs/tasks/job/automated-tasks-with-cron-jobs.md`  | 40(+M) 32(-)
1. [ ] M98.  `content/en/docs/tasks/manage-daemon/update-daemon-set.md`  | 1(+XS) 1(-)
1. [ ] M99.  `content/en/docs/tasks/run-application/force-delete-stateful-set-pod.md`  | 1(+XS) 1(-)
1. [ ] M100.  `content/en/docs/tasks/run-application/horizontal-pod-autoscale.md`  | 4(+XS) 4(-)
1. [ ] M101.  `content/en/docs/tasks/tls/certificate-rotation.md`  | 1(+XS) 1(-)
1. [ ] M102.  `content/en/docs/tasks/tools/included/optional-kubectl-configs-bash-linux.md`  | 1(+XS) 1(-)
1. [ ] M103.  `content/en/docs/tasks/tools/included/optional-kubectl-configs-bash-mac.md`  | 1(+XS) 1(-)
1. [ ] M104.  `content/en/docs/tasks/tools/install-kubectl-linux.md`  | 1(+XS) 2(-)
1. [ ] M105.  `content/en/docs/tutorials/configuration/configure-java-microservice/configure-java-microservice-interactive.html`  | 1(+XS) 1(-)
1. [ ] M106.  `content/en/docs/tutorials/configuration/configure-redis-using-configmap.md`  | 3(+XS) 3(-)
1. [ ] M107.  `content/en/docs/tutorials/kubernetes-basics/create-cluster/cluster-interactive.html`  | 1(+XS) 1(-)
1. [ ] M108.  `content/en/docs/tutorials/kubernetes-basics/deploy-app/deploy-interactive.html`  | 1(+XS) 1(-)
1. [ ] M109.  `content/en/docs/tutorials/kubernetes-basics/explore/explore-interactive.html`  | 1(+XS) 1(-)
1. [ ] M110.  `content/en/docs/tutorials/kubernetes-basics/expose/expose-interactive.html`  | 1(+XS) 1(-)
1. [ ] M111.  `content/en/docs/tutorials/kubernetes-basics/expose/expose-intro.html`  | 1(+XS) 1(-)
1. [ ] M112.  `content/en/docs/tutorials/kubernetes-basics/scale/scale-interactive.html`  | 1(+XS) 1(-)
1. [ ] M113.  `content/en/docs/tutorials/kubernetes-basics/update/update-interactive.html`  | 1(+XS) 1(-)
1. [ ] M114.  `content/en/docs/tutorials/security/cluster-level-pss.md`  | 8(+XS) 5(-)
1. [ ] M115.  `content/en/docs/tutorials/services/source-ip.md`  | 3(+XS) 26(-)
1. [ ] M116.  `content/en/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume.md`  | 2(+XS) 2(-)
1. [ ] M117.  `content/en/docs/tutorials/stateful-application/zookeeper.md`  | 2(+XS) 2(-)
1. [ ] M118.  `content/en/examples/application/mysql/mysql-configmap.yaml`  | 1(+XS) 2(-)
1. [ ] M119.  `content/en/examples/application/mysql/mysql-services.yaml`  | 3(+XS) 0(-)
1. [ ] M120.  `content/en/examples/application/mysql/mysql-statefulset.yaml`  | 2(+XS) 0(-)
1. [ ] M121.  `content/en/examples/controllers/job.yaml`  | 1(+XS) 1(-)
1. [ ] M122.  `content/en/examples/pods/pod-with-affinity-anti-affinity.yaml`  | 4(+XS) 3(-)
1. [ ] M123.  `content/en/includes/task-tutorial-prereqs.md`  | 1(+XS) 1(-)
1. [ ] M124.  `content/en/releases/_index.md`  | 2(+XS) 2(-)
1. [ ] M125.  `content/en/releases/version-skew-policy.md`  | 32(+M) 32(-)

### 0 files to be renamed  

### 6 files to be deleted 
1. [ ] D1.  `content/en/docs/concepts/extend-kubernetes/service-catalog.md`
1. [ ] D2.  `content/en/docs/reference/glossary/service-broker.md`
1. [ ] D3.  `content/en/docs/setup/production-environment/windows/intro-windows-in-kubernetes.md`
1. [ ] D4.  `content/en/docs/tasks/administer-cluster/kubeadm/adding-windows-nodes.md`
1. [ ] D5.  `content/en/docs/tasks/service-catalog/_index.md`
1. [ ] D6.  `content/en/docs/tasks/service-catalog/install-service-catalog-using-sc.md`

## Proposed Solution

Use `git diff` to check what is changed in the upstream. And apply the upstream changes manually 
to the `content/ko` of `upstream/dev-1.24-ko.2` branch.

For example:

# checkout `upstream/dev-1.24-ko.2`
...
# check what is updated in the upstream 
git diff upstream/dev-1.24-ko.1 upstream/dev-1.24-ko.2 -- content/en/_index.html
# apply changes to content/ko
vi content/ko/_index.html
...
# commit and push
...
# make PR to `upstream/dev-1.24-ko.2`


## Pages to Update

Pages in content/ko
```

이 외에도 scripts 디렉터리 내에 스크립트 파일이 여럿 있던데 한글화 작업에 활용할만한 것이 있는지 찾아봐야겠다. 참고로 SIG-Docs 기여 작업에 도움이되는 스크립트 파일들에 대한 설명은 [이 링크](https://github.com/kubernetes/website/blob/main/scripts/README.md)에서 확인할 수 있다.
