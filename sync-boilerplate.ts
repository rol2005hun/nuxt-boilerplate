import { execSync } from 'node:child_process';

const PRESERVE_PATHS = [
  'README.md',
  'app/app.vue',
  'app/pages',
  'app/layouts',
  'public',
  'server',
  'nuxt.config.ts',
  'pnpm-workspace.yaml',
  'sync-boilerplate.ts'
];

const exec = (cmd: string, ignoreError = false) => {
  try {
    return execSync(cmd, { stdio: 'pipe' }).toString().trim();
  } catch (err) {
    if (!ignoreError) {
      console.error(`Error executing: ${cmd}`);
      throw err;
    }
    return '';
  }
};

const run = () => {
  console.log('🔄 Szinkronizálás indítása Git Merge segítségével...\n');

  const status = exec('git status --porcelain');
  if (status !== '') {
    console.error('❌ Hiba: A munkakönyvtár nem tiszta!');
    console.error('Kérlek, commitálj vagy stash-elj minden változtatást a szinkronizálás előtt.');
    process.exit(1);
  }

  const remotes = exec('git remote');
  if (!remotes.split('\n').includes('boilerplate')) {
    console.log('🔗 Boilerplate remote hozzáadása...');
    exec('git remote add boilerplate https://github.com/rol2005hun/nuxt-boilerplate.git');
  }

  console.log('⬇️ Frissítések letöltése a boilerplate-ből...');
  exec('git fetch boilerplate master', true);

  console.log('🔀 Változások összefésülése (Merge)...');
  try {
    execSync('git merge boilerplate/master --no-commit --no-ff --allow-unrelated-histories', { stdio: 'inherit' });
  } catch (err) {
    console.log('\n⚠️ Konfliktusok léptek fel a merge során (vagy sikeres merge no-commit módban).');
  }

  console.log('🛡️ Védett fájlok (PRESERVE_PATHS) visszaállítása...');
  for (const path of PRESERVE_PATHS) {
    try {
      exec(`git reset HEAD "${path}"`, true);
      exec(`git checkout HEAD -- "${path}"`, true);
      exec(`git clean -fd "${path}"`, true);
    } catch (e) {
      // ignore
    }
  }

  console.log('\n✅ Kész! A fájlok sikeresen össze lettek fésülve (Staged állapotban).');
  console.log('👀 Nézd meg a változásokat (Source Control fül a VSCode-ban)!');
  console.log('🛠️ Ha van konfliktus (piros fájlok), oldd fel őket!');
  console.log('🚀 Ha minden jónak tűnik, commitáld a változásokat: git commit -m "chore: sync boilerplate"');
};

try {
  run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
