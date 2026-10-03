"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBookPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        author: "",
        category: "",
        isbn: "",
        quantity: "",
        publicationYear: "",
        coverImage: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [imageError, setImageError] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        // URL change hote hi previous image error reset
        if (name === "coverImage") {
            setImageError(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...form,
                    quantity: Number(form.quantity),
                    publicationYear: Number(form.publicationYear),
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                setMessage(data.message || "Something went wrong.");
                return;
            }

            setMessage("Book added successfully.");

            setTimeout(() => {
                router.push("/books");
            }, 700);
        } catch (error) {
            console.error("Add book error:", error);
            setMessage("Unable to add book.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#0d0b0a] px-6 py-10 text-[#f5efe6]">
            <div className="mx-auto max-w-4xl">

                {/* BACK */}
                <button
                    onClick={() => router.push("/books")}
                    className="mb-10 text-sm text-[#9b9288] transition hover:text-[#c9a66b]"
                >
                    ← Back to Library
                </button>

                {/* HEADER */}
                <div className="mb-10">
                    <p className="text-xs uppercase tracking-[0.4em] text-[#c9a66b]">
                        Librarian Collection
                    </p>

                    <h1 className="mt-3 font-serif text-5xl">
                        Add a new book
                    </h1>

                    <p className="mt-3 text-[#817970]">
                        Give another story a place in the library.
                    </p>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="rounded-3xl border border-[#c9a66b]/15 bg-[#151210] p-7 shadow-2xl md:p-10"
                >
                    <div className="grid gap-6 md:grid-cols-2">

                        <Input
                            label="Book Title"
                            name="title"
                            placeholder="Atomic Habits"
                            value={form.title}
                            onChange={handleChange}
                        />

                        <Input
                            label="Author"
                            name="author"
                            placeholder="James Clear"
                            value={form.author}
                            onChange={handleChange}
                        />

                        <Input
                            label="Category"
                            name="category"
                            placeholder="Self Development"
                            value={form.category}
                            onChange={handleChange}
                        />

                        <Input
                            label="ISBN"
                            name="isbn"
                            placeholder="9780735211292"
                            value={form.isbn}
                            onChange={handleChange}
                        />

                        {/* COVER URL */}
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
                                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-4 text-sm outline-none transition focus:border-[#c9a66b]/60"
                            />

                            <p className="mt-2 text-xs text-[#625c56]">
                                Paste a direct image URL for the book cover.
                            </p>
                        </div>

                        {/* QUANTITY */}
                        <Input
                            label="Quantity"
                            name="quantity"
                            type="number"
                            min="1"
                            placeholder="5"
                            value={form.quantity}
                            onChange={handleChange}
                        />

                        {/* YEAR */}
                        <Input
                            label="Publication Year"
                            name="publicationYear"
                            type="number"
                            placeholder="2018"
                            value={form.publicationYear}
                            onChange={handleChange}
                        />

                    </div>

                    {/* COVER PREVIEW */}
                    {form.coverImage && (
                        <div className="mt-8">
                            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#9a9188]">
                                Cover Preview
                            </p>

                            <div className="flex min-h-[300px] justify-center rounded-2xl border border-white/10 bg-[#0d0b0a] p-6">

                                {!imageError ? (
                                    <img
                                        key={form.coverImage}
                                        src={form.coverImage}
                                        alt="Book cover preview"
                                        className="h-64 w-44 rounded-lg object-cover shadow-2xl"
                                        onLoad={() => {
                                            setImageError(false);
                                        }}
                                        onError={() => {
                                            setImageError(true);
                                        }}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="mb-3 text-4xl">
                                            📕
                                        </div>

                                        <p className="text-sm text-[#c9a66b]">
                                            Cover could not be loaded
                                        </p>

                                        <p className="mt-2 max-w-sm text-xs leading-5 text-[#625c56]">
                                            Please make sure you pasted a
                                            direct image URL ending with an
                                            image file or a working image
                                            endpoint.
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>
                    )}

                    {/* MESSAGE */}
                    {message && (
                        <div className="mt-6 rounded-xl border border-[#c9a66b]/20 bg-[#c9a66b]/5 px-4 py-3 text-sm text-[#c9a66b]">
                            {message}
                        </div>
                    )}

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-8 w-full rounded-full bg-[#8b3a45] px-6 py-4 text-sm font-medium tracking-wide transition hover:bg-[#6f2e38] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Adding to Library..."
                            : "Add Book to Library →"}
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
    placeholder,
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
                placeholder={placeholder}
                min={min}
                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-4 text-sm text-white outline-none transition placeholder:text-[#4f4944] focus:border-[#c9a66b]/60"
            />
        </div>
    );
}
