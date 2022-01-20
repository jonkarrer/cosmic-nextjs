import Cosmic from "cosmicjs";

const BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG;
const READ_KEY = process.env.COSMIC_READ_KEY;

const bucket = Cosmic().bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
});

const is404 = (error) => /not found/i.test(error.message);

export async function getSinglePost(slug) {
  const data = await bucket.getObjects({
    query: {
      type: "posts",
      slug: `${slug}`,
    },
    props: "slug,title,content,metadata",
  });

  return data.objects[0];
}

export async function getAllPosts() {
  const data = await bucket.getObjects({
    query: {
      type: "posts",
    },
    props: "slug,title,content,metadata",
  });
  return data.objects;
}

export async function getAllPostsWithSlug() {
  const params = {
    type: "posts",
    props: "slug",
  };
  const data = await bucket.getObjects(params);
  return data.objects;
}

export async function getAllPostsForHome(preview) {
  const params = {
    type: "posts",
    props: "title,slug,metadata,created_at",
    sort: "-created_at",
    ...(preview && { status: "all" }),
  };
  const data = await bucket.getObjects(params);
  return data.objects;
}

export async function getPreviewPostBySlug(slug) {
  const params = {
    slug,
    props: "slug",
    status: "all",
  };

  try {
    const data = await bucket.getObject(params);
    return data.object;
  } catch (error) {
    // Don't throw if an slug doesn't exist
    if (is404(error)) return;
    throw error;
  }
}
