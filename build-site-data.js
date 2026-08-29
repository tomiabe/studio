'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const MANIFEST = {
  work: ['susinsight', 'wecollect', 'zeproc', 'translayte', 'fairbnb', 'eze', 'culerson'],
  projects: ['polish', 'substack-direct-subscribe', 'substack-direct-subscribe-wp', 'wp-snippets', 'acquario', 'jtf23', 'nairawatch', 'nigeria-embassy', 'smart-expense', 'sound-atlas', 'urban-climate-signals', 'webhunt', 'zonify'],
  updates: ['polish', 'ask-susinsight-ai', 'loblaw-ai', 'substack-direct-subscribe-wp', 'substack-direct-subscribe', 'u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'wp-snippets']
};

function readJSON(file) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, 'content', file), 'utf8'));
}

function collection(name) {
  return MANIFEST[name]
    .map((file) => readJSON(path.join(name, file + '.json')))
    .filter((item) => item.visible !== false);
}

const data = {
  site: readJSON('site.json'),
  work: collection('work'),
  projects: collection('projects'),
  updates: collection('updates')
};

const output = `window.STUDIO_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(path.join(ROOT, 'js', 'site-data.js'), output);
console.log(`Wrote js/site-data.js with ${data.work.length} work items, ${data.projects.length} projects, and ${data.updates.length} signals.`);
