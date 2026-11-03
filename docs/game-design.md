# 玩法设计：篮球阵容 × 扑克牌型

[English](#english)

## 问题

篮球题材与牌型构筑各有自己的决策方式：前者强调球员与阵容，后者强调牌型、手牌和资源管理。把它们放在一起时，球员不能只是一张装饰图，也不能让玩家记住一整页额外规则才能出牌。

## 设计思路

一局从有限的球员组合开始。玩家根据可用手牌选择出牌或弃牌；牌型提供基础得分，球员能力在特定条件下参与计分。能力的条件可以与打法牌、牌型或当前阵容有关，因此同一手牌在不同球队中可能形成不同的选择。

关卡目标与可用操作次数提供短期约束；通过关卡后，市场提供签入球员或训练等选择。市场中的变化属于当前对局，不应被表述成永久收藏。永久球员则通过收藏与招募等系统管理。

## 取舍

- **可读性**：在比赛界面保留球员、教练、队徽和手牌；技能效果用文字解释，避免只依赖装饰性图形。
- **信息层次**：比赛中突出当前分数与目标；更详细的效果放在球员详情和规则说明中。
- **可扩展性**：牌型、球员能力和关卡约束分别建模，使不同组合可以围绕明确的条件参与一手牌的结算。

本仓库的演示只说明牌型判断与计分关系，不含正式游戏的完整球员能力、抽取或数值。

<a id="english"></a>
# Game design: basketball lineups × poker hands

## The problem

Basketball lineups and poker-hand builders ask players to make different kinds of decisions. Combining them means players should matter beyond artwork, without adding so much information that a player must study a full manual before playing a hand.

## The approach

A run starts with a limited lineup. The player selects cards to play or discard; the hand supplies a base score, and player abilities can participate when their conditions are met. Conditions may involve play styles, hand types, or the lineup, so the same cards can suggest different decisions for different teams.

A round target and limited actions create a short-term constraint. Between rounds, market choices allow the player to sign a player or train a hand type. A market change belongs to the current run and should not be presented as a permanent collection unlock. Permanent players are managed through the collection and recruitment systems.

## Design trade-offs

- **Readability:** Keep the lineup, coach, badge, and hand visible. Explain ability effects in words rather than relying only on decoration.
- **Hierarchy:** Emphasize the current score and target during play, with details available through player and rules views.
- **Extensibility:** Model hand types, abilities, and round constraints separately so each can contribute through explicit conditions.

The demonstration in this repository only illustrates hand recognition and scoring. It does not include the full player abilities, recruitment, or production balance.
