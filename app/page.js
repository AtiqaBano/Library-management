import Link from "next/link";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-[#0d0b0a] text-[#f5efe6]">

            {/* NAVBAR */}
            <nav className="border-b border-white/10 bg-[#0d0b0a]/95">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a66b]/40 text-[#c9a66b]">
                            ✦
                        </div>

                        <div>
                            <h1 className="font-serif text-2xl tracking-wide">
                                NOIRÉ
                            </h1>
                            <p className="text-[9px] uppercase tracking-[0.35em] text-[#8d8174]">
                                The Living Library
                            </p>
                        </div>
                    </Link>

                    <div className="hidden items-center gap-8 text-sm text-[#b9aea1] md:flex">
                        <Link href="/" className="text-[#c9a66b]">
                            Home
                        </Link>

                        <Link
                            href="/books"
                            className="transition hover:text-[#c9a66b]"
                        >
                            Library
                        </Link>

                        <Link
                            href="/members"
                            className="transition hover:text-[#c9a66b]"
                        >
                            Members
                        </Link>

                        <Link
                            href="/transactions"
                            className="transition hover:text-[#c9a66b]"
                        >
                            Transactions
                        </Link>

                        <Link
                            href="/dashboard"
                            className="transition hover:text-[#c9a66b]"
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section className="relative overflow-hidden">

                <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#8b3a45]/10 blur-3xl" />
                <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#c9a66b]/5 blur-3xl" />

                <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">

                    {/* LEFT */}
                    <div className="relative z-10">

                        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#c9a66b]">
                            Welcome to NOIRÉ
                        </p>

                        <h2 className="font-serif text-6xl leading-[0.95] md:text-8xl">
                            Where every
                            <span className="block italic text-[#c9a66b]">
                                story lives.
                            </span>
                        </h2>

                        <p className="mt-8 max-w-xl text-lg leading-8 text-[#a89d91]">
                            A modern library management experience designed
                            to bring books, readers and stories together in
                            one elegant space.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">

                            <Link
                                href="/books"
                                className="rounded-full bg-[#8b3a45] px-7 py-4 text-sm font-semibold tracking-wide transition hover:bg-[#6f2e38] hover:-translate-y-0.5"
                            >
                                Explore Library →
                            </Link>

                            <Link
                                href="/dashboard"
                                className="rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-[#d8cec2] transition hover:border-[#c9a66b]/50 hover:text-[#c9a66b]"
                            >
                                Open Dashboard
                            </Link>

                        </div>

                    </div>

                    {/* RIGHT BOOK VISUAL */}
                    <div className="relative mx-auto h-[480px] w-full max-w-md">

                        {/* BACK BOOK */}
                        <div className="absolute right-8 top-8 h-[390px] w-[250px] rotate-[8deg] rounded-lg border border-white/10 bg-[#241b17] shadow-2xl">
                            <div className="absolute inset-5 border border-[#c9a66b]/20" />

                            <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                                <p className="text-[9px] uppercase tracking-[0.4em] text-[#8d8174]">
                                    Volume II
                                </p>

                                <div className="my-5 h-px w-12 bg-[#c9a66b]/40" />

                                <h3 className="font-serif text-4xl text-[#d5b77d]">
                                    Stories
                                </h3>
                            </div>
                        </div>

                        {/* FRONT BOOK */}
                        <div className="absolute left-8 top-14 h-[410px] w-[270px] -rotate-[5deg] rounded-lg border border-[#c9a66b]/20 bg-gradient-to-br from-[#3a211d] via-[#211514] to-[#120d0c] shadow-[20px_25px_60px_rgba(0,0,0,0.6)]">

                            <div className="absolute inset-5 border border-[#c9a66b]/30" />

                            <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">

                                <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a66b]">
                                    The Living Library
                                </p>

                                <div className="my-8 text-5xl text-[#c9a66b]">
                                    ✦
                                </div>

                                <h3 className="font-serif text-5xl">
                                    NOIRÉ
                                </h3>

                                <p className="mt-4 text-[10px] uppercase tracking-[0.35em] text-[#8d8174]">
                                    Every book has a story
                                </p>

                            </div>
                        </div>

                        {/* DECORATIVE CIRCLE */}
                        <div className="absolute -bottom-4 right-2 flex h-24 w-24 items-center justify-center rounded-full border border-[#c9a66b]/30 bg-[#151210]/80 backdrop-blur">
                            <span className="text-center text-[9px] uppercase tracking-[0.25em] text-[#c9a66b]">
                                Read
                                <br />
                                Discover
                                <br />
                                Remember
                            </span>
                        </div>

                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="border-t border-white/10 bg-[#110e0c]">
                <div className="mx-auto max-w-7xl px-6 py-20">

                    <div className="mb-12 max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.4em] text-[#c9a66b]">
                            Everything in one place
                        </p>

                        <h2 className="mt-4 font-serif text-4xl md:text-5xl">
                            Built for a living library.
                        </h2>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">

                        <FeatureCard
                            number="01"
                            title="Curated Library"
                            description="Manage books, categories, authors, ISBNs and availability with ease."
                            href="/books"
                        />

                        <FeatureCard
                            number="02"
                            title="Member Directory"
                            description="Keep your library members organized with a clean searchable directory."
                            href="/members"
                        />

                        <FeatureCard
                            number="03"
                            title="Issue & Return"
                            description="Track borrowed books and automatically update availability."
                            href="/transactions"
                        />

                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/10 px-6 py-8">
                <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs text-[#756b61] md:flex-row">
                    <p>
                        © 2026 NOIRÉ — The Living Library
                    </p>

                    <p className="uppercase tracking-[0.25em]">
                        Built with Next.js & MongoDB
                    </p>
                </div>
            </footer>

        </main>
    );
}

function FeatureCard({ number, title, description, href }) {
    return (
        <Link
            href={href}
            className="group rounded-2xl border border-white/10 bg-[#151210] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#c9a66b]/30"
        >
            <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.3em] text-[#c9a66b]">
                    {number}
                </span>

                <span className="text-xl text-[#756b61] transition group-hover:text-[#c9a66b]">
                    ↗
                </span>
            </div>

            <h3 className="mt-12 font-serif text-3xl">
                {title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#8f857a]">
                {description}
            </p>
        </Link>
    );
}