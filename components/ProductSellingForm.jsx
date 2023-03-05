import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import CreateFormButtonSpacer from "./CreateFormButtonSpacer";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import MuiPhoneNumber from "material-ui-phone-number";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Divider,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import { useLocalStorage } from "@rehooks/local-storage";

export default function CreateFeesForm({ data }) {
  const [open, setOpen] = React.useState(false);
  const [vat] = React.useState(data.vat);
  const [discount] = React.useState(data.discount);
  const [sellingType, setSellingType] = React.useState("cash");
  const [cashAmount, setCashAmount] = React.useState();
  const [customerName, setCustomerName] = React.useState();
  const [customerPhone, setCustomerPhone] = React.useState();
  const [cashAmountError, setCashAmountError] = React.useState();
  const [customerNameError, setCustomerNameError] = React.useState();
  const [isNameRequired, setIsNameRequired] = React.useState(false);
  const [isPhoneRequired, setIsPhoneRequired] = React.useState(false);
  const [isCashAmountRequired, setIsCashAmountRequired] = React.useState(false);
  const [product, setProduct] = React.useState([]);
  const [userInfo] = useLocalStorage("userInfo");
  const router = useRouter();
  console.log(data);
  //create class fees or instalment
  const handelSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: `You want to save this payment`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen(true);
        const { data } = await axios.post(
          `/api/product/sell`,
          {
            sellingType,
            cashAmount,
            customerName,
            customerPhone,
            code: product.map((value) => value.code),
            totalAmount: (
              product.reduce((a, c) => a + c.price, 0) +
              percentage(
                product.reduce((a, c) => a + c.price, 0),
                vat
              ) -
              percentage(
                product.reduce((a, c) => a + c.price, 0),
                discount
              )
            ).toFixed(0),
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOpen(false);
        if (data == "Payment saved successfully") {
          Swal.fire("Success", data, "success").then((result) => {
            router.reload(window.location.reload);
          });
        } else {
          Swal.fire("Error", data, "error");
        }
      }
    });
  };
  function percentage(amount, per) {
    return (amount / 100) * per;
  }
  return (
    <React.Fragment>
      <Stack spacing={1} component="form" onSubmit={handelSubmit}>
        <FormControl>
          <FormLabel>Sell On: </FormLabel>
          <RadioGroup
            row
            value={sellingType}
            onChange={(e) => {
              const newValue = e.target.value;
              setSellingType(newValue);
              if (newValue == "cash") {
                setIsNameRequired(false);
                setIsPhoneRequired(false);
                setIsCashAmountRequired(false);
              } else if (newValue == "due") {
                setIsNameRequired(true);
                setIsPhoneRequired(true);
                setIsCashAmountRequired(false);
              } else {
                setIsNameRequired(true);
                setIsPhoneRequired(true);
                setIsCashAmountRequired(true);
              }
            }}
          >
            <FormControlLabel
              value="cash"
              control={<Radio size="small" color="yallo" />}
              label="Cash"
            />
            <FormControlLabel
              value="due"
              control={<Radio size="small" color="yallo" />}
              label="Due"
            />
            <FormControlLabel
              value="both"
              control={<Radio size="small" color="yallo" />}
              label="Both"
            />
          </RadioGroup>
        </FormControl>
        <Autocomplete
          multiple
          options={data.product ? data.product : []}
          required
          getOptionLabel={(option) => option.code}
          filterSelectedOptions
          onChange={(event, newValue) => {
            setProduct(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Product's Code"
              size="small"
              color="yallo"
              placeholder="Search a product code"
            />
          )}
        />

        <TextField
          sx={{ display: isNameRequired ? "block" : "none" }}
          required={isNameRequired ? true : false}
          label="Customer's Name"
          type="text"
          fullWidth
          placeholder="Enter customer name"
          size="small"
          color="yallo"
          error={customerNameError && customerNameError}
          helperText={customerNameError && customerNameError}
          onChange={(e) => {
            let newValue = e.target.value;
            if (newValue.match(/^(?! )[A-Za-z ]*(?<! )$/)) {
              if (newValue.length < 3) {
                setCustomerNameError(
                  "Customer name must be at least 3 characters"
                );
              } else {
                setCustomerNameError();
                setCustomerName(newValue);
              }
            } else {
              setCustomerNameError(
                "Input allowed only alphabetic characters and space not allowed at the beginning and end of the string"
              );
            }
          }}
        />
        <MuiPhoneNumber
          sx={{ display: isPhoneRequired ? "block" : "none" }}
          defaultCountry={"bd"}
          label="Customer's Phone"
          placeholder="Enter phone number"
          size="small"
          fullWidth
          color="yallo"
          variant="outlined"
          countryCodeEditable={false}
          onChange={(newValue) => {
            setCustomerPhone(newValue);
          }}
        />
        <TextField
          sx={{ display: isCashAmountRequired ? "block" : "none" }}
          required={isCashAmountRequired ? true : false}
          label="Cash Amount"
          type="number"
          fullWidth
          placeholder="Enter cash amount"
          size="small"
          color="yallo"
          error={cashAmountError && cashAmountError}
          helperText={cashAmountError ? cashAmountError : null}
          onChange={(e) => {
            let newValue = e.target.value;
            if (newValue < 1) {
              setCashAmountError(
                "Found invalid input. Please avoid to use negative number or zero"
              );
            } else {
              setCashAmountError();
              setCashAmount(newValue);
            }
          }}
        />

        <Typography>Quantity: {product.length}</Typography>
        <Typography>
          Price: {product.reduce((a, c) => a + c.price, 0)} {data.currency}
        </Typography>
        <Typography>Discount: {data.discount} %</Typography>
        <Typography>Vat: {data.vat} %</Typography>
        <Divider />
        <Typography>
          Total Amount:
          {(
            product.reduce((a, c) => a + c.price, 0) +
            percentage(
              product.reduce((a, c) => a + c.price, 0),
              vat
            ) -
            percentage(
              product.reduce((a, c) => a + c.price, 0),
              discount
            )
          ).toFixed(0)}{" "}
          {data.currency}
        </Typography>
        <CreateFormButtonSpacer>
          <Button
            type="submit"
            disabled={
              product.length > 0
                ? isPhoneRequired
                  ? customerPhone
                    ? false
                    : true
                  : false
                : true
            }
            variant="contained"
            color="yallo"
            size="small"
          >
            Save Payment
          </Button>
        </CreateFormButtonSpacer>
      </Stack>
      <br></br>

      <Typography align="center" variant="h5">
        Product Details
      </Typography>
      <br></br>
      <TableContainer sx={{ border: "1px solid #ccc", borderRadius: "4px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Image src={item.photo} alt="" height={100} width={100} />
                </TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Backdrop open={open}>
        <CircularProgress color="yallo" />
      </Backdrop>
    </React.Fragment>
  );
}
