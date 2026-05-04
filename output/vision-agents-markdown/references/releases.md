# Releases

Version history for this repository (41 releases).

## v0.5.5: v0.5.5
**Published:** 2026-04-27

## What's Changed
* Bump pytest from 9.0.2 to 9.0.3 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/477
* Adds Grok TTS integration by @amosgyamfi in https://github.com/GetStream/Vision-Agents/pull/433
* Update CLAUDE.md by @dangusev in https://github.com/GetStream/Vision-Agents/pull/499
* Parametrize max tool calling rounds across LLMs by @dangusev in https://github.com/GetStream/Vision-Agents/pull/500
* Bump getstream minimum version to 3.3.0 by @aliev in https://github.com/GetStream/Vision-Agents/pull/504
* Bump dependencies in uv.lock by @dangusev in https://github.com/GetStream/Vision-Agents/pull/503
* add inworld realtime api by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/502
* chore: add commit/pr skills and GitHub PR template by @aliev in https://github.com/GetStream/Vision-Agents/pull/510
* ci: pass INWORLD_API_KEY to e2e test job by @aliev in https://github.com/GetStream/Vision-Agents/pull/511
* Tighten commit and pr skill docs by @aliev in https://github.com/GetStream/Vision-Agents/pull/512
* fix(gemini): route MCP tool schemas through parameters_json_schema by @aliev in https://github.com/GetStream/Vision-Agents/pull/513
* Update XAI realtime model to grok-voice-think-fast-1.0 model by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/515
* docs(skills): flag GitHub paragraph hard-wrap in pr skill by @aliev in https://github.com/GetStream/Vision-Agents/pull/514
* chore(coderabbit): tune review config to reduce noise by @aliev in https://github.com/GetStream/Vision-Agents/pull/517
* chore(coderabbit): disable finishing_touches and pre_merge_checks by @aliev in https://github.com/GetStream/Vision-Agents/pull/518

## New Contributors
* @amosgyamfi made their first contribution in https://github.com/GetStream/Vision-Agents/pull/433

**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.5.4...v0.5.5

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.5.5)

---

## v0.5.4: v0.5.4
**Published:** 2026-04-15

## What's Changed
* Bump uv from 0.11.3 to 0.11.6 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/485
* Bump ruff from 0.15.9 to 0.15.10 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/484
* Bump cryptography from 46.0.6 to 46.0.7 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/479
* Update plugin dependencies: decart 0.0.34, deepgram-sdk 6.1.1, turbopuffer 1.21.0 by @cursor[bot] in https://github.com/GetStream/Vision-Agents/pull/491
* Fix Gemini Realtime infinite error loop on network disconnection by @aliev in https://github.com/GetStream/Vision-Agents/pull/490


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.5.3...v0.5.4

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.5.4)

---

## v0.5.3: v0.5.3
**Published:** 2026-04-14

## What's Changed
* Add support for Savarm AI  by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/488

**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.5.2...v0.5.3

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.5.3)

---

## v0.5.2: v0.5.2
**Published:** 2026-04-13

## What's Changed
* Fix/aws realtime reconnect by @dangusev in https://github.com/GetStream/Vision-Agents/pull/486
* Fix "dict changed size during iteration" in Agent._poll_audio_queues by @dangusev in https://github.com/GetStream/Vision-Agents/pull/487
* Update package to latest version and model by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/446


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.5.1...v0.5.2

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.5.2)

---

## v0.5.1: v0.5.1
**Published:** 2026-04-07

## What's Changed
### Features
* Add AVSynchronizer to sync audio & video playback for Avatars by @dangusev in https://github.com/GetStream/Vision-Agents/pull/466


### Bugfixes
* Fix `Task exception was never retrieved` in Agent._poll_audio_queues on close by @dangusev in https://github.com/GetStream/Vision-Agents/pull/473
* Fix/realtime turn detection fixes (only Gemini and Openai) by @dangusev in https://github.com/GetStream/Vision-Agents/pull/470
* prevent OOM from unconsumed video frames in voice-only agents by @aliev in https://github.com/GetStream/Vision-Agents/pull/458


### Chores
* Refactor hf tool calling by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/455
* Bump getstream minimum version to 3.1.1 by @aliev in https://github.com/GetStream/Vision-Agents/pull/465
* Bump getstream to v3.1.2 by @dangusev in https://github.com/GetStream/Vision-Agents/pull/472
* Configure dependabot.yml to reduce noise by @dangusev in https://github.com/GetStream/Vision-Agents/pull/467
* Bump aiohttp from 3.13.3 to 3.13.4 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/464
* Bump ruff from 0.15.8 to 0.15.9 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/468
* Update requirements in uv.lock by @dangusev in https://github.com/GetStream/Vision-Agents/pull/469

**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.5.0...v0.5.1

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.5.1)

---

## v0.5.0: v0.5.0
**Published:** 2026-04-01

## What's Changed
* fix: close AsyncStream client on session end by @aliev in https://github.com/GetStream/Vision-Agents/pull/457
* Anam avatar plugin by @dangusev in https://github.com/GetStream/Vision-Agents/pull/445
* Update Readme links  by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/462


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.4.7...v0.5.0

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.5.0)

---

## v0.4.7: v0.4.7
**Published:** 2026-03-27

## What's Changed
### Bugfixes
* Pin deepgram version <6.1.0 by @dangusev in https://github.com/GetStream/Vision-Agents/pull/456


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.4.6...v0.4.7

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.4.7)

---

## v0.4.6: v0.4.6
**Published:** 2026-03-27

## What's Changed
### Fixes
* reduce deepgram latency by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/451

### Docs
* Add moderation demo by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/450
* Update Gemini plugin readme by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/454

### Chor
* Bump pyasn1 from 0.6.2 to 0.6.3 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/427
* Fix payload escaping in Slack notification by @dangusev in https://github.com/GetStream/Vision-Agents/pull/452

**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.4.5...v0.4.6

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.4.6)

---

## v0.4.5: v0.4.5
**Published:** 2026-03-25

## What's Changed


### Features
* Feat/aws profile auth support by @Jagdeep1 in https://github.com/GetStream/Vision-Agents/pull/415
* Add a splash screen with the current core version by @dangusev in https://github.com/GetStream/Vision-Agents/pull/447 
* Hide the splash prompt in non-interactive terminals or when `--no-splash` is passed by @dangusev in https://github.com/GetStream/Vision-Agents/pull/449

### Bugfixes
* Fix memory leak: stop stringifying numpy arrays in event logging by @aliev in https://github.com/GetStream/Vision-Agents/pull/444
* fix: non-blocking tool execution in GeminiRealtime by @aliev in https://github.com/GetStream/Vision-Agents/pull/437
* fix: track background tool tasks in AWS realtime by @aliev in https://github.com/GetStream/Vision-Agents/pull/438
* fix: non-blocking tool execution in OpenAI and XAI realtime by @aliev in https://github.com/GetStream/Vision-Agents/pull/439
* Fix Openrouter func calling & integration tests by @dangusev in https://github.com/GetStream/Vision-Agents/pull/442

### Chores
* Added Slack posting to run_tests action by @DaemonLoki in https://github.com/GetStream/Vision-Agents/pull/410
* Streamline README for clarity and add ROADMAP.md by @d3xvn in https://github.com/GetStream/Vision-Agents/pull/441
* refactor: move _run_tool_in_background to base Realtime class by @aliev in https://github.com/GetStream/Vision-Agents/pull/443


## New Contributors
* @Jagdeep1 made their first contribution in https://github.com/GetStream/Vision-Agents/pull/415

**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.4.4...v0.4.5

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.4.5)

---

## v0.4.4: v0.4.4
**Published:** 2026-03-23

## What's Changed

### Features
* Support for Local devices  by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/347

### Bugfixes
* fix(aws): Emit transcription events and handle barge-in for Nova Sonic by @prettyprettyprettygood in https://github.com/GetStream/Vision-Agents/pull/408
* Fix EventManager.shutdown() hanging forever by @dangusev in https://github.com/GetStream/Vision-Agents/pull/421
* Use epoch tracking to skip processing stale TTS events on turn change by @dangusev in https://github.com/GetStream/Vision-Agents/pull/430
* Switch `elevenlabs.STT` to use VAD mode instead of manual commits by @dangusev in https://github.com/GetStream/Vision-Agents/pull/435 
* Fix event handling in GeminiRealtime by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/436


### Examples & Docs
* Upgrade deploy example with production-ready Helm chart by @aliev in https://github.com/GetStream/Vision-Agents/pull/396
* refactor: rename 07_deploy_example to 07_k8s_deploy_example by @aliev in https://github.com/GetStream/Vision-Agents/pull/416
* Remove Turn Duration panel from example Grafana dashboard by @aliev in https://github.com/GetStream/Vision-Agents/pull/418
* docs: make k8s deploy example cloud-agnostic by @aliev in https://github.com/GetStream/Vision-Agents/pull/425 
* add nvidia nemotron example by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/426
* add mimo example with openrouter by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/432

### Dependencies
* Bump minimum getstream version to 3.0.1 by @aliev in https://github.com/GetStream/Vision-Agents/pull/434

 
### Chores
* Skip & fix failing integration tests by @dangusev in https://github.com/GetStream/Vision-Agents/pull/413
* Remove PRODUCTION.md by @dangusev in https://github.com/GetStream/Vision-Agents/pull/424
* Add X-User-Agent and X-Request-Id headers to Inworld TTS requests by @ianbbqzy in https://github.com/GetStream/Vision-Agents/pull/428
* Format inworld/tts.py by @dangusev in https://github.com/GetStream/Vision-Agents/pull/431 
* Bump pyjwt from 2.11.0 to 2.12.0 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/420
* Bump pyopenssl from 25.3.0 to 26.0.0 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/423


## New Contributors
* @prettyprettyprettygood made their first contribution in https://github.com/GetStream/Vision-Agents/pull/408
* @ianbbqzy made their first contribution in https://github.com/GetStream/Vision-Agents/pull/428

**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.4.3...v0.4.4

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.4.4)

---

## v0.4.3: v0.4.3
**Published:** 2026-03-11

## What's Changed
### Bugfixes
* Fix memory leak: clean up handler tasks and closures on agent close by @aliev in https://github.com/GetStream/Vision-Agents/pull/407
* Fix StreamEdge connection race condition by @dangusev in https://github.com/GetStream/Vision-Agents/pull/412

### Dependencies 
* Upgrade getstream plugin to v3.0.0 by @aliev in https://github.com/GetStream/Vision-Agents/pull/400
* Update Fish Audio for S2-Pro by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/405
* Update plugin dependencies to latest compatible versions by @cursor[bot] in https://github.com/GetStream/Vision-Agents/pull/406
* chore(deps): add major-version upper bounds to critical dependencies by @aliev in https://github.com/GetStream/Vision-Agents/pull/404


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.4.2...v0.4.3

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.4.3)

---

## v0.4.2: v0.4.2
**Published:** 2026-03-10

## What's Changed

### Features
* add HF detection processor by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/377
* Add diarisation support for AssemblyAI STT by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/394
* Add gemini VLM example and update Gemini models by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/402

### Bugfixes
* fix: Buffer realtime transcripts into single chat messages  by @d3xvn in https://github.com/GetStream/Vision-Agents/pull/383
* Fix eager turn detection updating transcripts out of order by @dangusev in https://github.com/GetStream/Vision-Agents/pull/401
* fix: pin getstream to v2 to prevent breaking upgrades by @aliev in https://github.com/GetStream/Vision-Agents/pull/403
* Set LLMJudge instructions once at init by @aliev in https://github.com/GetStream/Vision-Agents/pull/399


### Examples
* Add sales assistant example — real-time AI meeting coach by @d3xvn in https://github.com/GetStream/Vision-Agents/pull/351

### Chores
* CC token usage & testing improvements by @dangusev in https://github.com/GetStream/Vision-Agents/pull/392
* CI speedups by @dangusev in https://github.com/GetStream/Vision-Agents/pull/393
* Remove dead code from TestResponse by @aliev in https://github.com/GetStream/Vision-Agents/pull/398
* Make "Installation" consistent for all plugins & add readme for anthropic plugin by @dangusev in https://github.com/GetStream/Vision-Agents/pull/395


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.4.1...v0.4.2

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.4.2)

---

## v0.4.1: v0.4.1
**Published:** 2026-03-04

## What's Changed
* Add support for AssemblyAI streaming STT  by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/389


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.4.0...v0.4.1

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.4.1)

---

## v0.4.0: v0.4.0
**Published:** 2026-03-03

## What's Changed
* Enforce async-only function registration in FunctionRegistry by @aliev in https://github.com/GetStream/Vision-Agents/pull/373
* Remove legacy mock_tools in favor of mock_functions by @aliev in https://github.com/GetStream/Vision-Agents/pull/376
* EventManager: fix failures when event handlers have return types specified by @dangusev in https://github.com/GetStream/Vision-Agents/pull/381
* Update the Agent authentication flow by @dangusev in https://github.com/GetStream/Vision-Agents/pull/380
* Support for Redis-based session store to run across multiple nodes by @dangusev in https://github.com/GetStream/Vision-Agents/pull/374
* Add py.typed markers for PEP 561 compliance by @aliev in https://github.com/GetStream/Vision-Agents/pull/378
* Update agent_server_example readme by @dangusev in https://github.com/GetStream/Vision-Agents/pull/385
* Fix optional RedisSessionKVStore import when redis is not installed by @aliev in https://github.com/GetStream/Vision-Agents/pull/384
* docs: clarify Cartesia role in README (Fixes #268) by @aniruddhaadak80 in https://github.com/GetStream/Vision-Agents/pull/366
* Fix agent metrics storage by @dangusev in https://github.com/GetStream/Vision-Agents/pull/387
* Add CHANGELOG.md and instructions to update it by @dangusev in https://github.com/GetStream/Vision-Agents/pull/388

## New Contributors
* @aniruddhaadak80 made their first contribution in https://github.com/GetStream/Vision-Agents/pull/366

**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.3.8...v0.4.0

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.4.0)

---

## v0.3.8: v0.3.8
**Published:** 2026-02-24

## What's Changed
* Update deepgram plugin to use sdk v6 by @dangusev in https://github.com/GetStream/Vision-Agents/pull/372
* Add testing framework for agents by @aliev in https://github.com/GetStream/Vision-Agents/pull/364

## New Contributors
* @aliev made their first contribution in https://github.com/GetStream/Vision-Agents/pull/364

**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.3.7...v0.3.8

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.3.8)

---

## v0.3.7: v0.3.7
**Published:** 2026-02-23

## What's Changed
* add new model to qwen example and add new openrouter vlm example by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/360
* LemonSlice Avatar plugin by @dangusev in https://github.com/GetStream/Vision-Agents/pull/365 
* Update default GPT-Realtime to 1.5 by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/371
* Add huggingface transformers plugin by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/350  
* Add CLAUDE.md by @dangusev in https://github.com/GetStream/Vision-Agents/pull/358
* fix anthropic messages not added to conversation history by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/359
* Pass missing secrets to github action by @dangusev in https://github.com/GetStream/Vision-Agents/pull/361
* fix message duplication in gemini and nvidia vlm by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/362
* Fixes for TTS and audio publishing by @dangusev in https://github.com/GetStream/Vision-Agents/pull/363



**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.3.6...v0.3.7

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.3.7)

---

## v0.3.6: v0.3.6
**Published:** 2026-02-13

## What's Changed

### Fixes
* Add missing onnxruntime dependency to the core package by @dangusev in https://github.com/GetStream/Vision-Agents/pull/355

### Dependencies
* Bump langchain-core from 1.2.6 to 1.2.11 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/354
* Bump cryptography from 46.0.3 to 46.0.5 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/352
* Update cartesia tts plugin to use v3.0.0+ by @dangusev in https://github.com/GetStream/Vision-Agents/pull/356

### Chores
* Fix/integration test fixes by @dangusev in https://github.com/GetStream/Vision-Agents/pull/357


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.3.5...v0.3.6

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.3.6)

---

## v0.3.5: v0.3.5
**Published:** 2026-02-10

## What's Changed

### Features 
* Support multiple speakers on the same call by @dangusev in #348 #349  
Docs - https://visionagents.ai/guides/multiple-speakers

### Dependencies
* Bump fonttools from 4.60.1 to 4.60.2 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/344
* Bump langsmith from 0.6.1 to 0.6.3 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/346

**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.3.4...v0.3.5

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.3.5)

---

## v0.3.4: v0.3.4
**Published:** 2026-02-06

## What's Changed
* added Mistral Voxtral integration on Readme by @brookesanchez-del in https://github.com/GetStream/Vision-Agents/pull/341
* Gemini 3 vision VLM API by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/328
* Decouple vision agents from getstream by @dangusev in https://github.com/GetStream/Vision-Agents/pull/330
* Remove uv.lock files from examples and add them to .gitignore by @dangusev in https://github.com/GetStream/Vision-Agents/pull/342
* Bump virtualenv from 20.35.4 to 20.36.1 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/287
* Bump authlib from 1.6.5 to 1.6.6 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/293
* Bump protobuf from 6.33.0 to 6.33.5 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/335
* Bump aiohttp from 3.13.2 to 3.13.3 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/343
* Bump pip from 25.3 to 26.0 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/329
* Bump filelock from 3.20.0 to 3.20.3 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/288
* Bump python-multipart from 0.0.21 to 0.0.22 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/317
* Bump marshmallow from 3.26.1 to 3.26.2 by @dependabot[bot] in https://github.com/GetStream/Vision-Agents/pull/345

## New Contributors
* @brookesanchez-del made their first contribution in https://github.com/GetStream/Vision-Agents/pull/341
* @dependabot[bot] made their first contribution in https://github.com/GetStream/Vision-Agents/pull/287

**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.3.3...v0.3.4

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.3.4)

---

## v0.3.3: v0.3.3
**Published:** 2026-02-05

## What's Changed
* Fix twilio plugin build by @dangusev in https://github.com/GetStream/Vision-Agents/pull/318
* feat: add custom events and metrics broadcasting via Stream Video by @d3xvn in https://github.com/GetStream/Vision-Agents/pull/325
* Upgrade GitHub Actions for Node 24 compatibility by @salmanmkc in https://github.com/GetStream/Vision-Agents/pull/324
* Add mistral by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/334

## New Contributors
* @salmanmkc made their first contribution in https://github.com/GetStream/Vision-Agents/pull/324

**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.3.2...v0.3.3

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.3.3)

---

## v0.3.2: v0.3.2
**Published:** 2026-01-28

## What's Changed

### Features 
* Add limits to AgentLauncher by @dangusev in https://github.com/GetStream/Vision-Agents/pull/302
* XAI Realtime model support  by @tschellenbach in https://github.com/GetStream/Vision-Agents/pull/296

### Bugfixes
* Fix Agent warnings by @dangusev in https://github.com/GetStream/Vision-Agents/pull/310
* fix: SDK usage statistics tracking for vision-agents by @tjirab in https://github.com/GetStream/Vision-Agents/pull/304

### Docs & Examples
* Add Hugging Face integration to README by @Wauplin in https://github.com/GetStream/Vision-Agents/pull/305
* feat: add Grafana dashboard to prometheus metrics example by @d3xvn in https://github.com/GetStream/Vision-Agents/pull/295
* fix: prometheus metrics example documentation by @d3xvn in https://github.com/GetStream/Vision-Agents/pull/311


## New Contributors
* @Wauplin made their first contribution in https://github.com/GetStream/Vision-Agents/pull/305

**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.3.1...v0.3.2

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.3.2)

---

## v0.3.0: v0.3.0
**Published:** 2026-01-20

## What's Changed
* Release blog post: https://getstream.io/blog/vision-agents-v0-3/

* Suppress errors on `Agent.join` if the agent is closed or closing by @dangusev in https://github.com/GetStream/Vision-Agents/pull/291
* Spring cleaning jan 15 by @tschellenbach in https://github.com/GetStream/Vision-Agents/pull/292
* Security camera example by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/247
* Agent HTTP server by @dangusev in https://github.com/GetStream/Vision-Agents/pull/284
* Update urllib to 2.6.3 by @dangusev in https://github.com/GetStream/Vision-Agents/pull/297
* Bump mcp version to >=1.23.3 by @dangusev in https://github.com/GetStream/Vision-Agents/pull/298
* Various fixes by @dangusev in https://github.com/GetStream/Vision-Agents/pull/299
* Remove print by @dangusev in https://github.com/GetStream/Vision-Agents/pull/300
* Migrate examples to the new Runner API by @dangusev in https://github.com/GetStream/Vision-Agents/pull/301


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.2.10...v0.3.0

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.3.0)

---

## v0.2.10: v0.2.10
**Published:** 2026-01-14

## What's Changed
* fix: stop sending video frames to realtime LLMs and stop processors when participant leaves by @d3xvn in https://github.com/GetStream/Vision-Agents/pull/283
* Prod prep by @tschellenbach in https://github.com/GetStream/Vision-Agents/pull/285
* Fix SIP example runner  by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/286
* Support for Pocket TTS  by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/289
* feat: added metrics and example by @d3xvn in https://github.com/GetStream/Vision-Agents/pull/278


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.2.9...v0.2.10

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.2.10)

---

## v0.2.9: v0.2.9
**Published:** 2026-01-09

## What's Changed
* Fix mypy by @dangusev in https://github.com/GetStream/Vision-Agents/pull/281
* Add support for Cosmos 2 VLM  by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/282


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.2.8...v0.2.9

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.2.9)

---

## v0.2.8: V0.2.8 - Deepgram hotfix
**Published:** 2026-01-08

Hotfix for the regression in Deepgram 5.3.1

- from deepgram.extensions.types.sockets import ListenV2ControlMessage was removed
- the new from deepgram.listen.v2.types import ListenV2CloseStream is available in >5.3.1

## What's Changed
* Close idle agents after some timeout & Agent clean up by @dangusev in https://github.com/GetStream/Vision-Agents/pull/279
* fix(plugins:getstream): Support setting user avatars (#233) by @m0reA1 in https://github.com/GetStream/Vision-Agents/pull/234


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.2.7...v0.2.8

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.2.8)

---

## v0.2.7: v0.2.7 - Phone, Rag, Warmup improvements
**Published:** 2026-01-06

## What's Changed
* Add a script to validate that all plugins are included to core's extras  by @dangusev in https://github.com/GetStream/Vision-Agents/pull/266
* Fix test issues by @dangusev in https://github.com/GetStream/Vision-Agents/pull/270
* Remove unused code by @dangusev in https://github.com/GetStream/Vision-Agents/pull/269
* Address CI integration bugs  by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/272
* New warmup implementation by @dangusev in https://github.com/GetStream/Vision-Agents/pull/273
* fix openrouter function calling by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/274
* fix screensharing when screen height/width is an odd pixel number by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/271
* update with instructions to run with a video file by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/275
* fix(plugins:getstream): Use python 3.10 compatible timezone by @alisaifee in https://github.com/GetStream/Vision-Agents/pull/267
* Pass `provider` to HuggingFace by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/276
* Update roboflow demo by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/277
* Phone & RAG by @tschellenbach in https://github.com/GetStream/Vision-Agents/pull/239

## New Contributors
* @alisaifee made their first contribution in https://github.com/GetStream/Vision-Agents/pull/267

**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.2.6...v0.2.7

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.2.7)

---

## v0.2.6: v0.2.6
**Published:** 2025-12-16

## What's Changed
* Processors clean up by @dangusev in https://github.com/GetStream/Vision-Agents/pull/262
* Updates to ChatCompletionsVLM by @dangusev in https://github.com/GetStream/Vision-Agents/pull/263
* Update Roboflow example by @dangusev in https://github.com/GetStream/Vision-Agents/pull/264
* Support for HuggingFace Inference by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/260
* Revise README for AI coaching example updates by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/265


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.2.5...v0.2.6

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.2.6)

---

## v0.2.5: v0.2.5
**Published:** 2025-12-12

## What's Changed
* fix: openai realtime participants and conversation sync by @d3xvn in https://github.com/GetStream/Vision-Agents/pull/258
* Fix SFU events handling inside `Agent` by @dangusev in https://github.com/GetStream/Vision-Agents/pull/245
* Add support for new Gemini Live Model  by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/259


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.2.4...v0.2.5

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.2.5)

---

## v0.2.4: v0.2.4
**Published:** 2025-12-12

## What's Changed
* Expose more annotation params for Roboflow processors by @dangusev in https://github.com/GetStream/Vision-Agents/pull/251
* Add `video_track_override_path` to Agent to play video from local files by @dangusev in https://github.com/GetStream/Vision-Agents/pull/249
* Add support for Qwen 3 Realtime by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/255
* Change default role to user by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/253
* Fix test  by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/254
* Update hiring and integrations table by @gellernastya and @Nash0x7E2  in https://github.com/GetStream/Vision-Agents/pull/246

## New Contributors
* @gellernastya made their first contribution in https://github.com/GetStream/Vision-Agents/pull/246

**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.2.3...v0.2.4

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.2.4)

---

## v0.2.3: v0.2.3
**Published:** 2025-12-07

## What's Changed
* Add Roboflow plugins for object detection by @dangusev in https://github.com/GetStream/Vision-Agents/pull/215
* Add missing name prop to publisher by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/225
* refactor(openai): simplify and optimize function calling implementation by @d3xvn in https://github.com/GetStream/Vision-Agents/pull/226
* fix: ensure Gemini LLM always includes system_instruction in config by @d3xvn in https://github.com/GetStream/Vision-Agents/pull/231
* Fix numpy truth check by @dangusev in https://github.com/GetStream/Vision-Agents/pull/230
* Openrouter function calling by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/227
* Remove redundant warning in Agent turn detection by @dangusev in https://github.com/GetStream/Vision-Agents/pull/228
* fix: subscribe to existing participant tracks when agent joins late by @d3xvn in https://github.com/GetStream/Vision-Agents/pull/235
* Add Deepgram TTS capabilities by @DaemonLoki in https://github.com/GetStream/Vision-Agents/pull/237
* Nova 2 support by @tschellenbach and @Nash0x7E2  in https://github.com/GetStream/Vision-Agents/pull/240
* Clean up examples READMEs by @dangusev in https://github.com/GetStream/Vision-Agents/pull/229
* Add AWS Bedrock and Nova tutorials  by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/241
* * Add --skip-bb & --skip-blockbuster CLI params for pytest by @dangusev in https://github.com/GetStream/Vision-Agents/pull/223



**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.2.2...v0.2.3

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.2.3)

---

## v0.2.2: v0.2.2
**Published:** 2025-11-29

## What's Changed
* Update CI env  by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/210
* Update Cartesia example and README by @DaemonLoki in https://github.com/GetStream/Vision-Agents/pull/211
* Move example to plugins dir  by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/213
* Silero & Vogent update by @tschellenbach in https://github.com/GetStream/Vision-Agents/pull/214
* Fix blockbuster failing on blocking calls inside Agent.__init__ by @dangusev in https://github.com/GetStream/Vision-Agents/pull/217
* Improve Readme by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/218
* [AI-326] Elevenlabs Scribe 2 improvements by @tschellenbach in https://github.com/GetStream/Vision-Agents/pull/216
* Fix openrouter by @maxkahan in https://github.com/GetStream/Vision-Agents/pull/220
* Make Instructions parsing fail on invalid input instead of logging by @dangusev in https://github.com/GetStream/Vision-Agents/pull/219
* [AI-297] Expand docs for standardise plugin generation  by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/221


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.2.1...v0.2.2

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.2.2)

---

## v0.1.15: v0.1.15
**Published:** 2025-11-14

- Improved OpenAI and Gemini realtime plugins
- Cleaned up logging noise

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.1.15)

---

## v0.1.14: Scribe 2. Eager turn taking. Gemini audio fixes. v0.1.14
**Published:** 2025-11-11

* Scribe 2 / Elevenlabs STT
* Lower latency for gemini & openAI
* Eager turn taking
* Fix audio bug for gemini
* Moondream VLM
* Wait for participant on join by default

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.1.14)

---

## v0.1.13: v0.1.13 - Add support for Moondream Detection
**Published:** 2025-11-03

## What's Changed
* Moondream Detection API  by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/136
* feat: add AWS Bedrock function calling implementation by @d3xvn in https://github.com/GetStream/Vision-Agents/pull/120
* Extract model download logic to utils by @Nash0x7E2 in https://github.com/GetStream/Vision-Agents/pull/146


[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.1.13)

---

## v0.1.12: V0.1.12 - Deepgram Flux, vogent, smart turn
**Published:** 2025-10-31

* Deepgram flux (with v2 listen)
* Vogent turn detection
* Smart turn detection
* Logging cleanup

## New Contributors
* @filiplajszczak made their first contribution in https://github.com/GetStream/Vision-Agents/pull/116

**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.1.11...v0.1.12

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.1.12)

---

## v0.1.10: Support Sonic-3 by default 
**Published:** 2025-10-28

* Add support for `sonic-3` by default in Cartesia TTS 

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.1.10)

---

## v0.1.9: OpenRouter support v0.1.9
**Published:** 2025-10-22

## What's Changed
* [AI-194] Openrouter by @tschellenbach in https://github.com/GetStream/Vision-Agents/pull/117


**Full Changelog**: https://github.com/GetStream/Vision-Agents/compare/v0.1.8...v0.1.9

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.1.9)

---

## v0.1.8: Fish Audio support
**Published:** 2025-10-22

Fish audio support

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.1.8)

---

## v0.1.7: Add AWS support - V0.1.7
**Published:** 2025-10-21

First version of AWS bedrock and AWS nova sonic support. 

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.1.7)

---

## v0.1.6: Bug fix - Chat, Deepgram version update 
**Published:** 2025-10-16

* Change the default chat channel type to `messaging`
* Bump Deepgram plugin to version 5

[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.1.6)

---

## v0.1.0: v0.1.0 - First release
**Published:** 2025-10-09

The first release of vision agents. With a focus on vision AI, low latency and completely open. Quickly build video agents with any model or video edge network. 

- Processors: for providing state and modifying/publishing video and audio
- Turn keeping
- TTS
- STT
- LLM
- Realtime LLM (gemini and openAI)

First release. First step of many towards 1.0. 


[View on GitHub](https://github.com/GetStream/Vision-Agents/releases/tag/v0.1.0)

---

