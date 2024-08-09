import mongoose, { Schema, Document, Model } from "mongoose";
import Exam from "../exam.model";

/** 
    @Notes
    Say = math + physics + chemistry + biology
    ea = math +  literature + history1 + geography1 
    soz = literature + history2 + geography2 + philosophy + religion
*/
export interface Section {
    math?: {
        solvingTime?: number,
        correct: number,
        wrong: number,
        empty: number,
    },
    physics?: {
        solvingTime?: number
        correct: number,
        wrong: number,
        empty: number,
    },
    chemistry?: {
        solvingTime?: number
        correct: number,
        wrong: number,
        empty: number,
    },
    biology?: {
        solvingTime?: number
        correct: number,
        wrong: number,
        empty: number,
    },
    literature?: {
        solvingTime?: number
        correct: number,
        wrong: number,
        empty: number,
    },
    history1?: {
        solvingTime?: number
        correct: number,
        wrong: number,
        empty: number,
    },
    geography1?: {
        solvingTime?: number
        correct: number,
        wrong: number,
        empty: number,
    },
    history2?: {
        solvingTime?: number
        correct: number,
        wrong: number,
        empty: number,
    },
    geography2?: {
        solvingTime?: number
        correct: number,
        wrong: number,
        empty: number,
    },
    philosophy?: {
        solvingTime?: number
        correct: number,
        wrong: number,
        empty: number,
    },
    religion?: {
        solvingTime?: number
        correct: number,
        wrong: number,
        empty: number,
    }
}

interface Ayt {
    aytField: {
        type: string,
        enum: ['say', 'ea', `soz`],
    },
    solvingTime ? : {
        type: number
        max: 180
    }
}

export interface AytDocument extends Ayt, Document, Section {
    _id: Schema.Types.ObjectId;
}



const AytSchema: Schema<AytDocument> = new Schema({
    aytField: {
        type: String,
        enum: ['say', 'ea', 'soz'],
        required: true
    },
    solvingTime: {
        type: Number,
        required: false,
    },
    // Say ve Ea icin ortak alanlar

    math: {
        solvingTime: {
            type: Number,
            required: false
        },
        correct: {
            type: Number,
            max: 40
        },
        wrong: {
            type: Number,
            max: 40
        },
        empty: {
            type: Number,
            max: 40
        }
    },
    //Say icin alanlar
    physics: {
        solvingTime: {
            type: Number,
            required: false
        },
        correct: {
            type: Number,
            max: 14
        },
        wrong: {
            type: Number,
            max: 14
        },
        empty: {
            type: Number,
            max: 14
        },
        totalNet: {}
    },
    chemistry: {
        solvingTime: {
            type: Number,
            required: false
        },
        correct: {
            type: Number,
            max: 13
        },
        wrong: {
            type: Number,
            max: 13
        },
        empty: {
            type: Number,
            max: 13
        },

    },
    biology: {
        solvingTime: {
            type: Number,
            required: false
        },
        correct: {
            type: Number,
            max: 13
        },
        wrong: {
            type: Number,
            max: 13
        },
        empty: {
            type: Number,
            max: 13
        },

    },

    //EA ve Soz icin alanlar
    literature: {
        solvingTime: {
            type: Number,
            required: false
        },
        correct: {
            type: Number,
            max: 24
        },
        wrong: {
            type: Number,
            max: 24
        },
        empty: {
            type: Number,
            max: 24
        },

    },

    history1: {
        solvingTime: {
            type: Number,
            required: false
        },
        correct: {
            type: Number,
            max: 10
        },
        wrong: {
            type: Number,
            max: 10
        },
        empty: {
            type: Number,
            max: 10
        },

    },
    geography1: {
        solvingTime: {
            type: Number,
            required: false
        },
        correct: {
            type: Number,
            max: 6
        },
        wrong: {
            type: Number,
            max: 6
        },
        empty: {
            type: Number,
            max: 6
        },

    },


    //Soz icin Alanlar
    philosophy: {
        solvingTime: {
            type: Number,
            required: false
        },
        correct: {
            type: Number,
            max: 12
        },
        wrong: {
            type: Number,
            max: 12
        },
        empty: {
            type: Number,
            max: 12
        },

    },
    religion: {
        solvingTime: {
            type: Number,
            required: false
        },
        correct: {
            type: Number,
            max: 6
        },
        wrong: {
            type: Number,
            max: 6
        },
        empty: {
            type: Number,
            max: 6
        },

    },
    history2: {
        solvingTime: {
            type: Number,
            required: false
        },
        correct: {
            type: Number,
            max: 11
        },
        wrong: {
            type: Number,
            max: 11
        },
        empty: {
            type: Number,
            max: 11
        },

    },
    geography2: {
        solvingTime: {
            type: Number,
            required: false
        },
        correct: {
            type: Number,
            max: 11
        },
        wrong: {
            type: Number,
            max: 11
        },
        empty: {
            type: Number,
            max: 11
        },

    }
})

const Ayt = Exam.discriminator<AytDocument>('ayt', AytSchema);

export default Ayt;