declare type User = {
  _id: string;
  kindeId: string;
  name: string;
  email: string;
  profile_picture: string | undefined;
  cover_picture: string | undefined;
  timer_picture: string | undefined;
  field: StudyField;
  grade: number;
  exam: ExamType;
};
