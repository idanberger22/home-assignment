// types.ts
export type ValidationRule =
    | { type: 'non-empty' }
    | { type: 'email' }
    | { type: 'min-length'; value: number }
    | { type: 'phone-yes-no' }
    | { type: 'phone' }

export type Skip = {
    questionId: string,
    skipWhenAnswer: string,
    skipToId: string,
}

export interface Question {
    id: string;
    title: string;
    text: string;
    validation: ValidationRule;
    placeholder: string;
    skip?: Skip;
}
