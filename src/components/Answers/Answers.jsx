import {
  Button, Card, SimpleGrid, Modal, Stack, Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import { useJoker } from '../../providers/JokerProvider';
import { useQuestion } from '../../providers/QuestionProvider';
import { useScore } from '../../providers/ScoreProvider';
import Answer from '../Answer';

function Answers() {
  const jokerContext = useJoker();
  const questionContext = useQuestion();
  const scoreContext = useScore();
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleCorrectAnswer = () => {
    questionContext.getNext();
    scoreContext.next();
  };
  const handleIncorrectAnswer = () => {
    jokerContext.reset();
    questionContext.getNext();
    scoreContext.reset();
  };

  // TODO move dialog to ConfirmationDialog
  return (
    <>
      <Modal opened={modalOpened} onClose={closeModal} centered>
        <Stack>
          <Text size={20} align="center">
            Are you sure?
          </Text>
          <Button
            onClick={() => {
              if (selectedAnswer === questionContext.question.answer) {
                handleCorrectAnswer();
              } else {
                handleIncorrectAnswer();
              }
              setSelectedAnswer(null);
              closeModal();
            }}
            variant="light"
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              setSelectedAnswer(null);
              closeModal();
            }}
            color="red"
          >
            No
          </Button>
        </Stack>
      </Modal>
      <Card>
        <SimpleGrid cols={2}>
          {questionContext.question?.options.map((answer, i) => (
            <Answer
              key={answer}
              answer={answer}
              index={i}
              setAnswerCallback={setSelectedAnswer}
              openModalCallback={openModal}
              disabled={false}
            />
          ))}
        </SimpleGrid>
      </Card>
    </>
  );
}

export default Answers;
