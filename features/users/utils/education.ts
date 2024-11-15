import { gradeOptions } from '../configs';

export const determineEducationLevel = (grade?: number): EducationLevel => {
  if (!grade) return 'Mezun';
  if (grade >= 9 && grade <= 12) return 'Lise';
  if (grade >= 5 && grade <= 8) return 'Ortaokul';
  if (grade >= 1 && grade <= 4) return 'İlkokul';
  return 'Lise';
};

export const getDefaultGrade = (
  educationLevel: EducationLevel,
  userGrade?: number
) => {
  if (!educationLevel || educationLevel === 'Mezun') return undefined;

  const availableGrades = gradeOptions[educationLevel];
  if (!availableGrades?.length) return undefined;

  if (userGrade && availableGrades.includes(userGrade)) {
    return userGrade;
  }

  return availableGrades[availableGrades.length - 1];
};

export const getExamValue = (
  educationLevel: EducationLevel,
  userExam?: string
): string | undefined => {
  if (educationLevel === 'Lise') return 'YKS';
  if (educationLevel === 'Ortaokul') return 'LGS';
  if (educationLevel === 'Mezun') return userExam;
  return undefined;
};
