import type { ProgressLevel } from '../types/progress'

export default function Stepper({ step, total }: ProgressLevel) {
    return <div className='stepper'>
        {Array.from({ length: total }).map((_, index) => (
            <div key={index} className={`progress-dot ${index < step ? 'past' : index === step ? 'current' : ''}`} />
        ))}
    </div>

}