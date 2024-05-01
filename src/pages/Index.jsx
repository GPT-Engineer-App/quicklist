import { useState } from 'react';
import { Box, Button, Input, List, ListItem, IconButton, useToast } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input === '') {
      toast({
        title: 'No task entered',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: tasks.length, text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={5}>
      <Box display="flex" mb={5}>
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <IconButton
          icon={<FaPlus />}
          ml={2}
          colorScheme="blue"
          onClick={addTask}
          aria-label="Add task"
        />
      </Box>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
            <Box as={task.isCompleted ? 's' : 'span'}>
              {task.text}
            </Box>
            <Box>
              <IconButton
                icon={<FaCheck />}
                mr={2}
                colorScheme="green"
                onClick={() => toggleTaskCompletion(task.id)}
                aria-label="Complete task"
                isDisabled={task.isCompleted}
              />
              <IconButton
                icon={<FaTrash />}
                colorScheme="red"
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;