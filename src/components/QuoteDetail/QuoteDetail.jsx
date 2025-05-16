import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './QuoteDetail.module.css';

const QuoteDetail = ({ quotes, favorites, onToggleFavorite }) => {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Find the quote from the loaded quotes or fetch it individually if not found
  useEffect(() => {
    const foundQuote = quotes.find(q => q.id === parseInt(id));
    
    if (foundQuote) {
      setQuote(foundQuote);
      setIsLoading(false);
    } else {
      // If quote not found in the loaded list, fetch it directly
      const fetchQuote = async () => {
        try {
          const response = await fetch(`https://dummyjson.com/quotes/${id}`);
          if (!response.ok) {
            throw new Error('Quote not found');
          }
          const data = await response.json();
          setQuote(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchQuote();
    }
  }, [id, quotes]);

  if (isLoading) {
    return <div className={styles.loading}>Loading quote...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/" className={styles.backLink}>← Back to all quotes</Link>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className={styles.notFound}>
        <h2>Quote not found</h2>
        <p>The requested quote could not be found.</p>
        <Link to="/" className={styles.backLink}>← Back to all quotes</Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(quote.id);

  return (
    <div className={styles.quoteDetail}>
      <div className={styles.quoteCard}>
        <div className={styles.quoteContent}>
          <blockquote className={styles.quoteText}>
            "{quote.quote}"
          </blockquote>
          <p className={styles.quoteAuthor}>— {quote.author}</p>
        </div>
        
        <div className={styles.actions}>
          <button 
            className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ''}`}
            onClick={() => onToggleFavorite(quote.id)}
          >
            {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
          
          <button 
            className={styles.copyButton}
            onClick={() => {
              navigator.clipboard.writeText(`"${quote.quote}" — ${quote.author}`);
              
              alert('Quote copied to clipboard!');
            }}
          >
            📋 Copy Quote
          </button>
          
          <Link to="/" className={styles.backLink}>
            ← Back to all quotes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetail;
