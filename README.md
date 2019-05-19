# DiscordApp-Clone



![](discord-example.gif)
*Demo*: discordapp-clone.com

  Open-source full-stack app clone of discord made with React 16.8(Hooks and Suspense), Typescript, GraphQL-Subscriptions, TypeORM and PostgresQL.
___

#### Run instructions
This project is run with `docker` & `docker-compose`.

Clone

    $ git clone https://github.com/grantkang5/discord-clone.git

and start with docker-compose

    $ docker-compose up --build

___

#### Why?
This app was built with the purpose for being a guideline for using currently trending technologies in full-stack javascript web applications. Design patterns and architectures are structured around microservices with a graphql server used to cover all communication between servers. Redis is used to help and support keep track of ongoing live activity and subscriptions.