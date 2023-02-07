export interface GuildRole {
  /**
   * 角色 ID 。
   */
  id: bigint;
  /**
   * 角色名称。
   */
  name: string;
  /**
   * 角色优先级。
   */
  position: /* unresolved */ number;
  /**
   * 角色权限。
   */
  permissions: number;
  /**
   * 角色昵称颜色。
   */
  color: number;
  /**
   * 是否已有管理者。
   */
  managed?: boolean;
  /**
   * 成员数量。
   */
  member_count: number;
  /**
   * 管理者机器人。
   */
  tag: /* unresolved */ any;
}

export default GuildRole;
