import './progressBar.css';

export default function SkjemaProgressBar({ page }: { page: number }) {
  return (
    <>
      <div className='progress-bar-main-content'>
        <p>Step {page} of 4</p>
        <div className="progress-segment">
          <div className={`circle ${page >= 1 ? 'active-circle' : ''}`}></div>
          <div className={`line ${page >= 2 ? 'active-line' : ''}`}></div>
          <div className={`circle ${page >= 2 ? 'active-circle' : ''}`}></div>
          <div className={`line ${page >= 3 ? 'active-line' : ''}`}></div>
          <div className={`circle ${page >= 3 ? 'active-circle' : ''}`}></div>
          <div className={`line ${page >= 4 ? 'active-line' : ''}`}></div>
          <div className={`circle ${page >= 4 ? 'active-circle' : ''}`}></div>
        </div>
      </div>
    </>
  );
}
