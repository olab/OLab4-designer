// @flow
export type ICopyToClipboardProps = {
  classes: {
    [props: string]: any,
  },
  text: string,
};

export type ICopyToClipboardState = {
  isCopied: boolean,
};
