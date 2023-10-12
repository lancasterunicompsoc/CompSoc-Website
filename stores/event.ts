import { defineStore } from "@pinia/nuxt/dist/runtime/composables";
import { EventType } from "~/components/events/utils";

enum FetchState {
  initial,
  loading,
  done,
  error,
}

type EventStoreType = {
  events: EventType[] | null;
  fetchState: FetchState;
  error: Error | null;
};
export const useEventStore = defineStore("event", {
  state: () => ({ events: null, fetchState: FetchState.initial }),
});
