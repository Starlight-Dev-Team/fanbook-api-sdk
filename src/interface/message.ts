import { ChannelType } from '@/interface/channel';
import type { User } from '@/interface/user';

/**
 * 用户
 */
export type FormattingOptions = 'Fanbook' | 'MarkdownV2' | undefined;

/**
 * 消息对象。
 */
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

/** WebSocket 推送的消息对象。 */
export interface WsMessage {
  /** 消息内容。 */
  content: string;
  /** 发送时间。 */
  time: number;
  /** 所在频道。 */
  channel_id: string;
  /** 发送者。 */
  user_id: string;
  /** 直接引用。 */
  quote_l1: null;
  /** 二级引用。 */
  quote_l2: null;
  /** 服务器 ID 。 */
  guild_id: string;
  /** 频道类型。 */
  channel_type: ChannelType;
  /** 消息状态。 */
  status: number;
  /** 去重 ID 。 */
  nonce: string;
  /** @deprecated 未定义 */
  ctype: null;
  /** 发送者信息。 */
  author: {
    /** 昵称。 */
    nickname: string;
    /** Fanbook # 。 */
    username: string;
    /** 头像图片地址。 */
    avatar: string;
    /** 头像 NFT 展图地址。 */
    avatar_nft: string | null;
    /** 是否机器人。 */
    bot: boolean;
  };
  /** 消息简介。 */
  desc: string;
}
