import SingleItem from './SingleItem';
import { useFetchTasks } from './reactQueryCustomHooks';

const Items = () => {
  const { isPending, data, error, isError } = useFetchTasks();
  
  if (isPending) {
    return <div style={{ marginTop: '1rem'}}>Loading...</div>;
  }

  if (isError) {
    return <div style={{ marginTop: '1rem'}}>Error: {error.message}</div>;
  }

  // if (error) {
  //   return <div style={{ marginTop: '1rem'}}>Error: {error.response.data}</div>;
  // }

  return (
    <div className='items'>
      {data?.taskList?.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
