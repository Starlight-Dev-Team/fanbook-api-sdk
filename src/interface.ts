/**
 * 定义开放平台数据类型。
 *
 * @see https://open.fanbook.mobi/document/manage/doc/Bot%20API/API%E5%8F%AF%E7%94%A8%E7%B1%BB%E5%9E%8B
 */

export interface User {
  /**
   * 用户/机器人唯一 ID 。
   */
  id: bigint;
  /**
   * 是否机器人。
   */
  is_bot: boolean;
  /**
   * 姓。
   */
  first_name: string;
  /**
   * 名。
   */
  last_name?: string;
  /**
   * Fanbook # （又名“fanbook id”）。
   */
  username?: string;
  /**
   * 用户使用的语言 IETF 标签。
   */
  language_code?: string;
  /**
   * 机器人是否可以被邀请进服务器。
   *
   * 仅能通过 getMe 获取。
   */
  can_join_groups?: boolean;
  /**
   * 机器人是否接收服务器的所有消息（即“privacy_mode”）。
   */
  can_read_all_group_messages?: boolean;
  /**
   * 机器人是否支持内联查询。
   */
  supports_inline_queries?: boolean;
  /**
   * 是否未完成入门仪式。
   */
  pending?: boolean;
}

export type FormattingOptions = 'Fanbook' | 'MarkdownV2' | undefined;

export interface Message {
  /**
   * 消息唯一 ID 。
   */
  message_id: bigint;
  /**
   * 消息发送者。
   */
  from?: User;
  /**
   * 消息发送时间。
   */
  date: number;
  /**
   * 消息所在聊天。
   */
  chat: /* unresolved */ unknown;
  forward_from?: User;
  forward_from_chat?: /* unresolved */ unknown;
  forward_from_message_id?: bigint;
  forward_signature?: string;
  forward_sender_name?: string;
  forward_date?: number;
  /**
   * 回复某条消息时，表示消息所回复的原始消息。
   */
  reply_to_message?: Message;
  via_bot?: User;
  edit_date?: number;
  media_group_id?: number;
  author_signature?: string;
  /**
   * 消息内容。
   */
  text?: string;
  /**
   * 消息内嵌的实体。
   */
  entities?: /* unresolved */ unknown[];
  animation?: /* unresolved */ unknown;
  audio?: /* unresolved */ unknown;
  document?: /* unresolved */ unknown;
  photo?: /* unresolved */ unknown[];
  sticker?: /* unresolved */ unknown;
  video?: /* unresolved */ unknown;
  video_note?: /* unresolved */ unknown;
  voice?: /* unresolved */ unknown;
  /**
   * 标题。
   */
  caption?: string;
  /**
   * 标题内嵌的实体。
   */
  caption_entities?: /* unresolved */ unknown[];
  contact?: /* unresolved */ unknown;
  dice?: /* unresolved */ unknown;
  game?: /* unresolved */ unknown;
  poll?: /* unresolved */ unknown;
  venue?: /* unresolved */ unknown;
  location?: /* unresolved */ unknown;
  new_chat_members?: User[];
  left_chat_member?: User;
  new_chat_title?: string;
  new_chat_photo?: /* unresolved */ unknown[];
  delete_chat_photo?: true;
  group_chat_created?: true;
  supergroup_chat_created?: true;
  channel_chat_created?: true;
  migrate_to_chat_id?: bigint;
  migrate_from_chat_id?: bigint;
  pinned_message?: Message;
  invoice?: /* unresolved */ unknown;
  successful_payment?: /* unresolved */ unknown;
  /**
   * 内联键盘。
   */
  reply_markup?: /* unresolved */ unknown;
}

export interface Oauth2User {
  /**
   * 用户唯一 ID 。
   */
  user_id: string;
  /**
   * 用户名称。
   */
  nickname: string;
  /**
   * Fanbook # 。
   */
  username: string;
  /**
   * 头像图片地址。
   */
  avatar: string;
  token?: string;
}
