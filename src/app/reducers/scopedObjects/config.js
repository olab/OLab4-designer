import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 2,
  },
  wordsPerSentence: {
    max: 10,
    min: 4,
  },
});

export const questions = [...Array(5)].map((item, i) => ({
  id: i,
  shortCode: `[QU:${i + 2231}]`,
  title: lorem.generateSentences(2),
  subTitle: `Situational Judgement Testing - ${i + 1}`,
  extendedInfo: null,
}));

export default {
  questions,
};
