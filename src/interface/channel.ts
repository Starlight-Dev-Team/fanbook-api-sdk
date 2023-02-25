export enum ChannelType {
  /** 文字频道。 */
  'TEXT_CHANNEL' = 0,
  /** 语音频道。 */
  'VOICE_CHANNEL' = 1,
  /** 视频频道。 */
  'VIDEO_CHANNEL' = 2,
  /** 私聊， */
  'DMC_CHANNEL' = 3,
  /** 频道分类。 */
  'CLASS_CHANNEL' = 4,
  /** 圈子频道。 */
  'CIRCLE_CHANNEL' = 5,
  /** 直播频道。 */
  'LIVE_STREAM_CHANNEL' = 6,
  /** 链接频道。 */
  'LINK_CHANNEL' = 7,
  /** 直播房间。 */
  'LIVE_ROOM_CHANNEL' = 8,
  /** 任务频道。 */
  'TASK_INDOCTION' = 9,
  /** 群聊。 */
  'GroupDMChannel' = 10,
}

export interface Channel {
  /** 频道 ID 。 */
  channel_id: string;
  /** 频道类型。 */
  type: ChannelType;
  /** 频道所属服务器 ID 。 */
  guild_id: string;
  /** 频道名称。 */
  name: string;
  /** 频道图标。 */
  icon?: string;
  /** 频道人数限制 */
  user_limit?: string;
  /** 频道所有者 ID 。 */
  owner_id?: string;
  /** 频道主题。 */
  topic?: string;
  /** 频道权限覆盖数据。 */
  permission_overwrites: /* unresolved */ any[];
}
