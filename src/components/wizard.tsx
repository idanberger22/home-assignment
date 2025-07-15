import { useEffect, useState, useRef } from 'react'
import { useFormik } from 'formik'
import { validationSchema } from '../data/validation'
import { questions } from '../data/questions'
import WizardNavigation from './wizard-navigation'
const initialValues = questions.reduce((acc, q) => ({ ...acc, [q.id]: '' }), {} as Record<string, string>)

export default function Wizard() {
    const [step, setStep] = useState(0)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const currentQuestion = questions[step]

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('Form submitted successfully:', values)
            setIsSubmitted(true)
        },
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
    })

    useEffect(() => {
        inputRef.current?.focus()
    }, [step])

    const handleNext = (e?: React.FormEvent) => {
        e?.preventDefault()
        formik.setFieldTouched(currentQuestion.id, true)
        if (formik.errors[currentQuestion.id]) return

        const skipRule = questions[step + 1]?.skip
        if (skipRule) {
            const coreQuestion = questions.find(q => q.id === skipRule.questionId)
            if (coreQuestion && formik.values[coreQuestion.id] === skipRule.skipWhenAnswer) {
                const skipToIndex = questions.findIndex(q => q.id === skipRule.skipToId)
                if (skipToIndex === -1) formik.handleSubmit() // this should not happen on proper question array
                else setStep(skipToIndex)
            }
            else setStep(step + 1)
        }
        else {
            const nextStep = step + 1
            if (nextStep < questions.length) setStep(nextStep)
            else formik.handleSubmit()
        }
    }

    const handleBack = () => {
        if (step === 0) return
        const prevQuestion = questions[step - 1]
        if (prevQuestion.skip) {
            const skip = prevQuestion.skip
            if (formik.values[skip.questionId] === skip.skipWhenAnswer) setStep(questions.findIndex(q => q.id === skip.questionId))
            else setStep(step - 1)
        }
        else setStep(step - 1)
    }

    const error = formik.errors[currentQuestion.id]
    const showErr = formik.touched[currentQuestion.id] && error
    const isNextButtonDisabled = step === questions.length - 1 ? !formik.isValid : !!error

    if (isSubmitted) return <section className='wizard-wrapper'>
        <h1 className='fade-down'>Thank you for your submission!</h1>
    </section>

    return <section className='wizard-wrapper fade-down'>
        <form onSubmit={handleNext} className='wizard' noValidate>
            <h1>{currentQuestion.title}</h1>
            <p>{currentQuestion.text}</p>

            <label htmlFor={currentQuestion.id} className='sr-only'>{currentQuestion.title}</label>
            <input
                ref={inputRef}
                id={currentQuestion.id}
                name={currentQuestion.id}
                type="text"
                value={formik.values[currentQuestion.id]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={currentQuestion.placeholder}
                className={(showErr) ? 'error-input' : 'valid-input'}
                aria-invalid={!!showErr}
                aria-describedby={`${currentQuestion.id}-error`}
            />

            <p id={`${currentQuestion.id}-error`} className='error'>
                {showErr ? error : ''}
            </p>
        </form>

        <WizardNavigation
            step={step}
            handleBack={handleBack}
            handleNext={handleNext}
            isNextButtonDisabled={isNextButtonDisabled}
        />
    </section>
}