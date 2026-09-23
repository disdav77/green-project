import { ru } from './ru';
import { hy } from './hy';
import { en } from './en';
import { Language } from '@/types/database';
import { Dictionary } from './types';

export * from './types';

export const dictionaries: Record<Language, Dictionary> = {
  ru,
  hy,
  en,
};

export function getDictionary(lang: Language = 'ru'): Dictionary {
  return dictionaries[lang] || dictionaries.ru;
}
