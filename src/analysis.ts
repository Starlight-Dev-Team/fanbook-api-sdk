/**
 * 自定义数据类型转换为原生 API 数据类型。
 */

import type * as native from '@/interface';
import type * as types from '@/types';

export function guildCredit(data: types.GuildCredit): {
  id: string;
  credit: native.GuildCredit;
} {
  const slots: native.GuildCredit['slots'] = [];
  for (const row of data.slots) {
    const res: native.GuildCredit['slots'][0] = [];
    for (const { image, label, value } of row) {
      res.push({
        img: image,
        label,
        value,
      });
    }
  }
  return {
    id: data.id,
    credit: {
      authority: data.authority,
      slots,
      title: {
        img: data.title.icon,
      },
    },
  };
}
