import mongoose, { Schema, model, Document } from 'mongoose'
import Exam from '../exam.model'

interface Tyt {
    solvingTime?: {
        type: number
    },
    math: {
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
    }
}

interface TytDocument extends Tyt, Document {
    _id: Schema.Types.ObjectId;
}

const TytSchema: Schema<TytDocument> = new Schema({
    solvingTime: {
        type: Number,
        required: false,
        max : 135
    },
            
    math: {
        true: {
            type: Number,
            required: true,
            max: 40
        },
        false: {
            type: Number,
            required: true,
            max: 40
        },
        emptyAnswers: {
            type: Number,
            required: true,
            max: 40
        },
        totalNet: {
            type: Number,
            required: true,
            max: 40
        }
    },
    science: {
        true: {
            type: Number,
            required: true,
            max: 20
        },
        false: {
            type: Number,
            required: true,
            max: 20
        },
        emptyAnswers: {
            type: Number,
            required: true,
            max: 20
        },
        totalNet: {
            type: Number,
            required: true,
            max: 20
        }
    },
    turkish: {
        true: {
            type: Number,
            required: true,
            max: 20
        },
        false: {
            type: Number,
            required: true,
            max: 20
        },
        emptyAnswers: {
            type: Number,
            required: true,
            max: 20
        },
        totalNet: {
            type: Number,
            required: true,
            max: 20
        }
    },
    social: {
        true: {
            type: Number,
            required: true,
            max: 20
        },
        false: {
            type: Number,
            required: true,
            max: 20
        },
        emptyAnswers: {
            type: Number,
            required: true,
            max: 20
        },
        totalNet: {
            type: Number,
            required: true,
            max: 20
        }
    }
})


const Tyt = Exam.discriminator<TytDocument>('tyt', TytSchema);

export default Tyt;