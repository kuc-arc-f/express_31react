# basic_auth

 Version: 0.9.2

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2024/01/25

 update :

***

auth  sample

***
* index.ts: user, password set

```
app.use(basicAuth({
  users: { "test": "1111" },
  challenge: true,
}));
```

***

