/*!
 * tgbotjs - Telegram Bot API for Node.js and browsers.
 * https://github.com/modern-dev/tgbotjs
 *
 * Copyright (c) 2020 Bohdan Shtepan
 * Licensed under the MIT license.
 */

import wretch from 'wretch';
import { Bot } from './index';
// eslint-disable-next-line no-unused-vars
import { ITgBotParams } from './params';
import { isObject, isString, camelCased, snakeCased } from './utils';
import { expect } from 'chai';
import 'mocha';

describe('TgBotJs', () => {
  describe('utils', () => {
    it('isObject', () => {
      expect(isObject({})).to.be.true;
      expect(isObject([])).to.be.false;
      expect(isObject(true)).to.be.false;
      expect(isObject(new Array(1))).to.be.false;
      expect(isObject(new Float32Array())).to.be.false;
    });

    it('isString', () => {
      expect(isString('')).to.be.true;
      expect(isString('foo')).to.be.true;
      expect(isString(null)).to.be.false;
      expect(isString({})).to.be.false;
      expect(isString([])).to.be.false;
      expect(isString(new Float32Array())).to.be.false;
    });

    it('camelCased', () => {
      expect(camelCased('')).to.be.equals('');
      expect(camelCased('foo_bar')).to.be.equals('fooBar');
      expect(camelCased('foo bar')).to.be.equals('foo bar');
      expect(camelCased('fooBar')).to.be.equals('fooBar');
    });

    it('snakeCased', () => {
      expect(snakeCased('')).to.be.equals('');
      expect(snakeCased('fooBar')).to.be.equals('foo_bar');
      expect(snakeCased('foo bar')).to.be.equals('foo bar');
      expect(snakeCased('foo_bar')).to.be.equals('foo_bar');
    });
  });

  describe('Bot', () => {
    const token = 'test_token';
    const bot = getNewBot(token);

    before(() => {
      wretch().polyfills({
        fetch: require('node-fetch'),
        FormData: require('form-data'),
        URLSearchParams: require('url').URLSearchParams
      })
    });

    it('Bot basic behaviour', () => {
      expect(() => new Bot('')).to.throw('token is null or empty.');
      expect(bot).not.to.be.null;
    });

    it('Bot methods', async () => {
      const keys = Object.keys(methodsParams);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const botMethod = bot[key] as AsyncFunction;
        const resp = await botMethod.call(bot, ...methodsParams[key]);

        expect(resp).not.to.be.null;
        expect(resp).to.have.property('method').that.equals(key);
      }
    });

    it('Bot methods with errors', (done) => {
      // @ts-ignore
      bot.getChat(null).catch((error: any) => {
        expect(error.toString()).to.be.equals('Error: chat_id is null or empty.');

        done();
      });
    });

    it('Bot.transformObject', () => {
      // @ts-ignore
      expect(bot.transformObject('')).to.be.undefined;

      const obj = {
        foo_bar: 'baz',
        ban_bax: {
          bad_baf: 23
        },
        quix: [{ foo_flax: 3 }]
      };

      bot.transformObject(obj);

      expect(obj).not.to.be.null;
      expect(obj).to.have.property('fooBar').that.equals('baz');
      expect(obj).not.to.have.property('foo_bar');
      expect(obj).to.have.property('banBax').that.have.property('badBaf');
      expect(obj.quix[0]).to.have.property('fooFlax');
    });

    it('Bot.transformParams', () => {
      // @ts-ignore
      expect(bot.transformParams('')).to.be.undefined;

      const obj = {
        fooBar: 'baz',
        banBax: {
          badBaf: 23
        },
        quix: [{ fooFlax: 3 }]
      };

      bot.transformParams(obj);

      expect(obj).not.to.be.null;
      expect(obj).to.have.property('foo_bar').that.equals('baz');
      expect(obj).not.to.have.property('fooBar');
      expect(obj).to.have.property('ban_bax').that.have.property('bad_baf');
      expect(obj.quix[0]).to.have.property('foo_flax');
    });

    it('Bot.hasFileString', () => {
      expect(bot.hasFileString({}, 'photo')).to.be.false;
      expect(bot.hasFileString({ photo: 3 }, 'photo')).to.be.false;
      expect(bot.hasFileString({ photo: 'photo' }, 'photo')).to.be.true;
    });
  });
});

type AsyncFunction = (arg0?: any, ...args: Array<any>) => Promise<any>;

function getNewBot(token: string) {
  class TgBot extends Bot {
    [key: string]: any;
    constructor(token: string) {
      super(token);

      this.apiUrlBase = 'http://localhost:9654/bot';
    }

    public transformObject(obj: { [p: string]: any }): void {
      super.transformObject(obj);
    }

    public transformParams(params: ITgBotParams = {}) {
      return super.transformParams(params);
    }

    public hasFileString(obj: { [p: string]: any }, ...keys: string[]): boolean {
      return super.hasFileString(obj, ...keys);
    }
  }

  return new TgBot(token);
}

const methodsParams: { [key: string]: Array<any> } = {
  getUpdates: [{ offset: 0, limit: 10 }],
  setWebhook: [{ url: 'https://www.example.com/webhook', maxConnections: 10 }],
  deleteWebhook: [],
  getWebhookInfo: [],
  getMe: [],
  sendMessage: [{ chatId: 1, text: 'foo' }],
  forwardMessage: [{ chatId: 2, fromChatId: 1, messageId: 101 }],
  sendPhoto: [{ chatId: 1, photo: 'photo' }],
  sendAudio: [{ chatId: 1, audio: 'audio' }],
  sendDocument: [{ chatId: 1, document: 'document' }],
  sendVideo: [{ chatId: 1, video: 'video' }],
  sendAnimation: [{ chatId: 1, animation: 'animation' }],
  sendVoice: [{ chatId: 1, voice: 'voice' }],
  sendVideoNote: [{ chatId: 1, video_note: 'video_note' }],
  sendMediaGroup: [{ chatId: 1, media: 'media' }],
  sendLocation: [{ chatId: 1, longitude: 1, latitude: 1 }],
  editMessageLiveLocation: [{ chatId: 1, longitude: 1, latitude: 1 }],
  stopMessageLiveLocation: [],
  sendVenue: [{ chatId: 1, latitude: 1, longitude: 1, title: 'Kyiv', address: 'Olenivska 34A' }],
  sendContact: [{ chatId: 1, phoneNumber: '1', firstName: 'Bohdan' }],
  sendPoll: [{ chatId: 1, question: 'to be or not to be?', options: {} }],
  sendChatAction: [1, 'typing'],
  getUserProfilePhotos: [201],
  getFile: ['file_id'],
  kickChatMember: [1, 202],
  unbanChatMember: [1, 202],
  restrictChatMember: [{ chatId: 1, userId: 202, permissions: {} }],
  promoteChatMember: [{ chatId: 1, userId: 202 }],
  setChatAdministratorCustomTitle: [1, 202, 'title'],
  setChatPermissions: [1, {}],
  exportChatInviteLink: [1],
  setChatPhoto: [1, 'photo_id'],
  deleteChatPhoto: [1],
  setChatTitle: [1, 'title'],
  setChatDescription: [1, 'description'],
  pinChatMessage: [1, 101],
  unpinChatMessage: [1],
  leaveChat: [1],
  getChat: [1],
  getChatAdministrators: [1],
  getChatMembersCount: [1],
  getChatMember: [1, 202],
  setChatStickerSet: [1, 'super_sticker_pack'],
  deleteChatStickerSet: [1],
  answerCallbackQuery: [{ callbackQueryId: 'answer_id' }],
  editMessageText: [{ chatId: 1, text: 'text' }],
  editMessageCaption: [{ chatId: 1, caption: 'caption' }],
  editMessageMedia: [{ chatId: 1, media: 'media' }],
  editMessageReplyMarkup: [{ chatId: 1 }],
  stopPoll: [1, 202],
  deleteMessage: [1, 202],
  sendSticker: [{ chatId: 1, sticker: 'sticker' }],
  getStickerSet: ['my_sticker_set'],
  uploadStickerFile: [202, 'png_sticker'],
  createNewStickerSet: [{ userId: 202, name: 'name', title: 'my_sticker_set', png_sticker: 'png_sticker',
    emojis: 'emojis' }],
  addStickerToSet: [{ userId: 202, name: 'name', png_sticker: 'png_sticker', emojis: 'emojis' }],
  setStickerPositionInSet: ['sticker', 50],
  deleteStickerFromSet: ['sticker'],
  answerInlineQuery: [{ inlineQueryId: 'inline_query_id', results: 'results' }],
  sendInvoice: [{ chatId: 1, title: 'title', description: 'description', payload: 'payload',
    providerToken: 'provider_token', startParameter: 'start_parameter', currency: 'currency', prices: 'prices' }],
  answerShippingQuery: [{ shippingQueryId: 'shipping_query_id', ok: true }],
  answerPreCheckoutQuery: ['pre_checkout_query_id', true],
  setPassportDataErrors: [202, 'errors'],
  sendGame: [{ chatId: 1, gameShortName: 'game_short_name' }],
  setGameScore: [{ userId: 202, score: 55 }],
  getGameHighScores: [{ userId: 202, chatId: 1 }]
};

