export default function About() {
  const rows = [
    ["Status", "Junior — May 2027"],
    ["Degree", "B.S. CS & History"],
    ["Current Role", "Student @ Università di Bologna"],
    ["Next Up", "Internship @ ?"],
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
    <section id="about" className="bg-[#F5F5F5] py-20">
      <div className="max-w-[1100px] mx-auto px-10">

        {/* header */}
        <div className="flex justify-between mb-2">
          <span className="font-mono text-sm text-gray-500">
            Entry 001 — About
          </span>

          <span className="font-mono text-sm text-gray-500">
            UW–Madison, Class of 2027
          </span>
        </div>

        <hr className="border-t-[3px] border-gray-300 mb-12" />

        <div className="grid grid-cols-2 gap-16">

          {/* left column */}
          <div>
            <h2 className="text-5xl font-bold leading-tight mb-6">
              Code, history,
              <br />
              <span className="italic text-[#a04632]">
                and everything between.
              </span>
            </h2>

            <p className="text-lg leading-relaxed text-[#3a3028]">
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
              . Outside of work I enjoy working on projects, working out, reading, and doomscrolling!
            </p>
          </div>

          {/* info table */}
          <div className="border border-gray-300 p-6">
            {rows.map(([label, value], index) => (
              <div
                key={index}
                className={`flex justify-between py-2 ${
                  index !== rows.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <span className="text-xs text-gray-500 font-mono">
                  {label}
                </span>

                <span className="text-right">{value}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}