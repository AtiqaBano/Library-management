"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMemberPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        membershipDate: "",
    });

    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/members", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Unable to add member.");
                return;
            }

            alert("Member added successfully!");
            router.push("/members");
        } catch (error) {
            console.error("Add member error:", error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#0d0b0a] px-6 py-12 text-[#f5efe6]">
            <div className="mx-auto max-w-3xl">

                <a
                    href="/members"
                    className="text-sm text-[#c9a66b] hover:underline"
                >
                    ← Back to Members
                </a>

                <div className="mt-10">
                    <p className="text-xs uppercase tracking-[0.4em] text-[#c9a66b]">
                        Library Community
                    </p>

                    <h1 className="mt-3 font-serif text-5xl">
                        Add New Member
                    </h1>

                    <p className="mt-3 text-[#817970]">
                        Register a new reader in the NOIRÉ library.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 rounded-2xl border border-white/10 bg-[#151210] p-8"
                >

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#9a9188]">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter member name"
                                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-3 text-sm outline-none focus:border-[#c9a66b]/60"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#9a9188]">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder="member@email.com"
                                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-3 text-sm outline-none focus:border-[#c9a66b]/60"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#9a9188]">
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                placeholder="03XX-XXXXXXX"
                                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-3 text-sm outline-none focus:border-[#c9a66b]/60"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#9a9188]">
                                Membership Date
                            </label>

                            <input
                                type="date"
                                name="membershipDate"
                                value={form.membershipDate}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-3 text-sm outline-none focus:border-[#c9a66b]/60"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#9a9188]">
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                required
                                rows={4}
                                placeholder="Enter member address"
                                className="w-full resize-none rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-3 text-sm outline-none focus:border-[#c9a66b]/60"
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-8 w-full rounded-xl bg-[#8b3a45] px-6 py-4 text-sm font-medium transition hover:bg-[#6f2e38] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Adding Member..." : "Add Member →"}
                    </button>

                </form>
            </div>
        </main>
    );
}