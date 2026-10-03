"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalBooks: 0,
        totalMembers: 0,
        issuedBooks: 0,
        returnedBooks: 0,
        availableBooks: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const res = await fetch("/api/dashboard");
                const data = await res.json();

                if (data.success) {
                    setStats(data.stats);
                }
            } catch (error) {
                console.error("Dashboard error:", error);
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    const cards = [
        {
            label: "Total Books",
            value: stats.totalBooks,
            description: "Books in library",
        },
        {
            label: "Available",
            value: stats.availableBooks,
            description: "Copies available",
        },
        {
            label: "Members",
            value: stats.totalMembers,
            description: "Registered readers",
        },
        {
            label: "Currently Issued",
            value: stats.issuedBooks,
            description: "Books outside library",
        },
        {
            label: "Returned",
            value: stats.returnedBooks,
            description: "Completed returns",
        },
    ];

    return (
        <main className="min-h-screen bg-[#0d0b0a] text-[#f5efe6]">

            {/* NAVBAR */}
            <nav className="border-b border-[#c9a66b]/15 px-6 py-5">
                <div className="mx-auto flex max-w-7xl items-center justify-between">

                    <div>
                        <h1 className="font-serif text-2xl tracking-[0.18em]">
                            NOIRÉ
                        </h1>

                        <p className="text-[9px] tracking-[0.35em] text-[#c9a66b]">
                            THE LIVING LIBRARY
                        </p>
                    </div>

                    <div className="hidden gap-8 text-sm text-[#b8afa4] md:flex">
                        <a
                            href="/dashboard"
                            className="text-[#f5efe6]"
                        >
                            Dashboard
                        </a>

                        <a
                            href="/books"
                            className="hover:text-white"
                        >
                            Library
                        </a>

                        <a
                            href="/members"
                            className="hover:text-white"
                        >
                            Members
                        </a>

                        <a
                            href="/transactions"
                            className="hover:text-white"
                        >
                            Transactions
                        </a>
                    </div>

                    <div className="rounded-full border border-[#c9a66b]/30 px-4 py-2 text-xs text-[#c9a66b]">
                        LIBRARIAN
                    </div>

                </div>
            </nav>

            {/* HEADER */}
            <section className="mx-auto max-w-7xl px-6 pb-12 pt-16">

                <p className="text-xs uppercase tracking-[0.4em] text-[#c9a66b]">
                    Library Overview
                </p>

                <h2 className="mt-4 font-serif text-5xl md:text-6xl">
                    Good evening, Librarian.
                </h2>

                <p className="mt-4 max-w-xl text-[#817970]">
                    A quiet overview of everything happening inside
                    your living library.
                </p>

            </section>

            {/* STATS */}
            <section className="mx-auto max-w-7xl px-6 pb-12">

                {loading ? (

                    <div className="py-20 text-center text-[#8d857d]">
                        Gathering library records...
                    </div>

                ) : (

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

                        {cards.map((card) => (

                            <div
                                key={card.label}
                                className="group rounded-2xl border border-white/10 bg-[#151210] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c9a66b]/30"
                            >

                                <p className="text-xs uppercase tracking-[0.18em] text-[#756e67]">
                                    {card.label}
                                </p>

                                <p className="mt-5 font-serif text-4xl text-[#c9a66b]">
                                    {card.value}
                                </p>

                                <p className="mt-2 text-xs text-[#665f58]">
                                    {card.description}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </section>

            {/* QUICK ACTIONS */}
            <section className="mx-auto max-w-7xl px-6 pb-24">

                <div className="mb-8">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#c9a66b]">
                        Quick Actions
                    </p>

                    <h3 className="mt-2 font-serif text-3xl">
                        Manage the Library
                    </h3>
                </div>

                <div className="grid gap-5 md:grid-cols-3">

                    <a
                        href="/books/add"
                        className="rounded-2xl border border-white/10 bg-[#151210] p-7 transition hover:-translate-y-1 hover:border-[#c9a66b]/30"
                    >
                        <span className="text-2xl">＋</span>

                        <h4 className="mt-5 font-serif text-2xl">
                            Add Book
                        </h4>

                        <p className="mt-2 text-sm text-[#756e67]">
                            Add a new title to the library collection.
                        </p>
                    </a>

                    <a
                        href="/members/add"
                        className="rounded-2xl border border-white/10 bg-[#151210] p-7 transition hover:-translate-y-1 hover:border-[#c9a66b]/30"
                    >
                        <span className="text-2xl">♙</span>

                        <h4 className="mt-5 font-serif text-2xl">
                            Add Member
                        </h4>

                        <p className="mt-2 text-sm text-[#756e67]">
                            Register a new reader in the library.
                        </p>
                    </a>

                    <a
                        href="/issue"
                        className="rounded-2xl border border-white/10 bg-[#151210] p-7 transition hover:-translate-y-1 hover:border-[#c9a66b]/30"
                    >
                        <span className="text-2xl">↗</span>

                        <h4 className="mt-5 font-serif text-2xl">
                            Issue Book
                        </h4>

                        <p className="mt-2 text-sm text-[#756e67]">
                            Lend an available book to a member.
                        </p>
                    </a>

                </div>

            </section>

        </main>
    );
}