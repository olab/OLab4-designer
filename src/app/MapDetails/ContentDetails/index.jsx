// @flow
import React from 'react';

import Switch from '../../../shared/components/Switch';
import TextEditor from '../../../shared/components/TextEditor';

import { ContentDetailsProps as IProps } from './types';

import { ContainerTab, ContentTitle } from '../styles';
import { ContainerCheckBox, CheckBox } from './styles';

const ContentDetails = ({ text, handleEditorChange }: IProps) => {
  const checkBoxes = [
    { label: 'Pathway verified' },
    { label: 'Content verified' },
    { label: 'Media completed' },
    { label: 'Licensing completed' },
    { label: 'User guide completed' },
  ];

  return (
    <ContainerTab>
      <ContentTitle>Authoring notes</ContentTitle>
      <TextEditor
        editorId="text"
        height={300}
        width={800}
        text={text}
        handleEditorChange={handleEditorChange}
      />
      <ContainerCheckBox>
        {checkBoxes.map(item => (
          <CheckBox key={item.label}>
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

export default ContentDetails;
