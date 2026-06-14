import { describe, expect, it } from "vitest";

import { buildProxyModelList } from "./proxy.js";

describe("buildProxyModelList", () => {
  it("includes alias models used by /model commands", () => {
    const list = buildProxyModelList(1234567890);
    const ids = new Set(list.map((model) => model.id));

    expect(ids.has("flash")).toBe(true);
    expect(ids.has("kimi")).toBe(true);
    expect(ids.has("kimi-k2.7")).toBe(true);
    expect(ids.has("kimi-k2.6")).toBe(true);
    expect(ids.has("free")).toBe(true);
    expect(ids.has("opus")).toBe(true);
    expect(ids.has("google/gemini-2.5-flash")).toBe(true);
    expect(ids.has("moonshot/kimi-k2.5")).toBe(true);
    expect(ids.has("moonshot/kimi-k2.6")).toBe(true);
    expect(ids.has("moonshot/kimi-k2.7")).toBe(true);
    expect(ids.has("anthropic/claude-opus-4.8")).toBe(true);
  });

  it("redirects delisted fable-5 and new free flagships to their resolved targets", () => {
    const list = buildProxyModelList(1234567890);
    const ids = new Set(list.map((model) => model.id));
    // fable-5 delisted by Anthropic 2026-06-13 — alias remains but resolves to opus-4.8
    expect(ids.has("fable")).toBe(true);
    // new blockrun-featured free flagships (2026-06-14 sweep)
    expect(ids.has("free/mistral-large-3-675b")).toBe(true);
    expect(ids.has("free/qwen3.5-122b-a10b")).toBe(true);
  });

  it("returns unique model IDs", () => {
    const list = buildProxyModelList(1234567890);
    const ids = list.map((model) => model.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
