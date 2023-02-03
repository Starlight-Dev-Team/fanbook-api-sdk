/**
 * OAuth2.0 示例。
 *
 * 阅读示例之前，请先了解 [OAuth2.0 规范](https://www.rfc-editor.org/rfc/rfc6749)。
 */

import * as fanbook from '@starlight-dev-team/fanbook-api-sdk';

const clientId = ''; // 应用的 Client ID
const clientSecret = ''; // 应用的 Client Secret
const oauth2RedirectUrl = ''; // 应用的 OAuth2.0 重定向地址
const code = ''; // OAuth2.0 预授权码

const app = new fanbook.App(clientId, clientSecret, '', oauth2RedirectUrl);

async function main() {
  const session = await app.codeToSession(code);
  const token = session.accessToken;
  console.log('access token = ', token);
  console.log('用户信息 = ', await app.getOauth2UserProfile(token));
}

main();