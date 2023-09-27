
import { ref  } from "vue"

export interface Event {
  id: number; // Assuming id is a number
  name: string;
  location: string;
  summary: string;
  description: string;
  slides: string;
  organizer: string;
  startTime: string; // You might want to use a Date type here if startTime is a date
  endTime: string;   // You might want to use a Date type here if endTime is a date
}

export let all_events: Ref<Event[]> = ref([]);


export function getAllEvents(){
  fetch("/api/events/all")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    all_events.value= data;
      console.log(all_events.value[0])
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
}
