/**
 * 自定义数据类型转换为原生 API 数据类型。
 */

import type * as native from '@/interface';
import type * as types from '@/types';

export function guildCredit(data: types.GuildCredit): {
  id: string;
  credit: native.GuildCredit;
} {
  return {
    id: data.id,
    credit: {
      authority: data.authority,
      slots: data.slots,
      title: {
        img: data.title.icon,
      },
    },
  };
}
