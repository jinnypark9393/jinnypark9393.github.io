---

published: true
title:  "[Kubernetes]HPA “failed to get memory utilization: missing request for memory” / Pod의 current metric = Unknown 에러 해결"
excerpt: "Horizontal Pod Autoscaler가 Pod의 현재 메트릭을 수집하지 못할 경우, Deployment/ReplicationController/Statefulset의 requested cpu/memory가 제대로 설정되었는지 확인하자"

categories:
- DevOps
tags:
- [쿠버네티스, k8s에러, hpa에러, metricserver, cka, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어, hpa, horizontalpodautoscaler, cka모의고사]

toc: true
toc_sticky: true

date: 2022-06-16
last_modified_at: 2022-06-16

---

<br/><br/>

# 1. 배경 상황

컨테이너 전환 프로젝트 진행 중 운영 파드들에는 리소스 사용량이 증가하면 스케일아웃(scale-out)을 HPA를 설정해두었었는데, HPA에서 일부 파드의 현재 메트릭을 수집하지 못해 `Unknown` 상태로 떠있게 되었다. 이렇게 될 경우 실제 사용 HPA에서 설정해 둔 리소스의 임계값을 넘게 되어도 오토 스케일링이 작동하지 않게되는 문제가 발생한다.

<br/>

- HPA(Horizontal Pod Autoscaler): 리소스 사용량에 따라 쿠버네티스의 워크로드 리소스(디플로이먼트 혹은 스테이트풀셋)를 스케일 아웃(scale-out)하는 오브젝트. 참고로 daemonset은 HPA설정이 불가하다.

<br/><br/>

# 2. 해결 방법

경험 상 HPA의 현재 메트릭이 `Unknown` 상태로 빠지는 건 아래의 두 가지 경우 중 하나였다.

<br/>

## 1. Deployment/ReplicationController/Statefulset의 replica = 0인 경우

HPA는 쿠버네티스의 metrics-server로부터 받은 현재 리소스 사용량 데이터를 기준으로 오토스케일링을 진행하게 되는데, replica가 0으로 Pod가 아예 뜨지 않은 경우 사용량 데이터를 집계할 대상이 존재하지 않기 때문에 현재 리소스 사용량이 Unknown 상태가 된다.

<br/>

따라서 HPA가 동작하지 않게 되며, HPA에서 설정한 min(replica수) 값에 영향을 받지 않고 파드 개수가 그대로 0으로 남게 된다.

<br/>

만약 replicas를 0으로 설정한 것이 파드 수를 0으로 바꾸는 것이 원래 목적이었다면 그대로 두면 되고, 아니라면 원하는 파드 수만큼 replica 수를 Deployment(혹은 ReplicationController / Statefulset) 원하는 값으로 변경하면 된다.

## 2. Pod의 requested CPU/memory = 0이거나 존재하지 않는 경우

두번째 경우가 이번에 경험한 상황인데, Metrics Server에서는 requested resource, HPA를 설정할 때 최소 리소스 요청값인 `**requested` 항목의 값이 존재하지 않거나 0인 경우**, 메트릭 서버에서 현재 메트릭을 수집하지 않게 되어 HPA에서의 현재 리소스 사용률이 `Unknown`으로 표시된다(상세 내용은 [링크 참조](https://github.com/kubernetes-sigs/metrics-server/blob/master/KNOWN_ISSUES.md#hpa-is-unable-to-get-resource-utilization)).

<br/>


이 때 클러스터의 Events를 확인하게 되면 아래와 같은 메시지가 발생하게 된다.

```sql
failed to get memory utilization: missing request for memory
```

```sql
failed to get memory utilization: missing request for cpu
```

<br/>

이렇게 현재 메트릭을 수집할 수 없는 경우 HPA에 설정한 임계값보다 실제 리소스 사용량이 많아졌다고 하더라도 HPA가 작동하지 않기 때문에 Pod의 리소스가 부족해 질 수 있다.

<br/>

내가 requested 리소스를 0으로 줄인 이유는 노드에 할당된 파드들의 requested cpu의 총 합에 새로 생성한 Pod의 requested cpu를 더했을 때 노드에서 수용가능한 cpu를 넘어섰기 때문이다. requested cpu를 1로 설정했을 때 pod가 노드에 스케줄 되지 못하고 pending 상태에 빠졌기 때문에 임시로 0으로 줄인 것이다. 하지만 쿠버네티스에서는 [cpu단위를 밀리코어 기준으로도 설정할 수 있어](https://kubernetes.io/ko/docs/concepts/configuration/manage-resources-containers/#:~:text=CPU%20%EB%A6%AC%EC%86%8C%EC%8A%A4%20%EB%8B%A8%EC%9C%84,%EA%B0%80%EC%83%81%20%EC%BD%94%EC%96%B4%20%EC%97%90%20%ED%95%B4%EB%8B%B9%ED%95%9C%EB%8B%A4), **0 대신 500m 등의 형식으로 입력하여 현재 리소스 사용량 메트릭을 메트릭서버가 수집할 수 있도록 할 수 있다**(물론 노드 리소스가 지속적으로 부족할 경우 불필요하게 노드 리소스를 점유하고 있는 Pod나 다른 리소스가 없는지, 혹은 노드 용량 자체를 늘려야 할지에 대한 고민이 필요할 것이다).

<br/>


참고로 쿠버네티스에서 사용하는 cpu, 메모리 리소스 단위는 아래와 같다.

- CPU
    - 1.0 CPU (Core) = 1,000m (Milicore)
- Memory
    
    1) E, P, T, G, M, k(바이트)
    
    2) Ei, Pi, Ti, Gi, Mi, Ki(바이트)

<br/>
<br/>

# 3. 참고 자료

- [https://github.com/kubernetes-sigs/metrics-server/blob/master/KNOWN_ISSUES.md#hpa-is-unable-to-get-resource-utilization](https://github.com/kubernetes-sigs/metrics-server/blob/master/KNOWN_ISSUES.md#hpa-is-unable-to-get-resource-utilization)
- [https://kubernetes.io/ko/docs/concepts/configuration/manage-resources-containers/#:~:text=CPU 리소스 단위,가상 코어 에 해당한다](https://kubernetes.io/ko/docs/concepts/configuration/manage-resources-containers/#:~:text=CPU%20%EB%A6%AC%EC%86%8C%EC%8A%A4%20%EB%8B%A8%EC%9C%84,%EA%B0%80%EC%83%81%20%EC%BD%94%EC%96%B4%20%EC%97%90%20%ED%95%B4%EB%8B%B9%ED%95%9C%EB%8B%A4).