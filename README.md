# DiscordApp-Clone



![](discord-example.gif)
*Demo*: [discord-clone.netlify.com](https://discord-clone.netlify.com).

  Open-source full-stack app clone of discord made with React 16.8(Hooks and Suspense), Typescript, GraphQL-Subscriptions, TypeORM and PostgresQL.
___

#### Run instructions
The project is separated into client/server directories. You'll need to install the dependencies for both directories
In client directory:
```yarn``` or ```npm install```
In server directory:
```yarn``` or ```npm install```
You'll also need a postgres and redis database for the app to run. If you have docker you can run ```yarn docker``` or ```npm run docker```  on a separate terminal window from the server directory to start an instance of postgres and redis simultaneously

Alternatively:
You can run the entire project using the `k8s` branch by running `docker-compose up --build`:

Clone

    $ git clone https://github.com/grantkang5/discord-clone.git
    $ git fetch
    $ git checkout k8s

and start with docker-compose

    $ docker-compose up --build

___

#### Why?
This app was built with the purpose for being a guideline for using currently trending technologies in full-stack javascript web applications. Design patterns and architectures are structured around microservices with a graphql server used to cover all communication between servers. Redis is used to help and support keep track of ongoing live activity and subscriptions.