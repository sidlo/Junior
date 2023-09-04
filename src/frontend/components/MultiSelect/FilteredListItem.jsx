import { createEffect } from "solid-js";

const FilteredListItem = (props) => {
  let itemRef;

  createEffect(() => {
    if (itemRef) {
      itemRef.scrollLeft = itemRef.scrollWidth;
    }
  });

  return (
    <div class="flex justify-between items-center w-full font-mono">
      <span ref={itemRef} class="overflow-x-auto whitespace-no-wrap break-keep scrollbar-hidden mr-4 py-2">{props.item}</span>
      <span class="border-l border-border pl-2 pr-2">{props.idx}</span>
    </div>
  );
};

export default FilteredListItem;
