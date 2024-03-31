

---
INSERT INTO test(title, content)VALUES('t1', 'content1');
INSERT INTO test(title, content)VALUES('t2', 'content2');
INSERT INTO test(title, content)VALUES('t3', 'content3');
---
SELECT * FROM test;
SELECT * FROM todos;
---
DROP TABLE IF EXISTS test;
CREATE TABLE test (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP(3) NULL,
  title TEXT NOT NULL,
  content TEXT,
  completed INTEGER  DEFAULT 0,
  userId    INTEGER  DEFAULT 0 
);

---
DROP TABLE IF EXISTS todos;
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP(3) NULL,
  title TEXT NOT NULL,
  content TEXT,
  completed INTEGER  DEFAULT 0,
  userId    INTEGER  DEFAULT 0 
);
---

