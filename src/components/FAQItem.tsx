import React, { useState } from 'react';
import styled from '@emotion/styled';

import { colors, sizing } from '../utils';

import { fonts } from '../design-system';
import { PlusCircle, MinusCircle } from 'react-feather';

type Props = {
  question: string;
  answer?: string;
}

const FAQItem = ({question, answer = ''}: Props) => {
  const [isOpened, setIsOpened] = useState(false);

  const toggle = () => {
    setIsOpened(!isOpened);
  }

  return (
    <Container>
      <QuestionContainer onClick={toggle}>
        <Question>{question}</Question>
        {isOpened ? (
          <MinusCircle size={24} />
        ) : (
          <PlusCircle size={24}/>
        )}
      </QuestionContainer>
      <Divider />
      {isOpened && (
          <AnswerContainer>
            <Answer>{answer}</Answer>
          </AnswerContainer>
        )
      }
    </Container>
  );
};

const Container = styled.div`
  padding: ${sizing(20)};
  transition: 0.5s height;
`;
const QuestionContainer = styled.div`
  margin-bottom: ${sizing(10)};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Question = styled.p`
  ${fonts.boldText['600']};
  flex: 1;
`;

const AnswerContainer = styled.div`
  margin-bottom: ${sizing(10)};
  padding-top: ${sizing(20)};
`;

const Answer = styled.p`
  ${fonts.regularText['400']};
`;

const Divider = styled.div`
  height: ${sizing(2)};
  width: 100%;
  background-color: ${colors.solids.BABY_PINK};
`;

export default FAQItem;