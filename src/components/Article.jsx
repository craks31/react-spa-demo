export default function Article({ article }) {
  if (!article) return <p className="article-body">No article found.</p>;

  return (
    <article>
      <h1 className="article-header">{article.title}</h1>
      <p className="article-body">{article.content}</p>
    </article>
  );
}
