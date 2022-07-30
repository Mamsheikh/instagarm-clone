import React from 'react';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { images } from '../data/images';
import { useExplorePostsQuery } from '../generated/graphql';

const Explore = () => {
  const { data } = useExplorePostsQuery();
  // if (loading) {
  //   return [0, 1, 2].map((item, index) => <PostSkeleton key={index} />);
  // }
  // const { endCursor, hasNextPage } = data?.explorePosts?.pageInfo;
  return (
    <Layout>
      <div className='mx-auto pt-20  md:max-w-3xl'>
        <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
          {data?.explorePosts?.map((post, index) => (
            <div key={post.id} className='group relative cursor-pointer'>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
