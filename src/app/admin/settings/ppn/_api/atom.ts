import { atom } from "jotai";

export const addEditPpnDialog = atom<"add" | "edit" | "">("");
export const selectedDialogId = atom<string>("");
export const alertPpnDialog = atom<"activate" | "delete" | "">("");

export const ppnSearch = atom<string>("");
