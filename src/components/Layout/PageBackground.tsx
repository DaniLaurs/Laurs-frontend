import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

export default function PageBackground({ children }: Props) {
  return (
    <Container>
      <BlobOne />
      <BlobTwo />

      <Content>
        {children}
      </Content>
    </Container>
  );
}


const Container = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  background: ${({ theme }) => theme.colors.background};
`;


const Content = styled.div`
  position: relative;
  z-index: 2;
`;


const BlobOne = styled.div`
  position: absolute;

  width: 420px;
  height: 420px;

  border-radius: 50%;

  background: linear-gradient(
    135deg,
    #7C3AED,
    #60A5FA
  );

  opacity: 0.15;

  top: -120px;
  right: -100px;

  filter: blur(10px);
`;


const BlobTwo = styled.div`
  position: absolute;

  width: 300px;
  height: 300px;

  border-radius: 50%;

  background: linear-gradient(
    135deg,
    #38BDF8,
    #7C3AED
  );

  opacity: 0.12;

  bottom: -80px;
  left: -80px;

  filter: blur(15px);
`;