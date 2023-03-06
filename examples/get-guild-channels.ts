/**
 * 获取服务器频道列表示例。
 */

import * as fanbook from '@starlight-dev-team/fanbook-api-sdk';

const token = ''; // 机器人令牌
const guild = ''; // 服务器 ID （字符串形式）

const bot = new fanbook.Bot(token);

async function main() {
  const channels = await bot.getGuildChannels({
    guild: BigInt(guild),
  });
  console.log('频道列表 = ', channels);
}

main();