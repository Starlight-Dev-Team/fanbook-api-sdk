/**
 * 获取频道成员列表示例。
 */

import * as fanbook from '@starlight-dev-team/fanbook-api-sdk';

const token = ''; // 机器人令牌
const guild = ''; // 服务器 ID （字符串形式）
const channel = ''; // 频道 ID （字符串形式）

const bot = new fanbook.Bot(token);

async function main() {
  const channels = await bot.getChannelMembers({
    guild: BigInt(guild),
    channel: BigInt(channel),
    range: { // 分页获取
      start: 1,
      end: 10,
    },
  });
  // 过滤了角色，所以实际数据数量 ≤ 10
  console.log('部分成员列表 = ', channels);
}

main();