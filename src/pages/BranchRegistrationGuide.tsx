import { useEffect, useRef, useState } from 'react';
import './BranchRegistrationGuide.css';
import { Button  } from '@digdir/designsystemet-react'
import Header from '../components/header';
import { useSession } from '../context/SessionContext'
import { QRCodeSVG } from 'qrcode.react'
import { backendUrl } from '../const'
import { HashLoader } from 'react-spinners';
import { DeleteCookie, CreateCookieIfMissing } from '../context/Cookie';


const BranchRegistrationGuide = () => {
  const [expandedStep, setExpandedStep] = useState<number>(1);
  const [qrLink, setQrLink] = useState("")
  const { sessionId } = useSession()
  const qrCodeCache = useRef<string | null>(null);


  const handleStepClick = (stepNumber: number) => {
    setExpandedStep(expandedStep === stepNumber ? 0 : stepNumber);
  };

  const fetchQrLink = async () => {
    try {
      if (sessionId) {
        // Return cached QR code if available

        const response = await fetch(backendUrl + "/api/qrcode", {
          method: "POST",
          headers: {
            "x-session-id": sessionId
          }
        })

        if (!response.ok) {
          throw new Error("Failed to fetch QR link")
        }

        const data = await response.json()
        console.log("received data from /api/qrcode")
        qrCodeCache.current = data.didcommUri; // Cache the new QR code
        setQrLink(data.didcommUri)
      }
    } catch (error) {
      console.error("Error fetching QR link:", error)
    }
  }

  useEffect(() => {
    fetchQrLink();

    return () => {
    }
  }, [sessionId]);

  return (
    <>
      <Header />
      <div className="guide-container">
        <h2>Register a branch using wallet services</h2>
        <p className="guide-intro">
        With this service you can register for a company branch using wallet services. For this  to work you need a functional wallet with the Natural personal Identifactation data(NPID) and European Company Credientials(EUCC). If you don't have this, you can follow the the steps under the  "Need Help" section below.
        </p>
        <div className={`guide-step ${expandedStep === 4 ? 'expanded' : ''}`} onClick={() => handleStepClick(4)}>
          <div className="step-header">
            <h2>Start Branch Registration at Brønnøysundregisterne</h2>
            
            <div className="controls-container">
              <Button
                data-size="sm"
                variant="primary"
                onClick={(e) => {
                  DeleteCookie();
                  CreateCookieIfMissing();
                  e.stopPropagation();
                  window.location.href = '/start';
                }}
              >
                Apply here
              </Button>
              <span className="expand-icon">{expandedStep === 4 ? '▼' : '▶'}</span>
            </div>
          </div>
          {expandedStep === 4 && (
            <div className="step-content">
              
            <p>With your attestations in place, proceed to apply for branch registration.</p>
            <ol>
              <li>Where to register? Use the Apply here button above</li>
              <li>Complete the application process using your stored attestations.</li>
              <li>After submitting your application, you will receive a confirmation attestation.</li>
              <li>Then you will receive your organisation number within 24 hours in your wallet-app.</li>
            </ol>

            </div>
          )}
        </div>
        <h2>Need Help ?</h2>
        <p>The step-by-step instructions below shows you the tasks you need to complete to get ready to register a branch using wallet services. If you already have a wallet-app and the defined attestations you can start to Apply for Branch Registration at Brønnøysundregistrene. </p>

        <div className="verification-box">
          <div className="qr-section">
            <div className="qr-placeholder">
            {qrLink === "" ?
                  <div className='loader'>
                    <HashLoader />
                  </div>
                  :
                  <QRCodeSVG value={qrLink} className='qrimage' />
                }
            </div>
            <div className="verification-text">
              <h3>Check if you have the right attestations?</h3>
              <p>Scan this QR code with your EUID Wallet app to check or verify your attestations before starting your application.</p>
            </div>
          </div>
        </div>
        
        <h3>Perparations before registering a branch:</h3>
        <div className={`guide-step ${expandedStep === 1 ? 'expanded' : ''}`} onClick={() => handleStepClick(1)}>
          <div className="step-header">
            <h2>Step 1: Get an EUID Wallet-app</h2>
            <div className="controls-container">
              <Button
                data-size="sm"
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.igrant.io/datawallet.html', '_blank');
                }}
              >
                Get wallet-app
              </Button>
              <span className="expand-icon">{expandedStep === 1 ? '▼' : '▶'}</span>
            </div>
          </div>
          {expandedStep === 1 && (
            <div className="step-content">
              <h3>1. What is an EUDI wallet-app? </h3>
              <p>EUDI wallet is an app that allows you to store and share your attestations securely.</p>

              <h3>2. How to get the wallet-app?</h3>
              <p>Visit https://igrant.io/datawallet.html and follow the instructions to set up your wallet-app.</p>
              <div className="app-store-links">
                <a href="https://apple.co/2Mz9nJp" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="/app-store-badge.png" 
                    alt="Download on the App Store" 
                    height="40"
                  />
                </a>
                <a href="https://play.google.com/store/apps/details?id=io.igrant.mobileagent" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="/google-play-badge.png" 
                    alt="Get it on Google Play" 
                    height="40"
                  />
                </a>
              </div>

              <h3>3. Next Steps</h3>
              <p>Once set up, your wallet-app will be ready to  store and share attestations.</p>

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
            <h2>Step 2: Get attestation of Natural Person Identification Data (NPID)</h2>
            <div className="controls-container">
              <Button
                data-size="sm"
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('/credentialguidpage#npid', '_blank');
                }}
              >
                Get NPID
              </Button>
              <span className="expand-icon">{expandedStep === 2 ? '▼' : '▶'}</span>
            </div>
          </div>
          {expandedStep === 2 && (
            <div className="step-content">
              <p>Next, obtain your Natural Personal Identifier (NPID) attestation.</p>

              <ol>
                <li>Where to get it? Visit NPID Issuer service.</li>
                <li>Follow the instructions to obtain and store your NPID attestation in your wallet-app.</li>
              </ol>

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
            <h2>Step 3: Get attestation of EU Company Certificate (EUCC)</h2>
            <div className="controls-container">
              <Button
                data-size="sm"
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('/credentialguidpage#eucc', '_blank');
                }}
              >
                Get EUCC
              </Button>
              <span className="expand-icon">{expandedStep === 3 ? '▼' : '▶'}</span>
            </div>
          </div>
          {expandedStep === 3 && (
            <div className="step-content">
              <p>You will need European Company Certificate (EUCC) issued by Bolagsverket.</p>

              <ol>
                <li>Where to get it? Visit Bolagsverket and request your EUCC credentials.</li>
                <li>Once issued, it is stored securely in your wallet-app.</li>
              </ol>

              <Button className="next-button" onClick={(e) => {
                e.stopPropagation();
                handleStepClick(3);
                handleStepClick(4);
              }}>Neste</Button>
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default BranchRegistrationGuide; 