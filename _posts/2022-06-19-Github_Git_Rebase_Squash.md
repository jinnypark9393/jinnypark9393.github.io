---

published: true
title:  "[[Github/Git]여러 개의 커밋을 한개로 합치기(git rebase -i HEAD~3/git squash)"
excerpt: "git rebase -i로 여러 개의 커밋을 한개로 합칠 수 있으며, rebase 후에는 --force 옵션을 사용해 push하도록 하자. MacOS의 경우에는 icloud 공유폴더에서 작업하지 않도록 하자"

categories:
- DevOps
tags:
- [쿠버네티스, k8s에러, github에러, git에러, git커밋내역합치기, 깃허브에러, 깃헙에러, DevOpsengineer, 데브옵스, 데브옵스엔지니어, git, github, gitrebase, gitrebase-i, gitsquash]

toc: true
toc_sticky: true

date: 2022-06-19
last_modified_at: 2022-06-19

---

<br/><br/>

# 1. 배경 상황

올해 2022년 오픈소스 컨트리뷰션 아카데미에 [쿠버네티스 한글화 프로젝트](https://www.oss.kr/contribution_22_projects/show/c70482f2-060e-4820-a46c-32c4a4c0584c)가 추가되었다는 소식을 듣고 헐레벌떡 신청했는데, 될지 안될지는 모르지만 컨트리뷰션 아카데미 가이드에 기재된 내용을 보고 예습 겸 PR을 올려보면 좋을 듯 해 쿠버네티스 공식문서의 [한글화 가이드](https://kubernetes.io/ko/docs/contribute/localization_ko/)와 유투브 영상을 보고 따라서 PR을 올렸었다(두근두근).

<br/>

하지만…

![2022-06-19-Github_Git_Rebase_Squash1.png](/assets/images/2022-06-19-Github_Git_Rebase_Squash/2022-06-19-Github_Git_Rebase_Squash1.png)

<br/>

내가 번역한 문서에 링크되어있는 YAML파일들이 한국어 버전에 존재하지 않아 빌드에러가 발생했다. 

<br/>

다행히 리뷰어님께서 친절히 해결 방법을 알려주셔서 git + squash라는 키워드로 검색해보니, git squash라는 명령어가 따로 존재하는 건 아니고, interactive rebase의 옵션 중 하나가 squash인 것이었다.

<br/><br/>

# 2. git rebase -i로 여러 개의 커밋을 한개로 합치는 방법

위에서도 말했듯, 여러 개의 커밋 내역을 한개로 합치려면 `git rebase -i` (여기서 i는 interactive의 약어) 명령어를 사용해주어야 한다.

<br/>

**💡 주의: Commit이 완료 된 뒤에만 git rebase로 내역을 합칠 수 있다.**

<br/>

예를 들어, 아래와 같이 2개의 커밋내역이 존재할때, 이 커밋내역들을 하나로 합쳐보자.

```bash
$ git log --pretty=oneline
8ef677a62b... 2nd commit
4bb2624993... 1st commit
```

- `git log --pretty=oneline` :  커밋 내역을 한줄로 간단하게 보여주는 명령어

<br/>

커밋 내역을 합치려면, `git rebase -i` 명령어를 사용해주면 된다.

```bash
$ git rebase -i HEAD~2
```

- `HEAD~2` : 현재 커밋내역을 포함해 최신 순으로 2번째 커밋 내역까지 합치겠다는 의미(위의 예시에서는 `2nd commit` 과 `1st commit` 이 대상이다)
- `HEAD~2` 대신 합치고 싶은 커밋의 해시값을 입력해줘도 된다.

<br/>

위의 명령어를 입력하면 아래와 같이 rebase에 포함한 커밋내역과 함께 interactive rebase에서 적용할 옵션 값이 표시된다.

```bash
pick 4bb2624993 1st commit
pick 8ef677a62b 2nd commit

# Rebase 36bee81493..8ef677a62b onto 36bee81493 (2 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
```

- 우리는 이 중에서 squash를 사용할 것이다.
- `pick` : 해당 커밋을 사용한다.
- `squash` : 해당 커밋을 사용하지만 이전 커밋에 병합한다.

<br/>

사용할 커밋은 pick으로 남겨두고, 병합할 커밋을 squash로 수정해준다(수정하기 전 i를 눌러 수정모드로 변경한 뒤 수정 후 esc ⇒ :wq 로 저장한 뒤 빠져나오면 된다.

```bash
pick 4bb2624993 1st commit
squash 8ef677a62b 2nd commit

# Rebase 36bee81493..8ef677a62b onto 36bee81493 (2 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
```

<br/>

저장하고 빠져나오게 되면 곧바로 다음 vi에디터 창이 뜨게 되는데, 합치게 되는 커밋 내역 중 어느 커밋의 메시지를 사용할 것인지 정하는 것이다.

```bash
# This is a combination of 2 commits.
# This is the 1st commit message:

1st commit

# This is the commit message #2:

2nd commit

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Sat Jun 18 20:21:35 2022 +0900
#
# interactive rebase in progress; onto 36bee81493
# Last commands done (2 commands done):
#    pick 4bb2624993 1st commit
#    squash 8ef677a62b 2nd commit
# No commands remaining.
# You are currently rebasing branch 'jinnypark9393/monitor-node-health/v0.1' on '36bee81493'.
#
```

- 사용할 커밋을 제외하고는 #문자로 주석처리 해준 뒤, 마찬가지로 esc + :wq 명령어로 저장한 뒤 빠져나오면 된다.

<br/>

- 아래와 같은 메시지가 뜨면 rebase에 성공한 것이다.

```bash
Successfully rebased and updated refs/heads/jinnypark9393/monitor-node-health/v0.1.
```

<br/>

위와 같이 커밋내역을 수정하게 되면 remote에 push하게 될 때 conflict가 나면서 push가 되지 않는데, 

```bash
➜  website git:(jinnypark9393/monitor-node-health/v0.1) git push --set-upstream origin jinnypark9393/monitor-node-health/v0.1
To https://github.com/jinnypark9393/website.git
 ! [rejected]              jinnypark9393/monitor-node-health/v0.1 -> jinnypark9393/monitor-node-health/v0.1 (non-fast-forward)
error: failed to push some refs to 'https://github.com/jinnypark9393/website.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

<br/>

이 때에는 `-f` 혹은 `--force` 옵션을 추가해 강제로 remote 저장소에 push해주면 된다.

```bash
➜  website git:(jinnypark9393/monitor-node-health/v0.1) git push --set-upstream origin jinnypark9393/monitor-node-health/v0.1 --force
Enumerating objects: 20, done.
Counting objects: 100% (20/20), done.
Delta compression using up to 4 threads
Compressing objects: 100% (11/11), done.
Writing objects: 100% (13/13), 4.22 KiB | 4.22 MiB/s, done.
Total 13 (delta 7), reused 5 (delta 1), pack-reused 0
remote: Resolving deltas: 100% (7/7), completed with 6 local objects.
To https://github.com/jinnypark9393/website.git
 + 4bb2624993...31af66d757 jinnypark9393/monitor-node-health/v0.1 -> jinnypark9393/monitor-node-health/v0.1 (forced update)
Branch 'jinnypark9393/monitor-node-health/v0.1' set up to track remote branch 'jinnypark9393/monitor-node-health/v0.1' from 'origin'.
```

**💡 참고:** 이미 올린 Pull request는 삭제 후 다시 올리지 않아도 remote 저장소(origin)의 PR의 대상이 되었던 브랜치에 새롭게 커밋하게 되면 자동으로 업데이트 된다(약 5분내외 소요)

<br/><br/>

# 3. 에러 발생 및 트러블슈팅

처음에 git rebase를 진행할 때 Rebase가 되지 않고 계속 conflict가 나는 상황이 있었는데, commit할 떄의 내용을 다시 살펴보니 내가 수정하지 않은 내역들이 잔뜩 커밋되어있었다.

```bash
➜  website git:(jinnypark9393/monitor-node-health/v0.1) ✗ git commit -m "Translate tasks/debug/debug-cluster/monitor-node-health into Korean -ver2"
[jinnypark9393/monitor-node-health/v0.1 385a8c024e] Translate tasks/debug/debug-cluster/monitor-node-health into Korean -ver2
 47 files changed, 92 insertions(+), 376427 deletions(-)
 create mode 100644 api-ref-assets/api/.swagger.json.icloud
 delete mode 100644 api-ref-assets/api/swagger.json
 delete mode 100644 content/de/docs/concepts/configuration/_index.md
 delete mode 100644 content/de/docs/concepts/extend-kubernetes/_index.md
 delete mode 100644 content/de/docs/concepts/policy/_index.md
 delete mode 100644 content/de/docs/concepts/workloads/pods/_index.md
 delete mode 100644 content/de/docs/reference/federation/_index.html
 delete mode 100644 content/de/docs/reference/kubernetes-api/_index.md
 delete mode 100644 content/de/docs/reference/using-api/_index.md
 delete mode 100644 content/de/docs/tasks/access-kubernetes-api/_index.md
 delete mode 100644 content/de/docs/tasks/configure-pod-container/_index.md
 delete mode 100644 content/de/docs/tasks/federation/_index.md
 delete mode 100644 content/de/docs/tasks/manage-daemon/_index.md
 create mode 100644 content/ko/examples/debug/node-problem-detector-configmap.yaml
 create mode 100644 content/ko/examples/debug/node-problem-detector.yaml
 create mode 100644 static/docs/reference/generated/kubernetes-api/v1.19/.index.html.icloud
 delete mode 100644 static/docs/reference/generated/kubernetes-api/v1.19/index.html
 create mode 100644 static/docs/reference/generated/kubernetes-api/v1.20/.index.html.icloud
...(생략)
```

내용을 잘 읽어보니 기존 파일들이 `.icloud` 확장자의 파일로 치환되고 있었다. 확장자명을 보고 작업 중인 폴더가 icloud 공유폴더라 발생하는 현상이 아닐까 추측되어 해당 폴더를 날리고 공유폴더가 아닌 폴더에 프로젝트를 다시 git clone으로 받아 rebase를 진행하니 conflict가 발생하지 않았다.

<br/><br/>

# 4. 참고자료

- **NHN Cloud - git squash - 여러개의 커밋로그를 하나로 묶기**: [https://meetup.toast.com/posts/39](https://meetup.toast.com/posts/39)

<br/><br/>