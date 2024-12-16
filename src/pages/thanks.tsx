import Header from '../components/header';
import './thanks.css'
import { Button } from "@digdir/designsystemet-react";

export default function ThanksPage() {
  return (
    <>
      <Header />
      <div className="thank-you">
        <h1>Thank you for your application</h1>
        <p>You are now registered in the Business Register and will receive a Proof of Registred Branch in your wallet.</p>
        <Button>Register new branch</Button>
      </div>
    </>
  )
}