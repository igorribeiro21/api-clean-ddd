import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface FetchQuestionCommentsUseCaseRequest {
	page: number;
    questionId: string;
}

interface FetchQuestionCommentsUseCaseResponse {
	questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
	constructor(
		private questionCommmentsRepository: QuestionCommentsRepository
	) { }

	async execute({
		page,
		questionId
	}: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
		const questionComments = await this.questionCommmentsRepository.findManyByQuestionId(questionId , { page });

		return {
			questionComments
		};
	}
}