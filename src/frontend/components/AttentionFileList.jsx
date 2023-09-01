import { createEffect } from 'solid-js';
import { fileList, setFileList } from '../model/fileList';
import fetchFileList from '../service/fetchFileList';
import MultiSelect from './MultiSelect';

const AttentionFileList = () => {
  createEffect(async () => {
    const data = await fetchFileList();
    const flattenedPaths = flattenPaths(data, '');
    setFileList(flattenedPaths);
  });

  const flattenPaths = (node, path) => {
    if (node.type === 'file') {
      return [path + '/' + node.name];
    }
    if (!Array.isArray(node.children)) {
      return [];
    }
    return node.children.reduce((acc, child) => {
      return acc.concat(flattenPaths(child, path + '/' + node.name));
    }, []);
  };

  return (
    <div>
      <MultiSelect availableItems={fileList()} selectedItems={[]} itemCount={5} />
    </div>
  );
};

export default AttentionFileList;
