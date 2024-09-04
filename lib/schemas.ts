import { z } from 'zod';

export const onboardingSchema = z.object({
  educationLevel: z.enum(['İlkokul', 'Ortaokul', 'Lise', 'Mezun'], {
    required_error: 'Eğitim seviyesi seçmek zorunludur',
  }),
  courseSubjects: z.string({
    required_error: 'Sınav türü seçmek zorunludur',
  }),
  field: z.enum(['Sayısal', 'Sözel', 'Eşit Ağırlık', 'Dil'], {
    required_error: 'Alan seçmek zorunludur',
  }),
});

export const TaskSchema = z.object({
  title: z
    .string({
      required_error: 'Başlık girmek zorunludur',
    })
    .min(2, { message: 'Başlık en az 2 karakter uzunluğunda olmalı' }),
  startsAt: z.date({
    required_error: 'Başlangıç tarihi girmek zorunludur',
  }),
  endsAt: z.date({
    required_error: 'Bitiş tarihi girmek zorunludur',
  }),
  tag: z.string({
    required_error: 'Etiket seçmek zorunludur',
  }),
});

export const TagSchema = z.object({
  label: z
    .string({
      required_error: 'Etiket girmek zorunludur',
    })
    .min(2, { message: 'Etiket en az 2 karakter uzunluğunda olabilir' })
    .max(50, {
      message: 'Etiket en fazla 50 karakter uzunluğunda olabilir',
    }),
});

export const GoalSchema = z.object({
  title: z.string({
    required_error: 'Hedef girmek zorunludur',
  }),
  type: z.enum(['Günlük', 'Haftalık', 'Aylık'], {
    required_error: 'Hedef tipi seçmek zorunludur',
  }),
  target: z.number({
    required_error: 'Hedef sayı girmek zorunludur',
  }),
  unit: z.enum(['Saat', 'Dakika', 'Sayı', 'Konu sayısı'], {
    required_error: 'Hedef birimi seçmek zorunludur',
  }),
  startsAt: z.date({
    required_error: 'Başlangıç tarihi girmek zorunludur',
  }),
  related: z.string({
    required_error: 'İlgili konu veya ders seçmek zorunludur',
  }),
});

export const FocusTimeSchema = z.object({
  title: z
    .string({
      required_error: 'Başlık girmek zorunludur',
    })
    .min(2, { message: 'Başlık en az 2 karakter uzunluğunda olmalı' }),
  tag: z
    .string({
      required_error: 'Etiket seçmek zorunludur',
    })
    .min(2, { message: 'Etiket en az 2 karakter uzunluğunda olmalı' }),
});

export const FocusSessionSchema = z.object({
  title: z
    .string({
      required_error: 'Başlık girmek zorunludur',
    })
    .min(2, { message: 'Başlık en az 2 karakter uzunluğunda olmalı' }),
  tag: z
    .string({
      required_error: 'Etiket seçmek zorunludur',
    })
    .min(2, { message: 'Etiket en az 2 karakter uzunluğunda olmalı' }),
  duration: z.coerce.number({
    required_error: 'Süre girmek zorunludur',
    invalid_type_error: 'Bir sayı girişi yapmalısın',
  }),
  startsAt: z.date({
    required_error: 'Tarih girmek zorunludur',
  }),
});
