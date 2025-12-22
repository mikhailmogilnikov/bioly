import TypedLocalStore from "typed-local-store";

// biome-ignore lint/suspicious/noEmptyInterface: empty object type
export interface SessionStorageSchema {}

export const SessionStorageService = new TypedLocalStore<SessionStorageSchema>({
  storage: "sessionStorage",
});
