const fs = require('node:fs');
const { execSync } = require('node:child_process');

const commitMsgFile = process.argv[2];

if (!commitMsgFile) {
  console.error('❌ Commit message file path is required.');
  process.exit(1);
}

const commitMessage = fs.readFileSync(commitMsgFile, 'utf8').trim();
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const allowedTypes = [
  'feat',
  'fix',
  'refactor',
  'perf',
  'docs',
  'test',
  'style',
  'build',
  'ci',
  'chore',
  'hotfix',
  'release',
  'revert',
  'delete',
];

const protectedBranches = ['main', 'develop'];

if (protectedBranches.includes(branch)) {
  console.log(`✅ Commit message validation skipped on protected branch: ${branch}`);
  process.exit(0);
}

const branchType = branch.split('/')[0];

if (!allowedTypes.includes(branchType)) {
  console.error(`
❌ Invalid branch prefix: ${branchType}

Allowed prefixes:
${allowedTypes.map((type) => `- ${type}/*`).join('\n')}
`);
  process.exit(1);
}

const expectedPattern = new RegExp(`^${branchType}: .+`);

if (!expectedPattern.test(commitMessage)) {
  console.error(`
❌ Invalid commit message.

Current branch:
${branch}

Expected commit message format:
${branchType}: your message

Example:
${branchType}: add spotify auth flow

Received:
${commitMessage}
`);
  process.exit(1);
}

console.log(`✅ Valid commit message for branch ${branch}`);