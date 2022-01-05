这是一个记账应用

## Getting Started

1. 首先，运行项目

```bash
npm run dev
# or
yarn dev
```

2. 开发时起数据库

```bash
docker run -itd --name mysql1 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7
```

3. 修改docker容器内`mysql`的配置，将默认编码改为`utf-8`

```cnf
# /etc/my.cnf或者/etc/mysql/my.cnf

[client]
default-character-set = utf8

[mysqld]
default-storage-engine = INNODB
character-set-server = utf8
collation-server = utf8_general_ci
```
4. 重启容器并检查编码 `show variables like '%char%';`

5. 创建数据库 `development/test/production`

## Set up Prisma

1. create Prisma schema

```bash
npx prisma init
```

2. using prisma migrate

```bash
yarn add yarn add @prisma/client
npx prisma migrate dev --name init

# reset database
npx prisma migrate reset
```

> Whenever you make changes to your Prisma schema in the future, you manually need to invoke `prisma generate` in order to accommodate the changes in your Prisma Client API.
