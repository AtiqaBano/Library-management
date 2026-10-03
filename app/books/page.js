"use client";

import { useEffect, useState } from "react";

export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    async function loadBooks() {
        try {
            const res = await fetch("/api/books");
            const data = await res.json();

            if (data.success) {
                setBooks(data.books);
            }
        } catch (error) {
            console.error("Load books error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBooks();
    }, []);

    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmed) return;

        try {
            const res = await fetch(`/api/books/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Unable to delete book.");
                return;
            }

            alert("Book deleted successfully!");
            loadBooks();
        } catch (error) {
            console.error("Delete book error:", error);
            alert("Something went wrong.");
        }
    }

    const filteredBooks = books.filter((book) => {
        const value = search.toLowerCase();

        return (
            book.title?.toLowerCase().includes(value) ||
            book.author?.toLowerCase().includes(value) ||
            book.category?.toLowerCase().includes(value) ||
            book.isbn?.toLowerCase().includes(value)
        );
    });

    return (
        <main className="min-h-screen bg-[#0d0b0a] text-[#f5efe6]">
            {/* NAVBAR */}
            <nav className="border-b border-[#c9a66b]/15 px-6 py-5">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <a href="/dashboard">
                        <h1 className="font-serif text-2xl tracking-[0.18em]">
                            NOIRÉ
                        </h1>

                        <p className="text-[9px] tracking-[0.35em] text-[#c9a66b]">
                            THE LIVING LIBRARY
                        </p>
                    </a>

                    <div className="hidden gap-8 text-sm text-[#9c938a] md:flex">
                        <a
                            href="/dashboard"
                            className="transition hover:text-white"
                        >
                            Dashboard
                        </a>

                        <a
                            href="/books"
                            className="text-[#f5efe6]"
                        >
                            Library
                        </a>

                        <a
                            href="/members"
                            className="transition hover:text-white"
                        >
                            Members
                        </a>

                        <a
                            href="/transactions"
                            className="transition hover:text-white"
                        >
                            Transactions
                        </a>
                    </div>

                    <a
                        href="/books/add"
                        className="rounded-xl bg-[#8b3a45] px-5 py-3 text-sm font-medium transition hover:bg-[#6f2e38]"
                    >
                        + Add Book
                    </a>
                </div>
            </nav>

            {/* HEADER */}
            <section className="mx-auto max-w-7xl px-6 pb-10 pt-16">
                <p className="text-xs uppercase tracking-[0.4em] text-[#c9a66b]">
                    The Collection
                </p>

                <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <h2 className="font-serif text-5xl md:text-6xl">
                            The Library
                        </h2>

                        <p className="mt-4 max-w-xl text-[#817970]">
                            Explore the collection of stories, knowledge and
                            worlds preserved inside NOIRÉ.
                        </p>
                    </div>

                    <div className="text-sm text-[#756e67]">
                        {books.length}{" "}
                        {books.length === 1 ? "title" : "titles"}
                    </div>
                </div>

                {/* SEARCH */}
                <div className="mt-10">
                    <input
                        type="text"
                        placeholder="Search by title, author, category or ISBN..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#151210] px-5 py-4 text-sm text-[#f5efe6] outline-none transition placeholder:text-[#5f5953] focus:border-[#c9a66b]/50"
                    />
                </div>
            </section>

            {/* BOOKS */}
            <section className="mx-auto max-w-7xl px-6 pb-24">
                {loading ? (
                    <div className="py-20 text-center text-sm tracking-widest text-[#c9a66b]">
                        OPENING THE LIBRARY...
                    </div>
                ) : filteredBooks.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-[#151210] px-6 py-20 text-center">
                        <p className="font-serif text-3xl">
                            No books found
                        </p>

                        <p className="mt-3 text-sm text-[#756e67]">
                            Try another search or add a new title to the
                            collection.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredBooks.map((book, index) => (
                            <BookCard
                                key={book._id}
                                book={book}
                                index={index}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

function BookCard({ book, index, onDelete }) {
    const coverThemes = [
        "from-[#3a211b] via-[#1c1210] to-[#0d0b0a]",
        "from-[#202d2b] via-[#121817] to-[#0d0b0a]",
        "from-[#30223a] via-[#17121d] to-[#0d0b0a]",
        "from-[#3a3020] via-[#1b1710] to-[#0d0b0a]",
    ];

    const coverTheme = coverThemes[index % coverThemes.length];

    return (
        <article className="group">
            {/* CLICKABLE BOOK */}
            <a href={`/books/${book._id}`} className="block">
                {/* COVER */}
                <div
                    className={`relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${coverTheme} shadow-2xl transition duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1deg] group-hover:border-[#c9a66b]/30`}
                >
                    {book.coverImage ? (
                        <>
                            {/* REAL BOOK COVER */}
                            <img
                                src={book.coverImage}
                                alt={`${book.title} cover`}
                                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    const fallback =
                                        e.currentTarget.parentElement.querySelector(
                                            ".cover-fallback"
                                        );

                                    if (fallback) {
                                        fallback.style.display = "flex";
                                    }
                                }}
                            />

                            {/* Dark overlay for premium look */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                        </>
                    ) : null}

                    {/* FALLBACK COVER */}
                    <div
                        className={`cover-fallback absolute inset-0 ${
                            book.coverImage ? "hidden" : "flex"
                        } flex-col justify-between p-5`}
                    >
                        <div className="flex h-full flex-col justify-between border border-[#c9a66b]/20 p-5">
                            <div>
                                <p className="text-[8px] uppercase tracking-[0.35em] text-[#c9a66b]">
                                    NOIRÉ EDITION
                                </p>

                                <div className="mt-5 h-px bg-[#c9a66b]/20" />
                            </div>

                            <div>
                                <h3 className="font-serif text-3xl leading-tight text-[#f5efe6]">
                                    {book.title}
                                </h3>

                                <p className="mt-3 text-xs text-[#a49a90]">
                                    {book.author}
                                </p>
                            </div>

                            <div className="flex items-end justify-between">
                                <span className="text-[8px] uppercase tracking-[0.25em] text-[#6e665f]">
                                    {book.category}
                                </span>

                                <span className="text-[9px] text-[#6e665f]">
                                    {book.publicationYear}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition duration-300 group-hover:bg-black/30 group-hover:opacity-100">
                        <span className="rounded-full border border-[#c9a66b]/50 bg-[#0d0b0a]/80 px-5 py-2 text-xs text-[#c9a66b] backdrop-blur-sm">
                            View Details →
                        </span>
                    </div>
                </div>
            </a>

            {/* INFO */}
            <div className="px-1 pt-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="font-serif text-xl">
                            {book.title}
                        </h3>

                        <p className="mt-1 text-sm text-[#756e67]">
                            {book.author}
                        </p>
                    </div>

                    <span
                        className={`mt-1 rounded-full px-3 py-1 text-[10px] ${
                            book.availableQuantity > 0
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-red-500/10 text-red-400"
                        }`}
                    >
                        {book.availableQuantity > 0
                            ? "Available"
                            : "Unavailable"}
                    </span>
                </div>

                <p className="mt-3 text-xs text-[#625c56]">
                    {book.availableQuantity} of {book.quantity} copies
                    available
                </p>

                {/* ACTIONS */}
                <div className="mt-4 flex gap-2">
                    <a
                        href={`/books/${book._id}`}
                        className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-center text-xs text-[#a69d94] transition hover:border-[#c9a66b]/30 hover:text-[#c9a66b]"
                    >
                        Details
                    </a>

                    <button
                        onClick={() => onDelete(book._id)}
                        className="rounded-lg border border-red-500/10 px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </article>
    );
}
