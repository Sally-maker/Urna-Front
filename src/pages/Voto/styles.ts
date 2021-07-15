import styled, { css } from 'styled-components';

import { Input } from '~/components';
import { CandidateProps } from '~/models';

interface CandidateInformationsProps {
  candidate: CandidateProps;
}

export const Container = styled.div`
  display: flex;

  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

export const Display = styled.div`
  flex: 1;
  background: #c4c4c4;
  display: flex;
  flex-direction: column;
  padding: 30px;

  height: 100vh;

  @media (max-width: 760px) {
    flex: auto;
    width: 100%;
    height: 100%;

    justify-content: center;
    align-items: center;
  }
`;

export const ActionContainer = styled.div`
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;

  @media (max-width: 760px) {
    padding: 15px 0;
    flex: auto;
  }
`;

export const Display_Label = styled.span`
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.8;
  margin-left: 130px;

  @media (max-width: 760px) {
    margin-left: 0;
  }
`;

export const InputCodeCandidate = styled(Input)`
  max-width: 412px;
  margin-left: 130px;

  @media (max-width: 760px) {
    margin-left: 0;
  }
`;

export const Display_InfoCandidateLabel = styled(Display_Label)`
  margin: 30px 0 0 0;
`;

export const Display_CandidateInformations = styled.div<CandidateInformationsProps>`
  background: #f0f0f0;
  width: 100%;
  height: 100%;

  max-height: 349px;
  max-width: 611px;

  margin-bottom: 36px;
  padding: 20px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  @media (max-width: 760px) {
    ${({ candidate }) =>
      Object.keys(candidate).length > 0
        ? null
        : css`
            padding: 100px;
          `}
  }
`;

export const Display_ConfirmButtonVote = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NumberButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 34px 30px;

  width: 100%;
  height: 100%;
  max-width: 423px;
  max-height: 429px;

  button:nth-child(10) {
    grid-column: 2;
  }
`;

export const ButtonNumber = styled.button`
  width: 70px;
  height: 70px;

  background: #312e2e;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2.4rem;
  font-family: 'Roboto', sans-serif;
  line-height: 75px;
  font-weight: 700;

  border: none;

  transition: filter 0.2s;

  &:hover {
    filter: opacity(0.9);
  }
`;

export const FireButtonActions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  margin-top: 100px;

  @media (max-width: 760px) {
    gap: 10px;
  }
`;

export const CancelAction = styled.button`
  background: #e02525;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: #fff;
  border: none;
  padding: 20px;
  text-transform: uppercase;

  transition: filter 0.2s;

  &:hover {
    filter: opacity(0.9);
  }

  @media (max-width: 760px) {
    font-size: 1rem;
    padding: 12px;
  }
`;

export const ClearFieldAction = styled(CancelAction)`
  background: #f0f0f0;
  color: ${({ theme }) => theme.colors.black};
`;

export const ConfirmAction = styled(CancelAction)`
  background: #37a442;
  color: #fff;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 760px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const AvatarContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CandidateAvatar = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
`;

export const CandidateInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 50px;

  width: 100%;
  height: 100%;

  @media (max-width: 760px) {
    margin-top: -50px;
  }
`;

export const InfoLabel = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #000;

  &:nth-child(2) {
    margin-top: 15px;
  }
`;

export const InfoSpan = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  color: #000;

  font-weight: 400;
  margin-top: 10px;
`;

export const ContentCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: auto;

  width: 100%;
  height: 100%;
`;
