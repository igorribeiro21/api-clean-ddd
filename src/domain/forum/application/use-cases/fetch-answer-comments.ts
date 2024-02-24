import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comment-repository';

interface FetchAnswerCommentsUseCaseRequest {
	page: number;
    answerId: string;
}

interface FetchAnswerCommentsUseCaseResponse {
	answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
	constructor(
		private answerCommmentsRepository: AnswerCommentsRepository
	) { }

	async execute({
		page,
		answerId
	}: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
		const answerComments = await this.answerCommmentsRepository.findManyByAnswerId(answerId , { page });

		return {
			answerComments
		};
	}
}