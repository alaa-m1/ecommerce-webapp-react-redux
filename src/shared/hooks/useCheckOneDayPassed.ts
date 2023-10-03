import { useDispatch } from "react-redux";
import { setNotificationDate } from "store/user/userActions";
import { useAppSelector } from "utils/redux/hooks";

export const useCheckOneDayPassed = () => {
  const dispatch = useDispatch();
  const notificationDate = useAppSelector(
    (state) => state.user.notificationDate
  );
  const currentDate = new Date().toLocaleDateString();

  if (currentDate === notificationDate) return false;

  if (Notification.permission === "granted")
    setTimeout(() => dispatch(setNotificationDate(currentDate)), 7000);

  return true;
};
