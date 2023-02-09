/**
 * 用户授权回传信息。
 */
export interface Session {
  /**
   * OAuth2.0 流程，访问令牌。
   */
  accessToken: string;
  /**
   * OAuth2.0 流程，刷新令牌。
   */
  refreshToken: string;
  /**
   * 令牌类型。
   */
  tokenType: 'bearer';
  /**
   * OAuth2.0 流程，令牌失效时间。
   */
  expires: Date;
}

export default Session;
