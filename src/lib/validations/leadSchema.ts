import { z } from 'zod';

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(60, 'Имя слишком длинное'),
  phone: z
    .string()
    .min(6, 'Введите корректный номер телефона')
    .max(25, 'Номер телефона слишком длинный')
    .regex(/^(\+?[0-9\s\-()]{6,25})$/, 'Недопустимый формат номера телефона'),
  preferredProject: z.string().optional().default('all'),
  preferredTime: z.string().optional().default('anytime'),
  notes: z.string().max(300, 'Сообщение слишком длинное').optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
