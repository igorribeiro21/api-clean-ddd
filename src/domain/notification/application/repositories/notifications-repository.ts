import { Notification } from '../../entreprise/entities/notification';

export interface NotificationsRepository {
    create(notification: Notification): Promise<void>;
}