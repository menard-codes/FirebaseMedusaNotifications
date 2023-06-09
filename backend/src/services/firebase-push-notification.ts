import { AbstractNotificationService, OrderService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";

import {
  initializeApp,
  cert,
  ServiceAccount,
  getApps,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { Message, getMessaging } from "firebase-admin/messaging";

export default class FirebasePushNotificationService extends AbstractNotificationService {
  protected manager_: EntityManager;
  protected transactionManager_: EntityManager;
  static identifier = "firebase-push-notification";
  protected orderService: OrderService;

  constructor(container) {
    super(container);
    this.orderService = container.orderService;

    if (!getApps().length) {
      initializeApp({
        credential: cert({
          type: process.env.FIREBASE_TYPE,
          project_id: process.env.FIREBASE_PROJECT_ID,
          private_key: process.env.FIREBASE_PRIVATE_KEY,
          private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_CLIENT_ID,
          auth_uri: process.env.FIREBASE_AUTH_URI,
          token_uri: process.env.FIREBASE_TOKEN_URI,
          auth_provider_x509_cert_url:
            process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
          client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        } as ServiceAccount),
      });
    }
  }

  async sendNotification(
    event: string,
    data: any,
    attachmentGenerator: unknown
  ): Promise<{ to: string; status: string; data: Record<string, unknown> }> {
    if (event === "order.placed") {
      const order = await this.orderService.retrieve(data.id);

      const db = getFirestore();
      const registrationTokenDocRef = db
        .collection("tokens")
        .doc(order.cart_id);

      try {
        const registrationTokenDoc = await registrationTokenDocRef.get();
        if (!registrationTokenDoc.exists) {
          throw new Error("No such document");
        } else {
          const registrationToken: string =
            registrationTokenDoc.data().registrationToken;
          const message = {
            notification: {
              title: "Order Placed",
              body: "We received your order. It'll be processed right away",
            },
            token: registrationToken,
          };
          const res = await getMessaging().send(message as Message);
          console.log("Successfully sent the notif: ", order.cart_id, res);
          return {
            to: registrationToken,
            status: "done",
            data: {
              title: "Order Placed",
              body: "We received your order. It'll be processed right away",
            },
          };
        }
      } catch (error) {
        console.error("Error while sending the push notification: ", error);
      }
    }
  }

  async resendNotification(
    notification: any,
    config: any,
    attachmentGenerator: unknown
  ): Promise<{ to: string; status: string; data: Record<string, unknown> }> {
    const to: string = config.to ? config.to : notification.to;

    const message = {
      notification: {
        title: "Order Placed",
        body: "We received your order. It'll be processed right away",
      },
      token: to,
    };
    await getMessaging().send(message as Message);
    console.log("Notification resent");
    return {
      to,
      status: "done",
      data: notification.data,
    };
  }
}
