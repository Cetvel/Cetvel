import mongoose, { Schema, Document, Model } from "mongoose";
import Exam from "../exam.model";

/** 
    @Notes
    Say = math + physics + chemistry + biology
    ea = math +  literature + history1 + geography1 
    soz = literature + history2 + geography2 + philosophy + religion
*/

interface Ayt {
    solvingTime?: {
        type: number
    }

    aytField: {
        type: string,
        enum: ['say', 'ea', `soz`],
    },

    // Say ve Ea icin ortak alanlar
    math?: {
        solvingTime?: number,
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },

    //Say icin alanlar
    physics?: {
        solvingTime?: number
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },
    chemistry?: {
        solvingTime?: number
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },
    biology?: {
        solvingTime?: number
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },


    //EA ve Soz icin alanlar
    literature?: {
        solvingTime?: number
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },

    history1?: {
        solvingTime?: number
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },
    geography1?: {
        solvingTime?: number
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },

    //Soz icin Alanlar
    history2?: {
        solvingTime?: number
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },
    geography2?: {
        solvingTime?: number
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },
    philosophy?: {
        solvingTime?: number
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },
    religion?: {
        solvingTime?: number
        true: number,
        false: number,
        emptyAnswers: number,
        totalNet: number,
    },
}

interface AytDocument extends Ayt, Document {
    _id: Schema.Types.ObjectId;
}

const AytSchema: Schema<AytDocument> = new Schema({
    solvingTime: {
        type: Number,
        required: false,
        max: 135
    },
    aytField: {
        type: String,
        enum: ['say', 'ea', 'soz'],
        required: true
    },
    // Say ve Ea icin ortak alanlar
    math: {
        solvingTime: {
            type: Number,
            required: false,
        },

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
    //Say icin alanlar
    physics: {
        solvingTime: {
            type: Number,
            required: false,
        },
        true: {
            type: Number,
            required: true,
            max: 14
        },
        false: {
            type: Number,
            required: true,
            max: 14
        },
        emptyAnswers: {
            type: Number,
            required: true,
            max: 14
        },
        totalNet: {
            type: Number,
            required: true,
            max: 14
        }
    },
    chemistry: {
        solvingTime: {
            type: Number,
            required: false,
        },
        true: {
            type: Number,
            required: true,
            max: 13
        },
        false: {
            type: Number,
            required: true,
            max: 13
        },
        emptyAnswers: {
            type: Number,
            required: true,
            max: 13
        },
        totalNet: {
            type: Number,
            required: true,
            max: 13
        }
    },
    biology: {
        solvingTime: {
            type: Number,
            required: false,
        },
        true: {
            type: Number,
            required: true,
            max: 13
        },
        false: {
            type: Number,
            required: true,
            max: 13
        },
        emptyAnswers: {
            type: Number,
            required: true,
            max: 13
        },
        totalNet: {
            type: Number,
            required: true,
            max: 13
        }
    },

    //EA ve Soz icin alanlar
    literature: {
        solvingTime: {
            type: Number,
            required: false,
        },
        true: {
            type: Number,
            required: true,
            max: 24
        },
        false: {
            type: Number,
            required: true,
            max: 24
        },
        emptyAnswers: {
            type: Number,
            required: true,
            max: 24
        },
        totalNet: {
            type: Number,
            required: true,
            max: 24
        }
    },

    history1: {
        solvingTime: {
            type: Number,
            required: false,
        },
        true: {
            type: Number,
            required: true,
            max: 10
        },
        false: {
            type: Number,
            required: true,
            max: 10
        },
        emptyAnswers: {
            type: Number,
            required: true,
            max: 10
        },
        totalNet: {
            type: Number,
            required: true,
            max: 10
        }
    },
    geography1: {
        solvingTime: {
            type: Number,
            required: false,
        },
        true: {
            type: Number,
            required: true,
            max: 6
        },
        false: {
            type: Number,
            required: true,
            max: 6
        },
        emptyAnswers: {
            type: Number,
            required: true,
            max: 6
        },
        totalNet: {
            type: Number,
            required: true,
            max: 6
        }
    },
    philosophy: {
        solvingTime: {
            type: Number,
            required: false,
        },
        true: {
            type: Number,
            required: true,
            max: 12
        },
        false: {
            type: Number,
            required: true,
            max: 12
        },
        emptyAnswers: {
            type: Number,
            required: true,
            max: 12
        },
        totalNet: {
            type: Number,
            required: true,
            max: 12
        }
    },
    religion: {
        solvingTime: {
            type: Number,
            required: false,
        },
        true: {
            type: Number,
            required: true,
            max: 6
        },
        false: {
            type: Number,
            required: true,
            max: 6
        },
        emptyAnswers: {
            type: Number,
            required: true,
            max: 6
        },
        totalNet: {
            type: Number,
            required: true,
            max: 6
        }
    },
    history2: {
        solvingTime: {
            type: Number,
            required: false,
        },
        true: {
            type: Number,
            required: true,
            max: 11
        },
        false: {
            type: Number,
            required: true,
            max: 11
        },
        emptyAnswers: {
            type: Number,
            required: true,
            max: 11
        },
        totalNet: {
            type: Number,
            required: true,
            max: 11
        }
    },
    geography2: {
        solvingTime: {
            type: Number,
            required: false,
        },
        true: {
            type: Number,
            required: true,
            max: 11
        },
        false: {
            type: Number,
            required: true,
            max: 11
        },
        emptyAnswers: {
            type: Number,
            required: true,
            max: 11
        },
        totalNet: {
            type: Number,
            required: true,
            max: 11
        }
    }
})

const Ayt = Exam.discriminator<AytDocument>('ayt', AytSchema);

export default Ayt;