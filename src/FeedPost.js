import React from "react";
import { Image } from "react-bootstrap";
import LikeIcon from "./LikeIcon";
import LikedIcon from "./LikedIcon";
import ApiService from "./ApiService";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class FeedPost extends React.Component {
  constructor(props) {
    super(props);
    this.ApiService = new ApiService();
    this.state = {
      liked: this.props.post.viewerHasLiked,
      likeCount: this.props.post.likeCount,
      comment: "",
      commentList: []
    };
    this.like = this.like.bind(this);
    this.unLike = this.unLike.bind(this);
  }

  loadComments() {
    this.ApiService.getComments(this.props.post.id).then(result => {
      this.setState({
        commentList: result != null ? [...result.commentList] : []
      });
    });
  }

  componentWillMount() {
    if (this.props.post.id) {
      this.loadComments();
    }
  }

  componentWillUnmount() {}

  like() {
    this.ApiService.like(this.props.post.id).then(() => {
      this.setState({
        liked: true,
        likeCount: this.state.likeCount + 1
      });
    });
  }

  unLike() {
    this.ApiService.unLike(this.props.post.id).then(() => {
      this.setState({
        liked: false,
        likeCount: this.state.likeCount - 1
      });
    });
  }

  validate = () => {
    if (this.state.comment.length > 32000 || this.state.comment.length < 1) {
      return false;
    } else {
      return true;
    }
  };

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value
    });
  };

  handleComment = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const comment = [
        {
          comment: this.state.comment,
          postId: this.props.post.id
        }
      ];

      this.ApiService.comment(this.props.post.id, this.state.comment).then(
        () => {
          this.setState({
            comment: "",
            commentList: [...this.state.commentList, ...comment]
          });
        }
      );
    }
  };
  render() {
    return (
      <div>
        <li className="feed-item" key={this.props.post.id}>
          <Row>
            <Link to={"/" + this.props.post.userSummary.username}>
              {this.props.post.userSummary.username}
            </Link>
          </Row>
          <Row>
            <Image className="feed-image" src={this.props.post.url} fluid />
          </Row>
        </li>

        <Row>
          <Col>
            {this.state.liked ? (
              <a
                onClick={this.unLike}
                style={{
                  cursor: "pointer"
                }}
              >
                <LikedIcon width={30} />
              </a>
            ) : (
              <a
                onClick={this.like}
                style={{
                  cursor: "pointer"
                }}
              >
                <LikeIcon width={30} />
              </a>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <div>{this.state.likeCount} likes</div>
          </Col>
        </Row>

        <Row>
          <ul>
            {this.state.commentList.map(comment => (
              <div key={comment.id}>{comment.comment}</div>
            ))}
          </ul>
        </Row>

        <Form onSubmit={this.handleComment}>
          <Row>
            <Col lg="10">
              <Form.Group>
                <Form.Control
                  name="comment"
                  value={this.state.comment}
                  autoComplete="off"
                  onChange={this.handleChange}
                  placeholder="Add a comment..."
                />
              </Form.Group>
            </Col>
            <Col lg="2">
              <Button variant="primary" type="submit">
                Post
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
