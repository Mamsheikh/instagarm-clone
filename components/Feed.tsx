import React from 'react';
import { useRecoilState } from 'recoil';
import { editPostModalState } from '../atoms/editPostState';
import { useGetPostsQuery, usePostsQuery } from '../generated/graphql';
import EditPostModal from './EditPostModal';
import PostCard from './home/PostCard';
import PostSkeleton from './home/PostSkeleton';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';

const Feed = () => {
  // const { data, loading } = useGetPostsQuery({
  //   // fetchPolicy: 'network-only',
  // });
  const { data, loading, fetchMore } = usePostsQuery({
    variables: {
      first: 4,
    },
  });
  if (loading) {
    return [0, 1, 2].map((item, index) => <PostSkeleton key={index} />);
  }
  const { endCursor, hasNextPage } = data?.posts?.pageInfo;
  return (
    <div className='mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-4xl xl:grid-cols-3'>
      <section className='col-span-2'>
        {data?.posts?.edges.map(({ node }, index) => (
          <PostCard key={node.id} post={node} />
          //   <h2 key={post.id}>{post.user.username}</h2>
        ))}
        {hasNextPage ? (
          <div className='flex items-center justify-center'>
            <button
              className='my-10  rounded bg-blue-500 px-4 py-2 text-white'
              onClick={() => {
                fetchMore({
                  variables: { after: endCursor },
                  updateQuery: (prevResult, { fetchMoreResult }) => {
                    fetchMoreResult.posts.edges = [
                      ...prevResult.posts.edges,
                      ...fetchMoreResult.posts.edges,
                    ];
                    return fetchMoreResult;
                  },
                });
              }}
            >
              Load more
            </button>
          </div>
        ) : (
          <div className='my-10 text-center font-medium'>
            You've reached the end!{' '}
          </div>
        )}
      </section>
      <section className=' md:col-span-1 md:hidden xl:inline-grid'>
        <div className='fixed'>
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </div>
  );
};

export default Feed;
