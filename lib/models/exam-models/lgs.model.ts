import mongoose, { Schema, Document } from "mongoose";
import Exam from "../exam.model";


interface Lgs {
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
    social: {
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
    english?: {
        solvingTime?: number,
        correct: number,
        wrong: number,
        empty: number,
    },
    religion?: {
        solvingTime?: number,
        correct: number,
        wrong: number,
        empty: number,
    },
    sozSolvingTime?: {
        type: number,
        max: 75
    },
    saySolvingTime?: {
        type: number,
        max: 80
    },
}

export interface LgsDocument extends Lgs, Document {
    _id: Schema.Types.ObjectId;
}


const LgsSchema = new Schema<LgsDocument>({
    sozSolvingTime: {
        type: Number,
        max: 75
    },
    saySolvingTime: {
        type: Number,
        max: 80
    },
    math: {
        solvingTime: { type: Number, required: false, max: 80 },
        correct: { type: Number, required: true, max: 20 },
        wrong: { type: Number, required: true, max: 20 },
        empty: { type: Number, required: true, max: 20 },
    },
    turkish: {
        solvingTime: { type: Number, required: false, max: 75 },
        correct: { type: Number, required: true, max: 20 },
        wrong: { type: Number, required: true, max: 20 },
        empty: { type: Number, required: true, max: 20 },
    },
    social: {
        solvingTime: { type: Number, required: false, max: 75 },
        correct: { type: Number, required: true, max: 10 },
        wrong: { type: Number, required: true, max: 10 },
        empty: { type: Number, required: true, max: 10 },
    },
    science: {
        solvingTime: { type: Number, required: false, max: 80 },
        correct: { type: Number, required: true, max: 20 },
        wrong: { type: Number, required: true, max: 20 },
        empty: { type: Number, required: true, max: 20 },
    },
    english: {
        solvingTime: { type: Number, required: false, max: 80 },
        correct: { type: Number, max: 10 },
        wrong: { type: Number, max: 10 },
        empty: { type: Number, max: 10 },
    },
    religion: {
        solvingTime: { type: Number, required: false, max: 75 },
        correct: { type: Number, max: 10 },
        wrong: { type: Number, max: 10 },
        empty: { type: Number, max: 10 },
    },
})

const Lgs = (mongoose.models.Lgs as mongoose.Model<LgsDocument>) || Exam.discriminator<LgsDocument>('Lgs', LgsSchema)

export default Lgs