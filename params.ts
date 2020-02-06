/*!
 * tgbotjs - Telegram Bot API for Node.js and browsers.
 * https://github.com/modern-dev/tgbotjs
 *
 * Copyright (c) 2020 Bohdan Shtepan
 * Licensed under the MIT license.
 */

/* eslint-disable no-unused-vars */
import {
  ChatId,
  ChatPermissions,
  ForceReply,
  InlineKeyboardMarkup,
  InlineQueryResult,
  InputFile,
  InputMedia,
  InputMediaPhoto,
  InputMediaVideo,
  MaskPosition,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
  ShippingOption,
  LabeledPrice
} from './types';
/* eslint-enable no-unused-vars */

export interface ITgBotParams {
  [key: string]: any;
}

export interface BaseSendParams extends ITgBotParams {
  chatId: ChatId;
  parseMode?: string;
  disableNotification?: boolean;
  replyToMessageId?: number;
  replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface SendMessageParams extends BaseSendParams {
  text: string;
  disableWebPagePreview?: boolean;
}

export interface SendPhotoParams extends BaseSendParams {
  photo: InputFile;
  caption?: string;
}

export interface SendAudioParams extends BaseSendParams {
  audio: InputFile;
  caption?: string;
  duration?: number;
  performer?: string;
  title?: string;
  thumb?: InputFile;
}

export interface SendDocumentParams extends BaseSendParams {
  document: InputFile;
  thumb?: InputFile;
  caption?: string;
}

export interface SendVideoParams extends BaseSendParams {
  video: InputFile;
  duration?: number;
  width?: number;
  height?: number;
  thumb?: InputFile;
  caption?: string;
  supportsStreaming?: boolean;
}

export interface SendAnimationParams extends BaseSendParams {
  animation: InputFile;
  duration?: number;
  width?: number;
  height?: number;
  thumb?: InputFile;
  caption?: string;
}

export interface SendVoiceParams extends BaseSendParams {
  voice: InputFile;
  caption?: string;
  duration?: number;
}

export interface SendVideoNoteParams extends BaseSendParams {
  video_note: InputFile;
  duration?: number;
  length?: number;
  thumb?: InputFile;
}

export interface SendMediaGroupParams {
  chatId: ChatId;
  media: Array<InputMediaPhoto | InputMediaVideo>;
  disableNotification?: boolean;
  replyToMessageId?: number;
}

export interface SendLocationParams extends BaseSendParams {
  latitude: number;
  longitude: number;
  livePeriod?: number;
}

export interface EditMessageLiveLocationParams {
  chatId?: ChatId;
  messageId?: number;
  inlineMessageId?: string
  latitude: number;
  longitude: number;
  replyMarkup?: InlineKeyboardMarkup;
}

export interface StopMessageLiveLocationParams {
  chatId?: ChatId;
  messageId?: string;
  inlineMessageId?: string
  replyMarkup?: InlineKeyboardMarkup;
}

export interface SendVenueParams extends BaseSendParams {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  foursquareId?: string;
  foursquareType?: string;
}

export interface SendContactParams extends BaseSendParams {
  phoneNumber: string;
  firstName: string;
  lastName?: string;
  vcard?: string;
}

export interface SendPollParams extends BaseSendParams {
  question: string;
  options: Array<string>;
  isAnonymous?: boolean;
  type?: string;
  allowsMultipleAnswers?: boolean;
  correctOptionId?: number;
  isClosed?: boolean;
}

export interface RestrictChatMemberParams {
  chatId: ChatId;
  userId: number;
  permissions: ChatPermissions;
  untilDate?: number;
}

export interface PromoteChatMemberParams {
  chatId: ChatId;
  userId: number;
  canChangeInfo?: boolean;
  canPostMessages?: boolean;
  canEditMessages?: boolean;
  canDeleteMessages?: boolean;
  canInviteUsers?: boolean;
  canRestrictMembers?: boolean;
  canPinMessages?: boolean;
  canPromoteMembers?: boolean;
}

export interface AnswerCallbackQueryParams {
  callbackQueryId: string;
  text?: string;
  showAlert?: boolean;
  url?: string;
  cacheTime?: number;
}

export interface EditMessageTextParams {
  chatId?: ChatId;
  messageId?: string;
  inlineMessageId?: string;
  text: string;
  parseMode?: string;
  disableWebPagePreview?: boolean;
  replyMarkup?: InlineKeyboardMarkup;
}

export interface EditMessageCaptionParams {
  chatId?: ChatId;
  messageId?: string;
  inlineMessageId?: string;
  caption?: string;
  parseMode?: string;
  replyMarkup?: InlineKeyboardMarkup;
}

export interface EditMessageMediaParams {
  chatId?: ChatId;
  messageId?: string;
  inlineMessageId?: string;
  media: InputMedia;
  replyMarkup?: InlineKeyboardMarkup;
}

export interface EditMessageReplyMarkupParams {
  chatId?: ChatId;
  messageId?: string;
  inlineMessageId?: string;
  replyMarkup?: InlineKeyboardMarkup;
}

export interface SendStickerParams {
  chatId: ChatId;
  sticker: InputFile | string;
  disableNotifications?: boolean;
  replyToMessageId?: number;
  replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface CreateNewStickerSetParams {
  userId: number;
  name: string;
  title: string;
  pngSticker: InputFile | string;
  emojis: string;
  containsMasks?: boolean;
  maskPosition?: MaskPosition
}

export interface AddStickerToSetParams {
  userId: number;
  name: string;
  pngSticker: InputFile | string;
  emojis: string;
  maskPosition?: MaskPosition
}

export interface AnswerInlineQueryParams {
  inlineQueryId: string;
  results: Array<InlineQueryResult>;
  cacheTime?: number;
  isPersonal?: boolean;
  nextOffset?: string;
  switchPmText?: string;
  switchPmParameter?: string;
}

export interface GetUpdatesParams {
  offset?: number;
  limit?: number;
  timeout?: number;
  allowedUpdates?: Array<string>;
}

export interface SetWebhookParams {
  utl: string;
  certificate?: InputFile;
  maxConnections?: number;
  allowedUpdates?: Array<string>;
}

export interface SendInvoiceParams {
  chatId: number;
  title: string;
  description: string;
  payload: string;
  providerToken: string;
  startParameter: string;
  currency: string;
  prices: Array<LabeledPrice>;
  providerData?: string;
  photoUrl?: string;
  photoSize?: number;
  photoWidth?: number;
  photoHeight?: number;
  needName?: boolean;
  needPhoneNumber?: boolean;
  needEmail?: boolean;
  needShippingAddress?: boolean;
  sendPhoneNumberToProvider?: boolean;
  sendEmailToProvider?: boolean;
  isFlexible?: boolean;
  disableNotification?: boolean;
  replyToMessageId?: number;
  replyMarkup: InlineKeyboardMarkup
}

export interface AnswerShippingQueryParams {
  shippingQueryId: string;
  ok: boolean;
  shippingOptions?: Array<ShippingOption>;
  errorMessage?: string;
}

export type PassportElementError = PassportElementErrorDataField | PassportElementErrorFrontSide |
  PassportElementErrorReverseSide | PassportElementErrorSelfie | PassportElementErrorFile |
  PassportElementErrorFiles | PassportElementErrorTranslationFile | PassportElementErrorTranslationFiles |
  PassportElementErrorUnspecified;

export type PassportElementErrorDataField = {
  source: string;
  type: string;
  fieldZName: string;
  dataHash: string;
  message: string;
}

export type PassportElementErrorFrontSide = {
  source: string;
  type: string;
  fileHash: string;
  message: string;
}

export type PassportElementErrorReverseSide = {
  source: string;
  type: string;
  fileHash: string;
  message: string;
}

export type PassportElementErrorSelfie = {
  source: string;
  type: string;
  fileHash: string;
  message: string;
}

export type PassportElementErrorFile = {
  source: string;
  type: string;
  fileHash: string;
  message: string;
}

export type PassportElementErrorFiles = {
  source: string;
  type: string;
  fileHashes: Array<string>;
  message: string;
}

export type PassportElementErrorTranslationFile = {
  source: string;
  type: string;
  fileHash: string;
  message: string;
}

export type PassportElementErrorTranslationFiles = {
  source: string;
  type: string;
  fileHashes: Array<String>;
  message: string;
}

export type PassportElementErrorUnspecified = {
  source: string;
  type: string;
  elementHash: string;
  message: string;
}
