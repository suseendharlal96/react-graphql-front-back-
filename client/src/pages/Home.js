import React from "react";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";

import PostCard from "../components/PostCard";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS);

  return (
    <Grid columns={3} divided>
      <Grid.Row>Recent Posts</Grid.Row>
      <Grid.Row>
        {loading ? (
          <h2>Loading posts...</h2>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      likes {
        id
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
