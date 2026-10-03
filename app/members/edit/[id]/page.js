"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditMemberPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    membershipDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) loadMember();
  }, [id]);

  async function loadMember() {
    try {
      const res = await fetch(`/api/members/${id}`);
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Member not found.");
        return;
      }

      const member = data.member;

      setForm({
        name: member.name,
        email: member.email,
        phone: member.phone,
        address: member.address,
        membershipDate: member.membershipDate
          ? new Date(member.membershipDate).toISOString().split("T")[0]
          : "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Unable to load member.");
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
      const res = await fetch(`/api/members/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Unable to update member.");
        return;
      }

      setMessage("Member updated successfully.");

      setTimeout(() => {
        router.push("/members");
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
        Opening member details...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0b0a] px-6 py-10 text-[#f5efe6]">
      <div className="mx-auto max-w-4xl">

        <button
          onClick={() => router.push("/members")}
          className="mb-10 text-sm text-[#9b9288] transition hover:text-[#c9a66b]"
        >
          ← Back to Members
        </button>

        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.4em] text-[#c9a66b]">
            Library Community
          </p>

          <h1 className="mt-3 font-serif text-5xl">
            Edit member
          </h1>

          <p className="mt-3 text-[#817970]">
            Update this member's information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#c9a66b]/15 bg-[#151210] p-7 shadow-2xl md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2">

            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <Input
              label="Membership Date"
              name="membershipDate"
              type="date"
              value={form.membershipDate}
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#a69c91]">
                Address
              </label>

              <textarea
                required
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={4}
                className="w-full resize-none rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-4 text-sm text-white outline-none transition focus:border-[#c9a66b]/60"
              />
            </div>

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
        className="w-full rounded-xl border border-white/10 bg-[#0d0b0a] px-4 py-4 text-sm text-white outline-none transition placeholder:text-[#4f4944] focus:border-[#c9a66b]/60"
      />
    </div>
  );
}