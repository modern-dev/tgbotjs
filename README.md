Telegram Bot API for Node.js and browsers.
==========================================

[![Build Status](https://travis-ci.org/modern-dev/tgbotjs.svg?branch=master)](https://travis-ci.org/modern-dev/tgbotjs)
[![codecov](https://codecov.io/gh/modern-dev/tgbotjs/branch/master/graph/badge.svg)](https://codecov.io/gh/modern-dev/tgbotjs)
![npm](https://img.shields.io/npm/v/@modern-dev/tgbotjs)
![NPM](https://img.shields.io/npm/l/@modern-dev/tgbotjs)

TgBotJs - is a Promise-based Telegram Bot API wrapper for Node.ks and browsers.

```shell script
$ npm install --save @modern-dev/tgbotjs
```

## :clipboard: Usage

```typescript
import { Bot } from '@modern-dev/tgbotjs';
import { User } from '@modern-dev/tgbotjs/types';

const token = 'your_bot_token';
const bot = new Bot(token);
const me: User = await bot.getMe();

console.log(me.firstName);
```

A list of all the methods is available [here](https://core.telegram.org/bots/api).

The methods with up to 3 input params have the next signature:
```typescript
setChatTitle = (chatId: ChatId, title: string): Promise<boolean>
getChat = (chatId: ChatId): Promise<Chat>
getChatAdministrators = (chatId: ChatId): Promise<Array<ChatMember>>
```

For example:

```typescript
const ok = await bot.setChatTitle('@M3MSY', 'Best memes from all over the internet.');
```

The methods with 4+ input params accept a single object with all the required params as key-value pairs:

```typescript
getUpdates = (params: GetUpdatesParams): Promise<Array<Update>>
sendMessage = (params: SendMessageParams): Promise<Message>
sendPhoto = (params: SendPhotoParams): Promise<Message>
```

For example:
```typescript
const params = {
  chatId: '@M3MSY',
  text: 'Welcome there!',
  disableNotification: true,
  replyToMessageId: 12345678
};
const msg = await bot.sendMessage(params);
```

### Uploading media.

TgBotJs accepts [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob), [File](https://developer.mozilla.org/en-US/docs/Web/API/File), [ReadStream](https://nodejs.org/api/fs.html#fs_class_fs_readstream) or [Buffer](https://nodejs.org/api/buffer.html) as media upload options.

For example:

```typescript
const photo = fs.createReadStream('/photos/chat_picture.jpg');
const ok = await bot.setChatPhoto('@M3MSY', photo);
```

## :green_book: License

[Licensed under the MIT license.](https://github.com/modern-dev/tgbotjs/blob/master/LICENSE)

Copyright (c) 2020 Bohdan Shtepan

---

> [modern-dev.com](http://modern-dev.com) &nbsp;&middot;&nbsp;
> GitHub [@virtyaluk](https://github.com/virtyaluk) &nbsp;&middot;&nbsp;
> Twitter [@virtyaluk](https://twitter.com/virtyaluk)