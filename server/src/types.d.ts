export type Maybe<T> = T | undefined | null;

import { GraphQLResolveInfo } from "graphql";

import { User } from "./src/entity/User";

import { Server } from "./src/entity/Server";

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    users?: UsersResolver<Maybe<User[]>, TypeParent, Context>;

    user?: UserResolver<Maybe<User>, TypeParent, Context>;

    me?: MeResolver<Maybe<User>, TypeParent, Context>;

    servers?: ServersResolver<Maybe<(Maybe<Server>)[]>, TypeParent, Context>;

    userServers?: UserServersResolver<
      Maybe<(Maybe<Server>)[]>,
      TypeParent,
      Context
    >;
  }

  export type UsersResolver<
    R = Maybe<User[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = Maybe<User>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, UserArgs>;
  export interface UserArgs {
    id: string;
  }

  export type MeResolver<R = Maybe<User>, Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ServersResolver<
    R = Maybe<(Maybe<Server>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type UserServersResolver<
    R = Maybe<(Maybe<Server>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, UserServersArgs>;
  export interface UserServersArgs {
    userId: string;
  }
}

export namespace UserResolvers {
  export interface Resolvers<Context = {}, TypeParent = User> {
    id?: IdResolver<Maybe<string>, TypeParent, Context>;

    email?: EmailResolver<Maybe<string>, TypeParent, Context>;

    password?: PasswordResolver<Maybe<string>, TypeParent, Context>;

    hostedServers?: HostedServersResolver<
      Maybe<(Maybe<Server>)[]>,
      TypeParent,
      Context
    >;

    joinedServers?: JoinedServersResolver<
      Maybe<(Maybe<Server>)[]>,
      TypeParent,
      Context
    >;
  }

  export type IdResolver<
    R = Maybe<string>,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<
    R = Maybe<string>,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type PasswordResolver<
    R = Maybe<string>,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type HostedServersResolver<
    R = Maybe<(Maybe<Server>)[]>,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type JoinedServersResolver<
    R = Maybe<(Maybe<Server>)[]>,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace ServerResolvers {
  export interface Resolvers<Context = {}, TypeParent = Server> {
    id?: IdResolver<Maybe<string>, TypeParent, Context>;

    name?: NameResolver<Maybe<string>, TypeParent, Context>;

    host?: HostResolver<Maybe<User>, TypeParent, Context>;

    users?: UsersResolver<Maybe<(Maybe<User>)[]>, TypeParent, Context>;
  }

  export type IdResolver<
    R = Maybe<string>,
    Parent = Server,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = Maybe<string>,
    Parent = Server,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type HostResolver<
    R = Maybe<User>,
    Parent = Server,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type UsersResolver<
    R = Maybe<(Maybe<User>)[]>,
    Parent = Server,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    signUp?: SignUpResolver<User, TypeParent, Context>;

    logIn?: LogInResolver<User, TypeParent, Context>;

    logOut?: LogOutResolver<Maybe<User>, TypeParent, Context>;

    deleteUser?: DeleteUserResolver<Maybe<User>, TypeParent, Context>;

    createServer?: CreateServerResolver<Maybe<Server>, TypeParent, Context>;

    deleteServer?: DeleteServerResolver<Maybe<Server>, TypeParent, Context>;

    editServer?: EditServerResolver<Maybe<Server>, TypeParent, Context>;
  }

  export type SignUpResolver<R = User, Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context,
    SignUpArgs
  >;
  export interface SignUpArgs {
    email: string;

    password: string;
  }

  export type LogInResolver<R = User, Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context,
    LogInArgs
  >;
  export interface LogInArgs {
    email: string;

    password: string;
  }

  export type LogOutResolver<
    R = Maybe<User>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type DeleteUserResolver<
    R = Maybe<User>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, DeleteUserArgs>;
  export interface DeleteUserArgs {
    id: string;
  }

  export type CreateServerResolver<
    R = Maybe<Server>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, CreateServerArgs>;
  export interface CreateServerArgs {
    name: string;

    userId: string;
  }

  export type DeleteServerResolver<
    R = Maybe<Server>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type EditServerResolver<
    R = Maybe<Server>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace SubscriptionResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    userCreated?: UserCreatedResolver<Maybe<User>, TypeParent, Context>;
  }

  export type UserCreatedResolver<
    R = Maybe<User>,
    Parent = {},
    Context = {}
  > = SubscriptionResolver<R, Parent, Context>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface IResolvers<Context = {}> {
  Query?: QueryResolvers.Resolvers<Context>;
  User?: UserResolvers.Resolvers<Context>;
  Server?: ServerResolvers.Resolvers<Context>;
  Mutation?: MutationResolvers.Resolvers<Context>;
  Subscription?: SubscriptionResolvers.Resolvers<Context>;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
