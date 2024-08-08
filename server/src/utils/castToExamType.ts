// import { Document } from 'mongoose';
// import Tyt, { TytDocument } from '../models/exam-models/tyt.model';
// import Ayt, { AytDocument } from '../models/exam-models/ayt.model';
// import Lgs, { LgsDocument } from '../models/exam-models/lgs.model';

// type ExamTypes = TytDocument | AytDocument | LgsDocument;

// const castToExamType = (exam: Document | null): ExamTypes | null => {
//     if (!exam) return null;

//     switch (exam.__t) {
//         case 'Tyt':
//             return exam as TytDocument;
//         case 'Ayt':
//             return exam as AytDocument;
//         case 'Lgs':
//             return exam as LgsDocument;
//         default:
//             throw new Error('Geçersiz sınav türü');
//     }
// }


