class Category {
    constructor(id, name, categories = []) {
        this.id = id;
        this.name = name;
        this.categories = categories;
    }

    printCategoryList() {
        this.printCategoryListRecursive(0);
    }

    printCategoryListRecursive(indentLevel) {
        const indent = "  ".repeat(indentLevel);
        const categoryElement = document.createElement("div");
        categoryElement.textContent = `${indent}${this.name}`;
        document.getElementById("categories-container").appendChild(categoryElement);
        this.categories.forEach(category => {
            category.printCategoryListRecursive(indentLevel + 1);
        });
    }
}


const data = {
    "hydra:member": [
        {
            "id": 152,
            "name": "Электроника",
            "categories": [
                {
                    "id": 153,
                    "name": "Смартфоны",
                    "categories": [
                        {
                            "id": 154,
                            "name": "Б/У"
                        }
                    ]
                }
            ]
        },
        {
            "id": 1,
            "name": "Одежда",
            "categories": [
                {
                    "id": 2,
                    "name": "Мужская одежда"
                },
                {
                    "id": 7,
                    "name": "Женская одежда"
                }
            ]
        },
        {
            "id": 5,
            "name": "Головные уборы"
        }
    ]
};

function buildCategoriesFromJSON(jsonData) {
    const categories = jsonData["hydra:member"];
    const rootCategories = [];

    categories.forEach(categoryData => {
        const {id, name, categories} = categoryData;
        const category = new Category(id, name);

        if (categories) {
            category.categories = buildCategoriesFromJSON({"hydra:member": categories});
        }

        rootCategories.push(category);
    });

    return rootCategories;
}


const categories = buildCategoriesFromJSON(data);


categories.forEach(category => {
    category.printCategoryList();
});
