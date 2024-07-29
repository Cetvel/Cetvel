import {Schema, Document} from "mongoose";
import Exam from "../exam.model";

interface Lgs { 
    math: {
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },
    turkish: {
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },
    social: {
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },
    science: {
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },
    english?: {
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },
    religion?: {
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },
}

interface LgsDocument extends Lgs, Document {
    _id: Schema.Types.ObjectId;
}


const LgsSchema = new Schema<LgsDocument>({
    math: {
        true: { type: Number, required: true, max: 20 },
        false: { type: Number, required: true, max: 20 },
        emptyAnswers: { type: Number, required: true, max: 10 },
        totalNet: { type: Number, required: true, max: 10 },
    },
    turkish: {
        true: { type: Number, required: true, max: 20 },
        false: { type: Number, required: true, max: 20 },
        emptyAnswers: { type: Number, required: true, max: 10 },
        totalNet: { type: Number, required: true, max: 10 },
    },
    social: {
        true: { type: Number, required: true, max: 10 },
        false: { type: Number, required: true, max: 10 },
        emptyAnswers: { type: Number, required: true, max: 10 },
        totalNet: { type: Number, required: true, max: 10 },
    },
    science: {
        true: { type: Number, required: true, max: 20 },
        false: { type: Number, required: true, max: 20 },
        emptyAnswers: { type: Number, required: true, max: 20 },
        totalNet: { type: Number, required: true, max: 20 },
    },
    english: {
        true: { type: Number, max: 10 },
        false: { type: Number, max: 10 },
        emptyAnswers: { type: Number, max: 10 },
        totalNet: { type: Number, max: 10 },
    },
    religion: {
        true: { type: Number, max: 10 },
        false: { type: Number, max: 10 },
        emptyAnswers: { type: Number, max: 10 },
        totalNet: { type: Number, max: 10 },
    },
})

const  Lgs  = Exam.discriminator<LgsDocument>('lgs', LgsSchema)

export default Lgs