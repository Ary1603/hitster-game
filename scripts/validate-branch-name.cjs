const { execSync } = require('node:child_process');

const branch =
  process.argv[2] ||
  execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const allowedPattern =
  /^(main|develop|feat\/.+|fix\/.+|refactor\/.+|perf\/.+|docs\/.+|test\/.+|style\/.+|build\/.+|ci\/.+|chore\/.+|hotfix\/.+|release\/.+|revert\/.+|delete\/.+)$/;

if (!allowedPattern.test(branch)) {
  console.error(`
❌ Invalid branch name: ${branch}

Allowed:
- main
- develop
- feat/*
- fix/*
- refactor/*
- perf/*
- docs/*
- test/*
- style/*
- build/*
- ci/*
- chore/*
- hotfix/*
- release/*
- revert/*
- delete/*
`);
  process.exit(1);
}

console.log(`✅ Valid branch name: ${branch}`);