// fullstack-studio/schemaTypes/index.ts
import project from '../schemas/project'
import post from '../schemas/post'
import localeString from '../schemas/localeString'
import localeText from '../schemas/localeText'
import localeStringArray from '../schemas/localeStringArray'
import localePortableText from '../schemas/localePortableText'
import blogCategory from '../schemas/blogCategory'

export const schemaTypes = [
  localeString,
  localeText,
  localeStringArray,
  localePortableText,
  blogCategory,
  project,
  post,
]
