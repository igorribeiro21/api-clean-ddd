import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Notification, NotificationProps } from '@/domain/notification/entreprise/entities/notification';

export function makeNotification(
	override: Partial<NotificationProps> = {},
	id?: UniqueEntityID,
) {
	const notification = Notification.create({
		recipientId: new UniqueEntityID(),
		title: faker.lorem.sentence(4),
		content: faker.lorem.text(),
		...override
	}, id);

	return notification;
}