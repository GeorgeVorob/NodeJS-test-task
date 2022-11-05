# General:

- Использовался express

- Написано без использования ORM

- Реализовал все ендпоинты по ТЗ кроме последних четырех для тегов. Словил температуру и нехватку времени, так что отправил как есть. В любом случае они не должны быть значимы по сложности после остальных задач.

- Домен для теста - 1054029-cn56683.tmweb.ru

# How to install:

1. Скачать последнюю версию с репозитория (ветка main или последняя release)

2. Скопировать и переименовать ".env.default" файл в ".env", он здесь выступает в роли конфига.

3. Заполнить .env данными для доступа к Postgres

4. ```bash
   npm install
   ```

5. ```bash
   npm run migrate
   ```

6. ```bash
   npm run server
   ```


## Список API endpoint

- POST /signin

```json
{
  "email": "example@exe.com",
  "password": "example",
  "nickname": "nickname"
}
```

Валидировать **password**, **email**, **nickname**

RETURN:

```json
{
  "token": "token",
  "expire": "1800"
}
```

---
- POST /login

```json
{
  "email": "example@exe.com",
  "password": "example"
}
```

RETURN:
```json
{
  "token": "token",
  "expire": "1800"
}
```

---
- POST /logout
  
  HEADER: ```Authorization: Bearer {token}```

**Ниже идущие api закрыты под авторизацией**

---
- GET /user

  HEADER: ```Authorization: Bearer {token}```

RETURN:
```json
{
  "email": "example@exe.com",
  "nickname": "example",
  "tags": [
    {
      "id": "id",
      "name": "example",
      "sortOrder": "0"
    }
  ]
}
```

---
- PUT /user
  
  HEADER: ```Authorization: Bearer {token}```

```json
{
  "email": "example@exe.com",
  "password": "example",
  "nickname": "example"
}
```

Все поля опциональные

Валидировать **password**, **email**, **nickname**

Проверять на дублирование __email__ и __nickname__ в базе

RETURN :

```json
{
  "email": "example@exe.com",
  "nickname": "example"
}
```

---
- DELETE /user

  HEADER: ```Authorization: Bearer {token}```

Разлогиниваем и удаляем пользователя

---
- POST /tag
  
  HEADER: ```Authorization: Bearer {token}```

```json
{
  "name": "example",
  "sortOrder": "0"
}
```

**sortOrder** опционально по default 0
Проверять на дублирование __name__ в базе и максимальную длину

RETURN :

```json
{
  "id": "id",
  "name": "example",
  "sortOrder": "0"
}
```

---
- GET /tag/{id}

  HEADER: ```Authorization: Bearer {token}```


RETURN :
```json
{
  "creator": {
    "nickname": "example",
    "uid": "exam-pl-eUID"
  },
  "name": "example",
  "sortOrder": "0"
}
```


---
- GET /tag?sortByOrder&sortByName&offset=10&length=10

  HEADER: ```Authorization: Bearer {token}```

**sortByOrder**, **offset** **SortByName**, **length** опциональны

**length** количество элементов в выборке

Если выбрали подход с страницами, то ипсользуйте параметры **page** и **pageSize** вместо **offset** и **length**

RETURN :

```json
{
  "data": [
    {
      "creator": {
        "nickname": "example",
        "uid": "exam-pl-eUID"
      },
      "name": "example",
      "sortOrder": "0"
    },
    {
      "creator": {
        "nickname": "example",
        "uid": "exam-pl-eUID"
      },
      "name": "example",
      "sortOrder": "0"
    }
  ],
  "meta": {
    "offset": 10,
    "length": 10,
    "quantity": 100
  }
}
```

**quantity** общее количество элементов в выборке

---
- PUT /tag/{id}

  HEADER: ```Authorization: Bearer {token}```

Тэг может менять только владелец

```json
{
  "name": "example",
  "sortOrder": "0"
}
```

**name** или **sortOrder** опциональны

RETURN :
```json
{
  "creator": {
    "nickname": "example",
    "uid": "exam-pl-eUID"
  },
  "name": "example",
  "sortOrder": "0"
}
```


Источник ТЗ - https://github.com/kisilya/test-tasks/blob/main/nodeJS/README.md
