import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const EmptyCandidateContent = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;

  width: 100%;
  height: auto;

  margin: auto;
`;

export const TextDescription = styled.span`
  font-size: 1.8rem;
  font-family: 'Roboto', sans-serif;
  color: #000;
  margin-bottom: 116px;
`;

export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;

  max-width: 897px;
  margin: auto;

  table {
    width: 100%;
    margin-bottom: 50px;
  }
`;

export const Tableheader = styled.thead`
  tr {
    > th {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    th {
      font-size: 1.2rem;
      font-family: 'Roboto', sans-serif;
      padding: 10px;
      background: ${({ theme }) => theme.colors.black};
      color: ${({ theme }) => theme.colors.white};
      border: none;
    }
  }
`;

export const TableBody = styled.tbody`
  tr {
    td {
      font-size: 1rem;
      font-family: 'Roboto', sans-serif;
      padding: 10px;

      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
`;
