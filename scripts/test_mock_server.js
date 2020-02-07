/*!
 * tgbotjs - Telegram Bot API for Node.js and browsers.
 * https://github.com/modern-dev/tgbotjs
 *
 * Copyright (c) 2020 Bohdan Shtepan
 * Licensed under the MIT license.
 */

const restify = require('restify');
const token = 'test_token';
const port = 9654;
const server = restify.createServer();
const methodRequiredFields = {
  getUpdates: [],
  setWebhook: ['url'],
  deleteWebhook: [],
  getWebhookInfo: [],
  getMe: [],
  sendMessage: ['chat_id', 'text'],
  forwardMessage: ['chat_id', 'from_chat_id', 'message_id'],
  sendPhoto: ['chat_id', 'photo'],
  sendAudio: ['chat_id', 'audio'],
  sendDocument: ['chat_id', 'document'],
  sendVideo: ['chat_id', 'video'],
  sendAnimation: ['chat_id', 'animation'],
  sendVoice: ['chat_id', 'voice'],
  sendVideoNote: ['chat_id', 'video_note'],
  sendMediaGroup: ['chat_id', 'media'],
  sendLocation: ['chat_id', 'latitude', 'longitude'],
  editMessageLiveLocation: ['latitude', 'longitude'],
  stopMessageLiveLocation: [],
  sendVenue: ['chat_id', 'latitude', 'longitude', 'title', 'address'],
  sendContact: ['chat_id', 'phone_number', 'first_name'],
  sendPoll: ['chat_id', 'question', 'options'],
  sendChatAction: ['chat_id', 'action'],
  getUserProfilePhotos: ['user_id'],
  getFile: ['file_id'],
  kickChatMember: ['chat_id', 'user_id'],
  unbanChatMember: ['chat_id', 'user_id'],
  restrictChatMember: ['chat_id', 'user_id', 'permissions'],
  promoteChatMember: ['chat_id', 'user_id'],
  setChatAdministratorCustomTitle: ['chat_id', 'user_id', 'custom_title'],
  setChatPermissions: ['chat_id', 'permissions'],
  exportChatInviteLink: ['chat_id'],
  setChatPhoto: ['chat_id', 'photo'],
  deleteChatPhoto: ['chat_id'],
  setChatTitle: ['chat_id', 'title'],
  setChatDescription: ['chat_id', 'description'],
  pinChatMessage: ['chat_id', 'message_id'],
  unpinChatMessage: ['chat_id'],
  leaveChat: ['chat_id'],
  getChat: ['chat_id'],
  getChatAdministrators: ['chat_id'],
  getChatMembersCount: ['chat_id'],
  getChatMember: ['chat_id', 'user_id'],
  setChatStickerSet: ['chat_id', 'sticker_set_name'],
  deleteChatStickerSet: ['chat_id'],
  answerCallbackQuery: ['callback_query_id'],
  editMessageText: ['chat_id', 'text'],
  editMessageCaption: ['chat_id', 'caption'],
  editMessageMedia: ['chat_id', 'media'],
  editMessageReplyMarkup: ['chat_id'],
  stopPoll: ['chat_id', 'message_id'],
  deleteMessage: ['chat_id', 'message_id'],
  sendSticker: ['chat_id', 'sticker'],
  getStickerSet: ['name'],
  uploadStickerFile: ['user_id', 'png_sticker'],
  createNewStickerSet: ['user_id', 'name', 'title', 'png_sticker', 'emojis'],
  addStickerToSet: ['user_id', 'name', 'png_sticker', 'emojis'],
  setStickerPositionInSet: ['sticker', 'position'],
  deleteStickerFromSet: ['sticker'],
  answerInlineQuery: ['inline_query_id', 'results'],
  sendInvoice: ['chat_id', 'title', 'description', 'payload', 'provider_token', 'start_parameter', 'currency',
    'prices'],
  answerShippingQuery: ['shipping_query_id', 'ok'],
  answerPreCheckoutQuery: ['pre_checkout_query_id', 'ok'],
  setPassportDataErrors: ['user_id', 'errors'],
  sendGame: ['chat_id', 'game_short_name'],
  setGameScore: ['user_id', 'score'],
  getGameHighScores: ['user_id', 'chat_id']
};

server.use(restify.plugins.bodyParser({ mapParams: true }));

function serverShutdown() {
  server.close(() => {
    console.log('Test mock server has been stopped.');
  });
}

process.on('SIGINT', serverShutdown);
process.on('SIGTERM', serverShutdown);
process.on('uncaughtException', (error) => {
  console.log(error);
  serverShutdown();
});

server.pre(function(req, res, next) {
  res.setHeader('Timing-Allow-Origin', '*');

  return next();
});

server.post(`/bot${token}/:method`, (req, res, next) => {
  const resp = { ok: true };
  const reqFields = methodRequiredFields[req.params.method];

  if (!reqFields) {
    resp.ok = false;
    resp.description = `Unknown method ${req.params.method}`;
  }

  reqFields.forEach((field) => {
    if (!req.params[field]) {
      resp.ok = false;
      resp.description = `${field} is null or empty.`;
    }
  });

  if (resp.ok) {
    resp.result = Object.assign({}, req.params);
  }

  res.header('content-type', 'json');
  res.send(resp);

  return next();
});

server.listen(port, () => {
  console.log('Test mock server has been started.');
});
