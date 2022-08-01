import React, { useEffect } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { usePostsQuery } from '../generated/graphql';
import PostCard from './home/PostCard';
import PostSkeleton from './home/PostSkeleton';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';

const Feed: React.FC = () => {
  // const [hasNextPage, setHasNextPage] = React.useState(false);
  const { data, loading, error, fetchMore } = usePostsQuery({
    variables: {
      first: 4,
    },
  });

  // React.useEffect(() => {
  //   if (data) {
  //     const posts = data.posts.edges.map(({ node }) => node);
  //     if (!posts || posts.length === 0) return;

  //     const id = posts[posts.length - 1].id;
  //     if (!data.posts.pageInfo.hasNextPage) return;

  //     if (id !== observedPost) {
  //       setObservedPost(id);
  //       observeElement(document.getElementById(id)!);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data.posts]);

  // const handleScroll = (e) => {
  //   // console.log(e.target.documentElement.scrollTop);
  //   // console.log(window.innerHeight);
  //   // console.log(e.target.documentElement.scrollHeight);
  //   // console.log(
  //   //   Math.ceil(e.target.documentElement.scrollTop + window.innerHeight)
  //   // );
  //   const scrollHeight = e.target.documentElement.scrollHeight;
  //   const currentHeight = Math.ceil(
  //     e.target.documentElement.scrollTop + window.innerHeight
  //   );
  //   if (currentHeight + 1 >= scrollHeight) {
  //     console.log('bottom reached');
  //     console.log('hasNextPage', hasNextPage);
  //     if (!data?.posts?.pageInfo?.hasNextPage) {
  //       return;
  //     } else {
  //       fetchMore({
  //         variables: { after: data?.posts?.pageInfo?.endCursor },
  //         updateQuery: (prevResult, { fetchMoreResult }) => {
  //           fetchMoreResult.posts.edges = [
  //             ...prevResult.posts.edges,
  //             ...fetchMoreResult.posts.edges,
  //           ];
  //           return fetchMoreResult;
  //         },
  //       });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (data?.posts?.pageInfo?.hasNextPage) {
  //     setHasNextPage(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   // loadTenPokemon();
  //   window.addEventListener('scroll', handleScroll);
  // }, []);

  // const observeElement = (element: HTMLElement) => {
  //   if (!element) return;
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting === true) {
  //         console.log('Reached bottom of post');
  //         fetchMore({
  //           variables: { after: data?.posts?.pageInfo?.endCursor },
  //           updateQuery: (prevResult, { fetchMoreResult }) => {
  //             fetchMoreResult.posts.edges = [
  //               ...prevResult.posts.edges,
  //               ...fetchMoreResult.posts.edges,
  //             ];
  //             return fetchMoreResult;
  //           },
  //         });
  //         observer.unobserve(element);
  //       }
  //     },
  //     { threshold: 0.5 }
  //   );
  //   observer.observe(element);
  // };

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
    <div className='mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-4xl xl:grid-cols-3'>
      <section className='col-span-2'>
        {data?.posts.edges.map(({ node }, i) => (
          <PostCard key={i} post={node} />
        ))}
        <div className='mx-auto flex items-center justify-center md:max-w-3xl xl:max-w-4xl'>
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
              Load more
            </button>
          ) : (
            <p className='my-10 text-center font-medium'>
              You've reached the end!
            </p>
          )}
        </div>
        {/* {loading && <h2>loading...</h2>}
        {data?.posts?.pageInfo?.hasNextPage === false && (
          <p className='my-10 text-center font-medium'>
            You've reached the end!
          </p>
        )} */}
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
