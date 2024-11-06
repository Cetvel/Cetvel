import { z } from 'zod';

export const createDynamicSchema = (config: ExamConfig) => {
  const subjectSchema = (maxQuestions: number) =>
    z
      .object({
        solvingTime: z.coerce
          .number()
          .min(0, {
            message: 'Çözüm süresi 0 dakikadan az olamaz.',
          })
          .max(config.totalTime || 180, {
            message: `Çözüm süresi ${config.totalTime || 180}'i geçemez.`,
          })
          .optional(),
        correct: z.coerce
          .number()
          .min(0, {
            message: `Doğru sayısı 0'dan küçük olamaz.`,
          })
          .max(maxQuestions, {
            message: `Doğru sayısı ${maxQuestions}'i geçemez.`,
          }),
        wrong: z.coerce
          .number()
          .min(0, {
            message: `Yanlış sayısı 0'dan küçük olamaz.`,
          })
          .max(maxQuestions, {
            message: `Yanlış sayısı ${maxQuestions}'i geçemez.`,
          }),
      })
      .refine((data) => data.correct + data.wrong <= maxQuestions, {
        message: `Toplam soru sayısı ${maxQuestions}'i geçemez.`,
        path: ['correct'],
      });

  const schemaFields: Record<string, z.ZodTypeAny> = {
    examName: z.string().min(1, 'Sınav adı gereklidir.'),
    solvingTime: z.coerce
      .number()
      .min(0)
      .max(config.totalTime || 180)
      .optional(),
    solvingDate: z.date({
      required_error: 'Lütfen sınav tarihini seçin',
      invalid_type_error: 'Geçersiz tarih formatı',
    }),
  };

  config.fields?.forEach((field) => {
    schemaFields[field.name] = z.enum(field.options as [string, ...string[]]);
  });

  config.subjects.forEach((subject) => {
    schemaFields[subject.name] = subjectSchema(subject.maxQuestions);
  });

  return z.object(schemaFields);
};

export const calculateNet = (correct: number, wrong: number) => {
  return correct - wrong / 4;
};
