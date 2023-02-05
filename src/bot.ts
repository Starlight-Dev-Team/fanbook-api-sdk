/**
 * 定义开放平台机器人。
 */

import { requester, send } from '@/util';

import type {
  Chat,
  FormattingOptions,
  Message,
  User,
} from './interface';

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
  parseMode?: FormattingOptions;
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
    const res: User = await send(requester.post(`${this.publicPath}/getMe`));
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
    const res: Message = await send(requester.post(
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
    const res: Chat = await send(requester.post(
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
}
