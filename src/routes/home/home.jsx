import Box from "../../components/box/box";
import Dashboard from "../../components/dashboard/dashboard";

const Home = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box value="26K" title={"Fee paid"} />
        <Box value="14K" title={"Fee left"} />
        <Box value="40K" title={"Total fee"} />
      </div>
      <Dashboard />
    </div>
  );
};

export default Home;
