import mongoose, { Schema, Document, mongo } from "mongoose";
import Exam from "../exam.model";
enum BranchType {
    TYT_MAT = "tyt-mat",
    TYT_TR = "tyt-tr",
    TYT_SCIENCE = "tyt-science",
    TYT_SOCIAL = "tyt-social",
    AYT_MAT = "ayt-mat",
    AYT_FEN = "ayt-fen",
    AYT_SOZ1 = "ayt-soz1",
    AYT_SOZ2 = "ayt-soz2",
    AYT_PHY = "ayt-phy",
    AYT_CHEM = "ayt-chem",
    AYT_BIO = "ayt-bio",
    AYT_LITERATURE = "ayt-literature",
    AYT_HIS1 = "ayt-his1",
    AYT_HIS2 = "ayt-his2",
    AYT_GEO1 = "ayt-geo1",
    AYT_GEO2 = "ayt-geo2",
    AYT_DIN = "ayt-din",
    AYT_FELSEFE = "ayt-felsefe"
}

export interface IBranchDocument extends Document {
    _id: Schema.Types.ObjectId;
    type: BranchType
    solvingTime?: number;
    correct: number;
    wrong: number;
    empty: number;
    getTotal(): number;
}


interface IBranchModel extends mongoose.Model<IBranchDocument> { }

const BranchExamSchema = new Schema<IBranchDocument, IBranchModel>({
    type: { type: String, enum: ["tyt-mat", "tyt-tr", "tyt-science", "tyt-social", "ayt-mat", "ayt-science", "ayt-sos1", "ayt-sos2", "ayt-phy", "ayt-chem", "ayt-bio", "ayt-literature", "ayt-his1", "ayt-his2", "ayt-geo1", "ayt-geo2", "ayt-religion", "ayt-philosophy"], required: true },
    solvingTime: { type: Number, required: false },
    correct: { type: Number, required: true, min: 0, max: 40 },
    wrong: { type: Number, required: true, min: 0, max: 40 },
    empty: { type: Number, required: true, min: 0, max: 40 }
});


BranchExamSchema.methods.getTotal = function (this: IBranchDocument): number {
    return this.correct - this.wrong/4;
}

const BranchExam = Exam.discriminator<IBranchDocument>('BranchExam', BranchExamSchema) || (mongoose.models.BranchExam as mongoose.Model<IBranchDocument>)

export default BranchExam