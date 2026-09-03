import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import localeString from './sanity/schemas/localeString';
import localeText from './sanity/schemas/localeText';
import timeline from './sanity/schemas/timeline';
import gallery from './sanity/schemas/gallery';
import team from './sanity/schemas/team';

export default defineConfig({
  name: 'sejarah-pra-aksara',
  title: 'Sejarah Indonesia – Zaman Pra-Aksara',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: [localeString, localeText, timeline, gallery, team],
  },
});