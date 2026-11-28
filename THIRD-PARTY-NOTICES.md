# Third-party notices

転用したデータ・コードの出典とライセンスを記録する（原則 V）。

| もの | 出典 | ライセンス | 使い方 |
| --- | --- | --- | --- |
| 種族値・技・特性・道具・相性・性格・覚える技のデータ | [Pokémon Showdown](https://github.com/smogon/pokemon-showdown)（`pokemon-showdown` npm 0.11.11） | MIT（Copyright (c) 2011-2026 Guangcong Luo and other contributors） | `tools/oracle/export_dex.mjs` で書き出し、`src/pokesv_sim/data/` に生成 |
| 能力値・ダメージ計算・行動順・乱数（第5世代 LCG）の式、技・特性・道具・状態・場の処理、ランダム AI の選び方 | 同上（`sim/`、`data/moves.ts`、`data/abilities.ts`、`data/items.ts`、`data/conditions.ts` ほか） | MIT | 式と手順を Python に写した |
| ダメージ計算の期待値 | [@smogon/calc](https://github.com/smogon/damage-calc) 0.12.0 | MIT | 照合テストの期待値の生成（開発時のみ） |
| 日本語名 | [PokeAPI](https://github.com/PokeAPI/pokeapi) の CSV | BSD-3-Clause（Copyright (c) 2013–2023 Paul Hallett and PokéAPI contributors） | `tools/build_data.py` で生成データに付与 |
| ブラウザ内の Python の実行環境 | [Pyodide](https://github.com/pyodide/pyodide/tree/0.27.7) 0.27.7 | MPL-2.0 | 公開版が、改変せずに配る（`pyodide/` の `pyodide.js`・`pyodide.asm.js`・`pyodide.asm.wasm`・`pyodide-lock.json`。取得と同梱は `tools/build_offline.py`） |
| Python 本体と標準ライブラリ（Pyodide に含まれる） | [CPython](https://github.com/python/cpython/tree/v3.12.7) 3.12 | PSF License Version 2（Copyright (c) Python Software Foundation） | 公開版が配る（`pyodide.asm.wasm`、`python_stdlib.zip`） |
| Pyodide のビルドに含まれる部品 | [Emscripten](https://github.com/emscripten-core/emscripten) ほか | Emscripten は MIT / University of Illinois/NCSA。ほかの部品は未確認 | 公開版が配る（`pyodide.asm.js`・`pyodide.asm.wasm` の中。ほかの部品の一覧は未確認） |
| ポケモンの画像（同梱しない） | [PokeAPI/sprites](https://github.com/PokeAPI/sprites) | リポジトリは CC0-1.0。画像の著作権は The Pokémon Company | 遊ぶときに利用者のブラウザが読み込む。このプロジェクトからは配らない |
| レギュF の大会のチーム 1,459（選手・大会・順位・持ち物・特性・テラスタイプ・技） | [Limitless VGC](https://limitlessvgc.com/)（調査用フォルダ `sandbox/pokesv-regf-kit` が 2026-10 に取得） | 明示なし（公開ページの記録。研究・個人利用に限る。元のリポジトリは非公開で、公開版には選手名を除いて含む） | `tools/import_regf.py` で `src/pokesv_sim/data/regf_teams.json` に取り込み（018） |
| 努力値配分・性格の採用率 | [Smogon の詳細統計](https://www.smogon.com/stats/)（`gen9vgc2024regfbo3` 2024-02・03、`gen9vgc2026regfbo3` 2026-01・02、レート1760以上） | 明示なし（公開の統計） | 種族ごとのいちばん多い型を `regf_spreads.json` に（018） |
| レギュF の規則（Flat Rules） | Pokémon Showdown 0.11.11 `data/rulesets.js` | MIT | `src/pokesv_sim/data/regulations.json` に手で写した（018） |

ポケモンの名前・数値データに関する権利は、株式会社ポケモン・任天堂・クリーチャーズ・ゲームフリークにある。本プロジェクトは非公式。
