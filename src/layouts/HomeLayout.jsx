import classes from "./layouts.module.css";

function HomeLayout({ children }) {
  return <main className={classes["home-layout"]}>{children}</main>;
}

export default HomeLayout;
