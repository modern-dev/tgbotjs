export type Update = {
  update_id: number
  message: Message
  edited_message: Message
  channel_post: Message
  edited_channel_post: Message
  inline_query: InlineQuery
  chosen_inline_result: ChosenInlineResult
  callback_query: CallbackQuery
  shipping_query: ShippingQuery
  pre_checkout_query: PreCheckoutQuery
  poll: Poll
  poll_answer: PollAnswer
}

export type InlineQuery = {
  id: string
  from: User
  location: Location
  query: string
  offset: string
}

export type ChosenInlineResult = {
  result_id: string
  from: User
  location?: Location
  inlineMessageId?: string
  query: string
}

export type ShippingQuery = {
  id: string
  from: User
  invoice_payload: string
  shipping_address: ShippingAddress
}

export type ShippingAddress = {
  country_code: string
  state: string
  city: string
  street_line1: string
  street_line2: string
  post_code: string
}

export type OrderInfo = {
  name: string
  phone_number: string
  email: string
  shipping_address: ShippingAddress
}

export type PreCheckoutQuery = {
  id: string
  from: User
  currency: string
  total_amount: number
  invoice_payload: string
  shipping_option_id: string
  order_info: OrderInfo
}

export type WebhookInfo = {
  url: string
  has_custom_certificate: boolean
  pending_update_count: number
  last_error_date: number
  last_error_message: string
  max_connections: number
  allowed_updates: Array<string>
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
  first_name: string
  last_name: string
  photo: ChatPhoto
  description: string
  invite_link: string
  pinned_message: Message
  permissions: ChatPermissions
  slow_mode_delay: number
  sticker_set_name: string
  can_set_sticker_set: boolean
}

export type Message = {
  message_id: number
  from:	User
  date: number
  chat: Chat
  forward_from:	User
  forward_from_chat: Chat
  forward_from_message_id: number
  forward_signature: string
  forward_sender_name: string
  forward_date: number
  reply_to_message:	Message
  edit_date: number
  media_group_id: string
  author_signature: string
  text: string
  entities: Array<MessageEntity>
  caption_entities:	Array<MessageEntity>
  audio: Audio
  document:	Document
  animation: Animation
  game: Game
  photo:	Array<PhotoSize>
  sticker: Sticker
  video: Video
  voice: Voice
  video_note: VideoNote
  caption: string
  contact: Contact
  location: Location
  venue: Venue
  poll: Poll
  new_chat_members: Array<User>
  left_chat_member: User
  new_chat_title: string
  new_chat_photo: Array<PhotoSize>
  delete_chat_photo: boolean
  group_chat_created: boolean
  supergroup_chat_created: boolean
  channel_chat_created: boolean
  migrate_to_chat_id: number
  migrate_from_chat_id: number
  pinned_message: Message
  invoice: Invoice
  successful_payment: SuccessfulPayment
  connected_website: string
  passport_data: PassportData
  reply_markup: InlineKeyboardMarkup
}

export type Game = {
  title: string
  description: string
  photo: Array<PhotoSize>
  text: string
  text_entities: Array<MessageEntity>
  animation: Animation
}

export type Invoice = {
  title: string
  description: string
  start_parameter: string
  currency: string
  total_amount: number
}

export type SuccessfulPayment = {
  currency: string
  total_amount: number
  invoice_payload: string
  shipping_option_id: string
  order_info: OrderInfo
  telegram_payment_charge_id: string
  provider_payment_charge_id: string
}

export type Sticker = {
  file_id: string
  file_unique_id: string
  width: number
  height: number
  is_animated: boolean
  thumb: PhotoSize
  emoji: string
  set_name: string
  mask_position: MaskPosition
  file_size: number
}

export type MaskPosition = {
  point: string
  x_shift: number
  y_shift: number
  scale: number
}

export type PassportData = {
  data: Array<EncryptedPassportElement>
  credentials: EncryptedCredentials
}

export type EncryptedPassportElement = {
  type: string
  data: string
  phone_number: string
  email: string
  files: Array<PassportFile>
  front_side: PassportFile
  reverse_side: PassportFile
  selfie: PassportFile
  translation: Array<PassportFile>
  hash: String
}

export type PassportFile = {
  file_id: string
  file_unique_id: string
  file_size: number
  file_date: number
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
  file_id: string
  file_unique_id: string
  width: number
  height: number
  file_size: number
}

export type Audio = {
  file_id: string
  file_unique_id: string
  duration: number
  performer: string
  title: string
  mime_type: string
  file_size: number
  thumb:	PhotoSize
}

// @ts-ignore
export type Document = {
  file_id: string
  file_unique_id: string
  thumb:	PhotoSize
  file_name: string
  mime_type: string
  file_size: number
}

export type Video = {
  file_id: string
  file_unique_id: string
  width: number
  height: number
  duration: number
  thumb:	PhotoSize
  mime_type: string
  file_size: number
}

// @ts-ignore
export type Animation = {
  file_id: string
  file_unique_id: string
  width: Number
  height: number
  duration: number
  thumb:	PhotoSize
  file_name: string
  mime_type: string
  file_size: number
}

export type Voice = {
  file_id: string
  file_unique_id: string
  duration: number
  mime_type: string
  file_size: number
}

export type VideoNote = {
  file_id: string
  file_unique_id: string
  length: number
  duration: number
  thumb:	PhotoSize
  file_size: number
}

export type Contact = {
  phone_number: string
  first_name: string
  last_name: string
  user_id: number
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
  foursquare_id: string
  foursquare_type: string
}

export type PollOption = {
  text: string
  voter_count: number
}

export type PollAnswer = {
  poll_id: string
  user:	User
  option_ids: Array<number>
}

export type Poll = {
  id: string
  question: string
  options:	Array<PollOption>
  total_voter_count: number
  is_closed: boolean
  is_anonymous: boolean
  type: string
  allows_multiple_answers: boolean
  correct_option_id: number
}

export type UserProfilePhotos = {
  total_count: number
  photos: Array<Array<PhotoSize>>
}

// @ts-ignore
export type File = {
  file_id: string
  file_unique_id: string
  file_size: number
  file_path: string
}

export type KeyboardButton = {
  keyboard: Array<Array<KeyboardButton>>
  resize_keyboard: boolean
  one_time_keyboard: boolean
  selective: boolean
}

export type KeyboardButtonPollType = {
  type: string
}

export type ReplyKeyboardRemove = {
  remove_keyboard: boolean
  selective: boolean
}

export type ReplyKeyboardMarkup = {
  keyboard: Array<Array<KeyboardButton>>;
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  selective?: boolean;
}

export type InlineKeyboardMarkup = {
  inline_keyboard:	Array<Array<InlineKeyboardButton>>
}

export type InlineKeyboardButton = {
  text: string
  url: string
  login_url:	LoginUrl
  callback_data: string
  switch_inline_query: string
  switch_inline_query_current_chat: string
  callback_game:	CallbackGame
  pay: boolean
}

export type CallbackGame = {}

export type LoginUrl = {
  url: string
  forward_text: string
  bot_username: string
  request_write_access: boolean
}

export type CallbackQuery = {
  id: string
  from: User
  message: Message
  inline_message_id: string
  chat_instance: string
  data: string
  game_short_name: string
}

export type ForceReply = {
  force_reply: boolean
  selective: boolean
}

export type ChatPhoto = {
  small_file_id: string
  small_file_unique_id: string
  big_file_id: string
  big_file_unique_id: string
}

export type ChatMember = {
  user: User
  status: string
  custom_title: string
  until_date: number
  can_be_edited: boolean
  can_post_messages: boolean
  can_edit_messages: boolean
  can_delete_messages: boolean
  can_restrict_members: boolean
  can_promote_members: boolean
  can_change_info: boolean
  can_invite_users: boolean
  can_pin_messages: boolean
  is_member: boolean
  can_send_messages: boolean
  can_send_media_messages: boolean
  can_send_polls: boolean
  can_send_other_messages: boolean
  can_add_web_page_previews: boolean
}

export type ChatPermissions = {
  can_send_messages: boolean
  can_send_media_messages: boolean
  can_send_polls: boolean
  can_send_other_messages: boolean
  can_add_web_page_previews: boolean
  can_change_info: boolean
  can_invite_users: boolean
  can_pin_messages: boolean
}

export type ResponseParameters = {
  migrateToChatId: number
  retryAfter: number
}

export type InputFile = any;

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
