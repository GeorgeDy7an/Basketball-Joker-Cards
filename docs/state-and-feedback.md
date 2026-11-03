# 技术思考：操作反馈与进度保存

[English](#english)

## 问题

出牌、弃牌和阵容调整是高频操作。如果每次点击都等待远程确认，反馈会显得迟缓；但如果只更新画面而忽略持久化，重新打开游戏时可能出现进度不一致。设计重点是同时考虑响应速度和记录可靠性。

## 处理方式

把玩家眼前的交互状态与需要持久保存的进度分开考虑：游戏操作先得到清晰的界面反馈；需要确认的操作通过记录、回执和恢复流程处理。重新进入时，要能够识别未完成或结果不明确的操作，避免把“没有收到响应”误认为“操作一定没有执行”。

对于可能产生资源变化的操作，重复点击和重试需要特别关注：同一操作应能够对应同一份结果，而不是仅靠按钮禁用防止重复。保存失败时保留已有记录，并给出明确的恢复路径。

## 验证思路

通过隔离环境中的测试，检查保存后重开、请求响应丢失后的重试、不同账户或会话切换，以及存储不可用等情况。浏览器模拟和真实设备验证是不同层级；前者通过不能自动证明所有平台环境都已验证。

这里介绍设计原则，不公开生产存档格式、服务端接口或完整恢复实现。

<a id="english"></a>
# Technical notes: interaction feedback and saved progress

## The problem

Playing cards, discarding, and adjusting a lineup happen often. Waiting for a remote confirmation after every tap can make the game feel slow; updating only the screen without durable storage can leave progress inconsistent after reopening. The design must consider both responsiveness and recoverability.

## The approach

Treat visible interaction state and durable progress as related but distinct concerns. An action should receive clear interface feedback; operations requiring confirmation need a record, a receipt, and a recovery path. On re-entry, an unfinished or ambiguous operation must be recognized: a missing response does not prove that the operation did not happen.

For operations that change resources, repeat taps and retries deserve special attention. One operation should correspond to one result; disabling a button alone is not a complete duplicate-prevention strategy. If saving fails, existing records should be preserved and the recovery path made clear.

## Validation

Use isolated tests to examine reopening after a save, retrying after a lost response, account or session changes, and unavailable storage. Browser simulations and real-device checks are different levels of evidence: a simulated pass does not establish that every platform environment has been verified.

This document describes design principles without publishing the production save format, backend interfaces, or complete recovery implementation.
