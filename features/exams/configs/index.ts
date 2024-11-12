export const examConfigs: ExamConfig[] = [
  {
    type: 'TYT',
    label: 'TYT (Temel Yeterlilik Testi)',
    subjects: [
      { name: 'turkish', label: 'Türkçe', maxQuestions: 40 },
      { name: 'math', label: 'Temel Matematik', maxQuestions: 40 },
      { name: 'social', label: 'Sosyal Bilimler', maxQuestions: 20 },
      { name: 'science', label: 'Fen Bilimleri', maxQuestions: 20 },
    ],
    totalTime: 165,
  },
  {
    type: 'AYT',
    label: 'AYT (Alan Yeterlilik Testi)',
    field: {
      name: 'field',
      label: 'Alan',
      options: ['SAY', 'EA', 'SOZ'],
    },
    subjects: [
      {
        name: 'literature',
        label: 'Türk Dili ve Edebiyatı',
        maxQuestions: 24,
        forFields: ['EA', 'SOZ'],
      },
      {
        name: 'history1',
        label: 'Tarih-1',
        maxQuestions: 13,
        forFields: ['EA'],
      },
      {
        name: 'history2',
        label: 'Tarih-2',
        maxQuestions: 13,
        forFields: ['SOZ'],
      },
      {
        name: 'geography1',
        label: 'Coğrafya-1',
        maxQuestions: 6,
        forFields: ['EA'],
      },
      {
        name: 'math',
        label: 'Matematik',
        maxQuestions: 40,
        forFields: ['SAY', 'EA'],
      },
      { name: 'physics', label: 'Fizik', maxQuestions: 14, forFields: ['SAY'] },
      {
        name: 'chemistry',
        label: 'Kimya',
        maxQuestions: 13,
        forFields: ['SAY'],
      },
      {
        name: 'biology',
        label: 'Biyoloji',
        maxQuestions: 13,
        forFields: ['SAY'],
      },
      {
        name: 'geography2',
        label: 'Coğrafya-2',
        maxQuestions: 11,
        forFields: ['SOZ'],
      },
      {
        name: 'philosophy',
        label: 'Felsefe',
        maxQuestions: 12,
        forFields: ['SOZ'],
      },
      {
        name: 'religion',
        label: 'Din Kültürü',
        maxQuestions: 6,
        forFields: ['SOZ'],
      },
      {
        name: 'language',
        label: 'Yabancı Dil',
        maxQuestions: 80,
        forFields: ['dil'],
      },
    ],
    totalTime: 180,
  },
  {
    type: 'LGS',
    label: 'LGS (Liselere Geçiş Sınavı)',
    field: {
      name: 'educationStyle',
      label: 'Eğitim Stili',
      options: ['Din Kültürü ve Ahlak Bilgisi', 'Yabancı Dil'],
    },

    subjects: [
      { name: 'turkish', label: 'Türkçe', maxQuestions: 20 },
      { name: 'math', label: 'Matematik', maxQuestions: 20 },
      { name: 'science', label: 'Fen Bilimleri', maxQuestions: 20 },
      {
        name: 'social',
        label: 'T.C. İnkılap Tarihi ve Atatürkçülük',
        maxQuestions: 10,
      },
      {
        name: 'religion',
        label: 'Din Kültürü ve Ahlak Bilgisi',
        maxQuestions: 10,
      },
      { name: 'english', label: 'Yabancı Dil', maxQuestions: 10 },
    ],
    totalTime: 120,
  },
  {
    type: 'DGS',
    label: 'DGS (Dikey Geçiş Sınavı)',
    subjects: [
      { name: 'turkish', label: 'Sözel Bölüm', maxQuestions: 60 },
      { name: 'math', label: 'Sayısal Bölüm', maxQuestions: 60 },
    ],
    totalTime: 150,
  },
  {
    type: 'YDS',
    label: 'YDS (Yabancı Dil Sınavı)',
    subjects: [{ name: 'english', label: 'Yabancı Dil', maxQuestions: 80 }],
    totalTime: 180,
  },
  {
    type: 'ALES',
    label: 'ALES (Akademik Personel ve Lisansüstü Eğitimi Giriş Sınavı)',
    subjects: [
      { name: 'soz', label: 'Sözel Bölüm', maxQuestions: 50 },
      { name: 'say', label: 'Sayısal Bölüm', maxQuestions: 50 },
    ],
    totalTime: 135,
  },
  {
    type: 'KPSS',
    label: 'KPSS (Kamu Personeli Seçme Sınavı)',
    subjects: [
      { name: 'turkish', label: 'Türkçe', maxQuestions: 40 },
      { name: 'math', label: 'Matematik', maxQuestions: 40 },
      { name: 'history', label: 'Tarih', maxQuestions: 20 },
      { name: 'geography', label: 'Coğrafya', maxQuestions: 20 },
      { name: 'citizenship', label: 'Vatandaşlık', maxQuestions: 10 },
      { name: 'currentEvents', label: 'Güncel Olaylar', maxQuestions: 10 },
    ],
    totalTime: 130,
  },
];
