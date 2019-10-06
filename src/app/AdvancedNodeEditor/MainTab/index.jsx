// @flow
import React from 'react';

import TextEditor from '../TextEditor';
import Switch from '../../../shared/components/Switch';
import OutlinedInput from '../../../shared/components/OutlinedInput';

import type { MainTabProps as IProps } from './types';

import { LeftContent, RightContent, NodeContentTitle } from './styles';

const MainTab = ({
  text = '', title = '', type = false, isEnd = false, isVisitOnce = false,
  handleTitleChange, handleEditorChange,
}: IProps) => {
  const checkBoxes = [
    { label: 'Root Node', value: type, name: 'type' },
    { label: 'End node', value: isEnd, name: 'isEnd' },
    { label: 'Visit Once', value: isVisitOnce, name: 'isVisitOnce' },
  ];

  return (
    <>
      <LeftContent>
        <OutlinedInput
          name="title"
          label="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
        />
        <NodeContentTitle>Node content</NodeContentTitle>
        <TextEditor
          editorId="text"
          height={300}
          width={800}
          text={text}
          handleEditorChange={handleEditorChange}
        />
      </LeftContent>
      <RightContent>
        {checkBoxes.map(item => (
          <Switch
            key={item.label}
            label={item.label}
            labelPlacement="start"
            checked={item.value}
          />
        ))}
      </RightContent>
    </>
  );
};

export default MainTab;
