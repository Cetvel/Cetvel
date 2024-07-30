import Exam, { ExamDocument } from '../models/exam.model';
import Tyt from '../models/exam-models/tyt.model';
import Ayt from '../models/exam-models/ayt.model';
import Lgs from '../models/exam-models/lgs.model';
// import Ayt from './models/ayt.model';
// import Kpss from './models/kpss.model';

interface IExamService {
    createExam(userId: string, examData: any, examType: string): Promise<ExamDocument>;
    getExamById(examId: string): Promise<ExamDocument>;
    getUserExams(userId: string): Promise<ExamDocument[]>;
    getUserExamsByType(userId: string, examType: string): Promise<ExamDocument[]>;
    updateExam(examId: string, updateData: any): Promise<ExamDocument>;
    deleteExam(examId: string): Promise<ExamDocument>;
    getUserExamsByDateRange(userId: string, startDate: Date, endDate: Date): Promise<ExamDocument[]>;
    getUserExamStatistics(userId: string): Promise<void>;
    compareUserExams(userId: string, examId1: string, examId2: string): Promise<void>;
}

class ExamServiceClass implements IExamService {
    // Genel sınav oluşturma metodu
    async createExam(userId: string, examData: any, examType: string) {
        let ExamModel: any;
        switch (examType) {
            case 'tyt':
                ExamModel = Tyt;
                break;
            case 'say':
                ExamModel = Ayt;
                break;
            case 'ea':
                ExamModel = Ayt;
                break;
            case 'soz':
                ExamModel = Ayt;
                break;
            case 'lgs':
                ExamModel = Lgs;
                break;
                // case 'kpss':
                //     ExamModel = Kpss;
                //     break;
                default:
                throw new Error('Geçersiz sınav türü');
        }

        const exam = new ExamModel(examData);
        if (!exam) throw new Error('Sınav oluşturulamadı');

        exam.userId = userId;

        return await exam.save();
    }

    // Belirli bir sınavı getirme
    async getExamById(examId: string) {
        return await Exam.findById(examId) as ExamDocument;
    }

    // Kullanıcının tüm sınavlarını getirme
    async getUserExams(userId: string) {
        return await Exam.find({ userId }) as ExamDocument[];
    }

    // Sınav silme
    async deleteExam(examId: string) {
        return await Exam.findByIdAndDelete(examId);

    }

    // Belirli bir türdeki sınavları getirme
    async getUserExamsByType(userId: string, examType: string) {
        return await Exam.find({ userId }, { examField: examType });
    }

    // Sınav güncelleme
    async updateExam(examId: string, updateData: any) {
        return await Exam.findByIdAndUpdate(examId, updateData, { new: true });
    }


    // Kullanıcının belirli bir tarih aralığındaki sınavlarını getirme
    async getUserExamsByDateRange(userId: string, startDate: Date, endDate: Date) {
        return await Exam.find({
            userId,
            examDate: { $gte: startDate, $lte: endDate }
        });
    }

    // İstatistiksel analizler
    async getUserExamStatistics(userId: string) {
        const exams = await Exam.find({ userId });
        // Burada kullanıcının tüm sınavlarına dayalı istatistikler hesaplanabilir
        // Örneğin: ortalama puan, en yüksek puan, sınav sayısı, vs.
    }

    // Karşılaştırmalı analizler
    async compareUserExams(userId: string, examId1: string, examId2: string) {
        const exam1 = await Exam.findById(examId1);
        const exam2 = await Exam.findById(examId2);
        if (!exam1 || !exam2) throw new Error('Sınavlardan biri veya ikisi bulunamadı');
        // Burada iki sınav karşılaştırılabilir
    }
}
const examService = new ExamServiceClass();


export default examService;