export default class NotificationSubscriber {
  constructor({ notificationService }) {
    notificationService.subscribe("order.placed", "firebase-push-notification");
  }
}
