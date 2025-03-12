import { useState } from 'react';
import './BranchRegistrationGuide.css';
import { Button  } from '@digdir/designsystemet-react'
import Header from '../components/header';

const BranchRegistrationGuide = () => {
  const [expandedStep, setExpandedStep] = useState<number>(1);

  const handleStepClick = (stepNumber: number) => {
    setExpandedStep(expandedStep === stepNumber ? 0 : stepNumber);
  };

  return (
    <>
      <Header />
      <div className="guide-container">
        <h1>Guide to Registering a Branch Using Verifiable Credentials</h1>
        <p className="guide-intro">
          This guide provides step-by-step instructions on how to register a branch using verifiable credentials. Follow the
          steps below to complete the process.
        </p>

        <div className={`guide-step ${expandedStep === 1 ? 'expanded' : ''}`} onClick={() => handleStepClick(1)}>
          <div className="step-header">
            <h2>Step 1: Get a Wallet at iGrant</h2>
            <div className="controls-container">
              <Button
                data-size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.igrant.io/datawallet.html', '_blank');
                }}
              >
                Visit IGrant
              </Button>
              <span className="expand-icon">{expandedStep === 1 ? '▼' : '▶'}</span>
            </div>
          </div>
          {expandedStep === 1 && (
            <div className="step-content">
              <h3>1. What is iGrant?</h3>
              <p>iGrant is a platform that allows you to manage your verifiable credentials securely.</p>

              <h3>2. How to get the wallet?</h3>
              <p>Visit https://igrant.io/datawallet.html and follow the instructions to set up your wallet.</p>

              <h3>3. Next Steps</h3>
              <p>Once set up, your wallet will be ready to store and manage credentials.</p>

              <Button className="next-button" onClick={(e) => {
                e.stopPropagation();
                handleStepClick(1);
                handleStepClick(2);
              }}>Neste</Button>
            </div>
          )}
        </div>

        <div className={`guide-step ${expandedStep === 2 ? 'expanded' : ''}`} onClick={() => handleStepClick(2)}>
          <div className="step-header">
            <h2>Step 2: Get NPID Credentials</h2>
            <div className="controls-container">
              <Button
                data-size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://info.tt02.altinn.no/skjemaoversikt/bronnoysundregistrene/lag-gyldig-virksomhetslommebok/', '_blank');
                }}
              >
                Visit NPID Issuer
              </Button>
              <span className="expand-icon">{expandedStep === 2 ? '▼' : '▶'}</span>
            </div>
          </div>
          {expandedStep === 2 && (
            <div className="step-content">
              <p>Next, obtain your Natural Personal Identifier (NPID) credentials.</p>

              <h3>1. Where to get them?</h3>
              <p>Visit NPID Issuer.</p>

              <h3>2. What to do?</h3>
              <p>Follow the instructions to obtain and store your NPID credentials in your iGrant wallet.</p>

              <Button className="next-button" onClick={(e) => {
                e.stopPropagation();
                handleStepClick(2);
                handleStepClick(3);
              }}>Neste</Button>
            </div>
          )}
        </div>

        <div className={`guide-step ${expandedStep === 3 ? 'expanded' : ''}`} onClick={() => handleStepClick(3)}>
          <div className="step-header">
            <h2>Step 3: Get EUCC Credentials at Bolagsverket</h2>
            <div className="controls-container">
              <Button
                data-size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://attestering-portal-pilot-ui.k821.system.bolagsverket.se/', '_blank');
                }}
              >
                Visit Bolagsverket
              </Button>
              <span className="expand-icon">{expandedStep === 3 ? '▼' : '▶'}</span>
            </div>
          </div>
          {expandedStep === 3 && (
            <div className="step-content">
              <p>You will need European Company Credentials (EUCC) issued by Bolagsverket.</p>

              <h3>1. Where to get them?</h3>
              <p>Visit Bolagsverket and request your EUCC credentials.</p>

              <h3>2. What to do?</h3>
              <p>Once issued, store them securely in your iGrant wallet.</p>

              <Button className="next-button" onClick={(e) => {
                e.stopPropagation();
                handleStepClick(3);
                handleStepClick(4);
              }}>Neste</Button>
            </div>
          )}
        </div>

        <div className={`guide-step ${expandedStep === 4 ? 'expanded' : ''}`} onClick={() => handleStepClick(4)}>
          <div className="step-header">
            <h2>Step 4: Apply for Branch Registration at Brønnøysundregisterne</h2>
            
            <div className="controls-container">
              <Button
                data-size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = '/start';
                }}
              >
                Register Branch
              </Button>
              <span className="expand-icon">{expandedStep === 4 ? '▼' : '▶'}</span>
            </div>
          </div>
          {expandedStep === 4 && (
            <div className="step-content">
              <p>You are now ready to register your company branch in norway as NUF. Please follow the Register Branch button to get startet</p>
            </div>
          )}
        </div>

        <p className="guide-footer">
          By following these steps, you successfully complete the registration process using verifiable credentials. If you
          encounter any issues, refer to the respective platforms' support sections for assistance.
        </p>
      </div>
    </>
  );
};

export default BranchRegistrationGuide; 