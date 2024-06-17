import { useState } from 'react';
import { useCreateTask } from './reactQueryCustomHooks';

const Form = () => {
  const [newTitle, setNewTitle] = useState('');
  
  const { createTask, isPending } = useCreateTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(newTitle, {
      onSuccess: () => {
        setNewTitle('');
      },
    
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className='form-control'>
        <input
          type='text '
          className='form-input'
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <button type='submit' className='btn' disabled={isPending}>
          {isPending ? "adding task..." : "add task"}
        </button>
      </div>
    </form>
  );
};
export default Form;
