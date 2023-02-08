export interface GuildCredit {
  /**
   * 卡槽颁发者。
   */
  authority: CreditAuthority;
  /**
   * 卡槽标题，显示在用户名左边。
   */
  title: CreditTitle;
  /**
   * 卡槽数据。
   */
  slots: CreditSlot[][];
}

export interface CreditAuthority {
  /**
   * 卡槽颁发者图片地址。
   */
  icon: string;
  /**
   * 卡槽颁发者名称。
   */
  name: string;
}

export interface CreditTitle {
  /**
   * 显示的勋章图片地址。
   */
  img: string;
}

export interface CreditSlot {
  /**
   * `value` 的灰色文字前缀。
   *
   * 与 `img` 和 `badge` 互斥。
   */
  label?: string;
  /**
   * 图片地址。
   *
   * 与 `label` 和 `badge` 互斥。
   */
  img?: string;
  /**
   * 内联排版的图片地址。
   *
   * 与 `label` 和 `img` 互斥。
   */
  badge?: string;
  /**
   * 卡槽值。
   */
  value: string;
}

export default GuildCredit;
