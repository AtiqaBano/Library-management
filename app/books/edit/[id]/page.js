"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBookPage() {
    const params = useParams();
    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        author: "",
        category: "",
        isbn: "",
        quantity: "",
        availableQuantity: "",
        publicationYear: "",
        coverImage: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadBook() {
            try {
                const res = await fetch(`/api/books/${params.id}`);
                const data = await res.json();

                if (!res.ok || !data.success) {
                    alert(data.message || "Book not found.");
                    router.push("/books");
                    return;
                }

                const book = data.book;

                setForm({
                    title: book.title || "",
                    author: book.author || "",
                    category: book.category || "",
                    isbn: book.isbn || "",
                    quantity: book.quantity ?? "",
                    availableQuantity: book.availableQuantity ?? "",
                    publicationYear: book.publicationYear ?? "",
                    coverImage: book.coverImage || "",
                });
            } catch (error) {
                console.error("Load book error:", error);
                alert("Failed to load book.");
                router.push("/books");
            } finally {
                setLoading(false);
            }
        }

        if (params.id) {
            loadBook();
        }
    }, [params.id, router]);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/books/${params.id}`, {
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

            if (!res.ok || !data.success) {
                alert(data.message || "Unable to update book.");
                return;
            }

            alert("Book updated successfully!");
            router.push(`/books/${params.id}`);
        } catch (error) {
            console.error("Update book error:", error);
            alert("Something went wrong.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#0d0b0a] text-[#c9a66b]">
                <p className="text-sm tracking-[0.3em]">
                    LOADING BOOK...
                </p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0d0b0a] px-6 py-12 text-[#f5efe6]">
            <div className="mx-auto max-w-3xl">

                <a
                    href={`/books/${params.id}`}
                    className="text-sm text-[#c9a66b] hover:underline"
                >
                    ← Back to Book
                </a>

                <div className="mt-10">
                    <p className="text-xs uppercase tracking-[0.4em] text-[#c9a66b]">
                        Library Collection
                    </p>

                    <h1 className="mt-3 font-serif text-5xl">
                        Edit Book
                    </h1>

                    <p className="mt-3 text-[#817970]">
                        Update the details of this title in the NOIRÉ
                        collection.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 rounded-2xl border border-white/10 bg-[#151210] p-8"
                >
                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Title */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#9a9188]">
                                Book Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-3 text-sm outline-none transition focus:border-[#c9a66b]/60"
                            />
                        </div>

                        {/* Author */}
                        <div>
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#9a9188]">
                                Author
                            </label>

                            <input
                                type="text"
                                name="author"
                                value={form.author}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-3 text-sm outline-none transition focus:border-[#c9a66b]/60"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#9a9188]">
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-3 text-sm outline-none transition focus:border-[#c9a66b]/60"
                            />
                        </div>

                        {/* ISBN */}
                        <div>
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#9a9188]">
                                ISBN
                            </label>

                            <input
                                type="text"
                                name="isbn"
                                value={form.isbn}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-3 text-sm outline-none transition focus:border-[#c9a66b]/60"
                            />
                        </div>

                        {/* Publication Year */}
                        <div>
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#9a9188]">
                                Publication Year
                            </label>

                            <input
                                type="number"
                                name="publicationYear"
                                value={form.publicationYear}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-3 text-sm outline-none transition focus:border-[#c9a66b]/60"
                            />
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#9a9188]">
                                Total Quantity
                            </label>

                            <input
                                type="number"
                                name="quantity"
                                min="0"
                                value={form.quantity}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-3 text-sm outline-none transition focus:border-[#c9a66b]/60"
                            />
                        </div>

                        {/* Available Quantity */}
                        <div>
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#9a9188]">
                                Available Quantity
                            </label>

                            <input
                                type="number"
                                name="availableQuantity"
                                min="0"
                                value={form.availableQuantity}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-3 text-sm outline-none transition focus:border-[#c9a66b]/60"
                            />
                        </div>

                        {/* Cover Image */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#9a9188]">
                                Book Cover URL
                            </label>

                            <input
                                type="url"
                                name="coverImage"
                                value={form.coverImage}
                                onChange={handleChange}
                                placeholder="https://example.com/book-cover.jpg"
                                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-3 text-sm outline-none transition focus:border-[#c9a66b]/60"
                            />

                            <p className="mt-2 text-xs text-[#625c56]">
                                Paste a direct image URL for the real book cover.
                            </p>
                        </div>
                    </div>

                    {/* Cover Preview */}
                    {form.coverImage && (
                        <div className="mt-8">
                            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#9a9188]">
                                Cover Preview
                            </p>

                            <div className="flex justify-center rounded-2xl border border-white/10 bg-[#0d0b0a] p-6">
                                <img
                                    src={form.coverImage}
                                    alt={`${form.title || "Book"} cover`}
                                    className="h-72 w-48 rounded-lg object-cover shadow-2xl"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                router.push(`/books/${params.id}`)
                            }
                            className="flex-1 rounded-xl border border-white/10 px-6 py-4 text-sm transition hover:bg-white/5"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 rounded-xl bg-[#8b3a45] px-6 py-4 text-sm font-medium transition hover:bg-[#6f2e38] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving
                                ? "Saving Changes..."
                                : "Save Changes →"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}