import { notification } from "antd";

export const openNotification = (message, meme = "", icon = "🤷‍♂️") => {
  notification.open({
    message: `${message}`,
    description: `${meme}`,
    onClick: () => {},
    placement: "bottomRight",
    icon: `${icon}`,
    duration: 2,
  });
};
