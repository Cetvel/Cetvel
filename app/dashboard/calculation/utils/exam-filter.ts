export enum StudyField {
  YKS = 'YKS',
  LGS = 'LGS',
  KPSS = 'KPSS',
  ALES = 'ALES',
  DGS = 'DGS',
}

type Exam = {
  id: string;
  name: string;
  availableFor: StudyField[];
};

const exams: Exam[] = [
  { id: 'TYT', name: 'TYT', availableFor: [StudyField.YKS] },
  { id: 'AYT', name: 'AYT', availableFor: [StudyField.YKS] },
  { id: 'LGS', name: 'LGS', availableFor: [StudyField.LGS] },
  { id: 'KPSS', name: 'KPSS', availableFor: [StudyField.KPSS] },
  { id: 'ALES', name: 'ALES', availableFor: [StudyField.ALES, StudyField.DGS] },
  { id: 'DGS', name: 'DGS', availableFor: [StudyField.DGS] },
];

export function getAvailableExams(userStudyField: StudyField): Exam[] {
  return exams.filter((exam) => exam.availableFor.includes(userStudyField));
}
