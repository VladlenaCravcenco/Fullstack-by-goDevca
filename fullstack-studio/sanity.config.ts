import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'fullstack-studio',

  projectId: '81wvtguf',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool({
    structure: (S) => S.list().title('Content').items(
      S.documentTypeListItems().map((item) => item.getId() === 'projectDirection'
        ? item.child(S.documentList().title('Направления проектов')
            .filter('_type == "projectDirection" && !(_id in path("projectDirection.**")) && !(_id in path("drafts.projectDirection.**"))'))
        : item),
    ),
  }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
