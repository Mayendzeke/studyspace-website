import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const script = readFileSync("script.js", "utf8");
const terms = readFileSync("terms.html", "utf8");

test("website consistently describes the 7-day free trial", () => {
  assert.match(html, /7-day(?: \(168-hour\))? free trial|7 days of free access/i);
  assert.match(terms, /7-day(?: \(168-hour\))? free trial|7 days of free access/i);
  assert.doesNotMatch(html + terms, /48-hour free trial|48 hours of free access/i);
});

test("website explains all five education pathways", () => {
  for (const stage of ["Primary", "Secondary High", "High School", "Matric", "Tertiary"]) {
    assert.ok(html.includes(stage), `Missing education pathway: ${stage}`);
  }
  assert.match(html, /Grades 0–7/);
  assert.match(html, /Forms 1–3/);
  assert.match(html, /Forms 4–5/);
  assert.match(html, /Form 6/);
});

test("homepage uses human photography instead of the old illustrated portraits", () => {
  assert.match(html, /images\.unsplash\.com/);
  assert.doesNotMatch(html, /student-study\.svg|parent-learner\.svg|teacher-online\.svg/);
});

test("student and Monitor destinations are both available", () => {
  assert.match(html, /https:\/\/mayendzeke\.github\.io\/planner\//);
  assert.match(html, /https:\/\/mayendzeke\.github\.io\/studyspace-monitor\//);
});

test("all in-page links point to an existing unique id", () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, "Duplicate HTML id found");
  const anchors = [...html.matchAll(/\bhref="#([^"]+)"/g)].map(match => match[1]);
  for (const anchor of anchors) assert.ok(ids.includes(anchor), `Broken in-page link: #${anchor}`);
});

test("responsive pathway styling and reduced motion remain available", () => {
  assert.match(css, /\.pathway-grid/);
  assert.match(css, /@media\s*\(max-width:\s*760px\)/);
  assert.match(css, /prefers-reduced-motion/);
});


test("website splash uses the existing pencil-drawn logo and no water-fill animation", () => {
  assert.match(html, /class="studyspace-splash-logo"/);
  assert.match(html, /studyspace-logo-cap-top/);
  assert.match(css, /@keyframes studyspace-cap-draw/);
  assert.doesNotMatch(css, /water-fill|water-filling/i);
});

test("website moves the splash logo into the persistent header", () => {
  assert.match(css, /\.splash-mark \.studyspace-splash-logo/);
  assert.match(css, /body\.splash-dismissed \.site-header \.brand-mark img/);
  assert.match(script, /startViewTransition/);
  assert.match(script, /3200/);
});

test("website logo animation respects reduced-motion preferences", () => {
  assert.match(script, /prefers-reduced-motion/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});
