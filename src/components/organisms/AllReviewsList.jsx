import { useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesBar from "../molecules/CategoriesBar";
import OrderDropdown from "../molecules/OrderDropdown";
import ReviewCard from "../molecules/ReviewCard";
import SortDropdown from "../molecules/SortDropdown";
import styles from "./styles/AllReviewsList.module.css";

const AllReviewsList = () => {
  const { category } = useParams();
  const [selectedSort, setSelectedSort] = useState("title");
  const [selectedOrder, setSelectedOrder] = useState("asc");

  return (
    <div>
      <CategoriesBar />
      <div className={styles.selectionDiv}>
        <SortDropdown setSelectedSort={setSelectedSort} />
        <OrderDropdown setSelectedOrder={setSelectedOrder} />
      </div>
      <ReviewCard
        categoryParam={category}
        selectedSort={selectedSort}
        selectedOrder={selectedOrder}
      />
    </div>
  );
};

export default AllReviewsList;
