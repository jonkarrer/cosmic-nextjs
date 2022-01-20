import { getAllPostsForHome } from "../lib/api";
import Head from "next/head";
import Link from "next/link";

export default function Index({ allPosts }) {
  return (
    <>
      <Head>
        <title>Cosmic Example</title>
      </Head>
      <div style={{ display: "grid", gap: "20px" }}>
        <h1>Example Posts</h1>
        {allPosts.map((item, index) => (
          <div key={index}>
            <Link passHref href={`/posts/${item.slug}`}>
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#003355",
                  color: "white",
                }}
              >
                {item.title}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps({ preview }) {
  const allPosts = (await getAllPostsForHome(preview)) || [];
  return {
    props: { allPosts },
  };
}
