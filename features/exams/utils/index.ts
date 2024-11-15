import { z } from 'zod';

export const createDynamicSchema = (
  config: ExamConfig,
  selectedField?: string
) => {
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

  let baseSchema: Record<string, any> = {
    examName: z.string().min(1, { message: 'Sınav adı zorunludur' }),
    examType: z.string(),
    solvingDate: z.date(),
    solvingTime: z.coerce
      .number()
      .min(0)
      .max(config.totalTime, {
        message: `Toplam süre ${config.totalTime} dakikayı geçemez`,
      }),
  };

  if (config.field) {
    baseSchema = {
      ...baseSchema,
      [config.field.name]: z
        .string()
        .min(1, { message: 'Alan seçimi zorunludur' }),
    };
  }

  const subjectFields: Record<string, any> = {};

  config.subjects.forEach((subject) => {
    if (subject.forFields) {
      if (!selectedField || !subject.forFields.includes(selectedField)) {
        return;
      }
    }

    subjectFields[subject.name] = subjectSchema;
  });

  return z.object({
    ...baseSchema,
    ...subjectFields,
  });
};

export const calculateNet = (correct: number, wrong: number) => {
  return correct - wrong / 4;
};
