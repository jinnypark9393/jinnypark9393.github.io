---
emoji: 💫
title:  'Linux Local Disk 관리: 디스크 추가 & 정보 보기'
date: '2022-10-03 23:11:00'
author: jinnypark9393
tags: linux
categories: 데브옵스
---

# Linux Local Disk 관리: 디스크 추가 & 정보 보기

## 1. 디스크 정보 보기

### 1-1. 디스크 용량 단위

- 운영체제는 저장 장치의 단위로 바이트(Byte = 8 Bit)를 사용한다.
    - 1bit = on/off 로 구분될 수 있는 가장 작은 단위
- 1 바이트 크기는 한 문자에 해당
- $2^{10}$의 거듭제곱으로 계산
- $2^{10}$=1024
- 1000바이트 단위: KB(kilobyte), MB, GB, TB, PB, EB, ZB로 표시
    - 1000byte ⇒ 1KB, 1000KB ⇒ 1MB , 1000MB ⇒ 1GB
- 1024바이트 단위: KiB(kibibyte), MiB, GiB, TiB, PiB, EiB, ZiB로 표시
    - 1024byte ⇒ 1KiB, 1024KiB ⇒ 1MiB

## 1-2. df

- 파티션 단위로 디스크 사용량 출력
- 리눅스 시스템의 디스크 사용량 확인
    - df -h ⇒ human-readable. 사람이 보기 좋게 메가(M), 기가(G)단위로 디스크 공간을 확인
    - df -a ⇒ all. 모든 파일 시스템 출력
    - df -T ⇒ type. 파일 시스템의 타입 출력
    
    | Filesystem | 리눅스에 마운트한 파일 시스템 목록 |
    | --- | --- |
    | Size(1k-blocks) | 전체용량 |
    | Used | 사용량 |
    | Available | 남은 용량 |
    | Use% | 용량 대비 사용량에 대한 퍼센트 |
    | Mounted on | 마운트 된 지점(경로) |
    
    ```bash
    root@ubuntu:~# df --help | more
    Usage: df [OPTION]... [FILE]...
    Show information about the file system on which each FILE resides,
    or all file systems by default.
    
    Mandatory arguments to long options are mandatory for short options too.
      -a, --all             include pseudo, duplicate, inaccessible file systems
      -B, --block-size=SIZE  scale sizes by SIZE before printing them; e.g.,
                               '-BM' prints sizes in units of 1,048,576 bytes;
                               see SIZE format below
      -h, --human-readable  print sizes in powers of 1024 (e.g., 1023M)
      -H, --si              print sizes in powers of 1000 (e.g., 1.1G)
      -i, --inodes          list inode information instead of block usage
      -k                    like --block-size=1K
      -l, --local           limit listing to local file systems
          --no-sync         do not invoke sync before getting usage info (default)
          --output[=FIELD_LIST]  use the output format defined by FIELD_LIST,
                                   or print all fields if FIELD_LIST is omitted.
      -P, --portability     use the POSIX output format
          --sync            invoke sync before getting usage info
          --total           elide all entries insignificant to available space,
                              and produce a grand total
      -t, --type=TYPE       limit listing to file systems of type TYPE
      -T, --print-type      print file system type
      -x, --exclude-type=TYPE   limit listing to file systems not of type TYPE
      -v                    (ignored)
          --help     display this help and exit
          --version  output version information and exit
    root@ubuntu:~# df
    Filesystem     1K-blocks    Used Available Use% Mounted on
    udev             1955536       0   1955536   0% /dev
    tmpfs             398324    1732    396592   1% /run
    **/dev/sda5       19947120 8965488   9943040  48% /**
    tmpfs            1991600       0   1991600   0% /dev/shm
    tmpfs               5120       4      5116   1% /run/lock
    tmpfs            1991600       0   1991600   0% /sys/fs/cgroup
    /dev/loop0           128     128         0 100% /snap/bare/5
    /dev/loop1         63488   63488         0 100% /snap/core20/1328
    /dev/loop2        254848  254848         0 100% /snap/gnome-3-38-2004/99
    /dev/loop3         66816   66816         0 100% /snap/gtk-common-themes/1519
    /dev/loop5         44672   44672         0 100% /snap/snapd/14978
    /dev/sda1         523248       4    523244   1% /boot/efi
    /dev/loop6         64768   64768         0 100% /snap/core20/1623
    /dev/loop7         49152   49152         0 100% /snap/snapd/16778
    /dev/loop8         47104   47104         0 100% /snap/snap-store/592
    /dev/loop9         93952   93952         0 100% /snap/gtk-common-themes/1535
    /dev/loop10       354688  354688         0 100% /snap/gnome-3-38-2004/115
    tmpfs             398320       8    398312   1% /run/user/1000
    /dev/loop11        47104   47104         0 100% /snap/snap-store/599
    
    root@ubuntu:~# df -h
    Filesystem      Size  Used Avail Use% Mounted on
    udev            1.9G     0  1.9G   0% /dev
    tmpfs           389M  1.7M  388M   1% /run
    /dev/sda5        20G  8.6G  9.5G  48% /
    tmpfs           1.9G     0  1.9G   0% /dev/shm
    tmpfs           5.0M  4.0K  5.0M   1% /run/lock
    tmpfs           1.9G     0  1.9G   0% /sys/fs/cgroup
    /dev/loop0      128K  128K     0 100% /snap/bare/5
    /dev/loop1       62M   62M     0 100% /snap/core20/1328
    /dev/loop2      249M  249M     0 100% /snap/gnome-3-38-2004/99
    /dev/loop3       66M   66M     0 100% /snap/gtk-common-themes/1519
    /dev/loop5       44M   44M     0 100% /snap/snapd/14978
    /dev/sda1       511M  4.0K  511M   1% /boot/efi
    /dev/loop6       64M   64M     0 100% /snap/core20/1623
    /dev/loop7       48M   48M     0 100% /snap/snapd/16778
    /dev/loop8       46M   46M     0 100% /snap/snap-store/592
    /dev/loop9       92M   92M     0 100% /snap/gtk-common-themes/1535
    /dev/loop10     347M  347M     0 100% /snap/gnome-3-38-2004/115
    tmpfs           389M  8.0K  389M   1% /run/user/1000
    /dev/loop11      46M   46M     0 100% /snap/snap-store/599
    
    # root 파일 시스템을 보고 싶을 경우
    root@ubuntu:~# df -h /
    Filesystem      Size  Used Avail Use% Mounted on
    /dev/sda5        20G  8.6G  9.5G  48% /
    
    # /home 디렉토리의 디스크용량을 보고 싶은 경우 (root와 같은 파티션을 사용하고 있기 때문에 동일하게 표시)
    root@ubuntu:~# df -h /home
    Filesystem      Size  Used Avail Use% Mounted on
    /dev/sda5        20G  8.6G  9.5G  48% /
    
    # 파일 시스템 포맷
    root@ubuntu:~# df -hT /
    Filesystem     Type  Size  Used Avail Use% Mounted on
    /dev/sda5      ext4   20G  8.6G  9.5G  48% /
    ```
    
    - 위 중 실제 디스크 공간은 `/dev/sda5` 에 해당

## 1-3. du

- disk usage, 디렉토리나 파일의 사용량 확인
- 특정 디렉토리 기준으로 디스크 사용량을 확인
    - du -h ⇒ human-readable. 디스크 사용량을 K, M, G 단위로 확인 가능
    - du -sh ⇒ 전체 사용량 출력

```bash
Usage: du [OPTION]... [FILE]...
  or:  du [OPTION]... --files0-from=F
Summarize disk usage of the set of FILEs, recursively for directories.

Mandatory arguments to long options are mandatory for short options too.
  -0, --null            end each output line with NUL, not newline
  -a, --all             write counts for all files, not just directories
      --apparent-size   print apparent sizes, rather than disk usage; although
                          the apparent size is usually smaller, it may be
                          larger due to holes in ('sparse') files, internal
                          fragmentation, indirect blocks, and the like
  -B, --block-size=SIZE  scale sizes by SIZE before printing them; e.g.,
                           '-BM' prints sizes in units of 1,048,576 bytes;
                           see SIZE format below
  -b, --bytes           equivalent to '--apparent-size --block-size=1'
  -c, --total           produce a grand total
  -D, --dereference-args  dereference only symlinks that are listed on the
                          command line
  -d, --max-depth=N     print the total for a directory (or file, with --all)
                          only if it is N or fewer levels below the command
                          line argument;  --max-depth=0 is the same as
                          --summarize
      --files0-from=F   summarize disk usage of the
                          NUL-terminated file names specified in file F;
                          if F is -, then read names from standard input
  -H                    equivalent to --dereference-args (-D)
  -h, --human-readable  print sizes in human readable format (e.g., 1K 234M 2G)
      --inodes          list inode usage information instead of block usage
  -k                    like --block-size=1K
  -L, --dereference     dereference all symbolic links
  -l, --count-links     count sizes many times if hard linked
  -m                    like --block-size=1M
  -P, --no-dereference  don't follow any symbolic links (this is the default)
  -S, --separate-dirs   for directories do not include size of subdirectories
      --si              like -h, but use powers of 1000 not 1024
  -s, --summarize       display only a total for each argument
  -t, --threshold=SIZE  exclude entries smaller than SIZE if positive,
                          or entries greater than SIZE if negative
      --time            show time of the last modification of any file in the
                          directory, or any of its subdirectories
      --time=WORD       show time as WORD instead of modification time:
                          atime, access, use, ctime or status
      --time-style=STYLE  show times using STYLE, which can be:
                            full-iso, long-iso, iso, or +FORMAT;
                            FORMAT is interpreted like in 'date'
  -X, --exclude-from=FILE  exclude files that match any pattern in FILE
      --exclude=PATTERN    exclude files that match PATTERN
  -x, --one-file-system    skip directories on different file systems
      --help     display this help and exit
      --version  output version information and exit

# du의 경우 -sh 옵션과 함께 많이 사용된다.
root@ubuntu:~# du -sh /home
5.3M	/home
```

## 2. VMware에 새 디스크 추가

### 2-1. 디스크 디바이스 이름

- VMware init 0으로 시스템 끄기 → Settings → Add Devices → Hard Disk 10G → Advanced Setttings: SCSI → 시스템 재부팅
- 블록 디바이스 이름 규칙
    - 플로피 디스크: /dev/fd0, /dev/fd1
    - CDROM: /dev/sr0, /dev/cdrom
    - IDE 디스크(하드디스크: legacy): /dev/hda, /dev/hdb
    - **SCSI** 디스크: /dev/sda(Squash Disk A), /dev/sdb, /dev/sdc 등
        - 파티션: /dev/sda1, /dev/sda2, /dev/sdb1 등
- **NVMe**는 인텔, 삼성, 샌디스크, 델, 시게이트 등이 포함된 산업 컨소시엄이 **SSD** 전용으로 개발한 통신 표/프로토콜이다.
    - NVMe 하드디스크 이름: /dev/nvme0n1, /dev/nvme0n2
    - 파티션 이름: /dev/nvme0n1p1, /dev/nvme0n1p2, /dev/nvme0n2p1

### 2-2. Cloud 디스크

- AWS EBS 디바이스 이름
    
    
    | 가상화 유형 | 응시 가능 | 루트 전용 | EBS 볼륨 추천 | 인스턴스 스토어 볼륨 |
    | --- | --- | --- | --- | --- |
    | 반가상화(PV) | /dev/sd[a-z]
    /dev/sd[a-z][1-15]
    /dev/hd[a-z]
    /dev/hd[a-z][1-15] | /dev/sda1
     | /dev/sd[f-p]
    /dev/sd[f-p][1-6] | /dev/sd[b-e] |
    | HVM | /dev/sd[a-z]
    /dev/xvd[b-c][a-z] | AMI에 따라 다름
    /dev/sda1 또는 /dev/xvda | /dev/sd[f-p]* | /dev/sd[b-e]
    /dev/sd[b-h] (h1.16xlarge)
    /dev/sd[b-y] (d2.8xlarge)
    /dev/sd[b-i] (i2.8xlarge)** |
- Azure disk 디바이스 이름
    - /dev/sda, /dev/sdb…

### 2-3. 블럭 장치 확인

- lsblk
    - 블럭 디바이스 정보 출력
        
        ```bash
        ttabae@ubuntu:~$ lsblk --help
        
        Usage:
         lsblk [options] [<device> ...]
        
        List information about block devices.
        
        Options:
         -D, --discard        print discard capabilities
         -E, --dedup <column> de-duplicate output by <column>
         -I, --include <list> show only devices with specified major numbers
         -J, --json           use JSON output format
         -O, --output-all     output all columns
         -P, --pairs          use key="value" output format
         -S, --scsi           output info about SCSI devices
         -T, --tree[=<column>] use tree format output
         -a, --all            print all devices
         -b, --bytes          print SIZE in bytes rather than in human readable format
         -d, --nodeps         don't print slaves or holders
         -e, --exclude <list> exclude devices by major number (default: RAM disks)
         -f, --fs             output info about filesystems
         -i, --ascii          use ascii characters only
         -l, --list           use list format output
         -M, --merge          group parents of sub-trees (usable for RAIDs, Multi-path)
         -m, --perms          output info about permissions
         -n, --noheadings     don't print headings
         -o, --output <list>  output columns
         -p, --paths          print complete device path
         -r, --raw            use raw output format
         -s, --inverse        inverse dependencies
         -t, --topology       output info about topology
         -z, --zoned          print zone model
         -x, --sort <column>  sort output by <column>
             --sysroot <dir>  use specified directory as system root
        
         -h, --help           display this help
         -V, --version        display version
        
        ttabae@ubuntu:~$ lsblk
        NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
        loop0    7:0    0     4K  1 loop /snap/bare/5
        loop1    7:1    0  63.2M  1 loop /snap/core20/1623
        loop2    7:2    0  61.9M  1 loop /snap/core20/1328
        loop3    7:3    0 346.3M  1 loop /snap/gnome-3-38-2004/115
        loop4    7:4    0 248.8M  1 loop /snap/gnome-3-38-2004/99
        loop5    7:5    0  65.2M  1 loop /snap/gtk-common-themes/1519
        loop6    7:6    0  45.9M  1 loop /snap/snap-store/592
        loop7    7:7    0  91.7M  1 loop /snap/gtk-common-themes/1535
        loop8    7:8    0  45.9M  1 loop /snap/snap-store/599
        loop9    7:9    0  43.6M  1 loop /snap/snapd/14978
        loop10   7:10   0    48M  1 loop /snap/snapd/16778
        sda      8:0    0    20G  0 disk 
        ├─sda1   8:1    0   512M  0 part /boot/efi
        ├─sda2   8:2    0     1K  0 part 
        └─sda5   8:5    0  19.5G  0 part /
        sdb      8:16   0    10G  0 disk 
        sr0     11:0    1  1024M  0 rom
        ```
        
    
- blkid
    - 블럭 디바이스 id 확인
    
    ```bash
    ttabae@ubuntu:~$ blkid
    /dev/sda5: UUID="39a9fd9f-2694-44c4-b180-07e750eed636" TYPE="ext4" PARTUUID="9b09f75e-05"
    ttabae@ubuntu:~$ blkid --help | more
    
    Usage:
     blkid --label <label> | --uuid <uuid>
    
     blkid [--cache-file <file>] [-ghlLv] [--output <format>] [--match-tag <tag>] 
           [--match-token <token>] [<dev> ...]
    
     blkid -p [--match-tag <tag>] [--offset <offset>] [--size <size>] 
           [--output <format>] <dev> ...
    
     blkid -i [--match-tag <tag>] [--output <format>] <dev> ...
    
    Options:
     -c, --cache-file <file>    read from <file> instead of reading from the default
                                  cache file (-c /dev/null means no cache)
     -d, --no-encoding          don't encode non-printing characters
     -g, --garbage-collect      garbage collect the blkid cache
     -o, --output <format>      output format; can be one of:
                                  value, device, export or full; (default: full)
     -k, --list-filesystems     list all known filesystems/RAIDs and exit
     -s, --match-tag <tag>      show specified tag(s) (default show all tags)
     -t, --match-token <token>  find device with a specific token (NAME=value pair)
     -l, --list-one             look up only first device with token specified by -t
    ```

<br/>