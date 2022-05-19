---

published: true
title:  "[Kubernetes/CKA]모의고사 2.6 - 유저 생성 및 권한 부여하기"
excerpt: "유저에게 권한을 부여하고 싶은 경우, role을 생성한뒤, rolebinding으로 유저와 연결한다"

categories:
- DevOps
tags:
- [쿠버네티스, 쿠버네티스자격증, 유데미강의추천, 유데미쿠버네티스, cka연습문제풀이, cka덤프, cka기출문제, cka, kubernetes, kubernetesnetworking, k8s, DevOpsengineer, 데브옵스, 데브옵스엔지니어]

toc: true
toc_sticky: true

date: 2022-05-18
last_modified_at: 2022-05-18

---

<br/><br/>

# 모의고사 2.6 - 유저 생성 및 권한 부여하기

## 1. 문제 요건

Create a new user called `john`. Grant him access to the cluster. John should have permission to `create, list, get, update and delete pods` in the `development` namespace . The private key exists in the location: `/root/CKA/john.key` and csr at `/root/CKA/john.csr`.

`Important Note`: As of kubernetes 1.19, the CertificateSigningRequest object expects a `signerName`.Please refer the documentation to see an example. The documentation tab is available at the top right of terminal.

- CSR: `john-developer`; Status: Approved
- Role Name: `developer`; namespace: `development`; Resource: `Pods`
- Access: User 'john' has appropriate permissions

<br/><br/>

## 2. 내 풀이

### 1. 사전 작업

- kubectl 자동완성 설정을 미리 진행한다(이미 진행한 경우 불필요).

```bash
root@controlplane ~ ➜  source <(kubectl completion bash)

root@controlplane ~ ➜  echo "source <(kubectl completion bash)" >> ~/.bashrc 

root@controlplane ~ ➜  alias k=kubectl

root@controlplane ~ ➜  complete -F __start_kubectl k
```

<br/><br/>

### 2. 유저 생성 및 권한 부여

- 문제에서 제시한 key와 csr 파일이 존재하는지 확인 및 내용 확인

```bash
root@controlplane ~ ➜  cd /root/CKA

root@controlplane ~/CKA ➜  ls -al
total 24
drwxr-xr-x 2 root root 4096 May 19 20:44 .
drwx------ 1 root root 4096 May 19 20:38 ..
-rw-r--r-- 1 root root  883 May 19 20:44 john.csr
-rw------- 1 root root 1679 May 19 20:44 john.key
-rw-r--r-- 1 root root  391 May 19 20:38 use-pv.yaml

root@controlplane ~/CKA ➜  cat john.csr
-----BEGIN CERTIFICATE REQUEST-----
MIICVDCCATwCAQAwDzENMAsGA1UEAwwEam9objCCASIwDQYJKoZIhvcNAQEBBQAD
ggEPADCCAQoCggEBAMmDQp5eduA9I9IRGrqDavutgG6O9oHMdU2vqiiRqBCJjoY4
LDuhLY7uw47/nwckl0KlJsU10if9RsTd7kzIPVH7/K5Ulq05BIdF8kh87o6wo5fR
bdh0fEmyBwuYfGmbDhZW2UTyM18NuTbLCgBkncKhjts71PA/1Tb/vBTSwFcmYJda
j2mImTxnM6s+wfb7pZb2yUA1Xtp/H+Sk0I5c7Z8MpRKLspaR4jw0OUygLoRIxetW
Q4X9GcZXBAYU5fZLNuL54dP7SEB8ZJZk5V5CtR2fKRWswZon++/IAlKDIW8B8PjK
zsDPXWYEZYef2/SiidpxaSUAsv0wh36x/dNaf4kCAwEAAaAAMA0GCSqGSIb3DQEB
CwUAA4IBAQBVeeL9RIh+Ch3SlIUX7sDoooTUrCmVnxA97EN37PzT81x6VWy4FFHM
LUKrwJJDTmj+d3LZGNFSlI8Xo25tvMYe5Ib9Sfi+MYMRX3N3paM0B1fWabV2bapD
mY0w2FtptuVWEEwR1PccMWE0ABsFItsjLLuU3FEIIRgg7FgeptOIsd0hiC5fbe+w
taY0AWGqVX/LqbgWdF3PB8mxTbw/nDHlNDkf89IUhkQzRKQkPtJL8cxOV1nydWsy
6pgRelJlLFoGuSkoUEB9gSr997mfsKNWL8qCzO5WutWvxEGBWB56fvBsBxI30w0r
Wrqu8HwJFeCqimgfHRJoqEYcvbO+PUrK
-----END CERTIFICATE REQUEST-----
```

<br/>

- 쿠버네티스 공식문서에서 Certificate Signing Request 문서를 찾는다(Create CertificateSigningRequest참조)

```bash
cat <<EOF | kubectl apply -f -
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: myuser
spec:
  request: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0KTUlJQ1ZqQ0NBVDRDQVFBd0VURVBNQTBHQTFVRUF3d0dZVzVuWld4aE1JSUJJakFOQmdrcWhraUc5dzBCQVFFRgpBQU9DQVE4QU1JSUJDZ0tDQVFFQTByczhJTHRHdTYxakx2dHhWTTJSVlRWMDNHWlJTWWw0dWluVWo4RElaWjBOCnR2MUZtRVFSd3VoaUZsOFEzcWl0Qm0wMUFSMkNJVXBGd2ZzSjZ4MXF3ckJzVkhZbGlBNVhwRVpZM3ExcGswSDQKM3Z3aGJlK1o2MVNrVHF5SVBYUUwrTWM5T1Nsbm0xb0R2N0NtSkZNMUlMRVI3QTVGZnZKOEdFRjJ6dHBoaUlFMwpub1dtdHNZb3JuT2wzc2lHQ2ZGZzR4Zmd4eW8ybmlneFNVekl1bXNnVm9PM2ttT0x1RVF6cXpkakJ3TFJXbWlECklmMXBMWnoyalVnald4UkhCM1gyWnVVV1d1T09PZnpXM01LaE8ybHEvZi9DdS8wYk83c0x0MCt3U2ZMSU91TFcKcW90blZtRmxMMytqTy82WDNDKzBERHk5aUtwbXJjVDBnWGZLemE1dHJRSURBUUFCb0FBd0RRWUpLb1pJaHZjTgpBUUVMQlFBRGdnRUJBR05WdmVIOGR4ZzNvK21VeVRkbmFjVmQ1N24zSkExdnZEU1JWREkyQTZ1eXN3ZFp1L1BVCkkwZXpZWFV0RVNnSk1IRmQycVVNMjNuNVJsSXJ3R0xuUXFISUh5VStWWHhsdnZsRnpNOVpEWllSTmU3QlJvYXgKQVlEdUI5STZXT3FYbkFvczFqRmxNUG5NbFpqdU5kSGxpT1BjTU1oNndLaTZzZFhpVStHYTJ2RUVLY01jSVUyRgpvU2djUWdMYTk0aEpacGk3ZnNMdm1OQUxoT045UHdNMGM1dVJVejV4T0dGMUtCbWRSeEgvbUNOS2JKYjFRQm1HCkkwYitEUEdaTktXTU0xMzhIQXdoV0tkNjVoVHdYOWl4V3ZHMkh4TG1WQzg0L1BHT0tWQW9FNkpsYWFHdTlQVmkKdjlOSjVaZlZrcXdCd0hKbzZXdk9xVlA3SVFjZmg3d0drWm89Ci0tLS0tRU5EIENFUlRJRklDQVRFIFJFUVVFU1QtLS0tLQo=
  signerName: kubernetes.io/kube-apiserver-client
  expirationSeconds: 86400  # one day
  usages:
  - client auth
EOF
```

<br/>

- 문서에서 템플릿을 복사해 csr을 위한 YAML 파일을 작성한다.

```bash
vi john-csr.yaml

---

apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: john-developer
spec:
  request: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0KTUlJQ1ZEQ0NBVHdDQVFBd0R6RU5NQXNHQTFVRUF3d0VhbTlvYmpDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRApnZ0VQQURDQ0FRb0NnZ0VCQU1tRFFwNWVkdUE5STlJUkdycURhdnV0Z0c2TzlvSE1kVTJ2cWlpUnFCQ0pqb1k0CkxEdWhMWTd1dzQ3L253Y2tsMEtsSnNVMTBpZjlSc1RkN2t6SVBWSDcvSzVVbHEwNUJJZEY4a2g4N282d281ZlIKYmRoMGZFbXlCd3VZZkdtYkRoWlcyVVR5TTE4TnVUYkxDZ0JrbmNLaGp0czcxUEEvMVRiL3ZCVFN3RmNtWUpkYQpqMm1JbVR4bk02cyt3ZmI3cFpiMnlVQTFYdHAvSCtTazBJNWM3WjhNcFJLTHNwYVI0ancwT1V5Z0xvUkl4ZXRXClE0WDlHY1pYQkFZVTVmWkxOdUw1NGRQN1NFQjhaSlprNVY1Q3RSMmZLUldzd1pvbisrL0lBbEtESVc4QjhQaksKenNEUFhXWUVaWWVmMi9TaWlkcHhhU1VBc3Ywd2gzNngvZE5hZjRrQ0F3RUFBYUFBTUEwR0NTcUdTSWIzRFFFQgpDd1VBQTRJQkFRQlZlZUw5UkloK0NoM1NsSVVYN3NEb29vVFVyQ21WbnhBOTdFTjM3UHpUODF4NlZXeTRGRkhNCkxVS3J3SkpEVG1qK2QzTFpHTkZTbEk4WG8yNXR2TVllNUliOVNmaStNWU1SWDNOM3BhTTBCMWZXYWJWMmJhcEQKbVkwdzJGdHB0dVZXRUV3UjFQY2NNV0UwQUJzRkl0c2pMTHVVM0ZFSUlSZ2c3RmdlcHRPSXNkMGhpQzVmYmUrdwp0YVkwQVdHcVZYL0xxYmdXZEYzUEI4bXhUYncvbkRIbE5Ea2Y4OUlVaGtRelJLUWtQdEpMOGN4T1YxbnlkV3N5CjZwZ1JlbEpsTEZvR3VTa29VRUI5Z1NyOTk3bWZzS05XTDhxQ3pPNVd1dFd2eEVHQldCNTZmdkJzQnhJMzB3MHIKV3JxdThId0pGZUNxaW1nZkhSSm9xRVljdmJPK1BVcksKLS0tLS1FTkQgQ0VSVElGSUNBVEUgUkVRVUVTVC0tLS0tCg==
  signerName: kubernetes.io/kube-apiserver-client
  usages:
  - client auth

```

- request부분은 쿠버네티스 공식문서의 지시(`cat myuser.csr | base64 | tr -d "\n"`)에 따라 base64로 암호화한 문자열을 복사해 넣는다.

<br/>

- `create` 명령어로 csr을 생성한다.

```jsx
root@controlplane ~/CKA ➜  k create -f john-csr.yaml
certificatesigningrequest.certificates.k8s.io/john-developer created
```

<br/>

- 생성한 csr을 확인한다.

```jsx
root@controlplane ~/CKA ➜  k get csr
NAME             AGE   SIGNERNAME                                    REQUESTOR                  CONDITION
csr-b25ld        29m   kubernetes.io/kube-apiserver-client-kubelet   system:node:controlplane   Approved,Issued
csr-hcbzl        28m   kubernetes.io/kube-apiserver-client-kubelet   system:bootstrap:gcxhir    Approved,Issued
john-developer   13s   kubernetes.io/kube-apiserver-client           kubernetes-admin           Pending
```

<br/>

- csr을 승인한다.

```jsx
root@controlplane ~/CKA ➜  k certificate approve john-developer
certificatesigningrequest.certificates.k8s.io/john-developer approved
```

<br/>

- csr 상태가 Approved로 변경되었는지 확인한다.

```jsx
root@controlplane ~/CKA ➜  k get csr
NAME             AGE   SIGNERNAME                                    REQUESTOR                  CONDITION
csr-b25ld        29m   kubernetes.io/kube-apiserver-client-kubelet   system:node:controlplane   Approved,Issued
csr-hcbzl        29m   kubernetes.io/kube-apiserver-client-kubelet   system:bootstrap:gcxhir    Approved,Issued
john-developer   36s   kubernetes.io/kube-apiserver-client           kubernetes-admin           Approved,Issued
```

<br/>

- `create` 명령어로 role을 생성해준다.

```jsx
root@controlplane ~/CKA ➜  k create role developer --verb=create,get,list,update,delete --resource=pods -n development
role.rbac.authorization.k8s.io/developer created
```

<br/>

- `get` 명령어로 생성한 role을 확인한다.

```jsx
root@controlplane ~/CKA ➜  k get role -n development
NAME        CREATED AT
developer   2022-05-19T20:49:03Z

root@controlplane ~/CKA ➜  k describe role -n development
Name:         developer
Labels:       <none>
Annotations:  <none>
PolicyRule:
  Resources  Non-Resource URLs  Resource Names  Verbs
  ---------  -----------------  --------------  -----
  pods       []                 []              [create get list update delete]
```

<br/>

- `k auth can-i` 명령어로 john 유저가 할 수 있는 명령어를 살펴본다.

```jsx
root@controlplane ~/CKA ➜  k auth can-i get pods --namespace=development --as john
no
```

<br/>

- `create` 명령어로 rolebinding 리소스를 생성해 role과 user를 연결한다.

```jsx
root@controlplane ~/CKA ✖ k create rolebinding john-developer --role=developer --namespace=development --user=john
rolebinding.rbac.authorization.k8s.io/john-developer created
```

<br/>

- `get` 명령어로 생성한 rolebinding을 확인한다.

```jsx
root@controlplane ~/CKA ➜  k get rolebindings --namespace=developmentNAME             ROLE             AGE
john-developer   Role/developer   44s
```

<br/>

- `auth` 명령어로 john에게 권한이 잘 부여됐는지 확인한다.

```jsx
root@controlplane ~/CKA ✖ k auth can-i get pods -n development --as john
yes
```

<br/><br/>

## 3. 참고 URL

- Certificate Signing Request: [https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/](https://kubernetes.io/docs/reference/access-authn-authz/certificate-signing-requests/)
- Using RBAC: [https://kubernetes.io/docs/reference/access-authn-authz/rbac/](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
- kubectl cheat sheet: [https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/ko/docs/reference/kubectl/cheatsheet/)