import '../App.css'

export default function TailwindcssLesson() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='text-base p-4 border-4! border-red-500! border-solid! bg-sky-500 text-black ring-4 ring-green-500 ring-offset-2'>
        Tailwind Border Try (Force Important)
      </div>
      <div style={{ border: '4px solid red' }} className='text-base p-4 bg-blue-100 text-black'>
        Inline Style Border
      </div>
      <div className="mx-auto my-4 flex max-w-md items-center gap-4 rounded-lg bg-white p-10 shadow-md outline outline-black/5 dark:bg-gray-800">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-pink-300 bg-pink-100 dark:border-pink-300/10 dark:bg-pink-400/10">
          <svg className="size-6 stroke-pink-700 dark:stroke-pink-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </span>
        <div className="text-center">
          <p className="text-gray-700 dark:text-gray-400">
            <span className="font-medium text-gray-950 dark:text-white">Tom Watson</span> mentioned you in{' '}
            <span className="font-medium text-gray-950 dark:text-white">Logo redesign</span>
          </p>
          <time className="mt-1 block text-gray-500" >9:37am</time>
        </div>
      </div>
    </div>

  )
}