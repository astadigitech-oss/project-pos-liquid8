import { secretStore } from "@/config";
import { toast } from "sonner";
import { setCookie } from "cookies-next/client";
import { loginPost } from "./data";
import { LoginBody } from "./types";
import { atomWithMutation } from "jotai-tanstack-query";

export const loginAtom = atomWithMutation(() => ({
  mutationFn: (body: LoginBody) => loginPost(body),
  onSuccess: async (data) => {
    toast.success(data.message);
    setCookie(secretStore, data.resource.token);
  },
  onError: (error) => {
    toast.error((error as Error).message);
  },
}));
