import uploadImage from '../../../../helpers/uploadImage';

export const BASIC_TEXT_EDITOR_OPTIONS = [
  'inline',
  'blockType',
  'list',
  'link',
  'image',
];

export const INLINE_OPTION = {
  options: [
    'bold',
    'italic',
    'underline',
    'strikethrough',
  ],
};

export const LIST_OPTION = {
  options: [
    'unordered',
    'ordered',
  ],
};

export const IMAGE_OPTION = {
  previewImage: true,
  alignmentEnabled: false,
  uploadCallback: uploadImage,
};
