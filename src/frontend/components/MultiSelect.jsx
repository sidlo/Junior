import { searchValue } from '../model/searchBarModel';
import SearchBar from './SearchBar';
import ResultSet from './ResultSet';
import FilteredList from './FilteredList';

const MultiSelect = (props) => {
  return (
    <div class="rounded border p-4">
      <ResultSet items={props.selectedItems} />
      <SearchBar />
      <FilteredList items={props.availableItems} filter={searchValue()} />
    </div>
  );
};

export default MultiSelect;
