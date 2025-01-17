export const layout = "_includes/base.jsx";

export default function (data) {
  const parseDate = function (text) {
    const date = new Date(text);
    return [
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, "0"),
      date.getDate().toString().padStart(2, "0"),
    ].join("/");
  };

  const postsData = data.hatenablog.map((post, ind) => {
    const desc = post.description
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/\s+/g, "");
    return {
      "id": "posts-item-" + ind,
      "title": post.title,
      "link": post.link,
      "date": parseDate(post.pubDate),
      "desc": desc.slice(0, 400),
      "raw_desc": desc,
    };
  });

  const posts = postsData.map((post) => (
    <li key={post.id} id={post.id}>
      <a
        href={post.link}
        target="_blank"
        rel="noopener"
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 mb-4"
      >
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gray-800">
        </span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h2 className="post-title text-lg font-bold text-gray-900 sm:text-xl">
              {post.title}
            </h2>

            <p className="mt-1 text-xs font-medium text-gray-600">
              {post.date}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p
            className="post-desc max-w-[40ch] text-sm text-gray-500 line-clamp-3"
            data-desc={post.raw_desc}
          >
            {post.desc}
          </p>
        </div>
      </a>
    </li>
  ));

  return (
    <>
      <h1>Posts</h1>
      <div className="not-prose" x-data="{search: ''}">
        <div className="flex justify-end space-x-4">
          <div className="relative mb-4 w-1/2">
            <label
              htmlFor="posts-search"
              className="sr-only"
            >
              Search
            </label>

            <input
              type="text"
              id="posts-search"
              placeholder="Search for..."
              className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
              x-model="search"
              x-init="$watch('search', v => $store.posts.filter(v))"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>

        <ul id="posts-items">
          {posts}
        </ul>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js">
      </script>
      <script src="/scripts/posts.js" inline="true"></script>
    </>
  );
}
