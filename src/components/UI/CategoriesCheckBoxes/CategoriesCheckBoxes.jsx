import React, {useState} from 'react';
import classes from "./Categories.module.css";
import {categoriesList} from "./categoriesList";

const CategoriesCheckBoxes = ({selectedCategories, onChange}) => {
    const [allIsSelected, setAllIsSelected] = useState(true)

    const handleCheckBoxChange = (category) => {
        const updatedSelectedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(selected => selected !== category)
            : [...selectedCategories, category];

        updatedSelectedCategories.length !== categoriesList.length
            ? setAllIsSelected(false) : setAllIsSelected(true);

        onChange(updatedSelectedCategories);
    }

    function updateAfterAllSelected() {
        setAllIsSelected(!allIsSelected);

        !allIsSelected ? onChange(categoriesList) : onChange([])
    }

    return (
        <div className={classes.container}>
            <label className={classes.label}>
                <input
                    type="checkbox"
                    checked={allIsSelected}
                    onChange={updateAfterAllSelected}
                />
                Все
            </label>
            {categoriesList.map(category =>
                <label key={category} className={classes.label}>
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCheckBoxChange(category)}
                    />
                    {category}
                </label>
            )}
        </div>
    );
};

export default CategoriesCheckBoxes;