import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.header`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 93px;

  background: #fff;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 5px solid ${({ theme }) => theme.colors.orange};
`;

export const LinkContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-right: 15px;
`;

export const Link = styled(NavLink)`
  position: relative;
  font-size: 1.3rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  line-height: 2.813rem;
  color: #004587;
  text-decoration: none;
  text-align: center;

  &:last-of-type {
    color: #e92308;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    transition: 100ms;
  }

  &:hover::after {
    border-bottom: 3px solid #004587;
  }

  &:hover:last-of-type::after {
    border-bottom: 3px solid #e92308;
    width: 100%;
  }
`;
