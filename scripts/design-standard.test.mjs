import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const standard = readFileSync("STUDYSPACE_DEVELOPMENT_STANDARD.md", "utf8");
const pullRequest = readFileSync(".github/pull_request_template.md", "utf8");

test("the public website brand logo always navigates to the homepage", () => {
  assert.ok(html.includes('<a class="brand" href="./" aria-label="Study Space home">'));
});

test("the uniform Study Space visual standard is part of website release checks", () => {
  assert.ok(standard.includes("Mandatory design and experience rule"));
  assert.ok(standard.includes("Every development change, bug fix, refactor, integration, and upgrade"));
  assert.ok(pullRequest.includes("STUDYSPACE_DEVELOPMENT_STANDARD.md"));
  assert.ok(pullRequest.includes("Desktop and mobile layouts have been checked"));
  assert.ok(pullRequest.includes("Light and dark themes have been checked"));
});
