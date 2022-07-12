import { IPosts } from "./types";

const all = [{ scope: "posts" }];

const lists = [{ ...all[0], entity: "list" }];

const details = ({ id }: Pick<IPosts, "id">) => [
  { ...all[0], entity: "details", id },
];

export const postKeys = { all, lists, details };
