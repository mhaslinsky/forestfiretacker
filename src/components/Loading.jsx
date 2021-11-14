import { Icon } from "@iconify/react";
import classes from "./Loading.module.css";
function Loading() {
  return (
    <div className={classes.container}>
      <Icon
        color='red'
        height='200px'
        className={classes.loading}
        icon='eos-icons:loading'
      />
      <h2>Fetching data...</h2>
    </div>
  );
}

export default Loading;
