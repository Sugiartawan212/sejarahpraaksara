import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import galeriGlobal from './sanity/schemas/galeri';
import localeString from './sanity/schemas/localeString';
import localeText from './sanity/schemas/localeText';
import project from './sanity/schemas/project';

export default defineConfig({
  name: 'umah-luwung',
  title: 'Umah Luwung Interior',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: [localeString, localeText, galeriGlobal, project],
  },
});