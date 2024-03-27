
import './App.css';
import SelectableGrid from './components/SelectableGrid';

function App() {
  return (
    <div className='flex'>
      <h1 className='heading'>Selectable grid</h1>
      <SelectableGrid rows={10} columns={10} /> 
    </div>
  );
}

export default App;
