import { Schema, Document } from "mongoose";
import Exam from "../exam.model";

export interface Section {
    math: {
        correct: number,
        wrong: number,
        empty: number,
    },
    turkish: {
        correct: number,
        wrong: number,
        empty: number,
    },
    social: {
        correct: number,
        wrong: number,
        empty: number,
    },
    science: {
        correct: number,
        wrong: number,
        empty: number,
    },
    english?: {
        correct: number,
        wrong: number,
        empty: number,
    },
    religion?: {
        correct: number,
        wrong: number,
        empty: number,
    }
}

interface Lgs {
    sozSolvingTime ?: {
        type:  number ,
        max : 75
    },
    saySolvingTime ?: {
        type:  number ,
        max: 80
    },
}

interface LgsDocument extends Lgs, Document, Section {
    _id: Schema.Types.ObjectId;
}


const LgsSchema = new Schema<LgsDocument>({
    math: {
        correct: { type: Number, required: true, max: 20 },
        wrong: { type: Number, required: true, max: 20 },
        empty: { type: Number, required: true, max: 10 },
    },
    turkish: {
        correct: { type: Number, required: true, max: 20 },
        wrong: { type: Number, required: true, max: 20 },
        empty: { type: Number, required: true, max: 10 },
    },
    social: {
        correct: { type: Number, required: true, max: 10 },
        wrong: { type: Number, required: true, max: 10 },
        empty: { type: Number, required: true, max: 10 },
    },
    science: {
        correct: { type: Number, required: true, max: 20 },
        wrong: { type: Number, required: true, max: 20 },
        empty: { type: Number, required: true, max: 20 },
    },
    english: {
        correct: { type: Number, max: 10 },
        wrong: { type: Number, max: 10 },
        empty: { type: Number, max: 10 },
    },
    religion: {
        correct: { type: Number, max: 10 },
        wrong: { type: Number, max: 10 },
        empty: { type: Number, max: 10 },
    },
})

const Lgs = Exam.discriminator<LgsDocument>('lgs', LgsSchema)

export default Lgs