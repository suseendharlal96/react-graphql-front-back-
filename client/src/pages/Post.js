import React, { useContext, useEffect } from "react";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, Card, Icon, Label, Button, Image } from "semantic-ui-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import { AuthContext } from "../context/auth";

const Post = (props) => {
  dayjs.extend(relativeTime);

  const context = useContext(AuthContext);

  const postId = props.match.params.postId;

  const { data } = useQuery(FETCH_SINGLE_POST, {
    variables: {
      postId,
    },
  });

  useEffect(() => {
    console.log(data);
  }, []);

  const postContent =
    data && data.getPost ? (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{data.getPost.username}</Card.Header>
                <Card.Meta>{dayjs(data.getPost.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{data.getPost.body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton
                  postId={data.getPost.id}
                  username={context.user ? context.user.username : null}
                  likes={data.getPost.likes}
                />
                <Button as="div" title="Post a comment" labelPosition="right">
                  <Button color="teal" basic>
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="teal" pointing="left">
                    {data.getPost.comments.length}
                  </Label>
                </Button>
                {context.user &&
                  context.user.username === data.getPost.username && (
                    <DeleteButton postId={data.getPost.id} />
                  )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ) : (
      <p>Loading...</p>
    );

  return postContent;
};
const FETCH_SINGLE_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
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

export default Post;
