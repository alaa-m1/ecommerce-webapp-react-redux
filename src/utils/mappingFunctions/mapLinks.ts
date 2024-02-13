import { uniqueId } from "lodash";
import { LinkInfo } from "types";

export const mapLinks = (
  links: Array<LinkInfo>
): Array<LinkInfo & { id: string }> => {
  const mappedLinks = links.map((link) => ({ ...link, id: uniqueId() }));
  return mappedLinks;
};
