import Exam, { ExamDocument } from '../models/exam.model';
import ExamModelFilter from '../utils/examModelFilter';
import Tyt from '../models/exam-models/tyt.model';
import Ayt from '../models/exam-models/ayt.model';
import Lgs from '../models/exam-models/lgs.model';
// import Ayt from './models/ayt.model';
// import Kpss from './models/kpss.model';
import { TytDocument } from '../models/exam-models/tyt.model';
import { AytDocument } from '../models/exam-models/ayt.model';
import { LgsDocument } from '../models/exam-models/lgs.model';

interface ExamReturns<T> {
    type: T
}


interface IExamService {
    createExam(userId: string, examData: any, examType: string): Promise<ExamDocument>;
    // getExamById(examId: string): Promise<ExamReturns<AytDocument | TytDocument | LgsDocument>>;
    getUserExams(userId: string, examType: string): Promise<ExamDocument[]>;
    getExamsByType(userId: string): Promise<ExamReturns<AytDocument | TytDocument | LgsDocument>>;
    updateExam(examId: string, updateData: any): Promise<ExamDocument>;
    deleteExam(examId: string): Promise<ExamDocument>;
    getUserExamsByDateRange(userId: string, startDate: Date, endDate: Date): Promise<ExamDocument[]>;
    getUserExamStatistics(userId: string): Promise<void>;
    compareUserExams(userId: string, examId1: string, examId2: string): Promise<void>;
}

class ExamServiceClass implements IExamService {
    // Genel sınav oluşturma metodu
    async createExam(userId: string, examData: any, examType: string) {
        const ExamModel = ExamModelFilter(examType)
        const exam = new ExamModel(examData);
        if (!exam) throw new Error('Sınav oluşturulamadı');
        exam.userId = userId;
        return await exam.save();
    }

    // Kullanıcının tüm sınavlarını getirme
    async getUserExams(userId: string, examType: string) {
        const ExamModel = ExamModelFilter(examType)
        return await ExamModel.find({ userId }) as ExamDocument[];
    }

    // Sınav silme
    async deleteExam(examId: string) {
        return await Exam.findByIdAndDelete(examId);
    }

    // Belirli bir türdeki sınavları getirme
    async getExamsByType(examId: string): Promise<ExamReturns<AytDocument | TytDocument | LgsDocument>> {
        const exam = await Exam.findById(examId) as AytDocument | TytDocument | LgsDocument;

        if (!exam) throw new Error('Exam not found');

        if ('__t' in exam) {
            if (exam.__t === 'Ayt') {
                // Ayt özelliklerine erişim
                return { type: exam as AytDocument };
            } else if (exam.__t === 'Tyt') {
                // Tyt özelliklerine erişim
                return { type: exam as TytDocument };
            } else if (exam.__t === 'Lgs') {
                // Lgs özelliklerine erişim
                return { type: exam as LgsDocument };
            } else {
                throw new Error('Invalid exam type');
            }
        } else {
            throw new Error('Invalid exam type');
        }
    }

    // Sınav güncelleme
    async updateExam(examId: string, updateData: any) {
        return await Exam.findByIdAndUpdate(examId, updateData, { new: true });
    }
    async getUserExamsByUserId(userId: string, examType: string) {
        return await Exam.find({ userId })
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