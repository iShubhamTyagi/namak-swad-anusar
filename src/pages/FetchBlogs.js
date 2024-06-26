import { useEffect, useState } from "react";
import { useBlog } from "../components/context/BlogContext";

const useFetchBlogs = () => {
  const { setBlogPosts } = useBlog();
  const [totalPostsCount, setTotalPostsCount] = useState(0);

  const decodeHtmlEntities = (str) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  };

  const processPostData = (post) => {
    const decodedExcerpt = decodeHtmlEntities(post.excerpt || "");
    const shortExcerpt =
      decodedExcerpt.length > 100
        ? decodedExcerpt.substring(3, decodedExcerpt.lastIndexOf(" ", 75)) +
          "..."
        : decodedExcerpt;
    return shortExcerpt;
  };

  useEffect(() => {
    fetch(
      "https://public-api.wordpress.com/rest/v1.1/sites/namakswadanusar7.wordpress.com/posts"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetch trigerred", data);
        setTotalPostsCount(data.found);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  function extractFirstImageLink(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const firstImage = doc.querySelector("img");
    return firstImage ? firstImage.src : null;
  }

  const saveToLocalStorage = (key, value) => {
    console.log("Saving to local storage", key, value);
    const data = {
      timestamp: new Date().toISOString(),
      value: value,
    };
    localStorage.removeItem(key);

    if (key === "blogPosts") {
      console.log("Saving blogPosts to local storage", data.value);
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  useEffect(() => {
    fetch(
      "https://public-api.wordpress.com/rest/v1.1/sites/namakswadanusar7.wordpress.com/posts?number=" +
        totalPostsCount
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetch trigerred", data);
        const fetchedPosts = data.posts.map((post) => {
          let thumbnailUrl = "";
          if (post.content) {
            thumbnailUrl = extractFirstImageLink(post.content);
          }
          return {
            id: post.ID,
            title: post.title,
            url: post.URL,
            attachments: post.attachments,
            excerpt: processPostData(post),
            guid: post.guid,
            modified: new Date(post.modified).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            shorturl: post.shorturl,
            tags: post.tags,
            content: post.content,
            thumbnailUrl: thumbnailUrl,
          };
        });
        setBlogPosts(fetchedPosts);
        saveToLocalStorage("blogPosts", fetchedPosts);
        //localStorage.setItem("blogPosts", JSON.stringify(fetchedPosts));
      })
      .catch((error) => console.error("Error fetching posts:", error));
    // eslint-disable-next-line
  }, [totalPostsCount]);
};

export default useFetchBlogs;
