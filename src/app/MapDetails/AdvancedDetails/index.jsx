// @flow
import React from 'react';

import Switch from '../../../shared/components/Switch';

import { AdvancedDetailsProps as IProps } from './types';

import { ContainerTab, ContentTitle } from '../styles';
import { ContainerCheckBox, CheckBox } from './styles';

const AdvancedDetails = ({ mapId }: IProps) => {
  const checkBoxes = [
    { label: 'Template' },
    { label: 'xAPI realtime' },
  ];

  return (
    <ContainerTab>
      <ContentTitle>
        Map Id:
        {` ${mapId}`}
      </ContentTitle>
      <ContentTitle>
        OLab version:
        {` ${process.env.PROJECT_VERSION}`}
      </ContentTitle>
      <ContainerCheckBox>
        {checkBoxes.map(item => (
          <CheckBox>
            <Switch
              key={item.label}
              label={item.label}
              labelPlacement="start"
            />
          </CheckBox>
        ))}
      </ContainerCheckBox>
    </ContainerTab>
  );
};

export default AdvancedDetails;
