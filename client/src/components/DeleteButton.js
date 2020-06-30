import React, { useState } from "react";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Icon, Confirm } from "semantic-ui-react";

const DeleteButton = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    update() {
      setIsOpen(false);
    },
    variables: { postId: props.postId },
  });

  return (
    <React.Fragment>
      <Icon
        title="Delete Post"
        style={{ float: "right", cursor: "pointer", marginTop: "10px" }}
        onClick={() => setIsOpen(true)}
        color="red"
        name="trash alternate"
      />
      <Confirm
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={deletePost}
      />
    </React.Fragment>
  );
};

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
