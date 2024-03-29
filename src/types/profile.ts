/**
 * 用户信息。
 */
export interface Profile {
  /**
   * 唯一 ID 。
   */
  uuid: bigint;
  /**
   * 是否机器人
   */
  isBot?: boolean;
  /**
   * 头像地址。
   */
  avatar?: string;
  /**
   * 用户昵称。
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
  isPending?: boolean;
  /**
   * 作为用户身份的令牌。
   */
  userToken: string;
}

export default Profile;
