import { Answer } from '../entities/answer';

interface AnswerQuenstionUseCaseRequest {
    instructorId: string;
    questionId: string;
    content: string;
}

export class AnswerQuenstionUseCase {
	execute({ instructorId, questionId, content }: AnswerQuenstionUseCaseRequest) {
		const answer = new Answer(content);

		return answer;
	}
}