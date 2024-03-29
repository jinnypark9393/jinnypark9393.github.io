---
emoji: ☕
title:  Java의 static(정적)이란?
date: '2022-08-08 19:08:00'
author: jinnypark9393
tags: java
categories: 프로그래밍
---

# 1. 배경상황

현재 프로젝트가 Java로 구성되어있어 자바 메모리 구조에 대해서는 이전에 개인적으로 공부한 적이 있다.

<br/>

하지만 최근 새로 착수한 프로젝트가 static의 과도한 사용으로 메모리 이슈가 발생하고 있는 프로젝트라 static의 개념을 새로 학습하고, Java 메모리 구조에 대해 다시 정리해보려 한다.

<br/>

# 2. Static(정적)이란?

영문을 그대로 직역하면 고정된이라는 뜻을 가지고 있는데, 실제로 static은 프로그램 시작 시 메모리에 고정적으로 할당되어, 프로그램이 종료될 때 해제된다. 

<br/>

`static` 이라는 키워드를 사용해 **정적 변수(static variable)** 과 **정적 메서드(static method)** 를 생성할 수 있다. 이 둘을 합쳐 **정적 멤버(static member)**, 혹은 **클래스 멤버(class member)** 라고 부른다.

<br/>

이렇게 생성된 정적 변수, 정적 메서드의 경우 클래스가 메모리에 올라갈 때 자동으로 생성된다. 즉, 인스턴스(객체) 생성 없이 바로 사용이 가능하다.

<br/>

# 3. Static의 사용용도

## 상수를 정의

절대 변하지 않는 변수를 **상수**라고 하는데, 객체 내에서 매번 일반 변수로 정의하기 보다는 정적 변수로 선언 시 메모리를 아낄 수 있다.

<br/>

## 유틸리티 클래스를 정의

**유틸리티 클래스(utility class)** 는 인스턴스 메서드와 변수를 제공하지 않고, 데이터 처리를 위한 정적 메서드만 존재하는 클래스를 뜻한다.

<br/>

예를 들어 Java의 `java.util.Math` 클래스의 경우, 상수 외의 인스턴스 변수가 없고, 계산을 위한 정적 메서드만 제공한다.

<br/>

**Static영역에 할당된 메모리의 경우, 모든 객체가 해당 메모리를 공유하기 때문에**, 위와 같이 객체의 상태를 이용하지 않고, 여러 객체의 필요에 의해 데이터를 처리하는 공통 로직이 필요할 경우 static을 사용하여 메모리를 절약할 수 있다.

<br/>

# 4. Static의 단점

## 메모리 문제

Static은 프로그램 실행 시점에 메모리에 할당을 하며, 프로그램 종료 시까지 메모리에서 해제되지 않기 때문에 과도하게 사용할 경우 메모리 부족 문제가 발생할 수 있다.

<br/>

## 동시성 문제

Static은 전역에서 접근이 가능하므로 별도의 동기화 전략이 수립되어야 한다.

<br/>

## 런타임 다형성 불가

Static으로만 이루어진 메서드를 사용하는 객체의 경우, 해당 객체를 메모리로 할당해 사용하는 것이 아니고 `object.method` 로 바로 접근하여 호출하게 된다.

<br/>

## 객체 상태 사용 불가

정적 메서드 내부에서는 클래스 인스턴스 필드를 사용할 수 없기 때문에 인자를 모두 외부에서 주입해야한다.

<br/>

Static은 프로그램 실행 시점에 메모리에 올라가는데, 정적 메서드 내부에 객체의 인스턴스 필드가 초기화 되지 않을 경우 문제가 생길 수 있기 때문에 위와 같이 구현된다. 따라서 정적 메서드 안에는 정적 변수만 사용 가능하다.

<br/>

일반 메서드라면 객체 내의 상태를 통해 해당 메서드를 구현할 수 있으므로 변화하는 상태에 따라 다채로운 기능 구현이 가능하나, 정적 메서드의 경우 이러한 형태로 구현할 수 없다.

<br/>

즉, 객체 내 정적 메서드가 많아지는 경우, 외부 값에 의존하는 수동적 객체가 된다.

<br/>

## 테스트 용이성 저하

정적 필드는 전역으로 관리되기 때문에 프로그램 전체에서 해당 필드에 접근 및 수정이 가능하다.

<br/>

따라서 해당 필드를 추론하기 어려워 테스트가 까다롭다.

<br/>

# 5. Static의 메모리 할당

동적(Dynamic)의 경우 객체를 런타임 도중에 힙 영역(Heap Area)에 할당한다.

<br/>

반면, 정적(Static)의 경우, 프로그램이 시작되는 시점에 클래스 로더(Class Loader)가 클래스를 해석해 메서드 영역 혹은 힙 영역에 클래스 메타 정보 및 정적 변수를 적재한다.

<br/>

# 6. Static의 종류

## Static 변수

- 정적 변수는 한 클래스의 모든 인스턴스에서 공유된다.
- 같은 클래스에 속하는 모든 인스턴스에서 해당 정적 변수의 하나뿐인 복사본을 공유한다.
- 정적 변수는 클래스가 메모리에 로딩될 때 초기화 된다.
- 일반적으로 클래스의 새로운 인스턴스가 처음 만들어지거나, 정적 메서드가 실행될 때 해당 클래스를 불러와 로딩한다.
- 정적 변수도 인스턴스 변수와 마찬가지로 선언만 하고 초기화 하지 않을 경우 기본 값으로 초기화된다.
- `static final` 로 선언된 변수는 상수이며, 이 경우 초기화 하지 않으면 에러가 발생하며, 초기화 이후 값 변경이 불가하다.
- 정적 변수는 정적 메서드와 달리 일반 메서드에서도 접근할 수 있다.

<br/>

## Static 메서드

- 인스턴스를 필요로 하지 않는 메서드
- Static 키워드를 이용해 메서드를 선언
- 클래스명을 사용해 호출
- 정적 메서드와 정적 메서드가 아닌 메서드를 섞어 클래스를 선언할 수 있으나, 정적 메서드가 아닌 메서드가 있다면 그 클래스의 인스턴스를 만들 수 있는 방법이 있어야 한다.
- 정적 메서드에서 정적 변수가 아닌 변수(인스턴스 변수)를. 사용할 수 없다.
- 정적 메서드 내에서 정적 메서드가 아닌 메서드를 사용할 수 없다.
- 정적 메서드 내에서 this 키워드를 사용할 수 없다.
- 클래스가 메모리에 로딩될 때 자동으로 선언도니다.
- Import Static을 이용해 import한 뒤, 클래스명을 사용하지 않고 바로 사용할 수 있다.

<br/>