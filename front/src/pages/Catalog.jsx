import React, {useEffect, useMemo, useState} from 'react';
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
        const gottenProducts = await ProductService.getProducts();
        setProducts(gottenProducts);
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProducts();
    }, []);

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
            {isLoading
                ? <CenteredDiv>
                    <CircularProgress style={{color: 'black'}}/>
                </CenteredDiv>
                : error
                    ? <h2>Ошибка при загрузке каталога: {error}</h2>
                    : <ProductsList
                        productList={sortedAndSearchedAndFilteredProducts}
                        remove={() => setProducts(products)}
                    />
            }
        </ContentDiv>
    );
};

export default Catalog;