"use client";

import React, { useState, useEffect, useCallback } from "react";
import { apiService } from "@/services/api";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import TransactionsTable from "@/components/Table";

const BankAccount = () => {
  const [statement, setStatement] = useState([]);
  const [amount, setAmount] = useState(0);
  const [iban, setIban] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [actionType, setActionType] = useState("deposit");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleActionChange = (event) => {
    setActionType(event.target.value);
  };

  const fetchStatement = useCallback(
    async (page?: number) => {
      const response = await apiService.getStatement(sortOrder, page);
      setStatement(response.data.transactions);
      setTotalPages(response.data.totalPages);
    },
    [sortOrder]
  );

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
    fetchStatement(currentPage);
  }, [fetchStatement, currentPage]);

  return (
    <div>
      <h2>Account Statement</h2>

      <TransactionsTable
        data={statement}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
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
