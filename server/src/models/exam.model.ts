import mongoose, { Schema, Document, Model } from "mongoose";

interface Exam {
    userId?: mongoose.Types.ObjectId,
    examField: {
        type: "lgs" | "tyt" | "ayt" | "kpss"
    },
    examName: string,
    examDate?: Date,

    //Total Kisimlar icin
    correctAnswers: number,
    wrongAnswers: number,
    emptyAnswers: number,
    totalNet: number,
    solvingTime?: number,
    createdAt: Date,
    updatedAt: Date

}

interface ExamDocument extends Exam, Document {
    _id: Schema.Types.ObjectId;
}

interface ExamModel extends Model<ExamDocument> { }

const examSchema = new mongoose.Schema<ExamDocument, ExamModel>({
    userId: {
        type: Schema.Types.ObjectId, ref: 'user',
        required: true
    },
    examField: {
        type: String,
        enum: ['lgs', 'tyt', 'ayt', 'kpss']
    },
    examName: { type: String, required: true }, 
    correctAnswers: { type: Number, required: true },  
    wrongAnswers: { type: Number, required: true },
    emptyAnswers: { type: Number, required: true },
    totalNet: { type: Number, required: true },
    solvingTime: { type: Number , required: false},
},
    {
        discriminatorKey: 'examField',
        timestamps: true
    }
)

const Exam = mongoose.model<ExamDocument, ExamModel>('exam', examSchema);

export default Exam;
