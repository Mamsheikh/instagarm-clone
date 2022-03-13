import React from 'react';
import { useGetPostsQuery } from '../generated/graphql';
import PostCard from './home/PostCard';

const Feed = () => {
  const { data, loading } = useGetPostsQuery();
  // console.log(data.getPosts);
  return (
    <div className='mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-4xl xl:grid-cols-3'>
      <section className='col-span-2'>
        {data?.getPosts.map((post) => (
          <PostCard key={post.id} data={post} />
          //   <h2 key={post.id}>{post.user.username}</h2>
        ))}
      </section>
      <section className=' md:col-span-1 md:hidden xl:inline-grid'>
        Mini profile
      </section>
    </div>
  );
};

export default Feed;
