export enum Permissions {
  /**
   * 创建邀请链接。
   */
  'CREATE_INSTANT_INVITE' = 1 << 0,
  /**
   * 踢出成员。
   */
  'KICK_MEMBERS' = 1 << 1,
  /**
   * @deprecated 未定义
   */
  'BAN_MEMBERS' = 1 << 2,
  /**
   * 超级管理员（所有权限，与服务器主相同）。
   */
  'ADMINISTRATOR' = 1 << 3,
  /**
   * 管理频道。
   */
  'MANAGE_CHANNELS' = 1 << 4,
  /**
   * 管理服务器。
   */
  'MANAGE_GUILD' = 1 << 5,
  /**
   * 对消息表态。
   */
  'ADD_REACTIONS' = 1 << 6,
  /**
   * @deprecated 未定义
   */
  'VIEW_AUDIT_LOG' = 1 << 7,
  /**
   * @deprecated 未定义
   */
  'PRIORITY_SPEAKER' = 1 << 8,
  /**
   * @deprecated 未定义
   */
  'STREAM' = 1 << 9,
  /**
   * 查看频道。
   */
  'VIEW_CHANNEL' = 1 << 10,
  /**
   * 发送消息。
   */
  'SEND_MESSAGES' = 1 << 11,
  /**
   * @deprecated 未定义
   */
  'SEND_TTS_MESSAGES' = 1 << 12,
  /**
   * 管理消息。
   */
  'MANAGE_MESSAGES' = 1 << 13,
  /**
   * @deprecated 未定义
   */
  'EMBED_LINKS' = 1 << 14,
  /**
   * @deprecated 未定义
   */
  'ATTACH_FILES' = 1 << 15,
  /**
   * 查看历史消息。
   */
  'READ_MESSAGE_HISTORY' = 1 << 16,
  /**
   * at 所有人。
   */
  'MENTION_EVERYONE' = 1 << 17,
  /**
   * @deprecated 未定义
   */
  'USE_EXTERNAL_EMOJIS' = 1 << 18,
  /**
   * @deprecated 未定义
   */
  'VIEW_GUILD_INSIGHTS' = 1 << 19,
  /**
   * 进入语音频道。
   */
  'CONNECT' = 1 << 20,
  /**
   * 语音频道发言。
   */
  'SPEAK' = 1 << 21,
  /**
   * 语音频道禁言成员。
   */
  'MUTE_MEMBERS' = 1 << 22,
  /**
   * @deprecated 未定义
   */
  'DEAFEN_MEMBERS' = 1 << 23,
  /**
   * 语音频道踢出成员。
   */
  'MOVE_MEMBERS' = 1 << 24,
  /**
   * @deprecated 未定义
   */
  'USE_VAD' = 1 << 25,
  /**
   * @deprecated 未定义
   */
  'CHANGE_NICKNAME' = 1 << 26,
  /**
   * @deprecated 未定义
   */
  'MANAGE_NICKNAMES' = 1 << 27,
  /**
   * 管理角色。
   */
  'MANAGE_ROLES' = 1 << 28,
  /**
   * @deprecated 未定义
   */
  'MANAGE_WEBHOOKS' = 1 << 29,
  /**
   * 管理表情符号。
   */
  'MANAGE_EMOJIS_AND_STICKERS' = 1 << 30,
  /**
   * 管理圈子。
   */
  'MANAGE_CIRCLE' = 1 << 31,
  /**
   * @deprecated 未定义
   */
  'REQUEST_TO_SPEAK' = 1 << 32,
  // 文档中不存在 `1 << 33`
  'MANAGE_THREADS' = 1 << 34,
  /**
   * @deprecated 未定义
   */
  'USE_PUBLIC_THREADS' = 1 << 35,
  /**
   * @deprecated 未定义
   */
  'USE_PRIVATE_THREADS' = 1 << 36,
  /**
   * @deprecated 未定义
   */
  'USE_EXTERNAL_STICKERS' = 1 << 37,
}
