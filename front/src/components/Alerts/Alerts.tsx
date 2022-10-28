import styled, { keyframes } from "styled-components";
import logoSuccess from "../../assets/ok.svg";
import logoWarning from "../../assets/warning.svg";
import colors from "../../utils/style/colors";

const start = keyframes`
  0% {
    transform: translateX(120%);
  }
  10%{
    opacity: 40%;
  }
  20% {
    transform: translateX(0%);
    opacity: 100%;
  }
  80% {
    transform: translateX(0%);
    opacity: 100%;
  }
  100% {
    transform: translateX(120%);
  }
`;

const MainContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationContainer = styled.span`
  opacity: 0%;
  position: fixed;
  bottom: 2%;
  right: 1%;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0px 0px 4px ${colors.tertiary};
  animation: ${start} 5s linear;
`;

const ImgContainer = styled.div`
  width: 32px;
  height: 32px;
  padding: 0 10px 0 0;
`;

const Logo = styled.img`
  width: 32px;
  margin: 0;
`;

interface AlertsProps {
  message: string;
  name: "success" | "warning";
}

export const Alerts = ({ message, name }: AlertsProps) => {
  if (name === "success") {
    return (
      <MainContainer>
        <NotificationContainer>
          <ImgContainer>
            <Logo src={logoSuccess} alt="Logo OK" />
          </ImgContainer>
          <div>{message}</div>
        </NotificationContainer>
      </MainContainer>
    );
  }
  return (
    <MainContainer>
      <NotificationContainer>
        <ImgContainer>
          <Logo src={logoWarning} alt="Logo attention" />
        </ImgContainer>
        <div>{message}</div>
      </NotificationContainer>
    </MainContainer>
  );
};
