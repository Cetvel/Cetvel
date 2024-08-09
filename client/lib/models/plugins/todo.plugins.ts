import { Schema } from 'mongoose';
import Todo, { ITodoDocument } from '../todo.model';
import { userPlugins } from './user.plugins';

interface ITodoMethods { 
    
}


export const todoMethods: ITodoMethods = {}

export interface ITodoStatics {
    getTodosByUserId: (userId: string) => Promise<ITodoDocument[]>;

}

export const todoStatics: ITodoStatics = {
    getTodosByUserId: async function (userId: string): Promise<ITodoDocument[]> {
        return await Todo.find({ userId });
    }
}


/**
 * Instance Metodları:

markAsCompleted(): Görevi tamamlandı olarak işaretler.
postpone(days): Görevin son tarihini belirtilen gün sayısı kadar erteler.
changePriority(newPriority): Görevin önceliğini değiştirir.
addTag(tag): Göreve yeni bir etiket ekler.
removeTag(tag): Görevden bir etiketi kaldırır.
isOverdue(): Görevin son tarihinin geçip geçmediğini kontrol eder.
getDaysUntilDue(): Son tarihe kalan gün sayısını hesaplar.


Static Metodlar:

findOverdueTasks(): Süresi geçmiş görevleri bulur.
findTasksDueToday(): Bugün son tarihi olan görevleri bulur.
findTasksByTag(tag): Belirli bir etikete sahip görevleri bulur.
findRecurringTasks(): Tekrarlanan görevleri bulur.
createRecurringTask(taskData): Yeni bir tekrarlanan görev oluşturur.
findHighPriorityTasks(): Yüksek öncelikli görevleri bulur.
countTasksByStatus(): Duruma göre görev sayılarını hesaplar.
 */