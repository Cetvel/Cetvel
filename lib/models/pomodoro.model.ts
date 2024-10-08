import mongoose, { Schema, Model, Document, Types } from "mongoose";

interface IPomodoro extends Document {
    kindeId?: string
    title: string;
    tag: string;
    userId: Types.ObjectId;
    description: string;
    duration: number;
    startsAt : Date;
    endsAt : Date
}

export interface PomodoroDocument extends IPomodoro, Document {
    _id: Types.ObjectId;
}

interface PomodoroModel extends Model<PomodoroDocument> { }



const PomodoroSchema = new Schema({
    kindeId: { type: String, required: false },
    userId: { type: Types.ObjectId, required: false, ref: 'User' },
    title: { type: String, required: true },
    tag: { type: String, required: true },
    startsAt : {type : Date , required : true},
    endsAt : {type : Date , required : true},
    description: { type: String, required: false },
    duration: { type: Number, required: true },
}, { timestamps: true });



const Pomodoro = mongoose.models.Pomodoro || mongoose.model<PomodoroDocument, PomodoroModel>('Pomodoro', PomodoroSchema);

export default Pomodoro