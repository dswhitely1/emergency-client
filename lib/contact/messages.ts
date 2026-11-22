import { site } from "@/content/site";

// Shown whenever a message can't be delivered, by the server action and by the form itself.
export const CONTACT_FAILURE_MESSAGE = `Sorry, we couldn't send your message. Please call us at ${site.phones[0].display}.`;
