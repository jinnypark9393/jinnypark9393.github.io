---
emoji: 💫
title:  '리눅스(Linux) 파일 퍼미션(File Permission) 및 ACL 차이'
date: '2022-09-21 23:32:00'
author: jinnypark9393
tags: endoflife
categories: 데브옵스
---

# 리눅스(Linux) 파일 퍼미션(File Permission) 및 ACL 차이

## **파일 퍼미션 vs ACL [link](https://www.bangseongbeom.com/linux-acl-guide.html#%ED%8C%8C%EC%9D%BC-%ED%8D%BC%EB%AF%B8%EC%85%98-vs-acl)**

- `[chmod](https://linux.die.net/man/1/chmod)`를 이용해 권한을 결정하는 기존 파일 퍼미션의 경우 **사용자 하나와 그룹 하나**만 읽기, 쓰기, 실행 권한을 가질 수 있습니다. ACL을 이용하면 추가적으로 **여러 명의 사용자와 그룹**도 읽기, 쓰기, 실행 권한을 가질 수 있습니다.
- ACL은 ‘기본값 ACL’이라는 기능을 통해 마치 **`umask`를 폴더 별로 적용**하는 듯한 효과를 만들 수 있습니다.

|  | 파일 퍼미션 | ACL |
| --- | --- | --- |
| 관련 명령어 | chmod, umask | getfacl, setfacl |
| 권한 지정 대상 | 사용자 하나, 그룹 하나(chmod) | 사용자 여렷, 그룹 여럿 |
| 기본값 권한 | 계정 로그인 시 적용(umask) | 폴더 별로 적용 |

<br/>