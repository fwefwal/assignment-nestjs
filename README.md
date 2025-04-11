<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

# Тестовое на Бэкенд, 04.2025

## Постановка задачи

В тестовом задании мы предлагаем вам познакомиться с движением `RealWorld`. Здесь разработчики выбирают стеки для фронтенд-части, бэкенда или реализуют фуллстак-решение на основе спецификаций. В то время как большинство примеров использования тех или иных технологических стеков представляют собой простенькие туду-приложения, которые имеют мало общего с реальными проектами, здесь мы строим аналог [Medium](https://medium.com/).

В [репозитории](https://github.com/gothinkster/realworld) можно ознакомиться с дополнительной информацией, в том числе с [готовыми реализациями](https://codebase.show/projects/realworld) бэкенда на множестве стеков. Фронтенд в данной работе реализовывать не требуется.

Основной документ для реализации - [спецификация](https://realworld-docs.netlify.app/specifications/backend/introduction/). Наиболее важная информация находится в разделах *Endpoints*, *API response format*, *Error handling*. Там описаны конечные точки, которые необходимо реализовать, форматы входных данных и ответов, а также форматы ошибок.

Статус по функционалу (в процентах):
- [15] Аутентификация и пользователи
- [80] Статьи
- [0] Комментарии
- [0] Фолловинг
- [0] Фид
- [90] Теги

## Работа над проектом

```bash
# установка зависимостей
$ npm install

# режим разработки
$ npm run start:dev

# режим продакшен
$ npm run start:prod
```

## Запуск тестов

Большую часть этих требований удобно проверять через коллекцию *postman-запросов*, которая находится в файле `/test/postman/collection.json`. Вы можете импортировать их в *Postman* или *Insomnia* и тестировать вручную. Также можно запустить постман-тесты автоматизированно.

```bash
$ npm run test:postman
```

В данный момент более половины тестов проходят, ваша задача - стремиться к прохождению всех тестов!

## Ресурсы

-  [документация](https://docs.nestjs.com)
-  [дискорд](https://discord.gg/G7Qnnhy)
-  [девтулз](https://devtools.nestjs.com)
-  [курс статей от Prisma](https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0)
-  [примеры от Prisma](https://github.com/prisma/prisma-examples/tree/latest)
-  [курс статей Wanago](https://wanago.io/courses/api-with-nestjs/)

## Формат сдачи

Форкните репозиторий и ведите работу через контроль версий. Ко дню дедлайна пригласите пользователя `daslef` в коллабораторы. Дедлайн: 01:00 26.04.2025.
