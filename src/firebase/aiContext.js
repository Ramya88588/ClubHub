import { auth } from "./firebase";
import { getUpcomingEvents } from "./collections";

export function getAIUserContext() {
  const user = auth.currentUser;
  if (!user) return null;

  return {
    uid: user.uid,
    email: user.email,
    role: user.role ?? "student",
  };
}

export async function getAIEventContext() {
  return await getUpcomingEvents();
}

export async function getAIStudentContext() {
  return {}; // expand later
}
