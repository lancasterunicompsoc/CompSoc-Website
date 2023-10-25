import { Resend } from "resend";
import { unixAnySpan } from "~/utils/time";

const ICON_TIME = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  height="32"
  width="32"
  style="scale: 0.7"
  fill="var(--highlight2Light)"
>
  <path
    d="M21 30a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm0-14a6 6 0 1 0 6 6 6 6 0 0 0-6-6Z"
  />
  <path d="M22.6 25 20 22.4V18h2v3.6l2 2-1.4 1.4z" />
  <path
    d="M28 6a2 2 0 0 0-2-2h-4V2h-2v2h-8V2h-2v2H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h4v-2H6V6h4v2h2V6h8v2h2V6h4v6h2Z"
  />
  <path
    fill="none"
    d="M0 0h32v32H0z"
    data-name="&lt;Transparent Rectangle&gt;"
  />
</svg>`;
const ICON_LOCATION = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  height="32"
  width="32"
  style="scale: 0.7"
  fill="var(--highlight2Light)"
>
  <path
    d="M16 18a5 5 0 1 1 5-5 5 5 0 0 1-5 5Zm0-8a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z"
  />
  <path
    d="m16 30-8.44-9.95-.34-.45A10.89 10.89 0 0 1 5 13a11 11 0 0 1 22 0 10.88 10.88 0 0 1-2.21 6.6s-.3.4-.35.45ZM8.81 18.4l.29.37L16 26.9l6.91-8.15.28-.37A8.9 8.9 0 0 0 25 13a9 9 0 1 0-18 0 8.9 8.9 0 0 0 1.81 5.4Z"
  />
  <path
    fill="none"
    d="M0 32V0h32v32z"
    data-name="&lt;Transparent Rectangle&gt;"
  />
</svg>`;
const ICON_SPEAKER = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  height="32"
  width="32"
  style="scale: 0.7"
  fill="var(--highlight2Light)"
>
  <path
    d="m29 19-1-2a3 3 0 0 0 0-1 3 3 0 1 0-3 3 3 3 0 0 0 1 0l2 1v8h-6v-3a7 7 0 0 0-7-7H9a7 7 0 0 0-7 7v5h28V20a2 2 0 0 0-1-1ZM4 25a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v3H4Z"
  />
  <path
    d="M12 4a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7 7 7 0 0 0-7-7Z"
  />
  <path
    fill="none"
    d="M0 0h32v32H0z"
    data-name="&lt;Transparent Rectangle&gt;"
  />
</svg>`;

export default defineEventHandler(async event => {
  const { resend_key: resendKey } = useRuntimeConfig();
  const resend = new Resend(resendKey);
  const events = await $fetch("/api/events/all?weeks=1");
  const body = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      :root {
        --highlight2Light: #ae3428;
      }

      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      }

      a {
        color: currentColor;
        text-decoration: none;
      }

      main {
        max-width: 45rem;
        margin: 5em auto 2em;
      }

      @media (max-width: 55rem) {
        main {
          width: 80vw;
        }
      }

      @media (max-width: 35rem) {
        main {
          margin-inline: 1em;
          width: unset;
        }
      }

      .flex { display: flex; }

      .flex-wrap { flex-wrap: wrap; }

      h2 {
        font-size: 1.5rem;
        font-weight: 600;
      }

      h3 {
        font-size: 1.3rem;
        font-weight: 600;
      }

      ul { width: 100%; }

      .info-line p { margin-right: 1rem; }

      .tag {
        background-color: var(--highlight2Light);
        color: white;
        padding: 0.25rem 0.5rem;
        margin-left: auto;
        height: max-content;
        width: 8ch;
        text-align: center;
      }

      .compressedSummary {
        display: block;
        display: -webkit-box;
        width: 100%;
        max-height: calc(1rem * 3 * 1.4);
        font-size: 1rem;
        line-height: 1.3;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0.7rem;
      }

      .wrapper {
        margin: 1em 0;
        padding: 1em 1.5em;
      }

      .underline { text-decoration: underline; }

      .text-highlight2Light { color: var(--highlight2Light); }

      .card {
        margin: 1em auto;
        padding: 1em 1.5em;
        display: block;
        cursor: pointer;
        background: #ddd;
      }

      .card:hover { filter: brightness(1.3); }

      .card:nth-child(2n) > :is(h1, h2, h3, h4, h5, h6) {
        text-align: unset;
      }
    </style>
  </head>
  <body>
    <main>
      <section id="events">
        <h2>CompSoc Events</h2>
        ${events
          .map(
            event => `
              <a href="https://compsoc.io/events/${event.id}">
                <article class="card">
                  <div>
                    <h3>${event.name}</h3>
                    <div class="flex info-line items-center flex-wrap">
                      <figure class="flex">
                        <figcaption>${ICON_TIME}</figcaption>
                        <p>${unixAnySpan(event.unixStartTime, event.unixEndTime)}</p>
                      </figure>
                      <figure class="flex">
                        <figcaption>${ICON_LOCATION}</figcaption>
                        ${
                          event.mazemapLink
                            ? `<a href="${event.mazemapLink}" class="underline text-highlight2Light">
                                <p>${event.location}</p>
                              </a>`
                            : `<p>${event.location}</p>`
                        }
                      </figure>
                      <figure class="flex">
                        <figcaption>${ICON_SPEAKER}</figcaption>
                        <p>${event.organizer}</p>
                      </figure>
                      <span class="tag sm:ml-auto">${event.difficulty}</span>
                    </div>
                    <p>${event.summary}</p>
                  </div>
                </article>
              </a>
            `,
          )
          .join("")}
      </section>
    </main>
  </body>
</html>`;
  try {
    const data = await resend.emails.send({
      from: "Clippy <clippy@compsoc.io>",
      to: [TO ADDRESS],
      subject: "CompSoc Event!",
      html: body,
    });

    return data;
  } catch (error) {
    return { error };
  }
});
