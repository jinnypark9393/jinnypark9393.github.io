---

published: true
title:  "[Kubernetes/CKA]Lightning Lab 2 - JSON PATH 사용하기"
excerpt: "JSON PATH를 사용하는 문제의 경우, custom-column을 이용하면 편리하다"

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

# 2. JSON PATH 사용하기

## [문제 요건]

- 다음 포맷에 맞춰 `admin2406` 네임스페이스의 모든 디플로이먼트를 출력
- `DEPLOYMENT CONTAINER_IMAGE READY_REPLICAS NAMESPACE<deployment name> <container image used> <ready replica count> <Namespace>`. 
- 예시: `DEPLOYMENT CONTAINER_IMAGE READY_REPLICAS NAMESPACEdeploy0 nginx:alpine 1 admin2406`
- 데이터들은 `deployment name`을 기준으로 오름차순으로 정렬
- 채점 기준: 제시된 작업이 완료되었는가?

<br/>

## [내 풀이]

- `kubectl get deployment -n admin2406` 으로 대상 디플로이먼트들을 확인한다.

```bash
root@controlplane:~# k get deployments.apps -n admin2406        
NAME      READY   UP-TO-DATE   AVAILABLE   AGE
deploy1   1/1     1            1           48m
deploy2   1/1     1            1           48m
deploy3   1/1     1            1           48m
deploy4   1/1     1            1           48m
deploy5   1/1     1            1           48m
```

<br/>

- `kubectl get deployment -n admin2406 deploy1 -o json` 으로 JSON 파일 구조를 확인한다.

```bash
root@controlplane:~# k get deployments.apps -n admin2406 deploy1 -o json
{
    "apiVersion": "apps/v1",
    "kind": "Deployment",
    "metadata": {
        "annotations": {
            "deployment.kubernetes.io/revision": "1"
        },
        "creationTimestamp": "2022-05-15T01:28:00Z",
        "generation": 1,
        "labels": {
            "app": "deploy1"
        },
        "managedFields": [
            {
                "apiVersion": "apps/v1",
                "fieldsType": "FieldsV1",
                "fieldsV1": {
                    "f:metadata": {
                        "f:labels": {
                            ".": {},
                            "f:app": {}
                        }
                    },
                    "f:spec": {
                        "f:progressDeadlineSeconds": {},
                        "f:replicas": {},
                        "f:revisionHistoryLimit": {},
                        "f:selector": {},
                        "f:strategy": {
                            "f:rollingUpdate": {
                                ".": {},
                                "f:maxSurge": {},
                                "f:maxUnavailable": {}
                            },
                            "f:type": {}
                        },
                        "f:template": {
                            "f:metadata": {
                                "f:labels": {
                                    ".": {},
                                    "f:app": {}
                                }
                            },
                            "f:spec": {
                                "f:containers": {
                                    "k:{\"name\":\"nginx\"}": {
                                        ".": {},
                                        "f:image": {},
                                        "f:imagePullPolicy": {},
                                        "f:name": {},
                                        "f:resources": {},
                                        "f:terminationMessagePath": {},
                                        "f:terminationMessagePolicy": {}
                                    }
                                },
                                "f:dnsPolicy": {},
                                "f:restartPolicy": {},
                                "f:schedulerName": {},
                                "f:securityContext": {},
                                "f:terminationGracePeriodSeconds": {}
                            }
                        }
                    }
                },
                "manager": "kubectl-create",
                "operation": "Update",
                "time": "2022-05-15T01:28:00Z"
            },
            {
                "apiVersion": "apps/v1",
                "fieldsType": "FieldsV1",
                "fieldsV1": {
                    "f:metadata": {
                        "f:annotations": {
                            ".": {},
                            "f:deployment.kubernetes.io/revision": {}
                        }
                    },
                    "f:status": {
                        "f:availableReplicas": {},
                        "f:conditions": {
                            ".": {},
                            "k:{\"type\":\"Available\"}": {
                                ".": {},
                                "f:lastTransitionTime": {},
                                "f:lastUpdateTime": {},
                                "f:message": {},
                                "f:reason": {},
                                "f:status": {},
                                "f:type": {}
                            },
                            "k:{\"type\":\"Progressing\"}": {
                                ".": {},
                                "f:lastTransitionTime": {},
                                "f:lastUpdateTime": {},
                                "f:message": {},
                                "f:reason": {},
                                "f:status": {},
                                "f:type": {}
                            }
                        },
                        "f:observedGeneration": {},
                        "f:readyReplicas": {},
                        "f:replicas": {},
                        "f:updatedReplicas": {}
                    }
                },
                "manager": "kube-controller-manager",
                "operation": "Update",
                "time": "2022-05-15T01:59:02Z"
            }
        ],
        "name": "deploy1",
        "namespace": "admin2406",
        "resourceVersion": "15003",
        "uid": "09e6b6df-f757-4558-a6a9-1ce8bd1138b7"
    },
    "spec": {
        "progressDeadlineSeconds": 600,
        "replicas": 1,
        "revisionHistoryLimit": 10,
        "selector": {
            "matchLabels": {
                "app": "deploy1"
            }
        },
        "strategy": {
            "rollingUpdate": {
                "maxSurge": "25%",
                "maxUnavailable": "25%"
            },
            "type": "RollingUpdate"
        },
        "template": {
            "metadata": {
                "creationTimestamp": null,
                "labels": {
                    "app": "deploy1"
                }
            },
            "spec": {
                "containers": [
                    {
                        "image": "nginx",
                        "imagePullPolicy": "Always",
                        "name": "nginx",
                        "resources": {},
                        "terminationMessagePath": "/dev/termination-log",
                        "terminationMessagePolicy": "File"
                    }
                ],
                "dnsPolicy": "ClusterFirst",
                "restartPolicy": "Always",
                "schedulerName": "default-scheduler",
                "securityContext": {},
                "terminationGracePeriodSeconds": 30
            }
        }
    },
    "status": {
        "availableReplicas": 1,
        "conditions": [
            {
                "lastTransitionTime": "2022-05-15T01:28:00Z",
                "lastUpdateTime": "2022-05-15T01:28:18Z",
                "message": "ReplicaSet \"deploy1-5799f5869d\" has successfully progressed.",
                "reason": "NewReplicaSetAvailable",
                "status": "True",
                "type": "Progressing"
            },
            {
                "lastTransitionTime": "2022-05-15T01:59:02Z",
                "lastUpdateTime": "2022-05-15T01:59:02Z",
                "message": "Deployment has minimum availability.",
                "reason": "MinimumReplicasAvailable",
                "status": "True",
                "type": "Available"
            }
        ],
        "observedGeneration": 1,
        "readyReplicas": 1,
        "replicas": 1,
        "updatedReplicas": 1
    }
}
```

<br/>

- custom-column을 이용한 간단한 쿼리문을 작성한 뒤 잘 작동하는지 테스트해본다.

```bash
root@controlplane:~# k get deployments.apps -n admin2406 -o=custom-columns=DEPLOYMENT:.metadata.name
DEPLOYMENT
deploy1
deploy2
deploy3
deploy4
deploy5
```

<br/>

- 위에서 출력했던 json 포맷을 잘 참고하여 나머지 열에 대한 쿼리도 작성해준다.
    - Tip: 열과 열을 구분하기 위해서는 `,` (콤마)를 사용한다.
    - Tip: 각 항목이 잘 출력되었는지 확인하기 위해 kubectl get deployment 명령어를 잘 활용한다(예: CONTAINER_IMAGE가 잘 출력되었는지 확인 `kubectl get deployments -n admin2406`)
    - Tip: 요소가 딕셔너리가 아닌 리스트 형태일 경우(예: containers) 반드시 출력할 리스트 요소를 지정해주어야한다(예: containers ⇒ (X), containers[0] ⇒ (O), containers[*] ⇒ (O)

```bash
root@controlplane:~# kubectl get deployments.apps -n admin2406 -o=custom-columns=DEPLOYMENT:.metadata.name,CONTAINER_IMAGE:.spec.template.spec.containers[*].image,READY_REPLICAS:.status.readyReplicas,NAMESPACE:.metadata.namespace
DEPLOYMENT   CONTAINER_IMAGE   READY_REPLICAS   NAMESPACE
deploy1      nginx             1                admin2406
deploy2      nginx:alpine      1                admin2406
deploy3      nginx:1.16        1                admin2406
deploy4      nginx:1.17        1                admin2406
deploy5      nginx:latest      1                admin2406
```

- `--sort-by=` 옵션으로 리스트를 문제 요건대로 정렬한다.

```bash
root@controlplane:~# kubectl get deployments.apps -n admin2406 -o=custom-columns=DEPLOYMENT:.metadata.name,CONTAINER_IMAGE:.spec.template.spec.containers[*].image,READY_REPLICAS:.status.readyReplicas,NAMESPACE:.metadata.namespace --sort-by=.metadata.name
DEPLOYMENT   CONTAINER_IMAGE   READY_REPLICAS   NAMESPACE
deploy1      nginx             1                admin2406
deploy2      nginx:alpine      1                admin2406
deploy3      nginx:1.16        1                admin2406
deploy4      nginx:1.17        1                admin2406
deploy5      nginx:latest      1                admin2406
```

<br/>

- 문제 요건대로 `/opt/admin2406_data` 에 쿼리 결과를 저장한다.

```bash
root@controlplane:~# kubectl get deployments.apps -n admin2406 -o=custom-columns=DEPLOYMENT:.metadata.name,CONTAINER_IMAGE:.spec.template.spec.containers[*].image,READY_REPLICAS:.status.readyReplicas,NAMESPACE:.metadata.namespace --sort-by=.metadata.name > /opt/admin2406_data
```

<br/>

- 데이터가 잘 저장되었는지 확인한다.

```bash
root@controlplane:~# cat /opt/admin2406_data
DEPLOYMENT   CONTAINER_IMAGE   READY_REPLICAS   NAMESPACE
deploy1      nginx             1                admin2406
deploy2      nginx:alpine      1                admin2406
deploy3      nginx:1.16        1                admin2406
deploy4      nginx:1.17        1                admin2406
deploy5      nginx:latest      1                admin2406
```

<br/><br/>

## [참고 URL]

- kubectl 치트 시트 - custom-column: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)