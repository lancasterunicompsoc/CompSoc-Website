import { ref } from "vue";

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
}

export let all_events: Ref<Event[]> = ref([]);

export function getAllEvents() {
  fetch("/api/events/all")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      all_events.value = data;
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
}


export function getEvent(id: string, callback: (data: Event | null, error: Error | null) => void) {
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

export function deletePost(id: number) {
  $fetch("/api/events/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
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