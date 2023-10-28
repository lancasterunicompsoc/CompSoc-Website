import type { Attributes } from "../html";
import { figure, figcaption, img } from "../html";

type Props = Attributes &
  ({ img: string } | { src: string; alt: string } | { name: string });
export default (props: Props) => {
  if ("img" in props) {
    const { img, children, ...ps } = props;
    return figure({
      ...ps,
      children: [figcaption(img), children],
    });
  }
  if ("name" in props) {
    const { name, children, ...ps } = props;
    return figure({
      ...ps,
      children: [
        figcaption(
          img({
            src: `https://compsoc.io/api/mail/icon?name=${name}`,
            alt: `${name}:`,
          }),
        ),
        " ",
        children,
      ],
    });
  }
  const { src, alt, children, ...ps } = props;
  return figure({
    ...ps,
    children: [figcaption(img({ src, alt })), " ", children],
  });
};
