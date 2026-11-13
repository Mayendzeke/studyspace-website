import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");

test("public website consistently advertises a seven-day free trial", () => {
  assert.match(html, /7 days[\s\S]{0,80}Free trial for new/);
  assert.match(html, /7-day free trial/);
  assert.doesNotMatch(html, /48[- ]?(?:hour|hrs?)/i);
});

test("public website keeps the established weekly, fortnightly and monthly prices", () => {
  assert.match(html, /E100[\s\S]*?E180[\s\S]*?E350/);
  assert.match(html, /Subscription duration is 7, 14 or 28 days/);
});

test("public website typography uses the student app's DM Sans system fallback", () => {
  assert.match(css, /font-family:'DM Sans',system-ui,sans-serif/);
  assert.doesNotMatch(css, /Manrope/);
});
