const fs = require('fs');
const inquirer = require('inquirer');
const ora = require('ora');
const lodash = require('lodash');
const rimraf = require('rimraf');
const childProcess = require('child_process');

async function init() {
  await awaitWarning();
  await checkYarn();

  const params = await askParams();

  let promise = cleanup(params);
  ora.promise(promise, 'Renomeando projeto...');
  await promise;

  promise = removePackages(params);
  ora.promise(promise, 'Limpando dependencias...');
  await promise;

  promise = selfDestruction(params);
  ora.promise(promise, 'Auto destruição...');
  await promise;

  promise = resetGit(params);
  ora.promise(promise, 'Resetando Git...');
  await promise;
}

async function awaitWarning() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('\nPROJECT GENERATOR\n');
      resolve();
    });
  });
}

async function checkYarn() {
  await execCommand('yarn -v').catch(() => {
    throw new Error('Yarn is required')
  });
}

async function askParams(answers = {}) {
  const params = await inquirer.prompt([{
    name: 'project',
    default: answers.project,
    message: 'Nome do projeto',
    validate: i => i.length >= 3 ? true : 'Pelo menos 3 letras',
    filter: i => lodash.kebabCase(i.endsWith('-api') ? i : `${i}-api`).toLowerCase()
  }, {
    name: 'repository',
    default: answers.repository,
    message: 'Repositorio'
  }, {
    name: 'confirmed',
    type: 'confirm',
    message: 'Confirma as configurações?'
  }]);

  if (!params.confirmed) {
    console.log('---- Responda novamente:')
    return askParams(params);
  }

  return params;
}

async function cleanup(params) {
  await replaceContent('./package.json', [{
    from: 'boilerplate-nodejs-api',
    to: params.project
  }, {
    from: /boilerplate-nodejs-api/gi,
    to: `boilerplate-nodejs-api/${params.project}`
  }, {
    from: 'api-repository',
    to: params.repository
  }]);

  await replaceContent('./docker-compose.yml', [{
    from: 'boilerplate-nodejs-api',
    to: params.project
  }, {
    from: 'api-base-database',
    to: params.project.replace('-api', '-database')
  }, {
    from: 'POSTGRES_DB=test',
    to: `POSTGRES_DB=${lodash.camelCase(params.project.replace('-api', ''))}`
  }, {
    from: 'DATABASE_DB=test',
    to: `POSTGRES_DB=${lodash.camelCase(params.project.replace('-api', ''))}`
  }]);
}

async function replaceContent(file, replacers) {
  let content = await new Promise((resolve, reject) =>
    fs.readFile(file, 'utf8', (err, data) => err ? reject(err) : resolve(data))
  );

  for (let replacer of replacers) {
    content = content.replace(replacer.from, replacer.to);
  }

  await new Promise((resolve, reject) =>
    fs.writeFile(file, content, (err, data) => err ? reject(err) : resolve(data))
  );
}

async function removePackages() {
  await execCommand(`yarn remove inquirer ora rimraf`);
}

async function resetGit(params) {
  await new Promise((resolve, reject) =>
    rimraf('./.git', err => err ? reject(err) : resolve())
  );

  await execCommand('git init');

  if (params.repository) {
    await execCommand(`git remote add origin ${params.repository}`);
  }

  await execCommand('git add . && git commit -am "initial"')
}

async function selfDestruction() {
  await new Promise((resolve, reject) =>
    rimraf('./init.js', err => err ? reject(err) : resolve())
  );
}

async function execCommand(command) {
  await new Promise((resolve, reject) => {
    childProcess.exec(command, err => err ? reject(err) : resolve());
  });
}

init().then(() => {
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(-1);
});