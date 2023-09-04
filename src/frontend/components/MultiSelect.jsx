import { createSignal, createEffect } from 'solid-js';
import SearchBar from './SearchBar';
import ResultSet from './ResultSet';
import FilteredList from './FilteredList';
import computeFilteredList from './computeFilteredList';

const MultiSelect = (props) => {
  const [searchValue, setSearchValue] = createSignal('');
  const [filteredList, setFilteredList] = createSignal([]);

  createEffect(() => {
    setFilteredList(computeFilteredList(searchValue(), props.availableItems, props.compare, props.itemCount));
  });

  return (
    <div class="w-full rounded border p-4">
      <ResultSet items={props.selectedItems} />
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <FilteredList items={filteredList()} />
    </div>
  );
};

export default MultiSelect;
