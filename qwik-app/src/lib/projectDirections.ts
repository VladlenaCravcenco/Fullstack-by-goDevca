import { directionLabel, resolveProjectDirections } from '../../../shared/projectDirections';
import type { Locale } from './i18n';

// Apply the selected directions to cards and case-study badges without changing CMS data.
export function withProjectDirections<T>(value: T, locale: Locale): T {
  if (Array.isArray(value)) return value.map((item) => withProjectDirections(item, locale)) as T;
  if (!value || typeof value !== 'object') return value;
  const result = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, withProjectDirections(item, locale)]));
  if (Array.isArray(result.directionRefs)) {
    const labels = result.directionRefs.filter((item: any) => item?.title).map((item: any) => item.title);
    if ('tags' in result) result.tags = labels;
    if ('pills' in result) result.pills = labels;
  } else if (Array.isArray(result.directions) && result.directions.length) {
    const labels = resolveProjectDirections(result.directions).map((id) => directionLabel(id, locale));
    if ('tags' in result) result.tags = labels;
    if ('pills' in result) result.pills = labels;
  }
  return result as T;
}

export function getProjectDirections(project: any, locale: Locale): Array<{value: string; label: string}> {
  if (Array.isArray(project.directionRefs)) {
    return project.directionRefs.filter((item: any) => item?._id && item?.title)
      .map((item: any) => ({value: item._id, label: item.title}));
  }
  const values = project.directions?.length ? project.directions : project.tags || [];
  return [...new Set<string>(values)].map((value) => ({value, label: directionLabel(value, locale)}));
}
