---
emoji: 🔧
title:  'Git / Github 변경사항 없이 커밋 다시 푸시하기(git commit --amend --no-edit)'
date: '2022-09-08 10:48:00'
author: jinnypark9393
tags: git
categories: 데브옵스
---

# 1. 배경 상황

OSSCA 쿠버네티스 한글화팀에서 기여작업을 진행하게 되면, netlify의 알 수 없는 실패 등의 이유로 이미 올린 PR에 커밋을 다시 푸시할 일이 생긴다. 한글화팀 지난 미팅에서 다른 멘티님들이 이 때 사용할 수 있는 유용한 깃 명령어를 알려주셨었는데, 이번에 CNCF Glossary 한글화 작업을 하다 마침 해당 명령어를 사용해야 해서 내용을 정리해보았다.

<br/>

참고로 CNCF Glossary프로젝트의 dev-ko 브랜치(한글화 작업용 브랜치) 관리 작업 중에, upstream/dev-ko에 특정 커밋의 hash가 변경되는 상황이 발생해 내가 올린 PR에 해당 hash가 변경되기 이전 커밋이 자동으로 추가 된 상황으로, upstream에 대한 업데이트 & rebase를 진행해 다시 푸시를 해야하는 상황이었다. 참고로 아래 내용들은 상황을 설명하기 위한 것으로 이번 포스팅의 주제인 git 변경사항 없이 커밋을 다시 푸시하는 방법을 바로 보고싶다면 2번 항목으로 바로 넘어가면 된다.

<br/>

따라서 로컬 깃 저장소의 내가 작업하던 브랜치로 이동해 `git fetch upstream` 명령어로 upstream의 커밋 내역들을 가져오고,

```python
➜  glossary git:(220821-ko-kubernetes) git fetch upstream
remote: Enumerating objects: 65, done.
remote: Counting objects: 100% (43/43), done.
remote: Total 65 (delta 43), reused 43 (delta 43), pack-reused 22
Unpacking objects: 100% (65/65), 627.90 KiB | 2.29 MiB/s, done.
From https://github.com/cncf/glossary
 * [new branch]      509-german-localize-autoscaling -> upstream/509-german-localize-autoscaling
 * [new branch]      CathPag-patch-1  -> upstream/CathPag-patch-1
 * [new branch]      annalisag-spark-patch-index -> upstream/annalisag-spark-patch-index
 * [new branch]      dev-ar           -> upstream/dev-ar
 * [new branch]      dev-bn           -> upstream/dev-bn
 * [new branch]      dev-de           -> upstream/dev-de
 * [new branch]      dev-es           -> upstream/dev-es
 * [new branch]      dev-fr           -> upstream/dev-fr
 * [new branch]      dev-hi           -> upstream/dev-hi
 * [new branch]      dev-it           -> upstream/dev-it
 * [new branch]      dev-ko           -> upstream/dev-ko
 * [new branch]      dev-pt           -> upstream/dev-pt
 * [new branch]      dev-zh           -> upstream/dev-zh
 * [new branch]      iamNoah1-patch-1 -> upstream/iamNoah1-patch-1
 * [new branch]      main             -> upstream/main
```

<br/>

upstream의 dev-ko 브랜치를 업데이트 된 내용으로 rebase한다.

```python
➜  glossary git:(220821-ko-kubernetes) git rebase upstream/dev-ko
warning: skipped previously applied commit 0d2ddbc
hint: use --reapply-cherry-picks to include skipped commits
hint: Disable this message with "git config advice.skippedCherryPicks false"
Successfully rebased and updated refs/heads/220821-ko-kubernetes.
```

<br/>

그러고 나서 `git status` 로 커밋할 내역을 확인해보면 당연하게도 커밋할 수 있는 내역이 아무것도 없다. 왜냐하면 위의 작업들은 upstream의 dev-ko 브랜치를 대상으로 변경사항을 반영한 것이기 때문에, 내가 작업하던 `220821-ko-kubernetes` 브랜치에는 아무런 변동사항이 없기 때문이다.

```python
➜  glossary git:(220821-ko-kubernetes) git status
On branch 220821-ko-kubernetes
nothing to commit, working tree clean
```

<br/>

이렇게 커밋할 내용이 없는 상태에서 다시 origin에 push하기 위해서는 `git rebase -i` 후 edit 명령어로 커밋메시지를 수정하는 방법도 있지만, 아래의 방법으로 보다 쉽게 재푸시를 할 수 있다.

<br/>

# 2. 해결 방법

`git commit --amend --no-edit` 명령어를 사용해 커밋 자체에는 아무런 변경사항 없이 push할 수 있도록 커밋 상태를 변경해준다.

```python
➜  glossary git:(220821-ko-kubernetes) git commit --amend --no-edit
[220821-ko-kubernetes 54df71b] [ko] translation kubernetes(cncf#1116)
 Date: Sat Sep 3 08:45:44 2022 +0900
 1 file changed, 54 insertions(+)
 create mode 100644 content/ko/kubernetes.md
```

<br/>

이 다음 origin의 작업 브랜치(`220821-ko-kubernetes`)로 force push(`-f`) 해주면 변경사항 없이도 커밋을 다시 푸시할 수 있다.

```python
➜  glossary git:(220821-ko-kubernetes) git push -f origin 220821-ko-kubernetes
Username for 
Password for :
Enumerating objects: 8, done.
Counting objects: 100% (8/8), done.
Delta compression using up to 4 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (5/5), 2.16 KiB | 2.16 MiB/s, done.
Total 5 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To https://github.com/jinnypark9393/glossary.git
 + 62335a9...54df71b 220821-ko-kubernetes -> 220821-ko-kubernetes (forced update)
```

<br/>