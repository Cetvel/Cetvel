// models/Notification.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
    clerkId : string,
    user: mongoose.Types.ObjectId;
    type: 'dailyTodoReminder' | 'upcomingStudySession';
    content: string;
    metadata: {
        todoCount?: number;
        studySessionId?: mongoose.Types.ObjectId;
        subject?: string;
        startTime?: Date;
    };
    isRead: boolean;
    createdAt: Date;
    expiresAt: Date;
}

const NotificationSchema: Schema = new Schema({
    clerkId: {
        type: String,
        required: true,
        index : true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['dailyTodoReminder', 'upcomingStudySession'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    metadata: {
        todoCount: {
            type: Number,
            required: function (this: INotification) { return this.type === 'dailyTodoReminder'; }
        },
        studySessionId: {
            type: Schema.Types.ObjectId,
            ref: 'StudySession',
            required: function (this: INotification) { return this.type === 'upcomingStudySession'; }
        },
        subject: {
            type: String,
            required: function (this: INotification) { return this.type === 'upcomingStudySession'; }
        },
        startTime: {
            type: Date,
            required: function (this: INotification) { return this.type === 'upcomingStudySession'; }
        }
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

// Otomatik olarak süresi geçmiş bildirimleri temizlemek için bir index
NotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);