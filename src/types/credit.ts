/**
 * 卡槽插槽信息。
 */
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

/**
 * 成员卡槽信息。
 */
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

export default GuildCredit;
