import mongoose, { Schema, Model, Document, Types } from 'mongoose';

interface IGoal {
    kindeId: string;
    title: string;
    target : string;
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


const goalSchema = new Schema<IGoalDocument, GoalModel>({
    kindeId: {
        type: String,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    startsAt: {
        type: Date,
        required: true
    },
    endsAt: {
        type: Date,
        required: true
    },
    target: {
        type: String,
        required: true
    }
    ,
    totalUnits: {
        type: Number,
        required: false,
        default: 1,
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