import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

test("public website uses a premium glass surface system", () => {
  assert.match(css, /Study Space premium glass interactions/);
  assert.match(css, /--glass-depth/);
  assert.match(css, /backdrop-filter:\s*blur/);
});

test("public website has responsive 3D interaction and accessible focus states", () => {
  assert.match(css, /perspective\(1000px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /max-width:\s*760px/);
});

test("website cards include glass treatment without removing the core style hooks", () => {
  for (const selector of [".feature-card", ".price-card", ".contact-card", ".contact-form"]) {
    assert.ok(css.includes(selector), `Missing visual selector: ${selector}`);
  }
});
