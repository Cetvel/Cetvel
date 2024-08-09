import Pomodoro, { PomodoroDocument } from "../models/pomodoro.model";

interface IPomodoroService {
    createPomodoro(userId : string ,data: any ): Promise<PomodoroDocument>;
    getPomodoros(userId: string ): Promise<PomodoroDocument[]>;
    getPomodoroById(id: string ): Promise<PomodoroDocument>;
    updatePomodoro(id: string , data: Partial<PomodoroDocument>): Promise<PomodoroDocument>;
    deletePomodoro(id: string ): Promise<PomodoroDocument>;

}

class PomodoroServiceClass  implements IPomodoroService{
    async createPomodoro(userId : string ,data: any): Promise<PomodoroDocument> {
        data.userId = userId
        const pomodoro = new Pomodoro(data)
        if (!pomodoro) throw new Error('Pomodoro not created');
        return pomodoro.save()
    }

    async getPomodoros(userId: string): Promise<PomodoroDocument[]> {
        return Pomodoro.find({ userId })
    }

    async getPomodoroById(id: string): Promise<PomodoroDocument> {
        return Pomodoro.findById(id)
    }

    async updatePomodoro(id: string, data: Partial<PomodoroDocument>): Promise<PomodoroDocument> {
        return Pomodoro.findByIdAndUpdate(id, data, { new: true })
    }

    async deletePomodoro(id: string): Promise<PomodoroDocument> {
        return Pomodoro.findByIdAndDelete(id)
    }
}

const PomodoroService : IPomodoroService = new PomodoroServiceClass();

export default PomodoroService
