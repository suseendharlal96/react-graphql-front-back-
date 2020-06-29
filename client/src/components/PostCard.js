import React from "react";
import { Link } from "react-router-dom";

import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const PostCard = (props) => {
  dayjs.extend(relativeTime);

  const likePost=()=>{

  }

  const commentPost=()=>{
      
  }
  
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
        <Button as="div" title="Like" labelPosition="right" onClick={likePost}>
          <Button color="red" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="red" pointing="left">
            {props.post.likes.length}
          </Label>
        </Button>
        <Button
          as="div"
          title="Post a comment"
          labelPosition="right"
          onClick={commentPost}
        >
          <Button color="teal" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="teal" pointing="left">
            {props.post.comments.length}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};
export default PostCard;
