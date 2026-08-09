/* Build script: bundles content/*.json into js/data.js (window.SITE_DATA).
   Run with: node build-data.js
   Re-run whenever content JSON changes. */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const MANIFEST = {
  work: ['culerson', 'eze', 'fairbnb', 'susinsight', 'translayte', 'wecollect', 'zeproc'],
  projects: ['acquario', 'jtf23', 'nairawatch', 'nigeria-embassy', 'smart-expense', 'sound-atlas', 'urban-climate-signals', 'webhunt', 'zonify'],
  updates: ['ask-susinsight-ai', 'loblaw-ai', 'substack-direct-subscribe-wp', 'substack-direct-subscribe', 'u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'wp-snippets'],
};

function readJSON(file) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, 'content', file), 'utf8'));
}

function rewriteLocalPaths(v) {
  if (typeof v === 'string') return v.replace(/^\/images\//, 'images/');
  if (Array.isArray(v)) return v.map(rewriteLocalPaths);
  if (v && typeof v === 'object') {
    const out = {};
    for (const k in v) out[k] = rewriteLocalPaths(v[k]);
    return out;
  }
  return v;
}

const data = {
  settings: readJSON('settings.json'),
  home: readJSON('home.json'),
  info: readJSON('info.json'),
  testimonials: (readJSON('testimonials.json').testimonials || []),
  work: MANIFEST.work.map((f) => readJSON(path.join('work', f + '.json'))),
  projects: MANIFEST.projects.map((f) => readJSON(path.join('projects', f + '.json'))),
  updates: MANIFEST.updates.map((f) => readJSON(path.join('updates', f + '.json'))),
};

const output = 'window.SITE_DATA = ' + JSON.stringify(rewriteLocalPaths(data), null, 2) + ';';
fs.writeFileSync(path.join(ROOT, 'js', 'data.js'), output + '\n');
console.log('Wrote js/data.js (' + (output.length / 1024).toFixed(0) + ' KB, ' + data.work.length + ' work, ' + data.projects.length + ' projects, ' + data.updates.length + ' updates)');
