const BASE_URL = "http://localhost:5000";

// Add entry
export const addEntry = async (text) => {
  const res = await fetch(`${BASE_URL}/api/entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return res.json();
};

// Get all entries
export const getEntries = async () => {
  const res = await fetch(`${BASE_URL}/api/entries`);
  return res.json();
};

// Delete entry
export const deleteEntry = async (id) => {
  await fetch(`${BASE_URL}/api/entries/${id}`, {
    method: "DELETE",
  });
};

// Update entry
export const updateEntry = async (id, text) => {
  const res = await fetch(`${BASE_URL}/api/entries/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return res.json();
};