export const questions = [...Array(5)].map((item, i) => ({
  id: i,
  shortCode: `[QU:${i + 2231}]`,
  title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet sapien tristique felis volutpat vehicula eget nec est. Cras dapibus dolor mauris, nec consequat ex interdum dapibus. Mauris pulvinar nisl magna.',
  subTitle: `Situational Judgement Testing - ${i + 1}`,
  extendedInfo: null,
}));

export default {
  questions,
};
