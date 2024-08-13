import { TytDocument,  Section } from "../exam-models/tyt.model";

export interface ITytMethods {
    calculateSectionNet(section: keyof Section): number;
    analyzeSectionPerformance(section: keyof Section): object;
    calculateAnswerStats(objec: TytDocument): { correctAnswers: number, wrongAnswers: number, empty: number }
}



export const TytMethods = {
    calculateSectionNet: function (this: TytDocument, section: keyof Section): number {
        const sectionData = this[section];
        return sectionData.correct - (sectionData.wrong * 0.25);
    },
    calculateAnswerStats: function (this: TytDocument): { correctAnswers: number, wrongAnswers: number, empty: number } {
        const { math, science, turkish, social } = this;
        const correctAnswers = math.correct + science.correct + turkish.correct + social.correct;
        const wrongAnswers = math.wrong + science.wrong + turkish.wrong + social.wrong;
        const empty = math.empty + science.empty + turkish.empty + social.empty;
        return { correctAnswers, wrongAnswers, empty };
    },
    analyzeSectionPerformance: function (this: TytDocument, section: keyof Section): object {
        const sectionData = this[section];
        const totalQuestions = sectionData.correct + sectionData.wrong + sectionData.empty;
        return {
            accuracy: (sectionData.correct / totalQuestions) * 100,
            completionRate: ((sectionData.correct + sectionData.wrong) / totalQuestions) * 100,
            net: this.calculateSectionNet(section)
        }
    }
}
