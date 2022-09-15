---
emoji: 🔧
title: '오픈소스 컨트리뷰션 아카데미(쿠버네티스 한글화) - 쿠버네티스 공식문서 한글화에 기여하는 방법(4)리뷰 내용 반영 & 승인 완료'
date: '2022-09-14 21:09:00'
author: jinnypark9393
tags: kubernetes
categories: OSSCA
---

이 포스팅은 유투브에 올라온 **[Kubernetes 오픈소스 컨트리뷰션 방법 소개 (한글화 기여를 통해 쿠버네티스에 참여하기, CNCG2020 발표)](https://www.youtube.com/watch?v=2JiKkPv_IGs)** 및 **[[Youtube]초간단 쿠버네티스 문서 한글화 시작 가이드](https://www.youtube.com/watch?v=OTl8HBjxIhc)** 영상, [Kubernetes Contributor Cheatsheat](https://www.kubernetes.dev/docs/contributor-cheatsheet/), [쿠버네티스 문서 한글화 가이드](https://kubernetes.io/ko/docs/contribute/localization_ko/) 문서를 참조하여 직접PR을 올린 경험을 토대로 작성 된 자료입니다. 혹시 잘못된 부분이 있을 경우에는 메일(jinnypark9393@gmail.com)로 알려주시면 반영하도록 하겠습니다 😊

<br/>

## **쿠버네티스 공식문서 한글화에 기여하는 방법 시리즈**

- [쿠버네티스 공식문서 한글화에 기여하는 방법(1)사전준비 & 이슈 생성하기](https://jinnypark9393.github.io/220710-ossca-kubernetes-docs-localization1/)
- [쿠버네티스 공식문서 한글화에 기여하는 방법(2)소스코드 복사 & 번역하기](https://jinnypark9393.github.io/220717-ossca-kubernetes-docs-localization2/)
- [쿠버네티스 공식문서 한글화에 기여하는 방법(3)PR(Pull Request)생성 & CLA 서명](https://jinnypark9393.github.io/220914-ossca-kubernetes-docs-localization3/)
- [쿠버네티스 공식문서 한글화에 기여하는 방법(4)리뷰 내용 반영 & 승인 완료](https://jinnypark9393.github.io/220914-ossca-kubernetes-docs-localization4/)

<br/>

# 1. 쿠버네티스 공식문서 한글화에 기여하는 방법(4)

## 1. 리뷰 내용 반영

```sql
pick 4bb2624993 Translate tasks/debug/debug-cluster/monitor-node-health into Korean
pick 8ef677a62b Translate tasks/debug/debug-cluster/monitor-node-health into Korean -ver2

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