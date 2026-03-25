export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) return <p className="article-body">No comments yet. Be the first!</p>;

  return (
    <section>
      <h3 className="comments-header">
        Live Discussions **
        <span className="comments-badge">{comments.length}</span>
      </h3>
      <ul className="comments-list">
        {comments.map(c => (
          <li key={c.id} className="comment-item">
            {c.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
