import EventListeners from "./listeners.js";

const createUUID = (): string => {
  let date: number = new Date().getTime();
  const uuid: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (date + Math.random() * 16) % 16 | 0;
      date = Math.floor(date / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};

const createRoom = (): void => {
  const roomUUID = createUUID();
  window.location.href = "/join/" + roomUUID;
};

const createRoomButton = document.querySelector(".create-new-room");
const listeners = new EventListeners(
  createRoomButton as HTMLElement,
  new Map([["click", createRoom]])
);
