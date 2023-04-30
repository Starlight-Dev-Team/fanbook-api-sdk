/**
 * 定义开放平台机器人。
 */

import * as WebSocket from 'ws';

import { requester, send } from '@/util';
import * as transform from '@/transform';
import * as analysis from '@/analysis';

import type * as native from '@/interface';
import type * as types from '@/types';

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
  parseMode?: native.FormattingOptions;
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
  target?: bigint[];
}
export interface SubscribeMessagesConfig {
  /**
   * 机器人资料。
   * @default await this.getProfile()
   */
  profile?: types.Profile;
  /**
   * 收到消息后调用的回调。
   * @param message 消息 ID
   */
  onMessage: (data: any) => any;
  /** 连接中断后的回调。 */
  onClose?: (event: WebSocket.CloseEvent) => any;
  /** 发生错误后的回调。 */
  onError?: (event: WebSocket.ErrorEvent) => any;
}
export interface SubscribeMessagesResponse {
  /** 关闭连接。 */
  close: (code?: number, reason?: string) => void;
  /** 发送心跳包。 */
  ping: () => void;
}
export interface DeleteMessageConfig {
  /** 消息所在聊天。 */
  chat: bigint;
  /** 消息 ID 。 */
  message: bigint;
}
export interface GetGuildChannelsConfig {
  /** 服务器 ID 。 */
  guild: bigint;
  /** 机器人信息。 */
  profile?: types.Profile;
}
export interface GetChannelMembersConfig {
  /** 频道所在服务器 ID 。 */
  guild: bigint;
  /** 频道 ID 。 */
  channel: bigint;
  /** 分页数据。 */
  range: native.Range;
  /**
   * 机器人资料。
   * @default await this.getProfile()
   */
  profile?: types.Profile;
}
export interface GetUserByShortIdConfig {
  /** 用户所在频道 ID 。 */
  guild: bigint;
  /** 用户的 Fanbook # 。 */
  id: number;
}
export interface GetPrivateChatConfig {
  /** 目标用户 ID 。 */
  target: bigint;
}
export interface BanUserSpeakingConfig {
  /** 用户所在服务器 ID 。 */
  guild: bigint;
  /** 用户 ID 。 */
  user: bigint;
  /** 禁言分钟数。 */
  duration: number;
}
export interface KickUserConfig {
  /**
   * 服务器 ID 。
   *
   * `chat` 为空时必填。
   */
  guild?: bigint;
  /**
   * 聊天 ID 。
   *
   * `guild` 为空时必填。
   */
  chat?: bigint;
  /** 目标用户。 */
  user: bigint;
}
export interface GetGuildRolesConfig {
  /** 服务器 ID 。 */
  guild: bigint;
}
export interface SetGuildUserRolesConfig {
  /** 服务器 ID 。 */
  guild: bigint;
  /** 目标用户 ID 。 */
  user: bigint;
  /** 需要添加或删除的角色 ID 。 */
  roles: bigint[];
  /** 操作类型，添加或删除。 */
  operation: 'add' | 'del';
}
export interface GetGuildUserCreditConfig {
  /** 服务器 ID 。 */
  guild: bigint;
  /** 用户 ID 。 */
  user: bigint;
}
export interface SetGuildUserCreditConfig {
  /**
   * 服务器 ID 。
   *
   * `chat` 为空时必填。
   */
  guild?: bigint;
  /**
   * 聊天 ID 。
   *
   * `guild` 为空时必填。
   */
  chat?: bigint;
  /** 用户 ID 。 */
  user: bigint;
  /** 荣誉卡槽数据。 */
  credit: types.GuildCredit;
}
export interface DeleteGuildUserCreditConfig {
  /**
   * 服务器 ID 。
   *
   * `chat` 为空时必填。
   */
  guild?: bigint;
  /**
   * 聊天 ID 。
   *
   * `guild` 为空时必填。
   */
  chat?: bigint;
  /** 用户 ID 。 */
  user: bigint;
  /** 要删除的荣誉的自定义 ID 。 */
  card: string;
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
  public async getProfile(): Promise<types.Profile> {
    return transform.user(await send(requester.post(
      `${this.publicPath}/getMe`,
    )));
  }

  /**
   * 发送消息。
   * @returns 消息 ID
   */
  public async sendMessage({
    chat,
    text,
    parseMode,
    isOnlyParticipantsCanRead,
    replyTo,
    isUnreactive,
    description,
    isEphemeral,
    target,
  }: SendMessageConfig): Promise<bigint> {
    const res: native.Message = await send(requester.post(
      `${this.publicPath}/sendMessage`,
      {
        chat_id: chat,
        text,
        parse_mode: parseMode,
        selective: isOnlyParticipantsCanRead,
        reply_to_message_id: replyTo,
        unreactive: isUnreactive ? 1 : 0,
        desc: description,
        ephemeral: isEphemeral,
        // 如果 `isEphemeral` 为空，则不传入此项。
        // 否则，此项默认为 `['all']`
        users: isEphemeral ? (target ?? ['all']) : undefined,
      },
    ));
    return res.message_id;
  }

  /**
   * 订阅消息。
   */
  public subscribeMessages({
    profile,
    onMessage,
    onClose,
    onError,
  }: SubscribeMessagesConfig): Promise<SubscribeMessagesResponse> {
    const initProfile = async(): Promise<void> => {
      if (!profile) profile = await this.getProfile();
    };
    return new Promise((resolve) => {
      initProfile().then(() => {
        const id = (profile as types.Profile).uuid.toString();
        const token = (profile as types.Profile).userToken;
        const properties = {
          platform: 'bot',
          version: '1.6.60',
          channel: 'office',
          device_id: `bot${token}`,
          build_number: 1,
        };
        const url = `wss://gateway-bot.fanbook.mobi/websocket?id=${token}&dId=bot${id}&v=1.6.60&x-super-properties=${btoa(JSON.stringify(properties))}`;
        const ws = new WebSocket(url);
        ws.addEventListener('message', (ev) => {
          const data = JSON.parse((ev.data as Buffer).toString('utf-8'));
          if (data.action !== 'pong') onMessage(data);
        });
        if (onClose) ws.addEventListener('close', (ev) => onClose(ev));
        if (onError) ws.addEventListener('error', (ev) => onError(ev));
        const interval = setInterval(ping, 25 * 1000);
        function ping(): void {
          ws.send('{"type":"ping"}');
        }
        function close(code?: number, reason?: string): void {
          clearInterval(interval);
          ws.close(code, reason);
        }
        ws.addEventListener('open', () => resolve({
          close,
          ping,
        }));
      });
    });
  }

  /**
   * 撤回消息。
   *
   * 机器人发送消息后，可在一定内撤回。
   *
   * 机器人有**对应频道**的“管理消息”权限时，可以撤回**任意消息**（特殊声明除外）。
   */
  public async deleteMessage({
    chat,
    message,
  }: DeleteMessageConfig): Promise<void> {
    await send(requester.post(
      `${this.publicPath}/deleteMessage`,
      {
        chat_id: chat,
        message_id: message,
      },
    ));
  }

  /**
   * 获取服务器中的频道列表。
   * @returns 频道 ID
   */
  public async getGuildChannels({
    guild,
    profile,
  }: GetGuildChannelsConfig): Promise<types.Chat[]> {
    const res: native.Channel[] = await send(requester.post(
      `${this.publicPath}/channel/list`,
      {
        // 如果给定了机器人信息，则使用给定的信息，否则获取当前机器人信息
        user_id: (profile ?? await this.getProfile()).uuid.toString(),
        guild_id: guild.toString(),
      },
    ));
    const res2: types.Chat[] = [];
    for (const item of res) {
      res2.push(transform.channel(item));
    }
    return res2;
  }

  /**
   * 分页获取频道成员。
   * @returns 获取到的频道成员
   */
  public async getChannelMembers({
    guild,
    channel,
    range,
    profile,
  }: GetChannelMembersConfig): Promise<bigint[]> {
    const user = (profile ?? await this.getProfile()).uuid;
    const res: {
      ops: Array<{
        range: [number, number];
        op: 'SYNC';
        items: Array<{
          Group?: {
            id: string;
            name: string;
            count: number;
          };
          User?: {
            user_id: string;
            username: string;
            avatar: string;
            roles: Array<{
              id: string;
              name: string;
            }>;
          };
        }>;
      }>;
    } = await send(requester.post(
      `${this.publicPath}/v2/guild/members`,
      {
        guild_id: String(guild),
        channel_id: String(channel),
        user_id: String(user),
        ranges: [range],
      },
    ));
    const result: bigint[] = [];
    for (const item of res.ops[0].items) {
      if (item.User) {
        result.push(BigInt(item.User.user_id));
      }
    }
    return result;
  }

  /**
   * 通过 Fanbook # 获取用户 ID 。
   * @returns 用户 ID
   */
  public async getUserByShortId({
    guild,
    id,
  }: GetUserByShortIdConfig): Promise<bigint> {
    const res: Array<{
      user: native.User;
      status: 'member';
    }> = await send(requester.post(
      `${this.publicPath}/searchGuildMemberByName`,
      { guild_id: guild, username: [String(id)] },
    ));
    return transform.user(res[0].user).uuid;
  }

  /**
   * 获取与用户的私聊。
   *
   * 机器人需要与用户有共同服务器。
   * @returns 聊天 ID
   */
  public async getPrivateChat({
    target,
  }: GetPrivateChatConfig): Promise<bigint> {
    const res: native.Chat = await send(requester.post(
      `${this.publicPath}/getPrivateChat`,
      { user_id: target },
    ));
    return res.id;
  }

  /**
   * 禁言用户。
   */
  public async banUserSpeaking({
    guild,
    user,
    duration,
  }: BanUserSpeakingConfig): Promise<void> {
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
   */
  public async kickUser({
    guild,
    chat,
    user,
  }: KickUserConfig): Promise<void> {
    await send(requester.post(
      `${this.publicPath}/kickChatMember`,
      {
        user_id: user,
        chat_id: chat,
        guild_id: guild,
      },
    ));
  }

  /**
   * 获取服务器角色列表。
   */
  public async getGuildRoles({
    guild,
  }: GetGuildRolesConfig): Promise<types.GuildRole[]> {
    const res: native.GuildRole[] = await send(requester.post(
      `${this.publicPath}/getGuildRoles`,
      {
        guild_id: guild,
      },
    ));
    const res2: types.GuildRole[] = [];
    for (const item of res) {
      res2.push(transform.role(item));
    }
    return res2;
  }

  /**
   * 设置指定服务器成员的角色。
   */
  public async setGuildUserRoles({
    guild,
    user,
    roles,
    operation,
  }: SetGuildUserRolesConfig): Promise<void> {
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
  public async getGuildUserCredit({
    guild,
    user,
  }: GetGuildUserCreditConfig): Promise<types.GuildCredit[]> {
    return transform.guildCredit(await send(requester.post(
      `${this.publicPath}/getGuildCredit`,
      {
        guild_id: guild,
        user_id: user,
      },
    )));
  }

  /**
   * 设置成员荣誉卡槽数据。
   */
  public async setGuildUserCredit({
    guild,
    chat,
    user,
    credit,
  }: SetGuildUserCreditConfig): Promise<void> {
    const data = analysis.guildCredit(credit);
    await send(requester.put(
      `${this.publicPath}/v2/guild/credit`,
      {
        guild_id: guild?.toString(),
        chat_id: chat,
        user_id: user?.toString(),
        card_id: data.id,
        guild_credit: data.credit,
      },
    ));
  }

  /**
   * 删除成员荣誉卡槽数据。
   */
  public async deleteGuildUserCredit({
    guild,
    chat,
    user,
    card,
  }: DeleteGuildUserCreditConfig): Promise<void> {
    await send(requester.delete(
      `${this.publicPath}/v2/guild/credit`,
      {
        data: {
          guild_id: guild?.toString(),
          chat_id: chat,
          user_id: user.toString(),
          card_id: card,
        },
      },
    ));
  }
}
