// @flow
export type SecondaryTabProps = {
  classes: {
    [prop: string]: any,
  },
  info: string,
  nodeId: number,
  linkStyle: number,
  annotation: string,
  priorityId: number,
  nodePriorities: number,
  handleStyleChange: Function,
  handleEditorChange: Function,
  handlePrioritiesChange: Function,
};
