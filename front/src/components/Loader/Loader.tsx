import styled from "styled-components";
import logo from "../../assets/logo.svg";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
  background-color: white;
`;

const LogoLoader = styled.img`
  @keyframes myAnim {
    0%,
    100% {
      transform: rotate(0deg);
      transform-origin: 50% 50%;
    }

    10% {
      transform: rotate(8deg);
    }

    20%,
    40%,
    60% {
      transform: rotate(-10deg);
    }

    30%,
    50%,
    70% {
      transform: rotate(10deg);
    }

    80% {
      transform: rotate(-8deg);
    }

    90% {
      transform: rotate(8deg);
    }
  }

  animation: myAnim 2s ease 0s infinite normal forwards;
`;

export const Loader = () => {
  return (
    <Wrapper>
      <LogoLoader src={logo} alt="Chargement ..." />
    </Wrapper>
  );
};
