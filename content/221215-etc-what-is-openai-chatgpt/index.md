---
emoji: 💫
title:  'OpenAI, ChatGPT란? 간단한 사용후기'
date: '2022-12-15 11:17:00'
author: jinnypark9393
tags: chatgpt
categories: etc
---

# 1. 배경 상황

아는 분이 한 번 써보라며 링크를 공유해주셔서 써보게 된 플랫폼인 OpenAI. 써보니 생각보다 괜찮아서 기록용으로 블로그에 업데이트 해둔다. 찾아보니 얼마 전 [긱뉴스에서도 관련 내용](https://news.hada.io/topic?id=7937)을 업데이트 했었고, 댓글을 보니 다들 성능에 놀라신 눈치.

<br/>

# 2. OpenAI, ChatGPT란?

OpenAI는 Samuel H. Altman과 Elon Musk(몸이 몇개인걸까 이분은)가 공동 창업한 동명의 회사에서 만든 인공지능 플랫폼으로 딥러닝 시스템을 통해 자기 자신과의 셀프 트레이닝 방식을 채택해 학습되었다.

<br/>

이 중 내가 사용해본 것은 ChatGPT라는 대화형으로 질의 응답을 할 수 있는 자연스러운 대화를 주고받을 수 있는 언어 모델. 연구 미리보기 기간에는 무료로 제공된다고 해서 바로 사용해 봄.

<br/>

사용법은 아주 간단하다. [https://chat.openai.com/chat](https://chat.openai.com/chat) 웹사이트에 접속해 로그인 후(Gmail 로그인 가능), 필용을 문장으로 질문을 남기면 된다. 개발 관련된 부분 뿐만 아니라 다양한 분야의 질의 응답에 대응이 가능하고, 한국어 대응도 가능하다고.

<br/>

아래는 내가 테스트해보았던 영문 질의와 그 답변.

**Q. How Can I connect express.js project with MySQL database?**

To connect an Express.js project with a MySQL database, you will need to install the MySQL npm package. To do this, you can use the following command:

```
npm install mysql
```

<br/>

Once the MySQL package is installed, you can use the following code to create a connection to a MySQL database:

```
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

connection.connect();

```

Replace **`host`**, **`user`**, **`password`**, and **`database`** with the appropriate values for your MySQL server. You can then use the **`connection`** object to query the database using the methods provided by the MySQL package.

<br/>

Here is an example of how to use the **`connection`** object to insert a new record into a table:

```
const post = {title: 'Hello, world!', body: 'This is a test post.'};
const query = connection.query('INSERT INTO posts SET ?', post, function (error, results, fields) {
  if (error) throw error;
});
```

This code inserts a new record into the **`posts`** table with the **`title`** and **`body`** values specified in the **`post`** object.

<br/>

For more information on how to use the MySQL package with Express.js, you can refer to the **[MySQL documentation](https://www.npmjs.com/package/mysql)** and the **[Express.js documentation](https://expressjs.com/)**.

<br/>

**Q2. How can I change application code when I migrate database from MongoDB to MySQL?**

If you are migrating a database from MongoDB to MySQL, you will need to update your application code to use the MySQL database instead of the MongoDB database. This will typically involve updating your database connection information and any database queries used in your application.

<br/>

Here are some general steps that you can follow to update your application code when migrating from MongoDB to MySQL:

<br/>

1. Install the MySQL npm package by running the following command:

```
npm install mysql
```

<br/>

1. Update your database connection information to use the MySQL database instead of the MongoDB database. This will typically involve replacing the **`mongodb`** package with the **`mysql`** package and updating the connection details, such as the hostname, username, password, and database name.

<br/>

Here is an example of how to create a connection to a MySQL database:

```
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

connection.connect();
```

<br/>

1. Update any database queries in your application to use the appropriate MySQL query syntax. This will typically involve replacing any MongoDB query operators, such as **`$set`** and **`$push`**, with the equivalent MySQL query syntax.

<br/>

Here is an example of how to update a MongoDB query to use MySQL query syntax:

```
// MongoDB query
db.users.updateOne({name: 'john'}, {$set: {email: 'john@example.com'}});

// MySQL query
const query = connection.query('UPDATE users SET email = ? WHERE name = ?', ['john@example.com', 'john'], function (error, results, fields) {
  if (error) throw error;
});
```

These are just some general steps that you can follow to update your application code when migrating from MongoDB to MySQL. You will need to adjust the specific details of your implementation based on the structure and requirements of your application.

<br/>

For more information on how to connect to and query a MySQL database using Node.js, you can refer to the **[MySQL documentation](https://www.npmjs.com/package/mysql)** and the **[Node.js documentation](https://nodejs.org/en/docs/)**.

<br/>

곧잘 대답하는데다 설명도 자연스럽게 되어서 감탄하고 있었는데, 한국어로 질문 테스트를 해보니

<br/>

Q. AWS에서 종단간 암호화를 어떻게 설정하나요?

<br/>

AWS에서 종단간 암호화를 설정하려면 데이터 전송과 데이터 저장 시 암호화를 사용해야 합니다. 이를 사용하면 응용 프로그램과 사용자 사이의 데이터와 AWS 서비스에 저장된 데이터를 보호할 수 있습니다.

<br/>

종단간 암호화를 AWS에서 설정하는 방법은 다음과 같습니다.

<br/>

HTTPS를 사용하여 응용 프로그램과 사용자 사이의 데이터를 암호화합니다. 웹 서버를

<br/>

하고 내용이 끊겨버린다. 같은 내용의 질문을 영어로 하면(How can I configure end-to-end encryption on AWS? 이런식으로 질문했었던 걸로 기억) 잘 대답하는 걸로 보아서 영어 이외의 언어의 경우에는 아직 성능이 그리 좋지는 않은 듯 하다. 그리고 다른 팀원분이 NAT Gateway관련 질문 후 답변에 나온 예시 코드를 그대로 넣어봤는데 동작을 하지 않아서 찾아보니 아예 없는 옵션을 추천했다고도. 대답 내용이 너무 자연스러워서 나도 깜빡 속아넘어갈 뻔(?) 했다.

<br/>

아직 상용판이 아니라 그런지 개선점이 있어보이긴 해서 다른 유투브 채널에서 나오는 것처럼 마법 지팡이(?) 같은 느낌까지는 아니었지만 구글 검색과 병행해서 사용하면 꽤나 쓸 만 할 듯 하다.

<br/>