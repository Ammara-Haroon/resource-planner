import { useCategoriesContext } from "../../context/CategoriesContext";

interface TabsProps {
  selectedCategory: number | undefined;
  handleClick: (category: number) => void;
}
const Tabs = ({ selectedCategory, handleClick }: TabsProps) => {
  const buttonStyle =
    "z-30 flex items-center justify-center w-full p-4 mb-0 transition-all ease-in-out border  rounded-lg cursor-pointer text-rose-700 text-lg font-semibold bg-inherit hover:border-rose-500";
  const activeButtonStyle = `${buttonStyle} bg-red-100`;
  const { categories } = useCategoriesContext();
  return (
    <div className="w-full">
      <ul
        className="border flex justify-evenly items-center flex-wrap p-1 list-none rounded-lg bg-blue-gray-50/60"
        data-tabs="tabs"
        role="list"
      >
        <li className="z-30 text-center">
          <button
            onClick={() => {
              handleClick(0);
            }}
            className={!selectedCategory ? activeButtonStyle : buttonStyle}
            data-tab-target=""
            role="tab"
            aria-selected="true"
          >
            <span className="ml-1">All</span>
          </button>
        </li>

        {categories.map((category) => (
          <li key={category.id} className="z-30 m-1 flex p-2">
            <button
              onClick={() => handleClick(category.id)}
              className={
                selectedCategory === category.id
                  ? activeButtonStyle
                  : buttonStyle
              }
              data-tab-target=""
              role="tab"
              aria-selected="true"
            >
              <img
                className="ml-1 h-8 w-8"
                alt={category.name}
                src={category.icon}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
