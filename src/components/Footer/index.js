import { BreakLine, Container, Logo, Social, Wrapper } from "./styles";
import bitriel from '../../assets/bitriel.png';
import fb from '../../assets/fb.svg';
import linkedin from '../../assets/linkedin.svg';
import medium from '../../assets/medium.svg';
import twitter from '../../assets/twitter.svg';
import telegram from 'assets/telegram.svg';

export default function Footer() {
  return (
    <Wrapper>
      <BreakLine />
      <Container>
        <Logo
          alt='bitriel'
          src={bitriel}
        />
        <Social>
          <a href='https://www.facebook.com/selendrachain' target='_blank' rel="noreferrer">
            <img 
              src={fb}
              alt='facebook'
              width={30}
            />
          </a>
          <a href='https://twitter.com/selendrachain' target='_blank' rel="noreferrer">
            <img 
              src={twitter}
              alt='twitter'
              width={30}
            />
          </a>
          <a href='https://t.me/selendraorg' target='_blank' rel="noreferrer">
            <img 
              src={telegram}
              alt='telegram'
              width={30}
            />
          </a>
          <a href='https://medium.com/selendra' target='_blank' rel="noreferrer">
            <img 
              src={medium}
              alt='medium'
              width={30}
            />
          </a>
          <a href='https://www.linkedin.com/company/selendra/' target='_blank' rel="noreferrer">
            <img 
              src={linkedin}
              alt='linkedin'
              width={30}
            />
          </a>
        </Social>
      </Container>
    </Wrapper>
  )
}