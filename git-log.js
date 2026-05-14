const { execSync } = require('child_process');
try {
  console.log(execSync('git log -3 -p components/benchmark-chart.tsx', { encoding: 'utf-8' }));
} catch (e) {
  console.log(e.message);
}
