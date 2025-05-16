import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import styles from './App.module.css';

// Components
import SortDropdown from './components/SortDropdown/SortDropdown';
import QuoteList from './components/QuoteList/QuoteList';
import SearchFilter from './components/SearchFilter/SearchFilter';
import QuoteDetail from './components/QuoteDetail/QuoteDetail';
import Favorites from './pages/Favorites/Favorites';
import Pagination from './components/Pagination/Pagination';

function AppContent() {
  // State to store all quotes (fetched from API)
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for sorting and filtering
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 9;

  // State for favorites
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from localStorage on initial render
    const saved = localStorage.getItem('favoriteQuotes');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch quotes from API
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch('https://dummyjson.com/quotes?limit=100');
        if (!res.ok) {
          throw new Error('Failed to fetch quotes');
        }
        const data = await res.json();
        setQuotes(data.quotes || []);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching quotes:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
  }, [favorites]);

  // Pagination logic
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;

  // Filter and sort quotes based on search term and sort option
  const filteredAndSortedQuotes = [...quotes]
    .filter(quote => 
      quote.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => { 
      if (sortBy === "author") {
        return a.author.localeCompare(b.author);
      } else if (sortBy === "length") {
        return a.quote.length - b.quote.length;
      }
      return 0;
    });

  const currentQuotes = filteredAndSortedQuotes.slice(indexOfFirstQuote, indexOfLastQuote);
  const totalPages = Math.ceil(filteredAndSortedQuotes.length / quotesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  // Toggle favorite status of a quote
  const toggleFavorite = (quoteId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(quoteId)) {
        return prevFavorites.filter(id => id !== quoteId);
      } else {
        return [...prevFavorites, quoteId];
      }
    });
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading quotes...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <Router>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Quote Browser</h1>
            <nav className={styles.nav}>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                <span>Home</span>
              </NavLink>
              <NavLink 
                to="/favorites" 
                className={({ isActive }) => 
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                <span>Favorites</span>
                {favorites.length > 0 && (
                  <span className={styles.favoritesBadge}>
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            </nav>
          </div>
        </header>

        <main className={styles.main}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className={styles.controls}>
                    <SearchFilter 
                      searchTerm={searchTerm} 
                      setSearchTerm={setSearchTerm} 
                    />
                    <SortDropdown 
                      sortBy={sortBy} 
                      setSortBy={setSortBy} 
                    />
                    <button 
                      className={styles.resetBtn} 
                      onClick={() => {
                        setSortBy("");
                        setSearchTerm("");
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                  <QuoteList 
                    quotes={currentQuotes} 
                    favorites={favorites} 
                    onToggleFavorite={toggleFavorite} 
                  />
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              }
            />
            <Route 
              path="/quote/:id" 
              element={
                <QuoteDetail 
                  quotes={quotes} 
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <Favorites 
                  quotes={quotes}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default AppContent;