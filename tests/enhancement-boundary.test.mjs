import assert from "node:assert/strict";
import test from "node:test";
import axios from "axios";
import { enhancedImageAPI } from "../src/utils/enhanceImageApi.js";

test("unconfigured enhancement makes no provider or fetch request", async () => {
  const originalPost = axios.post;
  const originalGet = axios.get;
  const originalFetch = globalThis.fetch;
  let requests = 0;
  const blocked = async () => {
    requests += 1;
    throw new Error("Network is blocked by this offline test");
  };
  axios.post = blocked;
  axios.get = blocked;
  globalThis.fetch = blocked;
  try {
    await enhancedImageAPI(new Blob(["synthetic image"], { type: "image/png" })).catch(() => {});
    assert.equal(requests, 0, "A frontend-only preview must not contact the provider");
  } finally {
    axios.post = originalPost;
    axios.get = originalGet;
    globalThis.fetch = originalFetch;
  }
});

test("unconfigured enhancement reports the missing server boundary", async () => {
  const originalPost = axios.post;
  axios.post = async () => { throw new Error("Offline network guard"); };
  try {
    await assert.rejects(enhancedImageAPI(new Blob(["synthetic image"])), {
      name: "EnhancementUnavailableError",
      message: /server proxy/i,
    });
  } finally {
    axios.post = originalPost;
  }
});
