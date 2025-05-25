import {
  addProductPhoto,
  createProduct,
  getProducts,
  getOneProductById,
  getFavoriteProducts,
  updateOneProduct,
  getProductsForAdmin,
  getProductForAdmin,
  deleteProductPhoto,
} from "../services/product.service.js";
import { withErrorHandling } from "../utils/errorHandler.js";
import Response from "../utils/response.js";
import XLSX from "xlsx";

export const getAllProductForAdminHandler = withErrorHandling(async (req, res) => {
  const { page, limit, categoryId, subCategoryId, searchTerm, inStock, sort } = req.query;
  const result = await getProductsForAdmin(
    parseInt(page),
    parseInt(limit),
    categoryId,
    subCategoryId,
    searchTerm,
    inStock,
    sort
  );

  return Response.success(result).send(res);
});

export const getOneProductForAdminHandler = withErrorHandling(async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return Response.badRequest("productId zorunludur.").send(res);
  }

  const product = await getProductForAdmin(productId);
  return Response.success(product).send(res);
})

export const getAllProductHandler = withErrorHandling(async (req, res) => {
  const email = req.user?.email || null;
  const { page, limit, categoryId, subCategoryId, searchTerm, inStock } = req.query;
  const result = await getProducts(
    email,
    parseInt(page),
    parseInt(limit),
    categoryId,
    subCategoryId,
    searchTerm,
    inStock
  );

  return Response.success(result).send(res);
});

export const getOneProductByIdHandler = withErrorHandling(async (req, res) => {
  const email = req.user?.email || null;
  const { productId } = req.query;
  if (!productId) {
    return Response.badRequest("productId girilmesi zorunludur.").send(res);
  }
  const product = await getOneProductById(email, productId);
  return Response.success(product).send(res);
});

export const createProductHandler = withErrorHandling(async (req, res) => {
  const { title, prices, description, categoryId, subCategoryId, code } = req.body;
  if (!title || !prices || !description || !categoryId || !code) {
    return Response.badRequest("Missing or invalid fields").send(res);
  }
  const product = await createProduct(
    title,
    prices,
    description,
    categoryId,
    subCategoryId,
    code
  );
  return Response.created(product, "Product created successfully.").send(res);
});

export const addProductPhotoHandler = withErrorHandling(async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return Response.badRequest("productId girilmesi zorunludur.").send(res);
  }
  const fileUrl = req.fileName;
  await addProductPhoto(productId, fileUrl);
  return Response.success("Product photo added successfully.").send(res);
});

export const deleteProductPhotoHandler = withErrorHandling(async (req, res) => {
  const { productId, photoId } = req.body;
  if (!productId || !photoId) {
    return Response.badRequest("productId ve photoId girilmesi zorunludur.").send(res);
  }
  await deleteProductPhoto(productId, photoId);
  return Response.noContent().send(res);
})

export const getFavoriteProductsHandler = withErrorHandling(
  async (req, res) => {
    const { email } = req.user;
    const { page, limit } = req.query;
    const result = await getFavoriteProducts(email, page, limit);
    return Response.success(result).send(res);
  }
);

export const updateProductHandler = withErrorHandling(async (req, res) => {
  const { productId, title, prices, description, categoryId, subCategoryId, inStock, code } = req.body;
  if (!productId) {
    return Response.badRequest("productId girilmesi zorunludur.").send(res);
  }
  const product = await updateOneProduct(
    productId,
    title,
    prices,
    description,
    categoryId,
    subCategoryId,
    inStock,
    code
  );
  return Response.success(product).send(res);
});

export const bulkUploadFromExcelHandler = withErrorHandling(async (req, res) => {
  const excelFile = req.file;
  const { categoryId, subCategoryId } = req.body;
  if (!categoryId || !subCategoryId) {
    return Response.badRequest("categoryId ve subCategoryId zorunludur.").send(res);
  }


  if (!excelFile) {
    return Response.badRequest("Excel dosyası zorunludur.").send(res);
  }

  const workbook = XLSX.read(excelFile.buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const parsedData = XLSX.utils.sheet_to_json(sheet);

  const results = [];
  const failed = [];

  for (const row of parsedData) {
    const {
      productname,
      productdescription,
      customerprice,
      companyprice,
    } = row;

    const prices = {
      customer: Number(customerprice) || 0,
      company: Number(companyprice) || 0
    };

    try {
      const created = await createProduct(
        productname,
        prices,
        productdescription,
        categoryId,
        subCategoryId
      );
      results.push(created);
    } catch (err) {
      failed.push({ row, error: err.message });
    }
  }

  return Response.success({
    message: "Yükleme tamamlandı.",
    successCount: results.length,
    failCount: failed.length,
    failed,
  }).send(res);
});