export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]!\n  participants: [User]!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Query {\n  chat: Chat\n  message: Message\n  place: Place\n  ride: Ride\n  user: User\n  verification: Verification\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  isFavorite: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Ride {\n  id: Int!\n  status: String!\n  pickUpAddress: String!\n  pickUpLat: Float!\n  pickUpLng: Float!\n  dropOffAddress: String!\n  dropOffLat: Float!\n  dropOffLng: Float!\n  price: Float!\n  distance: String!\n  duration: String!\n  driver: User!\n  passenger: User!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(firstName: String!, lastName: String!, email: String!, password: String!, profilePhoto: String!, age: Int!, phoneNumber: String!): EmailSignUpResponse!\n  FacebookConnect(firstName: String!, lastName: String!, email: String, facebookId: String!): FacebookConnectResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype User {\n  id: Int!\n  email: String\n  verifiedEmail: Boolean!\n  facebookId: String\n  firstName: String!\n  lastName: String!\n  age: Int\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String\n  createdAt: String!\n  updatedAt: String\n  fullName: String\n  isDriving: Boolean!\n  isRiding: Boolean!\n  isTaken: Boolean!\n  chat: Chat\n  messages: [Message]\n  ridesAsPassenger: [Ride]\n  ridesAsDriver: [Ride]\n  lastLng: Float\n  lastLat: Float\n  lastOrientation: Float\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  chat: Chat | null;
  message: Message | null;
  place: Place | null;
  ride: Ride | null;
  user: User | null;
  verification: Verification | null;
}

export interface Chat {
  id: number;
  messages: Array<Message>;
  participants: Array<User>;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  chat: Chat;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  email: string | null;
  verifiedEmail: boolean;
  facebookId: string | null;
  firstName: string;
  lastName: string;
  age: number | null;
  password: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
  profilePhoto: string | null;
  createdAt: string;
  updatedAt: string | null;
  fullName: string | null;
  isDriving: boolean;
  isRiding: boolean;
  isTaken: boolean;
  chat: Chat | null;
  messages: Array<Message> | null;
  ridesAsPassenger: Array<Ride> | null;
  ridesAsDriver: Array<Ride> | null;
  lastLng: number | null;
  lastLat: number | null;
  lastOrientation: number | null;
}

export interface Ride {
  id: number;
  status: string;
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  duration: string;
  driver: User;
  passenger: User;
  createdAt: string;
  updatedAt: string;
}

export interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface Mutation {
  CompletePhoneVerification: CompletePhoneVerificationResponse | null;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  FacebookConnect: FacebookConnectResponse;
  StartPhoneVerification: StartPhoneVerificationResponse | null;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePhoto: string;
  age: number;
  phoneNumber: string;
}

export interface FacebookConnectMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  facebookId: string;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface FacebookConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface StartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}
