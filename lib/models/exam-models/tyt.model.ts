import mongoose, { Schema, model, Document } from 'mongoose'
import Exam from '../exam.model'


export interface Section {
    math: {
        solvingTime?: number,
        correct: number,
        wrong: number,
        empty: number,
    },
    science: {
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
    social: {
        solvingTime?: number,
        correct: number,
        wrong: number,
        empty: number,
    }
}

export interface Tyt {
    solvingTime?: number
}
export interface ITytDocument extends Tyt, Section, Document {
    _id: Schema.Types.ObjectId;
}
const TytSchema = new Schema<ITytDocument>({
    solvingTime: { type: Number, required: false, max: 135 },
    math: { 
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 40 },
        wrong: { type: Number, required: true, min: 0, max: 40 },
    },
    science: {
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 20 },
        wrong: { type: Number, required: true, min: 0, max: 20 },
    },
    turkish: {
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 40 },
        wrong: { type: Number, required: true, min: 0, max: 40 },
    },
    social: {
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 20 },
        wrong: { type: Number, required: true, min: 0, max: 20 },
    }
});


const Tyt = (mongoose.models.Tyt as mongoose.Model<ITytDocument>) || 
    Exam.discriminator<ITytDocument>('TYT', TytSchema);

export default Tyt;

