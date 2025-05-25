import { addCategory, addSubCategory, getCategories, updateCategory, updateSubCategory } from "../services/category.service.js";
import { withErrorHandling } from "../utils/errorHandler.js";
import Response from "../utils/response.js";

export const getCategoriesHandler = withErrorHandling(async (req, res) => {
    const categories = await getCategories();
    return Response.success(categories).send(res);
})

export const addCategoryHandler = withErrorHandling(async (req, res) => {
    const { name } = req.body;
    const category = await addCategory(name);
    return Response.created(category, "Kategori eklendi.").send(res);
})

export const addSubCategoryHandler = withErrorHandling(async (req, res) => {
    const { categoryId, name } = req.body;
    const category = await addSubCategory(categoryId, name);
    return Response.success(category, "Alt kategori eklendi.").send(res);
})

export const updateCategoryHandler = withErrorHandling(async (req, res) => {
    const {categoryId, categoryName } = req.body;

    await updateCategory(categoryId, categoryName);
    return Response.noContent().send(res);
})

export const updateSubCategoryHandler = withErrorHandling(async (req, res) => {
    const {categoryId, subCategoryId, subCategoryName} = req.body;
    
    if(!categoryId || !subCategoryId || !subCategoryName){
        return Response.badRequest("Lütfen tüm alanları doldurunuz").send(res);
    }

    await updateSubCategory(categoryId, subCategoryId, subCategoryName);
    return Response.noContent().send(res);
})