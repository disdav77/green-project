import { ru } from './ru';
import { hy } from './hy';
import { en } from './en';
import { Language } from '@/types/database';

export const dictionaries = {
  ru,
  hy,
  en,
};

export type Dictionary = typeof ru;

export function getDictionary(lang: Language = 'ru'): Dictionary {
  return dictionaries[lang] || dictionaries.ru;
}
