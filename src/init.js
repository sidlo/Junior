#!/usr/bin/env node
import simpleGit from 'simple-git';
import { fileURLToPath } from 'url';
import { createPromptYaml } from './prompt/createPromptYaml.js';
import { createGitignore } from './git/createGitignore.js';
import { createPromptDir } from './prompt/createPromptDir.js';
import copyDefaults from './command/init/copyDefaults.js';
import path from 'path';

const git = simpleGit();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function juniorInit() {
  const isRepo = await git.checkIsRepo();

  if (isRepo) {
    const status = await git.status();
    if (!status.isClean()) {
      console.error("\x1b[31mDirectory is not clean. Please commit or stash changes and try again.\x1b[0m");
      process.exit(1);
    }
  } else {
    await git.init();
    await git.add('.');
    await git.commit("Junior init");
  }

  createGitignore();
  await createPromptDir();
  createPromptYaml();

  const defaultsPath = path.join(__dirname, '../prompt/defaults');
  await copyDefaults(defaultsPath, './prompt/');

  console.log('\x1b[32mRepo initialized for Junior development\x1b[0m');
}

juniorInit();

