"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBookPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    quantity: "",
    availableQuantity: "",
    publicationYear: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      loadBook();
    }
  }, [id]);

  async function loadBook() {
    try {
      const res = await fetch(`/api/books/${id}`);
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Book not found.");
        return;
      }

      const book = data.book;

      setForm({
        title: book.title,
        author: book.author,
        category: book.category,
        isbn: book.isbn,
        quantity: book.quantity,
        availableQuantity: book.availableQuantity,
        publicationYear: book.publicationYear,
      });
    } catch (error) {
      console.error(error);
      setMessage("Unable to load book.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          availableQuantity: Number(form.availableQuantity),
          publicationYear: Number(form.publicationYear),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Unable to update book.");
        return;
      }

      setMessage("Book updated successfully.");

      setTimeout(() => {
        router.push("/books");
      }, 700);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0b0a] text-[#c9a66b]">
        Opening book details...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0b0a] px-6 py-10 text-[#f5efe6]">
      <div className="mx-auto max-w-4xl">

        <button
          onClick={() => router.push("/books")}
          className="mb-10 text-sm text-[#9b9288] transition hover:text-[#c9a66b]"
        >
          ← Back to Library
        </button>

        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.4em] text-[#c9a66b]">
            Librarian Collection
          </p>

          <h1 className="mt-3 font-serif text-5xl">
            Edit book
          </h1>

          <p className="mt-3 text-[#817970]">
            Update the details of this book.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#c9a66b]/15 bg-[#151210] p-7 shadow-2xl md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2">

            <Input
              label="Book Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />

            <Input
              label="Author"
              name="author"
              value={form.author}
              onChange={handleChange}
            />

            <Input
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
            />

            <Input
              label="ISBN"
              name="isbn"
              value={form.isbn}
              onChange={handleChange}
            />

            <Input
              label="Total Quantity"
              name="quantity"
              type="number"
              min="0"
              value={form.quantity}
              onChange={handleChange}
            />

            <Input
              label="Available Quantity"
              name="availableQuantity"
              type="number"
              min="0"
              value={form.availableQuantity}
              onChange={handleChange}
            />

            <Input
              label="Publication Year"
              name="publicationYear"
              type="number"
              value={form.publicationYear}
              onChange={handleChange}
            />

          </div>

          {message && (
            <div className="mt-6 rounded-xl border border-[#c9a66b]/20 bg-[#c9a66b]/5 px-4 py-3 text-sm text-[#c9a66b]">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-8 w-full rounded-full bg-[#8b3a45] px-6 py-4 text-sm font-medium transition hover:bg-[#6f2e38] disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Changes →"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  min,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#a69c91]">
        {label}
      </label>

      <input
        required
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-4 text-sm text-white outline-none transition focus:border-[#c9a66b]/60"
      />
    </div>
  );
}