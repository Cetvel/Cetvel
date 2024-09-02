import mongoose, { Schema, model, Document } from 'mongoose'
import Exam from '../exam.model'


export interface IKPSS {
    solvingTime?: number,
    math: {
        solvingTime?: number,
        correct: number,
        wrong: number
    },
    turkish: {
        solvingTime?: number,
        correct: number,
        wrong: number
    },
    history: {
        solvingTime?: number,
        correct: number,
        wrong: number
    },
    geography: {
        solvingTime?: number,
        correct: number,
        wrong: number
    },
    citizenship:{
        solvingTime?: number,
        correct: number,
        wrong: number
    },
    currentInformations:{
        solvingTime?: number,
        correct: number,
        wrong: number
    },

    point: number
}


export interface IKPSSDocument extends IKPSS, Document {
    _id: Schema.Types.ObjectId;
}
const KpssSchema = new Schema<IKPSSDocument>({
    solvingTime: { type: Number, required: false, max: 130 },
    math: { 
        solvingTime: { type: Number, required: false, max: 130 },
        correct: { type: Number, required: true, min: 0, max: 30 },
        wrong: { type: Number, required: true, min: 0, max: 30 },
    },
    turkish: {
        solvingTime: { type: Number, required: false, max: 130 },
        correct: { type: Number, required: true, min: 0, max: 30 },
        wrong: { type: Number, required: true, min: 0, max: 30 },
    },
    history: {
        solvingTime: { type: Number, required: false, max: 130 },
        correct: { type: Number, required: true, min: 0, max: 27 },
        wrong: { type: Number, required: true, min: 0, max: 27 },
    },
    geography: {
        solvingTime: { type: Number, required: false, max: 130 },
        correct: { type: Number, required: true, min: 0, max: 18 },
        wrong: { type: Number, required: true, min: 0, max: 18 },
    },
    citizenship: {
        solvingTime: { type: Number, required: false, max: 130 },
        correct: { type: Number, required: true, min: 0, max: 9 },
        wrong: { type: Number, required: true, min: 0, max: 9 },
    },
    currentInformations: {
        solvingTime: { type: Number, required: false, max: 130 },
        correct: { type: Number, required: true, min: 0, max: 6 },
        wrong: { type: Number, required: true, min: 0, max: 6 },
    },
    point: { type: Number, required: true, max: 100 }
});


const Kpss = (mongoose.models.Kpss as mongoose.Model<IKPSSDocument>) || 
    Exam.discriminator<IKPSSDocument>('Kpss', KpssSchema);

export default Kpss;

