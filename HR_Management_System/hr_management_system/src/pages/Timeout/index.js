export default function Timeout() {
  return (
    <div className="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-20 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Your session has expired</span>
          {/* <span className="block">Start your free trial today.</span> */}
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
            >
              Log back in
            </a>
          </div>
          {/* <div className="ml-3 inline-flex">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-100 px-5 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200"
            >
              Learn more
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}
