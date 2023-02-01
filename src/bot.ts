/**
 * 定义开放平台机器人。
 */

import { requester, send } from '@/util';

import type { User } from './interface';

export interface Profile {
  /**
   * 唯一 ID 。
   */
  uuid: bigint;
  /**
   * 是否机器人
   */
  isBot: boolean;
  /**
   * 名称。
   */
  name: string;
  /**
   * Fanbook # 。
   */
  id?: number;
  /**
   * privacy mode 是否开启。
   */
  privacyMode?: boolean;
  /**
   * 是否未完成入门仪式。
   */
  isPending: boolean;
}

/**
 * 开放平台机器人。
 */
export class Bot {
  /**
   * 机器人 API 公共前缀路径。
   */
  public readonly publicPath: string = `/api/bot/${this.token}`;

  constructor(
    /**
     * 机器人令牌。
     */
    private readonly token: string,
  ) {}

  /**
   * 获取机器人信息。
   */
  public async getProfile(): Promise<Profile> {
    const res: User = await send(requester.post(`${this.publicPath}/getMe`));
    const username = Number(res.username);
    return {
      uuid: res.id,
      isBot: res.is_bot,
      name: res.first_name,
      id: Number.isNaN(username) ? undefined : username, // 机器人 username 是字符串
      privacyMode: res.can_read_all_group_messages,
      isPending: false, // 机器人不需要入门仪式
    };
  }
}
