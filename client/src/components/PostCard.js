import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";

const PostCard = (props) => {
  dayjs.extend(relativeTime);

  const context = useContext(AuthContext);

  const commentPost = () => {};

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header as={Link} to={`/posts/${props.post.id}`}>
          {props.post.username}
        </Card.Header>
        <Card.Meta>{dayjs(props.post.createdAt).fromNow()}</Card.Meta>
        <Card.Description>{props.post.body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton
          postId={props.post.id}
          username={context.user ? context.user.username : null}
          likes={props.post.likes}
        />
        <Button
          as="div"
          title="Post a comment"
          labelPosition="right"
          as={Link}
          to={`/posts/${props.post.id}`}
        >
          <Button color="teal" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="teal" pointing="left">
            {props.post.comments.length}
          </Label>
        </Button>
        {context.user && context.user.username === props.post.username && (
          <Icon
            title="Delete Post"
            style={{ float: "right", cursor: "pointer", marginTop: "10px" }}
            onClick={() => console.log("del")}
            color="red"
            name="trash alternate"
          />
        )}
      </Card.Content>
    </Card>
  );
};
export default PostCard;
