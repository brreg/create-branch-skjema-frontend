import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import './thanks.css'
import { Button } from "@digdir/designsystemet-react";
import { DeleteCookie } from '../context/Cookie';

export default function ThanksPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="thank-you">
        <h1>Thank you for your application</h1>
        <p>You are now registered in the Business Register and will receive a Proof of Registred Branch in your wallet.</p>
        <div className="button-container">
          <Button onClick={() => navigate("/receipt")}>Request receipt to be added to your wallet</Button>
          <Button onClick={() => {
            DeleteCookie();
            navigate("/start");
          }}>Register new branch</Button>
        </div>
      </div>
    </>
  )
}