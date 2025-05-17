export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Avatar = {
  __typename?: 'Avatar';
  fileSize?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export enum CurrencyType {
  Eur = 'EUR',
  Usd = 'USD'
}

export type Follow = {
  __typename?: 'Follow';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  userId: Scalars['Int'];
  userName?: Maybe<Scalars['String']>;
};

export type FollowPaginationModel = {
  __typename?: 'FollowPaginationModel';
  items: Array<Follow>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  pagesCount: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type ImagePost = {
  __typename?: 'ImagePost';
  createdAt?: Maybe<Scalars['DateTime']>;
  fileSize?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type LoginAdmin = {
  __typename?: 'LoginAdmin';
  logged: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  banUser: Scalars['Boolean'];
  loginAdmin: LoginAdmin;
  removeUser: Scalars['Boolean'];
  unbanUser: Scalars['Boolean'];
};


export type MutationBanUserArgs = {
  banReason: Scalars['String'];
  userId: Scalars['Int'];
};


export type MutationLoginAdminArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveUserArgs = {
  userId: Scalars['Int'];
};


export type MutationUnbanUserArgs = {
  userId: Scalars['Int'];
};

export type PaginationModel = {
  __typename?: 'PaginationModel';
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  pagesCount: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Payment = {
  __typename?: 'Payment';
  amount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<CurrencyType>;
  endDate?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  paymentMethod?: Maybe<PaymentMethod>;
  type?: Maybe<SubscriptionType>;
  userId?: Maybe<Scalars['Int']>;
};

export enum PaymentMethod {
  CreditCard = 'CREDIT_CARD',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE'
}

export type PaymentPaginationModel = {
  __typename?: 'PaymentPaginationModel';
  items: Array<SubscriptionByPaymentModel>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  pagesCount: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type PaymentsPaginationModel = {
  __typename?: 'PaymentsPaginationModel';
  items: Array<SubscriptionPaymentsModel>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  pagesCount: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Int'];
  images?: Maybe<Array<ImagePost>>;
  ownerId: Scalars['Int'];
  postOwner: PostOwnerModel;
  updatedAt: Scalars['DateTime'];
  userBan?: Maybe<UserBan>;
};

export type PostOwnerModel = {
  __typename?: 'PostOwnerModel';
  avatars?: Maybe<Array<Avatar>>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastName?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
};

export type PostsByUserModel = {
  __typename?: 'PostsByUserModel';
  items?: Maybe<Array<ImagePost>>;
  pageSize: Scalars['Int'];
  pagesCount: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type PostsPaginationModel = {
  __typename?: 'PostsPaginationModel';
  items: Array<Post>;
  pageSize: Scalars['Int'];
  pagesCount: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Profile = {
  __typename?: 'Profile';
  aboutMe?: Maybe<Scalars['String']>;
  avatars?: Maybe<Array<Avatar>>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastName?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getFollowers: FollowPaginationModel;
  getFollowing: FollowPaginationModel;
  getPayments: PaymentsPaginationModel;
  getPaymentsByUser: PaymentPaginationModel;
  getPosts: PostsPaginationModel;
  getPostsByUser: PostsByUserModel;
  getUser: User;
  getUsers: UsersPaginationModel;
};


export type QueryGetFollowersArgs = {
  pageNumber?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sortDirection?: InputMaybe<SortDirection>;
  userId: Scalars['Int'];
};


export type QueryGetFollowingArgs = {
  pageNumber?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sortDirection?: InputMaybe<SortDirection>;
  userId: Scalars['Int'];
};


export type QueryGetPaymentsArgs = {
  pageNumber?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sortDirection?: InputMaybe<SortDirection>;
};


export type QueryGetPaymentsByUserArgs = {
  pageNumber?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sortDirection?: InputMaybe<SortDirection>;
  userId: Scalars['Int'];
};


export type QueryGetPostsArgs = {
  endCursorPostId?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sortDirection?: InputMaybe<SortDirection>;
};


export type QueryGetPostsByUserArgs = {
  endCursorId?: InputMaybe<Scalars['Int']>;
  userId: Scalars['Int'];
};


export type QueryGetUserArgs = {
  userId: Scalars['Int'];
};


export type QueryGetUsersArgs = {
  pageNumber?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sortDirection?: InputMaybe<SortDirection>;
  statusFilter?: InputMaybe<UserBlockStatus>;
};

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum StatusSubscriptionType {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Finished = 'FINISHED',
  Pending = 'PENDING'
}

export type Subscription = {
  __typename?: 'Subscription';
  postAdded: Post;
};

export type SubscriptionByPaymentModel = {
  __typename?: 'SubscriptionByPaymentModel';
  businessAccountId: Scalars['Int'];
  dateOfPayment?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  paymentType?: Maybe<PaymentMethod>;
  payments: Array<Payment>;
  price: Scalars['Int'];
  startDate?: Maybe<Scalars['DateTime']>;
  status: StatusSubscriptionType;
  type: SubscriptionType;
};

export type SubscriptionPaymentsModel = {
  __typename?: 'SubscriptionPaymentsModel';
  amount?: Maybe<Scalars['Int']>;
  avatars?: Maybe<Array<Avatar>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<CurrencyType>;
  endDate?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  paymentMethod: PaymentMethod;
  type: SubscriptionType;
  userId?: Maybe<Scalars['Int']>;
  userName: Scalars['String'];
};

export enum SubscriptionType {
  Day = 'DAY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  profile: Profile;
  userBan?: Maybe<UserBan>;
  userName: Scalars['String'];
};

export type UserBan = {
  __typename?: 'UserBan';
  createdAt: Scalars['DateTime'];
  reason: Scalars['String'];
};

export enum UserBlockStatus {
  All = 'ALL',
  Blocked = 'BLOCKED',
  Unblocked = 'UNBLOCKED'
}

export type UsersPaginationModel = {
  __typename?: 'UsersPaginationModel';
  pagination: PaginationModel;
  users: Array<User>;
};
