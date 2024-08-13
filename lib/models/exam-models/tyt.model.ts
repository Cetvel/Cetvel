import mongoose, { Schema, model, Document } from 'mongoose'
import Exam from '../exam.model'
import { ITytMethods, TytMethods } from '../plugins/tyt.plugins'


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
export interface ITytDocument extends Tyt, Section, Document, ITytMethods {
    _id: Schema.Types.ObjectId;
}
const TytSchema = new Schema<ITytDocument>({
    solvingTime: { type: Number, required: false, max: 135 },
    math: { 
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 40 },
        wrong: { type: Number, required: true, min: 0, max: 40 },
        empty: { type: Number, required: true, min: 0, max: 40 }
    },
    science: {
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 20 },
        wrong: { type: Number, required: true, min: 0, max: 20 },
        empty: { type: Number, required: true, min: 0, max: 20 }
    },
    turkish: {
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 40 },
        wrong: { type: Number, required: true, min: 0, max: 40 },
        empty: { type: Number, required: true, min: 0, max: 40 }
    },
    social: {
        solvingTime: { type: Number, required: false, max: 135 },
        correct: { type: Number, required: true, min: 0, max: 20 },
        wrong: { type: Number, required: true, min: 0, max: 20 },
        empty: { type: Number, required: true, min: 0, max: 20 }
    }
});

(Object.keys(TytSchema.paths) as (keyof Section)[]).forEach(section => {
    TytSchema.virtual(`${section}.totalNet`).get(function (this: ITytDocument) {
        return this.calculateSectionNet(section);
    });
});

// Virtual for total net score
TytSchema.virtual('totalNet').get(function (this: ITytDocument) {
    return (Object.keys(this.toObject()) as (keyof Section)[])
        .reduce((sum, section) => sum + this.calculateSectionNet(section), 0);
});

TytSchema.methods = TytMethods;

const Tyt = (mongoose.models.Tyt as mongoose.Model<ITytDocument>) || 
    Exam.discriminator<ITytDocument>('Tyt', TytSchema);

export default Tyt;

