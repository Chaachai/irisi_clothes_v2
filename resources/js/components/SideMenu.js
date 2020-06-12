import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MegaMenu } from "primereact/megamenu";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { result } from "lodash";

const SideMenu = () => {
    // const [g_categories_result, setG_categories_result] = useState([]);
    // const [categories_result, SetCategories_result] = useState([]);
    const [items, setItems] = useState([]);

    const getCategoriesByGCategory = (id, categories) => {
        console.log("in get Categories By GCategory ");
        let array = [];
        categories.forEach(element => {
            if (element.g_category_id === id) {
                let ob = {
                    label: element.name
                };
                array.push(ob);
            }
        });
        return array;
    };

    const itemObj = (label, items) => {
        let obj = {
            label: label,
            items: [
                [
                    {
                        items: items
                    }
                ]
            ]
        };

        return obj;
    };
    useEffect(() => {
        axios
            .all([axios.get("/api/g_categories"), axios.get("/api/categories")])
            .then(
                axios.spread((g_categoriesQuery, categoriesQuery) => {
                    let itemsArray = [];

                    g_categoriesQuery.data.forEach(element => {
                        itemsArray.push(
                            itemObj(
                                element.name,
                                getCategoriesByGCategory(
                                    element.id,
                                    categoriesQuery.data
                                )
                            )
                        );
                    });

                    setItems(itemsArray);
                })
            );
    }, []);

    return <MegaMenu model={items} orientation="vertical" />;
};

export default SideMenu;
