---
emoji: 🔧
title:  깃헙(github) 중간 커밋 삭제하기(git rebase -i / git drop)
date: '2022-08-01 06:00:00'
author: jinnypark9393
tags: git
categories: 데브옵스
---

# 1. 배경 상황

오픈소스 컨트리뷰션 아카데미에서 쿠버네티스 한글화 프로젝트를 진행중인데, 커밋들이 섞여 올라가서 중간 커밋을 삭제해야하는 상황이 발생했다.

<br/>

조금 더 구체적으로 설명하자면, 내가 한글화 작업을 진행할 때에는 task별로 이슈를 생성하고(혹은 이미 생성된 이슈에 코멘트를 달아 task를 할당 받고), 이슈별로 PR을 생성해 올리고 있다. 그리고 이슈별로 로컬 브랜치를 생성해 작업 내역들을 분리해 관리하고 있는데… 작업 도중에 외출하고 다녀와서 다른 브랜치로 전환해 작업하다보니  다른 이슈에 대한 작업 커밋을 같이 섞어 올려버렸다🤦 (**PR을 생성하기 전에는 항상 git log와 git status를 생활화 하도록 하자…**)

<br/>

# 2. 해결 방법

순간 PR을 얼른 삭제하고 git reset으로 커밋내역을 싹 감아올린 다음에 새로 작업해서 올릴까 했지만 아무리 생각해도 너무 비효율적인 방법인 듯 해 구글링을 해보니 중간 커밋 내역만 삭제하는 방법이 있었다.

<br/>

먼저 `rebase -i` 로 interactive한 rebase를 시작한다.

```bash
rebase -i HEAD~2
```

여기서 HEAD~2는 rebase를 할 커밋의 범위를 나타낸다. (`HEAD~n` 가장 최신 커밋으로부터 n번째 커밋까지 수정하겠다는 뜻) 나는 가장 최신 커밋을 남겨두고, 그 바로 전(최신으로부터 두 번째) 커밋을 지울 것이기 때문에 HEAD~2 로 지정하였다.

<br/>

명령어를 실행하면 아래와 같이 내가 앞서 지정한 커밋내역과 함께 interactive rebase에서 적용할 수 있는 옵션 값들이 표시된다.

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

<br/>

여기서 우리는 drop으로 커밋을 삭제할 것이니 삭제할 커밋을 pick에서 drop으로 변경해준다(수정하기 전 키보드의 i를 눌러 수정모드로 변경한 뒤 수정 후 esc키 ⇒ :wq 를 입력해 빠져나오면 된다).

```bash
drop 4bb2624993 1st commit
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

<br/>

그 다음 `git log` 와 `git status` 로 변경 내역이 잘 적용되었는지 확인한 후, origin으로 다시 push(이 때 -f 옵션을 주어 강제 푸시를 해야 올라간다)하면 PR에서 불필요한 커밋 내역이 삭제된 것을 확인할 수 있다.

```bash
git push -f origin <push할 브랜치명>
```

- 참고로 지난 squash 포스팅에도 적어두었지만 upstream의 커밋 내역은 origin을 수정하게 되면 자동으로 업데이트 된다.
