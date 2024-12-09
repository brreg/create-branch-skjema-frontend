import './waitModal.css'
import { HashLoader } from "react-spinners";
import { Button } from '@digdir/designsystemet-react';


export default function WaitModal({ onClose }: any) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <HashLoader />
        <h2>Henter NPID og EUID fra lommeboken din</h2>
        <p>Gå inn på Mattr Go appen og trykk aksepter</p>
        <Button className='modal-close' onClick={onClose}>Lukk</Button>
      </div>
    </div>
  );
}