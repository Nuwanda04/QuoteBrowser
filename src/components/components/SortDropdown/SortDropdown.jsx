import styles from './SortDropdown.module.css';

const SortDropdown = ({ sortBy, setSortBy }) => {
  return (
    <div className={styles.dropdown}>
      <label htmlFor="sort">Sort by:</label>
      <select 
        id="sort" 
        value={sortBy} 
        onChange={(e) => setSortBy(e.target.value)}
        className={styles.select}
      >
        <option value="">None</option>
        <option value="author">Author (A-Z)</option>
        <option value="length">Quote Length (short to long)</option>
      </select>
    </div>
  );
};

export default SortDropdown;