const arr = [1, 2, 3];

const App = () => {
  return (
    <div className="App">
      {arr.map((item) => (
        <Test item={item} />
      ))}
    </div>
  );
};

interface TestComponentProps {
  item: number;
}

const Test = ({ item }: TestComponentProps) => {
  return (
    <div className="test">
      Test Bootstrap {item}
      <h1>Primary</h1>
      <h3>Tertiary</h3>
    </div>
  );
};

export default App;
