function parseInput(text) {
  let type = "note";
  let tags = [];
  let date = null;

  const lower = text.toLowerCase();

  // 🔹 Detect type
  if (lower.includes("remind")) {
    type = "reminder";
  } else if (
    lower.includes("buy") ||
    lower.includes("do") ||
    lower.includes("finish") ||
    lower.includes("complete")
  ) {
    type = "task";
  }

  // 🔹 Extract tags (#tag)
  const tagMatches = text.match(/#\w+/g);
  if (tagMatches) {
    tags = tagMatches.map((tag) => tag.replace("#", ""));
  }

  // 🔹 Extract simple date words
  if (lower.includes("tomorrow")) {
    date = "tomorrow";
  } else if (lower.includes("today")) {
    date = "today";
  }

  // 🔹 Extract time (like 5pm, 10am)
  const timeMatch = text.match(/\b\d{1,2}(am|pm)\b/i);
  if (timeMatch) {
    date = date ? date + " " + timeMatch[0] : timeMatch[0];
  }

  return {
    text,
    type,
    date,
    tags,
  };
}

module.exports = parseInput;