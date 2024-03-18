import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, likedButton, deleteComment} = props
  const {name, comment, isFavorite, id, initialClassName, date} = commentDetails
  const likeText = isFavorite ? 'Liked' : 'Like'
  const likeClassName = isFavorite ? 'liked-button' : 'like-button'
  const time = formatDistanceToNow(date)
  const likeImage = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickLikeBtn = () => {
    likedButton(id)
  }

  const onClickDeleteComment = () => {
    deleteComment(id)
  }
  return (
    <li className="list-item">
      <div className="name-card">
        <p className={initialClassName}>{name[0]}</p>
        <p className="name">{name}</p>
        <p className="time">{time}</p>
      </div>

      <p className="comment">{comment}</p>
      <div className="like-delete-card">
        <button
          type="button"
          className={likeClassName}
          onClick={onClickLikeBtn}
        >
          <img src={likeImage} alt="like" className="like-icon" />
          {likeText}
        </button>
        <button
          type="button"
          data-testid="delete"
          className="delete-button"
          onClick={onClickDeleteComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete"
          />
        </button>
      </div>
      <hr className="hr-line" />
    </li>
  )
}

export default CommentItem
