import React, { useEffect, useState } from "react";

const API_BASE = "/api";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setError("");
        setLoading(true);
        const res = await fetch(`${API_BASE}/data`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) setItems(json.items || []);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <div>
      <h2>Items</h2>
      {items.length === 0 ? (
        <p>No items</p>
      ) : (
        <ul aria-label="items-list">
          {items.map((it, idx) => (
            <li key={`${it.name}-${idx}`}>{it.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

