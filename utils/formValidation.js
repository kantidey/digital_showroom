import * as yup from "yup";
const prouctFormValidation = yup.object({
  categoryName: yup.string().required("Please select a category"),
  productName: yup
    .string()
    .required("Please enter a product's name")
    .matches(
      /^[ A-Za-z0-9-]*$/,
      "Input allowed only alphanumeric characters with -"
    )
    .min(3, "Name must be at least 3 characters long")
    .max(48, "Name can't be more than 48 characters long"),
  brand: yup
    .string()
    .required("Please enter a product's brand name")
    .matches(/^[aA-zZ\s]+$/, "Input allowed only alphabetic characters")
    .min(3, "Brand must be at least 3 characters long")
    .max(25, "Brand can't be more than 25 characters long"),
  code: yup
    .string()
    .required("Please enter a product's code")
    .matches(
      /^[ A-Za-z0-9-]*$/,
      "Input allowed only alphanumeric characters with -"
    )
    .min(3, "Name must be at least 3 characters long")
    .max(48, "Name can't be more than 48 characters long"),
  price: yup.number().required("Please enter stuent id"),
});

export { prouctFormValidation };
