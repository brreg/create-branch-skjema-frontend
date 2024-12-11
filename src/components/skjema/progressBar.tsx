import './progressBar.css'

export default function SkjemaProgressBar({ page }: { page: number }) {
  return (
    <div className='progress-bar-main-content'>
      <p>Step {page} of 4</p>
    </div>
  )
}