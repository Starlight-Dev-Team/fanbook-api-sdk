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
