import { getAllPostsWithSlug, getSinglePost } from "../../lib/api";

export default function Post({ post }) {
  return (
    <>
      <h1>{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: post.metadata.rich_content }}
      ></div>
      <div>{post.metadata.content}</div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = await getSinglePost(params.slug);
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = (await getAllPostsWithSlug()) || [];
  return {
    paths: allPosts.map((post) => `/posts/${post.slug}`),
    fallback: true,
  };
}
