package server.endpoints;

import express.Express;
import server.database.Database;
import server.model.Category;

import java.util.List;

public class CategoryEndpoints {

    public CategoryEndpoints(Database dbConnection, Express app) {

        categoryEndpoints(dbConnection, app);
    }

    private void categoryEndpoints(Database dbConnection, Express app){

        app.get("/rest/categories", (((request, response) -> {

            List<Category> categories = dbConnection.getCategoriesConnection().getCategories();
            response.json(categories);
        })));

    }
}
