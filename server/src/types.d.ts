export type Maybe<T> = T | undefined | null;

export enum ChannelType {
  Text = "TEXT",
  Voice = "VOICE"
}

export type Upload = any;
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

import { User } from "./src/entity/User";

import { Server } from "./src/entity/Server";

import { Channel } from "./src/entity/Channel";

import { Invitation } from "./src/entity/Invitation";

import { Message } from "./src/entity/Message";

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

    onlineUsers?: OnlineUsersResolver<
      Maybe<(Maybe<User>)[]>,
      TypeParent,
      Context
    >;

    user?: UserResolver<Maybe<User>, TypeParent, Context>;

    me?: MeResolver<Maybe<User>, TypeParent, Context>;

    usersByName?: UsersByNameResolver<
      Maybe<(Maybe<User>)[]>,
      TypeParent,
      Context
    >;

    server?: ServerResolver<Maybe<Server>, TypeParent, Context>;

    servers?: ServersResolver<Maybe<(Maybe<Server>)[]>, TypeParent, Context>;

    userServers?: UserServersResolver<
      Maybe<(Maybe<Server>)[]>,
      TypeParent,
      Context
    >;

    channel?: ChannelResolver<Maybe<Channel>, TypeParent, Context>;

    getServerChannels?: GetServerChannelsResolver<
      Maybe<(Maybe<Channel>)[]>,
      TypeParent,
      Context
    >;

    getSentInvitations?: GetSentInvitationsResolver<
      Maybe<(Maybe<Invitation>)[]>,
      TypeParent,
      Context
    >;

    getReceivedInvitations?: GetReceivedInvitationsResolver<
      Maybe<(Maybe<Invitation>)[]>,
      TypeParent,
      Context
    >;

    getMessages?: GetMessagesResolver<
      Maybe<(Maybe<Message>)[]>,
      TypeParent,
      Context
    >;

    getUserMessages?: GetUserMessagesResolver<
      Maybe<(Maybe<Message>)[]>,
      TypeParent,
      Context
    >;
  }

  export type UsersResolver<
    R = Maybe<User[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type OnlineUsersResolver<
    R = Maybe<(Maybe<User>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, OnlineUsersArgs>;
  export interface OnlineUsersArgs {
    serverId: string;
  }

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
  export type UsersByNameResolver<
    R = Maybe<(Maybe<User>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, UsersByNameArgs>;
  export interface UsersByNameArgs {
    name: string;
  }

  export type ServerResolver<
    R = Maybe<Server>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, ServerArgs>;
  export interface ServerArgs {
    serverId: string;
  }

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

  export type ChannelResolver<
    R = Maybe<Channel>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, ChannelArgs>;
  export interface ChannelArgs {
    channelId: string;
  }

  export type GetServerChannelsResolver<
    R = Maybe<(Maybe<Channel>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetServerChannelsArgs>;
  export interface GetServerChannelsArgs {
    serverId: string;
  }

  export type GetSentInvitationsResolver<
    R = Maybe<(Maybe<Invitation>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetSentInvitationsArgs>;
  export interface GetSentInvitationsArgs {
    userId: string;
  }

  export type GetReceivedInvitationsResolver<
    R = Maybe<(Maybe<Invitation>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetReceivedInvitationsArgs>;
  export interface GetReceivedInvitationsArgs {
    userId: string;
  }

  export type GetMessagesResolver<
    R = Maybe<(Maybe<Message>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetMessagesArgs>;
  export interface GetMessagesArgs {
    channelId: string;

    cursor?: Maybe<string>;
  }

  export type GetUserMessagesResolver<
    R = Maybe<(Maybe<Message>)[]>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetUserMessagesArgs>;
  export interface GetUserMessagesArgs {
    userId: string;
  }
}

export namespace UserResolvers {
  export interface Resolvers<Context = {}, TypeParent = User> {
    id?: IdResolver<Maybe<string>, TypeParent, Context>;

    email?: EmailResolver<Maybe<string>, TypeParent, Context>;

    password?: PasswordResolver<Maybe<string>, TypeParent, Context>;

    name?: NameResolver<Maybe<string>, TypeParent, Context>;

    avatar?: AvatarResolver<Maybe<string>, TypeParent, Context>;

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
  export type NameResolver<
    R = Maybe<string>,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type AvatarResolver<
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

    channels?: ChannelsResolver<Maybe<(Maybe<Channel>)[]>, TypeParent, Context>;
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
  export type ChannelsResolver<
    R = Maybe<(Maybe<Channel>)[]>,
    Parent = Server,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace ChannelResolvers {
  export interface Resolvers<Context = {}, TypeParent = Channel> {
    id?: IdResolver<Maybe<string>, TypeParent, Context>;

    name?: NameResolver<Maybe<string>, TypeParent, Context>;

    type?: TypeResolver<Maybe<string>, TypeParent, Context>;

    server?: ServerResolver<Maybe<Server>, TypeParent, Context>;
  }

  export type IdResolver<
    R = Maybe<string>,
    Parent = Channel,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = Maybe<string>,
    Parent = Channel,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type TypeResolver<
    R = Maybe<string>,
    Parent = Channel,
    Context = {}
  > = Resolver<R, Parent, Context, TypeArgs>;
  export interface TypeArgs {
    channelType?: Maybe<ChannelType>;
  }

  export type ServerResolver<
    R = Maybe<Server>,
    Parent = Channel,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace InvitationResolvers {
  export interface Resolvers<Context = {}, TypeParent = Invitation> {
    id?: IdResolver<Maybe<string>, TypeParent, Context>;

    server?: ServerResolver<Maybe<Server>, TypeParent, Context>;

    createdAt?: CreatedAtResolver<Maybe<Date>, TypeParent, Context>;

    sender?: SenderResolver<Maybe<User>, TypeParent, Context>;

    receiver?: ReceiverResolver<Maybe<User>, TypeParent, Context>;
  }

  export type IdResolver<
    R = Maybe<string>,
    Parent = Invitation,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ServerResolver<
    R = Maybe<Server>,
    Parent = Invitation,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type CreatedAtResolver<
    R = Maybe<Date>,
    Parent = Invitation,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type SenderResolver<
    R = Maybe<User>,
    Parent = Invitation,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ReceiverResolver<
    R = Maybe<User>,
    Parent = Invitation,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace MessageResolvers {
  export interface Resolvers<Context = {}, TypeParent = Message> {
    id?: IdResolver<Maybe<string>, TypeParent, Context>;

    createdAt?: CreatedAtResolver<Maybe<Date>, TypeParent, Context>;

    message?: MessageResolver<Maybe<string>, TypeParent, Context>;

    sender?: SenderResolver<Maybe<User>, TypeParent, Context>;

    channel?: ChannelResolver<Maybe<Channel>, TypeParent, Context>;
  }

  export type IdResolver<
    R = Maybe<string>,
    Parent = Message,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type CreatedAtResolver<
    R = Maybe<Date>,
    Parent = Message,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type MessageResolver<
    R = Maybe<string>,
    Parent = Message,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type SenderResolver<
    R = Maybe<User>,
    Parent = Message,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ChannelResolver<
    R = Maybe<Channel>,
    Parent = Message,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    editName?: EditNameResolver<User, TypeParent, Context>;

    editUser?: EditUserResolver<Maybe<User>, TypeParent, Context>;

    logOut?: LogOutResolver<Maybe<User>, TypeParent, Context>;

    deleteUser?: DeleteUserResolver<Maybe<User>, TypeParent, Context>;

    createServer?: CreateServerResolver<Maybe<Server>, TypeParent, Context>;

    deleteServer?: DeleteServerResolver<Maybe<Server>, TypeParent, Context>;

    editServer?: EditServerResolver<Maybe<Server>, TypeParent, Context>;

    joinServer?: JoinServerResolver<Maybe<Server>, TypeParent, Context>;

    removeUserFromServer?: RemoveUserFromServerResolver<
      Maybe<Server>,
      TypeParent,
      Context
    >;

    acceptServerInvitation?: AcceptServerInvitationResolver<
      Maybe<Server>,
      TypeParent,
      Context
    >;

    createChannel?: CreateChannelResolver<Maybe<Channel>, TypeParent, Context>;

    changeChannel?: ChangeChannelResolver<Maybe<Channel>, TypeParent, Context>;

    deleteChannel?: DeleteChannelResolver<Maybe<Channel>, TypeParent, Context>;

    sendInvitation?: SendInvitationResolver<
      Maybe<Invitation>,
      TypeParent,
      Context
    >;

    deleteInvitation?: DeleteInvitationResolver<
      Maybe<Invitation>,
      TypeParent,
      Context
    >;

    postMessage?: PostMessageResolver<Maybe<Message>, TypeParent, Context>;

    editMessage?: EditMessageResolver<Maybe<Message>, TypeParent, Context>;

    deleteMessage?: DeleteMessageResolver<Maybe<Message>, TypeParent, Context>;
  }

  export type EditNameResolver<R = User, Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context,
    EditNameArgs
  >;
  export interface EditNameArgs {
    userId: string;

    name: string;
  }

  export type EditUserResolver<
    R = Maybe<User>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, EditUserArgs>;
  export interface EditUserArgs {
    userId: string;

    name?: Maybe<string>;

    email?: Maybe<string>;

    currentPassword?: Maybe<string>;

    newPassword?: Maybe<string>;

    avatar?: Maybe<Upload>;
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
  > = Resolver<R, Parent, Context, DeleteServerArgs>;
  export interface DeleteServerArgs {
    serverId: string;
  }

  export type EditServerResolver<
    R = Maybe<Server>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type JoinServerResolver<
    R = Maybe<Server>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, JoinServerArgs>;
  export interface JoinServerArgs {
    serverId: string;

    userId: string;
  }

  export type RemoveUserFromServerResolver<
    R = Maybe<Server>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, RemoveUserFromServerArgs>;
  export interface RemoveUserFromServerArgs {
    serverId: string;

    userId: string;
  }

  export type AcceptServerInvitationResolver<
    R = Maybe<Server>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, AcceptServerInvitationArgs>;
  export interface AcceptServerInvitationArgs {
    invitationId: string;
  }

  export type CreateChannelResolver<
    R = Maybe<Channel>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, CreateChannelArgs>;
  export interface CreateChannelArgs {
    type: string;

    name: string;

    serverId: string;
  }

  export type ChangeChannelResolver<
    R = Maybe<Channel>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, ChangeChannelArgs>;
  export interface ChangeChannelArgs {
    channelId: string;

    name: string;
  }

  export type DeleteChannelResolver<
    R = Maybe<Channel>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, DeleteChannelArgs>;
  export interface DeleteChannelArgs {
    channelId: string;
  }

  export type SendInvitationResolver<
    R = Maybe<Invitation>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, SendInvitationArgs>;
  export interface SendInvitationArgs {
    senderId: string;

    receiverId: string;

    serverId: string;
  }

  export type DeleteInvitationResolver<
    R = Maybe<Invitation>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, DeleteInvitationArgs>;
  export interface DeleteInvitationArgs {
    invitationId: string;
  }

  export type PostMessageResolver<
    R = Maybe<Message>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, PostMessageArgs>;
  export interface PostMessageArgs {
    channelId: string;

    message: string;
  }

  export type EditMessageResolver<
    R = Maybe<Message>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, EditMessageArgs>;
  export interface EditMessageArgs {
    messageId: string;
  }

  export type DeleteMessageResolver<
    R = Maybe<Message>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, DeleteMessageArgs>;
  export interface DeleteMessageArgs {
    messageId: string;
  }
}

export namespace SubscriptionResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    userLoggedIn?: UserLoggedInResolver<Maybe<User>, TypeParent, Context>;

    userLoggedOut?: UserLoggedOutResolver<Maybe<User>, TypeParent, Context>;

    deletedServer?: DeletedServerResolver<Maybe<Server>, TypeParent, Context>;

    removedUser?: RemovedUserResolver<
      Maybe<UserAndServer>,
      TypeParent,
      Context
    >;

    userJoinedServer?: UserJoinedServerResolver<
      Maybe<UserAndServer>,
      TypeParent,
      Context
    >;

    deletedChannel?: DeletedChannelResolver<
      Maybe<Channel>,
      TypeParent,
      Context
    >;

    createdChannel?: CreatedChannelResolver<
      Maybe<Channel>,
      TypeParent,
      Context
    >;

    changedChannel?: ChangedChannelResolver<
      Maybe<Channel>,
      TypeParent,
      Context
    >;

    sentInvitation?: SentInvitationResolver<
      Maybe<Invitation>,
      TypeParent,
      Context
    >;

    postedMessage?: PostedMessageResolver<Maybe<Message>, TypeParent, Context>;

    deletedMessage?: DeletedMessageResolver<
      Maybe<Message>,
      TypeParent,
      Context
    >;

    changedMessage?: ChangedMessageResolver<
      Maybe<Message>,
      TypeParent,
      Context
    >;
  }

  export type UserLoggedInResolver<
    R = Maybe<User>,
    Parent = {},
    Context = {}
  > = SubscriptionResolver<R, Parent, Context>;
  export type UserLoggedOutResolver<
    R = Maybe<User>,
    Parent = {},
    Context = {}
  > = SubscriptionResolver<R, Parent, Context>;
  export type DeletedServerResolver<
    R = Maybe<Server>,
    Parent = {},
    Context = {}
  > = SubscriptionResolver<R, Parent, Context>;
  export type RemovedUserResolver<
    R = Maybe<UserAndServer>,
    Parent = {},
    Context = {}
  > = SubscriptionResolver<R, Parent, Context>;
  export type UserJoinedServerResolver<
    R = Maybe<UserAndServer>,
    Parent = {},
    Context = {}
  > = SubscriptionResolver<R, Parent, Context>;
  export type DeletedChannelResolver<
    R = Maybe<Channel>,
    Parent = {},
    Context = {}
  > = SubscriptionResolver<R, Parent, Context>;
  export type CreatedChannelResolver<
    R = Maybe<Channel>,
    Parent = {},
    Context = {}
  > = SubscriptionResolver<R, Parent, Context>;
  export type ChangedChannelResolver<
    R = Maybe<Channel>,
    Parent = {},
    Context = {}
  > = SubscriptionResolver<R, Parent, Context>;
  export type SentInvitationResolver<
    R = Maybe<Invitation>,
    Parent = {},
    Context = {}
  > = SubscriptionResolver<R, Parent, Context>;
  export type PostedMessageResolver<
    R = Maybe<Message>,
    Parent = {},
    Context = {}
  > = SubscriptionResolver<R, Parent, Context>;
  export type DeletedMessageResolver<
    R = Maybe<Message>,
    Parent = {},
    Context = {}
  > = SubscriptionResolver<R, Parent, Context>;
  export type ChangedMessageResolver<
    R = Maybe<Message>,
    Parent = {},
    Context = {}
  > = SubscriptionResolver<R, Parent, Context>;
}

export namespace UserAndServerResolvers {
  export interface Resolvers<Context = {}, TypeParent = UserAndServer> {
    server?: ServerResolver<Maybe<Server>, TypeParent, Context>;

    user?: UserResolver<Maybe<User>, TypeParent, Context>;
  }

  export type ServerResolver<
    R = Maybe<Server>,
    Parent = UserAndServer,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = Maybe<User>,
    Parent = UserAndServer,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace FileResolvers {
  export interface Resolvers<Context = {}, TypeParent = File> {
    filename?: FilenameResolver<Maybe<string>, TypeParent, Context>;

    mimetype?: MimetypeResolver<Maybe<string>, TypeParent, Context>;

    encoding?: EncodingResolver<Maybe<string>, TypeParent, Context>;
  }

  export type FilenameResolver<
    R = Maybe<string>,
    Parent = File,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type MimetypeResolver<
    R = Maybe<string>,
    Parent = File,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type EncodingResolver<
    R = Maybe<string>,
    Parent = File,
    Context = {}
  > = Resolver<R, Parent, Context>;
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

export interface DateScalarConfig extends GraphQLScalarTypeConfig<Date, any> {
  name: "Date";
}
export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<Upload, any> {
  name: "Upload";
}

export interface IResolvers<Context = {}> {
  Query?: QueryResolvers.Resolvers<Context>;
  User?: UserResolvers.Resolvers<Context>;
  Server?: ServerResolvers.Resolvers<Context>;
  Channel?: ChannelResolvers.Resolvers<Context>;
  Invitation?: InvitationResolvers.Resolvers<Context>;
  Message?: MessageResolvers.Resolvers<Context>;
  Mutation?: MutationResolvers.Resolvers<Context>;
  Subscription?: SubscriptionResolvers.Resolvers<Context>;
  UserAndServer?: UserAndServerResolvers.Resolvers<Context>;
  File?: FileResolvers.Resolvers<Context>;
  Date?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
