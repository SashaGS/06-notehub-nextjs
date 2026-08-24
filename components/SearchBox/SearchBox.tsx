import css from './SearchBox.module.css';

interface SearchBoxProps {
  updateSearchQuery: (value: string) => void;
}

function SearchBox({ updateSearchQuery }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={''}
      onChange={e => updateSearchQuery(e.target.value)}
    />
  );
}

export default SearchBox;
