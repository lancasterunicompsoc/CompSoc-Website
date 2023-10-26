// import { Resend } from "resend";

import {
  head,
  body,
  style,
  h2,
  main,
  section,
  html,
} from "~/mail/components/html";

import Event from "~/mail/components/Event";

export default defineEventHandler(async _event => {
  // const { resend_key: resendKey } = useRuntimeConfig();
  // const resend = new Resend(resendKey);
  const events = await $fetch("/api/events/all?weeks=1");
  const content = html([
    head([
      style({
        ":root": {
          "--highlight2Light": "#ae3428",
        },
        "*": {
          padding: 0,
          margin: 0,
          boxSizing: "border-box",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        },
        a: {
          color: "currentColor",
          textDecoration: "none",
        },
        main: {
          maxWidth: "45rem",
          margin: "5em auto 2em",
        },
        h2: {
          fontSize: "1.5rem",
          fontWeight: 600,
        },
        h3: {
          fontSize: "1.3rem",
          fontWeight: 600,
        },
        ul: {
          width: "100%",
        },
        ".flex": { display: "flex" },
        ".flex-wrap": { flexWrap: "wrap" },
        ".info-line p": {
          margin: { right: "1rem" },
        },
        ".tag": {
          backgroundColor: "var(--highlight2Light)",
          color: "white",
          padding: "0.25rem 0.5rem",
          margin: { left: "auto" },
          height: "max-content",
          width: "8ch",
          textAlign: "center",
        },
      }),
      `
      <style>
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
      </style>
      `,
    ]),
    body(
      main(
        section({
          id: "events",
          children: [
            h2("CompSoc Events"),
            events.map(event => Event({ event })).join(""),
          ],
        }),
      ),
    ),
  ]);
  return content;
  /**
  try {
    const data = await resend.emails.send({
      from: "Clippy <clippy@compsoc.io>",
      to: ["spam.jonathan@leeming.dev"],
      subject: "CompSoc Event!",
      html: content,
    });

    return data;
  } catch (error) {
    return { error };
  }
  /**/
});
