---

published: true
title:  "[Kubernetes]쿠버네티스 네트워킹(4)Container Networking"
excerpt: "쿠버네티스 네트워킹을 알아보기에 앞서 컨테이너 네트워킹에 대해 알아보자."

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스네트워킹, dockernetworking, containernetworking, 도커네트워킹, 컨테이너네트워킹, cka, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어]

toc: true
toc_sticky: true

date: 2022-05-03
last_modified_at: 2022-05-03

---

<br/><br/>

*💡  쿠버네티스 네트워킹을 알아보기에 앞서 컨테이너 네트워킹에 대해 알아보자.*

<br/>

# 1. Container Networking

- 도커 컨테이너를 띄운 호스트
    - 호스트 eth0: 192.168.1.10

<br/>

- 도커 컨테이너 네트워킹 옵션 3가지
    - None network: `docker run —network none nginx`
        - 컨테이너 외부 접속 불가 & 외부에서 컨테이너 접속 불가
    - Host network: `docker run —network host nginx`
        - 호스트와 컨테이너의 네트워크가 격리되지 않음
        - 추가 포트 매핑 불필요
            - 포트 80에 어플리케이션을 배포 ⇒ [http://192.168.1.10:80](http://192.168.1.10:80) 에서 애플리케이션 접속 가능
            - 단, 다른 컨테이너에서 동일 포트로 애플리케이션을 배포할 경우 작동하지 않음
    - **Bridge network**

## 1. Bridge network

- 내부 사설망이 형성됨 (Bridge network: 172.0.0 - container a 172.17.0.2, container b 172.12.0.3)
- Docker가 호스트에 설치
    - 기본적으로 Bridge 라는 내부 사설 네트워크 생성 (`docker network ls` 커맨드를 통해 확인할 수 있음)            
    ⇒ 호스트에 docker0(=v-net-0)라는 이름으로 네트워크 생성( `ip link`로 확인 가능)
                
    - Docker0 ⇒ down state
    - Docker0: 172.17.0.1 할당 ( `ip addr`로 확인 가능)
    - 네임스페이스 확인
        - `ip netns`
        - `docker inspect 942d70e5785b2`
        - 컨테이너(172.17.0.3) = 네트워크 네임스페이스
        - 도커는 위에서 했던것과 같이 컨테이너에 eth@ifOO, bridge 네트워크에 veth@ifOO 인터페이스를 생성해 케이블로 연결(뒤에있는 ifOO가 서로 쌍이 된다)
        - 브릿지 네트워크 밑에 있는 컨테이너들 ⇒ 같은 네트워크이기 때문에 통신 가능
        - 예: [http://172.17.0.3:80](http://172.17.0.3:80) ⇒ 애플리케이션 실행 가능
        - 하지만 외부에서 같은 주소로 접속했을 경우 접속 불가

<br/>

## 2. 호스트 외부에서 도커 컨테이너를 접속
- Docker: Port publishing / Port Mapping

- `docker run -p 8080:80 nginx` 호스트의 8080 포트로 들어온 요청을 80포트로 전달 ⇒ 외부에서 [http://172.17.0.3:8080](http://172.17.0.3:8080) : 접속 가능

- 어떻게 8080 포트에서 80 포트로 트래픽 전달?
    - NAT 규칙 생성
                
    ```bash
    iptables \
        -t nat \
        -A PREROUTING \
        -j DNAT \
        --dport 8080 \
        --to-destination 80
    ```
            
    ```bash
    iptables \
    	-t nat \
    	-A DOCKER \
    	-j DNAT \
    	--dport 8080 \
    	--to-destination 172.17.0.3:80
    ```
            
    ⇒ `iptables -nvL -t nat` 으로 확인할 수 있음