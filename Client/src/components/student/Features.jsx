import React from "react"

const Features = () => {
  return (
    <section className="w-full px-10 py-20 bg-gray-100">

      <h2 className="text-4xl font-bold text-center mb-16">
        A Better Way to Learn From YouTube
      </h2>

      <div className="grid grid-cols-6 grid-rows-6 gap-6 max-w-6xl mx-auto">

        {/* Structured Courses */}
        <div className="col-span-6 row-span-2 rounded-2xl p-8 bg-[url('https://picsum.photos/1200/400')] bg-cover bg-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-white">
            <h3 className="text-xl font-semibold mb-2">📚 Structured Courses</h3>
            <p>Turn scattered YouTube videos into organized learning paths.</p>
          </div>
        </div>

        {/* Track Progress */}
        <div className="col-span-3 row-span-2 rounded-2xl p-8 bg-[url('https://picsum.photos/400/400')] bg-cover bg-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-white">
            <h3 className="text-xl font-semibold mb-2">📈 Track Progress</h3>
            <p>Keep track of completed lessons and learning progress.</p>
          </div>
        </div>

        {/* Video Learning */}
        <div className="col-span-3 row-span-3 rounded-2xl p-8 bg-[url('https://picsum.photos/700/800')] bg-cover bg-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-white">
            <h3 className="text-xl font-semibold mb-2">🎬 Video-Based Learning</h3>
            <p>Watch embedded YouTube lectures without leaving the platform.</p>
          </div>
        </div>

        {/* Become Creator */}
        <div className="col-span-3 rounded-2xl p-8 bg-[url('https://picsum.photos/400/400')] bg-cover bg-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-white">
            <h3 className="text-xl font-semibold mb-2">💰 Become a Creator</h3>
            <p>Upload courses, share knowledge, and earn by selling your content.</p>
          </div>
        </div>

      </div>

    </section>
  )
}

export default Features