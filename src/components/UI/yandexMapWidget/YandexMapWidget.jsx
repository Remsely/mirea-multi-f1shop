import React from 'react';
import classes from "./YandexMapWidget.module.css";

const YandexMapWidget = ({ll, z, l, pt, mode, title, ...props}) => {
    return (
        <iframe
            {...props}
            className={classes.map}
            src={`https://yandex.ru/map-widget/v1/?ll=${ll}&z=${z}&l=${l}&pt=${pt}&mode=${mode}&source=constructor`}
            title={title}
        />
    );
};

export default YandexMapWidget;