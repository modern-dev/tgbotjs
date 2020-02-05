/*!
 * tgbotjs - Telegram Bot API for Node.js and browsers.
 * https://github.com/modern-dev/tgbotjs
 *
 * Copyright (c) 2020 Bohdan Shtepan
 * Licensed under the MIT license.
 */

import wretch from 'wretch';
import { isObject, camelCased, snakeCased } from './utils';
/* eslint-disable no-unused-vars */
import {
  APIResponse,
  ChatId,
  User,
  Message,
  Chat,
  ChatMember,
  InputFile,
  ChatPermissions,
  File,
  UserProfilePhotos,
  ChatActions, InlineKeyboardMarkup, Poll
} from './types';

import {
  SendPhotoParams,
  SendMessageParams,
  ITgBotParams,
  AnswerCallbackQueryParams,
  PromoteChatMemberParams,
  RestrictChatMemberParams,
  SendAudioParams,
  SendDocumentParams,
  SendVideoNoteParams,
  SendVideoParams,
  SendAnimationParams,
  SendVoiceParams,
  SendMediaGroupParams,
  SendLocationParams,
  SendVenueParams,
  SendContactParams,
  SendPollParams,
  EditMessageLiveLocationParams,
  StopMessageLiveLocationParams,
  EditMessageTextParams,
  EditMessageCaptionParams,
  EditMessageMediaParams,
  EditMessageReplyMarkupParams
} from './params';
/* eslint-enable no-unused-vars */

class Bot {
  private readonly token: string;
  private readonly apiUrlBase = 'https://api.telegram.org/bot';

  constructor(token: string) {
    if (!token) {
      throw new Error('token is null or empty.');
    }

    this.token = token;
  }

  /**
   * A simple method for testing your bot's auth token. Requires no parameters.
   *
   * @returns Returns basic information about the bot in form of a User object.
   */
  getMe = (): Promise<User> =>
    this.rawRequest<User>('getMe');

  /**
   * Use this method to send text messages.
   *
   * @param params - Object containing method parameters.
   * @returns On success, the sent Message is returned.
   */
  sendMessage = (params: SendMessageParams): Promise<Message> =>
    this.rawRequest<Message>('sendMessage', params);

  /**
   * Use this method to send photos.
   *
   * @param params - Object containing method parameters.
   * @returns On success, the sent Message is returned.
   */
  sendPhoto = (params: SendPhotoParams): Promise<Message> =>
    this.rawFileRequest('sendPhoto', params);

  /**
   * Use this method to send audio files, if you want Telegram clients to display them in the music player.
   * Your audio must be in the .MP3 or .M4A format.
   *
   * @param params - Object containing method parameters.
   * @returns On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size,
   * this limit may be changed in the future.
   */
  sendAudio = (params: SendAudioParams): Promise<Message> =>
    this.rawFileRequest('sendAudio', params);

  /**
   * Use this method to send general files.
   *
   * @param params - Object containing method parameters.
   * @returns On success, the sent Message is returned. Bots can currently send files of any type
   * of up to 50 MB in size, this limit may be changed in the future.
   */
  sendDocument = (params: SendDocumentParams): Promise<Message> =>
    this.rawFileRequest('sendDocument', params);

  /**
   * Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as Document).
   *
   * @param params - Object containing method parameters.
   * @returns On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size,
   * this limit may be changed in the future.
   */
  sendVideo = (params: SendVideoParams): Promise<Message> =>
    this.rawFileRequest('sendVideo', params);

  /**
   * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound).
   *
   * @param params - Object containing method parameters.
   * @returns On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size,
   * this limit may be changed in the future.
   */
  sendAnimation = (params: SendAnimationParams): Promise<Message> =>
    this.rawFileRequest('sendAnimation', params);

  /**
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message.
   * For this to work, your audio must be in an .ogg file encoded with OPUS (other formats may be sent as Audio
   * or Document).
   *
   * @param params - Object containing method parameters.
   * @returns On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size,
   * this limit may be changed in the future.
   */
  sendVoice = (params: SendVoiceParams): Promise<Message> =>
    this.rawFileRequest('sendVoice', params);

  /**
   * As of v.4.0, Telegram clients support rounded square mp4 videos of up to 1 minute long.
   * Use this method to send video messages.
   *
   * @param params - Object containing method parameters.
   * @returns On success, the sent Message is returned.
   */
  sendVideoNote = (params: SendVideoNoteParams): Promise<Message> =>
    this.rawFileRequest('sendVideoNote', params);

  /**
   * Use this method to send a group of photos or videos as an album.
   *
   * @param params - Object containing method parameters.
   * @returns On success, an array of the sent Messages is returned.
   */
  sendMediaGroup = (params: SendMediaGroupParams): Promise<Message> =>
    this.rawFileRequest('sendMediaGroup', params);

  /**
   * Use this method to send point on the map.
   *
   * @param params - Object containing method parameters.
   * @returns On success, the sent Message is returned.
   */
  sendLocation = (params: SendLocationParams): Promise<Message> =>
    this.rawFileRequest('sendLocation', params);

  /**
   * Use this method to edit live location messages. A location can be edited until its livePeriod expires
   * or editing is explicitly disabled by a call to stopMessageLiveLocation.
   *
   * @param params - Object containing method parameters.
   * @returns On success, if the edited message was sent by the bot, the edited Message is returned,
   * otherwise True is returned.
   */
  editMessageLiveLocation = (params: EditMessageLiveLocationParams): Promise<Message | boolean> =>
    this.rawFileRequest('editMessageLiveLocation', params);

  /**
   * Use this method to stop updating a live location message before live_period expires.
   *
   * @param params - Object containing method parameters.
   * @returns On success, if the message was sent by the bot, the sent Message is returned, otherwise True is returned.
   */
  stopMessageLiveLocation = (params: StopMessageLiveLocationParams): Promise<Message | boolean> =>
    this.rawFileRequest('stopMessageLiveLocation', params);

  /**
   * Use this method to send information about a venue.
   *
   * @param params - Object containing method parameters.
   * @returns On success, the sent Message is returned.
   */
  sendVenue = (params: SendVenueParams): Promise<Message> =>
    this.rawFileRequest('sendVenue', params);

  /**
   * Use this method to send phone contacts.Use this method to send phone contacts.
   *
   * @param params - Object containing method parameters.
   * @returns On success, the sent Message is returned.
   */
  sendContact = (params: SendContactParams): Promise<Message> =>
    this.rawFileRequest('sendContact', params);

  /**
   * Use this method to send a native poll.
   *
   * @param params - Object containing method parameters.
   * @returns On success, the sent Message is returned.
   */
  sendPoll = (params: SendPollParams): Promise<Message> =>
    this.rawFileRequest('sendPoll', params);

  /**
   * Use this method when you need to tell the user that something is happening on the bot's side.
   * The status is set for 5 seconds or less (when a message arrives from your bot,
   * Telegram clients clear its typing status).
   *
   * @param chatId - Unique identifier for the target chat or username of the target channel
   * (in the format @channelusername)
   * @param action - Type of action to broadcast. Choose one, depending on what the user is about to receive.
   * @returns Returns True on success.
   */
  sendChatAction = (chatId: ChatId, action: ChatActions): Promise<boolean> =>
    this.rawRequest('sendChatAction', { chatId, action });

  /**
   * Use this method to get a list of profile pictures for a user.
   *
   * @param userId - Unique identifier of the target user.
   * @param offset - Sequential number of the first photo to be returned. By default, all photos are returned.
   * @param limit - Limits the number of photos to be retrieved. Values between 1—100 are accepted. Defaults to 100.
   * @returns Returns a UserProfilePhotos object.
   */
  getUserProfilePhotos = (userId: number, offset: number, limit: number = 100): Promise<UserProfilePhotos> =>
    this.rawRequest('getUserProfilePhotos', { userId, offset, limit });

  /**
   * Use this method to get basic info about a file and prepare it for downloading. For the moment,
   * bots can download files of up to 20MB in size.
   *
   * @param fileId - File identifier to get info about.
   * @returns On success, a File object is returned. The file can then be downloaded via
   * the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response.
   * It is guaranteed that the link will be valid for at least 1 hour. When the link expires,
   * a new one can be requested by calling getFile again.
   */
  getFile = (fileId: string): Promise<File> =>
    this.rawRequest('getFile', { fileId });

  /**
   * Use this method to kick a user from a group, a supergroup or a channel. In the case of supergroups and channels,
   * the user will not be able to return to the group on their own using invite links, etc., unless unbanned first.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   *
   * @param chatId - Unique identifier for the target group or username of the target supergroup or channel
   * (in the format @channelusername).
   * @param userId - Unique identifier of the target user.
   * @param untilDate - Date when the user will be unbanned, unix time. If user is banned for more than 366 days
   * or less than 30 seconds from the current time they are considered to be banned forever
   * @returns Returns True on success.
   */
  kickChatMember = (chatId: ChatId, userId: number, untilDate: number): Promise<boolean> =>
    this.rawRequest('kickChatMember', { chatId, userId, untilDate });

  /**
   * Use this method to unban a previously kicked user in a supergroup or channel.
   * The user will not return to the group or channel automatically, but will be able to join via link, etc.
   * The bot must be an administrator for this to work.
   *
   * @param chatId - Unique identifier for the target group or username of the target supergroup or channel
   * (in the format @username).
   * @param userId - Unique identifier of the target user.
   * @returns Returns True on success.
   */
  unbanChatMember = (chatId: ChatId, userId: number): Promise<boolean> =>
    this.rawRequest('unbanChatMember', { chatId, userId });

  /**
   * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this
   * to work and must have the appropriate admin rights. Pass True for all permissions to lift restrictions
   * from a user.
   *
   * @param params - Object containing method parameters.
   * @returns Returns True on success.
   */
  restrictChatMember = (params: RestrictChatMemberParams): Promise<boolean> =>
    this.rawRequest('restrictChatMember', params);

  /**
   * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator
   * in the chat for this to work and must have the appropriate admin rights. Pass False for all boolean parameters
   * to demote a user.
   *
   * @param params - Object containing method parameters.
   * @returns Returns True on success.
   */
  promoteChatMember = (params: PromoteChatMemberParams): Promise<boolean> =>
    this.rawRequest('promoteChatMember', params);

  /**
   * Use this method to set a custom title for an administrator in a supergroup promoted by the bot.
   *
   * @param chatId - Unique identifier for the target chat or username of the target supergroup
   * (in the format @supergroupusername).
   * @param userId - Unique identifier of the target user.
   * @param customTitle - New custom title for the administrator; 0-16 characters, emoji are not allowed.
   * @returns Returns True on success.
   */
  setChatAdministratorCustomTitle = (chatId: ChatId, userId: number, customTitle: string): Promise<boolean> =>
    this.rawRequest('setChatAdministratorCustomTitle', { chatId, userId, customTitle });

  /**
   * Use this method to set default chat permissions for all members. The bot must be an administrator
   * in the group or a supergroup for this to work and must have the can_restrict_members admin rights.
   *
   * @param chatId - Unique identifier for the target chat or username of the target supergroup
   * (in the format @supergroupusername).
   * @param permissions - New default chat permissions.
   * @returns Returns True on success.
   */
  setChatPermissions = (chatId: ChatId, permissions: ChatPermissions): Promise<boolean> =>
    this.rawRequest('setChatPermissions', { chatId, permissions });

  /**
   * Use this method to generate a new invite link for a chat; any previously generated link is revoked.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   *
   * @param chatId - Unique identifier for the target chat or username of the target channel
   * (in the format @channelusername).
   * @returns Returns the new invite link as String on success.
   */
  exportChatInviteLink = (chatId: ChatId): Promise<string> =>
    this.rawRequest('exportChatInviteLink', { chatId });

  /**
   * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   *
   * @param chatId - Unique identifier for the target chat or username of the target channel
   * (in the format @channelusername).
   * @param photo - New chat photo, uploaded using multipart/form-data.
   * @returns Returns True on success.
   */
  setChatPhoto = (chatId: ChatId, photo: InputFile): Promise<boolean> =>
    this.rawFileRequest('setChatPhoto', { chatId, photo });

  /**
   * Use this method to delete a chat photo. Photos can't be changed for private chats.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   *
   * @param chatId - Unique identifier for the target chat or username of the target channel
   * (in the format @channelusername)
   * @returns Returns True on success.
   */
  deleteChatPhoto = (chatId: ChatId): Promise<boolean> =>
    this.rawRequest('deleteChatPhoto', { chatId });

  /**
   * Use this method to change the title of a chat. Titles can't be changed for private chats.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   *
   * @param chatId - Unique identifier for the target chat or username of the target channel
   * (in the format @channelusername)
   * @param title
   * @returns Returns True on success.
   */
  setChatTitle = (chatId: ChatId, title: string): Promise<boolean> =>
    this.rawRequest('setChatTitle', { chatId, title });

  /**
   * Use this method to change the description of a group, a supergroup or a channel.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   *
   * @param chatId - Unique identifier for the target chat or username of the target channel
   * (in the format @channelusername)
   * @param description
   * @returns Returns True on success.
   */
  setChatDescription = (chatId: ChatId, description: string): Promise<boolean> =>
    this.rawRequest('setChatDescription', { chatId, description });

  /**
   * Use this method to pin a message in a group, a supergroup, or a channel.
   * The bot must be an administrator in the chat for this to work and must have the ‘canPinMessages’ admin right
   * in the supergroup or ‘canEditMessages’ admin right in the channel.
   *
   * @param chatId - Unique identifier for the target chat or username of the target channel
   * (in the format @channelusername)
   * @param messageId
   * @param disableNotification
   * @returns Returns True on success.
   */
  pinChatMessage = (chatId: ChatId, messageId: number, disableNotification?: boolean): Promise<boolean> =>
    this.rawRequest('pinChatMessage', { chatId, messageId, disableNotification });

  /**
   * Use this method to unpin a message in a group, a supergroup, or a channel.
   * The bot must be an administrator in the chat for this to work and must have the ‘canPinMessages’ admin right
   * in the supergroup or ‘canEditMessages’ admin right in the channel.
   *
   * @param chatId - Unique identifier for the target chat or username of the target channel
   * (in the format @channelusername)
   * @returns Returns True on success.
   */
  unpinChatMessage = (chatId: ChatId): Promise<boolean> =>
    this.rawRequest('unpinChatMessage', { chatId });

  /**
   * Use this method for your bot to leave a group, supergroup or channel.
   *
   * @param chatId - Unique identifier for the target chat or username of the target channel
   * (in the format @channelusername)
   * @returns Returns True on success.
   */
  leaveChat = (chatId: ChatId): Promise<boolean> =>
    this.rawRequest('leaveChat', { chatId });

  /**
   * Use this method to get up to date information about the chat (current name of the user
   * for one-on-one conversations, current username of a user, group or channel, etc.).
   *
   * @param chatId - Unique identifier for the target chat or username of the target supergroup
   * or channel (in the format @channelusername).
   * @returns Returns a {Chat} object on success.
   */
  getChat = (chatId: ChatId): Promise<Chat> =>
    this.rawRequest<Chat>('getChat', { chatId });

  /**
   * Use this method to get a list of administrators in a chat.
   *
   * @param chatId - Unique identifier for the target chat or username of the target supergroup
   * or channel (in the format @channelusername)
   * @returns Returns {Array<ChatMember>} objects that contains information about all chat administrators except other bots.
   * If the chat is a group or a supergroup and no administrators were appointed, only the creator will be returned.
   */
  getChatAdministrators = (chatId: ChatId): Promise<Array<ChatMember>> =>
    this.rawRequest('getChatAdministrators', { chatId });

  /**
   * Use this method to get the number of members in a chat.
   *
   * @param chatId - Unique identifier for the target chat or username of the target supergroup
   * or channel (in the format @channelusername)
   * @returns Returns number of chat members.
   */
  getChatMembersCount = (chatId: ChatId): Promise<number> =>
    this.rawRequest('getChatMembersCount', { chatId });

  /**
   * Use this method to get information about a member of a chat.
   *
   * @param chatId - Unique identifier for the target chat or username of the target supergroup
   * or channel (in the format @channelusername)
   * @param userId - Unique identifier of the target user.
   * @returns Returns a {ChatMember} object on success.
   */
  getChatMember = (chatId: ChatId, userId: number): Promise<ChatMember> =>
    this.rawRequest('getChatMember', { chatId, userId });

  /**
   * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat
   * for this to work and must have the appropriate admin rights. Use the field canSetStickerSet optionally returned
   * in getChat requests to check if the bot can use this method.
   *
   * @param chatId - Unique identifier for the target chat or username of the target supergroup
   * (in the format @supergroupusername).
   * @param stickerSetName - Name of the sticker set to be set as the group sticker set.
   * @returns Returns true on success.
   */
  setChatStickerSet = (chatId: ChatId, stickerSetName: string): Promise<boolean> =>
    this.rawRequest('setChatStickerSet', { chatId, stickerSetName });

  /**
   * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat
   * for this to work and must have the appropriate admin rights. Use the field canSetStickerSet optionally returned
   * in getChat requests to check if the bot can use this method.
   *
   * @param chatId - Unique identifier for the target chat or username of the target supergroup
   * (in the format @supergroupusername)
   * @returns Returns True on success.
   */
  deleteChatStickerSet = (chatId: ChatId): Promise<boolean> =>
    this.rawRequest('deleteChatStickerSet', { chatId });

  /**
   * Use this method to send answers to callback queries sent from inline keyboards.
   * The answer will be displayed to the user as a notification at the top of the chat screen or as an alert.
   *
   * @param params - Object containing method parameters.
   * @returns On success, True is returned.
   */
  answerCallbackQuery = (params: AnswerCallbackQueryParams): Promise<boolean> =>
    this.rawRequest('answerCallbackQuery', params);

  /**
   * Use this method to edit text and game messages.
   *
   * @param params - Object containing method parameters.
   * @returns On success, if edited message is sent by the bot, the edited Message is returned,
   * otherwise True is returned.
   */
  editMessageText = (params: EditMessageTextParams): Promise<Message | boolean> =>
    this.rawRequest('editMessageText', params);

  /**
   * Use this method to edit captions of messages.
   *
   * @param params - Object containing method parameters.
   * @returns On success, if edited message is sent by the bot, the edited Message is returned,
   * otherwise True is returned.
   */
  editMessageCaption = (params: EditMessageCaptionParams): Promise<Message | boolean> =>
    this.rawRequest('editMessageCaption', params);

  /**
   * Use this method to edit animation, audio, document, photo, or video messages.
   * If a message is a part of a message album, then it can be edited only to a photo or a video.
   * Otherwise, message type can be changed arbitrarily. When inline message is edited, new file can't be uploaded.
   * Use previously uploaded file via its file_id or specify a URL.
   *
   * @param params - Object containing method parameters.
   * @returns On success, if the edited message was sent by the bot, the edited Message is returned,
   * otherwise True is returned.
   */
  editMessageMedia = (params: EditMessageMediaParams): Promise<Message | boolean> =>
    this.rawRequest('editMessageMedia', params);

  /**
   * Use this method to edit only the reply markup of messages.
   *
   * @param params - Object containing method parameters.
   * @returns On success, if edited message is sent by the bot, the edited Message is returned,
   * otherwise True is returned.
   */
  editMessageReplyMarkup = (params: EditMessageReplyMarkupParams): Promise<Message | boolean> =>
    this.rawRequest('editMessageReplyMarkup', params);

  /**
   * Use this method to stop a poll which was sent by the bot.
   *
   * @param chatId - Unique identifier for the target chat or username of the target channel
   * (in the format @channelusername).
   * @param messageId - Identifier of the original message with the poll.
   * @param replyMarkup - A JSON-serialized object for a new message inline keyboard.
   * @returns On success, the stopped Poll with the final results is returned.
   */
  stopPoll = (chatId: ChatId, messageId: string, replyMarkup?: InlineKeyboardMarkup): Promise<Poll> =>
    this.rawRequest('stopPoll', { chatId, messageId, replyMarkup });

  /**
   * Use this method to delete a message, including service messages, with the following limitations:
   * - A message can only be deleted if it was sent less than 48 hours ago.
   * - Bots can delete outgoing messages in private chats, groups, and supergroups.
   * - Bots can delete incoming messages in private chats.
   * - Bots granted can_post_messages permissions can delete outgoing messages in channels.
   * - If the bot is an administrator of a group, it can delete any message there.
   * - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
   *
   * @param chatId - Unique identifier for the target chat or username of the target channel
   * (in the format @channelusername).
   * @param messageId - Identifier of the message to delete.
   * @returns Returns True on success.
   */
  deleteMessage = (chatId: ChatId, messageId: string): Promise<boolean> =>
    this.rawRequest('deleteMessage', { chatId, messageId });

  private rawRequest<T>(method: string, params: ITgBotParams = {}): Promise<T> {
    const url = this.getUrl(method);

    this.transformParams(params);

    return wretch(url)
      .post(params)
      .json((resp: APIResponse<T>) => this.parseResponse(resp));
  }

  private rawFileRequest<T>(method: string, params: ITgBotParams = {}): Promise<T> {
    const url = this.getUrl(method);

    this.transformParams(params);

    return wretch(url)
      .formData(params)
      .post()
      .json((resp: APIResponse<T>) => this.parseResponse(resp));
  }

  private parseResponse<T>(resp: APIResponse<T>): T {
    if (resp.ok) {
      this.transformObject(resp.result);

      return resp.result;
    } else {
      throw new Error(resp.description);
    }
  }

  private getUrl(method: string): string {
    return `${this.apiUrlBase}${this.token}/${method}`;
  }

  private transformObject(obj: { [key: string]: any }): void {
    if (!isObject(obj)) {
      return;
    }

    Object.keys(obj).forEach((key) => {
      const camelCasedKey = camelCased(key);

      obj[camelCasedKey] = obj[key];

      if (camelCasedKey !== key) {
        delete obj[key];
      }

      if (Array.isArray(obj[camelCasedKey])) {
        (obj[camelCasedKey] as Array<any>).forEach((val) => {
          this.transformObject(val);
        })
      }

      if (isObject(obj[camelCasedKey])) {
        this.transformObject(obj[camelCasedKey]);
      }
    });
  }

  private transformParams(params: ITgBotParams = {}) {
    if (!isObject(params)) {
      return {};
    }

    const skipKeys = ['photo', 'audio', 'document', 'video', 'animation', 'voice', 'video_note'];

    Object.keys(params).forEach((key) => {
      const snakeCasedKey = snakeCased(key);

      if (skipKeys.indexOf(snakeCasedKey) >= 0) {
        return;
      }

      if (snakeCasedKey !== key) {
        params[snakeCasedKey] = params[key];
        delete params[key];
      }

      if (Array.isArray(params[snakeCasedKey])) {
        (params[snakeCasedKey] as Array<any>).forEach((val) => {
          this.transformParams(val);
        });
      }

      if (isObject(params[snakeCasedKey])) {
        this.transformParams(params[snakeCasedKey]);
      }
    });
  }
}

export {
  Bot,
  ChatActions
}
