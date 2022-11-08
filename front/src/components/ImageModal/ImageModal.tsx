import styled from "styled-components";
import colors from "../../utils/style/colors";

const MainContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(255, 215, 215, 0.9);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  position: relative;
  max-width: 80%;
  max-height: 80%;
`;

const Button = styled.button`
  font-size: 40px;
  color: ${colors.tertiary};
  position: absolute;
  top: 15px;
  right: 15px;
  border: 0;
  background: none;
`;
interface ImageModalProps {
  src: string;
  exitButton?: () => void;
}

export const ImageModal = ({ src, exitButton, ...props }: ImageModalProps) => {
  return (
    <MainContainer>
      <Button type="button" onClick={exitButton}>
        X
      </Button>
      <Image src={src} alt="Taille agrandi" />
    </MainContainer>
  );
};
