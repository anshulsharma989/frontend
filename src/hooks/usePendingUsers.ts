import { useCallback, useEffect, useState } from "react";
import { approveUser, listPendingUsers, rejectUser } from "../api";
import type { User } from "../types";

/** Shared pending-signups data source — used by the admin dashboard and the user directory. */
export function usePendingUsers() {
  const [pending, setPending] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    listPendingUsers()
      .then(setPending)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const approve = async (id: number) => {
    await approveUser(id);
    refresh();
  };

  const reject = async (id: number) => {
    await rejectUser(id);
    refresh();
  };

  return { pending, error, approve, reject };
}
