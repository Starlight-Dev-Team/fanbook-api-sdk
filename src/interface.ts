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

export type ChatType = 'private' | 'channel' | 'group' | 'supergroup';

export interface Chat {
  /**
   * 聊天唯一 ID 。
   */
  id: bigint;
  /**
   * 聊天类型。
   */
  type: ChatType;
  /**
   * 聊天标题。
   */
  title?: string;
  /**
   * 对方 Fanbook # 。
   */
  username?: string;
  /**
   * 用户昵称。
   */
  first_name?: string;
  /**
   * @deprecated 未定义
   */
  last_name?: string;
  /**
   * 聊天背景图。
   */
  photo?: /* unresolved */ any;
  /**
   * 聊天描述。
   * @deprecated 未实现
   */
  description?: string;
  /**
   * 邀请链接。
   * @deprecated 未实现
   */
  invite_link?: string;
  /**
   * Pin 的消息列表。
   */
  pinned_message?: Message[];
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
  /**
   * @deprecated 未实现
   */
  forward_from?: User;
  /**
   * @deprecated 未实现
   */
  forward_from_chat?: /* unresolved */ unknown;
  /**
   * @deprecated 未实现
   */
  forward_from_message_id?: bigint;
  /**
   * @deprecated 未实现
   */
  forward_signature?: string;
  /**
   * @deprecated 未实现
   */
  forward_sender_name?: string;
  /**
   * @deprecated 未实现
   */
  forward_date?: number;
  /**
   * 回复某条消息时，表示消息所回复的原始消息。
   */
  reply_to_message?: Message;
  /**
   * @deprecated 未实现
   */
  via_bot?: User;
  /**
   * @deprecated 未实现
   */
  edit_date?: number;
  /**
   * @deprecated 未定义
   */
  media_group_id?: number;
  /**
   * @deprecated 未定义
   */
  author_signature?: string;
  /**
   * 消息内容。
   */
  text?: string;
  /**
   * 消息内嵌的实体。
   */
  entities?: /* unresolved */ unknown[];
  /**
   * @deprecated 未实现
   */
  animation?: /* unresolved */ unknown;
  /**
   * @deprecated 未实现
   */
  audio?: /* unresolved */ unknown;
  /**
   * @deprecated 未实现
   */
  document?: /* unresolved */ unknown;
  /**
   * @deprecated 未实现
   */
  photo?: /* unresolved */ unknown[];
  /**
   * @deprecated 未定义
   */
  sticker?: /* unresolved */ unknown;
  /**
   * @deprecated 未实现
   */
  video?: /* unresolved */ unknown;
  /**
   * @deprecated 未实现
   */
  video_note?: /* unresolved */ unknown;
  /**
   * @deprecated 未实现
   */
  voice?: /* unresolved */ unknown;
  /**
   * 标题。
   */
  caption?: string;
  /**
   * 标题内嵌的实体。
   * @deprecated 未定义
   */
  caption_entities?: /* unresolved */ unknown[];
  /**
   * 联系人对象。
   */
  contact?: /* unresolved */ unknown;
  /**
   * 骰子表情对象。
   */
  dice?: /* unresolved */ unknown;
  /**
   * 游戏对象。
   */
  game?: /* unresolved */ unknown;
  /**
   * 投票对象。
   */
  poll?: /* unresolved */ unknown;
  /**
   * 场所对象。
   */
  venue?: /* unresolved */ unknown;
  /**
   * 位置对象。
   */
  location?: /* unresolved */ unknown;
  /**
   * 新加入的成员列表。
   */
  new_chat_members?: User[];
  /**
   * 离开的成员。
   */
  left_chat_member?: User;
  /**
   * @deprecated 未定义
   */
  new_chat_title?: string;
  /**
   * @deprecated 未定义
   */
  new_chat_photo?: /* unresolved */ unknown[];
  /**
   * @deprecated 未定义
   */
  delete_chat_photo?: true;
  /**
   * @deprecated 未定义
   */
  group_chat_created?: true;
  /**
   * @deprecated 未定义
   */
  supergroup_chat_created?: true;
  /**
   * @deprecated 未实现
   */
  channel_chat_created?: true;
  /**
   * @deprecated 未定义
   */
  migrate_to_chat_id?: bigint;
  /**
   * @deprecated 未定义
   */
  migrate_from_chat_id?: bigint;
  /**
   * 已经被 Pin 的消息。
   */
  pinned_message?: Message;
  /**
   * @deprecated 未定义
   */
  invoice?: /* unresolved */ unknown;
  /**
   * @deprecated 未定义
   */
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
  /**
   * 操作机器人的用户 token 。
   */
  token?: string;
}
