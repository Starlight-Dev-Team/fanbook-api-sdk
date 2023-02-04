/**
 * 用户对象。
 *
 * 机器人是特殊的用户。
 */
export interface User {
  /**
   * 用户唯一 ID 。
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

export default User;
