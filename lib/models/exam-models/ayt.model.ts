import mongoose, { Schema, Document, Model } from "mongoose";
import Exam from "../exam.model";
export interface Section {
    math?: { solvingTime?: number, correct: number, wrong: number, },
    physics?: { solvingTime?: number, correct: number, wrong: number, },
    chemistry?: { solvingTime?: number, correct: number, wrong: number },
    biology?: { solvingTime?: number, correct: number, wrong: number, },
    literature?: { solvingTime?: number, correct: number, wrong: number, },
    history1?: { solvingTime?: number, correct: number, wrong: number, },
    geography1?: { solvingTime?: number, correct: number, wrong: number, },
    history2?: { solvingTime?: number, correct: number, wrong: number, },
    geography2?: { solvingTime?: number, correct: number, wrong: number, },
    philosophy?: { solvingTime?: number, correct: number, wrong: number, },
    religion?: { solvingTime?: number, correct: number, wrong: number, }
}

interface Ayt {
    aytType: {
        type: string,
        enum: ['say', 'ea', `soz`],
    },
    solvingTime?: {
        type: number
        max: 180
    }
}

export interface AytDocument extends Ayt, Document, Section {
    _id: Schema.Types.ObjectId;
}



const AytSchema: Schema<AytDocument> = new Schema({
    aytType: { type: String, enum: ['say', 'ea', 'soz'], required: true },
    solvingTime: { type: Number, required: false },
    // Say ve Ea icin ortak alanlar

    math: {
        solvingTime: { type: Number, required: false },
        correct: { type: Number, max: 40 },
        wrong: { type: Number, max: 40 },
    },
    //Say icin alanlar
    physics: {
        solvingTime: { type: Number, required: false },
        correct: { type: Number, max: 14 },
        wrong: { type: Number, max: 14 }
    },
    chemistry: {
        solvingTime: { type: Number, required: false },
        correct: { type: Number, max: 13 },
        wrong: { type: Number, max: 13 },
    },
    biology: {
        solvingTime: { type: Number, required: false },
        correct: { type: Number, max: 13 },
        wrong: { type: Number, max: 13 }
    },

    //EA ve Soz icin alanlar
    literature: {
        solvingTime: { type: Number, required: false },
        correct: { type: Number, max: 24 },
        wrong: { type: Number, max: 24 },
    },

    history1: {
        solvingTime: { type: Number, required: false },
        correct: { type: Number, max: 10 },
        wrong: { type: Number, max: 10 },
    },
    geography1: {
        solvingTime: { type: Number, required: false },
        correct: { type: Number, max: 6 },
        wrong: { type: Number, max: 6 },
    },

    //Soz icin Alanlar
    philosophy: {
        solvingTime: { type: Number, required: false },
        correct: { type: Number, max: 12 },
        wrong: { type: Number, max: 12 },
    },
    religion: {
        solvingTime: { type: Number, required: false },
        correct: { type: Number, max: 6 },
        wrong: { type: Number, max: 6 },
    },
    history2: {
        solvingTime: { type: Number, required: false },
        correct: { type: Number, max: 11 },
        wrong: { type: Number, max: 11 },
    },
    geography2: {
        solvingTime: { type: Number, required: false },
        correct: { type: Number, max: 11 },
        wrong: { type: Number, max: 11 },
    }
})

const Ayt = (mongoose.models.Ayt as mongoose.Model<AytDocument>) ||
    Exam.discriminator<AytDocument>('Ayt', AytSchema);

export default Ayt;