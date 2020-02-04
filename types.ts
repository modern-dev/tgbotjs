/*!
 * tgbotjs - Telegram Bot API for Node.js and browsers.
 * https://github.com/modern-dev/tgbotjs
 *
 * Copyright (c) 2020 Bohdan Shtepan
 * Licensed under the MIT license.
 */

// eslint-disable-next-line no-unused-vars
import { ReadStream } from 'fs';

export type APIResponse<T> = {
  ok: boolean;
  result: T;
  description: string;
}

export type ChatId = string | number;

/* eslint-disable no-unused-vars */
export enum ChatActions {
  Typing = 'typing',
  UploadPhoto = 'upload_photo',
  RecordVideo = 'record_video',
  UploadVideo = 'upload_video',
  RecordAudio = 'record_audio',
  UploadAudio = 'upload_audio',
  UploadDocument = 'upload_document',
  FindLocation = 'find_location',
  RecordVideoNote = 'record_video_note',
  UploadVideoNote = 'upload_video_note'
}
/* eslint-enable no-unused-vars */

export type Update = {
  updateId: number
  message: Message
  editedMessage: Message
  channelPost: Message
  editedChannelPost: Message
  inlineQuery: InlineQuery
  chosenInlineResult: ChosenInlineResult
  callbackQuery: CallbackQuery
  shippingQuery: ShippingQuery
  preCheckoutQuery: PreCheckoutQuery
  poll: Poll
  pollAnswer: PollAnswer
}

export type InlineQuery = {
  id: string
  from: User
  location: Location
  query: string
  offset: string
}

export type ChosenInlineResult = {
  resultId: string
  from: User
  location?: Location
  inlineMessageId?: string
  query: string
}

export type ShippingQuery = {
  id: string
  from: User
  invoicePayload: string
  shippingAddress: ShippingAddress
}

export type ShippingAddress = {
  countryCode: string
  state: string
  city: string
  streetLine1: string
  streetLine2: string
  postCode: string
}

export type OrderInfo = {
  name: string
  phoneNumber: string
  email: string
  shippingAddress: ShippingAddress
}

export type PreCheckoutQuery = {
  id: string
  from: User
  currency: string
  totalAmount: number
  invoicePayload: string
  shippingOptionId: string
  orderInfo: OrderInfo
}

export type WebhookInfo = {
  url: string
  hasCustomCertificate: boolean
  pendingUpdateCount: number
  lastErrorDate: number
  lastErrorMessage: string
  maxConnections: number
  allowedUpdates: Array<string>
}

export type User = {
  id: number;
  isBot: boolean;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  canJoinGroups?: boolean;
  canReadAllGroupMessages?: boolean;
  supportsInlineQueries?: boolean;
}

export type Chat = {
  id: number
  type: string
  title: string
  username: string
  firstName: string
  lastName: string
  photo: ChatPhoto
  description: string
  inviteLink: string
  pinnedMessage: Message
  permissions: ChatPermissions
  slowModeDelay: number
  stickerSetName: string
  canSetStickerSet: boolean
}

export type Message = {
  messageId: number
  from:	User
  date: number
  chat: Chat
  forwardFrom:	User
  forwardFromChat: Chat
  forwardFromMessageId: number
  forwardSignature: string
  forwardSenderName: string
  forwardDate: number
  replyToMessage:	Message
  editDate: number
  mediaGroupId: string
  authorSignature: string
  text: string
  entities: Array<MessageEntity>
  captionEntities:	Array<MessageEntity>
  audio: Audio
  document:	Document
  animation: Animation
  game: Game
  photo:	Array<PhotoSize>
  sticker: Sticker
  video: Video
  voice: Voice
  videoNote: VideoNote
  caption: string
  contact: Contact
  location: Location
  venue: Venue
  poll: Poll
  newChatMembers: Array<User>
  leftChatMember: User
  newChatTitle: string
  newChatPhoto: Array<PhotoSize>
  deleteChatPhoto: boolean
  groupChatCreated: boolean
  supergroupChatCreated: boolean
  channelChatCreated: boolean
  migrateToChatId: number
  migrateFromChatId: number
  pinnedMessage: Message
  invoice: Invoice
  successfulPayment: SuccessfulPayment
  connectedWebsite: string
  passportData: PassportData
  replyMarkup: InlineKeyboardMarkup
}

export type Game = {
  title: string
  description: string
  photo: Array<PhotoSize>
  text: string
  textEntities: Array<MessageEntity>
  animation: Animation
}

export type Invoice = {
  title: string
  description: string
  startParameter: string
  currency: string
  totalAmount: number
}

export type SuccessfulPayment = {
  currency: string
  totalAmount: number
  invoicePayload: string
  shippingOptionId: string
  orderInfo: OrderInfo
  telegramPaymentChargeId: string
  providerPaymentChargeId: string
}

export type Sticker = {
  fileId: string
  fileUniqueId: string
  width: number
  height: number
  isAnimated: boolean
  thumb: PhotoSize
  emoji: string
  setName: string
  maskPosition: MaskPosition
  fileSize: number
}

export type MaskPosition = {
  point: string
  xShift: number
  yShift: number
  scale: number
}

export type PassportData = {
  data: Array<EncryptedPassportElement>
  credentials: EncryptedCredentials
}

export type EncryptedPassportElement = {
  type: string
  data: string
  phoneNumber: string
  email: string
  files: Array<PassportFile>
  frontSide: PassportFile
  reverseSide: PassportFile
  selfie: PassportFile
  translation: Array<PassportFile>
  hash: String
}

export type PassportFile = {
  fileId: string
  fileUniqueId: string
  fileSize: number
  fileDate: number
}

export type EncryptedCredentials = {
  data: string
  hash: string
  secret: string
}

export type MessageEntity = {
  type: string
  offset: number
  length: number
  url: string
  user:	User
  language: string
}

export type PhotoSize = {
  fileId: string
  fileUniqueId: string
  width: number
  height: number
  fileSize: number
}

export type Audio = {
  fileId: string
  fileUniqueId: string
  duration: number
  performer: string
  title: string
  mimeType: string
  fileSize: number
  thumb:	PhotoSize
}

// @ts-ignore
export type Document = {
  fileId: string
  fileUniqueId: string
  thumb:	PhotoSize
  fileName: string
  mimeType: string
  fileSize: number
}

export type Video = {
  fileId: string
  fileUniqueId: string
  width: number
  height: number
  duration: number
  thumb:	PhotoSize
  mimeType: string
  fileSize: number
}

// @ts-ignore
export type Animation = {
  fileId: string
  fileUniqueId: string
  width: Number
  height: number
  duration: number
  thumb:	PhotoSize
  fileName: string
  mimeType: string
  fileSize: number
}

export type Voice = {
  fileId: string
  fileUniqueId: string
  duration: number
  mimeType: string
  fileSize: number
}

export type VideoNote = {
  fileId: string
  fileUniqueId: string
  length: number
  duration: number
  thumb:	PhotoSize
  fileSize: number
}

export type Contact = {
  phoneNumber: string
  firstName: string
  lastName: string
  userId: number
  vcard: string
}

// @ts-ignore
export type Location = {
  longitude: number
  latitude: number
}

export type Venue = {
  location: Location
  title: string
  address: string
  foursquareId: string
  foursquareType: string
}

export type PollOption = {
  text: string
  voterCount: number
}

export type PollAnswer = {
  pollId: string
  user:	User
  optionIds: Array<number>
}

export type Poll = {
  id: string
  question: string
  options:	Array<PollOption>
  totalVoterCount: number
  isClosed: boolean
  isAnonymous: boolean
  type: string
  allowsMultipleAnswers: boolean
  correctOptionId: number
}

export type UserProfilePhotos = {
  totalCount: number
  photos: Array<Array<PhotoSize>>
}

// @ts-ignore
export type File = {
  fileId: string
  fileUniqueId: string
  fileSize: number
  filePath: string
}

export type KeyboardButton = {
  keyboard: Array<Array<KeyboardButton>>
  resizeKeyboard: boolean
  oneTimeKeyboard: boolean
  selective: boolean
}

export type KeyboardButtonPollType = {
  type: string
}

export type ReplyKeyboardRemove = {
  removeKeyboard: boolean
  selective: boolean
}

export type ReplyKeyboardMarkup = {
  keyboard: Array<Array<KeyboardButton>>;
  resizeKeyboard?: boolean;
  oneTimeKeyboard?: boolean;
  selective?: boolean;
}

export type InlineKeyboardMarkup = {
  inlineKeyboard:	Array<Array<InlineKeyboardButton>>
}

export type InlineKeyboardButton = {
  text: string
  url: string
  loginUrl:	LoginUrl
  callbackData: string
  switchInlineQuery: string
  switchInlineQueryCurrentChat: string
  callbackGame:	CallbackGame
  pay: boolean
}

export type CallbackGame = {}

export type LoginUrl = {
  url: string
  forwardText: string
  botUsername: string
  requestWriteAccess: boolean
}

export type CallbackQuery = {
  id: string
  from: User
  message: Message
  inlineMessageId: string
  chatInstance: string
  data: string
  gameShortName: string
}

export type ForceReply = {
  forceReply: boolean
  selective: boolean
}

export type ChatPhoto = {
  smallFileId: string
  smallFileUniqueId: string
  bigFileId: string
  bigFileUniqueId: string
}

export type ChatMember = {
  user: User
  status: string
  customTitle: string
  untilDate: number
  canBeEdited: boolean
  canPostMessages: boolean
  canEditMessages: boolean
  canDeleteMessages: boolean
  canRestrictMembers: boolean
  canPromoteMembers: boolean
  canChangeInfo: boolean
  canInviteUsers: boolean
  canPinMessages: boolean
  isMember: boolean
  canSendMessages: boolean
  canSendMediaMessages: boolean
  canSendPolls: boolean
  canSendOtherMessages: boolean
  canAddWebPagePreviews: boolean
}

export type ChatPermissions = {
  canSendMessages: boolean
  canSendMediaMessages: boolean
  canSendPolls: boolean
  canSendOtherMessages: boolean
  canAddWebPagePreviews: boolean
  canChangeInfo: boolean
  canInviteUsers: boolean
  canPinMessages: boolean
}

export type ResponseParameters = {
  migrateToChatId: number
  retryAfter: number
}

export type InputFile = Blob | File | ReadStream | Buffer | string;

export type InputMedia = InputMediaPhoto | InputMediaVideo | InputMediaAnimation | InputMediaAudio | InputMediaDocument;

export type InputMediaPhoto = {
  type: string
  media: string
  caption: string
  parseMode: string
}

export type InputMediaVideo = {
  type: string
  media: string
  thumb:	InputFile | string
  caption: string
  parseMode: string
  width: number
  height: number
  duration: number
  supportsStreaming: boolean
}

export type InputMediaAnimation = {
  type: string
  media: string
  thumb:	InputFile | string
  caption: string
  parseMode: string
  width: number
  height: number
  duration: number
}

export type InputMediaAudio = {
  type: string
  media: string
  thumb:	InputFile | string
  caption: string
  parseMode: string
  width: number
  height: number
  duration: number
}

export type InputMediaDocument = {
  type: string;
  media: string;
  thumb: InputFile | string;
  caption: string;
  parseMode: string;
}
