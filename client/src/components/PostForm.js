import React from "react";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Form, Button } from "semantic-ui-react";

import { useForm } from "../util/FormHooks";
import { FETCH_POSTS } from "../util/FetchPosts";

const PostForm = () => {
  const { formValue, onChangeInput, onSubmit } = useForm(triggerCreatePost, {
    body: "",
  });

  const [createPost, { errors }] = useMutation(CREATE_POST, {
    update(proxy, result) {
      const postsData = proxy.readQuery({
        query: FETCH_POSTS,
      });
      proxy.writeQuery({
        query: FETCH_POSTS,
        data: {
          getPosts: [result.data.createPost, ...postsData.getPosts],
        },
      });
      console.log(result);
      formValue.body = "";
    },
    variables: formValue,
  });

  function triggerCreatePost() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create Post</h2>
      <Form.Field>
        <Form.Input
          name="body"
          placeholder="Write a post.."
          value={formValue.body}
          onChange={onChangeInput}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      createdAt
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        username
        createdAt
      }
    }
  }
`;

export default PostForm;
