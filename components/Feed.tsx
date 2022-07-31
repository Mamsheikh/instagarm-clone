import React from 'react';
import { usePostsQuery } from '../generated/graphql';
import PostCard from './home/PostCard';
import PostSkeleton from './home/PostSkeleton';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';

const Feed: React.FC = () => {
  // const { data, loading } = useGetPostsQuery({
  //   // fetchPolicy: 'network-only',
  // });
  const { data, loading, error, fetchMore } = usePostsQuery({
    variables: {
      first: 4,
    },
  });

  // const { endCursor, hasNextPage } = data?.posts?.pageInfo;

  if (loading) {
    return (
      <>
        {[...Array(4)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </>
    );
  }

  return (
    <>
      <div className='mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-4xl xl:grid-cols-3'>
        <section className='col-span-2'>
          {data?.posts.edges.map(({ node }, i) => (
            <PostCard key={node.id} post={node} />
          ))}
          {data?.posts?.pageInfo?.hasNextPage ? (
            <button
              className='my-10 rounded bg-blue-500 px-4 py-2 text-white'
              onClick={() => {
                fetchMore({
                  variables: { after: data?.posts?.pageInfo?.endCursor },
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
              more
            </button>
          ) : (
            <p className='my-10 text-center font-medium'>
              You've reached the end!
            </p>
          )}
        </section>
        <section className=' md:col-span-1 md:hidden xl:inline-grid'>
          <div className='fixed'>
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      </div>
    </>
  );
};

export default Feed;
