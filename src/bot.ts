/**
 * 定义开放平台机器人。
 */

import { requester, send } from '@/util';

import type {
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
}
