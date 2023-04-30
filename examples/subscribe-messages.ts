/**
 * 订阅消息示例。
 */

import * as fanbook from '@starlight-dev-team/fanbook-api-sdk';

const token = ''; // 机器人令牌

const bot = new fanbook.Bot(token);

async function main() {
  await bot.subscribeMessages({
    onMessage(data) {
      console.log('消息内容 = ', data);
    },
    onClose() {
      console.log('连接关闭');
    },
    onError(ev) {
      console.error('错误信息 = ', ev);
    },
  });
  console.log('连接建立');
}

main();