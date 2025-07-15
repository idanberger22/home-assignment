// questions.ts
import type { Question } from '../types/question'

export const questions: Question[] = [
    {
        id: 'full-name',
        title: 'Full name',
        text: 'Please enter your first and last name.',
        validation: { type: 'min-length', value: 5 },
        placeholder: 'Omer Cohen',
    },
    {
        id: 'email',
        title: 'Email address',
        text: 'We will use this to send you updates and important information.',
        validation: { type: 'email' },
        placeholder: 'omer@gmail.com',
    },
    {
        id: 'phone-yes-no',
        title: 'Add phone number?',
        text: 'Would you like us to contact you via phone number? (type yes or no)',
        validation: { type: 'phone-yes-no' },
        placeholder: 'Yes'
    },
    {
        id: 'phone-number',
        title: 'Phone number',
        text: 'We will use this to contact you.',
        validation: { type: 'phone' },
        placeholder: '0501234567',
        skip: {
            questionId: 'phone-yes-no',
            skipWhenAnswer: 'no',
            skipToId: 'hobbies',
        },
    },
    {
        id: 'hobbies',
        title: 'Your hobbies',
        text: 'We would like to get to know you better, please tell us about your hobbies.',
        validation: { type: 'non-empty' },
        placeholder: 'volleyball, chess, coding...',
    },
]
