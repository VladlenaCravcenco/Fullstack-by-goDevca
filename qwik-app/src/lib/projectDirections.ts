import type { Locale } from './i18n';

// Apply the selected directions to cards and case-study badges without changing CMS data.
export function withProjectDirections<T>(value: T, locale: Locale): T {
  if (Array.isArray(value)) return value.map((item) => withProjectDirections(item, locale)) as T;
  if (!value || typeof value !== 'object') return value;
  const result = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, withProjectDirections(item, locale)]));
  if ('tags' in result || 'pills' in result) {
    const labels = Array.isArray(result.directionRefs)
      ? result.directionRefs.filter((item: any) => item?.title).map((item: any) => item.title)
      : [];
    if ('tags' in result) result.tags = labels;
    if ('pills' in result) result.pills = labels;
  }
  return result as T;
}

export function getProjectDirections(project: any, _locale: Locale): Array<{value: string; label: string}> {
  if (Array.isArray(project.directionRefs)) {
    return project.directionRefs.filter((item: any) => item?._id && item?.title)
      .map((item: any) => ({value: item._id, label: item.title}));
  }
  return [];
}
