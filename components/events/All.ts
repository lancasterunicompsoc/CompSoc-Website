
import { ref  } from "vue"
export let all_events = ref([]);

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
