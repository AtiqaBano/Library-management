"use client";

import { useEffect, useState } from "react";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    async function loadTransactions() {
        try {
            const res = await fetch("/api/transactions");
            const data = await res.json();

            if (data.success) {
                setTransactions(data.transactions);
            }
        } catch (error) {
            console.error("Transactions error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    async function handleReturn(id) {
        const confirmed = window.confirm(
            "Are you sure you want to return this book?"
        );

        if (!confirmed) return;

        try {
            const res = await fetch(`/api/transactions/${id}/return`, {
                method: "PUT",
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Unable to return book.");
                return;
            }

            alert("Book returned successfully!");
            loadTransactions();
        } catch (error) {
            console.error("Return book error:", error);
            alert("Something went wrong.");
        }
    }

    const filteredTransactions = transactions.filter((transaction) => {
        const bookTitle = transaction.bookId?.title || "";
        const memberName = transaction.memberId?.name || "";
        const status = transaction.status || "";

        return `${bookTitle} ${memberName} ${status}`
            .toLowerCase()
            .includes(search.toLowerCase());
    });

    const issuedCount = transactions.filter(
        (transaction) => transaction.status === "Issued"
    ).length;

    const returnedCount = transactions.filter(
        (transaction) => transaction.status === "Returned"
    ).length;

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
                            href="/books"
                            className="hover:text-white"
                        >
                            Library
                        </a>

                        <a
                            href="/dashboard"
                            className="hover:text-white"
                        >
                            Dashboard
                        </a>

                        <a
                            href="/members"
                            className="hover:text-white"
                        >
                            Members
                        </a>

                        <a
                            href="/transactions"
                            className="text-[#f5efe6]"
                        >
                            Transactions
                        </a>
                    </div>

                    <a
                        href="/issue"
                        className="rounded-full bg-[#8b3a45] px-5 py-2 text-xs transition hover:bg-[#6f2e38]"
                    >
                        + Issue Book
                    </a>

                </div>
            </nav>

            {/* HEADER */}
            <section className="mx-auto max-w-7xl px-6 pb-12 pt-16">

                <p className="text-xs uppercase tracking-[0.4em] text-[#c9a66b]">
                    Library Circulation
                </p>

                <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">

                    <div>
                        <h2 className="font-serif text-5xl md:text-6xl">
                            Transactions
                        </h2>

                        <p className="mt-4 max-w-xl text-[#817970]">
                            Track every book that leaves the library and
                            returns to its shelves.
                        </p>
                    </div>

                </div>

                {/* STATS */}
                <div className="mt-10 grid gap-4 md:grid-cols-3">

                    <div className="rounded-2xl border border-white/10 bg-[#151210] p-5">
                        <p className="text-xs uppercase tracking-wider text-[#756e67]">
                            Total
                        </p>

                        <p className="mt-2 font-serif text-3xl">
                            {transactions.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#151210] p-5">
                        <p className="text-xs uppercase tracking-wider text-[#756e67]">
                            Currently Issued
                        </p>

                        <p className="mt-2 font-serif text-3xl text-[#c9a66b]">
                            {issuedCount}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#151210] p-5">
                        <p className="text-xs uppercase tracking-wider text-[#756e67]">
                            Returned
                        </p>

                        <p className="mt-2 font-serif text-3xl text-emerald-400">
                            {returnedCount}
                        </p>
                    </div>

                </div>

                {/* SEARCH */}
                <div className="mt-8 max-w-xl">

                    <div className="flex items-center rounded-full border border-[#c9a66b]/20 bg-[#171311] px-5 py-4 focus-within:border-[#c9a66b]/60">

                        <span className="mr-3 text-[#c9a66b]">
                            ⌕
                        </span>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search book, member or status..."
                            className="w-full bg-transparent text-sm outline-none placeholder:text-[#665f58]"
                        />

                    </div>

                </div>

            </section>

            {/* TRANSACTIONS */}
            <section className="mx-auto max-w-7xl px-6 pb-24">

                {loading ? (

                    <div className="py-20 text-center text-[#8d857d]">
                        Opening transaction history...
                    </div>

                ) : filteredTransactions.length === 0 ? (

                    <div className="rounded-2xl border border-white/10 bg-[#151210] py-20 text-center">

                        <p className="font-serif text-2xl">
                            No transactions found
                        </p>

                        <p className="mt-2 text-sm text-[#756e67]">
                            Issue a book to create your first transaction.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-4">

                        {filteredTransactions.map((transaction) => (

                            <article
                                key={transaction._id}
                                className="rounded-2xl border border-white/10 bg-[#151210] p-6 transition hover:border-[#c9a66b]/30"
                            >

                                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

                                    {/* BOOK INFO */}
                                    <div className="flex-1">

                                        <p className="text-xs uppercase tracking-[0.25em] text-[#c9a66b]">
                                            Book
                                        </p>

                                        <h3 className="mt-2 font-serif text-2xl">
                                            {transaction.bookId?.title ||
                                                "Unknown Book"}
                                        </h3>

                                        <p className="mt-1 text-sm text-[#817970]">
                                            by{" "}
                                            {transaction.bookId?.author ||
                                                "Unknown Author"}
                                        </p>

                                    </div>

                                    {/* MEMBER */}
                                    <div className="flex-1">

                                        <p className="text-xs uppercase tracking-[0.25em] text-[#c9a66b]">
                                            Member
                                        </p>

                                        <p className="mt-2 text-lg">
                                            {transaction.memberId?.name ||
                                                "Unknown Member"}
                                        </p>

                                        <p className="mt-1 text-sm text-[#817970]">
                                            {transaction.memberId?.email || ""}
                                        </p>

                                    </div>

                                    {/* DATES */}
                                    <div className="flex-1">

                                        <p className="text-xs uppercase tracking-[0.25em] text-[#c9a66b]">
                                            Dates
                                        </p>

                                        <p className="mt-2 text-sm">
                                            Issued:{" "}
                                            {new Date(
                                                transaction.issueDate
                                            ).toLocaleDateString()}
                                        </p>

                                        <p className="mt-1 text-sm text-[#817970]">
                                            Returned:{" "}
                                            {transaction.returnDate
                                                ? new Date(
                                                      transaction.returnDate
                                                  ).toLocaleDateString()
                                                : "—"}
                                        </p>

                                    </div>

                                    {/* STATUS + ACTION */}
                                    <div className="flex flex-col items-start gap-3 md:items-end">

                                        <span
                                            className={`rounded-full border px-4 py-2 text-xs ${
                                                transaction.status === "Issued"
                                                    ? "border-[#c9a66b]/30 text-[#c9a66b]"
                                                    : "border-emerald-900/40 text-emerald-400"
                                            }`}
                                        >
                                            {transaction.status}
                                        </span>

                                        {transaction.status === "Issued" && (
                                            <button
                                                onClick={() =>
                                                    handleReturn(
                                                        transaction._id
                                                    )
                                                }
                                                className="rounded-lg border border-[#c9a66b]/20 px-4 py-2 text-xs text-[#c9a66b] transition hover:bg-[#c9a66b]/10"
                                            >
                                                Return Book
                                            </button>
                                        )}

                                    </div>

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </section>

        </main>
    );
}