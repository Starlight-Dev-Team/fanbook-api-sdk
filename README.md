# Fanbook API SDK

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" />
  <img src="https://shields.io/github/issues/Starlight-Dev-Team/fanbook-api-sdk?style=flat-square" />
  <img src="https://shields.io/github/issues-pr/Starlight-Dev-Team/fanbook-api-sdk?style=flat-square" />
</p>

Fanbook 开放平台接口 Node.js SDK 。

# 概述

[Fanbook 开发者平台](https://open.fanbook.mobi/)提供了一系列服务端 API 来实现多元化的功能，但在实际开发中感受并不流畅——特别是阅读 API 文档的时候。

为了避免过重的心智负担和重复编码，我们编写了 Node.js SDK ，将不友好的点**⛳内置处理**，并提供完整的**✨类型系统**，提高开发体验。

# 安装

建议使用 Node.js 16/18，至少需要 Node.js 10.0.4 。

## npm

```bash
npm install @starlight-dev-team/fanbook-api-sdk
```

## yarn

```bash
yarn add @starlight-dev-team/fanbook-api-sdk
```

# 如何使用

## 导入 SDK

同时支持 ECMAScript 和 CommonJS ，并支持原生 JavaScript 和 TypeScript 的使用。

推荐使用 [TypeScript](https://www.typescriptlang.org/) ，其拥有更完善类型系统，并支持所有 JavaScript 语法。

TypeScript：

```ts
import * as fanbook from '@starlight-dev-team/fanbook-api-sdk';
```

CommonJS：

```js
const fanbook = require('@starlight-dev-team/fanbook-api-sdk');
```

ECMAScript：

```js
import * as fanbook from '@starlight-dev-team/fanbook-api-sdk';
```

## 调用 API

SDK 提供了语义化的调用方式，只要构造出 App 或 Bot 实例，即可像普通函数一样调用 Fanbook API 。

### 创建实例

实例分 App 和 Bot 两种类型：

- App 是应用，目前主要用于 [OAuth2.0 登录授权](https://open.fanbook.mobi/document/manage/doc/Oauth2.0%20AP) 。
- Bot 是机器人，用于操作服务器资源，如发送消息、禁言成员。

创建 App 实例：

```ts
import * as fanbook from '@starlight-dev-team/fanbook-api-sdk';
const app = new fanbook.App(
  '', // 应用的 Client ID
  '', // 应用的 Client Secret
  '', // 应用的 Public Key ，目前建议传入空字符串
  '', // 应用的 OAuth2.0 重定向地址
);
```

创建 Bot 实例：

```ts
import * as fanbook from '@starlight-dev-team/fanbook-api-sdk';
const bot = new fanbook.Bot(
  '', // 机器人令牌
);
```

# 代码示例

- [OAuth2.0 换发 token 并获取用户信息](./examples/oauth2.ts)

# 联系我们

如果你发现了 bug 或需要新功能，请[提一个 issue](https://github.com/Starlight-Dev-Team/fanbook-api-sdk/new) 。

如果你有 new ideas ，可以[发个讨论帖](https://github.com/Starlight-Dev-Team/fanbook-api-sdk/discussions/new/choose)

如果你也想贡献一份力量，请看 [discussion #1](https://github.com/Starlight-Dev-Team/fanbook-api-sdk/discussions/1)。