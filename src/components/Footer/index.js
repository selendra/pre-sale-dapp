import { BreakLine, Container, Logo, Wrapper } from "./styles";
import bitriel from '../../assets/bitriel.png';

export default function Footer() {
  return (
    <Wrapper>
      <BreakLine />
      <Container>
        <Logo
          alt='bitriel'
          src={bitriel}
        />
      </Container>
    </Wrapper>
  )
}
