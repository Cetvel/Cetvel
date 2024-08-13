import { defaultTo } from 'lodash';
import mongoose, { Schema, Model, Document, Types } from 'mongoose';

interface IGoal {
    clerkId: string;
    title: string;
    category: string;
    priority: number;
    totalUnits: number;
    completedUnits: number;
    startsAt: Date;
    endsAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGoalDocument extends IGoal, Document {
    _id: Types.ObjectId;
}

interface GoalModel extends Model<IGoalDocument> { }


const goalSchema = new mongoose.Schema<IGoalDocument, GoalModel>({
    clerkId: {
        type: String,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Kodlama', 'Ders Çalışma', 'Kitap Okuma'] // Kategorileri ihtiyaca göre genişletebilirsiniz
    },
    priority: {
        type: Number,
        required: true,
        min: 1,
        max: 3 // 1: Düşük, 2: Orta, 3: Yüksek
    },
    startsAt: {
        type: Date,
        required: true
    },
    endsAt: {
        type: Date,
        required: true
    },
    totalUnits: {
        type: Number,
        required: true,
        min: 1
    },
    completedUnits: {
        type: Number,
        default: 0,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


const Goal = mongoose.models.Goal || mongoose.model<IGoalDocument, GoalModel>('Goal', goalSchema);

export default Goal