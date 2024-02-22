import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';
import { makeAnswer } from 'test/factories/make-answer';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe('Choose Question Best Answer', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		inMemoryAnswerRepository = new InMemoryAnswersRepository();
		sut = new ChooseQuestionBestAnswerUseCase(inMemoryQuestionsRepository, inMemoryAnswerRepository);
	});

	it('should be able to choose question best answer', async () => {
		const question = makeQuestion();
		const answer = makeAnswer({
			questionId: question.id
		});

		inMemoryQuestionsRepository.create(question);
		inMemoryAnswerRepository.create(answer);

		await sut.execute({
			answerId: answer.id.toString(),
			authorId: question.authorId.toString()
		});

		expect(inMemoryQuestionsRepository.items[0].bestAnswerID).toEqual(answer.id);
	});

	it('should not be able to choose another user question best answer', async () => {
		const question = makeQuestion({
			authorId: new UniqueEntityID('author-1')
		});
		const answer = makeAnswer({
			questionId: question.id
		});

		inMemoryQuestionsRepository.create(question);
		inMemoryAnswerRepository.create(answer);

		await expect(() =>
			sut.execute({
				answerId: answer.id.toString(),
				authorId: 'author-2'
			})
		).rejects.toBeInstanceOf(Error);
	});
});
