import styles from "../styles/Loading.module.css";
import Image from "next/image";

const Loading = () => {
  return (
    <div className={styles.loaderContainer}>
      {/* <ImSpinner /> */}
      <div className={styles.loaderContainerSection}>
        {/* <Image src="/loading.svg" alt="loading" width={200} height={200} /> */}
      </div>
    </div>
  );
};

export default Loading;
