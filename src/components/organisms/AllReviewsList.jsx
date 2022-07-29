import { useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesBar from "../molecules/CategoriesBar";
import OrderDropdown from "../molecules/OrderDropdown";
import ReviewCard from "../molecules/ReviewCard";
import SortDropdown from "../molecules/SortDropdown";

const AllReviewsList = () => {
  const { category } = useParams();
  const [selectedSort, setSelectedSort] = useState();
  const [selectedOrder, setSelectedOrder] = useState("asc");

  return (
    <div>
      <CategoriesBar />
      <SortDropdown setSelectedSort={setSelectedSort} />
      <OrderDropdown setSelectedOrder={setSelectedOrder} />
      <ReviewCard
        categoryParam={category}
        selectedSort={selectedSort}
        selectedOrder={selectedOrder}
      />
    </div>
  );
};

export default AllReviewsList;
