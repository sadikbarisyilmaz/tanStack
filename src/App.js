import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { useState } from "react";

function App() {
  const [clicked, setClicked] = useState(false);
  const [postId, setpostId] = useState("");
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.data),
  });

  const ClickHandler = (e) => {
    setpostId(Number(e.target.id) + 1);
    console.log("clicked");
    setTimeout(setClicked(true), 400);
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="text-center grid gap-2 p-56">
      <h1 className="text-4xl mb-10">POSTS</h1>
      <p className="text-2xl cursor-pointer" onClick={() => setClicked(false)}>
        Go Home
      </p>

      {!clicked
        ? data.map((post, i) => {
            return (
              <div key={i}>
                <span id={i} className="cursor-pointer" onClick={ClickHandler}>
                  {post.title}
                </span>
                <div>{isFetching ? "Updating..." : ""}</div>
                <ReactQueryDevtools initialIsOpen />
              </div>
            );
          })
        : data
            .filter((post) => post.id === postId)
            .map((post, i) => {
              return (
                <div key={i}>
                  <span
                    id={i}
                    className="cursor-pointer"
                    onClick={ClickHandler}
                  >
                    {post.title}
                  </span>
                  <div>{isFetching ? "Updating..." : ""}</div>
                  <ReactQueryDevtools initialIsOpen />
                </div>
              );
            })}
    </div>
  );
}

export default App;
