/**
 * 定义开放平台应用。
 */

import * as qs from 'qs';

import { requester, send, sendWithoutCheck } from '@/util';
import type {
  Session,
  Profile,
} from '@/types';
import type { Oauth2User } from '@/interface';

/**
 * 开放平台应用。
 */
export class App {
  constructor(
    public readonly clientId: string,
    private readonly clientSecret: string,
    public readonly publicKey: string = '',
    public readonly oauth2RedirectUrl: string = 'http://localhost',
  ) {}

  /**
   * 获取 OAuth2.0 流程中的**授权页面**地址。
   * @param state OAuth2.0 流程中定义的 state
   * @see https://open.fanbook.mobi/document/manage/doc/Oauth2.0%20API#%E6%89%93%E5%BC%80%E6%8E%88%E6%9D%83%E9%A1%B5%E9%9D%A2for-web
   */
  public getOauth2Url(state?: string): string {
    return 'https://oauth.fanbook.mobi/authorize?' + qs.stringify({
      response_type: 'code',
      client_id: this.clientId,
      state,
    });
  }

  /**
   * OAuth2.0 流程中，code 换取 token。
   * @param code OAuth2.0 流程中的 code
   * @see https://open.fanbook.mobi/document/manage/doc/Oauth2.0%20API/#%E6%8D%A2%E5%8F%91-token
   */
  public async codeToSession(code: string): Promise<Session> {
    const data = qs.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.oauth2RedirectUrl,
    });
    const auth = { // Basic Auth
      username: this.clientId,
      password: this.clientSecret,
    };
    const res: {
      access_token: string;
      refresh_token: string;
      token_type: 'bearer';
      expires_in: number;
    } = await sendWithoutCheck(requester.post('/open/oauth2/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // 必须加上，否则会报错
      },
      auth,
    })); // 此接口格式不同，不需要进行校验
    return {
      accessToken: res.access_token,
      refreshToken: res.refresh_token,
      tokenType: res.token_type,
      expires: new Date(Date.now() + res.expires_in * 1000), // 当前时间加有效时间（秒）
    };
  }

  public async getOauth2UserProfile(token: string): Promise<Profile> {
    const res: Oauth2User = await send(requester.post(
      '/open/api/user/getMe',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    ));
    return {
      uuid: BigInt(res.user_id),
      id: Number(res.username),
      name: res.nickname,
    };
  }
}
