import { expect, test } from 'vitest';
import { AnswerQuenstionUseCase } from './answer-question';

test('create an answer',() => {
	const answerQuestion = new AnswerQuenstionUseCase();

	const answer = answerQuestion.execute({
		content: 'Nova resposta',
		instructorId: '1',
		questionId: '1'
	});

	expect(answer.content).toEqual('Nova resposta');
});