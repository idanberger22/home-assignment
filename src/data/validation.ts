import type { Question } from "../types/question"
import { questions } from "./questions"
import * as Yup from 'yup'

export const validationSchema = Yup.object(
    questions.reduce((acc, q: Question) => {
        switch (q.validation.type) {
            case 'non-empty':
                acc[q.id] = Yup.string().required(`${q.title} cannot be empty`)
                break
            case 'email':
                acc[q.id] = Yup.string().email('Invalid email address').required('Email is required')
                break
            case 'min-length':
                acc[q.id] = Yup.string()
                    .min(q.validation.value, `${q.title} must be at least ${q.validation.value} characters`)
                    .required(`${q.title} is required`)
                break
            case 'yes-no':
                acc[q.id] = Yup.string().oneOf(['yes', 'no'], 'Please answer yes or no').required('Please answer yes or no')
                break
            case 'phone':
                acc[q.id] = Yup.string()
                    .matches(/^05\d{8}$/, 'Invalid phone number')
                    .when('phone-yes-no', {
                        is: 'yes',
                        then: (schema) => schema.required('Phone number is required'),
                        otherwise: (schema) => schema,
                    })
                break
            default:
                acc[q.id] = Yup.string()
                break
        }
        return acc
    }, {} as Record<string, Yup.AnySchema>)
)