export type SuperMemoItem = {
    interval: number;
    repetition: number;
    efactor: number;
};

export type SuperMemoGrade = 0 | 1 | 2 | 3 | 4 | 5;

export function supermemo(
    item: SuperMemoItem,
    grade: SuperMemoGrade
): SuperMemoItem {
    let nextInterval: number;
    let nextRepetition: number;
    let nextEfactor: number;

    if (grade >= 3) {
        if (item.repetition === 0) {
            nextInterval = 1;
            nextRepetition = 1;
        } else if (item.repetition === 1) {
            nextInterval = 6;
            nextRepetition = 2;
        } else {
            nextInterval = Math.round(item.interval * item.efactor);
            nextRepetition = item.repetition + 1;
        }
    } else {
        nextInterval = 1;
        nextRepetition = 0;
    }

    nextEfactor =
        item.efactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));

    if (nextEfactor < 1.3) nextEfactor = 1.3;

    return {
        interval: nextInterval,
        repetition: nextRepetition,
        efactor: nextEfactor,
    };
}


let item: SuperMemoItem = {
    interval: 0,
    repetition: 0,
    efactor: 2.5,
};

// console.log(item);

// item = supermemo(item, 5);
// console.log(item);

// item = supermemo(item, 4);
// console.log(item);

// item = supermemo(item, 5)
// console.log(item);


import dayjs from 'dayjs';

interface Flashcard extends SuperMemoItem {
    front: string;
    back: string;
    dueDate: string;
}

function practice(flashcard: Flashcard, grade: SuperMemoGrade): Flashcard {
    const { interval, repetition, efactor } = supermemo(flashcard, grade);

    const dueDate = dayjs(Date.now()).add(interval, 'day').toISOString();

    return { ...flashcard, interval, repetition, efactor, dueDate };
}

let flashcard: Flashcard = {
    front: 'programer',
    back: 'an organism that turns caffeine in software',
    interval: 0,
    repetition: 0,
    efactor: 2.5,
    dueDate: dayjs(Date.now()).toISOString(),
};

console.log(flashcard);

flashcard = practice(flashcard, 5);
console.log(flashcard);

flashcard = practice(flashcard, 3);
console.log(flashcard);

flashcard = practice(flashcard, 5);
console.log(flashcard);