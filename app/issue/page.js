"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function IssueBookPage() {
    const router = useRouter();

    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);

    const [bookId, setBookId] = useState("");
    const [memberId, setMemberId] = useState("");

    const [loading, setLoading] = useState(true);
    const [issuing, setIssuing] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const [booksRes, membersRes] = await Promise.all([
                    fetch("/api/books"),
                    fetch("/api/members"),
                ]);

                const booksData = await booksRes.json();
                const membersData = await membersRes.json();

                if (booksData.success) {
                    setBooks(booksData.books);
                }

                if (membersData.success) {
                    setMembers(membersData.members);
                }
            } catch (error) {
                console.error("Load issue data error:", error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    async function handleIssue(e) {
        e.preventDefault();

        if (!bookId || !memberId) {
            alert("Please select a book and member.");
            return;
        }

        setIssuing(true);

        try {
            const res = await fetch("/api/transactions/issue", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bookId,
                    memberId,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Unable to issue book.");
                return;
            }

            alert("Book issued successfully!");
            router.push("/transactions");
        } catch (error) {
            console.error("Issue book error:", error);
            alert("Something went wrong.");
        } finally {
            setIssuing(false);
        }
    }

    const availableBooks = books.filter(
        (book) => book.availableQuantity > 0
    );

    return (
        <main className="min-h-screen bg-[#0d0b0a] px-6 py-12 text-[#f5efe6]">
            <div className="mx-auto max-w-3xl">

                <a
                    href="/books"
                    className="text-sm text-[#c9a66b] hover:underline"
                >
                    ← Back to Library
                </a>

                <div className="mt-10">
                    <p className="text-xs uppercase tracking-[0.4em] text-[#c9a66b]">
                        Circulation
                    </p>

                    <h1 className="mt-3 font-serif text-5xl">
                        Issue a Book
                    </h1>

                    <p className="mt-3 text-[#817970]">
                        Lend a book to one of the library members.
                    </p>
                </div>

                {loading ? (
                    <div className="mt-10 rounded-2xl border border-white/10 bg-[#151210] p-10 text-center text-[#817970]">
                        Loading library data...
                    </div>
                ) : (
                    <form
                        onSubmit={handleIssue}
                        className="mt-10 rounded-2xl border border-white/10 bg-[#151210] p-8"
                    >

                        {/* BOOK */}
                        <div>
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#9a9188]">
                                Select Book
                            </label>

                            <select
                                value={bookId}
                                onChange={(e) => setBookId(e.target.value)}
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-3 text-sm outline-none focus:border-[#c9a66b]/60"
                            >
                                <option value="">
                                    Choose a book
                                </option>

                                {availableBooks.map((book) => (
                                    <option
                                        key={book._id}
                                        value={book._id}
                                    >
                                        {book.title} — {book.availableQuantity} available
                                    </option>
                                ))}
                            </select>

                            {availableBooks.length === 0 && (
                                <p className="mt-2 text-xs text-red-400">
                                    No books are currently available.
                                </p>
                            )}
                        </div>

                        {/* MEMBER */}
                        <div className="mt-6">
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#9a9188]">
                                Select Member
                            </label>

                            <select
                                value={memberId}
                                onChange={(e) => setMemberId(e.target.value)}
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-3 text-sm outline-none focus:border-[#c9a66b]/60"
                            >
                                <option value="">
                                    Choose a member
                                </option>

                                {members.map((member) => (
                                    <option
                                        key={member._id}
                                        value={member._id}
                                    >
                                        {member.name} — {member.email}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={
                                issuing ||
                                availableBooks.length === 0 ||
                                members.length === 0
                            }
                            className="mt-8 w-full rounded-xl bg-[#8b3a45] px-6 py-4 text-sm font-medium transition hover:bg-[#6f2e38] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {issuing
                                ? "Issuing Book..."
                                : "Issue Book →"}
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
}