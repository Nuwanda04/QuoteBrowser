import { Link } from 'react-router-dom';
import styles from './Favorites.module.css';

const Favorites = ({ quotes, favorites, onToggleFavorite }) => {
  // Filter the quotes to only include favorited ones
  const favoriteQuotes = quotes.filter(quote => favorites.includes(quote.id));

  return (
    <div className={styles.favoritesPage}>
      <div className={styles.header}>
        <h1>Your Favorite Quotes</h1>
        <Link to="/" className={styles.backLink}>← Back to all quotes</Link>
      </div>

      {favoriteQuotes.length === 0 ? (
        <div className={styles.emptyState}>
          <p>You haven't added any quotes to your favorites yet.</p>
          <Link to="/" className={styles.browseLink}>
            Browse Quotes
          </Link>
        </div>
      ) : (
        <div className={styles.favoritesGrid}>
          {favoriteQuotes.map(quote => (
            <div key={quote.id} className={styles.favoriteCard}>
              <div className={styles.quoteContent}>
                <p className={styles.quoteText}>"{quote.quote}"</p>
                <p className={styles.quoteAuthor}>— {quote.author}</p>
              </div>
              <div className={styles.actions}>
                <button 
                  className={styles.removeButton}
                  onClick={() => onToggleFavorite(quote.id)}
                >
                  ❌ Remove from Favorites
                </button>
                <Link to={`/quote/${quote.id}`} className={styles.viewDetails}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
