import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onMessage, getMessaging } from "firebase/messaging";
import { app } from "@lib/firebase/firebaseApp";

export default function FCMNotification() {
  useEffect(() => {
    const messaging = getMessaging(app);
    const CustomToastContainer = ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }) => (
      <div>
        <h3 className="font-bold">{title}</h3>
        <p>{description}</p>
      </div>
    );
    onMessage(messaging, ({ notification }) => {
      if (Notification.permission === "granted") {
        // toast(payload.notification?.title);
        toast.success(
          <CustomToastContainer
            title={notification?.title as string}
            description={notification?.body as string}
          />,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    });
  }, []);

  return <ToastContainer />;
}
