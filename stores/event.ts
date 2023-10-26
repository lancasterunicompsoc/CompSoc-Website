import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import type { EventType } from "~/components/events/utils";

type FetchState = "initial" | "loading" | "done" | "error";

type EventStoreType = {
  events: EventType[] | null;
  fetchState: FetchState;
  error: FetchError | null;
};

type getAllEventParams = { offset?: DateOffset; isXp?: Boolean };

export const useEventStore = defineStore("event", {
  state: (): EventStoreType => ({
    events: null,
    fetchState: "initial",
    error: null,
  }),
  actions: {
    reset() {
      this.fetchState = "initial";
      this.error = null;
      this.events = null;
    },
    getAllEvents(options?: getAllEventParams) {
      this.reset();

      this.fetchState = "loading";

      const { years, months, weeks, days } = options?.offset ?? {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
      };

      const headers = options?.isXp
        ? { "User-Agent": "xp-advert" }
        : { "User-Agent": window.navigator.userAgent };

      $fetch<EventType[]>(
        `/api/events/all?years=${years ?? 0}&months=${months ?? 0}&weeks=${
          weeks ?? 0
        }&days=${days ?? 0}`,
        {
          headers,
        },
      )
        .then(d => {
          this.events = d;
          this.fetchState = "done";
          this.error = null;
        })
        .catch(e => {
          this.error = e;
          this.fetchState = "error";
          this.events = null;
        });
    },
  },
});
