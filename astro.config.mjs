import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'udescmaker';
const owner = process.env.GITHUB_REPOSITORY_OWNER;

export default defineConfig({
  site: owner ? `https://${owner}.github.io` : 'http://localhost:4321',
  base: process.env.GITHUB_ACTIONS === 'true' ? `/${repository}` : '/',
  output: 'static',
  integrations: [react()],
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});
