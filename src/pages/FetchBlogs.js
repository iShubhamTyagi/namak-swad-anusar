import { useEffect } from "react";
import { useBlog } from "../components/context/BlogContext";

const useFetchBlogs = () => {
  const { setBlogPosts } = useBlog();

  useEffect(() => {
    fetch(
      "https://public-api.wordpress.com/rest/v1.1/sites/namakswadanusar7.wordpress.com/posts"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetch trigerred", data);
        const fetchedPosts = data.posts.map((post) => {
          let thumbnailUrl = "";
          if (post.attachments) {
            const firstAttachment = Object.values(post.attachments)[0];
            if (firstAttachment && firstAttachment.URL) {
              thumbnailUrl = firstAttachment.URL;
            }
          }
          return {
            id: post.ID,
            title: post.title,
            url: post.URL,
            attachments: post.attachments,
            excerpt:
              post.excerpt.length > 100
                ? post.excerpt.substring(
                    3,
                    post.excerpt.lastIndexOf(" ", 100)
                  ) + "..."
                : post.excerpt,
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
      })
      .catch((error) => console.error("Error fetching posts:", error));
    // eslint-disable-next-line
  }, []);
};

export default useFetchBlogs;
