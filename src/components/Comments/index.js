import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    name: '',
    comment: '',
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state

    const firstLetterClassName = `initialBgColor 
  ${
    initialContainerBackgroundClassNames[
      Math.ceil(Math.random() * initialContainerBackgroundClassNames.length - 1)
    ]
  }`

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      date: new Date(),
      isFavorite: false,
      initialClassName: firstLetterClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  likedButton = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isFavorite: !eachComment.isFavorite}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const updateList = commentsList.filter(each => each.id !== id)
    this.setState({commentsList: updateList})
  }

  render() {
    const {commentsList, name, comment} = this.state
    const count = commentsList.length

    return (
      <div className="main-container">
        <div className="container">
          <form className="card" onSubmit={this.onAddComment}>
            <h1 className="heading">Comments</h1>
            <p className="paragraph">Say something about 4.O Technologies</p>
            <input
              type="text"
              className="input-element"
              placeholder="Your Name"
              onChange={this.onChangeName}
              value={name}
            />
            <textarea
              rows="5"
              cols="30"
              placeholder="Your Comment"
              className="textarea"
              onChange={this.onChangeComment}
              value={comment}
            />
            <button type="submit">Add Comment</button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comment-image"
          />
        </div>
        <hr className="hr-line" />
        <div className="count-card">
          <p className="count">{count}</p>
          <p className="paragraph">Comments</p>
        </div>
        <ul>
          {commentsList.map(eachItem => (
            <CommentItem
              commentDetails={eachItem}
              key={eachItem.id}
              likedButton={this.likedButton}
              deleteComment={this.deleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
