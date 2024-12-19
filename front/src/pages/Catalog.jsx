import React, {useEffect, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import CategoriesCheckBoxes from "../components/UI/CategoriesCheckBoxes/CategoriesCheckBoxes";
import {categoriesList} from "../components/UI/CategoriesCheckBoxes/categoriesList";
import MySelect from "../components/UI/select/MySelect";
import ProductsList from "../components/productList/ProductsList";
import ContentDiv from "../components/UI/contentDiv/ContentDiv";
import ProductService from "../service/ProductService";
import CenteredDiv from "../components/UI/alignCenterDiv/CenteredDiv";
import {CircularProgress} from "@mui/material";
import {useFetching} from "../hooks/useFetching";

const Catalog = () => {
    const [selectedCategories, setSelectedCategories] = useState(categoriesList);
    const [searchText, setSearchText] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    const [products, setProducts] = useState([]);
    const [fetchProducts, isLoading, error] = useFetching(async () => {
        const gottenProducts = await ProductService.getProducts(selectedCategories, searchText, selectedSort);
        setProducts(gottenProducts);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProducts();
    }, [selectedCategories, searchText, selectedSort]);

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
                    {value: 'asc', name: 'По возрастанию цены'},
                    {value: 'desc', name: 'По убыванию цены'},
                ]}
            />
            {isLoading
                ? <CenteredDiv>
                    <CircularProgress style={{color: 'black'}}/>
                </CenteredDiv>
                : error
                    ? <h2>Ошибка при загрузке каталога: {error}</h2>
                    : <ProductsList
                        productList={products}
                        remove={() => setProducts(products)}
                    />
            }
        </ContentDiv>
    );
};

export default Catalog;