"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BookDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        async function loadBook() {
            try {
                const res = await fetch(`/api/books/${params.id}`);
                const data = await res.json();

                if (data.success) {
                    setBook(data.book);
                } else {
                    alert(data.message || "Book not found.");
                    router.push("/books");
                }
            } catch (error) {
                console.error("Book details error:", error);
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

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#0d0b0a] text-[#f5efe6]">
                <p className="text-sm tracking-widest text-[#c9a66b]">
                    OPENING THE BOOK...
                </p>
            </main>
        );
    }

    if (!book) {
        return null;
    }

    const availability =
        book.availableQuantity > 0
            ? "Available"
            : "Currently Unavailable";

    const showRealCover = book.coverImage && !imageError;

    return (
        <main className="min-h-screen bg-[#0d0b0a] text-[#f5efe6]">

            {/* Navigation */}
            <nav className="border-b border-white/10 px-6 py-5">
                <div className="mx-auto flex max-w-6xl items-center justify-between">

                    <a href="/books">
                        <h1 className="font-serif text-2xl tracking-[0.18em]">
                            NOIRÉ
                        </h1>

                        <p className="text-[9px] tracking-[0.35em] text-[#c9a66b]">
                            THE LIVING LIBRARY
                        </p>
                    </a>

                    <a
                        href="/books"
                        className="text-sm text-[#a69d94] transition hover:text-[#c9a66b]"
                    >
                        ← Back to Library
                    </a>

                </div>
            </nav>

            {/* Details */}
            <section className="mx-auto max-w-6xl px-6 py-16">

                <div className="grid gap-12 md:grid-cols-[320px_1fr] md:items-center">

                    {/* BOOK COVER */}
                    <div className="mx-auto w-full max-w-[300px]">

                        <div className="group relative aspect-[2/3] overflow-hidden rounded-2xl border border-[#c9a66b]/20 bg-gradient-to-br from-[#38231d] via-[#17110f] to-[#0d0b0a] shadow-2xl transition duration-500 hover:-translate-y-2 hover:rotate-[-2deg]">

                            {showRealCover ? (
                                <>
                                    {/* REAL COVER */}
                                    <img
                                        src={book.coverImage}
                                        alt={`${book.title} book cover`}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                        onError={() => setImageError(true)}
                                    />

                                    {/* Premium overlay */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                                </>
                            ) : (
                                /* FALLBACK COVER */
                                <div className="flex h-full flex-col justify-between p-8">

                                    <div className="flex h-full flex-col justify-between border border-[#c9a66b]/20 p-6">

                                        <div>
                                            <p className="text-[9px] uppercase tracking-[0.4em] text-[#c9a66b]">
                                                NOIRÉ EDITION
                                            </p>

                                            <div className="mt-8 h-px bg-[#c9a66b]/30" />
                                        </div>

                                        <div>
                                            <h2 className="font-serif text-4xl leading-tight">
                                                {book.title}
                                            </h2>

                                            <p className="mt-4 text-sm text-[#a69d94]">
                                                {book.author}
                                            </p>
                                        </div>

                                        <p className="text-[9px] uppercase tracking-[0.3em] text-[#756e67]">
                                            The Living Library
                                        </p>

                                    </div>

                                </div>
                            )}

                            {/* Hover label */}
                            {showRealCover && (
                                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 px-5 py-4 text-center text-xs text-[#c9a66b] backdrop-blur-sm transition duration-300 group-hover:translate-y-0">
                                    {book.title}
                                </div>
                            )}

                        </div>
                    </div>

                    {/* INFORMATION */}
                    <div>

                        <p className="text-xs uppercase tracking-[0.4em] text-[#c9a66b]">
                            Book Details
                        </p>

                        <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
                            {book.title}
                        </h2>

                        <p className="mt-4 text-lg text-[#9b9289]">
                            by {book.author}
                        </p>

                        <div className="mt-8 h-px bg-white/10" />

                        {/* DETAILS GRID */}
                        <div className="mt-8 grid gap-6 sm:grid-cols-2">

                            <div>
                                <p className="text-xs uppercase tracking-wider text-[#756e67]">
                                    Category
                                </p>

                                <p className="mt-2 text-base">
                                    {book.category}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-[#756e67]">
                                    ISBN
                                </p>

                                <p className="mt-2 text-base">
                                    {book.isbn}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-[#756e67]">
                                    Publication Year
                                </p>

                                <p className="mt-2 text-base">
                                    {book.publicationYear}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wider text-[#756e67]">
                                    Total Copies
                                </p>

                                <p className="mt-2 text-base">
                                    {book.quantity}
                                </p>
                            </div>

                        </div>

                        {/* AVAILABILITY */}
                        <div className="mt-10 rounded-2xl border border-white/10 bg-[#151210] p-6">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[#756e67]">
                                        Availability
                                    </p>

                                    <p className="mt-2 font-serif text-2xl">
                                        {availability}
                                    </p>
                                </div>

                                <div
                                    className={`rounded-full px-4 py-2 text-xs ${
                                        book.availableQuantity > 0
                                            ? "bg-emerald-500/10 text-emerald-400"
                                            : "bg-red-500/10 text-red-400"
                                    }`}
                                >
                                    {book.availableQuantity} copies available
                                </div>

                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-8 flex flex-wrap gap-4">

                            <button
                                onClick={() =>
                                    router.push(
                                        `/books/edit/${book._id}`
                                    )
                                }
                                className="rounded-xl bg-[#8b3a45] px-6 py-3 text-sm font-medium transition hover:bg-[#6f2e38]"
                            >
                                Edit Book
                            </button>

                            {book.availableQuantity > 0 && (
                                <button
                                    onClick={() => router.push("/issue")}
                                    className="rounded-xl border border-[#c9a66b]/30 px-6 py-3 text-sm text-[#c9a66b] transition hover:bg-[#c9a66b]/10"
                                >
                                    Issue This Book →
                                </button>
                            )}

                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
