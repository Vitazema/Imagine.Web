import React from "react";
import "./Categories.css";

function Categories(props: {
  titles: string[];
  onSelectCategory: (selectedCategory: string) => void;
}) {
  const [selected, setSelected] = React.useState(props.titles[0]);

  const selectCategoryHandler = (category: string) => {
    props.onSelectCategory(category);
    setSelected(category)
  };

  return (
    <ul>
      {props.titles.map((item) => {
        return (
          <li
            onClick={() => selectCategoryHandler(item)}
            className={selected == item ? "clicked" : ""}
            key={Math.random().toString()}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export default Categories;
