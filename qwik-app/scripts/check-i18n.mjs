import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const cache = new Map();
function load(relativePath) {
  const filename = path.resolve(relativePath);
  if (cache.has(filename)) return cache.get(filename);
  const exports = {};
  cache.set(filename, exports);
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const require = (specifier) => load(path.resolve(path.dirname(filename), `${specifier}.ts`));
  new Function('require', 'exports', code)(require, exports);
  return exports;
}
const { locales, getLocaleFromPathname, localizePath, switchLocalePath } = load('src/lib/i18n.ts');
const { seededBlogPosts, getSeededBlogPosts } = load('src/lib/blogSeed.ts');
const { translateLegacyProject } = load('src/lib/projectTranslations.ts');
for (const locale of locales) {
  const posts = getSeededBlogPosts(locale);
  assert.equal(posts.length, seededBlogPosts.length);
  for (const [index, post] of posts.entries()) {
    assert.equal(post.slug, seededBlogPosts[index].slug);
    assert.equal(post.content.length, seededBlogPosts[index].content.length, `${locale}: ${post.slug}`);
    for (const field of ['title', 'excerpt', 'seoTitle', 'seoDescription']) assert.ok(post[field]?.trim(), `${locale}: ${post.slug}.${field}`);
    for (const [blockIndex, block] of post.content.entries()) {
      assert.ok(block.children[0].text?.trim(), `${locale}: ${post.slug} block ${blockIndex}`);
      assert.equal(block.style, seededBlogPosts[index].content[blockIndex].style);
      assert.equal(block.listItem, seededBlogPosts[index].content[blockIndex].listItem);
    }
    if (locale !== 'ru') assert.doesNotMatch(JSON.stringify(post), /[А-Яа-яЁё]/u);
  }
  const localized = localizePath(locale, '/projects/example?topic=design#gallery');
  assert.equal(getLocaleFromPathname(localized.split('?')[0]), locale);
  for (const target of locales) {
    assert.equal(switchLocalePath(localized, target), localizePath(target, '/projects/example?topic=design#gallery'));
  }
  assert.equal(localizePath(locale, 'https://example.com'), 'https://example.com');
}
assert.equal(translateLegacyProject({ hero: { duration: '2 месяца' } }, 'en').hero.duration, '2 months');
assert.equal(translateLegacyProject({ hero: { duration: '2 месяца' } }, 'ro').hero.duration, '2 luni');
assert.equal(translateLegacyProject('New CMS text', 'en'), 'New CMS text');
console.log(`Localization checks passed: ${locales.length} languages, ${seededBlogPosts.length} complete articles per language, routes and legacy project translations.`);
