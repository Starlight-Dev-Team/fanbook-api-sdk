/**
 * OAuth2.0 用户对象。
 */
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

export default Oauth2User;
