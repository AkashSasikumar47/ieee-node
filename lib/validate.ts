import {
  DESCRIPTION_MAX,
  POST_TYPES,
  TITLE_MAX,
  type PostInput,
  type PostType,
} from "./posts";

type ValidationResult =
  { ok: true; data: PostInput } | { ok: false; error: string };

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function parsePostInput(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Expected a JSON object" };
  }
  const { title, description, event_date, type } = body as Record<
    string,
    unknown
  >;

  if (typeof title !== "string" || title.trim().length === 0) {
    return { ok: false, error: "Title is required" };
  }
  if (title.trim().length > TITLE_MAX) {
    return {
      ok: false,
      error: `Title must be ${TITLE_MAX} characters or fewer`,
    };
  }
  if (typeof description !== "string" || description.trim().length === 0) {
    return { ok: false, error: "Description is required" };
  }
  if (description.trim().length > DESCRIPTION_MAX) {
    return {
      ok: false,
      error: `Description must be ${DESCRIPTION_MAX} characters or fewer`,
    };
  }
  if (
    typeof event_date !== "string" ||
    !ISO_DATE.test(event_date) ||
    Number.isNaN(Date.parse(`${event_date}T00:00:00+05:30`))
  ) {
    return { ok: false, error: "Date must be a valid YYYY-MM-DD date" };
  }
  if (typeof type !== "string" || !POST_TYPES.includes(type as PostType)) {
    return {
      ok: false,
      error: `Type must be one of: ${POST_TYPES.join(", ")}`,
    };
  }

  return {
    ok: true,
    data: {
      title: title.trim(),
      description: description.trim(),
      event_date,
      type,
    },
  };
}
