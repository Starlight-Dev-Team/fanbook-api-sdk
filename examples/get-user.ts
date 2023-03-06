/**
 * 通过 Fanbook # 获取用户 ID 示例。
 */

import * as fanbook from '@starlight-dev-team/fanbook-api-sdk';

const token = ''; // 机器人令牌
const guild = ''; // 服务器 ID （字符串形式）
const id = 995858; // 用户 Fanbook #

const bot = new fanbook.Bot(token);

async function main() {
  const channels = await bot.getUserByShortId({
    guild: BigInt(guild),
    id,
  });
  console.log('用户 ID =', channels);
}

main();