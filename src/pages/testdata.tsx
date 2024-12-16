import Header from "../components/header";
import CSS from "csstype";

const mainStyle: CSS.Properties = {
  display: 'flex',
  justifyContent: 'space-around',
  paddingTop: '10em'
};

export default function TestdataPage() {
  return(
    <>
      <Header />
      <main style={mainStyle}>
        <div>
          <img src="/eucc-credential-offer.png"/>
          <p>EUCC</p>
        </div>
        <div>
          <img src="/npid-credential-offer.png" />
          <p>NPID</p>
        </div>
      </main>
    </>
  )
}