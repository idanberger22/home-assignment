import Stepper from './stepper'
import { questions } from '../data/questions'
type WizardNavigationProps = {
    step: number,
    handleBack: () => void,
    handleNext: (e?: React.FormEvent) => void,
    isNextButtonDisabled: boolean
}

export default function WizardNavigation({ step, handleBack, handleNext, isNextButtonDisabled }: WizardNavigationProps) {
    return <div className='wizard-buttons'>
        {step > 0 ?
            <button
                className='back elevate'
                onClick={handleBack}
                type='button'>
                Back
            </button>
            :
            <div className='empty-button' />
        }

        <Stepper step={step} total={questions.length} />

        <button
            className={isNextButtonDisabled ? 'disabled' : 'elevate active'}
            onClick={handleNext}
            disabled={isNextButtonDisabled}
            type='button'
        >
            {step < questions.length - 1 ? 'Next' : 'Done'}
        </button>
    </div>
}