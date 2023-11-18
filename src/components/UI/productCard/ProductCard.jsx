import React from 'react';

const ProductCard = ({imgURL, name, isLiked, inBasket, price}) => {
    return (
        <div>
            <div>
                <img src={imgURL} alt={name}/>
                {isLiked
                    ? <img src="" alt="like icon"/>
                    : <img src="" alt="like icon"/>
                }
            </div>
            <div>{name}</div>
            <div>
                <div>{price}</div>
                {inBasket
                    ? <img src="" alt="like icon"/>
                    : <img src="" alt="like icon"/>
                }
            </div>
        </div>
    );
};

export default ProductCard;