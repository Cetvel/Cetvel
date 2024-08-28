import mongoose, { Schema, model, Document } from 'mongoose'
import Exam from '../exam.model'


export interface IKPSS {
    solvingTime?: number,
    math: {
        solvingTime?: number,
        correct: number,
        wrong: number,
        empty: number,
    },
    turkish: {
        solvingTime?: number,
        correct: number,
        wrong: number,
        empty: number,
    },
    history: {
        solvingTime?: number,
        correct: number,
        wrong: number,
        empty: number,
    },
    geography: {
        solvingTime?: number,
        correct: number,
        wrong: number,
        empty: number,
    },
    citizenship:{
        solvingTime?: number,
        correct: number,
        wrong: number,
        empty: number,
    },
    currentEvents:{
        solvingTime?: number,
        correct: number,
        wrong: number,
        empty: number,
    },

    point: number
}


export interface IKPSSDocument extends IKPSS, Document {
    _id: Schema.Types.ObjectId;
}
const KpssSchema = new Schema<IKPSSDocument>({
    solvingTime: { type: Number, required: false, max: 135 },
    math: { 
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 40 },
        wrong: { type: Number, required: true, min: 0, max: 40 },
        empty: { type: Number, required: true, min: 0, max: 40 }
    },
    turkish: {
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 40 },
        wrong: { type: Number, required: true, min: 0, max: 40 },
        empty: { type: Number, required: true, min: 0, max: 40 }
    },
    history: {
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 40 },
        wrong: { type: Number, required: true, min: 0, max: 40 },
        empty: { type: Number, required: true, min: 0, max: 40 }
    },
    geography: {
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 40 },
        wrong: { type: Number, required: true, min: 0, max: 40 },
        empty: { type: Number, required: true, min: 0, max: 40 }
    },
    citizenship: {
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 40 },
        wrong: { type: Number, required: true, min: 0, max: 40 },
        empty: { type: Number, required: true, min: 0, max: 40 }
    },
    currentEvents: {
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 40 },
        wrong: { type: Number, required: true, min: 0, max: 40 },
        empty: { type: Number, required: true, min: 0, max: 40 }
    },
    point: { type: Number, required: false, min: 0, max: 100 }
});


const Kpss = (mongoose.models.Kpss as mongoose.Model<IKPSSDocument>) || 
    Exam.discriminator<IKPSSDocument>('Kpss', KpssSchema);

export default Kpss;

