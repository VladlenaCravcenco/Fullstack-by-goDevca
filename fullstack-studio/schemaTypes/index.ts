// fullstack-studio/schemaTypes/index.ts
import project from '../schemas/project'
import post from '../schemas/post';
import localeString from '../schemas/localeString';
import localeText from '../schemas/localeText';
import localeStringArray from '../schemas/localeStringArray';


export const schemaTypes = [localeString, localeText, localeStringArray, project, post]
