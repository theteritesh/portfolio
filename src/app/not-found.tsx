import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 font-mono text-on-surface">
      <div className="w-full max-w-xl rounded-lg bg-surface-container border border-outline-variant shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-2 text-[12px] text-on-surface-variant">
              bash — 404 Not Found
            </span>
          </div>
          <span className="text-[11px] text-outline">git status: fatal</span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 flex flex-col gap-4 text-[13px] leading-relaxed">
          <div className="flex items-center gap-2 text-primary">
            <span>ritesh@developer:~/portfolio$</span>
            <span className="text-on-surface">git checkout current-path</span>
          </div>

          <div className="text-error flex flex-col gap-1">
            <p className="font-bold">
              error: pathspec did not match any files known to git.
            </p>
            <p className="text-on-surface-variant text-[12px]">
              fatal: page not found (404). The requested commit or route does not exist on this remote.
            </p>
          </div>

          <div className="my-2 p-3 rounded bg-surface-container-lowest border border-outline-variant/60 text-outline text-[12px] space-y-1">
            <p># Available branches in this repository:</p>
            <p className="text-primary">* origin/main (Active Production)</p>
            <p className="text-tertiary">  origin/projects</p>
            <p className="text-tertiary">  origin/about</p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-primary-container text-on-primary-container hover:bg-[#2ea043] font-semibold text-[13px] transition-all shadow-md active:scale-95"
            >
              <span>$</span>
              <span>git checkout origin/main</span>
              <span className="text-[16px]">↵</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
