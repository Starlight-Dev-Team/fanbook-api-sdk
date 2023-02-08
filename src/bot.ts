/**
 * 定义开放平台机器人。
 */

import { requester, send } from '@/util';

import type * as fb from './interface';

export interface Profile {
  /**
   * 唯一 ID 。
   */
  uuid: bigint;
  /**
   * 是否机器人
   */
  isBot?: boolean;
  /**
   * 名称。
   */
  name: string;
  /**
   * Fanbook # 。
   */
  id?: number;
  /**
   * privacy mode 是否开启。
   */
  privacyMode?: boolean;
  /**
   * 是否未完成入门仪式。
   */
  isPending?: boolean;
}

export interface GuildRole {
  /**
   * 角色 ID 。
   */
  id: bigint;
  /**
   * 角色名称。
   */
  name: string;
  /**
   * 角色优先级。
   */
  position: number;
  /**
   * 角色权限。
   */
  permissions: fb.Permissions;
  /**
   * 角色昵称颜色。
   */
  color: number;
  /**
   * 成员数量。
   */
  memberCount?: number;
}

export interface GuildCreditSlot {
  /**
   * 卡槽项描述。
   */
  value: string;
  /**
   * 卡槽项为文字时，值的灰色前缀。
   */
  label?: string;
  /**
   * 卡槽项为图片时，图片的地址。
   */
  image?: string;
}

export interface GuildCredit {
  /**
   * 卡槽自定义 ID 。
   */
  id: string;
  /**
   * 卡槽颁发者数据。
   */
  authority: {
    /**
     * 颁发者图片地址。
     */
    icon: string;
    /**
     * 颁发者文字标题。
     */
    name: string;
  };
  /**
   * 显示在昵称前的组件数据。
   */
  title: {
    /**
     * 显示在昵称前的图片地址。
     */
    icon: string;
  };
  /**
   * 卡槽插槽。
   */
  slots: GuildCreditSlot[][];
}

export interface SendMessageConfig {
  /**
   * 目标聊天。
   */
  chat: bigint;
  /**
   * 消息内容。
   */
  text: string;
  /**
   * 消息内容解析方式。
   *
   * 纯文本消息本项不填，否则填 `Fanbook` 。
   */
  parseMode?: fb.FormattingOptions;
  /**
   * 是否仅发送者和@到的人可见。
   */
  isOnlyParticipantsCanRead?: boolean;
  /**
   * 所回复的消息。
   */
  replyTo?: bigint;
  /**
   * 是否不允许消息被表态。
   */
  isUnreactive?: boolean;
  /**
   * 消息简介。
   *
   * 纯文本，在私聊列表里显示。
   */
  description: string;
  /**
   * 是否临时消息。
   *
   * 临时消息不持久化、不多端同步、无法撤回，清除缓存后消失。
   */
  isEphemeral?: boolean;
  /**
   * 能收到消息的用户。
   *
   * 仅 `isEphemeral` 为 `true` 时有效，为空时发给所有在线用户。
   */
  sendTo?: bigint[];
}

export interface KickUserConfig {
  /**
   * 服务器 ID 。
   */
  guild?: bigint;
  /**
   * 聊天 ID 。
   */
  chat?: bigint;
}

/**
 * 开放平台机器人。
 */
export class Bot {
  /**
   * 机器人 API 公共前缀路径。
   */
  public readonly publicPath: string = `/api/bot/${this.token}`;

  constructor(
    /**
     * 机器人令牌。
     */
    private readonly token: string,
  ) {}

  /**
   * 获取机器人信息。
   */
  public async getProfile(): Promise<Profile> {
    const res: fb.User = await send(requester.post(`${this.publicPath}/getMe`));
    const username = Number(res.username);
    return {
      uuid: res.id,
      isBot: res.is_bot,
      name: res.first_name,
      id: Number.isNaN(username) ? undefined : username, // 机器人 username 是字符串
      privacyMode: res.can_read_all_group_messages,
      isPending: false, // 机器人不需要入门仪式
    };
  }

  /**
   * 发送消息。
   * @param config 配置项
   * @returns 消息 ID
   */
  public async sendMessage(config: SendMessageConfig): Promise<bigint> {
    const data = {
      chat_id: config.chat,
      text: config.text,
      parse_mode: config.parseMode,
      selective: config.isOnlyParticipantsCanRead,
      reply_to_message_id: config.replyTo,
      unreactive: config.isUnreactive ? 1 : 0,
      desc: config.description,
      ephemeral: config.isEphemeral,
      // 如果 `isEphemeral` 为空，则不传入此项。
      // 否则，此项默认为 `['all']`
      users: config.isEphemeral ? (config.sendTo ?? ['all']) : undefined,
    };
    const res: fb.Message = await send(requester.post(
      `${this.publicPath}/sendMessage`,
      data,
    ));
    return res.message_id;
  }

  /**
   * 撤回消息。
   *
   * 机器人发送消息后，可在一定内撤回。
   *
   * 机器人有**对应频道**的“管理消息”权限时，可以撤回**任意消息**（特殊声明除外）。
   * @param chat 聊天 ID
   * @param message 消息 ID
   */
  public async deleteMessage(chat: bigint, message: bigint): Promise<void> {
    await send(requester.post(
      `${this.publicPath}/deleteMessage`,
      {
        chat_id: chat,
        message_id: message,
      },
    ));
  }

  /**
   * 获取与用户的私聊。
   *
   * 机器人需要与用户有共同服务器。
   * @param user 用户 ID
   * @returns 聊天 ID
   */
  public async getPrivateChat(user: bigint): Promise<bigint> {
    const res: fb.Chat = await send(requester.post(
      `${this.publicPath}/getPrivateChat`,
      { user_id: user },
    ));
    return res.id;
  }

  /**
   * 禁言用户。
   * @param guild 目标服务器 ID
   * @param user 目标用户 ID
   * @param duration 禁言时长（单位：秒）
   */
  public async banUserSpeaking(
    guild: bigint,
    user: bigint,
    duration: number,
  ): Promise<void> {
    await send(requester.post(
      `${this.publicPath}/forbidUserSpeaking`,
      {
        target_uid: String(user),
        target_guild_id: String(guild),
        duration_in_second: duration,
      },
    ));
  }

  /**
   * 踢出用户。
   * @param user 用户 ID
   * @param config 配置操作所在服务器或频道
   */
  public async kickUser(user: bigint, config: KickUserConfig): Promise<void> {
    await send(requester.post(
      `${this.publicPath}/kickChatMember`,
      {
        user_id: user,
        chat_id: config.chat,
        guild_id: config.guild,
      },
    ));
  }

  /**
   * 获取服务器角色列表。
   * @param guild 服务器 ID
   */
  public async getGuildRoles(guild: bigint): Promise<GuildRole[]> {
    const res: fb.GuildRole[] = await send(requester.post(
      `${this.publicPath}/getGuildRoles`,
      {
        guild_id: guild,
      },
    ));
    // 原样返回 `id` `name` `position` `permissions` `color` ，并修改 `member_count` 键名
    const res2: GuildRole[] = [];
    for (const { id, name, position, permissions, color, member_count } of res) {
      res2.push({
        id, name, position, permissions, color, memberCount: member_count,
      });
    }
    return res2;
  }

  /**
   * 设置指定服务器成员的角色。
   * @param guild 服务器 ID
   * @param user 用户 ID
   * @param roles 角色 ID 数组
   * @param operation 是给用户添加（`add`）还是移除（`del`）角色，默认 `add`
   */
  public async setGuildUserRoles(
    guild: bigint,
    user: bigint,
    roles: bigint[],
    operation: 'add' | 'del' = 'add',
  ): Promise<void> {
    await send(requester.post(
      `${this.publicPath}/v2/setMemberRoles`,
      {
        guild_id: guild,
        user_id: user,
        roles,
        operation,
      },
    ));
  }

  /**
   * 获取成员荣誉卡槽数据。
   */
  public async getGuildUserCredit(
    guild: bigint,
    user: bigint,
  ): Promise<GuildCredit[]> {
    const res: [{
      user_id: string;
      credits: Record<string, {
        bot_id: bigint;
        card_id: string;
        content: string;
        title: fb.CreditTitle;
        v: number;
        visible: boolean;
        index: number;
      }>;
    }] = await send(requester.post(
      `${this.publicPath}/getGuildCredit`,
      {
        guild_id: guild,
        user_id: user,
      },
    ));
    const res2: GuildCredit[] = [];
    // 遍历卡槽数组
    for (const id of Object.keys(res[0].credits)) {
      const item = res[0].credits[id];
      const content: fb.GuildCredit = JSON.parse(item.content);
      // 修改每个插槽的 `img` 键为 `image`
      const slots: GuildCreditSlot[][] = [];
      for (const arr of content.slots) {
        const slot: GuildCreditSlot[] = [];
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
      res2.push({
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
    return res2;
  }
}
