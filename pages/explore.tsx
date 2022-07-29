import React from 'react';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import { images } from '../data/images';
import { useExplorePostsQuery } from '../generated/graphql';

const Explore = () => {
  const { data, loading, fetchMore } = useExplorePostsQuery({
    variables: {
      first: 6,
    },
  });
  // if (loading) {
  //   return [0, 1, 2].map((item, index) => <PostSkeleton key={index} />);
  // }
  const { endCursor, hasNextPage } = data?.explorePosts?.pageInfo;
  return (
    <Layout>
      <div className='mx-auto pt-20  md:max-w-3xl'>
        <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
          {data?.explorePosts?.edges.map(({ node }, index) => (
            <div key={node.id} className='group relative cursor-pointer'>
              <PostCard post={node} />
            </div>
          ))}
          {hasNextPage ? (
            <div className='flex items-center justify-center'>
              <button
                className='my-10  rounded bg-blue-500 px-4 py-2 text-white'
                onClick={() => {
                  fetchMore({
                    variables: { after: endCursor },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                      fetchMoreResult.explorePosts.edges = [
                        ...prevResult.explorePosts.edges,
                        ...fetchMoreResult.explorePosts.edges,
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
              <span className='text-center'> You've reached the end!</span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
