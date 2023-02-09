export enum Permissions {
  /**
   * 创建邀请链接。
   */
  'CREATE_INSTANT_INVITE' = 2 ** 0,
  /**
   * 踢出成员。
   */
  'KICK_MEMBERS' = 2 ** 1,
  /**
   * @deprecated 未定义
   */
  'BAN_MEMBERS' = 2 ** 2,
  /**
   * 超级管理员（所有权限，与服务器主相同）。
   */
  'ADMINISTRATOR' = 2 ** 3,
  /**
   * 管理频道。
   */
  'MANAGE_CHANNELS' = 2 ** 4,
  /**
   * 管理服务器。
   */
  'MANAGE_GUILD' = 2 ** 5,
  /**
   * 对消息表态。
   */
  'ADD_REACTIONS' = 2 ** 6,
  /**
   * @deprecated 未定义
   */
  'VIEW_AUDIT_LOG' = 2 ** 7,
  /**
   * @deprecated 未定义
   */
  'PRIORITY_SPEAKER' = 2 ** 8,
  /**
   * @deprecated 未定义
   */
  'STREAM' = 2 ** 9,
  /**
   * 查看频道。
   */
  'VIEW_CHANNEL' = 2 ** 10,
  /**
   * 发送消息。
   */
  'SEND_MESSAGES' = 2 ** 11,
  /**
   * @deprecated 未定义
   */
  'SEND_TTS_MESSAGES' = 2 ** 12,
  /**
   * 管理消息。
   */
  'MANAGE_MESSAGES' = 2 ** 13,
  /**
   * @deprecated 未定义
   */
  'EMBED_LINKS' = 2 ** 14,
  /**
   * @deprecated 未定义
   */
  'ATTACH_FILES' = 2 ** 15,
  /**
   * 查看历史消息。
   */
  'READ_MESSAGE_HISTORY' = 2 ** 16,
  /**
   * at 所有人。
   */
  'MENTION_EVERYONE' = 2 ** 17,
  /**
   * @deprecated 未定义
   */
  'USE_EXTERNAL_EMOJIS' = 2 ** 18,
  /**
   * @deprecated 未定义
   */
  'VIEW_GUILD_INSIGHTS' = 2 ** 19,
  /**
   * 进入语音频道。
   */
  'CONNECT' = 2 ** 20,
  /**
   * 语音频道发言。
   */
  'SPEAK' = 2 ** 21,
  /**
   * 语音频道禁言成员。
   */
  'MUTE_MEMBERS' = 2 ** 22,
  /**
   * @deprecated 未定义
   */
  'DEAFEN_MEMBERS' = 2 ** 23,
  /**
   * 语音频道踢出成员。
   */
  'MOVE_MEMBERS' = 2 ** 24,
  /**
   * @deprecated 未定义
   */
  'USE_VAD' = 2 ** 25,
  /**
   * @deprecated 未定义
   */
  'CHANGE_NICKNAME' = 2 ** 26,
  /**
   * @deprecated 未定义
   */
  'MANAGE_NICKNAMES' = 2 ** 27,
  /**
   * 管理角色。
   */
  'MANAGE_ROLES' = 2 ** 28,
  /**
   * @deprecated 未定义
   */
  'MANAGE_WEBHOOKS' = 2 ** 29,
  /**
   * 管理表情符号。
   */
  'MANAGE_EMOJIS_AND_STICKERS' = 2 ** 30,
  /**
   * 管理圈子。
   */
  'MANAGE_CIRCLE' = 2 ** 31,
  /**
   * @deprecated 未定义
   */
  'REQUEST_TO_SPEAK' = 2 ** 32,
  // 文档中不存在 `2 ** 33`
  'MANAGE_THREADS' = 2 ** 34,
  /**
   * @deprecated 未定义
   */
  'USE_PUBLIC_THREADS' = 2 ** 35,
  /**
   * @deprecated 未定义
   */
  'USE_PRIVATE_THREADS' = 2 ** 36,
  /**
   * @deprecated 未定义
   */
  'USE_EXTERNAL_STICKERS' = 2 ** 37,
}
