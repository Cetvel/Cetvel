import Tyt from '../models/exam-models/tyt.model';
import Ayt from '../models/exam-models/ayt.model';
import Lgs from '../models/exam-models/lgs.model';

const ExamModelFilter = (examType : string) : any => {
    let ExamModel: any;
    switch (examType) {
        case 'tyt':
            return   Tyt;
        case 'say':
        case 'ea':
        case 'soz':
            return   Ayt;
        case 'lgs':
            ExamModel = Lgs;
            return ExamModel;
            
        // case 'kpss':
        //     return ;
        //  Kpss;
        default:
            throw new Error('Geçersiz sınav türü');
    }
}

export default ExamModelFilter;

