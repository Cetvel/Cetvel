declare enum ExamTypes {
  YKS = 'YKS',
  LGS = 'LGS',
  KPSS = 'KPSS',
  ALES = 'ALES',
  DGS = 'DGS',
}

declare type ExamType =
  | 'YKS'
  | 'KPSS'
  | 'DGS'
  | 'ALES'
  | 'YDS'
  | 'TYT'
  | 'AYT'
  | 'LGS';
declare type StudyField = 'SAY' | 'EA' | 'SOZ' | 'DIL';

type Exam = {
  id: string;
  name: string;
  availableFor: StudyField[];
};

declare type SubjectConfig = {
  name: string;
  label: string;
  maxQuestions: number;
  forFields?: string[];
};

declare type FieldConfig = {
  name: string;
  label: string;
  options: string[];
};

declare type ExamConfig = {
  type: string;
  label: string;
  subjects: SubjectConfig[];
  field?: FieldConfig;
  totalTime: number;
};
