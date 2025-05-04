import NavBar from "./components/NavBar";

const App = () => {
  return (
    <html>
      <head>Example RSC</head>
      <body>
        <NavBar />
        <div className="content">
          <h1>Rsbuild with React</h1>
          <p>Start building amazing things with Rsbuild.</p>
        </div>
      </body>
    </html>
  );
};

export default App;
