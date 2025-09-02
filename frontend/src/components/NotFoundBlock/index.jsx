import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFound = () => {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <h1>ვერ მოიძებნა</h1>
      <p className={styles.desc}>
        ჩვენს ინტერნეტ-რესტორანში მსგავის გვერდი არ არსებობს.
      </p>
    </div>
  );
};

export default NotFound;
