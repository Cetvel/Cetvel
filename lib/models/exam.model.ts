import mongoose, { Schema, Document, Model } from "mongoose";

interface Exam {
    userId: mongoose.Types.ObjectId,
    kindeId: string,
    examName: string,
    examDate: Date,
    solvingDate: Date
}

export interface ExamDocument extends Exam, Document {
    _id: Schema.Types.ObjectId;
}

interface ExamModel extends Model<ExamDocument> {}

const examSchema = new mongoose.Schema<ExamDocument, ExamModel>({
    kindeId: {
        type: String,
        required: true,
        index: true
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'user',
        required: false
    },
    examName: { type: String, required: true },
    solvingDate: { type: Date, required: true }
}, {
    discriminatorKey: 'examType',
    timestamps: true
});

// Static metod
examSchema.statics.findByUserAndDateRange = function (userId: string, startDate: Date, endDate: Date): Promise<ExamDocument[]> {
    return this.find({
        userId: userId,
        examDate: { $gte: startDate, $lte: endDate }
    }).exec();
}

const Exam = mongoose.models.Exam || mongoose.model<ExamDocument, ExamModel>('Exam', examSchema);

export default Exam;

// Performans analizi metodu
// examSchema.methods.analyzePerformance = function (this: ExamDocument): object {
//     const totalQuestions = this.correctAnswers + this.wrongAnswers + this.emptyAnswers;
//     return {
//         accuracy: (this.correctAnswers / totalQuestions) * 100,
//         completionRate: ((this.correctAnswers + this.wrongAnswers) / totalQuestions) * 100,
//         averageTimePerQuestion: this.solvingTime ? this.solvingTime / totalQuestions : null
//     };
// };

// // Önceki sınavla karşılaştırma metodu
// examSchema.methods.compareWithPrevious = function (this: ExamDocument, previousExam: ExamDocument): object {
//     return {
//         netDifference: this.totalNet - previousExam.totalNet,
//         scoreDifference: this.totalNet - previousExam.totalNet,
//         timeDifference: this.solvingTime && previousExam.solvingTime ?
//             this.solvingTime - previousExam.solvingTime : null
//     };
// };

// Static metod: Belirli bir kullanıcının belirli bir tarih aralığındaki sınavlarını bulma