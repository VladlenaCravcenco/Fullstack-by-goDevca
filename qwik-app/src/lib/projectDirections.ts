import { directionLabel, resolveProjectDirections } from '../../../shared/projectDirections';
import type { Locale } from './i18n';

// Apply the selected directions to cards and case-study badges without changing CMS data.
export function withProjectDirections<T>(value: T, locale: Locale): T {
  if (Array.isArray(value)) return value.map((item) => withProjectDirections(item, locale)) as T;
  if (!value || typeof value !== 'object') return value;
  const result = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, withProjectDirections(item, locale)]));
  if (Array.isArray(result.directions) && result.directions.length) {
    const labels = resolveProjectDirections(result.directions).map((id) => directionLabel(id, locale));
    if ('tags' in result) result.tags = labels;
    if ('pills' in result) result.pills = labels;
  }
  return result as T;
}
