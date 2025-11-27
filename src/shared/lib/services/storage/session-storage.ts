import TypedLocalStore from "typed-local-store";

// biome-ignore lint/complexity/noBannedTypes: empty object type
export type SessionStorageSchema = {};

export const SessionStorageService = new TypedLocalStore<SessionStorageSchema>({
  storage: "sessionStorage",
});
