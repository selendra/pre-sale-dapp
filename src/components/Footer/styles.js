import styled from 'styled-components';

export const BreakLine = styled.div`
  height: 2px;
  background: rgba(0, 0, 0, 0)
    linear-gradient(
      90deg,
      rgba(90, 196, 190, 0) 0%,
      rgb(55, 114, 255) 50%,
      rgba(194, 0, 251, 0) 100%
    )
    repeat scroll 0% 0%;
`;
export const Wrapper = styled.footer`
  width: 100%;
`;
export const Container = styled.div`
  max-width: 1216px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
  @media screen and (min-width: 480px) {
    padding: 20px 10px;
  }
`;
export const Logo = styled.img`
  height: 50px;
  width: auto;
`;
export const Social = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 20px;
  @media screen and (max-width: 375px) {
    grid-template-columns: auto auto auto;
  }
`;
