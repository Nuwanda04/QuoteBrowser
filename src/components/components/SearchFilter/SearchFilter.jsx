import styles from './SearchFilter.module.css';

const SearchFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className={styles.searchContainer}>
      <label htmlFor="search" className={styles.label}>
        Search quotes & authors:
      </label>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          id="search"
          placeholder="Search quotes or authors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>
    </div>
  );
};

export default SearchFilter;