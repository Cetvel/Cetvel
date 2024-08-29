import mongoose, { Schema, model, Document } from 'mongoose'
import Exam from '../exam.model'


export interface IDGS {
    solvingTime?: number,
    math: {
        solvingTime?: number,
        correct: number,
        wrong: number,
    },
    turkish: {
        solvingTime?: number,
        correct: number,
        wrong: number,
    }
}


export interface IDGSDocument extends IDGS, Document {
    _id: Schema.Types.ObjectId;
}
const DgsSchema = new Schema<IDGSDocument>({
    solvingTime: { type: Number, required: false, max: 135 },
    math: { 
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 40 },
        wrong: { type: Number, required: true, min: 0, max: 40 }
    },
    turkish: {
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 40 },
        wrong: { type: Number, required: true, min: 0, max: 40 }
    },
});


const Dgs = (mongoose.models.Dgs as mongoose.Model<IDGSDocument>) || 
    Exam.discriminator<IDGSDocument>('Dgs', DgsSchema);

export default Dgs;

