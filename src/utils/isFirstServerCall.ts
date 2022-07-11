import { GetServerSidePropsContext } from "next";

export function isFirstServerCall(context: GetServerSidePropsContext) {
  return context.req.url?.indexOf("/_next/data/") === -1;
}
