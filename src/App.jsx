import './App.css';
import Article from './components/Article';
import CommentList from './components/CommentList';
import { useContent } from './hooks/useContent';

function App() {
  const { article, comments, isLoading, error } = useContent();

  if (isLoading) {
    return (
      <div className="app-container loading-wrapper">
        <div className="loader"></div>
        <h2 style={{ color: '#94a3b8' }}>Loading gracefully...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-message">
          <h2>Error Loading Data</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="glass-card">
        <Article article={article} />
      </div>

      <hr className="divider" />

      <div className="glass-card">
        <CommentList comments={comments} />
      </div>
    </div>
  );
}

export default App;