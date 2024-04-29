// src/components/BankAccount.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { apiService } from "@/services/api";
import {
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";

const BankAccount = () => {
  const [statement, setStatement] = useState([]);
  const [amount, setAmount] = useState(0);
  const [iban, setIban] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [actionType, setActionType] = useState("deposit");

  const handleActionChange = (event) => {
    setActionType(event.target.value);
  };

  const fetchStatement = useCallback(async () => {
    const response = await apiService.getStatement(sortOrder);
    setStatement(response.data);
  }, [sortOrder]);

  const handleDeposit = async () => {
    await apiService.deposit(amount);
    fetchStatement();
  };

  const handleWithdraw = async () => {
    await apiService.withdraw(amount);
    fetchStatement();
  };

  const handleTransfer = async () => {
    await apiService.transfer(iban, amount);
    fetchStatement();
  };
  useEffect(() => {
    fetchStatement();
  }, [fetchStatement]);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <h2>Account Statement</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active
                  direction={sortOrder as "asc" | "desc"}
                  onClick={handleSort}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statement.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell>${item.amount}</TableCell>
                <TableCell>${item.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="action"
            name="action"
            value={actionType}
            onChange={handleActionChange}
          >
            <FormControlLabel
              value="deposit"
              control={<Radio />}
              label="Deposit/Withdrawal"
            />
            <FormControlLabel
              value="transfer"
              control={<Radio />}
              label="Transfer"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
          variant="outlined"
          margin="normal"
        />

        {actionType === "deposit" && (
          <>
            <Button variant="contained" color="primary" onClick={handleDeposit}>
              Deposit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleWithdraw}
            >
              Withdraw
            </Button>
          </>
        )}

        {actionType === "transfer" && (
          <>
            <TextField
              type="text"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              placeholder="IBAN"
              variant="outlined"
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleTransfer}
            >
              Transfer
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default BankAccount;
