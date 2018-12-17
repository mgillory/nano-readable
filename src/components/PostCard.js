import React, { Component } from 'react';
import {
  Card, Button, CardSubtitle, CardBody,
  CardTitle, CardText
} from 'reactstrap';
import { formatDate } from '../utils/helpers';
import { Link } from 'react-router-dom';

export default class PostCard extends Component {
  render() {
    const { post, onDetail, onClick } = this.props;
    return (
      <Card key={post.id}>
        <CardBody>
          <CardTitle>{post.title}</CardTitle>
          <CardSubtitle>{post.author}</CardSubtitle>
          <CardSubtitle>{post.category}</CardSubtitle>
          <CardSubtitle>{formatDate(post.timestamp)}</CardSubtitle>
          <CardText>{post.body}</CardText>
          <CardText>{post.commentCount}</CardText>
          <CardText>{post.voteScore}</CardText>
          {!onDetail ?
            <Link to={`/${post.category}/${post.id}`} onClick={() => onClick(post)}>
              <Button>Details</Button>
            </Link> : null}
        </CardBody>
      </Card>
    )
  }
}
