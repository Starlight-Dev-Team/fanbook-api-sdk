import type { Message } from './message';

/**
 * 聊天类型。
 */
export type ChatType = 'private' | 'channel' | 'group' | 'supergroup';

/**
 * 聊天对象。
 */
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

export default Chat;
