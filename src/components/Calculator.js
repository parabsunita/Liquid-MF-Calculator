// src/components/Calculator.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNavData } from "../redux/actions/navActions";
import VirtualizedSelect from "./VirtualizedSelect";
import {
  Container,
  Typography,
  Switch,
  TextField,
  FormControlLabel,
  Box,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";

const Calculator = () => {
  const [amount1, setAmount1] = useState("");
  const [units1, setUnits1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [units2, setUnits2] = useState("");
  const [isAmountEnabled, setIsAmountEnabled] = useState(true);
  const [selectedFund, setSelectedFund] = useState("");
  const [selectedScheme, setSelectedScheme] = useState("");
  const [selectedSchemeNav, setSelectedSchemeNav] = useState(0);

  const dispatch = useDispatch();
  const navData = useSelector((state) => state.navData);
  const mutualFundNames = useSelector((state) => state.mutualFundNames);
  const schemeNames = useSelector((state) => state.schemeNames);

  useEffect(() => {
    dispatch(fetchNavData());
  }, [dispatch]);

  useEffect(() => {
    const index = schemeNames.indexOf(selectedScheme);
    if (index !== -1) {
      setSelectedSchemeNav(navData[index]);
    }
  }, [selectedScheme, navData, schemeNames]);

  const handleSwitchChange = () => {
    setIsAmountEnabled(!isAmountEnabled);
    clearFields();
  };

  const handleAmountChange = (event) => {
    const newAmount = event.target.value;
    setAmount1(isAmountEnabled ? newAmount : "");
    setAmount2(isAmountEnabled ? "" : newAmount);
    if (newAmount) {
      const calculatedUnits = parseFloat(newAmount) / selectedSchemeNav;
      setUnits1(
        isAmountEnabled
          ? isNaN(calculatedUnits)
            ? ""
            : calculatedUnits.toFixed(4)
          : ""
      );
      setUnits2(
        isAmountEnabled
          ? ""
          : isNaN(calculatedUnits)
          ? ""
          : calculatedUnits.toFixed(4)
      );
    } else {
      setUnits1("");
      setUnits2("");
    }
  };

  const handleUnitsChange = (event) => {
    const newUnits = event.target.value;
    setUnits1(isAmountEnabled ? newUnits : "");
    setUnits2(isAmountEnabled ? "" : newUnits);
    if (newUnits) {
      const calculatedAmount = parseFloat(newUnits) * selectedSchemeNav;
      setAmount1(
        isAmountEnabled
          ? isNaN(calculatedAmount)
            ? ""
            : calculatedAmount.toFixed(2)
          : ""
      );
      setAmount2(
        isAmountEnabled
          ? ""
          : isNaN(calculatedAmount)
          ? ""
          : calculatedAmount.toFixed(2)
      );
    } else {
      setAmount1("");
      setAmount2("");
    }
  };

  const handleFundChange = (event) => {
    const selectedFund = event.target.value;
    setSelectedFund(selectedFund);
    const associatedScheme = schemeNames.find(
      (scheme, index) => mutualFundNames[index] === selectedFund
    );
    setSelectedScheme(associatedScheme || "");
  };

  const clearFields = () => {
    setAmount1("");
    setUnits1("");
    setAmount2("");
    setUnits2("");
  };

  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h5" className="title">
        Liquid MF Calculator
      </Typography>
      <FormControlLabel
        control={
          <Switch checked={isAmountEnabled} onChange={handleSwitchChange} />
        }
        label={isAmountEnabled ? "Amount" : "Units"}
        className="switchLabel"
      />
      <Box mt={2}>
        {isAmountEnabled ? (
          <>
            <TextField
              label="Amount Set 1"
              variant="outlined"
              type="number"
              value={amount1}
              onChange={handleAmountChange}
              fullWidth
              className="inputField"
            />
            <TextField
              label="Units Set 1"
              variant="outlined"
              type="number"
              value={units1}
              onInput={handleUnitsChange}
              fullWidth
              className="inputField"
              disabled
            />
          </>
        ) : (
          <>
            <TextField
              label="Amount"
              variant="outlined"
              type="number"
              value={amount2}
              onInput={handleAmountChange}
              onChange={handleAmountChange}
              fullWidth
              className="inputField"
              disabled
            />
            <TextField
              label="Units"
              variant="outlined"
              type="number"
              value={units2}
              onChange={handleUnitsChange}
              fullWidth
              className="inputField"
            />
          </>
        )}

        <VirtualizedSelect
          options={mutualFundNames.map((fund) => ({
            label: fund,
            value: fund,
          }))}
          placeholder="Mutual Fund"
          value={{ label: selectedFund, value: selectedFund }}
          onChange={(selectedOption) =>
            handleFundChange({ target: { value: selectedOption.value } })
          }
          fullWidth
          className="selectField"
        />

        <TextField
          label="Scheme"
          variant="outlined"
          type="text"
          value={selectedScheme}
          fullWidth
          disabled
          className="disabledField"
        />
      </Box>
    </Container>
  );
};

export default Calculator;
