import type { Permissions } from '@/interface';

/**
 * 成员角色。
 */
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
  position: number;
  /**
   * 角色权限。
   */
  permissions: Permissions;
  /**
   * 角色昵称颜色。
   */
  color: number;
  /**
   * 成员数量。
   */
  memberCount?: number;
}

export default GuildRole;
