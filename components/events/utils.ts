import { DateOffset } from '~/utils/time.js';

export interface Event {
  id: number;
  name: string;
  location: string;
  summary: string;
  description: string;
  slides: string;
  organizer: string;
  startTime: string;
  endTime: string;
  difficulty: EventDifficulty;
}

export enum EventDifficulty {
  EASY = "EASY",
  HARD = "HARD",
  SOCIAL = "SOCIAL",
}

export function getAllEvents(offset?: DateOffset) {
  const { years, months, weeks, days } = offset ?? { years: 0, months: 0, weeks: 0, days: 0 };
  return $fetch<Event[]>(`/api/events/all?years=${years ?? 0}&months=${months ?? 0}&weeks=${weeks ?? 0}&days=${days ?? 0}`);
}

export function getEvent(
  id: string,
  callback: (data: Event | null, error: Error | null) => void,
) {
  fetch(`/api/events/event?id=${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      const event = data as Event;
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
