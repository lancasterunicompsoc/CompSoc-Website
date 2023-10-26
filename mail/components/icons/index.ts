import type { Attributes } from "../html";
import { figure, figcaption, img } from "../html";

type Props = Attributes & ({ img: string } | { src: string; alt: string });
export default (props: Props) => {
  if ("img" in props) {
    const { img, children, ...ps } = props;
    return figure({
      ...ps,
      children: [figcaption(img), children],
    });
  }
  const { src, alt, children, ...ps } = props;
  return figure({
    ...ps,
    children: [figcaption(img({ src, alt })), children],
  });
};
