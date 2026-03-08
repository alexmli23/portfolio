export default function Projects() {
  const projects = [
    {
      num: "01",
      title: "This Site",
      tags: ["Next.js", "Framer Motion", "Tailwind"],
      desc: "Personal portfolio with scroll animations and a Constable painting. Hoping to add history writeups soon.",
      status: "In Progress",
    },
    {
      num: "02",
      title: "Song word count Game",
      tags: ["Full-Stack", "Desktop + Mobile"],
      desc: "Game to count the number of words in a song in a certain amount of time",
      status: "In Progress",
    },
    {
      num: "03",
      title: "The Orange Opinon",
      tags: ["Full-Stack","Next.js", "Node.js", "Express.js"],
      desc: "Social media app that has different questions on different topics each day",
      status: "Completed",
    }
  ];

  return (
    <section className="bg-[#F5F5F5] py-16">
      <div className="max-w-[1100px] mx-auto px-10">

        {/* header */}
        <span className="font-mono text-xs tracking-widest text-gray-500">
          Entry 002 — Current Work
        </span>

        <hr className="border-t-[3px] border-gray-300 mt-2 mb-12" />

        {/* project grid */}
        <div className="grid md:grid-cols-2 gap-6">

          {projects.map((project) => (
            <div
              key={project.num}
              className="border border-gray-300 p-8 hover:shadow-sm transition"
            >
              {/* top row */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[0.65rem] tracking-widest text-gray-500">
                  PROJECT {project.num}
                </span>

                <span className="font-mono text-[0.6rem] tracking-widest bg-[#a04632] text-white px-2 py-[2px]">
                  {project.status.toUpperCase()}
                </span>
              </div>

              {/* title */}
              <h3 className="text-2xl font-bold mb-2">
                {project.title}
              </h3>

              {/* description */}
              <p className="text-sm leading-relaxed text-[#3a3028] mb-5">
                {project.desc}
              </p>

              {/* tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.6rem] tracking-widest border border-gray-300 px-2 py-[2px] text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}