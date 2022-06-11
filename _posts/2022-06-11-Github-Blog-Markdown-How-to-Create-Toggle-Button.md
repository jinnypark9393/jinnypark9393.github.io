---

published: true
title:  "[Github Pages/Blog/Markdown]마크다운에서 토글(Toggle) 버튼 / Expander control(접기/펼치기 기능) 만들기"
excerpt: "💡 마크다운에서 토글(Toggle) 버튼 / Expander control(접기/펼치기 기능)을 만드려면 HTML의 Details 태그를 활용하자"

categories:
- Github Blog
tags:
- [GithubBlog, GithubPages, 깃허브블로그, 깃헙블로그, 깃헙블로그토글버튼, 마크다운토글버튼, 깃허브블로그토글버튼, 깃허브토글버튼, 마크다운펼치기기능, 깃헙블로그펼치기기능, 개발자블로그, 엔지니어블로그]

toc: true
toc_sticky: true

date: 2022-06-11
last_modified_at: 2022-06-11

---

<br/><br/>

**💡  마크다운에서 토글(Toggle) 버튼 / Expander control(접기/펼치기 기능)을 만드려면 HTML의 Details 태그를 활용하자.**

<br/>

최근 기술 면접 관련한 자료를 깃헙 코드 저장소에 하나씩 업로드 하고 있는데, 다른 레포지토리를 보니 예상 질문/답변을 작성할 때 토글버튼을 이용하면 깔끔하게 정리할 수 있어 내 레포지토리에도 적용하기위해 찾아보았다. 

결론적으로는, 마크다운(Markdown) 문법 자체를 이용해 토글(Toggle) 버튼 / Expander Control(접기/펼치기) 기능을 만드는 건 불가능하고, 그 대신 html의 details 태그를 이용해 만들 수 있다고 한다.

<br/>

# 1. <details>를 이용한 Toggle/Expander Control 예시

```markdown
<details>
<summary>접었을 때 보이는 내용</summary>
<div markdown="1">

펼쳤을 때 보이는 내용입니다.

</div>
</details>
```

- `<div markdown="1">` : jekyll에서 html사이에 있는 markdown 문법을 인식시키기 위한 코드

<br/><br/>

# 2. 출력 예시

<details>
<summary>접었을 때 보이는 내용</summary>
<div markdown="1">

펼쳤을 때 보이는 내용입니다.

</div>
</details>