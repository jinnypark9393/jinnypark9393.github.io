---

published: true
title:  "[Kubernetes]쿠버네티스 공식문서 번역 - 파드 디버그(Debug Pods)"
excerpt: "파드가 제대로 동작하지 않을 때에는 파드 자신, 레플리케이션 컨트롤러, 서비스를 디버깅 해야한다."

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스자격증, 유데미강의추천, 유데미쿠버네티스, cka연습문제풀이, cka덤프, cka기출문제, cka, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어, killerkoda, killersh, killershell, cka모의고사]

toc: true
toc_sticky: true

date: 2022-06-15
last_modified_at: 2022-06-15

---

<br/><br/>

* 참고: 쿠버네티스 한글화에 참여하려고 번역했던 문서이나 중복으로 업로드 하지 않음.

# [Kubernetes]번역 - 파드 디버그

- 원문: [https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/)

이 가이드는 쿠버네티스에 배포되었으나 제대로 동작하지 않는 애플리케이션을 디버깅하는 유저들을 돕기 위한 것이다. 이 문서는 클러스터를 디버깅하고 싶어하는 사람들을 위한 가이드가 아니다. 클러스터 디버깅을 위해서는 [이 가이드](https://kubernetes.io/docs/tasks/debug/debug-cluster/)를 확인하자.

# 문제를 진단

트러블슈팅의 첫 단계는 분류이다. 무엇이 문제일까? 파드일까? 레플리케이션 컨트롤러일까? 아니면 서비스일까?

- [파드 디버그](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/#debugging-pods)
- [레플리케이션 컨트롤러 디버그](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/#debugging-replication-controllers)
- [서비스 디버그](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/#debugging-services)

## 파드 디버그

파드를 디버깅할 떄의 첫 단계는 파드를 살펴보는 것이다. 파드의 현재 상태와 최근 이벤트들을 다음 명령어로 확인하자.

```bash
kubectl describe pods ${POD_NAME}
```

파드 내 컨테이너들의 상태를 확인한다. 모두 `Running`인가? 최근에 재시작이 있었는가?

파드의 상태에 따라 계속 디버깅하라.

## 파드가 여전히 pending 상태

만약 파드가 `Pending` 상태에 빠져 있다면, 이것은 노드에 스케줄링 될 수 없다는 뜻이다. 일반적으로 이것은 어떠한 형태로든 스케줄링을 막는 충분치 않은 리소스가 있기 때문이다. 위의 `kubectl describe …` 명령어의 결과를 살펴본다. 스케줄러로부터 왜 파드가 스케줄 되지 못했는지 메시지가 있을 것이다. 이유들은 다음을 포함한다.

- **충분한 리소스를 갖고있지 않다**: 클러스터의 CPU 혹은 메모리 공급을 소진했을 수 있다. 이 경우 파드를 삭제하거나, 리소스 요청을 조정하거나, 클러스터에 신규 노드를 추가해야한다. 더 많은 정보를 위해 [컴퓨팅 리소스 문서](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)를 확인하자.
- **`hostPort` 를 사용중이다**: 파드를 `hostPort` 에 바인딩한 경우 파드가 스케줄 될 수 있는 개수가 한정된다. 대부분의 경우, `hostPort` 는 불필요하므로, 파드를 노출하기 위해 서비스 오브젝트를 사용해보자. 만약 `hostPort`가 정말 필요할 경우 쿠버네티스 클러스터의 노드 수만큼만 파드를 스케줄링할 수 있다.

## 파드가 여전히 waiting 상태

파드가 `Waiting` 상태에 빠져있다면, 파드는 워커노드에 스케줄되었으나 해당 머신에서 동작하지 못하는 것이다. 다시 말하지만, `kubectl describe …` 가 도움이 될 것이다. `Waiting` 파드의 가장 일반적인 원인은 파드가 이미지를 당겨오는 데에 실패한 것이다. 세 가지 확인 사항이 있다.

- 이미지 이름이 올바른지 확인한다.
- 이미지를 레지스트리로 푸쉬했는가?
- 이미지를 당겨올 수 있는지 여부를 보기 위해 매뉴얼로 이미지를 당겨오자. 만약 PC의 도커를 사용할 경우, `docker pull <image>` 를 실행하자.

## 파드가 충돌했거나 unhealthy

파드가 스케줄링 된 후에는 디버그를 위해 [동작중인 파드 디버그](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/)를 이용할 수 있다.

## 파드가 running 상태이나 명령한대로 실행되지 않음

만약 파드가 예상한대로 동작하지 않는다면, 파드 설명 상 에러가 있었으나(예: 로컬머신의 `mypod.yaml` 파일), 해당 에러가 파드를 생성할 때 조용히 무시 당했을 수 있다. 종종 파드 설명 섹션이 잘못되거나, 네 이름이 잘못 타이핑 되는 등의 이유로 키가 무시된다. 예를 들면, 만약 `command` 를 `commnd` 로 스펠링을 잘못 입력하면 파드가 생성되나 사용하려고 의도했던 명령줄이 사용되지 않을 것이다.

첫번째로 해야할 것은 파드를 삭제하고 `—validate` 옵션과 함께 재생성해보는 것이다. 예를 들어, `kubectl apply —validate -f mypod.yaml` 을 실행한다. 만약 `command`를 `commnd`로 스펠링을 잘못 입력했다면 아래와 같은 에러가 발생할 것이다.

```bash
I0805 10:43:25.129850   46757 schema.go:126] unknown field: commnd
I0805 10:43:25.129973   46757 schema.go:129] this may be a false alarm, see https://github.com/kubernetes/kubernetes/issues/6842
pods/mypod
```

다음으로 확인할 사항은 apiserver에 있는 파드가 원래 만드려고 했던 파드와의 일치여부이다(예: 로컬머신의 YAML파일). 예를 들어, `kubectl get pods/mypod -o yaml > mypod-on-apiserver.yaml` 을 실행하고 수동으로 오리지널 파드인 `mypod.yaml` 의 설명과 apiserver로부터 받은 `mypod-on-apiserver.yaml` 를 비교한다. “apiserver”버전에는 일반적으로 오리지널 버전에 없는 몇 줄이 존재한다. 이는 예상된 것이다. 하지만 apiserver버전에 없는 내용이 오리지널에 있다면, 이것이 파드 스펙에서 문제가 있는 부분을 나타내는 것일 수 있다.

## 레플리케이션 컨트롤러 디버그

레플리케이션 컨트롤러는 꽤 직관적이다. 파드를 생성할 수도, 생성하지 못할수도 있다. 만약 레플리케이션 컨트롤러가 파드를 생성하지 못한다면, [위의 지시](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/#debugging-pods)를 따라 파드를 디버그하자.

또한 `kubectl describe rc ${CONTROLLER_NAME}` 을 사용해 레플리케이션 컨트롤러에 내재된 이벤트를 확인할 수 있다.

## 서비스 디버그

서비스는 파드 셋에 걸쳐 로드밸런싱을 제공한다. 서비스가 적절하게 동작하지 못하게 하는 몇 개의 일반적인 문제들이 있다. 다음 지시는 서비스의 문제들의 디버깅에 도움이 될 수 있다.

먼저, 서비스의 엔드포인트가 있는지 검증한다. 모든 서비스 오브젝트에는 apiserver가 `endpoints` 리소스를 사용가능하게 만든다.

이 리소스는 아래와 같이 확인할 수 있다.

```bash
kubectl get endpoints ${SERVICE_NAME}
```

엔드포인트의 파드의 개수가 서비스의 멤버로 예상한 것과 맞는지 확인한다. 예를 들면, 만약 서비스가 레플리카 3개의 nginx 컨테이너를 위한 것이라면, 서비스의 엔드포인트로 3개의 다른 IP주소를 예상할 것이다.

## 서비스에 엔드포인트가 빠져있다

만약 엔드포인트가 빠져있다면, 서비스가 사용하는 레이블을 이용해 파드의 목록을 불러오는 것을 시도한다. 레이블이 아래와 같은 서비스를 갖고있다고 가정한다.

```yaml
...
spec:
  - selector:
     name: nginx
     type: frontend
```

셀렉터와 일치하는 파드 목록을 나열하기 위해 아래를 사용할 수 있다.

```bash
kubectl get pods --selector=name=nginx,type=frontend
```

서비스에서 제공하기를 기대하는 파드와 목록이 일치하는지 검증한다. 파드의 `containerPort` 가 서비스의 `targetPort` 와 일치하는지 검증한다.

## 네트워크 트래픽이 포워딩 되지 않음

더 많은 정보를 위해 [서비스 디버그](https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/)를 확인하자.

# 다음 내용

만약 위의 것 중 어느 것도 문제를 해결하지 못한다면, [서비스 디버그 문서](https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/)의 지시를 따라 서비스가 동작하고, `Endpoints`를 가지고 있으며, `Pods`가 실제로 서비스 되고있는지 확인하라. DNS가 동작하고, iptables 규칙이 설치되고, kube-proxy가 잘못 동작하지 않아야 한다.

또한 [트러블슈팅 문서](https://kubernetes.io/docs/tasks/debug/)를 방문해 더 많은 정보를 확인할 수 있다.

# 피드백

이 페이지가 도움이 되었나요?

네 아니요