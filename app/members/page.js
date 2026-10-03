"use client";

import { useEffect, useState } from "react";

export default function MembersPage() {
    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    async function loadMembers() {
        try {
            const res = await fetch("/api/members");
            const data = await res.json();

            if (data.success) {
                setMembers(data.members);
            }
        } catch (error) {
            console.error("Members error:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this member?"
        );

        if (!confirmed) return;

        try {
            const res = await fetch(`/api/members/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Unable to delete member.");
                return;
            }

            setMembers((currentMembers) =>
                currentMembers.filter((member) => member._id !== id)
            );
        } catch (error) {
            console.error("Delete member error:", error);
            alert("Something went wrong.");
        }
    }

    useEffect(() => {
        loadMembers();
    }, []);

    const filteredMembers = members.filter((member) =>
        `${member.name} ${member.email} ${member.phone} ${member.address}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-[#0d0b0a] text-[#f5efe6]">

            {/* NAVBAR */}
            <nav className="border-b border-[#c9a66b]/15 px-6 py-5">
                <div className="mx-auto flex max-w-7xl items-center justify-between">

                    <a href="/dashboard" className="group">
                        <h1 className="font-serif text-2xl tracking-[0.18em] transition group-hover:text-[#c9a66b]">
                            NOIRÉ
                        </h1>

                        <p className="text-[9px] tracking-[0.35em] text-[#c9a66b]">
                            THE LIVING LIBRARY
                        </p>
                    </a>

                    <div className="hidden items-center gap-8 text-sm text-[#9c938a] md:flex">

                        <a
                            href="/dashboard"
                            className="transition hover:text-white"
                        >
                            Dashboard
                        </a>

                        <a
                            href="/books"
                            className="transition hover:text-white"
                        >
                            Library
                        </a>

                        <a
                            href="/members"
                            className="text-[#f5efe6]"
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

                    <span className="rounded-full border border-[#c9a66b]/30 px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-[#c9a66b]">
                        Librarian
                    </span>

                </div>
            </nav>

            {/* HEADER */}
            <section className="mx-auto max-w-7xl px-6 pb-12 pt-16">

                <p className="text-xs uppercase tracking-[0.4em] text-[#c9a66b]">
                    Library Community
                </p>

                <div className="mt-4 flex flex-col justify-between gap-8 md:flex-row md:items-end">

                    <div>
                        <h2 className="font-serif text-5xl md:text-6xl">
                            Our Members
                        </h2>

                        <p className="mt-4 max-w-xl leading-relaxed text-[#817970]">
                            Manage readers, memberships, and the people who
                            bring these stories to life.
                        </p>
                    </div>

                    <a
                        href="/members/add"
                        className="w-fit rounded-full bg-[#8b3a45] px-6 py-3 text-xs font-medium transition duration-300 hover:-translate-y-0.5 hover:bg-[#6f2e38]"
                    >
                        + Add Member
                    </a>

                </div>

                {/* QUICK STATS */}
                <div className="mt-10 grid gap-4 sm:grid-cols-3">

                    <Stat
                        label="Total Members"
                        value={members.length}
                    />

                    <Stat
                        label="Search Results"
                        value={filteredMembers.length}
                    />

                    <Stat
                        label="Directory Status"
                        value="Active"
                    />

                </div>

                {/* SEARCH */}
                <div className="mt-10 max-w-2xl">

                    <div className="flex items-center rounded-2xl border border-[#c9a66b]/20 bg-[#171311] px-5 py-4 transition focus-within:border-[#c9a66b]/60">

                        <span className="mr-3 text-lg text-[#c9a66b]">
                            ⌕
                        </span>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, email, phone or address..."
                            className="w-full bg-transparent text-sm outline-none placeholder:text-[#665f58]"
                        />

                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="text-xs text-[#756e67] transition hover:text-[#c9a66b]"
                            >
                                Clear
                            </button>
                        )}

                    </div>
                </div>
            </section>

            {/* MEMBERS */}
            <section className="mx-auto max-w-7xl px-6 pb-24">

                <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-5">

                    <div>
                        <p className="text-xs tracking-[0.3em] text-[#c9a66b]">
                            DIRECTORY
                        </p>

                        <h3 className="mt-2 font-serif text-3xl">
                            Registered Members
                        </h3>
                    </div>

                    <p className="text-sm text-[#756e67]">
                        {filteredMembers.length}{" "}
                        {filteredMembers.length === 1
                            ? "member"
                            : "members"}
                    </p>

                </div>

                {loading ? (
                    <div className="py-20 text-center">

                        <p className="text-sm tracking-[0.25em] text-[#c9a66b]">
                            OPENING DIRECTORY...
                        </p>

                    </div>
                ) : filteredMembers.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-[#151210] px-6 py-20 text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#c9a66b]/20 bg-[#c9a66b]/5 text-2xl text-[#c9a66b]">
                            ♡
                        </div>

                        <p className="mt-6 font-serif text-3xl">
                            No members found
                        </p>

                        <p className="mx-auto mt-3 max-w-md text-sm text-[#756e67]">
                            {search
                                ? "No member matches your search. Try a different name, email or phone number."
                                : "Your library directory is empty. Add your first member to begin."}
                        </p>

                        {!search && (
                            <a
                                href="/members/add"
                                className="mt-6 inline-block rounded-full bg-[#8b3a45] px-6 py-3 text-xs transition hover:bg-[#6f2e38]"
                            >
                                + Add First Member
                            </a>
                        )}

                    </div>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {filteredMembers.map((member, index) => (
                            <MemberCard
                                key={member._id}
                                member={member}
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

function Stat({ label, value }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#151210] p-5 transition duration-300 hover:border-[#c9a66b]/20">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#756e67]">
                {label}
            </p>

            <p className="mt-3 font-serif text-3xl text-[#f5efe6]">
                {value}
            </p>
        </div>
    );
}

function MemberCard({ member, index, onDelete }) {
    const initials = member.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <article
            className="group rounded-2xl border border-white/10 bg-[#151210] p-6 transition duration-500 hover:-translate-y-1 hover:border-[#c9a66b]/30 hover:shadow-2xl"
            style={{
                animationDelay: `${index * 80}ms`,
            }}
        >
            {/* TOP */}
            <div className="flex items-start justify-between">

                <div className="relative">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a66b]/25 bg-[#c9a66b]/5 font-serif text-xl text-[#c9a66b] transition duration-300 group-hover:border-[#c9a66b]/50 group-hover:bg-[#c9a66b]/10">
                        {initials}
                    </div>

                    <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#151210] bg-emerald-400" />

                </div>

                <span className="rounded-full border border-emerald-900/40 px-3 py-1 text-[10px] uppercase tracking-wider text-emerald-400">
                    Active
                </span>

            </div>

            {/* NAME */}
            <h4 className="mt-6 font-serif text-2xl transition group-hover:text-[#c9a66b]">
                {member.name}
            </h4>

            <p className="mt-2 truncate text-sm text-[#817970]">
                {member.email}
            </p>

            {/* DETAILS */}
            <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-xs text-[#756e67]">

                <p className="flex gap-2">
                    <span className="text-[#c9a66b]">☎</span>
                    <span>{member.phone}</span>
                </p>

                <p className="flex gap-2">
                    <span className="text-[#c9a66b]">⌂</span>
                    <span className="line-clamp-2">
                        {member.address}
                    </span>
                </p>

                <p className="flex gap-2">
                    <span className="text-[#c9a66b]">✦</span>
                    <span>
                        Member since{" "}
                        {new Date(
                            member.membershipDate
                        ).toLocaleDateString()}
                    </span>
                </p>

            </div>

            {/* ACTIONS */}
            <div className="mt-5 flex gap-2">

                <a
                    href={`/members/edit/${member._id}`}
                    className="flex-1 rounded-lg border border-[#c9a66b]/20 px-3 py-2.5 text-center text-xs text-[#c9a66b] transition hover:bg-[#c9a66b]/10"
                >
                    Edit Member
                </a>

                <button
                    onClick={() => onDelete(member._id)}
                    className="rounded-lg border border-red-900/40 px-4 py-2.5 text-xs text-red-400 transition hover:bg-red-950/30"
                >
                    Delete
                </button>

            </div>
        </article>
    );
}
