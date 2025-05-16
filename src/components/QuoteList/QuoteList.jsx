import { Link } from 'react-router-dom';
import styles from './QuoteList.module.css';

const QuoteList = ({ quotes, favorites, onToggleFavorite }) => {
  if (quotes.length === 0) {
    return <div className={styles.noResults}>No quotes found. Try adjusting your search.</div>;
  }


  return (
    <div className={styles.quoteGrid}>
      {quotes.map((quote) => (
        <div key={quote.id} className={styles.quoteCard}>
          <div className={styles.quoteContent}>
            <p className={styles.quoteText}>"{quote.quote}"</p>
            <p className={styles.quoteAuthor}>— {quote.author}</p>
          </div>
          <div className={styles.quoteActions}>
            <button 
              className={`${styles.favoriteButton} ${favorites.includes(quote.id) ? styles.favorited : ''}`}
              onClick={() => onToggleFavorite(quote.id)}
              aria-label={favorites.includes(quote.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {favorites.includes(quote.id) ? '❤️' : '🤍'}
            </button>
            <Link to={`/quote/${quote.id}`} className={styles.viewDetails}>
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuoteList;
