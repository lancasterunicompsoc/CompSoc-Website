import {
  head,
  body,
  style,
  h2,
  main,
  section,
  html,
} from "~/mail/components/html";
import Event, { MailEventType } from "~/mail/components/Event";

type Props = {
  events: MailEventType[];
};
export default ({ events }: Props) =>
  html([
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
          textDecoration: "none",
        },
        main: {
          maxWidth: "45rem",
          margin: "5em auto 2em",
          lineHeight: 1.75,
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
          width: "10ch",
          textAlign: "center",
        },
      }),
      `
      <style>
        a {
          color: black;
          color: currentColor;
        }

        .compressedSummary {
          display: block;
          display: -webkit-box;
          width: 100%;
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
            events.map(event => Event({ event })).join("<br>"),
          ],
        }),
      ),
    ),
  ]);
