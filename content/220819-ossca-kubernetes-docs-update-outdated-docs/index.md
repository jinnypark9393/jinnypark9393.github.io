---
emoji: 🔧
title:  '오픈소스 컨트리뷰션 아카데미(쿠버네티스 한글화) - 쿠버네티스 오래된(outdated) 문서 업데이트하기'
date: '2022-08-19 05:59:00'
author: jinnypark9393
tags: kubernetes
categories: OSSCA
---

2022년도 오픈소스 컨트리뷰션 아카데미의 쿠버네티스 한글화팀에서 한글화 프로젝트 진행 중, 번역이 되지 않은 문서의 한글화 뿐만 아니라 이미 번역이 된 한글 문서에 대해서도 원문의 변경사항에 대해 업데이트를 진행해야한 다는 것을 알게되어 진행 방법을 정리해 포스팅으로 올려보았다.

<br/>

# 1. 쿠버네티스 한글 문서 중 오래된(Outdated) 문서 관리 방식

현재 쿠버네티스 공식문서 한글화 팀(Kubernetes SIG Docs localization - Korean)에서는 [diff_l10n_branches.py라는 스크립트](https://jinnypark9393.github.io/220729-ossca-kubernetes-git-diff/)를 이용해 이전 브랜치와 현재 브랜치의 차이점을 리포트 형식으로 뽑아낸 뒤, 해당 내용을 이슈([예시](https://github.com/kubernetes/website/issues/35802))로 올려 태스크를 할당하는 방식으로 업데이트를 진행하고있다.

<br/>

위의 스크립트 출력결과의 제일 하단을 보면 원문 문서(영문)의 업데이트 내용을 반영할 때 활용할 수 있는 git 명령어에 대해 안내가 나와있다.

```bash
# checkout `upstream/dev-1.24-ko.3`
...
# check what is updated in the upstream 
git diff upstream/dev-1.24-ko.2 upstream/dev-1.24-ko.3 -- content/en/_index.html
# apply changes to content/ko
vi content/ko/_index.html
...
# commit and push
...
# make PR to `upstream/dev-1.24-ko.3`
```

<br/>

# 2. 쿠버네티스 한글 문서 중 오래된(Outdated) 문서 업데이트하기

먼저 `upstream` 에서 신규로 생긴 브랜치를 받아오지 않았다면 업데이트 해준다.

<br/>

`git fetch` 명령어로 upstream의 `dev-1.24-ko.3` 라는 브랜치 정보를 추가 해준다.

```bash
➜  website git:(main) git fetch upstream dev-1.24-ko.3
remote: Enumerating objects: 8067, done.
remote: Counting objects: 100% (3264/3264), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 8067 (delta 3262), reused 3261 (delta 3261), pack-reused 4803
Receiving objects: 100% (8067/8067), 2.66 MiB | 2.86 MiB/s, done.
Resolving deltas: 100% (6258/6258), completed with 985 local objects.
From https://github.com/kubernetes/website
 * branch                  dev-1.24-ko.3 -> FETCH_HEAD
 * [new branch]            dev-1.24-ko.3 -> upstream/dev-1.24-ko.3
```

<br/>

`upstream/dev-1.24-ko.3` 브랜치로 checkout 한다.

```bash
➜  website git:(main) git checkout upstream/dev-1.24-ko.3
Updating files: 100% (1373/1373), done.
Note: switching to 'upstream/dev-1.24-ko.3'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 4685ec0215 Merge pull request #35955 from Veryfirstmoment/shine_outdated_upstream/dev-1.24-ko.3

➜  website git:(4685ec0215) git switch -c dev-1.24-ko.3
Switched to a new branch 'dev-1.24-ko.3'
```

<br/>

로컬에서도 `dev-1.24-ko.3` 를 베이스로, 작업할 feature 브랜치를 생성해준다.

```bash
➜  website git:(dev-1.24-ko.3) git checkout -b 220817-update-outdated-docs-M8,19,20,21
```

<br/>

`git diff` 명령어로 특정 문서에 대한 차이점을 확인한다.

```bash
git diff upstream/dev-1.24-ko.2 upstream/dev-1.24-ko.3 -- <작업 문서 경로>
```

<br/>

예를 들어, `content/en/docs/concepts/services-networking/service-traffic-policy.md` 라는 문서에 대한 변경사항을 알아보고 싶다면, 아래와 같이 명령을 실행한다.

```bash
diff --git a/content/en/docs/concepts/services-networking/service-traffic-policy.md b/content/en/docs/concepts/services-networking/service-traffic-policy.md
index b9abe34b3f..8755b5298b 100644
--- a/content/en/docs/concepts/services-networking/service-traffic-policy.md
+++ b/content/en/docs/concepts/services-networking/service-traffic-policy.md
@@ -43,7 +43,7 @@ metadata:
   name: my-service
 spec:
   selector:
-    app: MyApp
+    app.kubernetes.io/name: MyApp
   ports:
     - protocol: TCP
       port: 80
```

위의 작업으로 확인된 변경사항을 한글문서에 반영한 뒤, 업데이트를 진행하면 된다.

<br/>