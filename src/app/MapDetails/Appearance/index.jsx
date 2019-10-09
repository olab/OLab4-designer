// @flow
import React from 'react';

import OutlinedSelect from '../../../shared/components/OutlinedSelect';

import { THEME, ACCESS } from './config';
import { LINK_STYLES } from '../../config';

import { ContainerTab } from '../styles';
import { ContainerSelect } from './styles';

const Appearance = () => {
  const selects = [
    { label: 'Link Style', values: LINK_STYLES, name: 'linkStyle' },
    { label: 'Theme', values: THEME, name: 'theme' },
    { label: 'Access', values: ACCESS, name: 'access' },
  ];

  return (
    <ContainerTab>
      {selects.map(item => (
        <ContainerSelect key={item.label}>
          <OutlinedSelect
            label={item.label}
            name={item.name}
            labelWidth={80}
            value={item.values[0]}
            values={item.values}
            fullWidth
          />
        </ContainerSelect>
      ))}
    </ContainerTab>
  );
};

export default Appearance;
