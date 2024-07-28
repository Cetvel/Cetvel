import mongoose, { Schema, model, Document } from 'mongoose'
import Exam from '../exam.model'

interface Tyt {
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
    calculateSectionNet(section: 'math' | 'science' | 'turkish' | 'social'): number;
    calculateTotalScore(): number;
    analyzeSectionPerformance(section: 'math' | 'science' | 'turkish' | 'social'): object;
}

const TytSchema: Schema<TytDocument> = new Schema({
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

TytSchema.methods.calculateSectionNet = function (this: TytDocument, section: 'math' | 'science' | 'turkish' | 'social'): number {
    const sectionData = this[section];
    return sectionData.true - (sectionData.false * 0.25);
};

TytSchema.methods.calculateTotalScore = function (this: TytDocument): number {
    const baseScore = 100;
    const sections = ['math', 'science', 'turkish', 'social'];
    const totalNet = sections.reduce((sum, section) => sum + this.calculateSectionNet(section as 'math' | 'science' | 'turkish' | 'social'), 0);
    return baseScore + (totalNet * 4); // Örnek çarpan, gerçek formüle göre ayarlanmalı
};

// Bölüm bazında performans analizi metodu
TytSchema.methods.analyzeSectionPerformance = function (this: TytDocument, section: 'math' | 'science' | 'turkish' | 'social'): object {
    const sectionData = this[section];
    const totalQuestions = sectionData.true + sectionData.false + sectionData.emptyAnswers;
    return {
        accuracy: (sectionData.true / totalQuestions) * 100,
        completionRate: ((sectionData.true + sectionData.false) / totalQuestions) * 100,
        net: this.calculateSectionNet(section)
    }
};


const Tyt = Exam.discriminator<TytDocument>('tyt', TytSchema);

export default Tyt;