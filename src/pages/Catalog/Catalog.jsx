import React, {useMemo, useState} from 'react';
import MyInput from "../../components/UI/input/MyInput";
import {dataBase} from "../../API/dataBase";
import CategoriesCheckBoxes from "../../components/UI/CategoriesCheckBoxes/CategoriesCheckBoxes";
import {categoriesList} from "../../components/UI/CategoriesCheckBoxes/categoriesList";
import MySelect from "../../components/UI/select/MySelect";
import ProductsList from "../../components/productList/ProductsList";
import ContentDiv from "../../components/UI/contentDiv/ContentDiv";

const Catalog = () => {
    const [selectedCategories, setSelectedCategories] = useState(categoriesList);
    const [searchText, setSearchText] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    const [products, setProducts] = useState([...dataBase]);

    const sortedProducts = useMemo(() => {
        if (selectedSort) {
            return [...products].sort((a, b) =>
                selectedSort === 'inc'
                    ? a.price - b.price
                    : b.price - a.price
            );
        }
        return products;
    }, [selectedSort, products])

    const sortedAndSearchedAndFilteredProducts = useMemo(() => {
        return sortedProducts.filter(product => {
            if (!selectedCategories.includes(product.category)) {
                return false;
            }
            return product.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
        })
    }, [searchText, selectedCategories, sortedProducts])

    return (
        <ContentDiv>
            <MyInput
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder="Поиск..."
            />
            <CategoriesCheckBoxes
                selectedCategories={selectedCategories}
                onChange={selected => setSelectedCategories(selected)}
            />
            <MySelect
                value={selectedSort}
                onChange={sort => setSelectedSort(sort)}
                defaultValue="Cортировать по"
                options={[
                    {value: 'inc', name: 'По возрастанию цены'},
                    {value: 'dec', name: 'По убыванию цены'},
                ]}
            />
            <ProductsList productList={sortedAndSearchedAndFilteredProducts}/>
        </ContentDiv>
    );
};

export default Catalog;