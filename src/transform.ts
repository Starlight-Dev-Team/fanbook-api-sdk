/**
 * 原生 API 数据类型转换为自定义数据类型。
 */

import type * as native from '@/interface';
import type * as types from '@/types';

/**
 * 原生 OAuth2.0 授权回传信息。
 */
export interface NativeSession {
  access_token: string;
  refresh_token: string;
  token_type: 'bearer';
  expires_in: number;
}
export function session(native: NativeSession): types.Session {
  return {
    accessToken: native.access_token,
    refreshToken: native.refresh_token,
    tokenType: native.token_type,
    expires: new Date(Date.now() + native.expires_in * 1000), // 当前时间加有效时间（秒）
  };
}

export function user(native: native.User): types.Profile {
  const username = Number(native.username);
  const hasAvatar = Reflect.has(native, 'avatar');
  return {
    uuid: native.id,
    isBot: native.is_bot,
    avatar: hasAvatar ? Reflect.get(native, 'avatar') : undefined,
    name: native.first_name,
    id: Number.isNaN(username) ? undefined : username, // 机器人 username 是字符串
    privacyMode: native.can_read_all_group_messages,
    isPending: native.pending,
  };
}

export function role(native: native.GuildRole): types.GuildRole {
  // 原样返回 `id` `name` `position` `permissions` `color` ，并修改 `member_count` 键名
  return {
    id: native.id,
    name: native.name,
    position: native.position,
    permissions: native.permissions,
    color: native.color,
    memberCount: native.member_count,
  };
}

export type NativeGuildCredit = [{
  user_id: string;
  credits: Record<string, {
    bot_id: bigint;
    card_id: string;
    content: string;
    title: native.CreditTitle;
    v: number;
    visible: boolean;
    index: number;
  }>;
}];
export function guildCredit(native: NativeGuildCredit): types.GuildCredit[] {
  const res: types.GuildCredit[] = [];
  // 遍历卡槽数组
  for (const id of Object.keys(native)) {
    const item = native[0].credits[id];
    const content: native.GuildCredit = JSON.parse(item.content);
    // 修改每个插槽的 `img` 键为 `image`
    const slots: types.GuildCreditSlot[][] = [];
    for (const arr of content.slots) {
      const slot: types.GuildCreditSlot[] = [];
      for (const { value, label, img, badge } of arr) {
        slot.push({
          value,
          label,
          image: img ?? badge,
        });
      }
      slots.push(slot);
    }
    // 处理完成，加入返回值数组
    res.push({
      id,
      authority: {
        icon: content.authority.icon,
        name: content.authority.name,
      },
      title: {
        icon: content.title.img,
      },
      slots,
    });
  }
  return res;
}
