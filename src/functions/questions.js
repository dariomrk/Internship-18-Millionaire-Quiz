import questionsJson from '../assets/questions.json';

/**
 * Loads questions from the questions.json file.
 * @returns {{
 *  id: string,
*   question: string,
*   options: string[],
*   answer: number,
*   isUsed: boolean,
* }[]}
 */
export const loadQuestions = () => questionsJson.map((q) => ({
  isUsed: false,
  id: crypto.randomUUID(),
  ...q,
}));

export const consumeQuestions = (questions) => {
  const unusedQuestions = questions.filter((q) => !q.isUsed);
  if (unusedQuestions.length === 0) {
    throw new Error('No unused questions left.');
  }
  const randomQuestion = unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
  const modifiedQuestions = questions.map((q) => {
    if (q.id === randomQuestion.id) {
      return {
        ...q,
        isUsed: true,
      };
    }
    return q;
  });
  return [randomQuestion, modifiedQuestions];
};
