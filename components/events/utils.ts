import { DateOffset } from "~/utils/time.js";

export enum EventDifficulty {
  EASY = "EASY",
  HARD = "HARD",
  SOCIAL = "SOCIAL",
}

export type EventType = {
  id: number;
  name: string;
  location: string;
  mazemapLink: string;
  summary: string;
  description: string;
  slides: string;
  image: string;
  organizer: string;
  unixStartTime: number;
  unixEndTime: number;
  difficulty: EventDifficulty;
};

type getAllEventParams = { offset?: DateOffset; isXp?: Boolean, past?: boolean };
export function getAllEvents(options?: getAllEventParams) {
  const past = options?.past ?? false;
  const { years, months, weeks, days } = options?.offset ?? {
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
  };
  const headers = options?.isXp
    ? { "User-Agent": "xp-advert" }
    : { "User-Agent": window.navigator.userAgent };
  return $fetch<EventType[]>(
    `/api/events/all?years=${years ?? 0}&months=${months ?? 0}&weeks=${
      weeks ?? 0
    }&days=${days ?? 0}&past=${past}`,
    {
      headers,
    },
  );
}

export function getEvent(
  id: string,
  callback: (data: EventType | null, error: Error | null) => void,
) {
  fetch(`/api/events/event?id=${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.status === 204) {
        const router = useRouter();
        router.replace("/events");
      }
      return response.json();
    })
    .then(data => {
      const event = data as EventType;
      callback(event, null);
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
      callback(null, error);
    });
}

export function deletePost(id: number, jwt: string) {
  $fetch<{ ok: boolean }>("/api/events/delete", {
    method: "POST",
    headers: {
      Bearer: jwt,
    },
    body: { id },
  })
    .then(response => {
      if (!response.ok) {
        console.error("Failed to delete event.");
      }
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
