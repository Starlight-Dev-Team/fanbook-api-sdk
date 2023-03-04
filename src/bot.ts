/**
 * 定义开放平台机器人。
 */

import { requester, send } from '@/util';
import * as transform from '@/transform';

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
  public async getProfile(): Promise<types.Profile> {
    return transform.user(await send(requester.post(
      `${this.publicPath}/getMe`,
    )));
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
    const res: native.Message = await send(requester.post(
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
   * 获取服务器中的频道列表。
   * @param guild 服务器 ID
   * @returns 频道 ID
   */
  public async getGuildChannels(guild: bigint): Promise<types.Chat[]> {
    const res: native.Channel[] = await send(requester.post(
      `${this.publicPath}/channel/list`,
      {
        user_id: String((await this.getProfile()).uuid),
        guild_id: String(guild),
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
   * @param guild 服务器 ID
   * @param channel 频道 ID
   * @param range 分页数据
   * @returns 获取到的频道成员
   */
  public async getChannelMembers(
    guild: bigint,
    channel: bigint,
    range: native.Range,
  ): Promise<bigint[]> {
    const user = (await this.getProfile()).uuid;
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
   * @param id Fanbook #
   * @returns 用户 ID
   */
  public async getUserByShortId(guild: bigint, id: number): Promise<bigint> {
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
   * @param user 用户 ID
   * @returns 聊天 ID
   */
  public async getPrivateChat(user: bigint): Promise<bigint> {
    const res: native.Chat = await send(requester.post(
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
  public async getGuildRoles(guild: bigint): Promise<types.GuildRole[]> {
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
  ): Promise<types.GuildCredit[]> {
    return transform.guildCredit(await send(requester.post(
      `${this.publicPath}/getGuildCredit`,
      {
        guild_id: guild,
        user_id: user,
      },
    )));
  }
}
