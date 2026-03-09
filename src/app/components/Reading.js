function Reading() {
  const readingList = [
    {
      status: "Currently Reading",
      title: "Count of Monte Cristo",
      author: "Alexandre Dumas",
      link: "https://www.goodreads.com/book/show/7126.The_Count_of_Monte_Cristo?from_search=true&from_srp=true&qid=AJ57tdxO7C&rank=1",
    },
    {
      status: "Just Finished",
      title: "Guns, Germs, and Steel: The Fates of Human Societies",
      author: "Jared Diamond",
      link: "https://www.goodreads.com/book/show/1842.Guns_Germs_and_Steel",
    },
  ];

  return (
    <section className="bg-[#1A1510] text-[#F2EDE4] py-20">
      <div className="max-w-[1100px] mx-auto px-10">
        
        {/* header */}
        <span className="font-mono text-[0.65rem] tracking-widest text-[#C8BFB0]/50">
          Entry 003 — Reading Log
        </span>

        <hr className="border-t-2 border-[#F2EDE4] mt-3 mb-12" />

        <div className="grid grid-cols-2 gap-16">

          {/* quote */}
          <div>
            <h2 className="italic text-[clamp(2rem,3.5vw,3rem)] font-light mb-8 text-[#F2EDE4]/90">
              I like to read sometimes
            </h2>

            <a
              href="https://www.goodreads.com/user/show/173556087-alex-li"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest text-yellow-400 border-b border-yellow-400 pb-1 hover:opacity-80"
            >
              GOODREADS →
            </a>
          </div>

          {/* books */}
          <div>
            {readingList.map((book, index) => (
              <a
                key={index}
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block py-6 ${
                  index !== readingList.length - 1
                    ? "border-b border-[#F2EDE4]/20"
                    : ""
                } hover:opacity-80 transition`}
              >
                <span className="block font-mono text-[0.65rem] tracking-widest text-yellow-400 mb-1">
                  {book.status}
                </span>

                <span className="block text-2xl font-semibold text-[#F2EDE4]">
                  {book.title}
                </span>

                <span className="block text-sm italic text-[#F2EDE4]/70">
                  {book.author}
                </span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Reading;