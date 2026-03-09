export default function About() {
  const rows = [
    ["Status", "Junior — May 2027"],
    ["Degree", "B.S. CS & History"],
    ["Current Role", "Student @ Università di Bologna"],
    ["Next Up", "Internship this summer"],
    [
      "Leetcode",
      <a
        href="https://leetcode.com/u/alexmli/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#a04632] hover:opacity-80"
      >
        alexmli →
      </a>,
    ],
    [
      "GitHub",
      <a
        href="https://github.com/alexmli23"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#a04632] hover:opacity-80"
      >
        alexmli23 →
      </a>,
    ],
  ];

  return (
    <section id="about" className="bg-[#F5F5F5] py-14 sm:py-20">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* header */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mb-2">
          <span className="font-mono text-xs sm:text-sm text-gray-500">
            Entry 001 — About
          </span>

          <span className="font-mono text-xs sm:text-sm text-gray-500">
            UW–Madison, Class of 2027
          </span>
        </div>

        <hr className="border-t-[3px] border-gray-300 mb-8 sm:mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* left column */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Software Enginner,
              <br />
              <span className="italic text-[#a04632]">
                studying History
              </span>
            </h2>
            <h3 className="text-lg sm:text-xl lg:text-2xl leading-tight mb-5 font-bold sm:mb-6">
                Prev. MKS, Wisconsin Athletics
            </h3>

            <p className="text-base sm:text-lg leading-relaxed text-[#3a3028]">
              I'm a junior at UW–Madison double majoring in Computer Science
              and History. I'm currently an exchange student @{" "}
              <a
                href="https://www.unibo.it/en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a04632] border-b border-[#a04632] hover:opacity-80"
              >
                University of Bologna
              </a>
              . Outside of work I enjoy working on projects, working out,
              reading, and doomscrolling!
            </p>
          </div>

          {/* info table */}
          <div className="border border-gray-300 p-4 sm:p-6">
            {rows.map(([label, value], index) => (
              <div
                key={index}
                className={`flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 py-3 ${
                  index !== rows.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <span className="text-xs text-gray-500 font-mono shrink-0">
                  {label}
                </span>

                <span className="text-left sm:text-right break-words">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}