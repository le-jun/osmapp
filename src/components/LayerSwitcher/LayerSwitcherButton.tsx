import React from 'react';
import styled from 'styled-components';
import LayersIcon from './LayersIcon';

const TopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  padding: 10px;
`;

const StyledLayerSwitcher = styled.button`
  margin: 0;
  padding: 0;
  width: 52px;
  height: 69px;
  border-radius: 5px;
  border: 0;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
  outline: 0;
  cursor: pointer;

  &:hover {
    background-color: #f2f3f2;
  }

  svg {
    margin: 4px auto 4px auto;
  }
`;

export const LayerSwitcherButton = ({ onClick }: { onClick?: any }) => (
  <TopRight>
    <StyledLayerSwitcher onClick={onClick}>
      <LayersIcon />
      Vrstvy
    </StyledLayerSwitcher>
  </TopRight>
);